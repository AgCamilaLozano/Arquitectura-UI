'use client'
import React, { useState } from 'react'
import { Tooltip } from '@/lib/components/ui/Compuesto/Tooltip'

// ─── Tipos ─────────────────────────────────────
interface ChartSegment {
    value: number
    label: string
    color?: string
}

interface MultiDonutChartProps {
    data: ChartSegment[]
    title?: string
    description?: string
    size?: number
    strokeWidth?: number
    loading?: boolean
    showTotal?: boolean
    totalValue?: number
    formatValue?: (value: number) => string
}

// ─── Colores dinámicos ─────────────────────────
const chartColors = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
]

// ─── Componente ───────────────────────────────
const GraficaDonut = ({
    data,
    title,
    description,
    size = 300,
    strokeWidth = 40,
    loading = false,
    showTotal = true,
    totalValue,
    formatValue = (v) => `${v}%`,
}: MultiDonutChartProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const total = data.reduce((acc, item) => acc + item.value, 0)



    const center = size / 2
    const radius = center - strokeWidth
    const circumference = 2 * Math.PI * radius

    let accumulated = 0

    const segmentMeta = data.map((segment, i) => {
        const percentage = segment.value / total
        const strokeDash = percentage * circumference
        const offset = accumulated
        accumulated += strokeDash

        return {
            ...segment,
            color: chartColors[i % chartColors.length],
            strokeDash,
            offset,
            index: i,
        }
    })

    if (loading) {
        return (
            <div className="p-6 rounded-2xl bg-background border border-border animate-pulse">
                <div className="h-4 w-32 bg-muted rounded mb-4" />
                <div className="h-[180px] w-[180px] bg-muted rounded-full mx-auto" />
            </div>
        )
    }

    if (!data.length) {
        return (
            <div className="p-6 rounded-2xl bg-surface border border-border text-center">
                <p className="text-sm text-text-muted">
                    No hay datos disponibles
                </p>
            </div>
        )
    }

    return (
        <div className="rounded-2xl bg-background border border-border shadow-md p-6">
            {/* Header */}
            {(title || description) && (
                <div className="mb-4">
                    {title && (
                        <p className="text-sm font-semibold text-text-primary">
                            {title}
                        </p>
                    )}
                    {description && (
                        <p className="text-xs text-text-muted mt-1">
                            {description}
                        </p>
                    )}
                </div>
            )}

            <div className="flex flex-col items-center gap-8 justify-center">
                {/* ───── DONUT ───── */}
                <div style={{ width: size, height: size }} className="relative mx-auto md:mx-0">
                    <svg className="w-full h-full -rotate-90">
                        {/* Track */}
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            stroke="var(--bg-muted)"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                            strokeLinecap="butt"
                        />

                        {/* Segments SVG */}
                        {segmentMeta.map((seg) => {
                            const isHov = hoveredIndex === seg.index

                            // Calcular el ángulo medio del segmento para posicionar el hotspot
                            const sliceAngle = (seg.value / total) * 360
                            const startAngle = (seg.offset / circumference) * 360
                            const midAngleDeg = startAngle + (sliceAngle / 2) - 90
                            const midAngleRad = (midAngleDeg * Math.PI) / 180

                            const tooltipRadius = radius + strokeWidth / 2 + 16
                            const tx = center + tooltipRadius * Math.cos(midAngleRad)
                            const ty = center + tooltipRadius * Math.sin(midAngleRad)

                            return (
                                <g key={seg.index}>
                                    <circle
                                        cx={center}
                                        cy={center}
                                        r={radius}
                                        stroke={seg.color}
                                        strokeWidth={strokeWidth}
                                        fill="transparent"
                                        strokeDasharray={`${seg.strokeDash} ${circumference}`}
                                        strokeDashoffset={-seg.offset}
                                        className="transition-all duration-300 cursor-pointer stroke-linecap-butt"
                                        onMouseEnter={() => setHoveredIndex(seg.index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        style={{
                                            pointerEvents: 'stroke',
                                            filter: hoveredIndex === seg.index
                                                ? 'drop-shadow(0 0 4px rgba(0,0,0,0.5))'
                                                : 'none',
                                            transform: hoveredIndex === seg.index ? 'scale(1.02)' : 'scale(1)',
                                            transformOrigin: 'center',
                                        }}
                                        strokeLinecap="butt"
                                    />

                                </g>
                            )
                        })}
                    </svg>
                    {hoveredIndex !== null && (
                        <div
                            className="absolute pointer-events-none z-10"
                            style={{
                                left: (() => {
                                    const seg = segmentMeta[hoveredIndex]
                                    const sliceAngle = (seg.value / total) * 360
                                    const startAngle = (seg.offset / circumference) * 360
                                    const midAngleDeg = startAngle + sliceAngle / 2 - 90
                                    const rad = (midAngleDeg * Math.PI) / 180

                                    const tooltipRadius = radius + strokeWidth / 2 + 16

                                    return center + tooltipRadius * Math.cos(rad)
                                })(),
                                top: (() => {
                                    const seg = segmentMeta[hoveredIndex]
                                    const sliceAngle = (seg.value / total) * 360
                                    const startAngle = (seg.offset / circumference) * 360
                                    const midAngleDeg = startAngle + sliceAngle / 2 - 90
                                    const rad = (midAngleDeg * Math.PI) / 180

                                    const tooltipRadius = radius + strokeWidth / 2 + 16

                                    return center + tooltipRadius * Math.sin(rad)
                                })(),
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <div className="bg-[#0A0A0B] text-white text-xs rounded-md px-3 py-1 shadow-xl whitespace-nowrap">
                                <p className="font-semibold">
                                    {segmentMeta[hoveredIndex].label}
                                </p>
                                <p className='text-center'>{formatValue(segmentMeta[hoveredIndex].value)}</p>
                            </div>
                        </div>
                    )}
                    {/* Center dynamic content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                        {showTotal ? (
                            <>
                                <span className="text-xs text-text-muted">
                                    Total
                                </span>
                                <span className="text-xl font-bold text-accent">
                                    {formatValue(total)}
                                </span>
                            </>
                        ) : null}
                    </div>
                </div>
                {/* Labels */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
                    {segmentMeta.map((item, i) => {
                        const isActive = hoveredIndex === i

                        return (
                            <div
                                key={i}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`flex items-center gap-2 text-sm transition-all duration-200
                                  ${isActive ? 'opacity-100 scale-100' : 'opacity-80'}
                                `}
                            >
                                {/* Dot */}
                                <div
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{
                                        backgroundColor: item.color,
                                        boxShadow: isActive
                                            ? `0 0 6px ${item.color}`
                                            : 'none',
                                    }}
                                />

                                {/* Label */}
                                <span className="text-text-primary">
                                    {item.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default GraficaDonut