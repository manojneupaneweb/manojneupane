import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (!isFine || !dot.current || !ring.current) return

    let x = 0
    let y = 0
    let rx = 0
    let ry = 0
    let raf = 0

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0)`
      }
    }

    const tick = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 14}px, ${ry - 14}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dot}
        className="fixed top-0 left-0 z-[9999] hidden md:block w-1 h-1 rounded-full bg-navy pointer-events-none"
      />
      <div
        ref={ring}
        className="fixed top-0 left-0 z-[9998] hidden md:block w-7 h-7 rounded-full border border-navy/25 pointer-events-none"
      />
    </>
  )
}

export function SectionIntro({
  label,
  title,
  lead,
  light = false,
}: {
  label: string
  title: string
  lead?: string
  light?: boolean
}) {
  return (
    <div className="mb-12 md:mb-16 max-w-2xl">
      <span className={`label ${light ? 'text-[#93c5fd]' : ''}`}>{label}</span>
      <h2 className={`heading ${light ? 'text-white' : ''}`}>{title}</h2>
      {lead && <p className={`lead ${light ? 'text-white/60' : ''}`}>{lead}</p>}
    </div>
  )
}
