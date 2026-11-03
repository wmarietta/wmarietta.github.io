import type { CSSProperties, JSX } from 'react'
import type { ProjectVisual as VisualKind } from '../../../content/types'
import styles from './ProjectVisual.module.css'

/**
 * Abstract, diagrammatic illustrations for each project. They describe the
 * *idea* of the project (a deck, a map/reduce fan-out, animation states),
 * not its UI, so nothing here pretends to be a screenshot.
 */
export function ProjectVisual({ kind }: { kind: VisualKind }) {
  const Visual = visuals[kind]
  return (
    <div className={styles.visual} data-kind={kind} aria-hidden="true">
      <Visual />
    </div>
  )
}

const v = (vars: Record<string, string | number>) => vars as CSSProperties

/* Duelist Kingdom: a fanned hand of cards on drafting arcs ---------------- */

function Duelist() {
  const cards = [-26, -13, 0, 13, 26]
  const emblems = [
    <polygon key="tri" points="0,-20 18,12 -18,12" />,
    <rect key="sq" x="-15" y="-15" width="30" height="30" transform="rotate(45)" />,
    <g key="center">
      <circle r="22" />
      <circle r="11" />
      <path d="M0 -34 V -26 M0 26 V 34 M-34 0 H -26 M26 0 H 34" />
    </g>,
    <polygon key="hex" points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10" />,
    <circle key="ring" r="18" />,
  ]
  // Draw outer cards first so the center card sits on top of the fan.
  const drawOrder = cards
    .map((r, i) => ({ r, i }))
    .sort((a, b) => Math.abs(b.r) - Math.abs(a.r))
  return (
    <svg viewBox="80 56 400 320" className={styles.svg}>
      <g className={styles.arcs}>
        <circle cx="280" cy="470" r="250" />
        <circle cx="280" cy="470" r="330" />
        <circle cx="280" cy="470" r="410" />
      </g>
      <line x1="280" y1="0" x2="280" y2="420" className={styles.axis} />
      <text x="290" y="84" className={styles.label}>
        DECK · 0{cards.length}
      </text>
      {drawOrder.map(({ r, i }) => (
        <g
          key={r}
          className={`${styles.fanCard} ${r === 0 ? styles.fanCenter : ''}`}
          style={v({ '--r': r, '--i': i })}
        >
          <rect x="214" y="112" width="132" height="192" rx="11" className={styles.cardBody} />
          <rect x="223" y="121" width="114" height="174" rx="6" className={styles.cardInset} />
          <g transform="translate(280 192)" className={r === 0 ? styles.emblemBrass : styles.emblem}>
            {emblems[i]}
          </g>
          <line x1="236" y1="252" x2="324" y2="252" className={styles.cardLine} />
          <line x1="236" y1="264" x2="300" y2="264" className={styles.cardLine} />
          <line x1="236" y1="276" x2="312" y2="276" className={styles.cardLine} />
        </g>
      ))}
    </svg>
  )
}

/* MapReduce: coordinator, map workers, shuffle, reduce workers ------------ */

function MapReduce() {
  const inputs = [62, 104, 146, 188]
  const maps = [78, 135, 192]
  const reduces = [106, 164]
  const outputs = [106, 164]
  return (
    <svg viewBox="0 0 480 270" className={styles.svg}>
      <g className={styles.columnLabels}>
        <text x="44" y="30" textAnchor="middle">INPUT</text>
        <text x="160" y="30" textAnchor="middle">MAP</text>
        <text x="240" y="250" textAnchor="middle">SHUFFLE</text>
        <text x="320" y="30" textAnchor="middle">REDUCE</text>
        <text x="436" y="30" textAnchor="middle">OUTPUT</text>
      </g>

      {/* Coordinator assigns tasks */}
      <rect x="208" y="16" width="64" height="22" rx="5" className={styles.coord} />
      <text x="240" y="31" textAnchor="middle" className={styles.coordText}>COORD</text>
      {[...maps.map((y) => [160, y]), ...reduces.map((y) => [320, y])].map(([x, y]) => (
        <line key={`c-${x}-${y}`} x1="240" y1="38" x2={x} y2={y - 14} className={styles.assign} />
      ))}

      {inputs.map((y) => (
        <rect key={`in-${y}`} x="24" y={y - 14} width="40" height="28" rx="4" className={styles.block} />
      ))}
      {inputs.map((y, i) => (
        <path
          key={`im-${y}`}
          d={`M64 ${y} C 110 ${y}, 110 ${maps[Math.min(i, 2)]}, 146 ${maps[Math.min(i, 2)]}`}
          className={styles.flow}
        />
      ))}

      {maps.map((my) =>
        reduces.map((ry) => (
          <path
            key={`mr-${my}-${ry}`}
            d={`M174 ${my} C 240 ${my}, 240 ${ry}, 306 ${ry}`}
            className={`${styles.flow} ${styles.shuffle}`}
          />
        )),
      )}

      {reduces.map((y, i) => (
        <path key={`ro-${y}`} d={`M334 ${y} L 416 ${outputs[i]}`} className={styles.flow} />
      ))}

      {maps.map((y) => (
        <circle key={`m-${y}`} cx="160" cy={y} r="14" className={styles.worker} />
      ))}
      {reduces.map((y) => (
        <circle key={`r-${y}`} cx="320" cy={y} r="14" className={`${styles.worker} ${styles.workerBrass}`} />
      ))}
      {outputs.map((y) => (
        <rect key={`o-${y}`} x="416" y={y - 14} width="40" height="28" rx="4" className={styles.blockBrass} />
      ))}
    </svg>
  )
}

