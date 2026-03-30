import { useRef, useState } from 'react'

// PCB render SVGs — one per project, styled as KiCad top-layer views

const C = '#c07a3f'
const BG = '#080f08'
const SK = 'rgba(255,255,255,0.38)'
const ED = 'rgba(255,255,255,0.14)'
const HV = 'rgba(255,90,40,0.55)'

function Via({ cx, cy, r = 4 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={BG} stroke={C} strokeWidth="1" />
      <circle cx={cx} cy={cy} r={r * 0.38} fill={C} />
    </g>
  )
}

function BoardEdge({ x = 14, y = 14, w = 452, h = 212 }) {
  const corners = [[x, y], [x + w, y], [x, y + h], [x + w, y + h]]
  return (
    <>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={ED} strokeWidth="1.2" strokeDasharray="7 3.5" />
      {corners.map(([cx, cy], i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={cx + (cx < 240 ? 9 : -9)} y2={cy} stroke={SK} strokeWidth="0.6" />
          <line x1={cx} y1={cy} x2={cx} y2={cy + (cy < 120 ? 9 : -9)} stroke={SK} strokeWidth="0.6" />
        </g>
      ))}
    </>
  )
}

function QFP({ x, y, w, h, pH = 7, pV = 7, label = '', sub = '' }) {
  const pinLen = 6, pinW = 3.5
  const hGap = (w - 12) / (pH - 1)
  const vGap = (h - 12) / (pV - 1)
  return (
    <g>
      {Array.from({ length: pH }, (_, i) => [
        <rect key={`t${i}`} x={x + 6 + i * hGap - pinW / 2} y={y - pinLen} width={pinW} height={pinLen} fill={C} opacity="0.85" />,
        <rect key={`b${i}`} x={x + 6 + i * hGap - pinW / 2} y={y + h} width={pinW} height={pinLen} fill={C} opacity="0.85" />,
      ])}
      {Array.from({ length: pV }, (_, i) => [
        <rect key={`l${i}`} x={x - pinLen} y={y + 6 + i * vGap - pinW / 2} width={pinLen} height={pinW} fill={C} opacity="0.85" />,
        <rect key={`r${i}`} x={x + w} y={y + 6 + i * vGap - pinW / 2} width={pinLen} height={pinW} fill={C} opacity="0.85" />,
      ])}
      <rect x={x} y={y} width={w} height={h} fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      <circle cx={x + 5} cy={y + 5} r={2.5} fill={C} opacity="0.5" />
      {label && <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fill={SK} fontSize="8" fontFamily="monospace">{label}</text>}
      {sub && <text x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle" fill={SK} fontSize="6" fontFamily="monospace" opacity="0.6">{sub}</text>}
    </g>
  )
}

function QFN({ x, y, s, label = '' }) {
  const pW = 3, pH = 5, n = Math.max(3, Math.floor(s / 7))
  const gap = (s - 8) / (n - 1)
  return (
    <g>
      {Array.from({ length: n }, (_, i) => [
        <rect key={`t${i}`} x={x + 4 + i * gap - pW / 2} y={y - pH} width={pW} height={pH} fill={C} opacity="0.8" />,
        <rect key={`b${i}`} x={x + 4 + i * gap - pW / 2} y={y + s} width={pW} height={pH} fill={C} opacity="0.8" />,
        <rect key={`l${i}`} x={x - pH} y={y + 4 + i * gap - pW / 2} width={pH} height={pW} fill={C} opacity="0.8" />,
        <rect key={`r${i}`} x={x + s} y={y + 4 + i * gap - pW / 2} width={pH} height={pW} fill={C} opacity="0.8" />,
      ])}
      <rect x={x} y={y} width={s} height={s} fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {label && <text x={x + s / 2} y={y + s / 2 + 3} textAnchor="middle" fill={SK} fontSize="7" fontFamily="monospace">{label}</text>}
    </g>
  )
}

function SSR({ x, y, label = '' }) {
  return (
    <g>
      <rect x={x} y={y} width={44} height={44} fill="#140808" stroke="rgba(200,60,30,0.65)" strokeWidth="0.8" />
      {[0, 1].map(i => <rect key={i} x={x + 6 + i * 28} y={y - 8} width={8} height={9} fill={C} opacity="0.7" />)}
      {[0, 1].map(i => <rect key={i} x={x + 6 + i * 28} y={y + 44} width={8} height={9} fill={C} opacity="0.7" />)}
      <text x={x + 22} y={y + 25} textAnchor="middle" fill={HV} fontSize="7" fontFamily="monospace">{label || 'SSR'}</text>
    </g>
  )
}

// ─── P01: High-Power PSU Control Board ───────────────────────────────────────
function SVGP01() {
  return (
    <svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="480" height="240" fill={BG} />
      <BoardEdge />
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x="22" y={24 + i * 48} width="34" height="36" fill="#0d1a0d" stroke={i < 2 ? "rgba(200,80,40,0.6)" : C} strokeWidth="0.8" />
          {[0, 1, 2].map(j => <circle key={j} cx="39" cy={34 + i * 48 + j * 10} r="3.5" fill="none" stroke={C} strokeWidth="0.8" />)}
          <text x="39" y={68 + i * 48} textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace">{i < 2 ? '600W' : i === 2 ? '480W' : '120W'}</text>
        </g>
      ))}
      {[0, 1, 2, 3].map(i => (
        <polyline key={i} points={`56,${42 + i * 48} 90,${42 + i * 48} 100,115`}
          fill="none" stroke={i < 2 ? "rgba(200,100,40,0.7)" : C} strokeWidth={i < 2 ? "3.5" : "2.5"} />
      ))}
      <Via cx={100} cy={115} r={6} />
      {[0, 1, 2, 3].map(i => <SSR key={i} x={138 + i * 58} y={80} label={`SSR${i + 1}`} />)}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={148 + i * 58} y="136" width="24" height="16" fill="#0d1a0d" stroke={C} strokeWidth="0.6" />
          <text x={160 + i * 58} y="148" textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace">CS</text>
          <line x1={160 + i * 58} y1="152" x2={160 + i * 58} y2="175" stroke={C} strokeWidth="1.8" />
        </g>
      ))}
      <QFP x={360} y={52} w={88} h={88} pH={9} pV={9} label="ATMEGA" sub="2560" />
      <rect x="380" y="158" width="42" height="28" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      <text x="401" y="176" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace">RS485</text>
      {[0, 1].map(i => <rect key={i} x={390 + i * 18} y="184" width="8" height="8" fill={C} opacity="0.8" />)}
      <rect x="380" y="198" width="42" height="22" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      <text x="401" y="213" textAnchor="middle" fill={SK} fontSize="6" fontFamily="monospace">USB-UART</text>
      <rect x="300" y="62" width="38" height="22" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1, 2, 3].map(i => <rect key={i} x={305 + i * 8} y="56" width="5" height="8" fill={C} opacity="0.8" />)}
      <text x="319" y="77" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace">BUF</text>
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x="444" y={30 + i * 48} width="22" height="32" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
          {[0, 1].map(j => <rect key={j} x="444" y={36 + i * 48 + j * 12} width="8" height="6" fill={C} opacity="0.8" />)}
        </g>
      ))}
      {[0, 1, 2, 3, 4].map(i => <Via key={i} cx={128 + i * 14} cy={210} r={3} />)}
      <text x="435" y="22" fill={SK} fontSize="7" fontFamily="monospace" opacity="0.5">F.Cu</text>
      <text x="22" y="232" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.35">REV.A · 4L FR4 · ATLAS LABS</text>
    </svg>
  )
}

