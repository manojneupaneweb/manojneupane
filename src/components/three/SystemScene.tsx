import { SceneCanvas } from '@/components/three/SceneCanvas'
import { SystemNetwork } from '@/components/three/ArchitectureGraph'
import { systemNodes } from '@/data/content'

export function SystemScene() {
  return (
    <SceneCanvas className="absolute inset-0" camera={{ position: [0, 0.2, 6.5], fov: 40 }}>
      <SystemNetwork nodes={systemNodes} />
    </SceneCanvas>
  )
}
