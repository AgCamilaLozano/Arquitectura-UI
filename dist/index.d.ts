export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Calendar, CalendarGrid, CalendarHeader, CalendarProps, Card, CardBody, CardBodyProps, CardFooter, CardFooterProps, CardHeader, CardHeaderProps, CardImage, CardImageProps, CardProps, CardVariant, ConfirmDeleteDialog, Dialog, DialogBody, DialogBodyProps, DialogFooter, DialogFooterProps, DialogHeader, DialogHeaderProps, DialogProps, DialogSize, DialogVariant, EmptyState, GraficaBar, GraficaDonut, GraficaLine, Label, LabelBadge, LabelColor, LabelVariant, MonthGrid, Pagination, PasswordInput, PasswordStrength, YearGrid, formatDate, getDiasDelMes, isDisabledDay, isDisabledMonth, isDisabledYear, isPasswordValid, isSameDay, isWeekendDate, useDialogContext } from './components.js';
export { cn } from './utils.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React$1 from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { Avatar as Avatar$1, Collapsible as Collapsible$1, Popover as Popover$1, RadioGroup as RadioGroup$1, Separator as Separator$1, Switch as Switch$1 } from 'radix-ui';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as SelectPrimitive from '@radix-ui/react-select';
import '@radix-ui/react-label';
import 'clsx';