// ─── P02: Industrial Helper Control Module ───────────────────────────────────
function SVGP02() {
  return (
    <svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="480" height="240" fill={BG} />
      <BoardEdge />
      <rect x="80" y="18" width="310" height="18" fill="#0d1a0d" stroke={C} strokeWidth="0.8" />
      {Array.from({ length: 28 }, (_, i) => (
        <rect key={i} x={85 + i * 10.5} y="22" width="6" height="14" fill={C} opacity="0.75" />
      ))}
      <text x="235" y="16" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace" opacity="0.6">OnLogic Helix X511 Interface</text>
      <QFP x={190} y={68} w={80} h={80} pH={8} pV={8} label="ATMEGA" sub="2560" />
      <QFN x={302} y={80} s={50} label="ADC 24b" />
      {[
        { label: 'PUMP', x: 22, y: 90 }, { label: 'FAN', x: 22, y: 140 },
        { label: 'SOL', x: 66, y: 90 }, { label: 'LIGHT', x: 66, y: 140 },
      ].map((m, i) => (
        <g key={i}>
          <rect x={m.x} y={m.y} width="36" height="28" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
          {[0, 1, 2].map(j => <rect key={j} x={m.x + 4 + j * 12} y={m.y - 7} width="7" height="8" fill={C} opacity="0.8" />)}
          <text x={m.x + 18} y={m.y + 18} textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace">{m.label}</text>
          <rect x={m.x + 38} y={m.y + 4} width="16" height="20" fill="#0d1a0d" stroke={C} strokeWidth="0.6" />
          {[0, 1].map(j => <rect key={j} x={m.x + 52} y={m.y + 7 + j * 9} width="8" height="5" fill={C} opacity="0.8" />)}
        </g>
      ))}
      <rect x="140" y="168" width="40" height="24" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1, 2, 3].map(i => <rect key={i} x={145 + i * 9} y="162" width="6" height="8" fill={C} opacity="0.8" />)}
      <text x="160" y="184" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace">BUF</text>
      <rect x="360" y="155" width="40" height="50" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1, 2, 3].map(i => <rect key={i} x="352" y={160 + i * 11} width="9" height="6" fill={C} opacity="0.8" />)}
      <text x="380" y="183" textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace">PROX</text>
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1="190" y1={90 + i * 14} x2="108" y2={90 + i * 14} stroke={C} strokeWidth="0.9" opacity="0.65" />
      ))}
      {[0, 1, 2].map(i => (
        <line key={i} x1="270" y1={100 + i * 10} x2="302" y2={100 + i * 10} stroke={C} strokeWidth="0.9" opacity="0.65" />
      ))}
      {[0, 1, 2, 3].map(i => <Via key={i} cx={200 + i * 16} cy={210} r={3} />)}
      <text x="435" y="22" fill={SK} fontSize="7" fontFamily="monospace" opacity="0.5">F.Cu</text>
      <text x="22" y="232" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.35">REV.A · 4L FR4 · ATLAS LABS</text>
    </svg>
  )
}

