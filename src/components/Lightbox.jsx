import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onNavigate('prev')
      else if (e.key === 'ArrowRight') onNavigate('next')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNavigate])

  if (!images || images.length === 0) return null
  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8">
      {/* Container to handle click-outside properly without bubbling issues */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-[#c07a3f] transition-colors z-[110] bg-black/50 p-2 rounded-full cursor-pointer"
      >
        <X size={28} />
      </button>

      {/* Navigation - Left */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
          className="absolute left-4 sm:left-8 text-white hover:text-[#c07a3f] transition-colors z-[110] bg-black/50 p-3 rounded-full cursor-pointer"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Image Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative max-w-full max-h-full flex flex-col items-center pointer-events-none z-[105]"
        >
          <img
            src={currentImage}
            alt={`Enlarged view ${currentIndex + 1}`}
            className="max-w-[100vw] max-h-[85vh] object-contain rounded-sm shadow-2xl pointer-events-auto"
            onClick={(e) => e.stopPropagation()} 
          />
          {images.length > 1 && (
            <p className="text-[#888] font-mono text-xs mt-4 drop-shadow-md">
              {currentIndex + 1} / {images.length}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation - Right */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
          className="absolute right-4 sm:right-8 text-white hover:text-[#c07a3f] transition-colors z-[110] bg-black/50 p-3 rounded-full cursor-pointer"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  )
}
