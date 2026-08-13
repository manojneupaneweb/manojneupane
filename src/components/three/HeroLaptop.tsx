import { SceneCanvas, useIsMobile } from '@/components/three/SceneCanvas'
import { LaptopModel } from '@/components/three/LaptopModel'
import { ContactShadows, OrbitControls } from '@react-three/drei'

export function HeroLaptop() {
  const mobile = useIsMobile()

  return (
    <SceneCanvas
      className="rounded-2xl"
      camera={{ position: [2.8, 1.8, 3.8], fov: 40 }}
    >
      <LaptopModel scale={mobile ? 1.05 : 1.25} />
      <ContactShadows
        position={[0, -0.85, 0]}
        opacity={0.35}
        scale={8}
        blur={2.5}
        far={4}
      />
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        target={[0, 0.2, 0]}
        minPolarAngle={0.8}
        maxPolarAngle={1.45}
        minAzimuthAngle={-0.8}
        maxAzimuthAngle={0.9}
        rotateSpeed={0.55}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </SceneCanvas>
  )
}
