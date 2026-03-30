import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PROJECTS } from '../data'
import ProjectGallery from './ProjectGallery'

// Mini via SVG — used as bullet markers
function Via({ size = 8, color = '#c07a3f', opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" aria-hidden="true" style={{ opacity, flexShrink: 0 }}>
      <circle cx="4" cy="4" r="3.5" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="4" cy="4" r="1.5" fill={color} />
    </svg>
  )
}

// PCB layer stack badge
function LayerBadge({ layers }) {
  return (
    <span className="font-mono text-[10px] px-2 py-0.5 border border-[#c07a3f]/20 text-[#c07a3f]/80 rounded-sm bg-[#c07a3f]/5">
      {layers}
    </span>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="work" className="py-16 md:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Via size={10} opacity={0.7} />
              <p className="font-mono text-[11px] text-[#c07a3f] tracking-widest uppercase">Selected Work</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#e0dbd3] tracking-tight">
              Projects
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-3">
            <span className="font-mono text-[11px] text-[#aaa]">2022 – present</span>
            <Link
              to="/projects"
              className="flex items-center gap-2 font-mono text-[11px] text-[#c07a3f]/70 hover:text-[#c07a3f] transition-colors group"
            >
              View all 10 projects
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <polyline points="7,3 10,6 7,9" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </motion.div>

        <div className="bento">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              className={`bento-${p.bento}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/projects"
            className="flex items-center gap-2 font-mono text-xs text-[#aaa] border border-[#222] px-5 py-3 rounded hover:border-[#c07a3f]/40 hover:text-[#c07a3f] transition-colors duration-200 group"
          >
            See all 10 projects
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform">
              <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <polyline points="7,3 10,6 7,9" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project: p }) {
  return (
    <div className="group relative h-full rounded border border-[#1a1a1a] bg-[#0d0d0d] flex flex-col hover:border-[#c07a3f]/25 transition-colors duration-300 overflow-hidden">
      {/* PCB render — visual proof at the top */}
      <ProjectGallery project={p} />

      <div className="flex flex-col gap-3.5 p-4 sm:p-5 flex-1">
      {/* PCB-style corner marks */}
      <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#c07a3f]/20" />
      <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#c07a3f]/20" />

      {/* Header row */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="font-mono text-[11px] text-[#c07a3f]/60">{p.id}</span>
        <div className="flex items-center gap-2">
          <LayerBadge layers={p.layers} />
          <span className={`font-mono text-[10px] px-2 py-0.5 rounded-sm border ${
            p.status === 'In Production'
              ? 'border-[#c07a3f]/30 text-[#c07a3f] bg-[#c07a3f]/8'
              : p.status === 'Ongoing'
              ? 'border-[#555]/30 text-[#aaa]'
              : 'border-[#2a2a2a] text-[#aaa]'
          }`}>{p.status}</span>
        </div>
      </div>

      {/* Label */}
      <p className="font-mono text-[10px] text-[#888] uppercase tracking-widest">{p.label}</p>

      {/* Title */}
      <h3 className="text-sm font-bold text-[#e0dbd3] leading-snug">{p.title}</h3>

      {/* Body */}
      <p className="text-xs text-[#aaa] leading-relaxed flex-1">{p.body}</p>

      {/* Callout — bordered like a PCB test point note */}
      <div className="border-l-2 border-[#c07a3f]/50 pl-3 py-0.5">
        <p className="text-[11px] font-mono text-[#888] italic leading-relaxed">{p.callout}</p>
      </div>

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
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 font-mono text-[10px] text-[#c07a3f] hover:text-[#e09a5f] transition-colors border-b border-[#c07a3f]/0 hover:border-[#c07a3f]/40 pb-0.5"
          >
            {p.link.label}
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 1L6 6m5-5v4m0-4H7m0 10h-5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h4" />
            </svg>
          </a>
        )}
      </div>

      </div>{/* end inner padding div */}

      {/* Bottom trace line on hover */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-[#c07a3f] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  )
}
