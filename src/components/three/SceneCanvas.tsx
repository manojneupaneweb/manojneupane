import { Suspense, useEffect, useState, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'

export function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return mobile
}

export function SceneCanvas({
  children,
  className = '',
  camera = { position: [0, 0.6, 4.2], fov: 42 },
}: {
  children: ReactNode
  className?: string
  camera?: { position: [number, number, number]; fov: number }
}) {
  const [node, setNode] = useState<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '180px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [node])

  return (
    <div ref={setNode} className={`h-full w-full ${className}`}>
      {visible && !reduced ? (
        <Canvas
          dpr={[1, 1.75]}
          camera={camera}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
          }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 6, 3]} intensity={1.1} />
          <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#93c5fd" />
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      ) : (
        <div className="h-full w-full rounded-2xl bg-muted-bg/50" aria-hidden />
      )}
    </div>
  )
}
