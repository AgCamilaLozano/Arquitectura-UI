import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import React__default, { ReactNode } from 'react';
import { Select as Select$1 } from 'radix-ui';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { ThemeProviderProps } from 'next-themes';
import { ToasterProps } from 'sonner';

declare function Select({ ...props }: React.ComponentProps<typeof Select$1.Root>): react_jsx_runtime.JSX.Element;
declare function SelectGroup({ ...props }: React.ComponentProps<typeof Select$1.Group>): react_jsx_runtime.JSX.Element;
declare function SelectValue({ ...props }: React.ComponentProps<typeof Select$1.Value>): react_jsx_runtime.JSX.Element;
declare function SelectTrigger({ className, size, children, ...props }: React.ComponentProps<typeof Select$1.Trigger> & {
    size?: "sm" | "default";
}): react_jsx_runtime.JSX.Element;
declare function SelectContent({ className, children, position, align, ...props }: React.ComponentProps<typeof Select$1.Content>): react_jsx_runtime.JSX.Element;
declare function SelectLabel({ className, ...props }: React.ComponentProps<typeof Select$1.Label>): react_jsx_runtime.JSX.Element;
declare function SelectItem({ className, children, ...props }: React.ComponentProps<typeof Select$1.Item>): react_jsx_runtime.JSX.Element;
declare function SelectSeparator({ className, ...props }: React.ComponentProps<typeof Select$1.Separator>): react_jsx_runtime.JSX.Element;
declare function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof Select$1.ScrollUpButton>): react_jsx_runtime.JSX.Element;
declare function SelectScrollDownButton({ className, ...props }: React.ComponentProps<typeof Select$1.ScrollDownButton>): react_jsx_runtime.JSX.Element;

type MultiSelectOption = string | {
    label: string;
    value: string;
};
interface MultiSelectProps {
    options: MultiSelectOption[];
    selected: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    className?: string;
}
declare function MultiSelect({ options, selected, onChange, placeholder, className, }: MultiSelectProps): react_jsx_runtime.JSX.Element;

declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive" | null | undefined;
    size?: "sm" | "default" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React__default.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
}
declare const Button: React__default.ForwardRefExoticComponent<ButtonProps & React__default.RefAttributes<HTMLButtonElement>>;

declare const inputVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
    withIcon?: "none" | "left" | "right" | "both" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface InputProps extends Omit<React__default.ComponentProps<"input">, "size">, VariantProps<typeof inputVariants> {
    iconLeft?: React__default.ReactNode;
    iconRight?: React__default.ReactNode;
}
declare const Input: React__default.ForwardRefExoticComponent<Omit<InputProps, "ref"> & React__default.RefAttributes<HTMLInputElement>>;

interface TextareaProps extends React__default.TextareaHTMLAttributes<HTMLTextAreaElement> {
}
declare const Textarea: React__default.ForwardRefExoticComponent<TextareaProps & React__default.RefAttributes<HTMLTextAreaElement>>;

declare function ThemeProvider({ children, ...props }: ThemeProviderProps): react_jsx_runtime.JSX.Element;

declare function ThemeToggle(): react_jsx_runtime.JSX.Element;

type LabelColor = "neutral" | "accent" | "success" | "error" | "warning" | "info";
type LabelVariant = "filled" | "soft" | "outline";
interface LabelBadgeProps {
    label: string;
    variant?: LabelVariant;
    color?: LabelColor;
    size?: "sm" | "md" | "lg";
    icon?: React__default.ReactNode;
    onRemove?: () => void;
    className?: string;
}
declare function LabelBadge({ label, variant, color, size, icon, onRemove, className, }: LabelBadgeProps): react_jsx_runtime.JSX.Element;

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

type CardVariant = "default" | "outlined" | "elevated" | "accent" | "ghost";
interface CardProps {
    variant?: CardVariant;
    clickable?: boolean;
    onClick?: () => void;
    fullWidth?: boolean;
    className?: string;
    children: React__default.ReactNode;
}
declare function Card({ variant, clickable, onClick, fullWidth, className, children, }: CardProps): react_jsx_runtime.JSX.Element;
interface CardHeaderProps {
    title: React__default.ReactNode;
    subtitle?: React__default.ReactNode;
    action?: React__default.ReactNode;
    withDivider?: boolean;
    className?: string;
}
declare function CardHeader({ title, subtitle, action, withDivider, className, }: CardHeaderProps): react_jsx_runtime.JSX.Element;
interface CardBodyProps {
    className?: string;
    children: React__default.ReactNode;
}
declare function CardBody({ className, children }: CardBodyProps): react_jsx_runtime.JSX.Element;
interface CardFooterProps {
    align?: "left" | "center" | "right" | "between";
    withDivider?: boolean;
    className?: string;
    children: React__default.ReactNode;
}
declare function CardFooter({ align, withDivider, className, children, }: CardFooterProps): react_jsx_runtime.JSX.Element;
interface CardImageProps {
    src: string;
    alt: string;
    height?: string;
    className?: string;
}
declare function CardImage({ src, alt, height, className, }: CardImageProps): react_jsx_runtime.JSX.Element;

