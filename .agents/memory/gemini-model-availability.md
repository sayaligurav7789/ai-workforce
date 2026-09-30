---
name: Gemini model availability
description: Account-specific Gemini model retirement and capacity behavior discovered during provider integration.
---

Keep the Gemini generation model configurable and verify it against the account's live model list when provider errors report retirement or capacity problems. Model names can be exposed by the API but still be temporarily unavailable, while another current model may accept the same structured JSON request.

**Why:** The initial configured model was retired, a newer recommended model returned repeated 503 high-demand responses, and a live-listed preview model successfully served structured analysis.

**How to apply:** Treat 404 model errors as a configuration/update issue and 503 high-demand errors as transient capacity. Test a current generateContent-capable model with the actual response schema before changing the default; never fabricate an analysis during provider failure.