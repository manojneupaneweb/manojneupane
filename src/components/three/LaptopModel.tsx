import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type LaptopProps = {
  screenColor?: string
  screenImage?: string | null
  scale?: number
}

function createCodeTexture(color: string) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 640
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1024, 640)

  ctx.fillStyle = '#0b1220'
  ctx.fillRect(0, 0, 1024, 44)
  ;['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => {
    ctx.beginPath()
    ctx.fillStyle = c
    ctx.arc(28 + i * 22, 22, 6, 0, Math.PI * 2)
    ctx.fill()
  })
  ctx.fillStyle = '#94a3b8'
  ctx.font = '20px monospace'
  ctx.fillText('app.tsx — manoj', 110, 28)

  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 44, 220, 596)
  ctx.fillStyle = '#1e293b'
  ctx.fillRect(220, 44, 804, 596)

  const lines = [
    { c: '#64748b', t: '// production software' },
    { c: '#7dd3fc', t: 'export function App() {' },
    { c: '#c4b5fd', t: '  const product = build({' },
    { c: '#86efac', t: "    problem: 'real'," },
    { c: '#86efac', t: "    stack: 'laravel + react'," },
    { c: '#c4b5fd', t: '  })' },
    { c: '#7dd3fc', t: '  return <Product {...product} />' },
    { c: '#7dd3fc', t: '}' },
  ]
  lines.forEach((line, i) => {
    ctx.fillStyle = line.c
    ctx.font = '22px monospace'
    ctx.fillText(line.t, 250, 100 + i * 36)
  })

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

export function LaptopModel({
  screenColor = '#0f172a',
  screenImage = null,
  scale = 1,
}: LaptopProps) {
  const group = useRef<THREE.Group>(null)

  const screenTex = useMemo(() => {
    if (screenImage) {
      const tex = new THREE.TextureLoader().load(screenImage)
      tex.colorSpace = THREE.SRGBColorSpace
      return tex
    }
    return createCodeTexture(screenColor)
  }, [screenColor, screenImage])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.position.y = Math.sin(t * 0.6) * 0.04
  })

  // Lid open angle: ~110 degrees from closed
  const lidAngle = -Math.PI / 2.05

  return (
    <group ref={group} scale={scale} rotation={[0.15, 0.35, 0]} position={[0, -0.15, 0]}>
      {/* Base */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.4, 0.08, 1.55]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.45} roughness={0.3} />
      </mesh>
      {/* Keyboard deck */}
      <mesh position={[0, 0.05, 0.08]}>
        <boxGeometry args={[2.15, 0.04, 1.15]} />
        <meshStandardMaterial color="#111827" roughness={0.55} />
      </mesh>
      {/* Keys hint */}
      <mesh position={[0, 0.08, -0.05]}>
        <boxGeometry args={[1.9, 0.02, 0.7]} />
        <meshStandardMaterial color="#1f2937" roughness={0.7} />
      </mesh>
      {/* Trackpad */}
      <mesh position={[0, 0.08, 0.48]}>
        <boxGeometry args={[0.7, 0.015, 0.4]} />
        <meshStandardMaterial color="#374151" roughness={0.35} />
      </mesh>

      {/* Lid hinged at back */}
      <group position={[0, 0.04, -0.75]} rotation={[lidAngle, 0, 0]}>
        <mesh position={[0, 0.72, 0]} castShadow>
          <boxGeometry args={[2.4, 1.45, 0.06]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.45} roughness={0.28} />
        </mesh>
        <mesh position={[0, 0.72, 0.038]}>
          <boxGeometry args={[2.2, 1.28, 0.02]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, 0.72, 0.055]}>
          <planeGeometry args={[2.05, 1.15]} />
          <meshBasicMaterial map={screenTex} toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}
