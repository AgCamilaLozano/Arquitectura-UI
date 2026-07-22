'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { cn } from '@/src/utils/utils';

/* ==========================================================================
   TIPOS E INTERFACES (MULTI DONUT CHART)
   ========================================================================== */

export interface ChartSegment {
  value: number;
  label: string;
  /** Permite sobreescribir opcionalmente el token de color HSL del segmento */
  color?: string;
}

export interface MultiDonutChartProps {
  data: ChartSegment[];
  title?: string;
  description?: string;
  size?: number;
  strokeWidth?: number;
  loading?: boolean;
  showTotal?: boolean;
  totalValue?: number;
  formatValue?: (value: number) => string;
  className?: string;
}

/* ==========================================================================
   GENERADOR MULTITENANT DE COLORES HSL
   ========================================================================== */

const DEFAULT_CHART_TOKENS = [
  'hsl(var(--accent))',
  'hsl(var(--tenant-hue) var(--tenant-saturation) 45%)',
  'hsl(var(--tenant-hue) var(--tenant-saturation) 35%)',
  'hsl(var(--tenant-hue) var(--tenant-saturation) 68%)',
  'hsl(var(--tenant-hue) var(--tenant-saturation) 78%)',
];

/* ==========================================================================
   COMPONENTE PRINCIPAL
   ========================================================================== */

export const GraficaDonut = ({
  data = [],
  title,
  description,
  size = 280,
  strokeWidth = 36,
  loading = false,
  showTotal = true,
  totalValue,
  formatValue = (v) => `${v}%`,
  className,
}: MultiDonutChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = useMemo(() => {
    if (typeof totalValue === 'number') return totalValue;
    return data.reduce((acc, item) => acc + item.value, 0);
  }, [data, totalValue]);

  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  // Cálculo optimizado de segmentos SVG
  const segmentMeta = useMemo(() => {
    let accumulated = 0;
    return data.map((segment, i) => {
      const percentage = total > 0 ? segment.value / total : 0;
      const strokeDash = percentage * circumference;
      const offset = accumulated;
      accumulated += strokeDash;

      const sliceAngle = percentage * 360;
      const startAngle = (offset / circumference) * 360;
      const midAngleDeg = startAngle + sliceAngle / 2 - 90;
      const midAngleRad = (midAngleDeg * Math.PI) / 180;

      const tooltipRadius = radius + strokeWidth / 2 + 12;
      const tx = center + tooltipRadius * Math.cos(midAngleRad);
      const ty = center + tooltipRadius * Math.sin(midAngleRad);

      return {
        ...segment,
        color: segment.color || DEFAULT_CHART_TOKENS[i % DEFAULT_CHART_TOKENS.length],
        strokeDash,
        offset,
        index: i,
        tx,
        ty,
      };
    });
  }, [data, total, circumference, radius, strokeWidth, center]);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  /* ── ESTADO SKELETON LOADING ── */
  if (loading) {
    return (
      <div className={cn("p-6 rounded-sm bg-background border border-border animate-pulse font-sans", className)}>
        <div className="h-4 w-32 bg-surface rounded-xs mb-4" />
        <div className="size-44 bg-surface rounded-full mx-auto" />
      </div>
    );
  }

  /* ── ESTADO EMPTY STATE ── */
  if (!data.length) {
    return (
      <div className={cn("p-6 rounded-sm bg-surface/50 border border-border text-center font-sans", className)}>
        <p className="text-body-dense text-text-secondary">
          No hay datos disponibles para mostrar.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-sm font-sans text-text-primary", className)}>
      {/* ── CABECERA ── */}
      {(title || description) && (
        <div className="mb-4 flex flex-col gap-0.5">
          {title && (
            <h3 className="font-heading text-body-base font-semibold tracking-tight text-text-primary">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-caption text-text-secondary">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-6">
        {/* ── CONTENEDOR DEL DONUT SVG ── */}
        <div style={{ width: size, height: size }} className="relative mx-auto select-none">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            role="graphics-document"
            aria-label={title || "Gráfica de Dona"}
            className="w-full h-full -rotate-90 overflow-visible"
          >
            {/* Pista Base (Track Neutral) */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="hsl(var(--surface))"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* Segments SVG */}
            {segmentMeta.map((seg) => {
              const isHov = hoveredIndex === seg.index;

              return (
                <g
                  key={`donut-seg-${seg.index}`}
                  tabIndex={0}
                  role="graphics-symbol"
                  aria-label={`${seg.label}: ${formatValue(seg.value)}`}
                  onFocus={() => handleMouseEnter(seg.index)}
                  onBlur={handleMouseLeave}
                  className="outline-none focus-visible:ring-2 focus-visible:ring-border-strong"
                >
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={seg.color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={`${seg.strokeDash} ${circumference}`}
                    strokeDashoffset={-seg.offset}
                    onMouseEnter={() => handleMouseEnter(seg.index)}
                    onMouseLeave={handleMouseLeave}
                    className="transition-all duration-200 cursor-pointer"
                    style={{
                      pointerEvents: 'stroke',
                      opacity: hoveredIndex !== null && !isHov ? 0.6 : 1,
                      transform: isHov ? 'scale(1.01)' : 'scale(1)',
                      transformOrigin: 'center',
                      filter: isHov
                        ? `drop-shadow(0 4px 10px ${seg.color.replace(')', ', 0.35)')})`
                        : 'none',
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* ── TOOLTIP CONTRATO MULTITENANT ── */}
          {hoveredIndex !== null && (
            <div
              className="absolute pointer-events-none z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-150"
              style={{
                left: segmentMeta[hoveredIndex].tx,
                top: segmentMeta[hoveredIndex].ty,
              }}
            >
              <div className="flex flex-col items-center justify-center rounded-sm border border-border bg-primary dark:bg-surface px-3 py-1.5 shadow-card">
                <span className="font-sans text-[10px] font-medium uppercase tracking-wider text-accent-foreground/80">
                  {segmentMeta[hoveredIndex].label}
                </span>
                <span className="font-sans text-body-dense font-bold text-accent-foreground">
                  {formatValue(segmentMeta[hoveredIndex].value)}
                </span>
              </div>
            </div>
          )}

          {/* ── CONTENIDO CENTRAL (TOTAL) ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            {showTotal && (
              <>
                <span className="text-caption font-medium uppercase tracking-wider text-text-secondary">
                  Total
                </span>
                <span className="font-heading text-heading-lg font-bold text-accent tracking-tight">
                  {formatValue(total)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* ── LEYENDAS INFERIORES ── */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 pt-2 border-t border-border/50 w-full">
          {segmentMeta.map((item, i) => {
            const isActive = hoveredIndex === i;

            return (
              <div
                key={`legend-${i}`}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                className={cn(
                  "flex items-center gap-2 text-sm cursor-pointer transition-all duration-150",
                  isActive ? "opacity-100 scale-105 font-medium" : "opacity-80"
                )}
              >
                <div
                  className="size-2.5 rounded-full shrink-0 transition-transform duration-150"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: isActive ? `0 0 8px ${item.color}` : 'none',
                  }}
                  aria-hidden="true"
                />
                <span className="text-text-primary text-sm">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GraficaDonut;