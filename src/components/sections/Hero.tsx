import { Suspense, lazy } from 'react'
import { HiArrowDown, HiArrowRight } from 'react-icons/hi'

const HeroLaptop = lazy(() =>
  import('@/components/three/HeroLaptop').then((m) => ({ default: m.HeroLaptop })),
)

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden bg-bg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-blue/[0.04]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo/[0.03]" />
      </div>

      <div className="container-x relative z-10 px-5 sm:px-8 lg:px-12 pt-28 pb-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-6 items-center">
        <div>
          <p className="label mb-5">Software Engineer · Nepal</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-ink leading-[1.02] mb-5">
            Building Software
            <br />
            That Solves{' '}
            <span className="text-blue">Real Problems.</span>
          </h1>
          <p className="text-body text-base md:text-lg mb-3 max-w-lg leading-relaxed">
            I build web applications, SaaS platforms, and business systems that people
            actually use.
          </p>
          <p className="text-sm text-muted mb-8">
            Full Stack Developer · Software Engineer · SaaS Builder
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">
              View My Work <HiArrowRight />
            </a>
            <a href="#contact" className="btn-secondary">
              Let's Talk
            </a>
          </div>
        </div>

        <div className="relative h-[340px] sm:h-[420px] lg:h-[520px] w-full">
          <Suspense
            fallback={
              <div className="absolute inset-0 rounded-2xl bg-muted-bg animate-pulse" />
            }
          >
            <div className="absolute inset-0">
              <HeroLaptop />
            </div>
          </Suspense>
        </div>
      </div>

      <a
        href="#experience"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted hover:text-blue transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold">Scroll</span>
        <HiArrowDown className="text-lg" />
      </a>
    </section>
  )
}
