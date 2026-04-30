import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React$1 from 'react';
import React__default, { ReactNode } from 'react';
import { Select as Select$1 } from 'radix-ui';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { ToasterProps } from 'sonner';
import { ThemeProviderProps } from 'next-themes';

declare function Select({ ...props }: React$1.ComponentProps<typeof Select$1.Root>): react_jsx_runtime.JSX.Element;
declare function SelectGroup({ ...props }: React$1.ComponentProps<typeof Select$1.Group>): react_jsx_runtime.JSX.Element;
declare function SelectValue({ ...props }: React$1.ComponentProps<typeof Select$1.Value>): react_jsx_runtime.JSX.Element;
declare function SelectTrigger({ className, size, children, ...props }: React$1.ComponentProps<typeof Select$1.Trigger> & {
    size?: "sm" | "default";
}): react_jsx_runtime.JSX.Element;
declare function SelectContent({ className, children, position, align, ...props }: React$1.ComponentProps<typeof Select$1.Content>): react_jsx_runtime.JSX.Element;
declare function SelectLabel({ className, ...props }: React$1.ComponentProps<typeof Select$1.Label>): react_jsx_runtime.JSX.Element;
declare function SelectItem({ className, children, ...props }: React$1.ComponentProps<typeof Select$1.Item>): react_jsx_runtime.JSX.Element;
declare function SelectSeparator({ className, ...props }: React$1.ComponentProps<typeof Select$1.Separator>): react_jsx_runtime.JSX.Element;
declare function SelectScrollUpButton({ className, ...props }: React$1.ComponentProps<typeof Select$1.ScrollUpButton>): react_jsx_runtime.JSX.Element;
declare function SelectScrollDownButton({ className, ...props }: React$1.ComponentProps<typeof Select$1.ScrollDownButton>): react_jsx_runtime.JSX.Element;

declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "sm" | "default" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
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

/** Un ítem individual dentro del menú */
interface DropdownItem {
    label: string;
    /** Ícono opcional a la izquierda del label */
    icon?: ReactNode;
    /** Ícono opcional a la derecha del label */
    trailingIcon?: ReactNode;
    onClick?: () => void;
    /** Deshabilita la interacción del ítem */
    disabled?: boolean;
    /** Variante de color para acciones destructivas */
    variant?: "default" | "danger";
    /** Separador visual debajo del ítem */
    separator?: boolean;
}
/** Grupo de ítems con label opcional */
interface DropdownGroup {
    groupLabel?: string;
    items: DropdownItem[];
}
/**
 * Props del DropdownMenu
 * @param trigger      - Contenido del botón que abre el menú
 * @param groups       - Array de grupos de ítems
 * @param align        - Alineación del panel (left | right | center)
 * @param width        - Ancho del panel (ej. "w-48", "w-64")
 * @param disabled     - Deshabilita el trigger completo
 * @param className    - Clases extra para el contenedor raíz
 */
interface DropdownMenuProps {
    trigger: ReactNode;
    groups: DropdownGroup[];
    align?: "left" | "right" | "center";
    width?: string;
    disabled?: boolean;
    className?: string;
}
declare function DropdownMenu({ trigger, groups, align, width, disabled, className, }: DropdownMenuProps): react_jsx_runtime.JSX.Element;

interface BarSegment {
    label: string;
    value: number;
}
interface PureBarChartProps {
    className?: string;
    data: BarSegment[];
    title?: string;
    description?: string;
    height?: number;
    barRadius?: number;
    animated?: boolean;
    legendLabel?: string;
    yLabel?: string;
}
declare const GraficaBar: ({ className, data, title, description, height, barRadius, animated, legendLabel, yLabel, }: PureBarChartProps) => react_jsx_runtime.JSX.Element;

interface ChartSegment {
    value: number;
    label: string;
    color?: string;
}
interface MultiDonutChartProps {
    data: ChartSegment[];
    title?: string;
    description?: string;
    size?: number;
    strokeWidth?: number;
    loading?: boolean;
    showTotal?: boolean;
    totalValue?: number;
    formatValue?: (value: number) => string;
}
declare const GraficaDonut: ({ data, title, description, size, strokeWidth, loading, showTotal, totalValue, formatValue, }: MultiDonutChartProps) => react_jsx_runtime.JSX.Element;