declare function Sheet(props: React$1.ComponentProps<typeof SheetPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function SheetTrigger(props: React$1.ComponentProps<typeof SheetPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function SheetClose(props: React$1.ComponentProps<typeof SheetPrimitive.Close>): react_jsx_runtime.JSX.Element;
declare function SheetContent({ className, children, side, showCloseButton, ...props }: React$1.ComponentProps<typeof SheetPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left";
    showCloseButton?: boolean;
}): react_jsx_runtime.JSX.Element;
declare namespace SheetContent {
    var displayName: string;
}
declare function SheetHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SheetFooter({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SheetTitle({ className, ...props }: React$1.ComponentProps<typeof SheetPrimitive.Title>): react_jsx_runtime.JSX.Element;
declare function SheetDescription({ className, ...props }: React$1.ComponentProps<typeof SheetPrimitive.Description>): react_jsx_runtime.JSX.Element;

interface Column<T> {
    key: string;
    header: string;
    accessor?: keyof T | ((row: T) => React$1.ReactNode);
    render?: (row: T) => React$1.ReactNode;
    width?: string | number;
    align?: "left" | "center" | "right";
    group?: string;
}
interface DataTableProps<T> extends React$1.HTMLAttributes<HTMLDivElement> {
    data: T[];
    columns: Column<T>[];
    maxHeight?: string;
    rowKey: keyof T;
    emptyState?: React$1.ReactNode;
    isLoading?: boolean;
    headerVariant?: "default" | "accent";
    size?: "sm" | "md" | "lg";
}
declare const DataTable: <T>(props: DataTableProps<T> & {
    ref?: React$1.ForwardedRef<HTMLDivElement>;
}) => React$1.ReactElement;

type TabItem = {
    id: string;
    label: string;
    icon?: React$1.ReactNode;
    content: React$1.ReactNode;
    disabled?: boolean;
};
type TabsVariant = "underline" | "pill" | "card";
interface TabsProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "onChange"> {
    tabs: TabItem[];
    defaultTab?: string;
    activeTab?: string;
    onChange?: (id: string) => void;
    variant?: TabsVariant;
    align?: "start" | "center" | "end" | "stretch";
}
declare const Tabs: React$1.ForwardRefExoticComponent<TabsProps & React$1.RefAttributes<HTMLDivElement>>;

type TooltipSide = "top" | "bottom" | "left" | "right";
type TooltipVariant = "default" | "rich";
type TooltipSize = "small" | "default" | "rich";
interface TooltipProps {
    content: React$1.ReactNode;
    children: React$1.ReactNode;
    side?: TooltipSide;
    ariaLabel?: string;
    align?: "start" | "center" | "end";
    variant?: TooltipVariant;
    size?: TooltipSize;
    disabled?: boolean;
}
declare function Tooltip({ content, children, side, ariaLabel, align, variant, size, disabled, }: TooltipProps): react_jsx_runtime.JSX.Element;

declare function Avatar({ className, size, ...props }: React$1.ComponentProps<typeof Avatar$1.Root> & {
    size?: "default" | "sm" | "lg";
}): react_jsx_runtime.JSX.Element;
declare function AvatarImage({ className, ...props }: React$1.ComponentProps<typeof Avatar$1.Image>): react_jsx_runtime.JSX.Element;
declare function AvatarFallback({ className, ...props }: React$1.ComponentProps<typeof Avatar$1.Fallback>): react_jsx_runtime.JSX.Element;

declare const buttonVariants: (props?: ({
    variant?: "outline" | "link" | "default" | "secondary" | "ghost" | "destructive" | null | undefined;
    size?: "sm" | "lg" | "icon" | "default" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React$1.ForwardRefExoticComponent<ButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

declare const Checkbox: React$1.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

declare function Collapsible({ ...props }: React$1.ComponentProps<typeof Collapsible$1.Root>): react_jsx_runtime.JSX.Element;
declare function CollapsibleTrigger({ ...props }: React$1.ComponentProps<typeof Collapsible$1.CollapsibleTrigger>): react_jsx_runtime.JSX.Element;
declare function CollapsibleContent({ ...props }: React$1.ComponentProps<typeof Collapsible$1.CollapsibleContent>): react_jsx_runtime.JSX.Element;

interface DropdownItem {
    label: string;
    icon?: React$1.ReactNode;
    trailingIcon?: React$1.ReactNode;
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
    trigger: React$1.ReactNode;
    groups: DropdownGroup[];
    align?: "start" | "end" | "center";
    width?: string;
    disabled?: boolean;
    className?: string;
    triggerIcon?: React$1.ReactNode;
}
declare function DropdownMenu({ trigger, groups, align, width, disabled, className, triggerIcon, }: DropdownMenuProps): react_jsx_runtime.JSX.Element;

declare const inputVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
    withIcon?: "none" | "both" | "right" | "left" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface InputProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
    iconLeft?: React$1.ReactNode;
    iconRight?: React$1.ReactNode;
    containerClassName?: string;
}
declare const Input: React$1.ForwardRefExoticComponent<InputProps & React$1.RefAttributes<HTMLInputElement>>;

declare function Popover({ ...props }: React$1.ComponentProps<typeof Popover$1.Root>): react_jsx_runtime.JSX.Element;
declare function PopoverTrigger({ ...props }: React$1.ComponentProps<typeof Popover$1.Trigger>): react_jsx_runtime.JSX.Element;
declare function PopoverContent({ className, align, sideOffset, ...props }: React$1.ComponentProps<typeof Popover$1.Content>): react_jsx_runtime.JSX.Element;

declare function RadioGroup({ className, ...props }: React$1.ComponentProps<typeof RadioGroup$1.Root>): react_jsx_runtime.JSX.Element;
declare function RadioGroupItem({ className, ...props }: React$1.ComponentProps<typeof RadioGroup$1.Item>): react_jsx_runtime.JSX.Element;

interface SearchableSelectOption {
    value: string;
    label: string;
}
interface SearchableSelectProps {
    value: string;
    onValueChange: (value: string) => void;
    options: readonly SearchableSelectOption[];
    placeholder?: string;
    searchPlaceholder?: string;
    className?: string;
    disabled?: boolean;
    allowCustom?: boolean;
    customPlaceholder?: string;
}
declare function SearchableSelect({ value, onValueChange, options, placeholder, searchPlaceholder, className, disabled, allowCustom, customPlaceholder, }: SearchableSelectProps): react_jsx_runtime.JSX.Element;

declare function Select({ ...props }: React$1.ComponentProps<typeof SelectPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function SelectGroup({ ...props }: React$1.ComponentProps<typeof SelectPrimitive.Group>): react_jsx_runtime.JSX.Element;
declare function SelectValue({ ...props }: React$1.ComponentProps<typeof SelectPrimitive.Value>): react_jsx_runtime.JSX.Element;
declare function SelectTrigger({ className, size, children, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Trigger> & {
    size?: "sm" | "default";
}): react_jsx_runtime.JSX.Element;
declare namespace SelectTrigger {
    var displayName: string;
}
declare function SelectContent({ className, children, position, align, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Content>): react_jsx_runtime.JSX.Element;
declare namespace SelectContent {
    var displayName: string;
}
declare function SelectLabel({ className, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Label>): react_jsx_runtime.JSX.Element;
declare namespace SelectLabel {
    var displayName: string;
}
declare function SelectItem({ className, children, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Item>): react_jsx_runtime.JSX.Element;
declare namespace SelectItem {
    var displayName: string;
}
declare function SelectSeparator({ className, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Separator>): react_jsx_runtime.JSX.Element;
declare namespace SelectSeparator {
    var displayName: string;
}
declare function SelectScrollUpButton({ className, ...props }: React$1.ComponentProps<typeof SelectPrimitive.ScrollUpButton>): react_jsx_runtime.JSX.Element;
declare namespace SelectScrollUpButton {
    var displayName: string;
}
declare function SelectScrollDownButton({ className, ...props }: React$1.ComponentProps<typeof SelectPrimitive.ScrollDownButton>): react_jsx_runtime.JSX.Element;
declare namespace SelectScrollDownButton {
    var displayName: string;
}

declare function Separator({ className, orientation, decorative, ...props }: React$1.ComponentProps<typeof Separator$1.Root>): react_jsx_runtime.JSX.Element;

declare function Skeleton({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

declare function Switch({ className, size, ...props }: React$1.ComponentProps<typeof Switch$1.Root> & {
    size?: "sm" | "default";
}): react_jsx_runtime.JSX.Element;

declare const textareaVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TextareaProps extends React$1.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {
}
declare const Textarea: React$1.ForwardRefExoticComponent<TextareaProps & React$1.RefAttributes<HTMLTextAreaElement>>;

/**
 * Utilidades de tipado y formateo dinámico de HSL para el ERP AGUSTIN
 */
/**
 * Convierte un string de canales HSL ("H S L") a un formato válido de inline styles para React
 * Útil para inyectar marcas personalizadas en componentes que requieren estilos directos del inline CSS.
 */
declare function formatHSLToStyle(hslString: string): string;
/**
 * Recibe un color base en HSL crudo (ej: "265 65% 52%") y genera dinámicamente
 * el objeto CSS de variables personalizadas para un Tenant específico.
 * * Permite cambiar el branding de un componente específico in-situ si se requiere.
 */
declare function getTenantThemeStyles(hue: number, saturation: string): React.CSSProperties;

export { Avatar, AvatarFallback, AvatarImage, Button, type ButtonProps, Checkbox, Collapsible, CollapsibleContent, CollapsibleTrigger, type Column, DataTable, type DataTableProps, type DropdownGroup, type DropdownItem, DropdownMenu, type DropdownMenuProps, Input, type InputProps, Popover, PopoverContent, PopoverTrigger, RadioGroup, RadioGroupItem, SearchableSelect, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Separator, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, Skeleton, Switch, type TabItem, Tabs, type TabsProps, type TabsVariant, Textarea, type TextareaProps, Tooltip, type TooltipProps, buttonVariants, formatHSLToStyle, getTenantThemeStyles, inputVariants, textareaVariants };
