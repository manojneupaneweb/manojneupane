import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#3b82f6" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function WireGlobe() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.15} />
      </mesh>
    </Float>
  )
}

function GlassCubes() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.08
    }
  })

  const cubes = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        position: [
          Math.cos((i / 6) * Math.PI * 2) * 4,
          Math.sin(i * 1.2) * 0.8,
          Math.sin((i / 6) * Math.PI * 2) * 4,
        ] as [number, number, number],
        scale: 0.3 + Math.random() * 0.3,
      })),
    [],
  )

  return (
    <group ref={group}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position} scale={cube.scale}>
          <boxGeometry />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.08} />
        </mesh>
      ))}
    </group>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#3b82f6" />
        <Stars radius={80} depth={50} count={1500} factor={3} saturation={0} fade speed={0.5} />
        <ParticleField />
        <WireGlobe />
        <GlassCubes />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-void/20 via-void/60 to-void pointer-events-none" />
    </div>
  )
}
