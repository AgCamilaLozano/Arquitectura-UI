import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React$1 from 'react';
import React__default, { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { ToasterProps } from 'sonner';
import { ThemeProviderProps } from 'next-themes';

type Option = {
    value: string;
    label: string;
};
declare function Select({ value, onValueChange, options, searchable, children }: {
    value?: string;
    onValueChange: (v: string) => void;
    options?: Option[];
    searchable?: boolean;
    children: React$1.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function SelectTrigger({ className, children }: {
    className?: string;
    children: React$1.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function SelectValue({ placeholder }: {
    placeholder?: string;
}): react_jsx_runtime.JSX.Element;
declare function SelectContent({ children }: {
    children: React$1.ReactNode;
}): react_jsx_runtime.JSX.Element | null;
declare function SelectItem({ value, children, index }: {
    value: string;
    children: React$1.ReactNode;
    index?: number;
}): react_jsx_runtime.JSX.Element | null;

declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React__default.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
}
declare const Button: React__default.ForwardRefExoticComponent<ButtonProps & React__default.RefAttributes<HTMLButtonElement>>;

declare function Input({ className, type, ...props }: React.ComponentProps<"input">): react_jsx_runtime.JSX.Element;

type TextareaProps = React__default.TextareaHTMLAttributes<HTMLTextAreaElement>;
declare const Textarea: React__default.ForwardRefExoticComponent<TextareaProps & React__default.RefAttributes<HTMLTextAreaElement>>;

/**
 * Propósito: Badge de etiqueta/categoría configurable.
 * Sirve para clasificar, etiquetar o destacar contenido con estilos visuales distintos.
 *
 * Props:
 * - label: texto del badge
 * - variant: estilo visual (filled | soft | outline | accent)
 * - color: color base semántico o de marca (neutral | accent | success | error | warning | info)
 * - size: tamaño del badge (sm | md | lg)
 * - icon: icono React a mostrar a la izquierda (opcional)
 * - onRemove: callback para mostrar botón de eliminar (opcional)
 * - className: clases adicionales
 */
type LabelColor = "neutral" | "accent" | "success" | "error" | "warning" | "info";
type LabelVariant = "filled" | "soft" | "outline";
interface LabelBadgeProps {
    label: string;
    variant?: LabelVariant;
    color?: LabelColor;
    size?: "sm" | "md" | "lg";
    icon?: React.ReactNode;
    onRemove?: () => void;
    className?: string;
}
declare function LabelBadge({ label, variant, color, size, icon, onRemove, className, }: LabelBadgeProps): react_jsx_runtime.JSX.Element;

/**
 * Propósito: Badge de estado semántico con punto de indicador animado opcional.
 * Comunica el estado de una entidad (activo, error, advertencia, info, inactivo).
 *
 * Props:
 * - status: variante semántica del badge
 * - label: texto visible del badge
 * - withDot: muestra el punto indicador (por defecto true)
 * - animated: el punto pulsa con animación (solo cuando withDot=true)
 * - size: tamaño del badge (sm | md)
 * - className: clases adicionales
 */
type StatusVariant = "success" | "error" | "warning" | "info" | "idle";
interface StatusBadgeProps {
    status: StatusVariant;
    label: string;
    withDot?: boolean;
    animated?: boolean;
    size?: "sm" | "md";
    className?: string;
}
declare function StatusBadge({ status, label, withDot, animated, size, className, }: StatusBadgeProps): react_jsx_runtime.JSX.Element;

/**
 * Variantes visuales disponibles para la tarjeta:
 * - default   → superficie blanca con borde sutil
 * - outlined  → borde más marcado, sin sombra
 * - elevated  → sombra prominente, sin borde
 * - accent    → borde izquierdo de color accent
 * - ghost     → sin borde ni sombra, fondo muted
 */
type CardVariant = "default" | "outlined" | "elevated" | "accent" | "ghost";
/**
 * Tamaños de padding interno disponibles
 */
type CardPadding = "none" | "sm" | "md" | "lg";
/**
 * Props del componente Card principal
 */
interface CardProps {
    /** Variante visual de la tarjeta */
    variant?: CardVariant;
    /** Padding interno de la tarjeta */
    padding?: CardPadding;
    /** Hace la tarjeta interactiva (hover + cursor pointer) */
    clickable?: boolean;
    /** Callback al hacer click (activa modo clickable automáticamente) */
    onClick?: () => void;
    /** Ancho completo del contenedor padre */
    fullWidth?: boolean;
    /** Clases adicionales */
    className?: string;
    children: React__default.ReactNode;
}
declare function Card({ variant, padding, clickable, onClick, fullWidth, className, children, }: CardProps): react_jsx_runtime.JSX.Element;
/**
 * Propósito: Sección de encabezado de la tarjeta.
 *
 * Props:
 *  - title        → texto principal del encabezado
 *  - subtitle     → texto secundario debajo del título
 *  - action       → nodo opcional alineado a la derecha (botón, badge, etc.)
 *  - withDivider  → agrega línea separadora debajo
 */
interface CardHeaderProps {
    title: React__default.ReactNode;
    subtitle?: React__default.ReactNode;
    action?: React__default.ReactNode;
    withDivider?: boolean;
    className?: string;
}
declare function CardHeader({ title, subtitle, action, withDivider, className, }: CardHeaderProps): react_jsx_runtime.JSX.Element;
/**
 * Propósito: Área de contenido principal de la tarjeta.
 * Acepta cualquier nodo como children.
 */
interface CardBodyProps {
    className?: string;
    children: React__default.ReactNode;
}
declare function CardBody({ className, children }: CardBodyProps): react_jsx_runtime.JSX.Element;
/**
 * Propósito: Sección de pie de la tarjeta, alineación configurable.
 *
 * Props:
 *  - align      → alineación horizontal del contenido
 *  - withDivider → agrega línea separadora arriba
 */
interface CardFooterProps {
    align?: "left" | "center" | "right" | "between";
    withDivider?: boolean;
    className?: string;
    children: React__default.ReactNode;
}
declare function CardFooter({ align, withDivider, className, children, }: CardFooterProps): react_jsx_runtime.JSX.Element;
/**
 * Propósito: Imagen de cabecera de la tarjeta, diseñada para salir
 * de los márgenes del padding (uso recomendado: Card con padding="none").
 *
 * Props:
 *  - src    → URL de la imagen
 *  - alt    → texto alternativo
 *  - height → altura fija del contenedor de imagen
 */
interface CardImageProps {
    src: string;
    alt: string;
    height?: string;
    className?: string;
}
declare function CardImage({ src, alt, height, className, }: CardImageProps): react_jsx_runtime.JSX.Element;

/**
 * Variantes visuales del dialog:
 * - default     → encabezado neutro, acciones primarias en accent
 * - destructive → indica acción irreversible (eliminar, revocar)
 * - warning     → requiere confirmación con precaución
 * - info        → informativo, sin acción destructiva
 */
type DialogVariant = "default" | "destructive" | "warning" | "info";
/**
 * Tamaños del panel modal
 */
type DialogSize = "sm" | "md" | "lg" | "xl";
interface DialogProps {
    /** Controla visibilidad del dialog */
    open: boolean;
    /** Callback al cerrar (overlay click, tecla Escape o botón ✕) */
    onClose: () => void;
    /** Variante semántica */
    variant?: DialogVariant;
    /** Tamaño del panel */
    size?: DialogSize;
    /** Permite cerrar al hacer clic en el overlay */
    closeOnOverlay?: boolean;
    /** Oculta el botón de cierre (✕) */
    hideCloseButton?: boolean;
    /** Clases adicionales para el panel */
    className?: string;
    children: React__default.ReactNode;
}
declare function Dialog({ open, onClose, variant, size, closeOnOverlay, hideCloseButton, className, children, }: DialogProps): react_jsx_runtime.JSX.Element | null;
interface DialogContextValue {
    variant: DialogVariant;
}
declare const useDialogContext: () => DialogContextValue;
/**
 * Propósito: Encabezado del dialog con ícono opcional y separador.
 *
 * Props:
 * - title      → título principal
 * - description → texto de apoyo debajo del título
 * - icon       → nodo React (ícono) alineado al título
 * - withDivider → línea separadora debajo
 */
interface DialogHeaderProps {
    title: React__default.ReactNode;
    description?: React__default.ReactNode;
    icon?: React__default.ReactNode;
    withDivider?: boolean;
    className?: string;
}
declare function DialogHeader({ title, description, icon, withDivider, className, }: DialogHeaderProps): react_jsx_runtime.JSX.Element;
/**
 * Propósito: Área de contenido principal del dialog.
 * Soporta scroll interno cuando el contenido excede la altura máxima.
 */
interface DialogBodyProps {
    /** Habilita scroll interno con altura máxima */
    scrollable?: boolean;
    className?: string;
    children: React__default.ReactNode;
}
declare function DialogBody({ scrollable, className, children, }: DialogBodyProps): react_jsx_runtime.JSX.Element;
/**
 * Propósito: Pie del dialog con alineación configurable.
 * Contiene las acciones principales (botones).
 *
 * Props:
 * - align      → alineación horizontal de las acciones
 * - withDivider → línea separadora arriba
 */
interface DialogFooterProps {
    align?: "left" | "center" | "right" | "between";
    withDivider?: boolean;
    className?: string;
    children: React__default.ReactNode;
}
declare function DialogFooter({ align, withDivider, className, children, }: DialogFooterProps): react_jsx_runtime.JSX.Element;

declare const Toaster: (props: ToasterProps) => react_jsx_runtime.JSX.Element;

type TooltipSide = "top" | "bottom" | "left" | "right";
type TooltipVariant = "default" | "rich";
type TooltipSize = "small" | "default" | "rich";
interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    side?: TooltipSide;
    ariaLabel?: string;
    align?: "start" | "center" | "end";
    variant?: TooltipVariant;
    size?: TooltipSize;
    disabled?: boolean;
}
declare const Tooltip: ({ content, children, side, ariaLabel, align, variant, size, disabled, }: TooltipProps) => react_jsx_runtime.JSX.Element;

/**
 * Props de cada columna.
 * @template T - Tipo del objeto de datos de cada fila
 */
interface Column<T> {
    /** Identificador único de la columna */
    key: keyof T | string;
    /** Texto del encabezado */
    header: string;
    /** Función para renderizar la celda; si se omite, imprime el valor directamente */
    render?: (row: T, index: number) => ReactNode;
    /** Permite al usuario ordenar por esta columna */
    sortable?: boolean;
    /** Alineación del contenido de la celda */
    align?: "left" | "center" | "right";
    /** Ancho fijo opcional (ej. "120px", "10%") */
    width?: string;
}
type SortDirection = "asc" | "desc" | null;
interface SortState {
    key: string;
    direction: SortDirection;
}
/**
 * Props principales del componente Table.
 * @template T - Tipo del objeto de datos
 */
interface TableProps<T> {
    /** Arreglo de datos a mostrar */
    data: T[];
    /** Definición de columnas */
    columns: Column<T>[];
    /** Clave única por fila (keyof T) */
    rowKey: keyof T;
    /** Muestra skeleton de carga */
    loading?: boolean;
    /** Número de filas skeleton durante la carga */
    skeletonRows?: number;
    /** Mensaje o nodo cuando no hay datos */
    emptyState?: ReactNode;
    /** Habilita selección de filas con checkbox */
    selectable?: boolean;
    /** Filas seleccionadas (array de valores de rowKey) */
    selectedRows?: (T[keyof T])[];
    /** Callback al cambiar la selección */
    onSelectionChange?: (selected: (T[keyof T])[]) => void;
    /** Callback al hacer clic en una fila */
    onRowClick?: (row: T) => void;
    /** Encabezado fijo al hacer scroll */
    stickyHeader?: boolean;
    /** Variante visual de la tabla */
    variant?: "default" | "striped" | "bordered";
    /** Tamaño de las celdas */
    size?: "sm" | "md" | "lg";
    /** Clase CSS adicional para el contenedor */
    className?: string;
    /** Callback de ordenamiento externo; si se omite, el ordenamiento es interno */
    onSort?: (sort: SortState) => void;
    headerVariant?: "default" | "primary" | "accent";
}
/**
 * Table — Componente de tabla genérica y reutilizable.
 *
 * Lógica clave:
 * - Usa generics `<T>` para tipar filas y columnas sin acoplar a datos específicos.
 * - El ordenamiento puede ser interno (por defecto) o delegado al padre via `onSort`.
 * - La selección múltiple se maneja con un `Set` interno cuando no se pasa `selectedRows`.
 * - `stickyHeader` usa `sticky top-0` con z-index para mantener el header visible.
 */
declare function Table<T extends Record<string, unknown>>({ data, columns, rowKey, loading, skeletonRows, emptyState, selectable, selectedRows, onSelectionChange, onRowClick, stickyHeader, variant, size, className, onSort, headerVariant }: TableProps<T>): react_jsx_runtime.JSX.Element;

declare function Breadcrumbs(): react_jsx_runtime.JSX.Element;

declare function ThemeProvider({ children, ...props }: ThemeProviderProps): react_jsx_runtime.JSX.Element;

declare function ThemeToggle(): react_jsx_runtime.JSX.Element;

export { Breadcrumbs, Button, type ButtonProps, Card, CardBody, type CardBodyProps, CardFooter, type CardFooterProps, CardHeader, type CardHeaderProps, CardImage, type CardImageProps, type CardPadding, type CardProps, type CardVariant, type Column, Dialog, DialogBody, type DialogBodyProps, DialogFooter, type DialogFooterProps, DialogHeader, type DialogHeaderProps, type DialogProps, type DialogSize, type DialogVariant, Input, LabelBadge, type LabelColor, type LabelVariant, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, type SortDirection, type SortState, StatusBadge, type StatusVariant, Table, type TableProps, Textarea, ThemeProvider, ThemeToggle, Toaster, Tooltip, buttonVariants, useDialogContext };
