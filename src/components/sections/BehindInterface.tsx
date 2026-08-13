import { lazy, Suspense } from 'react'
import { SectionIntro } from '@/components/ui/Primitives'

const SystemScene = lazy(() =>
  import('@/components/three/SystemScene').then((m) => ({ default: m.SystemScene })),
)

export function BehindInterface() {
  return (
    <section id="systems" className="section bg-bg">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div data-reveal>
            <SectionIntro
              label="Behind the Interface"
              title="Full stack, not just UI."
              lead="Frontend is one layer. I also design APIs, auth, databases, and deployment."
            />
            <ul className="space-y-3 text-sm text-body">
              {[
                'Frontend applications',
                'REST APIs and authentication',
                'Database design',
                'Admin panels and internal tools',
                'External service integrations',
                'Production deployment',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal
            className="relative h-[340px] sm:h-[420px] rounded-2xl border border-line bg-surface"
          >
            <Suspense fallback={<div className="absolute inset-0 bg-muted-bg animate-pulse" />}>
              <div className="absolute inset-0">
                <SystemScene />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
