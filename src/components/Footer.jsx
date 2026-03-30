export default function Footer() {
  return (
    <footer className="border-t border-[#141414] py-6">
      {/* issue #7: flex-col on mobile so three items don't squash */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <span className="font-mono text-[10px] text-[#2a2a2a] tracking-widest">CHATHURA FERNANDO</span>
        {/* PCB board edge marking */}
        <div className="flex items-center gap-2 opacity-30">
          <div className="h-px w-8 bg-[#c07a3f]" />
          <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
            <circle cx="4" cy="4" r="3.5" fill="none" stroke="#c07a3f" strokeWidth="1" />
            <circle cx="4" cy="4" r="1.5" fill="#c07a3f" />
          </svg>
          <div className="h-px w-8 bg-[#c07a3f]" />
        </div>
        <span className="font-mono text-[10px] text-[#2a2a2a] tracking-widest">KALUTARA, SRI LANKA</span>
      </div>
    </footer>
  )
}