interface DataPoint {
    label: string;
    value: number;
}
interface PureLineChartProps {
    data: DataPoint[];
    title?: string;
    description?: string;
    height?: number;
    lineColor?: string;
    showArea?: boolean;
    animated?: boolean;
    legendLabel?: string;
    yLabel?: string;
}
declare const PureLineChart: ({ data, title, description, height, lineColor, showArea, animated, legendLabel, yLabel, }: PureLineChartProps) => react_jsx_runtime.JSX.Element;

type TabItem = {
    id: string;
    label: string;
    icon?: ReactNode;
    content: ReactNode;
    disabled?: boolean;
};
type TabsVariant = "underline" | "pill" | "card";
type TabsProps = {
    tabs: TabItem[];
    defaultTab?: string;
    activeTab?: string;
    onChange?: (id: string) => void;
    variant?: TabsVariant;
    className?: string;
    align?: "start" | "center" | "end" | "stretch";
};
declare function Tabs({ tabs, defaultTab, activeTab: controlledTab, onChange, variant, className, align, }: TabsProps): react_jsx_runtime.JSX.Element;

/** Una columna individual de la tabla */
interface Column<T> {
    key: string;
    header: string;
    accessor?: keyof T | ((row: T) => React__default.ReactNode);
    render?: (row: T) => React__default.ReactNode;
    width?: string | number;
    align?: "left" | "center" | "right";
    group?: string;
    groupStyle?: {
        bg?: string;
        border?: string;
    };
}
/** Props del componente DataTable */
interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    maxHeight?: string;
    rowKey: keyof T;
    emptyState?: React__default.ReactNode;
    isLoading?: boolean;
    className?: string;
    headerVariant?: "default" | "accent";
    size?: "sm" | "md" | "lg";
}
declare function DataTable<T>({ data, columns, maxHeight, rowKey, emptyState, isLoading, className, headerVariant, size, }: DataTableProps<T>): react_jsx_runtime.JSX.Element;

declare function Breadcrumbs(): react_jsx_runtime.JSX.Element;

declare function ThemeProvider({ children, ...props }: ThemeProviderProps): react_jsx_runtime.JSX.Element;

declare function ThemeToggle(): react_jsx_runtime.JSX.Element;

type AlertDialogVariant = "destructive" | "warning" | "success" | "info";
type AlertDialogSize = "sm" | "md" | "lg";
interface AlertDialogProps {
    open: boolean;
    onClose: () => void;
    variant?: AlertDialogVariant;
    size?: AlertDialogSize;
    title: React__default.ReactNode;
    description?: React__default.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    closeOnOverlay?: boolean;
    hideCloseButton?: boolean;
    className?: string;
    children?: React__default.ReactNode;
}
declare const variantConfig: Record<AlertDialogVariant, {
    icon: React__default.ReactNode;
    iconBg: string;
    confirmVariant: "primary" | "destructive";
}>;
declare function AlertDialog({ open, onClose, variant, size, title, description, confirmLabel, cancelLabel, onConfirm, onCancel, closeOnOverlay, hideCloseButton, className, children, }: AlertDialogProps): react_jsx_runtime.JSX.Element | null;
interface AlertDialogContextValue {
    variant: AlertDialogVariant;
    config: typeof variantConfig["destructive"];
}
declare const useAlertDialogContext: () => AlertDialogContextValue;

export { AlertDialog, type AlertDialogProps, type AlertDialogSize, type AlertDialogVariant, Breadcrumbs, Button, type ButtonProps, Card, CardBody, type CardBodyProps, CardFooter, type CardFooterProps, CardHeader, type CardHeaderProps, CardImage, type CardImageProps, type CardPadding, type CardProps, type CardVariant, type Column, DataTable, type DataTableProps, Dialog, DialogBody, type DialogBodyProps, DialogFooter, type DialogFooterProps, DialogHeader, type DialogHeaderProps, type DialogProps, type DialogSize, type DialogVariant, type DropdownGroup, type DropdownItem, DropdownMenu, type DropdownMenuProps, GraficaBar, GraficaDonut, PureLineChart as GraficaLine, Input, LabelBadge, type LabelColor, type LabelVariant, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, StatusBadge, type StatusVariant, type TabItem, Tabs, type TabsProps, type TabsVariant, Textarea, ThemeProvider, ThemeToggle, Toaster, Tooltip, buttonVariants, useAlertDialogContext, useDialogContext };
