import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const ANCHOR_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (href) => {
    if (!isHome) {
      navigate('/')
      // wait for home to mount then scroll
      setTimeout(() => {
        const el = document.querySelector(href)
        if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: 'smooth' })
      }, 80)
    } else {
      const el = document.querySelector(href)
      if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: 'smooth' })
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/4' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-mono text-sm font-bold text-[#c07a3f] tracking-tight hover:opacity-70 transition-opacity flex items-center gap-1.5"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="8" cy="8" r="7" fill="none" stroke="#c07a3f" strokeWidth="1.2" />
            <circle cx="8" cy="8" r="3" fill="none" stroke="#c07a3f" strokeWidth="1" />
            <circle cx="8" cy="8" r="1" fill="#c07a3f" />
          </svg>
          CF
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {ANCHOR_LINKS.map(l => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="font-mono text-xs text-[#aaa] hover:text-[#e0dbd3] transition-colors duration-200 tracking-wider uppercase"
            >
              {l.label}
            </button>
          ))}
          <Link
            to="/projects"
            className={`font-mono text-xs tracking-wider uppercase transition-colors duration-200 ${
              location.pathname === '/projects'
                ? 'text-[#c07a3f]'
                : 'text-[#aaa] hover:text-[#e0dbd3]'
            }`}
          >
            All Projects
          </Link>
          <button
            onClick={() => scrollTo('#contact')}
            className="font-mono text-xs font-semibold text-[#080808] bg-[#c07a3f] px-4 py-2 rounded hover:bg-[#d4894d] transition-colors duration-200 tracking-wider uppercase"
          >
            Contact
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 items-center justify-center w-8 h-8"
          aria-label="Menu"
        >
          <span className={`block w-5 h-px bg-[#e0dbd3] transition-all duration-200 ${open ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <span className={`block w-5 h-px bg-[#e0dbd3] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-[#e0dbd3] transition-all duration-200 ${open ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="glass border-t border-white/4 overflow-hidden md:hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {ANCHOR_LINKS.map(l => (
                <button key={l.href} onClick={() => { scrollTo(l.href); setOpen(false) }}
                  className="font-mono text-xs text-[#e0dbd3] text-left uppercase tracking-widest">{l.label}</button>
              ))}
              <Link
                to="/projects"
                onClick={() => setOpen(false)}
                className="font-mono text-xs text-[#c07a3f] text-left uppercase tracking-widest"
              >
                All Projects
              </Link>
              <button
                onClick={() => { scrollTo('#contact'); setOpen(false) }}
                className="font-mono text-xs font-semibold text-[#080808] bg-[#c07a3f] px-3 py-2 rounded w-full uppercase tracking-wider"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
