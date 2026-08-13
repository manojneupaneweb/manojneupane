import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { SectionIntro } from '@/components/ui/Primitives'
import { engineeringSteps } from '@/data/content'

const EngineeringScene = lazy(() =>
  import('@/components/three/EngineeringScene').then((m) => ({
    default: m.EngineeringScene,
  })),
)

export function Engineering() {
  const [active, setActive] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    const id = window.setInterval(() => {
      if (paused.current) return
      setActive((v) => (v + 1) % engineeringSteps.length)
    }, 2400)
    return () => window.clearInterval(id)
  }, [])

  const select = (i: number) => {
    paused.current = true
    setActive(i)
    window.setTimeout(() => {
      paused.current = false
    }, 5000)
  }

  return (
    <section id="engineering" className="section bg-bg">
      <div className="container-x">
        <SectionIntro
          label="How I work"
          title="From Idea → Software"
          lead="Click a step or drag the 3D graph — architecture first, then systems that last."
        />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div data-reveal className="space-y-2">
            {engineeringSteps.map((step, i) => (
              <button
                key={step.id}
                onClick={() => select(i)}
                className={`w-full text-left rounded-xl border px-4 py-3 transition-colors ${
                  active === i
                    ? 'border-blue bg-blue/5'
                    : 'border-line bg-surface hover:border-blue/30'
                }`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-bold text-blue">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-display font-semibold text-ink">{step.label}</p>
                    <p className="text-sm text-muted mt-0.5">{step.detail}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div
            data-reveal
            className="relative h-[360px] sm:h-[440px] rounded-2xl border border-line bg-surface"
          >
            <Suspense fallback={<div className="absolute inset-0 bg-muted-bg animate-pulse" />}>
              <div className="absolute inset-0">
                <EngineeringScene activeIndex={active} onSelect={select} />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
