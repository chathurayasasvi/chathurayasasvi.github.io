import { motion } from 'framer-motion'
import { MARQUEE_ITEMS } from '../data'
import TraceBackground from './TraceBackground'

export default function Hero() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      {/* PCB trace background — fills the section */}
      <TraceBackground />

      {/* Dark soldermask overlay — darkens the traces so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/90 to-[#080808]/40 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Status — styled like a PCB build status */}
          <div className="flex items-center gap-3 mb-10">
            <span className="w-2 h-2 rounded-full bg-[#c07a3f] via-pulse flex-shrink-0" />
            <span className="font-mono text-[11px] text-[#666] tracking-widest uppercase">
              Open to new work · Kalutara, Sri Lanka
            </span>
          </div>

          {/* Name */}
          <h1
            className="font-black text-[#e0dbd3] leading-none tracking-tight mb-3"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 7.5rem)', letterSpacing: '-0.04em' }}
          >
            Chathura
          </h1>
          <h1
            className="font-black leading-none tracking-tight mb-8"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 7.5rem)',
              letterSpacing: '-0.04em',
              color: '#c07a3f',
            }}
          >
            Fernando
          </h1>

          {/* Role — like a silkscreen label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#c07a3f]" />
            <span className="font-mono text-xs text-[#c07a3f] tracking-widest uppercase">
              PCB Designer & Embedded Systems Engineer
            </span>
          </div>

          <p className="text-[#666] leading-relaxed mb-12 max-w-lg text-sm md:text-base">
            I design the board. Write the driver. Build the test jig.
            Ship the product. Three years at Atlas Labs doing exactly that —
            from 6-layer mixed-signal mainboards to 70µA IoT devices.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('#work')}
              className="px-6 py-3 rounded text-sm font-semibold text-[#080808] bg-[#c07a3f] hover:bg-[#d4894d] transition-colors duration-200"
            >
              See my work
            </button>
            <a
              href="/Chathura_Fernando_CV.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 rounded text-sm font-mono text-[#888] border border-[#222] hover:border-[#c07a3f]/40 hover:text-[#c07a3f] transition-colors duration-200"
            >
              {/* Download icon — PCB-style arrow */}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <line x1="6.5" y1="1" x2="6.5" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <polyline points="3.5,6.5 6.5,9.5 9.5,6.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="1" y1="12" x2="12" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Download CV
            </a>
          </div>
        </motion.div>
      </div>

      {/* Marquee — bottom of hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 mt-20 border-t border-b border-[#1a1a1a] py-3.5 overflow-hidden"
      >
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center gap-4 px-4">
              <span className="text-[11px] font-mono text-[#888] whitespace-nowrap">{item}</span>
              {/* Via dot separator */}
              <svg width="7" height="7" viewBox="0 0 7 7" className="flex-shrink-0" aria-hidden="true">
                <circle cx="3.5" cy="3.5" r="3" fill="none" stroke="#333" strokeWidth="1" />
                <circle cx="3.5" cy="3.5" r="1" fill="#3a3a3a" />
              </svg>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
