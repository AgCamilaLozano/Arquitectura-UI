import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React$1 from 'react';
import React__default from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { ThemeProviderProps } from 'next-themes';
import * as LabelPrimitive from '@radix-ui/react-label';
import { AlertDialog as AlertDialog$1, RadioGroup as RadioGroup$1, Avatar as Avatar$1, Collapsible as Collapsible$1, Popover as Popover$1, Separator as Separator$1, Switch as Switch$1 } from 'radix-ui';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { ToasterProps } from 'sonner';

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

declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive" | null | undefined;
    size?: "icon" | "sm" | "default" | "lg" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React$1.ForwardRefExoticComponent<ButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

declare const inputVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
    withIcon?: "none" | "left" | "right" | "both" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface InputProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
    iconLeft?: React$1.ReactNode;
    iconRight?: React$1.ReactNode;
    containerClassName?: string;
}
declare const Input: React$1.ForwardRefExoticComponent<InputProps & React$1.RefAttributes<HTMLInputElement>>;

declare const textareaVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TextareaProps extends React$1.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {
}
declare const Textarea: React$1.ForwardRefExoticComponent<TextareaProps & React$1.RefAttributes<HTMLTextAreaElement>>;

declare function ThemeProvider({ children, ...props }: ThemeProviderProps): react_jsx_runtime.JSX.Element;

declare function ThemeToggle(): react_jsx_runtime.JSX.Element;

type LabelColor = "neutral" | "accent" | "success" | "error" | "warning" | "info";
type LabelVariant = "filled" | "soft" | "outline";
interface LabelBadgeProps {
    label: string;
    variant?: LabelVariant;
    color?: LabelColor;
    size?: "sm" | "md" | "lg";
    icon?: React$1.ReactNode;
    onRemove?: () => void;
    className?: string;
}
declare function LabelBadge({ label, variant, color, size, icon, onRemove, className, }: LabelBadgeProps): react_jsx_runtime.JSX.Element;

declare const Label: React$1.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React$1.RefAttributes<HTMLLabelElement>, "ref"> & VariantProps<(props?: class_variance_authority_types.ClassProp | undefined) => string> & React$1.RefAttributes<HTMLLabelElement>>;

