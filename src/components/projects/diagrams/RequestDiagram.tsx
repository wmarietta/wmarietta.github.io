import type { CSSProperties } from 'react'
import type { CaseStudy } from '../../../content/types'
import styles from './RequestDiagram.module.css'

const PITCH = 84
const TOP = 62
const PLATE_H = 54
const PLATE_X = 52
const PLATE_W = 280
const WIRE_X = 24

/**
 * Schematic of a request travelling through the featured project's backend
 * layers and back. Built from the same data as the case study, so the two
 * never disagree. Animation is CSS-only and disabled for reduced motion.
 */
export function RequestDiagram({ layers }: { layers: CaseStudy['architecture']['layers'] }) {
  const rows = layers
  const lastY = TOP + (rows.length - 1) * PITCH
  const servicesIndex = rows.findIndex((l) => l.name.toLowerCase() === 'services')

  const description = `Diagram: a request moves from the ${rows
    .map((r) => r.name)
    .join(', then ')}, and the response returns the same way. The services layer also calls the external YGOPRODeck card API.`

  return (
    <svg
      className={styles.diagram}
      viewBox={`0 0 444 ${lastY + 48}`}
      role="img"
      aria-labelledby="request-diagram-title request-diagram-desc"
    >
      <title id="request-diagram-title">Request lifecycle in Duelist Kingdom</title>
      <desc id="request-diagram-desc">{description}</desc>

      <text x="0" y="14" className={styles.figLabel}>
        REQUEST LIFECYCLE
      </text>
      <text x={PLATE_X + PLATE_W} y="14" className={styles.figLabel} textAnchor="end">
        REQ ↓ · RES ↑
      </text>

      {/* Spine */}
      <line x1={WIRE_X} y1={TOP} x2={WIRE_X} y2={lastY} className={styles.wire} />

      {rows.map((layer, i) => {
        const cy = TOP + i * PITCH
        return (
          <g key={layer.name} className={styles.row} style={{ '--i': i } as CSSProperties}>
            <line x1={WIRE_X + 5} y1={cy} x2={PLATE_X} y2={cy} className={styles.stub} />
            <circle cx={WIRE_X} cy={cy} r="4" className={styles.node} />
            <rect
              x={PLATE_X}
              y={cy - PLATE_H / 2}
              width={PLATE_W}
              height={PLATE_H}
              rx="9"
              className={styles.plate}
            />
            <text x={PLATE_X + 18} y={cy + 4} className={styles.index}>
              {String(i + 1).padStart(2, '0')}
            </text>
            <text x={PLATE_X + 44} y={cy + 5.5} className={styles.name}>
              {layer.name}
            </text>
            <text x={PLATE_X + PLATE_W - 16} y={cy + 4} className={styles.detail} textAnchor="end">
              {layer.detail}
            </text>
          </g>
        )
      })}

      {/* Labels in the gaps between plates */}
      <text x={PLATE_X + 18} y={TOP + PITCH / 2 + 3.5} className={styles.gapLabel}>
        HTTP · JSON
      </text>
      <text x={PLATE_X + 18} y={lastY - PITCH / 2 + 3.5} className={styles.gapLabel}>
        SQL
      </text>

      {/* External dependency off the services layer */}
      {servicesIndex >= 0 && (
        <g
          className={styles.external}
          style={{ '--i': servicesIndex } as CSSProperties}
          transform={`translate(0 ${TOP + servicesIndex * PITCH})`}
        >
          <line x1={PLATE_X + PLATE_W} y1="0" x2={PLATE_X + PLATE_W + 22} y2="0" className={styles.dashed} />
          <rect x={PLATE_X + PLATE_W + 22} y={-PLATE_H / 2} width="88" height={PLATE_H} rx="9" className={styles.extPlate} />
          <text x={PLATE_X + PLATE_W + 66} y="-1" textAnchor="middle" className={styles.extName}>
            YGOPRODeck
          </text>
          <text x={PLATE_X + PLATE_W + 66} y="14" textAnchor="middle" className={styles.extDetail}>
            EXTERNAL
          </text>
        </g>
      )}

      {/* The request itself */}
      <g className={styles.packet}>
        <circle cx={WIRE_X} cy={TOP} r="11" className={styles.halo} />
        <circle cx={WIRE_X} cy={TOP} r="5" className={styles.dot} />
      </g>
    </svg>
  )
}
