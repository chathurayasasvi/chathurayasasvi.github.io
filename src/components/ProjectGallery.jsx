import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import ProjectImage from './ProjectSVG'
import Lightbox from './Lightbox'

export default function ProjectGallery({ project }) {
  const images = project.images || []
  const hasImages = images.length > 0

  // Start at the thumbnail if specified, otherwise the first image
  const initialIndex = project.thumbnail && images.includes(project.thumbnail)
    ? images.indexOf(project.thumbnail)
    : 0

  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isHovered, setIsHovered] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Auto-advance (pause on GIF slide so it can play through)
  const currentIsGif = images[currentIndex]?.endsWith('.gif')
  useEffect(() => {
    if (!hasImages || images.length <= 1 || isHovered || lightboxOpen || currentIsGif) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [hasImages, images.length, isHovered, lightboxOpen, currentIsGif])

  if (!hasImages) {
    return (
      <div className="relative border-b border-[#111] bg-[#080808] aspect-[16/9] w-full group overflow-hidden">
        {/* The PCB SVG base */}
        <ProjectImage id={project.id} />
        
        {/* Creative Overlay if a link exists */}
        {project.link && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-all group-hover:bg-black/10">
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-6 py-2.5 bg-[#0d0d0d] border border-[#c07a3f]/40 text-[#c07a3f] font-mono text-[11px] uppercase tracking-widest rounded-sm hover:bg-[#c07a3f] hover:text-[#0d0d0d] transition-all duration-300 flex items-center gap-3 active:scale-95 shadow-xl shadow-black/60"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c07a3f] animate-pulse" />
              {project.link.label || 'View Resource'}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 1L6 6m5-5v4m0-4H7m0 10h-5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h4" />
              </svg>
            </a>
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px)',
        }} />
      </div>
    )
  }

  const navigate = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    } else {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }
  }

  return (
    <>
      <div
        className="relative border-b border-[#111] bg-[#080808] aspect-[16/9] w-full group overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`${project.title} - view ${currentIndex + 1}`}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px)',
        }} />

        {/* Zoom Button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLightboxOpen(true); }}
          className="absolute inset-0 w-full h-full cursor-zoom-in z-0 flex items-start justify-end p-3"
          title="Click to Zoom"
        >
          <div className="p-2 bg-black/60 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#c07a3f]">
            <Maximize2 size={16} />
          </div>
        </button>

        {/* Navigation Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('prev'); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#c07a3f] z-10 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('next'); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#c07a3f] z-10 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 items-center">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-[#c07a3f]' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox Portal */}
      {lightboxOpen && createPortal(
        <Lightbox
          images={images}
          currentIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={navigate}
        />,
        document.body
      )}
    </>
  )
}