// ─── P03: High-Power UV Light Controller ─────────────────────────────────────
function SVGP03() {
  return (
    <svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="480" height="240" fill={BG} />
      <BoardEdge />
      <line x1="260" y1="18" x2="260" y2="222" stroke="rgba(255,90,40,0.25)" strokeWidth="1.2" strokeDasharray="5 4" />
      <rect x="250" y="18" width="20" height="204" fill="rgba(255,60,20,0.03)" />
      <text x="140" y="32" textAnchor="middle" fill={SK} fontSize="6" fontFamily="monospace" opacity="0.45">CONTROL — LV</text>
      <text x="370" y="32" textAnchor="middle" fill={HV} fontSize="6" fontFamily="monospace" opacity="0.7">UVC DRIVER — HV</text>
      <QFN x={80} y={70} s={56} label="CTRL" />
      <rect x="180" y="86" width="52" height="38" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1].map(i => <rect key={i} x="173" y={92 + i * 16} width="8" height="6" fill={C} opacity="0.8" />)}
      {[0, 1].map(i => <rect key={i} x="232" y={92 + i * 16} width="8" height="6" fill={C} opacity="0.8" />)}
      <text x="206" y="108" textAnchor="middle" fill={SK} fontSize="7" fontFamily="monospace">OPTO</text>
      <line x1="232" y1="96" x2="310" y2="96" stroke="rgba(200,80,40,0.6)" strokeWidth="0.9" strokeDasharray="4 2" />
      <text x="270" y="89" textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.5">HV_OK signal</text>
      <rect x="285" y="65" width="70" height="60" fill="#140a0a" stroke="rgba(200,60,30,0.6)" strokeWidth="0.8" />
      {[0, 1, 2, 3, 4].map(i => <rect key={i} x={290 + i * 12} y="57" width="8" height="9" fill={C} opacity="0.7" />)}
      {[0, 1, 2, 3, 4].map(i => <rect key={i} x={290 + i * 12} y="125" width="8" height="9" fill={C} opacity="0.7" />)}
      <text x="320" y="93" textAnchor="middle" fill={HV} fontSize="7.5" fontFamily="monospace">UV DRV</text>
      <rect x="285" y="148" width="50" height="28" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1].map(i => <rect key={i} x={290 + i * 36} y="142" width="8" height="8" fill={C} opacity="0.8" />)}
      <text x="310" y="166" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace">I-SENSE</text>
      <rect x="420" y="75" width="30" height="55" fill="#140a0a" stroke="rgba(200,60,30,0.5)" strokeWidth="0.7" />
      {[0, 1, 2, 3].map(i => <rect key={i} x="412" y={82 + i * 12} width="9" height="6" fill={C} opacity="0.7" />)}
      <line x1="355" y1="95" x2="420" y2="95" stroke="rgba(200,80,40,0.6)" strokeWidth="2.5" />
      <line x1="136" y1="98" x2="173" y2="98" stroke={C} strokeWidth="1" opacity="0.7" />
      <line x1="136" y1="108" x2="173" y2="108" stroke={C} strokeWidth="1" opacity="0.7" />
      <rect x="22" y="148" width="36" height="52" fill="#140808" stroke="rgba(200,60,30,0.5)" strokeWidth="0.8" />
      {[0, 1, 2].map(i => <circle key={i} cx="40" cy={158 + i * 16} r="4" fill="none" stroke={C} strokeWidth="0.8" />)}
      <text x="40" y="210" textAnchor="middle" fill={HV} fontSize="5.5" fontFamily="monospace">MAINS</text>
      {[0, 1, 2, 3].map(i => <Via key={i} cx={90 + i * 16} cy={210} r={3} />)}
      <text x="435" y="22" fill={SK} fontSize="7" fontFamily="monospace" opacity="0.5">F.Cu</text>
      <text x="22" y="232" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.35">REV.A · 2L FR4 · ATLAS LABS</text>
    </svg>
  )
}

