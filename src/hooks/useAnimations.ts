import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useLenis() {
  const ref = useRef<Lenis | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })
    ref.current = lenis
    lenis.on('scroll', ScrollTrigger.update)

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return ref
}

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const triggers: ScrollTrigger[] = []

    els.forEach((el) => {
      const tween = gsap.fromTo(
        el,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      )
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])
}

export { gsap, ScrollTrigger }
