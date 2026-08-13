import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

type Node = { id: string; label: string; x: number; y: number }

function ConnectionLines({
  nodes,
  activeIndex,
}: {
  nodes: Node[]
  activeIndex: number
}) {
  const positions = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < nodes.length - 1; i++) {
      arr.push(nodes[i].x, nodes[i].y, 0, nodes[i + 1].x, nodes[i + 1].y, 0)
    }
    return new Float32Array(arr)
  }, [nodes])

  const colors = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < nodes.length - 1; i++) {
      const on = i <= activeIndex
      const c = on ? new THREE.Color('#2563eb') : new THREE.Color('#94a3b8')
      arr.push(c.r, c.g, c.b, c.r, c.g, c.b)
    }
    return new Float32Array(arr)
  }, [nodes, activeIndex])

  const count = positions.length / 3

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.9} linewidth={2} />
    </lineSegments>
  )
}

function NodeLabel({ label, active }: { label: string; active?: boolean }) {
  return (
    <Html center distanceFactor={10} zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
      <div
        style={{
          whiteSpace: 'nowrap',
          borderRadius: 8,
          padding: '4px 10px',
          fontSize: 11,
          fontWeight: 600,
          fontFamily: 'IBM Plex Sans, sans-serif',
          boxShadow: '0 4px 14px rgba(15,23,42,0.12)',
          background: active ? '#2563eb' : '#ffffff',
          color: active ? '#ffffff' : '#111827',
          border: active ? '1px solid #2563eb' : '1px solid #e5e7eb',
        }}
      >
        {label}
      </div>
    </Html>
  )
}

export function ArchitectureGraph({
  nodes,
  activeIndex = 0,
  onSelect,
}: {
  nodes: Node[]
  activeIndex?: number
  onSelect?: (index: number) => void
}) {
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.05
  })

  return (
    <>
      <group ref={group} scale={1}>
        <ConnectionLines nodes={nodes} activeIndex={activeIndex} />
        {nodes.map((node, i) => {
          const active = i === activeIndex
          const done = i < activeIndex
          const isHover = hovered === i
          const size = active || isHover ? 0.28 : 0.18
          return (
            <group key={node.id} position={[node.x, node.y, 0]}>
              <mesh
                onPointerOver={(e) => {
                  e.stopPropagation()
                  setHovered(i)
                  document.body.style.cursor = 'pointer'
                }}
                onPointerOut={() => {
                  setHovered(null)
                  document.body.style.cursor = 'auto'
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect?.(i)
                }}
              >
                <sphereGeometry args={[size, 28, 28]} />
                <meshStandardMaterial
                  color={active || isHover ? '#2563eb' : done ? '#4f46e5' : '#64748b'}
                  emissive={active || isHover ? '#2563eb' : '#000000'}
                  emissiveIntensity={active || isHover ? 0.35 : 0}
                  roughness={0.3}
                  metalness={0.2}
                />
              </mesh>
              <group position={[0, -0.48, 0]}>
                <NodeLabel label={node.label} active={active || isHover} />
              </group>
            </group>
          )
        })}
      </group>
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.45}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(Math.PI * 2) / 3}
      />
    </>
  )
}

export function SystemNetwork({
  nodes,
}: {
  nodes: { id: string; label: string; x: number; y: number }[]
}) {
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const center = useMemo(() => nodes.find((n) => n.id === 'server') || nodes[0], [nodes])

  const linePositions = useMemo(() => {
    const arr: number[] = []
    nodes.forEach((node) => {
      if (node.id === center.id) return
      arr.push(center.x, center.y, 0, node.x, node.y, 0)
    })
    return new Float32Array(arr)
  }, [nodes, center])

  const count = linePositions.length / 3

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <>
      <group ref={group}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
              count={count}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#2563eb" transparent opacity={0.45} />
        </lineSegments>

        {nodes.map((node) => {
          const isServer = node.id === 'server'
          const isHover = hovered === node.id
          const s = isServer ? 0.55 : isHover ? 0.45 : 0.36
          return (
            <group key={node.id} position={[node.x, node.y, 0]}>
              <mesh
                onPointerOver={(e) => {
                  e.stopPropagation()
                  setHovered(node.id)
                  document.body.style.cursor = 'pointer'
                }}
                onPointerOut={() => {
                  setHovered(null)
                  document.body.style.cursor = 'auto'
                }}
              >
                <boxGeometry args={[s, s, s]} />
                <meshStandardMaterial
                  color={isServer || isHover ? '#0f172a' : '#cbd5e1'}
                  emissive={isHover ? '#2563eb' : '#000000'}
                  emissiveIntensity={isHover ? 0.25 : 0}
                  metalness={0.35}
                  roughness={0.35}
                />
              </mesh>
              <group position={[0, -0.55, 0]}>
                <NodeLabel label={node.label} active={isServer || isHover} />
              </group>
            </group>
          )
        })}
      </group>
      <OrbitControls makeDefault enableZoom={false} enablePan={false} rotateSpeed={0.4} />
    </>
  )
}