// ─── P04: NVMe Carrier Board — Radxa 4D ──────────────────────────────────────
function SVGP04() {
  return (
    <svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="480" height="240" fill={BG} />
      <BoardEdge />
      <rect x="80" y="196" width="300" height="22" fill="#0d1a0d" stroke={C} strokeWidth="0.8" />
      {Array.from({ length: 34 }, (_, i) => (
        <rect key={i} x={84 + i * 8.5} y="196" width="5" height="10"
          fill={i === 10 || i === 11 ? 'transparent' : C} opacity="0.75" />
      ))}
      <rect x="166" y="196" width="18" height="10" fill={BG} />
      <text x="240" y="213" textAnchor="middle" fill={SK} fontSize="7" fontFamily="monospace">M.2 Key-M — NVMe SSD</text>
      <rect x="80" y="22" width="300" height="20" fill="#0d1a0d" stroke={C} strokeWidth="0.8" />
      {Array.from({ length: 30 }, (_, i) => (
        <rect key={i} x={84 + i * 9.2} y="30" width="5.5" height="12" fill={C} opacity="0.75" />
      ))}
      <text x="240" y="20" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace" opacity="0.6">RADXA 4D · SBC CONNECTOR</text>
      {[0, 1, 2, 3].map(lane => {
        const bx = 122 + lane * 62
        return (
          <g key={lane}>
            <polyline points={`${bx},42 ${bx},78 ${bx + 8},93 ${bx + 8},162 ${bx},177 ${bx},196`}
              fill="none" stroke={C} strokeWidth="1.1" opacity="0.85" />
            <polyline points={`${bx + 14},42 ${bx + 14},73 ${bx + 22},88 ${bx + 22},167 ${bx + 14},181 ${bx + 14},196`}
              fill="none" stroke={C} strokeWidth="1.1" opacity="0.85" />
            {[93, 120, 148, 167].map(y => <Via key={y} cx={bx + 4} cy={y} r={2.5} />)}
            <text x={bx + 11} y="115" textAnchor="middle" fill={SK} fontSize="5" fontFamily="monospace" opacity="0.45">{`TX${lane + 1}`}</text>
          </g>
        )
      })}
      <QFN x={188} y={92} s={60} label="RDRV" />
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x={158} y={94 + i * 10} width="8" height="5" fill="#0d1a0d" stroke={C} strokeWidth="0.5" />
      ))}
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x={290} y={94 + i * 10} width="8" height="5" fill="#0d1a0d" stroke={C} strokeWidth="0.5" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => <Via key={`l${i}`} cx={22} cy={42 + i * 18} r={3} />)}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => <Via key={`r${i}`} cx={458} cy={42 + i * 18} r={3} />)}
      <text x="448" y="116" textAnchor="end" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.5">85Ω diff</text>
      <text x="448" y="127" textAnchor="end" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.4">length-matched</text>
      <text x="435" y="22" fill={SK} fontSize="7" fontFamily="monospace" opacity="0.5">F.Cu</text>
      <text x="22" y="232" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.35">REV.A · 4L FR4 · PCIe Gen 2</text>
    </svg>
  )
}

// ─── P05: Camera Flash Jig & Data Board ──────────────────────────────────────
function SVGP05() {
  return (
    <svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="480" height="240" fill={BG} />
      <BoardEdge />
      {[[32, 32], [448, 32], [32, 208], [448, 208]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={9} fill={BG} stroke={SK} strokeWidth="0.7" opacity="0.5" />
          <circle cx={cx} cy={cy} r={4} fill={BG} stroke={C} strokeWidth="0.6" />
        </g>
      ))}
      <rect x="52" y="88" width="38" height="64" fill="#0d1a0d" stroke={C} strokeWidth="0.8" />
      {[0, 1, 2, 3].map(i => <rect key={i} x="88" y={96 + i * 14} width="9" height="6" fill={C} opacity="0.8" />)}
      <text x="71" y="158" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace">USB HS</text>
      <rect x="52" y="162" width="50" height="40" fill="#0d1a0d" stroke={C} strokeWidth="0.8" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <rect key={i} x={56 + i * 5.5} y="166" width="3.5" height="8" fill={C} opacity="0.8" />)}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <rect key={i} x={56 + i * 5.5} y="190" width="3.5" height="8" fill={C} opacity="0.8" />)}
      <text x="77" y="185" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace">RJ45</text>
      <polyline points="97,112 130,112 140,106 210,106" fill="none" stroke={C} strokeWidth="1.1" opacity="0.85" />
      <polyline points="97,124 130,124 140,130 210,130" fill="none" stroke={C} strokeWidth="1.1" opacity="0.85" />
      <text x="155" y="100" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.5">USB HS diff</text>
      {[0, 1, 2, 3].map(i => (
        <polyline key={i}
          points={`102,${172 + i * 6} 135,${172 + i * 6} 145,${166 + i * 5} 210,${166 + i * 5}`}
          fill="none" stroke={C} strokeWidth="0.9" opacity="0.75"
        />
      ))}
      {Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 8 }, (_, col) => (
          <g key={`${row}-${col}`}>
            <circle cx={215 + col * 26} cy={60 + row * 26} r={5} fill={BG} stroke={C} strokeWidth="0.7" opacity="0.7" />
            <circle cx={215 + col * 26} cy={60 + row * 26} r={2} fill={C} opacity="0.5" />
            <text x={215 + col * 26} y={60 + row * 26 + 14} textAnchor="middle" fill={SK} fontSize="4.5" fontFamily="monospace" opacity="0.4">{`TP${row * 8 + col + 1}`}</text>
          </g>
        ))
      )}
      <rect x="396" y="72" width="48" height="96" fill="#0d1a0d" stroke={C} strokeWidth="0.8" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => <rect key={i} x="388" y={78 + i * 8.5} width="9" height="5" fill={C} opacity="0.8" />)}
      <text x="420" y="120" textAnchor="middle" fill={SK} fontSize="6" fontFamily="monospace">CAM</text>
      <text x="420" y="132" textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.6">TARGET</text>
      <text x="435" y="22" fill={SK} fontSize="7" fontFamily="monospace" opacity="0.5">F.Cu</text>
      <text x="22" y="232" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.35">JIG · 4L FR4 · ATLAS LABS · NDA</text>
    </svg>
  )
}

