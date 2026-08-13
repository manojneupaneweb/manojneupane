import { lazy, Suspense } from 'react'
import { SectionIntro } from '@/components/ui/Primitives'
import { philosophy, siteConfig } from '@/data/content'

const WorkspaceScene = lazy(() =>
  import('@/components/three/WorkspaceScene').then((m) => ({ default: m.WorkspaceScene })),
)

export function About() {
  return (
    <section id="about" className="section bg-surface border-y border-line">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div data-reveal>
            <SectionIntro
              label="About"
              title="The person behind the code."
              lead="Short version: I ship production software for real organizations."
            />

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                ['Name', siteConfig.name],
                ['Role', 'Full Stack Web Developer'],
                ['Based', siteConfig.location],
                ['Status', 'IT Student'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-line bg-bg px-4 py-3">
                  <p className="text-[11px] uppercase tracking-wider text-muted mb-1">{k}</p>
                  <p className="text-sm font-semibold text-ink">{v}</p>
                </div>
              ))}
            </div>

            <p className="text-body leading-relaxed mb-6 max-w-lg">
              I start with the business problem, then design architecture that holds up
              in production — not just a polished interface.
            </p>

            <ul className="grid sm:grid-cols-2 gap-2">
              {philosophy.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-ink font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="relative h-[320px] sm:h-[400px] rounded-2xl bg-bg border border-line">
            <Suspense fallback={<div className="absolute inset-0 bg-muted-bg animate-pulse" />}>
              <div className="absolute inset-0">
                <WorkspaceScene />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
