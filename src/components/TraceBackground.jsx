// PCB trace background — styled like a KiCad layout fragment
// Copper traces, vias, pads, component footprints, reference designators
export default function TraceBackground({ className = '' }) {
  const copper = '#c07a3f'
  const opacity = 0.13

  return (
    <svg
      viewBox="0 0 1400 820"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      {/* ── Power rail ── */}
      <line x1="0" y1="72" x2="1400" y2="72" stroke={copper} strokeWidth="3" />

      {/* ── Signal traces ── */}
      {/* Trace 1 */}
      <polyline points="150,72 192,114 192,265 234,307 234,490" fill="none" stroke={copper} strokeWidth="1.2" />
      {/* Trace 2 */}
      <polyline points="340,72 382,114 382,198 424,240 424,420 466,462 466,640" fill="none" stroke={copper} strokeWidth="1.2" />
      {/* Trace 3 — vertical signal */}
      <line x1="620" y1="72" x2="620" y2="680" stroke={copper} strokeWidth="1.2" />
      {/* Trace 4 */}
      <polyline points="860,72 902,114 902,310 944,352 944,560" fill="none" stroke={copper} strokeWidth="1.2" />
      {/* Trace 5 */}
      <polyline points="1120,72 1162,114 1162,380 1204,422 1204,700" fill="none" stroke={copper} strokeWidth="1.2" />

      {/* ── Differential pair (USB / high-speed) ── */}
      <polyline points="0,195 580,195 622,237 622,400" fill="none" stroke={copper} strokeWidth="1" strokeDasharray="none" />
      <polyline points="0,205 570,205 612,247 612,400" fill="none" stroke={copper} strokeWidth="1" />
      {/* Return path */}
      <polyline points="0,480 300,480 342,438 900,438" fill="none" stroke={copper} strokeWidth="1" />
      <polyline points="0,490 300,490 342,448 900,448" fill="none" stroke={copper} strokeWidth="1" />

      {/* ── Horizontal bus mid ── */}
      <polyline points="234,307 940,307" fill="none" stroke={copper} strokeWidth="1.5" />
      <polyline points="234,490 466,490" fill="none" stroke={copper} strokeWidth="1" />
      <polyline points="944,352 1162,352" fill="none" stroke={copper} strokeWidth="1" />

      {/* ── Short stubs ── */}
      <line x1="620" y1="307" x2="620" y2="307" stroke={copper} strokeWidth="1" />
      <polyline points="700,72 700,160 742,202 742,307" fill="none" stroke={copper} strokeWidth="1.2" />
      <polyline points="1000,72 1000,200 958,242 958,307" fill="none" stroke={copper} strokeWidth="1.2" />

      {/* ── Vias ── (hollow circles = drill holes) */}
      {[
        [150, 72], [340, 72], [620, 72], [860, 72], [1120, 72], [700, 72], [1000, 72],
        [192, 265], [424, 240], [620, 307], [902, 310], [1162, 380],
        [234, 307], [944, 307], [958, 307], [742, 307],
        [466, 462], [944, 560], [1204, 422],
        [300, 480], [300, 490],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5" fill="#080808" stroke={copper} strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="2.5" fill={copper} />
        </g>
      ))}

      {/* ── Component footprints ── */}
      {/* IC — QFP package */}
      <rect x="255" y="390" width="88" height="120" fill="none" stroke={copper} strokeWidth="1" rx="2" />
      {/* IC pins left side */}
      {[0,1,2,3,4,5].map(i => (
        <rect key={`icl${i}`} x="244" y={404 + i * 18} width="12" height="8" fill="none" stroke={copper} strokeWidth="0.8" />
      ))}
      {/* IC pins right side */}
      {[0,1,2,3,4,5].map(i => (
        <rect key={`icr${i}`} x="341" y={404 + i * 18} width="12" height="8" fill="none" stroke={copper} strokeWidth="0.8" />
      ))}
      {/* IC pin 1 marker */}
      <circle cx="270" cy="406" r="2" fill={copper} />
      <text x="280" y="457" fill={copper} fontSize="11" fontFamily="monospace" opacity="0.7">U1</text>

      {/* IC — TQFP */}
      <rect x="1010" y="220" width="72" height="100" fill="none" stroke={copper} strokeWidth="1" rx="2" />
      {[0,1,2,3].map(i => (
        <rect key={`ic2l${i}`} x="998" y={234 + i * 22} width="13" height="9" fill="none" stroke={copper} strokeWidth="0.8" />
      ))}
      {[0,1,2,3].map(i => (
        <rect key={`ic2r${i}`} x="1081" y={234 + i * 22} width="13" height="9" fill="none" stroke={copper} strokeWidth="0.8" />
      ))}
      <text x="1020" y="275" fill={copper} fontSize="11" fontFamily="monospace" opacity="0.7">U2</text>

      {/* SOT-23 transistors */}
      <rect x="510" y="580" width="20" height="24" fill="none" stroke={copper} strokeWidth="0.8" rx="1" />
      <text x="505" y="617" fill={copper} fontSize="9" fontFamily="monospace" opacity="0.7">Q1</text>
      <rect x="560" y="580" width="20" height="24" fill="none" stroke={copper} strokeWidth="0.8" rx="1" />
      <text x="555" y="617" fill={copper} fontSize="9" fontFamily="monospace" opacity="0.7">Q2</text>

      {/* Resistors (0402) */}
      {[
        [192, 152, 'R1'], [382, 152, 'R2'], [700, 112, 'R3'], [902, 155, 'R4'],
        [620, 200, 'R5'], [800, 307, 'R6'],
      ].map(([x, y, ref]) => (
        <g key={ref}>
          <rect x={x - 10} y={y - 5} width="20" height="10" fill="none" stroke={copper} strokeWidth="0.9" rx="1" />
          <text x={x - 7} y={y + 18} fill={copper} fontSize="8" fontFamily="monospace" opacity="0.6">{ref}</text>
        </g>
      ))}

      {/* Capacitors (0402) */}
      {[
        [150, 152, 'C1'], [860, 152, 'C2'], [1120, 152, 'C3'],
        [466, 380, 'C4'], [1000, 155, 'C5'],
      ].map(([x, y, ref]) => (
        <g key={ref}>
          <rect x={x - 9} y={y - 5} width="18" height="10" fill="none" stroke={copper} strokeWidth="0.9" rx="1" />
          <text x={x - 6} y={y + 18} fill={copper} fontSize="8" fontFamily="monospace" opacity="0.6">{ref}</text>
        </g>
      ))}

      {/* ── Board edge (dimension lines) ── */}
      <rect x="10" y="10" width="1380" height="800" fill="none" stroke={copper} strokeWidth="0.5" strokeDasharray="8 4" opacity="0.4" />

      {/* Corner marks */}
      {[[10,10],[1390,10],[10,810],[1390,810]].map(([cx,cy], i) => (
        <g key={`corner${i}`} opacity="0.5">
          <line x1={cx} y1={cy - 8} x2={cx} y2={cy + 8} stroke={copper} strokeWidth="1" />
          <line x1={cx - 8} y1={cy} x2={cx + 8} y2={cy} stroke={copper} strokeWidth="1" />
        </g>
      ))}

      {/* Layer annotation */}
      <text x="30" y="30" fill={copper} fontSize="9" fontFamily="monospace" opacity="0.4" letterSpacing="1">F.Cu</text>
    </svg>
  )
}
