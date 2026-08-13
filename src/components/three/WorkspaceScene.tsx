import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { ContactShadows, Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { SceneCanvas, useIsMobile } from '@/components/three/SceneCanvas'
import { LaptopModel } from '@/components/three/LaptopModel'

function Mouse() {
  const ref = useRef<THREE.Group>(null)
  useFrame((s) => {
    if (!ref.current) return
    ref.current.position.x = 1.6 + Math.sin(s.clock.elapsedTime * 0.6) * 0.04
  })
  return (
    <group ref={ref} position={[1.6, -0.55, 0.5]} rotation={[0, -0.35, 0]}>
      <mesh>
        <boxGeometry args={[0.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#d1d5db" roughness={0.35} />
      </mesh>
    </group>
  )
}

function Keyboard() {
  return (
    <group position={[0, -0.62, 1.15]} rotation={[-0.2, 0.05, 0]}>
      <mesh>
        <boxGeometry args={[2.1, 0.07, 0.7]} />
        <meshStandardMaterial color="#111827" roughness={0.5} />
      </mesh>
    </group>
  )
}

function FloatingBadge({
  position,
  label,
}: {
  position: [number, number, number]
  label: string
}) {
  const ref = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((s) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime + position[0]) * 0.06
    const t = hovered ? 1.15 : 1
    ref.current.scale.lerp(new THREE.Vector3(t, t, t), 0.15)
  })

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <mesh>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshStandardMaterial
          color={hovered ? '#2563eb' : '#60a5fa'}
          emissive={hovered ? '#2563eb' : '#93c5fd'}
          emissiveIntensity={hovered ? 0.35 : 0.15}
        />
      </mesh>
      <Html center distanceFactor={7} position={[0, 0.32, 0]} style={{ pointerEvents: 'none' }}>
        <div
          className={`rounded-lg border px-3 py-1.5 text-[11px] font-semibold shadow-md whitespace-nowrap ${
            hovered
              ? 'bg-[#2563eb] text-white border-[#2563eb]'
              : 'bg-white text-[#111827] border-[#e5e7eb]'
          }`}
        >
          {label}
        </div>
      </Html>
    </group>
  )
}

export function WorkspaceScene() {
  const mobile = useIsMobile()

  return (
    <SceneCanvas className="rounded-2xl" camera={{ position: [2.6, 1.6, 4.2], fov: 40 }}>
      <LaptopModel scale={0.85} />
      {!mobile && (
        <>
          <Keyboard />
          <Mouse />
          <FloatingBadge position={[-1.9, 0.9, 0]} label="Laravel" />
          <FloatingBadge position={[2.0, 0.7, -0.2]} label="React" />
          <FloatingBadge position={[-1.4, -0.2, 0.8]} label="MySQL" />
        </>
      )}
      <ContactShadows position={[0, -0.9, 0]} opacity={0.3} scale={8} blur={2.2} far={4} />
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        target={[0, 0, 0]}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.45}
      />
    </SceneCanvas>
  )
}
