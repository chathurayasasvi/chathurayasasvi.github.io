import { 
  ArduinoIcon, ZephyrIcon, KiCadIcon, AltiumIcon, 
  NRFIcon, STM32Icon, ESP32Icon, FreeRTOSIcon, 
  YoctoIcon, PythonIcon 
} from './TechnicalIcons';

// Polished 2D PCB layer stack visualization
function LayerStack() {
  const stack = [
    { name: 'Top Layer', copper: 'F.Cu', thick: '0.035mm', type: 'outer', height: 6, color: '#c07a3f' },
    { name: 'Prepreg 3313', copper: '', thick: '0.0994mm', type: 'substrate', height: 8, color: '#1a3d1a' },
    { name: 'Inner L2', copper: 'In1.Cu', thick: '0.0152mm', type: 'inner', height: 4, color: '#a06830' },
    { name: 'Core', copper: '', thick: '0.55mm', type: 'substrate', height: 16, color: '#142d14' },
    { name: 'Inner L3', copper: 'In2.Cu', thick: '0.0152mm', type: 'inner', height: 4, color: '#a06830' },
    { name: 'Prepreg 2116', copper: '', thick: '0.1164mm', type: 'substrate', height: 10, color: '#1a3d1a' },
    { name: 'Inner L4', copper: 'In3.Cu', thick: '0.0152mm', type: 'inner', height: 4, color: '#a06830' },
    { name: 'Core', copper: '', thick: '0.55mm', type: 'substrate', height: 16, color: '#142d14' },
    { name: 'Inner L5', copper: 'In4.Cu', thick: '0.0152mm', type: 'inner', height: 4, color: '#a06830' },
    { name: 'Prepreg 3313', copper: '', thick: '0.0994mm', type: 'substrate', height: 8, color: '#1a3d1a' },
    { name: 'Bottom Layer', copper: 'B.Cu', thick: '0.035mm', type: 'outer', height: 6, color: '#c07a3f' },
  ]

  return (
    <div className="rounded-sm border border-[#1a1a1a] bg-[#0d0d0d] p-6 mb-10 relative group overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-[10px] text-[#aaa] uppercase tracking-[0.2em] px-2 py-0.5 border border-[#c07a3f]/20 rounded-sm">JLC06161H Stackup</p>
        <span className="font-mono text-[10px] text-[#444]">1.6mm TOTAL</span>
      </div>
      
      <div className="flex flex-col gap-[2px] relative z-10">
        {stack.map((l, i) => (
          <div key={i} className="flex items-center gap-4 group/row">
            <div
              className="rounded-[1px] flex-shrink-0 transition-transform duration-300 group-hover/row:scale-x-[1.02] origin-left"
              style={{ 
                width: 'clamp(80px, 15vw, 140px)', 
                height: `${l.height}px`,
                backgroundColor: l.color,
                opacity: l.type === 'substrate' ? 0.35 : 0.9,
                boxShadow: l.type !== 'substrate' ? `0 0 10px ${l.color}11` : 'none'
              }}
            />
            <div className="flex items-center justify-between flex-1 gap-2">
              <div className="flex flex-col">
                <span className={`font-mono text-[10px] tracking-wide ${l.type !== 'substrate' ? 'text-[#e0dbd3]' : 'text-[#555]'}`}>
                  {l.name}
                </span>
                {l.copper && <span className="font-mono text-[9px] text-[#c07a3f]/60 uppercase">{l.copper}</span>}
              </div>
              <span className="font-mono text-[10px] text-[#444] group-hover/row:text-[#888] transition-colors">{l.thick}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative vertical cross-section line */}
      <div className="absolute left-6 top-16 bottom-16 w-px bg-gradient-to-b from-transparent via-[#c07a3f]/10 to-transparent pointer-events-none" />
    </div>
  )
}

const CATEGORY_ICONS = {
  'PCB Design': KiCadIcon,
  'EDA Tools': AltiumIcon,
  'MCUs & SBCs': NRFIcon,
  'Protocols & Wireless': ZephyrIcon,
  'Firmware & OS': FreeRTOSIcon,
  'Testing & Validation': ESP32Icon,
};

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" className="py-16 md:py-32 border-t border-[#141414] bg-[#080808]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#c07a3f]" />
            <p className="font-mono text-[11px] text-[#c07a3f] tracking-widest uppercase">Toolchain & Expertise</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#e0dbd3] tracking-tighter uppercase italic">
            Capability <span className="text-[#c07a3f] inline-block -skew-x-12">Matrix</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20 items-start">
          {/* Left — layer stack overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:sticky lg:top-32"
          >
            <LayerStack />
            <div className="border-l-2 border-[#c07a3f]/40 pl-5 py-2">
              <p className="text-[13px] text-[#888] leading-relaxed font-mono italic">
                Engineering precision across the full stack. From impedance-controlled multi-layer layouts 
                to low-power silicon optimization and custom OS integration.
              </p>
            </div>
          </motion.div>

          {/* Right — Chessboard Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#111] border border-[#111]"
          >
            {SKILLS.map((s, i) => {
              const Icon = CATEGORY_ICONS[s.category] || ArduinoIcon;
              return (
                <motion.div
                  key={s.category}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="bg-[#080808] p-8 md:p-10 relative group overflow-hidden hover:bg-[#0a0a0a] transition-colors"
                >
                  {/* Chessboard numbering */}
                  <span className="absolute top-4 right-6 font-mono text-[10px] text-[#222] group-hover:text-[#c07a3f]/20 transition-colors">
                    {`L${i + 1} // 0${i + 1}`}
                  </span>

                  <div className="flex flex-col gap-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 text-[#c07a3f] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                        <Icon />
                      </div>
                      <h3 className="font-mono text-lg font-bold text-[#e0dbd3] uppercase tracking-wide group-hover:text-[#c07a3f] transition-colors">
                        {s.category}
                      </h3>
                    </div>

                    <p className="text-[15px] md:text-[17px] text-[#aaa] leading-relaxed group-hover:text-[#ccc] transition-colors font-medium">
                      {s.items}
                    </p>

                    {/* Subtle trace line footer */}
                    <div className="h-0.5 w-8 bg-[#c07a3f]/20 group-hover:w-full transition-all duration-700 ease-out" />
                  </div>

                  {/* Corner accent for checkerboard feel */}
                  <div className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-[#c07a3f]" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
