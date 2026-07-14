import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import React__default from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import * as LabelPrimitive from '@radix-ui/react-label';
import { VariantProps } from 'class-variance-authority';
import { AlertDialog as AlertDialog$1 } from 'radix-ui';

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

declare const Label: React.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & VariantProps<(props?: class_variance_authority_types.ClassProp | undefined) => string> & React.RefAttributes<HTMLLabelElement>>;

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

declare const PasswordInput: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> & React.RefAttributes<HTMLInputElement>>;

interface PasswordStrengthProps {
    password: string;
}
declare function isPasswordValid(password: string): boolean;
declare function PasswordStrength({ password }: PasswordStrengthProps): react_jsx_runtime.JSX.Element;

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

interface EmptyStateProps {
    icon?: React.ComponentType<{
        className?: string;
    }>;
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}
declare function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps): react_jsx_runtime.JSX.Element;

type CardVariant = "default" | "outlined" | "elevated" | "accent" | "ghost";
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    clickable?: boolean;
    fullWidth?: boolean;
    asChild?: boolean;
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    action?: React.ReactNode;
    withDivider?: boolean;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
declare function CardHeader({ title, subtitle, action, withDivider, as: HeadingTag, // Por defecto h4 acorde a la escala visual de cards corporativas
className, ...props }: CardHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace CardHeader {
    var displayName: string;
}
interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare function CardBody({ className, children, ...props }: CardBodyProps): react_jsx_runtime.JSX.Element;
declare namespace CardBody {
    var displayName: string;
}
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "left" | "center" | "right" | "between";
    withDivider?: boolean;
}
declare function CardFooter({ align, withDivider, className, children, ...props }: CardFooterProps): react_jsx_runtime.JSX.Element;
declare namespace CardFooter {
    var displayName: string;
}
interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
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
    children: React.ReactNode;
}
interface DialogContextValue {
    variant: DialogVariant;
}
declare const useDialogContext: () => DialogContextValue;
declare function Dialog({ open, onClose, variant, size, closeOnOverlay, hideCloseButton, className, children, }: DialogProps): react_jsx_runtime.JSX.Element;
interface DialogHeaderProps {
    title: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
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
    children: React.ReactNode;
}
declare function DialogBody({ scrollable, className, children }: DialogBodyProps): react_jsx_runtime.JSX.Element;
declare namespace DialogBody {
    var displayName: string;
}
interface DialogFooterProps {
    align?: "left" | "center" | "right" | "between";
    withDivider?: boolean;
    className?: string;
    children: React.ReactNode;
}
declare function DialogFooter({ align, withDivider, className, children }: DialogFooterProps): react_jsx_runtime.JSX.Element;
declare namespace DialogFooter {
    var displayName: string;
}

declare function AlertDialog({ ...props }: React.ComponentProps<typeof AlertDialog$1.Root>): react_jsx_runtime.JSX.Element;
declare function AlertDialogTrigger({ ...props }: React.ComponentProps<typeof AlertDialog$1.Trigger>): react_jsx_runtime.JSX.Element;
declare function AlertDialogContent({ className, ...props }: React.ComponentProps<typeof AlertDialog$1.Content>): react_jsx_runtime.JSX.Element;
declare function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AlertDialog$1.Title>): react_jsx_runtime.JSX.Element;
declare function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof AlertDialog$1.Description>): react_jsx_runtime.JSX.Element;
declare function AlertDialogAction({ className, ...props }: React.ComponentProps<typeof AlertDialog$1.Action>): react_jsx_runtime.JSX.Element;
declare function AlertDialogCancel({ className, ...props }: React.ComponentProps<typeof AlertDialog$1.Cancel>): react_jsx_runtime.JSX.Element;

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

declare function Breadcrumb({ ...props }: React.ComponentProps<"nav">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbLink({ asChild, className, ...props }: React.ComponentProps<"a"> & {
    asChild?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">): react_jsx_runtime.JSX.Element;

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}
declare function Pagination({ page, totalPages, onPageChange, className }: PaginationProps): react_jsx_runtime.JSX.Element | null;

export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Calendar, CalendarGrid, CalendarHeader, type CalendarProps, Card, CardBody, type CardBodyProps, CardFooter, type CardFooterProps, CardHeader, type CardHeaderProps, CardImage, type CardImageProps, type CardProps, type CardVariant, ConfirmDeleteDialog, Dialog, DialogBody, type DialogBodyProps, DialogFooter, type DialogFooterProps, DialogHeader, type DialogHeaderProps, type DialogProps, type DialogSize, type DialogVariant, EmptyState, GraficaBar, GraficaDonut, PureLineChart as GraficaLine, Label, LabelBadge, type LabelColor, type LabelVariant, MonthGrid, Pagination, PasswordInput, PasswordStrength, YearGrid, formatDate, getDiasDelMes, isDisabledDay, isDisabledMonth, isDisabledYear, isPasswordValid, isSameDay, isWeekendDate, useDialogContext };