type CardVariant = "default" | "outlined" | "elevated" | "accent" | "ghost";
interface CardProps extends React$1.HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    clickable?: boolean;
    fullWidth?: boolean;
    asChild?: boolean;
}
declare const Card: React$1.ForwardRefExoticComponent<CardProps & React$1.RefAttributes<HTMLDivElement>>;
interface CardHeaderProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "title"> {
    title: React$1.ReactNode;
    subtitle?: React$1.ReactNode;
    action?: React$1.ReactNode;
    withDivider?: boolean;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
declare function CardHeader({ title, subtitle, action, withDivider, as: HeadingTag, // Por defecto h4 acorde a la escala visual de cards corporativas
className, ...props }: CardHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace CardHeader {
    var displayName: string;
}
interface CardBodyProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare function CardBody({ className, children, ...props }: CardBodyProps): react_jsx_runtime.JSX.Element;
declare namespace CardBody {
    var displayName: string;
}
interface CardFooterProps extends React$1.HTMLAttributes<HTMLDivElement> {
    align?: "left" | "center" | "right" | "between";
    withDivider?: boolean;
}
declare function CardFooter({ align, withDivider, className, children, ...props }: CardFooterProps): react_jsx_runtime.JSX.Element;
declare namespace CardFooter {
    var displayName: string;
}
interface CardImageProps extends React$1.HTMLAttributes<HTMLDivElement> {
    src: string;
    alt: string;
    height?: string;
    imgClassName?: string;
}
declare function CardImage({ src, alt, height, className, imgClassName, ...props }: CardImageProps): react_jsx_runtime.JSX.Element;
declare namespace CardImage {
    var displayName: string;
}

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
    children: React$1.ReactNode;
}
interface DialogContextValue {
    variant: DialogVariant;
}
declare const useDialogContext: () => DialogContextValue;
declare function Dialog({ open, onClose, variant, size, closeOnOverlay, hideCloseButton, className, children, }: DialogProps): react_jsx_runtime.JSX.Element;
interface DialogHeaderProps {
    title: React$1.ReactNode;
    description?: React$1.ReactNode;
    icon?: React$1.ReactNode;
    withDivider?: boolean;
    className?: string;
}
declare function DialogHeader({ title, description, icon, withDivider, className, }: DialogHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace DialogHeader {
    var displayName: string;
}
interface DialogBodyProps {
    scrollable?: boolean;
    className?: string;
    children: React$1.ReactNode;
}
declare function DialogBody({ scrollable, className, children }: DialogBodyProps): react_jsx_runtime.JSX.Element;
declare namespace DialogBody {
    var displayName: string;
}
interface DialogFooterProps {
    align?: "left" | "center" | "right" | "between";
    withDivider?: boolean;
    className?: string;
    children: React$1.ReactNode;
}
declare function DialogFooter({ align, withDivider, className, children }: DialogFooterProps): react_jsx_runtime.JSX.Element;
declare namespace DialogFooter {
    var displayName: string;
}

declare function AlertDialog({ ...props }: React$1.ComponentProps<typeof AlertDialog$1.Root>): react_jsx_runtime.JSX.Element;
declare function AlertDialogTrigger({ ...props }: React$1.ComponentProps<typeof AlertDialog$1.Trigger>): react_jsx_runtime.JSX.Element;
declare function AlertDialogContent({ className, ...props }: React$1.ComponentProps<typeof AlertDialog$1.Content>): react_jsx_runtime.JSX.Element;
declare function AlertDialogHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertDialogFooter({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertDialogTitle({ className, ...props }: React$1.ComponentProps<typeof AlertDialog$1.Title>): react_jsx_runtime.JSX.Element;
declare function AlertDialogDescription({ className, ...props }: React$1.ComponentProps<typeof AlertDialog$1.Description>): react_jsx_runtime.JSX.Element;
declare function AlertDialogAction({ className, ...props }: React$1.ComponentProps<typeof AlertDialog$1.Action>): react_jsx_runtime.JSX.Element;
declare function AlertDialogCancel({ className, ...props }: React$1.ComponentProps<typeof AlertDialog$1.Cancel>): react_jsx_runtime.JSX.Element;

interface ConfirmDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    itemName?: string;
    onConfirm: () => void;
    loading?: boolean;
}
declare function ConfirmDeleteDialog({ open, onOpenChange, title, description, itemName, onConfirm, loading, }: ConfirmDeleteDialogProps): react_jsx_runtime.JSX.Element;

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

type CalendarMode = "days" | "months" | "years";
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
interface YearGridProps {
    yearBase: number;
    selected: Date | null;
    onSelectYear: (year: number) => void;
    minDate?: Date;
    maxDate?: Date;
    size?: "sm" | "lg";
}
declare const YearGrid: React__default.FC<YearGridProps>;
interface MonthGridProps {
    year: number;
    selected: Date | null;
    onSelectMonth: (month: number) => void;
    minDate?: Date;
    maxDate?: Date;
    size?: "sm" | "lg";
}
declare const MonthGrid: React__default.FC<MonthGridProps>;
interface CalendarGridProps {
    year: number;
    month: number;
    selected: Date | null;
    today: Date;
    onSelectDay: (day: number) => void;
    minDate?: Date;
    maxDate?: Date;
    size?: "sm" | "lg";
}
declare const CalendarGrid: React__default.FC<CalendarGridProps>;
interface CalendarHeaderProps {
    year: number;
    month: number;
    mode: CalendarMode;
    yearBase: number;
    onPrev: () => void;
    onNext: () => void;
    onClickTitle: () => void;
    selectionMode: SelectionMode;
    size?: "sm" | "lg";
}
declare const CalendarHeader: React__default.FC<CalendarHeaderProps>;
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

interface EmptyStateProps {
    icon?: React$1.ComponentType<{
        className?: string;
    }>;
    title: string;
    description?: string;
    action?: React$1.ReactNode;
    className?: string;
}
declare function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps): react_jsx_runtime.JSX.Element;

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}
declare function Pagination({ page, totalPages, onPageChange, className }: PaginationProps): react_jsx_runtime.JSX.Element | null;

declare function RadioGroup({ className, ...props }: React$1.ComponentProps<typeof RadioGroup$1.Root>): react_jsx_runtime.JSX.Element;
declare function RadioGroupItem({ className, ...props }: React$1.ComponentProps<typeof RadioGroup$1.Item>): react_jsx_runtime.JSX.Element;

declare const PasswordInput: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> & React$1.RefAttributes<HTMLInputElement>>;

interface PasswordStrengthProps {
    password: string;
}
declare function isPasswordValid(password: string): boolean;
declare function PasswordStrength({ password }: PasswordStrengthProps): react_jsx_runtime.JSX.Element;

declare function Skeleton({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

declare function Avatar({ className, size, ...props }: React$1.ComponentProps<typeof Avatar$1.Root> & {
    size?: "default" | "sm" | "lg";
}): react_jsx_runtime.JSX.Element;
declare function AvatarImage({ className, ...props }: React$1.ComponentProps<typeof Avatar$1.Image>): react_jsx_runtime.JSX.Element;
declare function AvatarFallback({ className, ...props }: React$1.ComponentProps<typeof Avatar$1.Fallback>): react_jsx_runtime.JSX.Element;

declare function Breadcrumb({ ...props }: React$1.ComponentProps<"nav">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbList({ className, ...props }: React$1.ComponentProps<"ol">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbItem({ className, ...props }: React$1.ComponentProps<"li">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbLink({ asChild, className, ...props }: React$1.ComponentProps<"a"> & {
    asChild?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function BreadcrumbPage({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbSeparator({ children, className, ...props }: React$1.ComponentProps<"li">): react_jsx_runtime.JSX.Element;

declare const Checkbox: React$1.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

declare function Collapsible({ ...props }: React$1.ComponentProps<typeof Collapsible$1.Root>): react_jsx_runtime.JSX.Element;
declare function CollapsibleTrigger({ ...props }: React$1.ComponentProps<typeof Collapsible$1.CollapsibleTrigger>): react_jsx_runtime.JSX.Element;
declare function CollapsibleContent({ ...props }: React$1.ComponentProps<typeof Collapsible$1.CollapsibleContent>): react_jsx_runtime.JSX.Element;

declare function Popover({ ...props }: React$1.ComponentProps<typeof Popover$1.Root>): react_jsx_runtime.JSX.Element;
declare function PopoverTrigger({ ...props }: React$1.ComponentProps<typeof Popover$1.Trigger>): react_jsx_runtime.JSX.Element;
declare function PopoverContent({ className, align, sideOffset, ...props }: React$1.ComponentProps<typeof Popover$1.Content>): react_jsx_runtime.JSX.Element;

declare function Separator({ className, orientation, decorative, ...props }: React$1.ComponentProps<typeof Separator$1.Root>): react_jsx_runtime.JSX.Element;

declare const Toaster: ({ ...props }: ToasterProps) => react_jsx_runtime.JSX.Element;

declare function Switch({ className, size, ...props }: React$1.ComponentProps<typeof Switch$1.Root> & {
    size?: "sm" | "default";
}): react_jsx_runtime.JSX.Element;

export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Avatar, AvatarFallback, AvatarImage, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, type ButtonProps, Calendar, CalendarGrid, CalendarHeader, type CalendarProps, Card, CardBody, type CardBodyProps, CardFooter, type CardFooterProps, CardHeader, type CardHeaderProps, CardImage, type CardImageProps, type CardProps, type CardVariant, Checkbox, Collapsible, CollapsibleContent, CollapsibleTrigger, type Column, ConfirmDeleteDialog, DataTable, type DataTableProps, Dialog, DialogBody, type DialogBodyProps, DialogFooter, type DialogFooterProps, DialogHeader, type DialogHeaderProps, type DialogProps, type DialogSize, type DialogVariant, type DropdownGroup, type DropdownItem, DropdownMenu, type DropdownMenuProps, EmptyState, GraficaBar, GraficaDonut, PureLineChart as GraficaLine, Input, type InputProps, Label, LabelBadge, type LabelColor, type LabelVariant, MonthGrid, Pagination, PasswordInput, PasswordStrength, Popover, PopoverContent, PopoverTrigger, RadioGroup, RadioGroupItem, SearchableSelect, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Separator, Skeleton, Switch, type TabItem, Tabs, type TabsProps, type TabsVariant, Textarea, type TextareaProps, ThemeProvider, ThemeToggle, Toaster, Tooltip, type TooltipProps, YearGrid, buttonVariants, formatDate, getDiasDelMes, inputVariants, isDisabledDay, isDisabledMonth, isDisabledYear, isPasswordValid, isSameDay, isWeekendDate, textareaVariants, useDialogContext };
