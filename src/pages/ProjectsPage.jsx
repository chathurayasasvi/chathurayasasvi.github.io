import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ALL_PROJECTS, PROJECT_CATEGORIES } from '../data'
import ProjectGallery from '../components/ProjectGallery'
import Nav from '../components/Nav'

// ─── Cross-section SVGs ───────────────────────────────────────────────────────

function FR4CrossSection() {
  const layers = [
    { label: 'F.Cu',   color: '#c07a3f', h: 5  },
    { label: 'Prpreg', color: '#0e1a0e', h: 8  },
    { label: 'In1.Cu', color: '#a0622a', h: 4  },
    { label: 'Core',   color: '#0a140a', h: 10 },
    { label: 'In2.Cu', color: '#a0622a', h: 4  },
    { label: 'Prpreg', color: '#0e1a0e', h: 8  },
    { label: 'B.Cu',   color: '#c07a3f', h: 5  },
  ]
  const totalH = layers.reduce((s, l) => s + l.h, 0) + layers.length * 2
  let y = 0
  return (
    <svg viewBox={`0 0 220 ${totalH + 4}`} className="w-full" style={{ maxHeight: 72 }}>
      {layers.map((l, i) => {
        const ly = y + 1
        y += l.h + 2
        return (
          <g key={i}>
            <rect x="0" y={ly} width="160" height={l.h} fill={l.color} opacity={l.color === '#c07a3f' || l.color === '#a0622a' ? 0.9 : 0.7} rx="1" />
            <text x="166" y={ly + l.h / 2 + 3} fill="rgba(255,255,255,0.3)" fontSize="5.5" fontFamily="monospace">{l.label}</text>
          </g>
        )
      })}
      {/* Vias through all layers */}
      {[30, 70, 110].map(vx => (
        <g key={vx}>
          <rect x={vx - 2} y="1" width="4" height={totalH + 2} fill="#c07a3f" opacity="0.85" rx="1" />
          <circle cx={vx} cy="1" r="3.5" fill="#080808" stroke="#c07a3f" strokeWidth="1" />
          <circle cx={vx} cy={totalH + 3} r="3.5" fill="#080808" stroke="#c07a3f" strokeWidth="1" />
        </g>
      ))}
    </svg>
  )
}

function FlexCrossSection() {
  return (
    <svg viewBox="0 0 220 72" className="w-full" style={{ maxHeight: 72 }}>
      {/* Flex board curving in 3D perspective */}
      {/* Polyimide substrate — amber strip that curves */}
      <path d="M 10,52 C 50,52 60,20 110,20 C 160,20 170,40 210,38" fill="none" stroke="#8B5E2A" strokeWidth="10" strokeLinecap="round" opacity="0.6" />
      {/* Copper trace on top */}
      <path d="M 10,49 C 50,49 60,17 110,17 C 160,17 170,37 210,35" fill="none" stroke="#c07a3f" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      {/* Coverlay */}
      <path d="M 10,55 C 50,55 60,23 110,23 C 160,23 170,43 210,41" fill="none" stroke="#0e1a0e" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      {/* Serpentine stress-relief section */}
      <path d="M 80,30 C 85,15 95,35 100,20 C 105,5 115,25 120,12" fill="none" stroke="#c07a3f" strokeWidth="1.5" opacity="0.6" />
      {/* Pad at each end */}
      <rect x="4" y="44" width="16" height="14" rx="2" fill="#c07a3f" opacity="0.8" />
      <rect x="200" y="28" width="16" height="14" rx="2" fill="#c07a3f" opacity="0.8" />
      {/* Labels */}
      <text x="8" y="68" fill="rgba(255,255,255,0.25)" fontSize="5.5" fontFamily="monospace">Polyimide</text>
      <text x="148" y="68" fill="rgba(192,122,63,0.4)" fontSize="5.5" fontFamily="monospace">Copper trace</text>
    </svg>
  )
}

function AluminiumCrossSection() {
  return (
    <svg viewBox="0 0 220 72" className="w-full" style={{ maxHeight: 72 }}>
      {/* Copper traces on top — thin */}
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x={8 + i * 28} y="6" width="18" height="5" fill="#c07a3f" opacity="0.85" rx="1" />
      ))}
      {/* Dielectric layer */}
      <rect x="0" y="14" width="210" height="10" fill="#1a2a1a" opacity="0.9" rx="1" />
      <text x="4" y="22" fill="rgba(255,255,255,0.2)" fontSize="5" fontFamily="monospace">Dielectric</text>
      {/* Aluminium core — thick, silver */}
      <rect x="0" y="26" width="210" height="32" fill="#2a2a2a" opacity="0.9" rx="1" />
      <rect x="0" y="26" width="210" height="32" fill="url(#algrad)" opacity="0.4" rx="1" />
      <defs>
        <linearGradient id="algrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#888" />
          <stop offset="100%" stopColor="#333" />
        </linearGradient>
      </defs>
      <text x="80" y="46" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace">Al CORE</text>
      {/* Heat dissipation arrows */}
      {[20, 60, 100, 140, 180].map(x => (
        <g key={x} opacity="0.35">
          <line x1={x} y1="60" x2={x} y2="70" stroke="#c07a3f" strokeWidth="1" />
          <polyline points={`${x - 3},66 ${x},70 ${x + 3},66`} fill="none" stroke="#c07a3f" strokeWidth="1" />
        </g>
      ))}
      <text x="4" y="72" fill="rgba(192,122,63,0.3)" fontSize="5" fontFamily="monospace">thermal dissipation</text>
    </svg>
  )
}

