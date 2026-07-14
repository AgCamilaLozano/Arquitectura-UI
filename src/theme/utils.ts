/**
 * Utilidades de tipado y formateo dinámico de HSL para el ERP AGUSTIN
 */

/**
 * Convierte un string de canales HSL ("H S L") a un formato válido de inline styles para React
 * Útil para inyectar marcas personalizadas en componentes que requieren estilos directos del inline CSS.
 */
export function formatHSLToStyle(hslString: string): string {
  if (!hslString) return "";
  // Si ya tiene la función hsl() envuelta, la retorna limpia, de lo contrario la envuelve
  return hslString.includes("hsl") ? hslString : `hsl(${hslString})`;
}

/**
 * Recibe un color base en HSL crudo (ej: "265 65% 52%") y genera dinámicamente
 * el objeto CSS de variables personalizadas para un Tenant específico.
 * * Permite cambiar el branding de un componente específico in-situ si se requiere.
 */
export function getTenantThemeStyles(hue: number, saturation: string) {
  return {
    "--accent": `${hue} ${saturation} 58%`,
    "--accent-hover": `${hue} ${saturation} 58% / 0.33`,
    "--accent-soft": `${hue} ${saturation} 58% / 0.12`,
    "--border-strong": `${hue} ${saturation} 74%`,
  } as React.CSSProperties;
}