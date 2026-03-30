import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, Maximize2, Play } from 'lucide-react'
import ProjectImage from './ProjectSVG'
import Lightbox from './Lightbox'

export default function ProjectGallery({ project }) {
  const images = project.images || []
  const video = project.video || null

  // Build a unified slide deck: images first, video last
  const slides = video ? [...images, { type: 'video', src: video }] : images
  const hasSlides = slides.length > 0

  const initialIndex = project.thumbnail && images.includes(project.thumbnail)
    ? images.indexOf(project.thumbnail)
    : 0

  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isHovered, setIsHovered] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const videoRef = useRef(null)

  const currentSlide = slides[currentIndex]
  const isVideo = currentSlide && typeof currentSlide === 'object' && currentSlide.type === 'video'
  const currentSrc = isVideo ? currentSlide.src : currentSlide

  // Auto-advance — pause on video slide
  useEffect(() => {
    if (!hasSlides || slides.length <= 1 || isHovered || lightboxOpen || isVideo) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [hasSlides, slides.length, isHovered, lightboxOpen, isVideo])

  if (!hasSlides) {
    return (
      <div className="relative border-b border-[#111] overflow-hidden bg-[#080808]">
        <ProjectImage id={project.id} />
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px)',
        }} />
      </div>
    )
  }

  const navigate = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    } else {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }
  }

  return (
    <>
      <div
        className="relative border-b border-[#111] bg-[#080808] aspect-[16/9] w-full group overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Video slide */}
        {isVideo ? (
          <video
            ref={videoRef}
            key={currentSrc}
            src={currentSrc}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            controls
            playsInline
            preload="metadata"
          />
        ) : (
          <>
            <img
              src={currentSrc}
              alt={`${project.title} - view ${currentIndex + 1}`}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
            {/* Zoom button — only on image slides */}
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLightboxOpen(true); }}
              className="absolute inset-0 w-full h-full cursor-zoom-in z-0 flex items-start justify-end p-3"
              title="Click to Zoom"
            >
              <div className="p-2 bg-black/60 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#c07a3f]">
                <Maximize2 size={16} />
              </div>
            </button>
          </>
        )}

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px)',
        }} />

        {/* Navigation controls */}
        {slides.length > 1 && (
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

            {/* Dots — triangle play icon on the video dot */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 items-center">
              {slides.map((slide, idx) => {
                const isVidDot = typeof slide === 'object' && slide.type === 'video'
                return isVidDot ? (
                  <div
                    key={idx}
                    className={`transition-colors flex items-center justify-center ${idx === currentIndex ? 'text-[#c07a3f]' : 'text-white/40'}`}
                  >
                    <Play size={10} fill="currentColor" />
                  </div>
                ) : (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-[#c07a3f]' : 'bg-white/40'}`}
                  />
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Lightbox Portal — only images */}
      {lightboxOpen && createPortal(
        <Lightbox
          images={images}
          currentIndex={currentIndex < images.length ? currentIndex : 0}
          onClose={() => setLightboxOpen(false)}
          onNavigate={navigate}
        />,
        document.body
      )}
    </>
  )
}

