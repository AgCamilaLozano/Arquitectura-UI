'use client'
import React, { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface BarSegment {
    label: string
    value: number
}

interface PureBarChartProps {
    className?: string
    data: BarSegment[]
    title?: string
    description?: string
    height?: number
    barRadius?: number
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

export const GraficaBar = ({
    className,
    data,
    title,
    description,
    height = 240,
    barRadius = 4,
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

    const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; value: number } | null>(null)

    return (
        <div 
            ref={containerRef} 
            className={cn("relative rounded-md border border-border  shadow-xs p-2 select-none", className)}
            onMouseLeave={() => {
                setHoveredIndex(null)
                setTooltip(null)
            }}
        >
            {title && <p className="text-sm font-semibold text-text-primary">{title}</p>}
            {description && <p className="text-xs text-text-muted mt-0.5 mb-2">{description}</p>}

            <div className="w-full relative overflow-hidden">
                <svg width="100%" viewBox={`0 0 ${svgW} ${height}`} className="relative z-0 overflow-visible">
                    {yLabel && (
                        <text x={10} y={padding.top - 5} fill="var(--text-muted)" fontSize={10} fontWeight={600}>
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
                                        stroke="var(--border-default)" strokeDasharray="4 3" strokeWidth={0.5} />
                                    <text x={-10} y={y + 4} textAnchor="end" fill="var(--text-muted)" fontSize={10}>
                                        {formatVal(tick)}
                                    </text>
                                </g>
                            )
                        })}

                        {/* Barras */}
                        {data.map((item, i) => {
                            const barH = (item.value / ceilMax) * chartH
                            const x = i * 72 + 16
                            const isHov = hoveredIndex === i

                            return (
                                <g key={`bar-${item.label}-${i}`}>
                                    {/* Zona interactiva invisible agrandada */}
                                    <rect
                                        x={x - 10} y={0} width={48} height={chartH}
                                        fill="transparent" className="cursor-pointer"
                                        onMouseEnter={(e) => {
                                            setHoveredIndex(i)
                                            const containerRect = containerRef.current?.getBoundingClientRect()
                                            if (!containerRect) return
                                            
                                            // CORREGIDO: Coordenadas relativas al contenedor exactas
                                            const xCenter = e.clientX - containerRect.left
                                            const yTop = e.clientY - containerRect.top - 20
                                            setTooltip({ x: xCenter, y: yTop, label: item.label, value: item.value })
                                        }}
                                        onMouseMove={(e) => {
                                            const containerRect = containerRef.current?.getBoundingClientRect()
                                            if (!containerRect) return
                                            setTooltip(prev => prev ? { ...prev, x: e.clientX - containerRect.left, y: e.clientY - containerRect.top - 20 } : null)
                                        }}
                                    />

                                    {/* Highlight de fondo */}
                                    {isHov && (
                                        <rect x={x - 6} y={0} width={42} height={chartH} rx={6}
                                            fill={chartColors[i % chartColors.length]} opacity={0.06} />
                                    )}

                                    {/* Barra Real */}
                                    <rect
                                        x={x} y={chartH - barH} width={30} height={barH} rx={barRadius}
                                        fill={chartColors[i % chartColors.length]}
                                        opacity={isHov ? 1 : 0.85}
                                        className="transition-all duration-200 ease-out pointer-events-none"
                                        style={{
                                            transformOrigin: `0px ${chartH}px`,
                                            filter: isHov ? `drop-shadow(0 4px 12px ${chartColors[i % chartColors.length]}40)` : 'none'
                                        }}
                                    />

                                    {/* Texto Eje X */}
                                    <text x={x + 15} y={chartH + 20} textAnchor="middle"
                                        fill={isHov ? "var(--text-primary)" : "var(--text-muted)"}
                                        fontSize={11} fontWeight={isHov ? 600 : 400} className="transition-colors duration-150"
                                    >
                                        {item.label}
                                    </text>
                                </g>
                            )
                        })}

                        <line x1={0} y1={chartH} x2={svgW - padding.left - padding.right} y2={chartH} stroke="var(--border-strong)" />
                    </g>
                </svg>

                {/* Tooltip unificado con tus variables globales */}
                {tooltip && (
                    <div
                        className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-full transition-all duration-75"
                        style={{ left: tooltip.x, top: tooltip.y }}
                    >
                        <div className="bg-primary text-background text-xs rounded-lg px-3 py-2 shadow-xl border border-border/10 whitespace-nowrap text-center">
                            <p className="opacity-80 text-[10px] uppercase tracking-wider">{tooltip.label}</p>
                            <p className="text-sm font-bold mt-0.5">{formatVal(tooltip.value)}</p>
                        </div>
                    </div>
                )}
            </div>

            {legendLabel && (
                <div className="flex justify-center items-center gap-2 mt-4">
                    <div className="w-3 h-3 rounded-xs" style={{ backgroundColor: chartColors[0] }} />
                    <span className="text-xs text-text-secondary font-medium">{legendLabel}</span>
                </div>
            )}
        </div>
    )
}

export default GraficaBar