// ─── P06: Complex Mixed-Signal SBC Motherboard ───────────────────────────────
function SVGP06() {
  return (
    <svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="480" height="240" fill={BG} />
      <BoardEdge />
      <rect x="22" y="22" width="200" height="20" fill="#0d1a0d" stroke={C} strokeWidth="0.8" />
      {Array.from({ length: 22 }, (_, i) => (
        <rect key={i} x={26 + i * 8.5} y="28" width="5" height="14" fill={C} opacity="0.75" />
      ))}
      <text x="122" y="20" textAnchor="middle" fill={SK} fontSize="6" fontFamily="monospace" opacity="0.6">SBC CONNECTOR</text>
      <rect x="240" y="22" width="80" height="38" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1, 2, 3].map(i => <rect key={i} x={248 + i * 18} y="18" width="9" height="6" fill={C} opacity="0.8" />)}
      <text x="280" y="38" textAnchor="middle" fill={SK} fontSize="7" fontFamily="monospace">PoE</text>
      <text x="280" y="50" textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.6">MODULE</text>
      <rect x="340" y="22" width="50" height="38" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <rect key={i} x={344 + i * 5.5} y="26" width="3.5" height="8" fill={C} opacity="0.8" />)}
      <text x="365" y="48" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace">RJ45</text>
      <QFP x={30} y={70} w={90} h={90} pH={9} pV={9} label="MCU" sub="MAIN" />
      <QFN x={155} y={80} s={55} label="AUX MCU" />
      <QFN x={240} y={78} s={48} label="CODEC" />
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1="210" y1={90 + i * 8} x2="240" y2={90 + i * 8} stroke={C} strokeWidth="0.8" opacity="0.7" />
      ))}
      <text x="225" y="80" textAnchor="middle" fill={SK} fontSize="5" fontFamily="monospace" opacity="0.5">I²S</text>
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={308 + i * 52} y="80" width="42" height="36" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
          {[0, 1].map(j => <rect key={j} x={314 + i * 52 + j * 28} y="73" width="7" height="9" fill={C} opacity="0.8" />)}
          <text x={329 + i * 52} y="101" textAnchor="middle" fill={SK} fontSize="6" fontFamily="monospace">LED</text>
          <text x={329 + i * 52} y="111" textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.6">DRV</text>
        </g>
      ))}
      {['TEMP', 'HUM', 'LIGHT', 'PROX'].map((lbl, i) => (
        <g key={i}>
          <rect x={30 + i * 68} y="178" width="48" height="28" fill="#0d1a0d" stroke={C} strokeWidth="0.6" />
          {[0, 1].map(j => <rect key={j} x={36 + i * 68 + j * 34} y="172" width="6" height="8" fill={C} opacity="0.7" />)}
          <text x={54 + i * 68} y="195" textAnchor="middle" fill={SK} fontSize="6" fontFamily="monospace">{lbl}</text>
        </g>
      ))}
      <rect x="435" y="150" width="22" height="48" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x="427" y={156 + i * 6.5} width="9" height="4" fill={C} opacity="0.8" />)}
      {[0, 1, 2, 3, 4, 5, 6].map(i => <Via key={i} cx={320 + i * 18} cy={160} r={3} />)}
      <text x="435" y="22" fill={SK} fontSize="7" fontFamily="monospace" opacity="0.5">F.Cu</text>
      <text x="22" y="232" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.35">REV.C · 6L FR4 · ATLAS LABS · NDA</text>
    </svg>
  )
}

