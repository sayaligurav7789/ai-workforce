import { ChevronDown } from 'lucide-react'

const resultSections = [
  {
    key: 'functional_requirements',
    title: 'Functional requirements',
    itemsKey: 'functional_requirements',
    details: (item) => [
      ['Priority', item.priority],
      ['Priority basis', item.priority_basis],
    ],
  },
  {
    key: 'non_functional_requirements',
    title: 'Non-functional requirements',
    itemsKey: 'non_functional_requirements',
    details: (item) => [
      ['Category', item.category],
      ['Priority', item.priority],
    ],
  },
  {
    key: 'user_stories',
    title: 'User stories',
    itemsKey: 'user_stories',
    details: (item) => [
      ['Priority', item.priority],
      ['Requirement', item.requirement_id ? `#${item.requirement_id}` : null],
    ],
  },
  {
    key: 'acceptance_criteria',
    title: 'Acceptance criteria',
    itemsKey: 'acceptance_criteria',
    details: (item) => [
      ['User story', item.user_story_id ? `#${item.user_story_id}` : null],
    ],
  },
  {
    key: 'dependencies',
    title: 'Dependencies',
    itemsKey: 'dependencies',
    details: (item) => [['Related requirement', item.related_requirement]],
  },
  {
    key: 'ambiguities',
    title: 'Ambiguities',
    itemsKey: 'ambiguities',
    details: (item) => [
      ['Impact', item.impact],
      ['Related requirement', item.related_requirement],
    ],
  },
  {
    key: 'constraints',
    title: 'Constraints',
    itemsKey: 'constraints',
    details: () => [],
  },
  {
    key: 'risks',
    title: 'Risks',
    itemsKey: 'risks',
    details: (item) => [
      ['Severity', item.severity],
      ['Related requirement', item.related_requirement],
    ],
  },
]

function AnalysisResults({ analysis }) {
  const summary = analysis.project_summary || {}
  const sourceReferences = analysis.source_references || []
  const uniqueSources = [...new Map(
    sourceReferences.map((source) => [`${source.document}:${source.page}`, source]),
  ).values()]
  const completedAt = analysis.latest_agent_run?.completed_at

  return (
    <section className="space-y-6" aria-label="Saved requirements analysis">
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Saved requirements analysis</h2>
            <p className="text-sm text-text-secondary mt-1">
              Loaded from this project&apos;s saved analysis records.
            </p>
          </div>
          {completedAt && (
            <p className="text-xs text-text-secondary">
              Completed {new Date(completedAt).toLocaleString()}
            </p>
          )}
        </div>

        <p className="text-text-primary leading-relaxed">{summary.summary}</p>
        {summary.scope && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-text-primary mb-1">Scope</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{summary.scope}</p>
          </div>
        )}
        {!!summary.actors?.length && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-text-primary mb-2">Actors</h3>
            <div className="flex flex-wrap gap-2">
              {summary.actors.map((actor) => (
                <span key={actor} className="rounded-full bg-primary-light px-3 py-1 text-xs text-primary">
                  {actor}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <Metric label="Functional requirements" value={analysis.functional_requirements.length} />
          <Metric label="User stories" value={analysis.user_stories.length} />
          <Metric label="Acceptance criteria" value={analysis.acceptance_criteria.length} />
          <Metric label="Risks & ambiguities" value={analysis.risks.length + analysis.ambiguities.length} />
        </div>
      </div>

      <div className="space-y-3">
        {resultSections.map((section, index) => {
          const items = analysis[section.itemsKey] || []
          return (
            <details key={section.key} className="card group p-5" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="flex items-center gap-3">
                  <span className="font-semibold text-text-primary">{section.title}</span>
                  <span className="rounded-full bg-bg-light px-3 py-1 text-xs text-text-secondary">
                    {items.length}
                  </span>
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              {items.length ? (
                <div className="mt-4 space-y-3">
                  {items.map((item, itemIndex) => (
                    <ResultCard
                      key={item.id || `${section.key}-${itemIndex}`}
                      item={item}
                      index={itemIndex}
                      section={section}
                    />
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-text-secondary">No {section.title.toLowerCase()} found.</p>
              )}
            </details>
          )
        })}
      </div>

      {!!uniqueSources.length && (
        <div className="card p-6">
          <h3 className="font-semibold text-text-primary mb-3">Source pages</h3>
          <ul className="flex flex-wrap gap-2">
            {uniqueSources.map((source) => (
              <li
                key={`${source.document}:${source.page}`}
                className="rounded-full border border-border-light px-3 py-1.5 text-xs text-text-secondary"
              >
                {source.document} · page {source.page}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

function ResultCard({ item, index, section }) {
  const title = item.title || item.category || `Item ${index + 1}`
  const description = item.description || item.story
  const metadata = section.details(item).filter(([, value]) => value)
  const references = item.source_references || []

  return (
    <article className="rounded-lg border border-border-light bg-white p-4">
      <h3 className="font-semibold text-text-primary">{title}</h3>
      {description && (
        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-text-secondary">{description}</p>
      )}
      {!!metadata.length && (
        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {metadata.map(([label, value]) => (
            <div key={label} className="flex gap-1 text-xs">
              <dt className="font-medium text-text-primary">{label}:</dt>
              <dd className="text-text-secondary">{value}</dd>
            </div>
          ))}
        </dl>
      )}
      {!!references.length && (
        <p className="mt-3 text-xs text-text-secondary">
          Sources: {references.map((reference) => `${reference.document}, page ${reference.page}`).join(' · ')}
        </p>
      )}
    </article>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg bg-bg-light p-4">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="mt-1 text-xs text-text-secondary">{label}</p>
    </div>
  )
}

export default AnalysisResults