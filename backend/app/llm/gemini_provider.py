import json
import logging

from ..config import Settings
from ..schemas import RequirementsAnalysis
from .base import LLMProvider

logger = logging.getLogger(__name__)


class ProviderConfigurationError(RuntimeError):
    """Raised when the configured provider cannot be used."""


class GeminiProvider(LLMProvider):
    def __init__(self, settings: Settings):
        if not settings.gemini_api_key:
            raise ProviderConfigurationError(
                "GEMINI_API_KEY is not configured. Add it to Replit Secrets before processing documents or analysis."
            )
        from google import genai

        self._client = genai.Client(api_key=settings.gemini_api_key)
        self._model = settings.gemini_model
        self._embedding_model = settings.gemini_embedding_model

    def embed_texts(self, texts: list[str]) -> list[list[float]]:
        if not texts:
            return []
        try:
            response = self._client.models.embed_content(
                model=self._embedding_model,
                contents=texts,
            )
            return [list(embedding.values) for embedding in response.embeddings]
        except Exception as exc:
            logger.exception("Gemini embedding request failed")
            raise ProviderConfigurationError(f"Embedding provider failed: {exc}") from exc

    def generate_analysis(self, project_name: str, project_description: str, contexts: list[dict]) -> RequirementsAnalysis:
        context_text = _format_contexts(contexts)
        prompt = f"""
You are the Requirements Analyst for the project "{project_name}".
Project description: {project_description or "Not provided"}

Analyze the retrieved SRS excerpts below. Transform explicit customer requirements
into structured software-analysis artifacts. Do not invent features, rules, actors,
priorities, non-functional requirements, constraints, or risks. Label inferred
priorities as INFERRED and use ambiguities for missing details. Every source reference
must exactly match a document/page/source in the supplied excerpts. Use empty lists
when the SRS does not support an artifact. Generate user stories and acceptance
criteria only from supported requirements.

Return JSON matching the RequirementsAnalysis schema exactly.

RETRIEVED SRS EXCERPTS:
{context_text}
"""
        try:
            from google.genai import types

            response = self._client.models.generate_content(
                model=self._model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=RequirementsAnalysis,
                    temperature=0.1,
                ),
            )
            return RequirementsAnalysis.model_validate(json.loads(response.text))
        except Exception as exc:
            logger.exception("Gemini structured analysis failed")
            raise ProviderConfigurationError(f"Requirements analysis failed: {exc}") from exc

    def answer_question(self, question: str, contexts: list[dict]) -> str:
        prompt = f"""
Answer the user's question using only the retrieved SRS excerpts below.
If the excerpts do not contain the answer, say that the SRS does not specify it.
Do not invent facts. Do not mention sources that are not supplied.

Question: {question}

RETRIEVED SRS EXCERPTS:
{_format_contexts(contexts)}
"""
        try:
            response = self._client.models.generate_content(
                model=self._model,
                contents=prompt,
                config={"temperature": 0.1},
            )
            return response.text.strip()
        except Exception as exc:
            logger.exception("Gemini RAG answer failed")
            raise ProviderConfigurationError(f"RAG answer failed: {exc}") from exc


def _format_contexts(contexts: list[dict]) -> str:
    return "\n\n".join(
        f"[{item['filename']} page {item['page']} | {item['source']}]\n{item['text']}" for item in contexts
    )