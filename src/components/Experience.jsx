import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EXPERIENCE } from '../data'

const EDUCATION = [
  {
    degree: 'BEng Electronic & Communication Engineering',
    school: 'London Metropolitan University',
    period: '2019 – 2020',
    honours: 'First Class Honours',
    awards: ['Best Performer Award 2019/20', 'Most Outstanding Performance 2019/20'],
  },
  {
    degree: 'Pearson BTEC HND — Electrical & Electronic Engineering',
    school: 'ESOFT College of Engineering',
    period: '2018 – 2019',
    honours: null,
    awards: [],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="experience" className="py-32 border-t border-[#141414]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-6 bg-[#c07a3f]" />
            <p className="font-mono text-[11px] text-[#c07a3f] tracking-widest uppercase">Career</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#e0dbd3] tracking-tight">Experience</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-0 top-3 bottom-12 w-px bg-[#1a1a1a] hidden md:block" />

          <div className="flex flex-col gap-0">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.08 + i * 0.07 }}
                className="relative grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 md:gap-12 pb-10 md:pl-6"
              >
                {/* Dot — styled as a PCB via */}
                <div className="hidden md:flex absolute left-0 top-2 -translate-x-[4.5px] items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                    <circle cx="5" cy="5" r="4.5" fill="#080808" stroke={exp.current ? '#c07a3f' : '#2a2a2a'} strokeWidth="1.2" />
                    <circle cx="5" cy="5" r="2" fill={exp.current ? '#c07a3f' : '#222'} />
                  </svg>
                </div>

                {/* Left meta */}
                <div>
                  <p className="font-mono text-[10px] text-[#888] mb-1 tracking-wider">{exp.period}</p>
                  <p className="font-mono text-[11px] font-bold text-[#c07a3f]/80 mb-1 tracking-wide">{exp.company}</p>
                  <p className="text-sm font-semibold text-[#e0dbd3] leading-snug max-w-[280px] md:max-w-none">
                    {exp.role}
                    {exp.current && (
                      <span className="ml-2 font-mono text-[9px] px-1.5 py-0.5 rounded-sm border border-[#c07a3f]/30 text-[#c07a3f] bg-[#c07a3f]/6 align-middle whitespace-nowrap">
                        now
                      </span>
                    )}
                  </p>
                </div>

                {/* Bullets */}
                <ul className="flex flex-col gap-2.5 mt-0.5">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-xs text-[#aaa]">
                      <span className="text-[#2a2a2a] flex-shrink-0 mt-0.5 select-none font-mono">—</span>
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-12 border-t border-[#141414]"
        >
          <p className="font-mono text-[10px] text-[#aaa] uppercase tracking-widest mb-6">Education</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#141414]">
            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="bg-[#080808] p-6">
                <p className="font-mono text-[10px] text-[#aaa] mb-3 tracking-wider">
                  {edu.period}{edu.honours ? ` · ${edu.honours}` : ''}
                </p>
                <h4 className="text-sm font-bold text-[#e0dbd3] mb-1 leading-snug">{edu.degree}</h4>
                <p className="text-xs text-[#888] mb-4">{edu.school}</p>
                {edu.awards.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {edu.awards.map(a => (
                      <span key={a} className="font-mono text-[11px] text-[#c07a3f]/70 flex items-center gap-2">
                        <span className="w-4 h-px bg-[#c07a3f]/40" />
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
