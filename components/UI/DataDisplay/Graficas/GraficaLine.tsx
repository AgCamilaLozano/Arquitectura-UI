'use client'
import React, { useState, useRef } from 'react'

interface DataPoint { label: string; value: number }
interface PureLineChartProps {
    data: DataPoint[]
    title?: string
    description?: string
    height?: number
    lineColor?: string
    showArea?: boolean
    animated?: boolean
    legendLabel?: string
    yLabel?: string
}

const PureLineChart = ({
    data, title, description, height = 240,
    lineColor = '#7c3aed', showArea = false, animated = true,
    legendLabel, yLabel,
}: PureLineChartProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; value: number } | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const maxValue = Math.max(...data.map(d => d.value), 1) * 1.15
    const padding = { top: 16, bottom: 36, left: 52, right: 24 }
    const svgW = Math.max(data.length * 80 + padding.left + padding.right, 360)
    const chartW = svgW - padding.left - padding.right
    const chartH = height - padding.top - padding.bottom

    const scaleX = (i: number) => (i / Math.max(data.length - 1, 1)) * chartW
    const scaleY = (v: number) => chartH - (v / maxValue) * chartH

    const buildSmoothPath = () => {
        if (data.length < 2) return ''
        let path = `M${scaleX(0)},${scaleY(data[0].value)}`
        for (let i = 0; i < data.length - 1; i++) {
            const x0 = scaleX(i), y0 = scaleY(data[i].value)
            const x1 = scaleX(i + 1), y1 = scaleY(data[i + 1].value)
            const cpx = (x0 + x1) / 2
            path += ` C${cpx},${y0} ${cpx},${y1} ${x1},${y1}`
        }
        return path
    }
    const smoothLine = buildSmoothPath()
    const areaPath = smoothLine + ` L${scaleX(data.length - 1)},${chartH} L${scaleX(0)},${chartH} Z`
    const yTicks = Array.from({ length: 5 }, (_, i) => Math.round((maxValue / 4) * i))
    const gradientId = `area-grad-${lineColor.replace('#', '')}`

    const formatVal = (n: number) => {
        if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
        if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
        return Number.isInteger(n) ? n.toString() : n.toFixed(1)
    }

    // ← Calcula posición real del punto en píxeles
    const updateTooltip = (e: React.MouseEvent, i: number) => {
        const containerRect = containerRef.current?.getBoundingClientRect()
        const svgEl = (e.currentTarget as Element).closest('svg')
        const svgRect = svgEl?.getBoundingClientRect()
        if (!containerRect || !svgRect) return

        const scaleFactorX = svgRect.width / svgW
        const scaleFactorY = svgRect.height / height

        const xPx = (scaleX(i) + padding.left) * scaleFactorX + (svgRect.left - containerRect.left)
        const yPx = (scaleY(data[i].value) + padding.top) * scaleFactorY + (svgRect.top - containerRect.top)

        setTooltip({ x: xPx, y: yPx, label: data[i].label, value: data[i].value })
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        const svgEl = (e.currentTarget as Element).closest('svg')
        const svgRect = svgEl?.getBoundingClientRect()
        if (!svgRect) return
        const scaleFactorX = svgRect.width / svgW
        const mouseX = e.clientX - svgRect.left - padding.left * scaleFactorX
        const idx = Math.round((mouseX / (chartW * scaleFactorX)) * (data.length - 1))
        const clampedIdx = Math.max(0, Math.min(data.length - 1, idx))
        setHoveredIndex(clampedIdx)
    }

    return (
        <div
            ref={containerRef}
            className="relative rounded-2xl border border-border bg-surface shadow-sm p-5"
            onMouseLeave={() => { setHoveredIndex(null); setTooltip(null) }}
        >
            {title && <p className="text-sm font-semibold text-text-primary">{title}</p>}
            {description && <p className="text-xs text-text-muted mt-0.5 mb-2">{description}</p>}

            <div className="w-full overflow-x-auto relative">
                <svg width="100%" viewBox={`0 0 ${svgW} ${height}`} className="select-none">
                    {yLabel && (
                        <text
                            x={10}
                            y={padding.top - 8}
                            fill="var(--text-muted)"
                            fontSize={10}
                            fontWeight={600}
                        >
                            {yLabel}
                        </text>
                    )}
                    <defs>
                        {showArea && (
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={lineColor} stopOpacity={0.3} />
                                <stop offset="100%" stopColor={lineColor} stopOpacity={0.02} />
                            </linearGradient>
                        )}
                    </defs>

                    <g transform={`translate(${padding.left}, ${padding.top + 15})`}>
                        {yTicks.map(tick => {
                            const y = scaleY(tick)
                            return (
                                <g key={tick}>
                                    <line x1={0} y1={y} x2={chartW} y2={y}
                                        stroke="var(--border-default)" strokeDasharray="4 3" />
                                    <text x={-10} y={y + 4} textAnchor="end" fill="var(--text-muted)" fontSize={10}>
                                        {formatVal(Math.round(tick))}
                                    </text>
                                </g>
                            )
                        })}

                        {showArea && <path d={areaPath} fill={`url(#${gradientId})`} />}

                        <path d={smoothLine} fill="none" stroke={lineColor} strokeWidth={2.5}
                            strokeLinecap="round" strokeLinejoin="round"
                            style={animated ? {
                                strokeDasharray: 2000, strokeDashoffset: 2000,
                                animation: `drawLine 1.2s ease-out forwards`,
                            } : undefined}
                        />

                        {hoveredIndex !== null && (
                            <>
                                <line x1={scaleX(hoveredIndex)} y1={0} x2={scaleX(hoveredIndex)} y2={chartH}
                                    stroke={lineColor} strokeWidth={1} strokeDasharray="3 3" opacity={0.4} />
                                <circle cx={scaleX(hoveredIndex)} cy={scaleY(data[hoveredIndex].value)}
                                    r={7} fill={lineColor} opacity={0.15} />
                            </>
                        )}

                        {data.map((d, i) => {
                            const cx = scaleX(i), cy = scaleY(d.value)
                            const isHov = hoveredIndex === i
                            return (
                                <g key={i}>
                                    <circle cx={cx} cy={cy} r={isHov ? 5.5 : 3.5}
                                        fill="var(--bg-surface)" stroke={lineColor} strokeWidth={2.5}
                                        className="transition-all duration-200 pointer-events-none"
                                    />
                                    {/* Hotspot invisible */}
                                    <circle cx={cx} cy={cy} r={14} fill="transparent" />
                                </g>
                            )
                        })}

                        {data.map((d, i) => (
                            <text key={i} x={scaleX(i)} y={chartH + 18} textAnchor="middle"
                                fill="var(--text-muted)" fontSize={11}
                                fontWeight={hoveredIndex === i ? 600 : 400}
                                className="pointer-events-none"
                            >
                                {d.label}
                            </text>
                        ))}

                        <rect x={0} y={0} width={chartW} height={chartH} fill="transparent"
                            onMouseMove={(e) => {
                                const svgEl = (e.currentTarget as Element).closest('svg')
                                const svgRect = svgEl?.getBoundingClientRect()
                                if (!svgRect) return
                                const scaleFactorX = svgRect.width / svgW
                                const mouseX = e.clientX - svgRect.left - padding.left * scaleFactorX
                                const idx = Math.max(0, Math.min(data.length - 1,
                                    Math.round((mouseX / (chartW * scaleFactorX)) * (data.length - 1))
                                ))
                                setHoveredIndex(idx)
                                updateTooltip(e, idx)
                            }}
                            onMouseLeave={() => { setHoveredIndex(null); setTooltip(null) }}
                        />
                        <line x1={0} y1={chartH} x2={chartW} y2={chartH} stroke="var(--border-strong)" />
                    </g>

                    <style>{`
                        @keyframes drawLine { to { stroke-dashoffset: 0; } }
                    `}</style>
                </svg>

                {/* Tooltip custom — igual que el bar chart */}
                {tooltip && (
                    <div
                        className="absolute z-50 pointer-events-none transition-all duration-150"
                        style={{
                            left: tooltip.x,
                            top: tooltip.y,
                            transform: 'translate(-90%, -70%)',
                        }}
                    >
                        <div className="relative bg-[#0A0A0B] text-white text-sm rounded-lg px-8 py-2 shadow-2xl border border-white/10 whitespace-nowrap">
                            <p className="text-[11px] text-center">{tooltip.label}</p>
                            <p className="text-sm font-semibold text-center">{formatVal(tooltip.value)}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Leyenda simple */}
            {legendLabel && (
                <div className="flex justify-center items-center gap-2 mt-4 px-2">
                    <div className="flex items-center gap-1.5">
                        <div
                            className="w-3 h-1 rounded-sm"
                            style={{ backgroundColor: lineColor }}
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

export default PureLineChart