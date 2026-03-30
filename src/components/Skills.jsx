import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SKILLS } from '../data'

// PCB layer stack visualization
function LayerStack() {
  const stack = [
    { name: 'Top Layer', copper: 'F.Cu', thick: '0.035mm', type: 'outer', height: 6 },
    { name: 'Prepreg 3313', copper: '', thick: '0.0994mm', type: 'substrate', height: 8 },
    { name: 'Inner L2', copper: 'In1.Cu', thick: '0.0152mm', type: 'inner', height: 4 },
    { name: 'Core', copper: '', thick: '0.55mm', type: 'substrate', height: 16 },
    { name: 'Inner L3', copper: 'In2.Cu', thick: '0.0152mm', type: 'inner', height: 4 },
    { name: 'Prepreg 2116', copper: '', thick: '0.1164mm', type: 'substrate', height: 10 },
    { name: 'Inner L4', copper: 'In3.Cu', thick: '0.0152mm', type: 'inner', height: 4 },
    { name: 'Core', copper: '', thick: '0.55mm', type: 'substrate', height: 16 },
    { name: 'Inner L5', copper: 'In4.Cu', thick: '0.0152mm', type: 'inner', height: 4 },
    { name: 'Prepreg 3313', copper: '', thick: '0.0994mm', type: 'substrate', height: 8 },
    { name: 'Bottom Layer', copper: 'B.Cu', thick: '0.035mm', type: 'outer', height: 6 },
  ]

  return (
    <div className="rounded border border-[#1a1a1a] bg-[#0d0d0d] p-5 mb-10">
      <p className="font-mono text-[10px] text-[#aaa] uppercase tracking-widest mb-5">JLC06161H-3313 Impedance Stack</p>
      <div className="flex flex-col gap-[2px]">
        {stack.map((l, i) => (
          <div key={i} className="flex items-center gap-4">
            <div
              className={`rounded-[1px] flex-shrink-0 transition-opacity ${
                l.type === 'outer' ? 'bg-[#c07a3f] opacity-90' :
                l.type === 'inner' ? 'bg-[#a06830] opacity-80' :
                'bg-[#1a3d1a] opacity-[0.25]'
              }`}
              style={{ width: 'clamp(60px, 20vw, 120px)', height: `${l.height}px` }}
            />
            <div className="flex items-center justify-between flex-1 max-w-[200px]">
              <div className="flex flex-col">
                <span className={`font-mono text-[10px] tracking-wide ${l.type !== 'substrate' ? 'text-[#c07a3f]/90' : 'text-[#888]'}`}>
                  {l.name}
                </span>
                {l.copper && <span className="font-mono text-[9px] text-[#666] uppercase">{l.copper}</span>}
              </div>
              <span className="font-mono text-[10px] text-[#888]">{l.thick}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" className="py-32 border-t border-[#141414]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-6 bg-[#c07a3f]" />
            <p className="font-mono text-[11px] text-[#c07a3f] tracking-widest uppercase">Technical</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#e0dbd3] tracking-tight">Stack</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12">
          {/* Left — layer stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <LayerStack />
            <p className="text-xs text-[#888] leading-relaxed font-mono">
              6-layer stack used on the AI monitoring system mainboard — balanced copper distribution
              for minimal warping, inner planes dedicated to GND and 5V power distribution.
            </p>
          </motion.div>

          {/* Right — skill rows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="divide-y divide-[#111]"
          >
            {SKILLS.map((s, i) => (
              <motion.div
                key={s.category}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.05 }}
                className="group grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2 sm:gap-8 py-4 hover:bg-[#0d0d0d] -mx-4 px-4 transition-colors duration-150"
              >
                <span className="font-mono text-[11px] font-semibold text-[#c07a3f]/80 uppercase tracking-wider self-start mt-0.5">
                  {s.category}
                </span>
                <span className="text-xs text-[#aaa] leading-relaxed">{s.items}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
