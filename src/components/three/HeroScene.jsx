import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import { MathUtils } from 'three'
import useTheme from '@/hooks/useTheme'

// World units that correspond to the anchor's width at scale 1
// (the orb was designed around a ~3.45-unit wide profile frame).
const ANCHOR_UNITS = 3.45

/**
 * Positions and scales `root` every frame so the orb sits exactly behind the
 * anchor element (the profile photo), wherever the layout or parallax moves it.
 */
function useAnchor(root, anchorRef) {
  useFrame((state) => {
    const anchor = anchorRef?.current
    if (!anchor || !root.current) return
    const canvas = state.gl.domElement.getBoundingClientRect()
    const rect = anchor.getBoundingClientRect()
    if (canvas.width === 0 || canvas.height === 0) return
    const { width, height } = state.viewport
    const cx = (rect.left + rect.width / 2 - canvas.left) / canvas.width
    const cy = (rect.top + rect.height / 2 - canvas.top) / canvas.height
    root.current.position.set((cx - 0.5) * width, -(cy - 0.5) * height, 0)
    root.current.scale.setScalar(((rect.width / canvas.height) * height) / ANCHOR_UNITS)
  })
}

function Orb({ anchorRef, light }) {
  const root = useRef(null)
  const group = useRef(null)
  const ring = useRef(null)

  useAnchor(root, anchorRef)

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.35, 0.04)
    group.current.rotation.z = MathUtils.lerp(group.current.rotation.z, -state.pointer.x * 0.25, 0.04)
    if (ring.current) ring.current.rotation.z += delta * 0.2
  })

  return (
    <group ref={root}>
      <pointLight position={[-4, -2, 3]} intensity={40} color="#22D3EE" />
      <pointLight position={[4, 3, -2]} intensity={40} color="#A855F7" />
      <group ref={group}>
        <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1.1}>
          <mesh scale={1.55}>
            <icosahedronGeometry args={[1, 24]} />
            <MeshDistortMaterial
              color="#4F46E5"
              emissive="#1E1B4B"
              emissiveIntensity={0.6}
              roughness={0.12}
              metalness={0.75}
              distort={0.42}
              speed={1.8}
            />
          </mesh>
          <mesh scale={2.2}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial color={light ? '#0891B2' : '#22D3EE'} wireframe transparent opacity={light ? 0.3 : 0.16} />
          </mesh>
        </Float>

        <mesh ref={ring} rotation={[Math.PI / 2.3, 0.2, 0]}>
          <torusGeometry args={[2.7, 0.01, 16, 220]} />
          <meshBasicMaterial color="#A855F7" transparent opacity={0.55} />
        </mesh>
        <mesh rotation={[Math.PI / 1.8, -0.4, 0.3]}>
          <torusGeometry args={[3.05, 0.006, 16, 220]} />
          <meshBasicMaterial color="#22D3EE" transparent opacity={0.35} />
        </mesh>

        <Sparkles count={70} scale={[7, 7, 4]} size={2.4} speed={0.35} color={light ? '#6366F1' : '#A5B4FC'} opacity={0.8} />
      </group>
    </group>
  )
}

/**
 * Hero 3D orb (React Three Fiber). Loaded lazily and only on desktop.
 * The canvas covers the whole hero so nothing is clipped; rendering pauses
 * whenever the hero is scrolled out of view.
 */
export default function HeroScene({ anchorRef }) {
  const wrapperRef = useRef(null)
  const [inView, setInView] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    const element = wrapperRef.current
    if (!element) return undefined
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={inView ? 'always' : 'never'}
        eventSource={typeof document !== 'undefined' ? document.getElementById('root') : undefined}
        eventPrefix="client"
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} />
        <Orb anchorRef={anchorRef} light={theme === 'light'} />
      </Canvas>
    </div>
  )
}