type DialogVariant = "default" | "destructive" | "warning" | "info";
type DialogSize = "sm" | "md" | "lg" | "xl";
interface DialogProps {
    open: boolean;
    onClose: () => void;
    variant?: DialogVariant;
    size?: DialogSize;
    closeOnOverlay?: boolean;
    hideCloseButton?: boolean;
    className?: string;
    children: React__default.ReactNode;
}
interface DialogContextValue {
    variant: DialogVariant;
}
declare const useDialogContext: () => DialogContextValue;
declare function Dialog({ open, onClose, variant, size, closeOnOverlay, hideCloseButton, className, children, }: DialogProps): react_jsx_runtime.JSX.Element;
interface DialogHeaderProps {
    title: React__default.ReactNode;
    description?: React__default.ReactNode;
    icon?: React__default.ReactNode;
    withDivider?: boolean;
    className?: string;
}
declare function DialogHeader({ title, description, icon, withDivider, className, }: DialogHeaderProps): react_jsx_runtime.JSX.Element;
interface DialogBodyProps {
    scrollable?: boolean;
    className?: string;
    children: React__default.ReactNode;
}
declare function DialogBody({ scrollable, className, children }: DialogBodyProps): react_jsx_runtime.JSX.Element;
interface DialogFooterProps {
    align?: "left" | "center" | "right" | "between";
    withDivider?: boolean;
    className?: string;
    children: React__default.ReactNode;
}
declare function DialogFooter({ align, withDivider, className, children }: DialogFooterProps): react_jsx_runtime.JSX.Element;

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

interface DropdownItem {
    label: string;
    icon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: "default" | "danger";
    separator?: boolean;
}
interface DropdownGroup {
    groupLabel?: string;
    items: DropdownItem[];
}
interface DropdownMenuProps {
    trigger: React.ReactNode;
    groups: DropdownGroup[];
    align?: "start" | "end" | "center";
    width?: string;
    disabled?: boolean;
    className?: string;
}
declare function DropdownMenu({ trigger, groups, align, // Por defecto a la izquierda
width, disabled, className, }: DropdownMenuProps): react_jsx_runtime.JSX.Element;

type SelectionMode = "date" | "month" | "year";
interface CalendarProps {
    variant?: "full" | "input";
    selectionMode?: SelectionMode;
    value?: Date | null;
    onChange?: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    className?: string;
}
declare function getDiasDelMes(year: number, month: number): (number | null)[];
declare function isSameDay(a: Date, b: Date): boolean;
declare function isWeekendDate(date: Date): boolean;
declare function isDisabledDay(day: number, year: number, month: number, min?: Date, max?: Date): boolean;
declare function isDisabledMonth(year: number, month: number, min?: Date, max?: Date): boolean;
declare function isDisabledYear(year: number, min?: Date, max?: Date): boolean;
declare function formatDate(date: Date, mode?: SelectionMode): string;
declare const Calendar: React__default.FC<CalendarProps>;

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
    legendLabel?: string;
    yLabel?: string;
}
declare const GraficaBar: ({ className, data, title, description, height, barRadius, legendLabel, yLabel, }: PureBarChartProps) => react_jsx_runtime.JSX.Element;

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
declare const PureLineChart: ({ className, data, title, description, height, lineColor, showArea, legendLabel, yLabel, }: PureLineChartProps) => react_jsx_runtime.JSX.Element;

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

interface BreadcrumbsProps {
    className?: string;
}
declare function Breadcrumbs({ className }: BreadcrumbsProps): react_jsx_runtime.JSX.Element;

export { Breadcrumbs, type BreadcrumbsProps, Button, type ButtonProps, Calendar, type CalendarProps, Card, CardBody, type CardBodyProps, CardFooter, type CardFooterProps, CardHeader, type CardHeaderProps, CardImage, type CardImageProps, type CardProps, type CardVariant, type Column, DataTable, type DataTableProps, Dialog, DialogBody, type DialogBodyProps, DialogFooter, type DialogFooterProps, DialogHeader, type DialogHeaderProps, type DialogProps, type DialogSize, type DialogVariant, type DropdownGroup, type DropdownItem, DropdownMenu, type DropdownMenuProps, GraficaBar, GraficaDonut, PureLineChart as GraficaLine, Input, type InputProps, LabelBadge, type LabelColor, type LabelVariant, MultiSelect, type MultiSelectOption, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, StatusBadge, type StatusVariant, type TabItem, Tabs, type TabsProps, type TabsVariant, Textarea, type TextareaProps, ThemeProvider, ThemeToggle, Toaster, Tooltip, buttonVariants, formatDate, getDiasDelMes, inputVariants, isDisabledDay, isDisabledMonth, isDisabledYear, isSameDay, isWeekendDate, useDialogContext };