/* Fighting game: sprite frames for each animation state ------------------- */

function Fighter() {
  const frames = [
    { label: 'IDLE', pose: 'idle' },
    { label: 'ATTACK', pose: 'attack' },
    { label: 'SPECIAL', pose: 'special' },
    { label: 'HURT', pose: 'hurt' },
  ] as const
  return (
    <svg viewBox="0 0 480 270" className={styles.svg}>
      {frames.map((f, i) => {
        const x = 28 + i * 108
        return (
          <g key={f.label} className={styles.frame} style={v({ '--i': i })}>
            <rect x={x} y="40" width="96" height="140" rx="6" className={styles.frameBox} />
            <rect x={x} y="40" width="96" height="140" rx="6" className={styles.frameActive} />
            <line x1={x + 12} y1="160" x2={x + 84} y2="160" className={styles.ground} />
            <g transform={`translate(${x + 48} 160)`}>
              <Figure pose={f.pose} />
            </g>
            <text x={x + 48} y="204" textAnchor="middle" className={styles.label}>
              {f.label}
            </text>
          </g>
        )
      })}
      <line x1="28" y1="230" x2="452" y2="230" className={styles.axis} />
      {Array.from({ length: 13 }, (_, i) => (
        <line key={i} x1={28 + i * 35.33} y1="226" x2={28 + i * 35.33} y2="234" className={styles.axis} />
      ))}
      <text x="452" y="254" textAnchor="end" className={styles.label}>
        RENDER THREAD · 12 FPS
      </text>
      <text x="28" y="254" className={styles.label}>
        STATE
      </text>
    </svg>
  )
}

function Figure({ pose }: { pose: 'idle' | 'attack' | 'special' | 'hurt' }) {
  const lean = { idle: 0, attack: 12, special: -4, hurt: -16 }[pose]
  return (
    <g className={styles.figure}>
      <g transform={`rotate(${lean})`}>
        <rect x="-11" y="-74" width="22" height="40" rx="9" />
        <circle cx="0" cy="-86" r="10" />
        <path d="M-6 -34 L-12 0 M6 -34 L12 0" />
        {pose === 'idle' && <path d="M-11 -64 L-18 -42 M11 -64 L18 -42" />}
        {pose === 'attack' && <path d="M11 -64 L38 -62 M-11 -64 L-16 -44" />}
        {pose === 'special' && <path d="M11 -62 L30 -56 M-11 -62 L-4 -48" />}
        {pose === 'hurt' && <path d="M-11 -64 L-26 -78 M11 -64 L22 -80" />}
      </g>
      {pose === 'attack' && <path d="M40 -72 L50 -62 M42 -52 L52 -56" className={styles.fxBrass} />}
      {pose === 'special' && (
        <g className={styles.fxBrass}>
          <circle cx="40" cy="-56" r="6" />
          <circle cx="40" cy="-56" r="12" opacity="0.4" />
        </g>
      )}
      {pose === 'hurt' && <path d="M24 -60 L32 -66 M26 -48 L36 -48 M24 -36 L32 -30" className={styles.fx} />}
    </g>
  )
}

/* RadioWave: weekly time-slot schedule over a waveform -------------------- */

