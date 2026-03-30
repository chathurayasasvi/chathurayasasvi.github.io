import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="about" className="py-16 md:py-32 border-t border-[#141414]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6 bg-[#c07a3f]" />
              <p className="font-mono text-[11px] text-[#c07a3f] tracking-widest uppercase">About</p>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[#e0dbd3] tracking-tight mb-8 leading-tight">
              Four years.<br />
              Four products shipped.<br />
              <span className="text-[#888]">Same company.</span>
            </h2>

            <div className="space-y-5 text-[#aaa] text-sm leading-relaxed">
              <p>
                I am an Embedded Systems Engineer at Atlas Labs, where I have navigated four promotions from Intern to Level 2 since 2022. My progression is built on a simple premise: I take full ownership of the products I build. To date, I have led four major hardware products from initial concept to successful market launch.
                I specialize in the full hardware stack—Schematic → PCB Layout → Firmware → Production Validation. I am most effective when solving the "hard problems" of volume production, whether that's maintaining signal integrity on high-speed PCIe interfaces, optimizing IoT devices for 70µA deep-sleep states, or authoring custom drivers from scratch to bypass critical bottlenecks.
                I believe an engineer's job isn't done at the "Export Gerber" stage; it's done when the production yield is optimized and the hardware is performing reliably in the field. This commitment to reliability is backed by a First Class Honours BEng from London Metropolitan University, where I received the Best Performer and Most Outstanding Performance awards.


              </p>
              <p>
                My focus is the full hardware stack: schematic to PCB layout to firmware to production
                validation. I'm most useful on projects where the hard problem isn't "what chip do we use"
                but "how do we make this thing work reliably at volume."
              </p>
              <p>
                Background in Electronic & Communication Engineering —{' '}
                <span className="text-[#e0dbd3]">First Class Honours</span> from London Metropolitan
                University, Best Performer and Most Outstanding Performance awards for the 2019/20 cohort.
              </p>
            </div>
          </motion.div>

          {/* Contact / info — styled as a PCB BOM table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            {/* Table header */}
            <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] mb-1">
              <span className="font-mono text-[9px] text-[#2a2a2a] uppercase tracking-widest">Designator</span>
              <span className="font-mono text-[9px] text-[#2a2a2a] uppercase tracking-widest">Value</span>
            </div>
            <div className="h-px bg-[#c07a3f]/20 mb-1" />

            <div className="divide-y divide-[#141414]">
              {[
                { ref: 'ROLE', value: 'Embedded Engineer — Level 2' },
                { ref: 'COMPANY', value: 'Atlas Labs' },
                { ref: 'LOCATION', value: 'Kalutara, Sri Lanka' },
                { ref: 'EMAIL', value: 'chathurayasasvi@gmail.com', href: 'mailto:chathurayasasvi@gmail.com' },
                { ref: 'PHONE', value: '+94 71 048 2233', href: 'tel:+94710482233' },
                { ref: 'LINKEDIN', value: '/in/chathurafernando', href: 'https://linkedin.com/in/chathurafernando', ext: true },
              ].map(({ ref, value, href, ext }) => (
                <div key={ref} className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] items-center py-3.5 group hover:bg-[#0d0d0d] -mx-1 px-1 transition-colors duration-150">
                  <span className="font-mono text-[10px] text-[#aaa] tracking-wider">{ref}</span>
                  {href ? (
                    <a href={href} target={ext ? '_blank' : undefined} rel={ext ? 'noreferrer' : undefined}
                      className="text-xs text-[#666] hover:text-[#c07a3f] transition-colors duration-200 font-mono truncate">
                      {value}
                    </a>
                  ) : (
                    <span className="text-xs text-[#666] font-mono">{value}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="h-px bg-[#c07a3f]/20 mt-1" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
