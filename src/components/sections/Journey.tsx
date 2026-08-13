import { FiExternalLink } from 'react-icons/fi'
import { SectionIntro } from '@/components/ui/Primitives'
import { company } from '@/data/content'

export function Journey() {
  return (
    <section id="experience" className="section bg-surface border-y border-line">
      <div className="container-x">
        <SectionIntro
          label="Experience"
          title="Where I work & grow."
          lead="2+ years in software development — building systems and teaching others to do the same."
        />

        <a
          href={company.url}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
          className="mb-10 flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-line bg-bg p-5 md:p-6 hover:border-blue/35 transition-colors max-w-3xl mx-auto"
        >
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-xl bg-white border border-line p-2">
            <img
              src={company.logo}
              alt={`${company.name} company logo`}
              width={80}
              height={80}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-display text-xl font-bold text-ink">{company.name}</h3>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue bg-blue/10 px-2 py-0.5 rounded">
                {company.period}
              </span>
            </div>
            <p className="text-sm font-semibold text-body mb-1">{company.role}</p>
            <p className="text-sm text-muted leading-relaxed">{company.description}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue shrink-0">
            Visit <FiExternalLink />
          </span>
        </a>

        <div data-reveal className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
          <div className="rounded-xl border border-line bg-bg px-5 py-4">
            <p className="text-[11px] uppercase tracking-wider text-muted mb-1">Experience</p>
            <p className="font-display text-2xl font-bold text-ink">2+ Years</p>
            <p className="text-sm text-body mt-1">Software development</p>
          </div>
          <div className="rounded-xl border border-line bg-bg px-5 py-4">
            <p className="text-[11px] uppercase tracking-wider text-muted mb-1">Teaching</p>
            <p className="font-display text-2xl font-bold text-ink">Programming</p>
            <p className="text-sm text-body mt-1">Laravel · Node.js · Fundamentals</p>
          </div>
        </div>
      </div>
    </section>
  )
}
