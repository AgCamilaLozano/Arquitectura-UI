'use client';

import React, { useState, useRef, useId, useCallback } from 'react';
import { cn } from '@/src/utils/utils';

/* ==========================================================================
   TIPOS E INTERFACES (PURE BAR CHART)
   ========================================================================== */

export interface BarSegment {
  label: string;
  value: number;
  /** Permite sobreescribir opcionalmente el token de color del segmento (ej: "var(--chart-1)") */
  colorToken?: string;
}

export interface PureBarChartProps {
  className?: string;
  data: BarSegment[];
  title?: string;
  description?: string;
  height?: number;
  barRadius?: number;
  legendLabel?: string;
  yLabel?: string;
}

/* ==========================================================================
   CONSTANTES DE COLOR ALINEADAS A DESIGN TOKENS
   ========================================================================== */

const DEFAULT_CHART_TOKENS = [
  'hsl(var(--accent))',
  'hsl(var(--tenant-hue) var(--tenant-saturation) 48%)',
  'hsl(var(--tenant-hue) var(--tenant-saturation) 38%)',
  'hsl(var(--tenant-hue) var(--tenant-saturation) 68%)',
  'hsl(var(--tenant-hue) var(--tenant-saturation) 78%)',
];

export const GraficaBar = ({
  className,
  data = [],
  title,
  description,
  height = 240,
  barRadius = 4,
  legendLabel,
  yLabel,
}: PureBarChartProps) => {
  const chartId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    label: string;
    value: number;
  } | null>(null);

  // Cálculos matemáticos del mapa de barras
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const ceilMax = Math.ceil(maxValue * 1.15);
  const padding = { top: 20, bottom: 36, left: 52, right: 16 };
  const svgW = Math.max(data.length * 72 + padding.left + padding.right, 320);
  const chartH = height - padding.top - padding.bottom;

  const yTicks = Array.from({ length: 5 }, (_, i) => Math.round((ceilMax / 4) * i));

  const formatVal = useCallback((n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toLocaleString('es-CO');
  }, []);

  const handleBarHover = (
    e: React.MouseEvent<SVGRectElement> | React.FocusEvent<SVGGElement>,
    index: number,
    item: BarSegment
  ) => {
    setHoveredIndex(index);
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const isMouseEvent = 'clientX' in e && 'clientY' in e;
    const xCenter = isMouseEvent
      ? e.clientX - containerRect.left
      : containerRect.width / 2;
    const yTop = isMouseEvent
      ? e.clientY - containerRect.top - 12
      : 12;

    setTooltip({ x: xCenter, y: yTop, label: item.label, value: item.value });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setTooltip(null);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex flex-col w-full font-sans select-none',
        className
      )}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── CABECERA DEL GRÁFICO ── */}
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

      {/* ── ÁREA DE CONTENIDO SVG ── */}
      <div className="relative w-full">
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${svgW} ${height}`}
          role="graphics-document"
          aria-label={title || 'Gráfico de barras'}
          className="relative z-0 overflow-visible"
        >
          {/* Etiqueta Eje Y */}
          {yLabel && (
            <text
              x={10}
              y={padding.top - 6}
              fill="hsl(var(--text-secondary))"
              className="font-sans text-[10px] font-semibold uppercase tracking-wider"
            >
              {yLabel}
            </text>
          )}

          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {/* Grid Horizontal y Escala Y */}
            {yTicks.map((tick) => {
              const y = chartH - (tick / ceilMax) * chartH;
              return (
                <g key={`tick-${tick}`}>
                  <line
                    x1={0}
                    y1={y}
                    x2={svgW - padding.left - padding.right}
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
                    {formatVal(tick)}
                  </text>
                </g>
              );
            })}

            {/* Malla de Barras e Interactividad */}
            {data.map((item, i) => {
              const barH = (item.value / ceilMax) * chartH;
              const x = i * 72 + 16;
              const isHov = hoveredIndex === i;
              const barColor =
                item.colorToken || DEFAULT_CHART_TOKENS[i % DEFAULT_CHART_TOKENS.length];

              return (
                <g
                  key={`bar-group-${item.label}-${i}`}
                  tabIndex={0}
                  role="graphics-symbol"
                  aria-label={`${item.label}: ${item.value}`}
                  onFocus={(e) => handleBarHover(e, i, item)}
                  onBlur={handleMouseLeave}
                  className="outline-none focus-visible:ring-1 focus-visible:ring-border-strong"
                >
                  {/* Hit-box invisible expandido para fácil interacción */}
                  <rect
                    x={x - 10}
                    y={0}
                    width={50}
                    height={chartH}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={(e) => handleBarHover(e, i, item)}
                    onMouseMove={(e) => {
                      const containerRect = containerRef.current?.getBoundingClientRect();
                      if (!containerRect) return;
                      setTooltip((prev) =>
                        prev
                          ? {
                              ...prev,
                              x: e.clientX - containerRect.left,
                              y: e.clientY - containerRect.top - 12,
                            }
                          : null
                      );
                    }}
                  />

                  {/* Sombra de resaltado en estado Hover */}
                  {isHov && (
                    <rect
                      x={x - 6}
                      y={0}
                      width={42}
                      height={chartH}
                      rx={6}
                      fill={barColor}
                      opacity={0.08}
                      className="transition-opacity duration-150"
                    />
                  )}

                  {/* Renderizado de la Barra principal */}
                  <rect
                    x={x}
                    y={chartH - barH}
                    width={30}
                    height={Math.max(barH, 2)}
                    rx={barRadius}
                    fill={barColor}
                    opacity={isHov ? 1 : 0.88}
                    className="pointer-events-none transition-all duration-200 ease-out"
                    style={{
                      filter: isHov
                        ? `drop-shadow(0 4px 10px ${barColor.replace(')', ', 0.35)')})`
                        : 'none',
                    }}
                  />

                  {/* Etiqueta del Eje X */}
                  <text
                    x={x + 15}
                    y={chartH + 20}
                    textAnchor="middle"
                    fill={isHov ? 'hsl(var(--text-primary))' : 'hsl(var(--text-secondary))'}
                    className={cn(
                      'font-sans text-[11px] transition-colors duration-150',
                      isHov ? 'font-semibold' : 'font-normal'
                    )}
                  >
                    {item.label}
                  </text>
                </g>
              );
            })}

            {/* Línea Base del Eje X */}
            <line
              x1={0}
              y1={chartH}
              x2={svgW - padding.left - padding.right}
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
            <div className="flex flex-col items-center justify-center rounded-sm bg-primary dark:bg-surface px-3 py-1.5 shadow-cards">
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
          <span
            className="size-2.5 rounded-xs"
            style={{ backgroundColor: DEFAULT_CHART_TOKENS[0] }}
            aria-hidden="true"
          />
          <span className="font-medium">{legendLabel}</span>
        </div>
      )}
    </div>
  );
};

export default GraficaBar;