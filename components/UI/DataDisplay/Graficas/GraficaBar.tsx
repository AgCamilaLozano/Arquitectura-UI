'use client'
import React, { useState, useRef } from 'react'
import { Tooltip } from '@/components/ui/Compuesto/Tooltip'
import { ChevronDown } from 'lucide-react'

// ─── Tipos ───────────────────────────────────────────────────────
interface BarSegment {
    label: string
    value: number
}

interface PureBarChartProps {
    data: BarSegment[]
    title?: string
    description?: string
    height?: number
    barRadius?: number
    animated?: boolean
    legendLabel?: string
    yLabel?: string
}
const chartColors = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
]


// ─── Componente ──────────────────────────────────────────────────
const GraficaBar = ({
    data,
    title,
    description,
    height = 240,
    barRadius = 2,
    animated = true,
    legendLabel,
    yLabel,
}: PureBarChartProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const maxValue = Math.max(...data.map(d => d.value), 1)
    const ceilMax = Math.ceil(maxValue * 1.15)
    const padding = { top: 16, bottom: 36, left: 52, right: 16 }
    const svgW = Math.max(data.length * 72 + padding.left + padding.right, 320)
    const chartH = height - padding.top - padding.bottom

    const yTicks = Array.from({ length: 5 }, (_, i) => Math.round((ceilMax / 4) * i))

    const formatVal = (n: number) => {
        if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
        if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
        return n.toString()
    }
    const [tooltip, setTooltip] = useState<{
        x: number
        y: number
        label: string
        value: number
    } | null>(null)

    return (
        <div ref={containerRef} className="relative rounded-2xl border border-border bg-surface shadow-sm p-5"
            onMouseLeave={() => {
                setHoveredIndex(null)
                setTooltip(null)
            }}>
            {title && <p className="text-sm font-semibold text-text-primary">{title}</p>}
            {description && <p className="text-xs text-text-muted mt-0.5 mb-2">{description}</p>}

            <div className="w-full relative overflow-hidden">
                <svg width="100%" viewBox={`0 0 ${svgW} ${height}`} className="select-none relative z-0">
                    {yLabel && (
                        <text
                            x={10}
                            y={padding.top - 5}
                            fill="var(--text-muted)"
                            fontSize={10}
                            fontWeight={600}

                        >
                            {yLabel}
                        </text>
                    )}

                    <g transform={`translate(${padding.left}, ${padding.top + 10})`}>
                        {/* Grid + Y labels */}
                        {yTicks.map(tick => {
                            const y = chartH - (tick / ceilMax) * chartH
                            return (
                                <g key={tick}>
                                    <line x1={0} y1={y} x2={svgW - padding.left - padding.right} y2={y}
                                        stroke="var(--border-default)" strokeDasharray="4 3" />
                                    <text x={-10} y={y + 4} textAnchor="end" fill="var(--text-muted)" fontSize={10}>
                                        {formatVal(tick)}
                                    </text>
                                </g>
                            )
                        })}

                        {/* Barras SVG puras */}
                        {data.map((item, i) => {
                            const barH = (item.value / ceilMax) * chartH
                            const x = i * 72 + 16
                            const isHov = hoveredIndex === i

                            return (
                                <g key={i}>
                                    <rect
                                        x={x - 4}
                                        y={0}
                                        width={28}
                                        height={chartH}
                                        fill="transparent"
                                        style={{ cursor: 'pointer' }}
                                        onMouseEnter={(e) => {
                                            setHoveredIndex(i)

                                            const containerRect = containerRef.current?.getBoundingClientRect()
                                            const svgEl = (e.currentTarget as Element).closest('svg')
                                            const svgRect = svgEl?.getBoundingClientRect()
                                            if (!containerRect || !svgRect) return

                                            const scaleX = svgRect.width / svgW
                                            const scaleY = svgRect.height / height

                                            const xCenter = (x + 35 + padding.left) * scaleX + (svgRect.left - containerRect.left)
                                            const yTop = (chartH - barH + padding.top) * scaleY + (svgRect.top - containerRect.top)

                                            setTooltip({ x: xCenter, y: yTop, label: item.label, value: item.value })
                                        }}

                                    />

                                    {/* Highlight */}
                                    {isHov && (
                                        <rect
                                            x={x - 6}
                                            y={0}
                                            width={42}
                                            height={chartH}
                                            rx={8}
                                            fill={chartColors[i % chartColors.length]}
                                            opacity={0.08}
                                            className="transition-all duration-300"
                                        />
                                    )}

                                    {/* Barra */}
                                    <rect
                                        x={x}
                                        y={chartH - barH}
                                        width={28}
                                        height={barH}
                                        rx={barRadius}
                                        fill={chartColors[i % chartColors.length]}
                                        opacity={isHov ? 1 : 0.85}
                                        className="transition-all duration-300 ease-out pointer-events-none"
                                        style={{
                                            filter: isHov
                                                ? `drop-shadow(0 4px 8px ${chartColors[i % chartColors.length]}40)`
                                                : 'none',
                                        }}
                                    />

                                    {/* Label */}
                                    <text
                                        x={x + 14}
                                        y={chartH + 18}
                                        textAnchor={'middle'}
                                        fill={isHov ? "var(--text-primary)" : "var(--text-muted)"}
                                        fontSize={11}
                                        fontWeight={isHov ? 600 : 400}
                                        className="pointer-events-none transition-all duration-200"
                                    >
                                        {item.label}
                                    </text>
                                </g>
                            )
                        })}

                        {/* Eje base */}
                        <line x1={0} y1={chartH} x2={svgW - padding.left - padding.right} y2={chartH} stroke="var(--border-strong)" />
                    </g>

                    <style>{`
                        @keyframes barGrow {
                            from { transform: scaleY(0); opacity: 0; }
                            to   { transform: scaleY(1); opacity: 1; }
                        }
                    `}</style>
                </svg>
                {tooltip && (
                    <div
                        className="absolute z-50 pointer-events-none transition-all duration-150"
                        style={{
                            left: tooltip.x,
                            top: tooltip.y,
                            transform: 'translate(calc(-50% - 10px), calc(-50% - 10px))',
                        }}
                    >
                        <div className="relative bg-[#0A0A0B] text-white text-xs rounded-lg px-3 py-2 shadow-2xl border border-white/10 backdrop-blur-sm whitespace-nowrap">
                            <p className="text-[11px] text-center">
                                {tooltip.label}
                            </p>
                            <p className="text-sm font-semibold">
                                {formatVal(tooltip.value)}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Leyenda simple */}
            {legendLabel && (
                <div className="flex justify-center items-center gap-2 mt-4 px-2">
                    <div className="flex items-center gap-1.5">
                        <div
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: chartColors[0] }}
                        />
                        <span className="text-sm font-medium">
                            {legendLabel}
                        </span>
                    </div>
                </div>
            )}
        </div >
    )
}

export default GraficaBar
