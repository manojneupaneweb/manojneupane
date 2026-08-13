import { SceneCanvas } from '@/components/three/SceneCanvas'
import { ArchitectureGraph } from '@/components/three/ArchitectureGraph'

const nodes = [
  { id: 'idea', label: 'Idea', x: -2.4, y: 1.0 },
  { id: 'architecture', label: 'Architecture', x: -1.2, y: 0.15 },
  { id: 'database', label: 'Database', x: 0, y: 0.95 },
  { id: 'api', label: 'API', x: 0.15, y: -0.45 },
  { id: 'frontend', label: 'Frontend', x: 1.35, y: 0.85 },
  { id: 'testing', label: 'Testing', x: 1.55, y: -0.55 },
  { id: 'deploy', label: 'Deploy', x: 2.6, y: 0.15 },
]

export function EngineeringScene({
  activeIndex,
  onSelect,
}: {
  activeIndex: number
  onSelect?: (index: number) => void
}) {
  return (
    <SceneCanvas className="rounded-2xl" camera={{ position: [0, 0.2, 5.5], fov: 42 }}>
      <ArchitectureGraph nodes={nodes} activeIndex={activeIndex} onSelect={onSelect} />
    </SceneCanvas>
  )
}