// ─── P07: Biometric Animal Strap Sensor ──────────────────────────────────────
function SVGP07() {
  return (
    <svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="480" height="240" fill={BG} />
      <rect x="18" y="72" width="444" height="96" rx="20" ry="20" fill="#091309" stroke={ED} strokeWidth="1.2" strokeDasharray="7 3.5" />
      <line x1="38" y1="72" x2="60" y2="72" stroke={SK} strokeWidth="0.6" />
      <line x1="422" y1="72" x2="444" y2="72" stroke={SK} strokeWidth="0.6" />
      <line x1="38" y1="168" x2="60" y2="168" stroke={SK} strokeWidth="0.6" />
      <line x1="422" y1="168" x2="444" y2="168" stroke={SK} strokeWidth="0.6" />
      <rect x="24" y="96" width="28" height="48" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <rect key={i} x="50" y={99 + i * 5.5} width="7" height="3.5" fill={C} opacity="0.85" />)}
      <text x="38" y="124" textAnchor="middle" fill={SK} fontSize="6" fontFamily="monospace">FPC</text>
      <line x1="57" y1="110" x2="455" y2="110" stroke={C} strokeWidth="1.1" opacity="0.8" />
      <line x1="57" y1="130" x2="455" y2="130" stroke={C} strokeWidth="1.1" opacity="0.8" />
      <polyline points="57,120 75,100 93,140 111,100 120,120" fill="none" stroke={C} strokeWidth="1.2" opacity="0.65" />
      <polyline points="162,120 178,100 195,140 212,100 229,140 238,120" fill="none" stroke={C} strokeWidth="1.2" opacity="0.65" />
      <polyline points="282,120 298,100 315,140 332,100 349,140 358,120" fill="none" stroke={C} strokeWidth="1.2" opacity="0.65" />
      {[120, 238, 358].map((x, i) => (
        <g key={i}>
          <rect x={x} y={100} width={36} height={40} fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
          {[0, 1, 2].map(j => <rect key={j} x={x + 3 + j * 12} y="94" width="7" height="8" fill={C} opacity="0.8" />)}
          {[0, 1, 2].map(j => <rect key={j} x={x + 3 + j * 12} y="140" width="7" height="8" fill={C} opacity="0.8" />)}
          <text x={x + 18} y="118" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace">ADC</text>
          <text x={x + 18} y="130" textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.7">{`U${i + 1}`}</text>
        </g>
      ))}
      {[80, 160, 240, 320, 400].map((x, i) => (
        <rect key={i} x={x} y="158" width="20" height="8" rx="2" fill={C} opacity="0.45" />
      ))}
      <text x="240" y="185" textAnchor="middle" fill={SK} fontSize="6" fontFamily="monospace" opacity="0.4">GSR electrode pads</text>
      <text x="240" y="22" textAnchor="middle" fill={SK} fontSize="7" fontFamily="monospace" opacity="0.4">2L FLEX · POLYIMIDE · WEARABLE</text>
      <text x="240" y="225" textAnchor="middle" fill={SK} fontSize="6" fontFamily="monospace" opacity="0.3">GSR + HEARTBEAT · DEDICATED ADCs</text>
    </svg>
  )
}

// ─── P08: Address-Translatable IMU Sensor System ─────────────────────────────
function SVGP08() {
  return (
    <svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="480" height="240" fill={BG} />
      <rect x="22" y="30" width="240" height="180" fill="none" stroke={ED} strokeWidth="1.2" strokeDasharray="7 3.5" />
      {[[22, 30], [262, 30], [22, 210], [262, 210]].map(([cx, cy], i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={cx + (cx < 240 ? 9 : -9)} y2={cy} stroke={SK} strokeWidth="0.6" />
          <line x1={cx} y1={cy} x2={cx} y2={cy + (cy < 120 ? 9 : -9)} stroke={SK} strokeWidth="0.6" />
        </g>
      ))}
      <text x="142" y="26" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace" opacity="0.5">MAIN BOARD · 4L FR4</text>
      <QFN x={60} y={75} s={60} label="ADDR XLAT" />
      <QFN x={155} y={75} s={48} label="MCU" />
      {[0, 1].map(i => (
        <line key={i} x1="120" y1={92 + i * 12} x2="155" y2={92 + i * 12} stroke={C} strokeWidth="0.9" opacity="0.7" />
      ))}
      <rect x="238" y="105" width="24" height="50" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1, 2, 3, 4, 5, 6].map(i => <rect key={i} x="238" y={109 + i * 6.5} width="8" height="4" fill={C} opacity="0.8" />)}
      <text x="250" y="162" textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace">FPC</text>
      <path d="M 262,130 C 295,130 295,130 318,130" fill="none" stroke={C} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      <text x="290" y="123" textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.4">flex cable</text>
      <rect x="318" y="80" width="140" height="100" rx="12" ry="12" fill="#091309" stroke={ED} strokeWidth="1.2" strokeDasharray="7 3.5" />
      <text x="388" y="76" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace" opacity="0.5">FLEX CARRIER · 2L</text>
      <rect x="318" y="110" width="22" height="40" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1, 2, 3, 4, 5, 6].map(i => <rect key={i} x="338" y={114 + i * 5} width="8" height="3.5" fill={C} opacity="0.8" />)}
      <QFN x={365} y={100} s={52} label="IMU" />
      <line x1="346" y1="126" x2="365" y2="126" stroke={C} strokeWidth="1" opacity="0.7" />
      <line x1="346" y1="136" x2="365" y2="136" stroke={C} strokeWidth="1" opacity="0.7" />
      {[0, 1, 2].map(i => (
        <rect key={i} x={370 + i * 16} y="162" width="9" height="6" fill="#0d1a0d" stroke={C} strokeWidth="0.5" />
      ))}
      <rect x="22" y="170" width="50" height="28" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1, 2, 3, 4].map(i => <rect key={i} x={26 + i * 9} y="164" width="6" height="8" fill={C} opacity="0.8" />)}
      <text x="47" y="188" textAnchor="middle" fill={SK} fontSize="6" fontFamily="monospace">I²C OUT</text>
      <text x="388" y="220" textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.3">NO ADDR COLLISION · NO EXTRA MCU</text>
    </svg>
  )
}

