'use client';

import React, { useState, useRef, useId, useCallback, useMemo } from 'react';
import { cn } from '@/src/utils/utils';

/* ==========================================================================
   TIPOS E INTERFACES (PURE LINE CHART)
   ========================================================================== */

export interface DataPoint {
  label: string;
  value: number;
}

export interface PureLineChartProps {
  className?: string;
  data: DataPoint[];
  title?: string;
  description?: string;
  height?: number;
  lineColor?: string;
  showArea?: boolean;
  legendLabel?: string;
  yLabel?: string;
}

/* ==========================================================================
   COMPONENTE PRINCIPAL
   ========================================================================== */

export const PureLineChart = ({
  className,
  data = [],
  title,
  description,
  height = 240,
  lineColor = 'hsl(var(--accent))',
  showArea = true,
  legendLabel,
  yLabel,
}: PureLineChartProps) => {
  const chartUniqueId = useId();
  const gradientId = `line-area-grad-${chartUniqueId.replace(/:/g, '')}`;
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    label: string;
    value: number;
  } | null>(null);

  // Cálculos de Escala y Geometría
  const maxValue = useMemo(() => {
    const max = Math.max(...data.map((d) => d.value), 1);
    return max * 1.15;
  }, [data]);

  const padding = { top: 20, bottom: 36, left: 52, right: 24 };
  const svgW = Math.max(data.length * 80 + padding.left + padding.right, 360);
  const chartW = svgW - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const scaleX = useCallback(
    (i: number) => (i / Math.max(data.length - 1, 1)) * chartW,
    [data.length, chartW]
  );

  const scaleY = useCallback(
    (v: number) => chartH - (v / maxValue) * chartH,
    [chartH, maxValue]
  );

  // Construcción de Curva Bezier Suave
  const smoothLine = useMemo(() => {
    if (data.length < 2) return '';
    let path = `M${scaleX(0)},${scaleY(data[0].value)}`;
    for (let i = 0; i < data.length - 1; i++) {
      const x0 = scaleX(i);
      const y0 = scaleY(data[i].value);
      const x1 = scaleX(i + 1);
      const y1 = scaleY(data[i + 1].value);
      const cpx = (x0 + x1) / 2;
      path += ` C${cpx},${y0} ${cpx},${y1} ${x1},${y1}`;
    }
    return path;
  }, [data, scaleX, scaleY]);

  const areaPath = useMemo(() => {
    if (!smoothLine || data.length === 0) return '';
    return `${smoothLine} L${scaleX(data.length - 1)},${chartH} L${scaleX(0)},${chartH} Z`;
  }, [smoothLine, data.length, scaleX, chartH]);

  const yTicks = useMemo(
    () => Array.from({ length: 5 }, (_, i) => Math.round((maxValue / 4) * i)),
    [maxValue]
  );

  const formatVal = useCallback((n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return Number.isInteger(n) ? n.toString() : n.toFixed(1);
  }, []);

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setTooltip(null);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex flex-col w-full font-sans select-none text-text-primary',
        className
      )}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── CABECERA ── */}
      {(title || description) && (
        <div className="mb-3 flex flex-col gap-0.5">
          {title && (
            <h3 className="font-heading text-body-base font-semibold tracking-tight text-text-primary">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-caption text-text-secondary">{description}</p>
          )}
        </div>
      )}

      {/* ── CONTENEDOR SVG ── */}
      <div className="relative w-full overflow-x-auto scrollbar-none">
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${svgW} ${height}`}
          role="graphics-document"
          aria-label={title || 'Gráfico de línea'}
          className="overflow-visible"
        >
          {/* Etiqueta Eje Y */}
          {yLabel && (
            <text
              x={10}
              y={padding.top - 8}
              fill="hsl(var(--text-secondary))"
              className="font-sans text-[10px] font-semibold uppercase tracking-wider"
            >
              {yLabel}
            </text>
          )}

          <defs>
            {showArea && (
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lineColor} stopOpacity={0.25} />
                <stop offset="100%" stopColor={lineColor} stopOpacity={0.0} />
              </linearGradient>
            )}
          </defs>

          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {/* Grid Horizontal y Escala Y */}
            {yTicks.map((tick) => {
              const y = scaleY(tick);
              return (
                <g key={`y-tick-${tick}`}>
                  <line
                    x1={0}
                    y1={y}
                    x2={chartW}
                    y2={y}
                    stroke="hsl(var(--border-default))"
                    strokeDasharray="4 3"
                    strokeWidth={1}
                    className="opacity-70"
                  />
                  <text
                    x={-10}
                    y={y + 3}
                    textAnchor="end"
                    fill="hsl(var(--text-secondary))"
                    className="font-sans text-[10px]"
                  >
                    {formatVal(Math.round(tick))}
                  </text>
                </g>
              );
            })}

            {/* Área Sombreada */}
            {showArea && areaPath && (
              <path d={areaPath} fill={`url(#${gradientId})`} />
            )}

            {/* Trazo Principal de la Línea */}
            {smoothLine && (
              <path
                d={smoothLine}
                fill="none"
                stroke={lineColor}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Indicador Vertical en Hover */}
            {hoveredIndex !== null && (
              <>
                <line
                  x1={scaleX(hoveredIndex)}
                  y1={0}
                  x2={scaleX(hoveredIndex)}
                  y2={chartH}
                  stroke={lineColor}
                  strokeWidth={1}
                  strokeDasharray="4 3"
                  className="opacity-50"
                />
                <circle
                  cx={scaleX(hoveredIndex)}
                  cy={scaleY(data[hoveredIndex].value)}
                  r={6}
                  fill={lineColor}
                  className="opacity-20"
                />
              </>
            )}

            {/* Nodos Interactivos */}
            {data.map((d, i) => {
              const cx = scaleX(i);
              const cy = scaleY(d.value);
              const isHov = hoveredIndex === i;

              return (
                <circle
                  key={`node-${i}`}
                  cx={cx}
                  cy={cy}
                  r={isHov ? 5 : 3}
                  fill="hsl(var(--surface))"
                  stroke={lineColor}
                  strokeWidth={2}
                  className="transition-all duration-150"
                />
              );
            })}

            {/* Etiquetas del Eje X */}
            {data.map((d, i) => (
              <text
                key={`x-label-${i}`}
                x={scaleX(i)}
                y={chartH + 20}
                textAnchor="middle"
                fill={
                  hoveredIndex === i
                    ? 'hsl(var(--text-primary))'
                    : 'hsl(var(--text-secondary))'
                }
                className={cn(
                  'font-sans text-[11px] transition-colors duration-150',
                  hoveredIndex === i ? 'font-semibold' : 'font-normal'
                )}
              >
                {d.label}
              </text>
            ))}

            {/* Hotspot de Captura de Eventos */}
            <rect
              x={0}
              y={0}
              width={chartW}
              height={chartH}
              fill="transparent"
              className="cursor-crosshair"
              onMouseMove={(e) => {
                const containerRect = containerRef.current?.getBoundingClientRect();
                const svgEl = (e.currentTarget as Element).closest('svg');
                const svgRect = svgEl?.getBoundingClientRect();
                if (!containerRect || !svgRect || data.length === 0) return;

                const svgLeftPadding = padding.left * (svgRect.width / svgW);
                const activeChartWidth = chartW * (svgRect.width / svgW);
                const mouseXOnChart = e.clientX - svgRect.left - svgLeftPadding;

                const idx = Math.max(
                  0,
                  Math.min(
                    data.length - 1,
                    Math.round((mouseXOnChart / activeChartWidth) * (data.length - 1))
                  )
                );

                setHoveredIndex(idx);
                setTooltip({
                  x: e.clientX - containerRect.left,
                  y: e.clientY - containerRect.top - 12,
                  label: data[idx].label,
                  value: data[idx].value,
                });
              }}
            />

            {/* Línea Base Eje X */}
            <line
              x1={0}
              y1={chartH}
              x2={chartW}
              y2={chartH}
              stroke="hsl(var(--border-default))"
              strokeWidth={1.5}
            />
          </g>
        </svg>

        {/* ── TOOLTIP FLOTANTE MULTITENANT ── */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full transition-all duration-75"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <div className="flex flex-col items-center justify-center rounded-sm border border-border bg-primary dark:bg-surface px-3 py-1.5 shadow-card">
              <span className="font-sans text-[10px] font-medium uppercase tracking-wider text-accent-foreground/80">
                {tooltip.label}
              </span>
              <span className="font-sans text-body-dense font-bold text-accent-foreground">
                {formatVal(tooltip.value)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── LEYENDA INFERIOR ── */}
      {legendLabel && (
        <div className="mt-3 flex items-center justify-center gap-2 border-t border-border/50 pt-2 font-sans text-caption text-text-secondary">
          <div
            className="h-0.5 w-4 rounded-xs"
            style={{ backgroundColor: lineColor }}
            aria-hidden="true"
          />
          <span className="font-medium">{legendLabel}</span>
        </div>
      )}
    </div>
  );
};

export default PureLineChart;