function Radio() {
  const slots = [
    [0, 0, 2, 'a'], [1, 1, 1, 'b'], [2, 0, 1, 'c'], [3, 2, 2, 'a'], [4, 0, 2, 'b'],
    [5, 1, 2, 'c'], [6, 0, 1, 'a'], [0, 3, 1, 'c'], [2, 2, 2, 'b'], [4, 3, 1, 'a'], [6, 2, 2, 'b'],
  ] as const
  const bars = Array.from({ length: 48 }, (_, i) => 6 + Math.abs(Math.sin(i * 0.55) * 22 + Math.sin(i * 1.7) * 9))
  const colW = 56
  const rowH = 26
  return (
    <svg viewBox="0 0 480 270" className={styles.svg}>
      <g className={styles.columnLabels}>
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d, i) => (
          <text key={d} x={48 + i * colW + colW / 2} y="30" textAnchor="middle">
            {d}
          </text>
        ))}
      </g>
      {Array.from({ length: 8 }, (_, i) => (
        <line key={`v${i}`} x1={48 + i * colW} y1="40" x2={48 + i * colW} y2={40 + rowH * 5} className={styles.gridLine} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={`h${i}`} x1="48" y1={40 + i * rowH} x2={48 + 7 * colW} y2={40 + i * rowH} className={styles.gridLine} />
      ))}
      {slots.map(([day, row, span, role], i) => (
        <rect
          key={i}
          x={48 + day * colW + 3}
          y={40 + row * rowH + 3}
          width={colW - 6}
          height={rowH * span - 6}
          rx="3"
          className={styles[`slot-${role}`]}
        />
      ))}
      <g className={styles.wave}>
        {bars.map((h, i) => (
          <rect key={i} x={48 + i * 8.17} y={232 - h / 2} width="3" height={h} rx="1.5" style={v({ '--i': i })} />
        ))}
      </g>
    </svg>
  )
}

/* NASA robotics: humanoid kinematic chain in a simulated world ------------ */

function Robotics() {
  const joints: [number, number][] = [
    [240, 66], [240, 92], [214, 98], [266, 98], [202, 132], [292, 124], [196, 164],
    [240, 150], [226, 154], [254, 154], [222, 196], [258, 196], [220, 236], [260, 236],
  ]
  const links: [number, number][] = [
    [0, 1], [1, 2], [1, 3], [2, 4], [4, 6], [1, 7], [7, 8], [7, 9], [8, 10], [9, 11], [10, 12], [11, 13],
  ]
  return (
    <svg viewBox="0 0 480 270" className={styles.svg}>
      <g className={styles.floor}>
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`f${i}`} x1={240} y1="236" x2={-80 + i * 80} y2="300" />
        ))}
        <line x1="0" y1="236" x2="480" y2="236" />
        <line x1="0" y1="252" x2="480" y2="252" />
        <line x1="0" y1="274" x2="480" y2="274" />
      </g>
      <path d="M292 124 A 52 52 0 0 0 330 70" className={styles.reach} />
      <g className={styles.arm}>
        <line x1="266" y1="98" x2="292" y2="124" className={styles.link} />
        <line x1="292" y1="124" x2="324" y2="96" className={`${styles.link} ${styles.linkBrass}`} />
        <circle cx="324" cy="96" r="5" className={styles.jointBrass} />
      </g>
      {links.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={joints[a][0]}
          y1={joints[a][1]}
          x2={joints[b][0]}
          y2={joints[b][1]}
          className={styles.link}
        />
      ))}
      <circle cx="240" cy="58" r="16" className={styles.head} />
      {joints.slice(1).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" className={styles.joint} />
      ))}
      <g className={styles.axes} transform="translate(60 210)">
        <line x1="0" y1="0" x2="34" y2="0" />
        <line x1="0" y1="0" x2="0" y2="-34" />
        <line x1="0" y1="0" x2="-18" y2="16" />
        <text x="40" y="4">x</text>
        <text x="-4" y="-40">z</text>
        <text x="-30" y="26">y</text>
      </g>
      <text x="420" y="30" textAnchor="end" className={styles.label}>
        SIM · AUTONOMOUS TASK
      </text>
    </svg>
  )
}

const visuals: Record<VisualKind, () => JSX.Element> = {
  duelist: Duelist,
  mapreduce: MapReduce,
  fighter: Fighter,
  radio: Radio,
  robotics: Robotics,
}