// ─── P09: Ultra-Low Power Wireless Bucket Meter ───────────────────────────────
function SVGP09() {
  return (
    <svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="480" height="240" fill={BG} />
      <BoardEdge />
      <rect x="22" y="90" width="36" height="60" fill="#0d1a0d" stroke={C} strokeWidth="0.8" />
      {[0, 1].map(i => <circle key={i} cx="40" cy={110 + i * 22} r="5" fill="none" stroke={C} strokeWidth="0.8" />)}
      <text x="40" y="158" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace">BAT</text>
      <rect x="90" y="100" width="36" height="28" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1, 2].map(i => <rect key={i} x={94 + i * 12} y="93" width="8" height="9" fill={C} opacity="0.8" />)}
      <text x="108" y="119" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace">LDO</text>
      <QFN x={170} y={82} s={66} label="NRF5340" />
      <polyline points="236,115 295,115 295,52 370,52" fill="none" stroke={C} strokeWidth="1.8" />
      <line x1="295" y1="52" x2="295" y2="78" stroke={C} strokeWidth="1.8" opacity="0.6" />
      <line x1="330" y1="52" x2="330" y2="68" stroke={C} strokeWidth="1.8" opacity="0.5" />
      <text x="350" y="44" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace" opacity="0.6">BLE ANT</text>
      <rect x="22" y="40" width="40" height="36" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1, 2].map(i => <rect key={i} x={28 + i * 12} y="36" width="8" height="6" fill={C} opacity="0.8" />)}
      <text x="42" y="60" textAnchor="middle" fill={SK} fontSize="6" fontFamily="monospace">FLOW</text>
      <text x="42" y="70" textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.6">sensor</text>
      <rect x="300" y="130" width="40" height="28" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1, 2].map(i => <rect key={i} x={304 + i * 12} y="123" width="8" height="9" fill={C} opacity="0.7" />)}
      <text x="320" y="148" textAnchor="middle" fill={SK} fontSize="6" fontFamily="monospace">LED</text>
      <text x="320" y="159" textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.6">CTRL</text>
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={170 + i * 22} y="165" width="12" height="8" fill="#0d1a0d" stroke={C} strokeWidth="0.5" />
          <text x={176 + i * 22} y="173" textAnchor="middle" fill={SK} fontSize="4.5" fontFamily="monospace">C</text>
        </g>
      ))}
      <text x="420" y="110" fill={C} fontSize="13" fontFamily="monospace" opacity="0.5" textAnchor="middle">µA</text>
      <text x="420" y="126" fill={SK} fontSize="6" fontFamily="monospace" opacity="0.35" textAnchor="middle">SLEEP</text>
      {[0, 1, 2].map(i => <Via key={i} cx={200 + i * 20} cy={210} r={3} />)}
      <text x="435" y="22" fill={SK} fontSize="7" fontFamily="monospace" opacity="0.5">F.Cu</text>
      <text x="22" y="232" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.35">REV.B · 4L FR4 · NDA</text>
    </svg>
  )
}

