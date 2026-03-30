import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contact" className="py-16 md:py-32 border-t border-[#141414]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-[#c07a3f]" />
            <p className="font-mono text-[11px] text-[#c07a3f] tracking-widest uppercase">Contact</p>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-[#e0dbd3] tracking-tight mb-5 leading-tight">
            Got a hardware problem?
            <br />
            <span className="text-[#888]">Let's sort it out.</span>
          </h2>
          <p className="text-sm text-[#aaa] leading-relaxed mb-12">
            Whether it's a product going into production, a tricky layout problem, or something
            that needs a driver written from scratch — reach out.
          </p>

          <a
            href="/Chathura_Fernando_CV.pdf"
            download
            className="inline-flex items-center gap-2.5 mb-10 font-mono text-xs text-[#c07a3f] border border-[#c07a3f]/25 px-4 py-2.5 rounded hover:bg-[#c07a3f]/8 transition-colors duration-200 self-start"
          >
            <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <line x1="6.5" y1="1" x2="6.5" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <polyline points="3.5,6.5 6.5,9.5 9.5,6.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="1" y1="12" x2="12" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            DOWNLOAD CV — PDF
          </a>

          <div className="flex flex-col gap-0 border-t border-[#c07a3f]/15">
            {[
              { label: 'Email', value: 'chathurayasasvi@gmail.com', href: 'mailto:chathurayasasvi@gmail.com' },
              { label: 'Phone', value: '+94 71 048 2233', href: 'tel:+94710482233' },
              { label: 'LinkedIn', value: '/in/chathurafernando', href: 'https://linkedin.com/in/chathurafernando', ext: true },
            ].map(({ label, value, href, ext }) => (
              <a
                key={label}
                href={href}
                target={ext ? '_blank' : undefined}
                rel={ext ? 'noreferrer' : undefined}
                className="group flex items-center justify-between py-5 border-b border-[#141414] hover:border-[#c07a3f]/20 transition-colors duration-300"
              >
                <span className="font-mono text-[10px] text-[#aaa] uppercase tracking-widest">{label}</span>
                <span className="font-mono text-xs text-[#666] group-hover:text-[#c07a3f] transition-colors duration-200">
                  {value}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