// ─── Board capability cards ───────────────────────────────────────────────────

const BOARD_TYPES = [
  {
    id: 'fr4',
    label: 'FR4 Rigid',
    sub: 'Up to 6 layers',
    color: '#c07a3f',
    accent: 'rgba(192,122,63,0.08)',
    border: 'rgba(192,122,63,0.2)',
    svg: FR4CrossSection,
    specs: ['Mixed-signal & HV layouts', 'Impedance-controlled routing', 'PoE, USB 3.0, PCIe'],
    note: '6L · FR4 · up to 110–230V AC',
  },
  {
    id: 'flex',
    label: 'Flex PCB',
    sub: 'Polyimide substrate',
    color: '#a07040',
    accent: 'rgba(160,112,64,0.06)',
    border: 'rgba(160,112,64,0.18)',
    svg: FlexCrossSection,
    specs: ['Wearable & body-conforming', 'Serpentine stress-relief traces', 'Rigid-flex hybrids'],
    note: '2L · Polyimide · wearable',
  },
  {
    id: 'aluminium',
    label: 'Aluminium',
    sub: 'Metal core substrate',
    color: '#888',
    accent: 'rgba(136,136,136,0.05)',
    border: 'rgba(136,136,136,0.15)',
    svg: AluminiumCrossSection,
    specs: ['High-power LED drivers', 'Thermal management', 'MCPCB / IMS stack-up'],
    note: '1–2L · Al core · thermal mgmt',
  },
]

const TECH_METRICS = [
  { val: '10',       label: 'projects shipped' },
  { val: '6L',       label: 'max layer count'  },
  { val: '110–230V', label: 'HV AC experience' },
  { val: '70µA',     label: 'lowest sleep I'   },
  { val: 'PCIe',     label: 'high-speed SI'    },
  { val: 'BLE+LoRa', label: 'wireless stacks'  },
]

