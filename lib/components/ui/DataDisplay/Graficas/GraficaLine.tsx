'use client'
import React, { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface DataPoint { label: string; value: number }
interface PureLineChartProps {
    className?: string
    data: DataPoint[]
    title?: string
    description?: string
    height?: number
    lineColor?: string
    showArea?: boolean
    legendLabel?: string
    yLabel?: string
}

export const PureLineChart = ({
    className, data, title, description, height = 240,
    lineColor = 'var(--accent)', showArea = true,
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
    const gradientId = `area-grad-${lineColor.replace(/[^a-zA-Z0-9]/g, '')}`

    const formatVal = (n: number) => {
        if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
        if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
        return Number.isInteger(n) ? n.toString() : n.toFixed(1)
    }

    return (
        <div
            ref={containerRef}
            className={cn("relative rounded-md border border-border shadow-xs p-5 select-none", className)}
            onMouseLeave={() => { setHoveredIndex(null); setTooltip(null) }}
        >
            {title && <p className="text-sm font-semibold text-text-primary">{title}</p>}
            {description && <p className="text-xs text-text-muted mt-0.5 mb-2">{description}</p>}

            <div className="w-full overflow-x-auto relative scrollbar-none">
                <svg width="100%" viewBox={`0 0 ${svgW} ${height}`} className="overflow-visible">
                    {yLabel && (
                        <text x={10} y={padding.top - 8} fill="var(--text-muted)" fontSize={10} fontWeight={600}>
                            {yLabel}
                        </text>
                    )}
                    <defs>
                        {showArea && (
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={lineColor} stopOpacity={0.25} />
                                <stop offset="100%" stopColor={lineColor} stopOpacity={0.00} />
                            </linearGradient>
                        )}
                    </defs>

                    <g transform={`translate(${padding.left}, ${padding.top + 15})`}>
                        {/* Grid */}
                        {yTicks.map(tick => {
                            const y = scaleY(tick)
                            return (
                                <g key={tick}>
                                    <line x1={0} y1={y} x2={chartW} y2={y} stroke="var(--border-default)" strokeDasharray="4 3" strokeWidth={0.5} />
                                    <text x={-10} y={y + 4} textAnchor="end" fill="var(--text-muted)" fontSize={10}>
                                        {formatVal(Math.round(tick))}
                                    </text>
                                </g>
                            )
                        })}

                        {/* Área bajo la curva */}
                        {showArea && <path d={areaPath} fill={`url(#${gradientId})`} />}

                        {/* Línea Principal */}
                        <path d={smoothLine} fill="none" stroke={lineColor} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

                        {/* Indicador Vertical interactivo */}
                        {hoveredIndex !== null && (
                            <>
                                <line x1={scaleX(hoveredIndex)} y1={0} x2={scaleX(hoveredIndex)} y2={chartH}
                                    stroke={lineColor} strokeWidth={1} strokeDasharray="4 3" className="opacity-40" />
                                <circle cx={scaleX(hoveredIndex)} cy={scaleY(data[hoveredIndex].value)} r={6} fill={lineColor} className="opacity-20" />
                            </>
                        )}

                        {/* Nodos de la línea */}
                        {data.map((d, i) => {
                            const cx = scaleX(i), cy = scaleY(d.value)
                            const isHov = hoveredIndex === i
                            return (
                                <circle key={i} cx={cx} cy={cy} r={isHov ? 5 : 3}
                                    fill="var(--bg-surface)" stroke={lineColor} strokeWidth={2} className="transition-all duration-150" />
                            )
                        })}

                        {/* Textos del Eje X */}
                        {data.map((d, i) => (
                            <text key={i} x={scaleX(i)} y={chartH + 20} textAnchor="middle"
                                fill={hoveredIndex === i ? "var(--text-primary)" : "var(--text-muted)"} fontSize={11}
                                fontWeight={hoveredIndex === i ? 600 : 400} className="transition-colors duration-150"
                            >
                                {d.label}
                            </text>
                        ))}

                        {/* Hotspot Gigante para capturar el mouse de forma suave */}
                        <rect x={0} y={0} width={chartW} height={chartH} fill="transparent" className="cursor-crosshair"
                            onMouseMove={(e) => {
                                const containerRect = containerRef.current?.getBoundingClientRect()
                                const svgEl = (e.currentTarget as Element).closest('svg')
                                const svgRect = svgEl?.getBoundingClientRect()
                                if (!containerRect || !svgRect) return

                                // Calculamos en qué índice de datos está parado el mouse proporcionalmente
                                const svgLeftPadding = padding.left * (svgRect.width / svgW)
                                const activeChartWidth = chartW * (svgRect.width / svgW)
                                const mouseXOnChart = e.clientX - svgRect.left - svgLeftPadding
                                
                                const idx = Math.max(0, Math.min(data.length - 1,
                                    Math.round((mouseXOnChart / activeChartWidth) * (data.length - 1))
                                ))

                                setHoveredIndex(idx)
                                setTooltip({
                                    x: e.clientX - containerRect.left,
                                    y: e.clientY - containerRect.top - 16,
                                    label: data[idx].label,
                                    value: data[idx].value
                                })
                            }}
                        />
                        <line x1={0} y1={chartH} x2={chartW} y2={chartH} stroke="var(--border-strong)" />
                    </g>
                </svg>

                {/* Tooltip */}
                {tooltip && (
                    <div
                        className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-full transition-all duration-75"
                        style={{ left: tooltip.x, top: tooltip.y }}
                    >
                        <div className="bg-primary text-background text-xs rounded-lg px-3 py-1.5 shadow-md border border-border/10 text-center">
                            <p className="opacity-80 text-[10px] uppercase tracking-wider">{tooltip.label}</p>
                            <p className="text-sm font-bold mt-0.5">{formatVal(tooltip.value)}</p>
                        </div>
                    </div>
                )}
            </div>

            {legendLabel && (
                <div className="flex justify-center items-center gap-2 mt-3">
                    <div className="w-4 h-0.5 rounded-sm" style={{ backgroundColor: lineColor }} />
                    <span className="text-xs text-text-secondary font-medium">{legendLabel}</span>
                </div>
            )}
        </div>
    )
}

export default PureLineChart