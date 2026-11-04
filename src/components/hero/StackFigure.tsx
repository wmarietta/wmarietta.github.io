import type { CSSProperties, ReactNode } from 'react'
import styles from './StackFigure.module.css'

/*
 * Exploded axonometric drawing of the three layers I build across:
 * interface, API, and data. Each plate is drawn flat and projected with an
 * isometric matrix, so the plate contents stay simple rectangles and lines.
 */

const ISO = (e: number, f: number) => `matrix(0.866 0.5 -0.866 0.5 ${e} ${f})`
const E = 170 // x of each plate's back corner
const PLATE_Y = [24, 174, 324] // y of each plate's back corner, top to bottom
const W = 260 // plate width (along x)
const D = 170 // plate depth (along y)
const T = 7 // plate thickness

// Projected plate corners relative to the back corner
const P1 = { x: W * 0.866, y: W * 0.5 } // right
const P2 = { x: (W - D) * 0.866, y: (W + D) * 0.5 } // front
const P3 = { x: -D * 0.866, y: D * 0.5 } // left

// A plate-local point (130, 85) projects to the same x on every plate.
const CENTER = { x: E + (130 - 85) * 0.866, y: (130 + 85) * 0.5 }

const LAYERS = [
  { name: 'Interface', detail: 'React · TypeScript' },
  { name: 'API', detail: 'Node.js · Express' },
  { name: 'Data', detail: 'MySQL' },
]

function Plate({ f, children }: { f: number; children: ReactNode }) {
  const pt = (p: { x: number; y: number }, dy = 0) => `${E + p.x},${f + p.y + dy}`
  return (
    <g>
      {/* Thickness: left and right front faces */}
      <polygon className={styles.sideLeft} points={`${pt(P3)} ${pt(P2)} ${pt(P2, T)} ${pt(P3, T)}`} />
      <polygon className={styles.sideRight} points={`${pt(P2)} ${pt(P1)} ${pt(P1, T)} ${pt(P2, T)}`} />
      <polygon className={styles.top} points={`${E},${f} ${pt(P1)} ${pt(P2)} ${pt(P3)}`} />
      <g transform={ISO(E, f)}>{children}</g>
    </g>
  )
}

function InterfacePlate() {
  return (
    <>
      <rect className={styles.ink} x="14" y="14" width="232" height="16" rx="3" />
      <rect className={styles.fill} x="14" y="44" width="120" height="8" rx="2" />
      <rect className={styles.fill} x="14" y="58" width="80" height="8" rx="2" />
      <rect className={styles.accent} x="14" y="74" width="46" height="12" rx="6" />
      <rect className={styles.ink} x="14" y="100" width="72" height="54" rx="4" />
      <rect className={styles.ink} x="94" y="100" width="72" height="54" rx="4" />
      <rect className={styles.ink} x="174" y="100" width="72" height="54" rx="4" />
    </>
  )
}

function ApiPlate() {
  return (
    <>
      <line className={styles.wire} x1="46" y1="40" x2="95" y2="74" />
      <line className={styles.accentWire} x1="46" y1="85" x2="95" y2="85" />
      <line className={styles.wire} x1="46" y1="130" x2="95" y2="96" />
      <line className={styles.accentWire} x1="165" y1="85" x2="195" y2="85" />
      <circle className={styles.ink} cx="40" cy="40" r="6" />
      <circle className={styles.accent} cx="40" cy="85" r="6" />
      <circle className={styles.ink} cx="40" cy="130" r="6" />
      <rect className={styles.ink} x="95" y="62" width="70" height="46" rx="5" />
      <rect className={styles.ink} x="195" y="70" width="44" height="30" rx="4" />
    </>
  )
}

function DataPlate() {
  const table = (x: number, y: number, w: number, h: number) => (
    <g>
      <rect className={styles.ink} x={x} y={y} width={w} height={h} rx="3" />
      <line className={styles.wire} x1={x} y1={y + 13} x2={x + w} y2={y + 13} />
      <line className={styles.faint} x1={x + 6} y1={y + 25} x2={x + w - 6} y2={y + 25} />
      <line className={styles.faint} x1={x + 6} y1={y + 36} x2={x + w - 6} y2={y + 36} />
    </g>
  )
  return (
    <>
      <line className={styles.accentWire} x1="86" y1="52" x2="112" y2="86" />
      <line className={styles.wire} x1="198" y1="68" x2="168" y2="86" />
      {table(16, 20, 70, 56)}
      {table(98, 80, 70, 56)}
      {table(180, 22, 64, 46)}
      <circle className={styles.accent} cx="86" cy="52" r="3" />
      <circle className={styles.accent} cx="112" cy="86" r="3" />
    </>
  )
}

export function StackFigure({ className }: { className?: string }) {
  const [top, mid, bottom] = PLATE_Y
  const label = (i: number) => {
    const y = PLATE_Y[i] + P1.y
    const x = E + P1.x
    return (
      <g className={styles.label} style={{ '--i': i } as CSSProperties}>
        <line className={styles.leader} x1={x + 4} y1={y} x2={x + 20} y2={y} />
        <text x={x + 26} y={y - 3} className={styles.labelName}>
          {LAYERS[i].name}
        </text>
        <text x={x + 26} y={y + 15} className={styles.labelDetail}>
          {LAYERS[i].detail}
        </text>
      </g>
    )
  }

  return (
    <figure className={`${styles.figure} ${className ?? ''}`}>
      <svg
        viewBox="0 0 568 566"
        role="img"
        aria-label="Illustration of the three layers I build across: the interface in React and TypeScript, the API in Node.js and Express, and the data layer in MySQL."
        className={styles.svg}
      >
        {/* Bottom-up so each plate covers the one beneath it */}
        <g className={styles.plate} style={{ '--i': 0 } as CSSProperties}>
          <Plate f={bottom}>
            <DataPlate />
          </Plate>
        </g>
        <line className={styles.connector} x1={CENTER.x} y1={mid + CENTER.y} x2={CENTER.x} y2={bottom + CENTER.y} />
        <g className={styles.plate} style={{ '--i': 1 } as CSSProperties}>
          <Plate f={mid}>
            <ApiPlate />
          </Plate>
        </g>
        <line className={styles.connector} x1={CENTER.x} y1={top + CENTER.y} x2={CENTER.x} y2={mid + CENTER.y} />
        <g className={styles.plate} style={{ '--i': 2 } as CSSProperties}>
          <Plate f={top}>
            <InterfacePlate />
          </Plate>
        </g>

        {label(0)}
        {label(1)}
        {label(2)}

        {/* A request travelling down through the stack and back */}
        <circle className={styles.packet} cx={CENTER.x} cy={top + CENTER.y} r="4.5" />
      </svg>
    </figure>
  )
}