// ─── P10: Krakatoa Electromechanical System ───────────────────────────────────
function SVGP10() {
  return (
    <svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="480" height="240" fill={BG} />
      <BoardEdge />
      <QFN x={40} y={70} s={56} label="CAN CTRL" />
      <rect x="40" y="150" width="56" height="32" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1, 2].map(i => <rect key={i} x={46 + i * 16} y="144" width="10" height="8" fill={C} opacity="0.8" />)}
      <text x="68" y="170" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace">CAN PHY</text>
      <rect x="22" y="196" width="40" height="24" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1].map(i => <circle key={i} cx={32 + i * 18} cy="208" r="4" fill="none" stroke={C} strokeWidth="0.8" />)}
      <text x="42" y="226" textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace">CAN BUS</text>
      <QFP x={140} y={60} w={100} h={100} pH={10} pV={10} label="MCU" sub="MASTER" />
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={278 + i * 56} y="50" width="46" height="54" fill="#0d1a0d" stroke={C} strokeWidth="0.8" />
          {[0, 1, 2, 3].map(j => <rect key={j} x={284 + i * 56 + j * 10} y="44" width="7" height="8" fill={C} opacity="0.8" />)}
          {[0, 1, 2, 3].map(j => <rect key={j} x={284 + i * 56 + j * 10} y="104" width="7" height="8" fill={C} opacity="0.8" />)}
          <text x={301 + i * 56} y="75" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace">MOTOR</text>
          <text x={301 + i * 56} y="87" textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.6">DRV</text>
        </g>
      ))}
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={278 + i * 56} y="125" width="46" height="30" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
          {[0, 1, 2].map(j => <circle key={j} cx={290 + i * 56 + j * 14} cy="140" r="4" fill="none" stroke={C} strokeWidth="0.8" />)}
          <text x={301 + i * 56} y="162" textAnchor="middle" fill={SK} fontSize="5.5" fontFamily="monospace">MTR</text>
        </g>
      ))}
      <rect x="140" y="178" width="100" height="32" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      {[0, 1, 2, 3, 4].map(i => <rect key={i} x={148 + i * 18} y="172" width="10" height="8" fill={C} opacity="0.8" />)}
      <text x="190" y="197" textAnchor="middle" fill={SK} fontSize="7" fontFamily="monospace">PWR MGMT</text>
      <rect x="278" y="178" width="40" height="30" fill="#0d1a0d" stroke={C} strokeWidth="0.7" />
      <text x="298" y="197" textAnchor="middle" fill={SK} fontSize="6.5" fontFamily="monospace">I/O EXP</text>
      <line x1="68" y1="98" x2="140" y2="98" stroke={C} strokeWidth="1.2" opacity="0.7" />
      <line x1="68" y1="108" x2="140" y2="108" stroke={C} strokeWidth="1.2" opacity="0.7" />
      <line x1="190" y1="160" x2="190" y2="178" stroke={C} strokeWidth="2.5" />
      <Via cx={190} cy={170} r={4} />
      {[0, 1, 2, 3, 4, 5].map(i => <Via key={i} cx={350 + i * 16} cy={210} r={3} />)}
      <text x="435" y="22" fill={SK} fontSize="7" fontFamily="monospace" opacity="0.5">F.Cu</text>
      <text x="22" y="232" fill={SK} fontSize="5.5" fontFamily="monospace" opacity="0.35">MULTI-BOARD · KRAKATOA · NDA</text>
    </svg>
  )
}

const SVG_MAP = {
  P01: SVGP01, P02: SVGP02, P03: SVGP03, P04: SVGP04, P05: SVGP05,
  P06: SVGP06, P07: SVGP07, P08: SVGP08, P09: SVGP09, P10: SVGP10,
}

const VIDEO_EXT = /\.(mp4|webm|mov|ogg)$/i

function VideoPlayer({ src }) {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)

  const toggle = (e) => {
    e.stopPropagation()
    if (!ref.current) return
    if (ref.current.paused) {
      ref.current.play()
      setPlaying(true)
    } else {
      ref.current.pause()
      setPlaying(false)
    }
  }

  return (
    <div
      className="relative w-full overflow-hidden cursor-pointer"
      style={{ aspectRatio: '16 / 9', background: '#000' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={toggle}
    >
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="w-full h-full object-cover"
      />

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }} />

      {/* Play/pause overlay — visible when paused or on hover */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
        !playing || hovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="w-10 h-10 rounded-full border border-[#c07a3f]/60 bg-black/40 flex items-center justify-center backdrop-blur-sm">
          {playing ? (
            /* Pause icon */
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="2" width="3.5" height="10" rx="1" fill="#c07a3f" />
              <rect x="8.5" y="2" width="3.5" height="10" rx="1" fill="#c07a3f" />
            </svg>
          ) : (
            /* Play icon */
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 2.5 L11 7 L3 11.5 Z" fill="#c07a3f" />
            </svg>
          )}
        </div>
      </div>

      {/* DEMO badge */}
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-sm bg-black/60 backdrop-blur-sm border border-[#c07a3f]/20">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c07a3f]" style={{ animation: playing ? 'none' : undefined }} />
        <span className="font-mono text-[9px] text-[#c07a3f]/80 uppercase tracking-widest">Demo</span>
      </div>

      {/* Muted indicator */}
      <div className="absolute bottom-2.5 right-2.5 font-mono text-[8px] text-[#aaa] uppercase tracking-widest pointer-events-none">
        muted
      </div>
    </div>
  )
}

export default function ProjectImage({ id }) {
  const mediaUrl = import.meta.env[`VITE_PROJECT_${id}_MEDIA`]

  if (mediaUrl) {
    const isVideo = VIDEO_EXT.test(mediaUrl.split('?')[0])
    if (isVideo) return <VideoPlayer src={mediaUrl} />
    return (
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9', background: '#080808' }}>
        <img src={mediaUrl} alt={id} className="w-full h-full object-cover" />
      </div>
    )
  }

  // Fallback — built-in PCB render SVG
  const Comp = SVG_MAP[id]
  if (!Comp) return null
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '2 / 1', background: '#080f08' }}>
      <Comp />
    </div>
  )
}