function BoardCapabilities() {
  return (
    <div className="mt-10 pt-10 border-t border-[#111]">
      <p className="font-mono text-[10px] text-[#aaa] uppercase tracking-widest mb-5">Board types &amp; substrates</p>

      {/* Three board type cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {BOARD_TYPES.map(b => (
          <div
            key={b.id}
            className="rounded border p-4 flex flex-col gap-3"
            style={{ borderColor: b.border, background: b.accent }}
          >
            {/* Cross-section visual */}
            <div className="rounded overflow-hidden bg-[#080808] p-3 border border-[#111]">
              <b.svg />
            </div>

            {/* Header */}
            <div>
              <p className="font-mono text-xs font-bold tracking-wide" style={{ color: b.color }}>{b.label}</p>
              <p className="font-mono text-[10px] text-[#aaa] mt-0.5">{b.sub}</p>
            </div>

            {/* Specs */}
            <ul className="flex flex-col gap-1.5 flex-1">
              {b.specs.map(s => (
                <li key={s} className="flex items-start gap-2 font-mono text-[10px] text-[#888]">
                  <span className="text-[#2a2a2a] flex-shrink-0">—</span>
                  {s}
                </li>
              ))}
            </ul>

            {/* Stack note */}
            <p className="font-mono text-[9px] text-[#2a2a2a] uppercase tracking-widest border-t pt-2" style={{ borderColor: b.border }}>{b.note}</p>
          </div>
        ))}
      </div>

      {/* Technical metrics — compact chips row */}
      <div className="flex flex-wrap gap-2">
        {TECH_METRICS.map(m => (
          <div key={m.val} className="flex items-baseline gap-1.5 px-3 py-1.5 rounded-sm border border-[#1a1a1a] bg-[#0d0d0d]">
            <span className="font-mono text-xs font-black text-[#c07a3f]">{m.val}</span>
            <span className="font-mono text-[9px] text-[#aaa] uppercase tracking-widest">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function NDABadge() {
  return (
    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm border border-[#333] text-[#888] tracking-wider">
      NDA
    </span>
  )
}

function StatusBadge({ status }) {
  const cls = status === 'In Production'
    ? 'border-[#c07a3f]/30 text-[#c07a3f] bg-[#c07a3f]/8'
    : status === 'Ongoing'
    ? 'border-[#555]/30 text-[#aaa]'
    : 'border-[#2a2a2a] text-[#aaa]'
  return (
    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-sm border ${cls}`}>{status}</span>
  )
}

function LayerBadge({ layers }) {
  return (
    <span className="font-mono text-[10px] px-2 py-0.5 border border-[#c07a3f]/20 text-[#c07a3f]/80 rounded-sm bg-[#c07a3f]/5">
      {layers}
    </span>
  )
}

function ProjectCard({ project: p, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
      className="group relative rounded border border-[#1a1a1a] bg-[#0d0d0d] flex flex-col hover:border-[#c07a3f]/25 transition-colors duration-300 overflow-hidden"
    >
      {/* PCB render */}
      <ProjectGallery project={p} />

      <div className="flex flex-col gap-3 p-4 sm:p-5 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="font-mono text-[11px] text-[#c07a3f]/60">{p.id}</span>
          <div className="flex items-center gap-2 flex-wrap">
            <LayerBadge layers={p.layers} />
            {p.nda && <NDABadge />}
            <StatusBadge status={p.status} />
          </div>
        </div>

        {/* MCU tag if present */}
        {p.mcu && (
          <span className="font-mono text-[10px] text-[#888] uppercase tracking-widest">{p.mcu}</span>
        )}

        {/* Title */}
        <h3 className="text-sm font-bold text-[#e0dbd3] leading-snug">{p.title}</h3>

        {/* Body */}
        <p className="text-xs text-[#aaa] leading-relaxed flex-1">{p.body}</p>

        {/* Specs */}
        <ul className="flex flex-col gap-1.5">
          {p.specs.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-[11px] text-[#888] font-mono leading-relaxed">
              <span className="text-[#2a2a2a] flex-shrink-0 select-none">—</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>

        {/* Tags & Link */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map(t => (
              <span key={t} className="text-[10px] font-mono text-[#888] px-2 py-0.5 rounded-sm border border-[#1e1e1e] bg-[#111]">
                {t}
              </span>
            ))}
          </div>

          {p.link && (
            <a 
              href={p.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] text-[#c07a3f] hover:text-[#e09a5f] transition-colors border-b border-[#c07a3f]/0 hover:border-[#c07a3f]/40 pb-0.5"
            >
              {p.link.label}
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 1L6 6m5-5v4m0-4H7m0 10h-5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h4" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Hover trace */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-[#c07a3f] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  )
}

export default function ProjectsPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-[#080808]">
      <Nav />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] text-[#888] hover:text-[#c07a3f] transition-colors mb-8 group"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:-translate-x-0.5 transition-transform">
              <line x1="10" y1="6" x2="2" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <polyline points="5,3 2,6 5,9" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to portfolio
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-6 bg-[#c07a3f]" />
            <p className="font-mono text-[11px] text-[#c07a3f] tracking-widest uppercase">All Work</p>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#e0dbd3] tracking-tight mb-4">
            Projects
          </h1>
          <p className="text-sm text-[#aaa] max-w-xl leading-relaxed">
            10 projects across industrial control, high-speed digital, flex PCB, ultra-low power, and system-level engineering.
            Each one shipped — from first schematic to production.
          </p>

          {/* Board type capability showcase */}
          <BoardCapabilities />
        </motion.div>

        {/* Projects by category */}
        {PROJECT_CATEGORIES.map((cat) => {
          const projects = ALL_PROJECTS.filter(p => p.cat === cat.id)
          if (!projects.length) return null
          return (
            <section key={cat.id} className="mb-20">
              {/* Category header */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-4 mb-8 pb-4 border-b border-[#111]"
              >
                <div>
                  <p className="font-mono text-[10px] text-[#aaa] uppercase tracking-widest mb-1">{cat.note}</p>
                  <h2 className="text-lg font-bold text-[#e0dbd3] tracking-tight">{cat.label}</h2>
                </div>
                <span className="ml-auto font-mono text-[11px] text-[#2a2a2a]">{projects.length} project{projects.length > 1 ? 's' : ''}</span>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {projects.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} />
                ))}
              </div>
            </section>
          )
        })}

        {/* Testing & Validation note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-[#1a1a1a] rounded p-6 bg-[#0d0d0d]"
        >
          <p className="font-mono text-[10px] text-[#c07a3f] uppercase tracking-widest mb-3">Applied to every project</p>
          <h3 className="text-sm font-bold text-[#e0dbd3] mb-4">Testing & Validation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Bring-up & Debugging', detail: 'Hands-on first-article PCB bring-up on every board designed.' },
              { label: 'Custom Test Firmware', detail: 'Wrote validation firmware for every designed board to verify hardware functionality.' },
              { label: 'Automated Validation', detail: 'Developed automated and semi-automated scripts to verify boards against design spec prior to production.' },
            ].map(({ label, detail }) => (
              <div key={label} className="border-l-2 border-[#c07a3f]/30 pl-4">
                <p className="font-mono text-[11px] text-[#c07a3f]/80 font-semibold mb-1">{label}</p>
                <p className="text-[11px] text-[#888] leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
