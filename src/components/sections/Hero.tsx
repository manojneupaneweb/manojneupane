import { lazy, Suspense } from 'react'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HiArrowDown, HiArrowRight } from 'react-icons/hi'
import { MagneticButton } from '@/components/ui/Primitives'
import { heroStats, siteConfig } from '@/data/content'
import gsap from 'gsap'

const HeroScene = lazy(() =>
  import('@/components/three/HeroScene').then((m) => ({ default: m.HeroScene })),
)

const roles = ['Full Stack Developer', 'Laravel Engineer', 'React Developer', 'SaaS Builder', 'Business Solution Architect']

function FloatingCard({
  label,
  value,
  suffix,
  className,
  delay,
}: {
  label: string
  value: number
  suffix: string
  className: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`glass rounded-2xl p-5 glow-blue absolute ${className}`}
    >
      <p className="text-2xl font-display font-bold text-white">
        {value}
        <span className="text-electric">{suffix}</span>
      </p>
      <p className="text-xs text-muted mt-1 uppercase tracking-wider">{label}</p>
    </motion.div>
  )
}

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (headlineRef.current) {
      gsap.from(headlineRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.3,
      })
    }

    let roleIndex = 0
    const interval = setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length
      if (roleRef.current) {
        gsap.to(roleRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          onComplete: () => {
            if (roleRef.current) {
              roleRef.current.textContent = roles[roleIndex]
              gsap.to(roleRef.current, { opacity: 1, y: 0, duration: 0.3 })
            }
          },
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <Suspense fallback={<div className="absolute inset-0 -z-10 bg-void" />}>
        <HeroScene />
      </Suspense>
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="section-padding w-full max-w-7xl mx-auto relative z-10 pt-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
              <span className="text-xs text-muted tracking-wide">
                {siteConfig.availability}
              </span>
            </motion.div>

            <h1
              ref={headlineRef}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8"
            >
              <span className="block text-white">Building Software</span>
              <span className="block text-gradient">That Solves Real</span>
              <span className="block text-white">Business Problems</span>
            </h1>

            <p className="text-lg md:text-xl text-muted max-w-xl leading-relaxed mb-4">
              I engineer production-grade systems — SaaS platforms, business management tools,
              and full-stack applications that real organizations depend on.
            </p>

            <p className="text-sm text-cyan font-medium mb-10">
              <span ref={roleRef}>{roles[0]}</span>
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <MagneticButton href="#projects" variant="primary">
                View Projects <HiArrowRight />
              </MagneticButton>
              <MagneticButton href={siteConfig.resumeUrl} variant="secondary">
                Download Resume
              </MagneticButton>
              <MagneticButton href="#contact" variant="ghost">
                Contact Me
              </MagneticButton>
            </div>

            <div className="flex gap-8">
              {heroStats.slice(0, 2).map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-display font-bold text-white">
                    {stat.value}
                    <span className="text-electric">{stat.suffix}</span>
                  </p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="relative w-72 h-72 rounded-3xl overflow-hidden glow-cyan border border-white/10"
              >
                <img
                  src="/img/profile.jpeg"
                  alt="Manoj Neupane"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
              </motion.div>
            </div>

            <FloatingCard label="Projects Built" value={15} suffix="+" className="top-8 -left-4" delay={0.8} />
            <FloatingCard label="Production Deployments" value={8} suffix="+" className="top-20 -right-8" delay={1} />
            <FloatingCard label="Technologies" value={20} suffix="+" className="bottom-32 -left-8" delay={1.2} />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="absolute bottom-8 right-0 glass rounded-2xl p-5 glow-blue"
            >
              <p className="text-xs text-muted uppercase tracking-wider">Current Focus</p>
              <p className="text-sm font-medium text-white mt-1">Medical SaaS & Evergreen Byaparo</p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <HiArrowDown className="text-muted text-xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
