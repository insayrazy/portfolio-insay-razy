const shapes = [
  { id: 'ring', className: 'left-[8%] top-[22%] h-24 w-24', depth: 40, delay: '0s', type: 'ring' },
  { id: 'cube', className: 'right-[10%] top-[30%] h-16 w-16', depth: 60, delay: '-4s', type: 'square' },
  { id: 'tri', className: 'left-[18%] bottom-[18%] h-20 w-20', depth: 30, delay: '-7s', type: 'triangle' },
  { id: 'dot', className: 'right-[22%] bottom-[12%] h-10 w-10', depth: 80, delay: '-2s', type: 'orb' },
  { id: 'plus', className: 'left-[48%] top-[12%] h-12 w-12', depth: 50, delay: '-9s', type: 'plus' },
]

function Shape({ type }) {
  switch (type) {
    case 'ring':
      return <div className="h-full w-full rounded-full border border-indigo-300/20 shadow-[inset_0_0_30px_rgba(99,102,241,0.25)]" />
    case 'square':
      return (
        <div className="h-full w-full rotate-12 rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_40px_rgba(168,85,247,0.15)] backdrop-blur-sm" />
      )
    case 'triangle':
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path d="M50 8 94 88H6Z" fill="none" stroke="rgba(34,211,238,0.25)" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      )
    case 'orb':
      return <div className="h-full w-full rounded-full bg-gradient-to-br from-cyan-300/40 to-indigo-500/10 blur-[1px]" />
    case 'plus':
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path d="M50 15v70M15 50h70" stroke="rgba(168,85,247,0.3)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

/** Glass shapes drifting in the background with mouse parallax. */
export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 hidden md:block">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`absolute ${shape.className} transition-transform duration-[1.2s] ease-out`}
          style={{
            transform: `translate3d(calc(var(--mx) * ${shape.depth}px), calc(var(--my) * ${shape.depth}px), 0)`,
          }}
        >
          <div className="h-full w-full animate-float-slow" style={{ animationDelay: shape.delay }}>
            <Shape type={shape.type} />
          </div>
        </div>
      ))}
    </div>
  )
}
