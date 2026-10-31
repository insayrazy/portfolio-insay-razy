import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdditiveBlending, Color, MathUtils } from 'three'

/* ------------------------------------------------------------------ */
/* Particle wave floor — displaced on the GPU, driven by time + scroll  */
/* ------------------------------------------------------------------ */

const waveVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uPixelRatio;
  varying float vElevation;
  varying float vDepth;

  void main() {
    vec3 p = position;
    float t = uTime * 0.55 + uScroll * 6.0;
    float elevation =
      sin(p.x * 0.28 + t) * 0.55 +
      sin(p.z * 0.35 + t * 0.8) * 0.45 +
      sin((p.x + p.z) * 0.18 + t * 1.3) * 0.35;
    p.y += elevation;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    vElevation = elevation;
    vDepth = -mvPosition.z;
    gl_PointSize = 2.4 * uPixelRatio * (18.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const waveFragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vElevation;
  varying float vDepth;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    float fog = smoothstep(46.0, 9.0, vDepth);
    vec3 color = mix(uColorA, uColorB, smoothstep(-1.0, 1.2, vElevation));
    gl_FragColor = vec4(color, alpha * fog * 0.55);
  }
`

function WaveField({ scroll }) {
  const material = useRef(null)

  const positions = useMemo(() => {
    const columns = 160
    const rows = 90
    const data = new Float32Array(columns * rows * 3)
    let i = 0
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        data[i] = (column / (columns - 1) - 0.5) * 80
        data[i + 1] = 0
        data[i + 2] = -(row / (rows - 1)) * 50 + 6
        i += 3
      }
    }
    return data
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.5) },
      uColorA: { value: new Color('#3B82F6') },
      uColorB: { value: new Color('#22D3EE') },
    }),
    [],
  )

  useFrame((state) => {
    if (!material.current) return
    material.current.uniforms.uTime.value = state.clock.elapsedTime
    material.current.uniforms.uScroll.value = scroll.current
  })

  return (
    <points position={[0, -4.5, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={waveVertexShader}
        fragmentShader={waveFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

/* ------------------------------------------------------------------ */
/* Starfield                                                            */
/* ------------------------------------------------------------------ */

const STAR_COLORS = ['#A5B4FC', '#22D3EE', '#C084FC', '#FFFFFF', '#6366F1']

function Starfield({ scroll }) {
  const points = useRef(null)

  const [positions, colors] = useMemo(() => {
    const count = 1800
    const position = new Float32Array(count * 3)
    const color = new Float32Array(count * 3)
    const tint = new Color()
    for (let i = 0; i < count; i += 1) {
      const radius = 10 + Math.random() * 32
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      position[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      position[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      position[i * 3 + 2] = radius * Math.cos(phi) - 10
      tint.set(STAR_COLORS[i % STAR_COLORS.length])
      color[i * 3] = tint.r
      color[i * 3 + 1] = tint.g
      color[i * 3 + 2] = tint.b
    }
    return [position, color]
  }, [])

  useFrame((_, delta) => {
    if (!points.current) return
    points.current.rotation.y += delta * 0.015
    points.current.rotation.x = MathUtils.lerp(points.current.rotation.x, scroll.current * 0.8, 0.05)
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

/* ------------------------------------------------------------------ */
/* Floating wireframe shapes                                            */
/* ------------------------------------------------------------------ */

const SHAPES = [
  { id: 'ico', position: [-11, 3, -12], scale: 2.4, color: '#6366F1', speed: 0.12, geometry: 'icosahedron' },
  { id: 'knot', position: [12, 1.5, -16], scale: 1.6, color: '#22D3EE', speed: 0.09, geometry: 'torusKnot' },
  { id: 'octa', position: [6, 6, -22], scale: 2.2, color: '#A855F7', speed: 0.15, geometry: 'octahedron' },
  { id: 'torus', position: [-7, -1, -24], scale: 2.8, color: '#3B82F6', speed: 0.07, geometry: 'torus' },
]

function FloatingShape({ shape, scroll }) {
  const mesh = useRef(null)

  useFrame((state, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.x += delta * shape.speed
    mesh.current.rotation.y += delta * shape.speed * 1.4
    mesh.current.position.y = shape.position[1] + Math.sin(state.clock.elapsedTime * shape.speed * 4) * 0.8 - scroll.current * 6
  })

  return (
    <mesh ref={mesh} position={shape.position} scale={shape.scale}>
      {shape.geometry === 'icosahedron' ? <icosahedronGeometry args={[1, 1]} /> : null}
      {shape.geometry === 'torusKnot' ? <torusKnotGeometry args={[1, 0.3, 120, 12]} /> : null}
      {shape.geometry === 'octahedron' ? <octahedronGeometry args={[1, 0]} /> : null}
      {shape.geometry === 'torus' ? <torusGeometry args={[1, 0.35, 12, 48]} /> : null}
      <meshBasicMaterial color={shape.color} wireframe transparent opacity={0.14} />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/* Camera rig — mouse parallax + scroll travel                          */
/* ------------------------------------------------------------------ */

function Rig({ scroll }) {
  useFrame((state) => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    scroll.current = MathUtils.lerp(scroll.current, window.scrollY / max, 0.06)

    const { camera, pointer } = state
    camera.position.x = MathUtils.lerp(camera.position.x, pointer.x * 1.2, 0.03)
    camera.position.y = MathUtils.lerp(camera.position.y, pointer.y * 0.6 + 0.5, 0.03)
    camera.lookAt(0, -1.5, -12)
  })
  return null
}

/**
 * Full-screen animated background for everything below the hero.
 * Rendering is paused (frameloop "never") while the layer is hidden.
 */
export default function BackgroundScene({ active = true }) {
  const scroll = useRef(0)

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.5, 10], fov: 60 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      eventSource={document.getElementById('root')}
      eventPrefix="client"
    >
      <Rig scroll={scroll} />
      <Starfield scroll={scroll} />
      <WaveField scroll={scroll} />
      {SHAPES.map((shape) => (
        <FloatingShape key={shape.id} shape={shape} scroll={scroll} />
      ))}
    </Canvas>
  )
}
