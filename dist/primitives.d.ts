import * as React$1 from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Avatar as Avatar$1, Checkbox as Checkbox$1, Collapsible as Collapsible$1, Popover as Popover$1, RadioGroup as RadioGroup$1, Separator as Separator$1, Switch as Switch$1 } from 'radix-ui';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import * as SelectPrimitive from '@radix-ui/react-select';

declare function Sheet(props: React$1.ComponentProps<typeof SheetPrimitive.Root>): React$1.JSX.Element;
declare function SheetTrigger(props: React$1.ComponentProps<typeof SheetPrimitive.Trigger>): React$1.JSX.Element;
declare function SheetClose(props: React$1.ComponentProps<typeof SheetPrimitive.Close>): React$1.JSX.Element;
declare function SheetPortal(props: React$1.ComponentProps<typeof SheetPrimitive.Portal>): React$1.JSX.Element;
declare function SheetOverlay({ className, ...props }: React$1.ComponentProps<typeof SheetPrimitive.Overlay>): React$1.JSX.Element;
declare function SheetContent({ className, children, side, showCloseButton, ...props }: React$1.ComponentProps<typeof SheetPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left";
    showCloseButton?: boolean;
}): React$1.JSX.Element;
declare namespace SheetContent {
    var displayName: string;
}
declare function SheetHeader({ className, ...props }: React$1.ComponentProps<"div">): React$1.JSX.Element;
declare function SheetFooter({ className, ...props }: React$1.ComponentProps<"div">): React$1.JSX.Element;
declare function SheetTitle({ className, ...props }: React$1.ComponentProps<typeof SheetPrimitive.Title>): React$1.JSX.Element;
declare function SheetDescription({ className, ...props }: React$1.ComponentProps<typeof SheetPrimitive.Description>): React$1.JSX.Element;

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
    align?: "start" | "center" | "end";
    ariaLabel?: string;
    variant?: TooltipVariant;
    size?: TooltipSize;
    disabled?: boolean;
    delayDuration?: number;
}
declare function Tooltip({ content, children, side, align, ariaLabel, variant, size, disabled, delayDuration, }: TooltipProps): React$1.JSX.Element;
declare const TooltipProvider: React$1.FC<TooltipPrimitive.TooltipProviderProps>;
declare const TooltipRoot: React$1.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React$1.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const TooltipContent: React$1.ForwardRefExoticComponent<TooltipPrimitive.TooltipContentProps & React$1.RefAttributes<HTMLDivElement>>;

declare function Avatar({ className, size, ...props }: React$1.ComponentProps<typeof Avatar$1.Root> & {
    size?: "default" | "sm" | "lg";
}): React$1.JSX.Element;
declare function AvatarImage({ className, ...props }: React$1.ComponentProps<typeof Avatar$1.Image>): React$1.JSX.Element;
declare function AvatarFallback({ className, ...props }: React$1.ComponentProps<typeof Avatar$1.Fallback>): React$1.JSX.Element;
declare function AvatarBadge({ className, ...props }: React$1.ComponentProps<"span">): React$1.JSX.Element;
declare function AvatarGroup({ className, ...props }: React$1.ComponentProps<"div">): React$1.JSX.Element;
declare function AvatarGroupCount({ className, ...props }: React$1.ComponentProps<"div">): React$1.JSX.Element;

declare const buttonVariants: (props?: ({
    variant?: "outline" | "link" | "default" | "secondary" | "ghost" | "destructive" | null | undefined;
    size?: "sm" | "lg" | "icon" | "default" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React$1.ForwardRefExoticComponent<ButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

declare const Checkbox: React$1.ForwardRefExoticComponent<Omit<Checkbox$1.CheckboxProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

declare function Collapsible({ ...props }: React$1.ComponentProps<typeof Collapsible$1.Root>): React$1.JSX.Element;
declare function CollapsibleTrigger({ ...props }: React$1.ComponentProps<typeof Collapsible$1.CollapsibleTrigger>): React$1.JSX.Element;
declare function CollapsibleContent({ ...props }: React$1.ComponentProps<typeof Collapsible$1.CollapsibleContent>): React$1.JSX.Element;

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
declare const DropdownMenuRoot: React$1.FC<DropdownPrimitive.DropdownMenuProps>;
declare const DropdownMenuTrigger: React$1.ForwardRefExoticComponent<DropdownPrimitive.DropdownMenuTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuGroup: React$1.ForwardRefExoticComponent<DropdownPrimitive.DropdownMenuGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuPortal: React$1.FC<DropdownPrimitive.DropdownMenuPortalProps>;
declare function DropdownMenuContent({ className, sideOffset, align, ...props }: React$1.ComponentProps<typeof DropdownPrimitive.Content>): React$1.JSX.Element;
declare function DropdownMenuItem({ className, variant, ...props }: React$1.ComponentProps<typeof DropdownPrimitive.Item> & {
    variant?: "default" | "danger";
}): React$1.JSX.Element;
declare function DropdownMenuLabel({ className, ...props }: React$1.ComponentProps<typeof DropdownPrimitive.Label>): React$1.JSX.Element;
declare function DropdownMenuSeparator({ className, ...props }: React$1.ComponentProps<typeof DropdownPrimitive.Separator>): React$1.JSX.Element;
declare function DropdownMenu({ trigger, groups, align, width, disabled, className, triggerIcon, }: DropdownMenuProps): React$1.JSX.Element;

declare const inputVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
    inputSize?: "sm" | "lg" | "default" | null | undefined;
    withIcon?: "none" | "both" | "right" | "left" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface InputProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
    iconLeft?: React$1.ReactNode;
    iconRight?: React$1.ReactNode;
    containerClassName?: string;
}
declare const Input: React$1.ForwardRefExoticComponent<InputProps & React$1.RefAttributes<HTMLInputElement>>;

declare function Popover({ ...props }: React$1.ComponentProps<typeof Popover$1.Root>): React$1.JSX.Element;
declare function PopoverTrigger({ ...props }: React$1.ComponentProps<typeof Popover$1.Trigger>): React$1.JSX.Element;
declare function PopoverAnchor({ ...props }: React$1.ComponentProps<typeof Popover$1.Anchor>): React$1.JSX.Element;
declare function PopoverClose({ ...props }: React$1.ComponentProps<typeof Popover$1.Close>): React$1.JSX.Element;
declare function PopoverContent({ className, align, sideOffset, ...props }: React$1.ComponentProps<typeof Popover$1.Content>): React$1.JSX.Element;

declare function RadioGroup({ className, ...props }: React$1.ComponentProps<typeof RadioGroup$1.Root>): React$1.JSX.Element;
declare function RadioGroupItem({ className, ...props }: React$1.ComponentProps<typeof RadioGroup$1.Item>): React$1.JSX.Element;

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
declare function SearchableSelect({ value, onValueChange, options, placeholder, searchPlaceholder, className, disabled, allowCustom, customPlaceholder, }: SearchableSelectProps): React$1.JSX.Element;

declare function Select({ ...props }: React$1.ComponentProps<typeof SelectPrimitive.Root>): React$1.JSX.Element;
declare function SelectGroup({ ...props }: React$1.ComponentProps<typeof SelectPrimitive.Group>): React$1.JSX.Element;
declare function SelectValue({ ...props }: React$1.ComponentProps<typeof SelectPrimitive.Value>): React$1.JSX.Element;
declare function SelectTrigger({ className, size, children, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Trigger> & {
    size?: "sm" | "default" | "lg";
}): React$1.JSX.Element;
declare namespace SelectTrigger {
    var displayName: string;
}
declare function SelectContent({ className, children, position, align, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Content>): React$1.JSX.Element;
declare namespace SelectContent {
    var displayName: string;
}
declare function SelectLabel({ className, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Label>): React$1.JSX.Element;
declare namespace SelectLabel {
    var displayName: string;
}
declare function SelectItem({ className, children, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Item>): React$1.JSX.Element;
declare namespace SelectItem {
    var displayName: string;
}
declare function SelectSeparator({ className, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Separator>): React$1.JSX.Element;
declare namespace SelectSeparator {
    var displayName: string;
}
declare function SelectScrollUpButton({ className, ...props }: React$1.ComponentProps<typeof SelectPrimitive.ScrollUpButton>): React$1.JSX.Element;
declare namespace SelectScrollUpButton {
    var displayName: string;
}
declare function SelectScrollDownButton({ className, ...props }: React$1.ComponentProps<typeof SelectPrimitive.ScrollDownButton>): React$1.JSX.Element;
declare namespace SelectScrollDownButton {
    var displayName: string;
}

declare function Separator({ className, orientation, decorative, ...props }: React$1.ComponentProps<typeof Separator$1.Root>): React$1.JSX.Element;

declare function Skeleton({ className, ...props }: React.ComponentProps<"div">): React$1.JSX.Element;

declare function Switch({ className, size, ...props }: React$1.ComponentProps<typeof Switch$1.Root> & {
    size?: "sm" | "default";
}): React$1.JSX.Element;

declare const textareaVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TextareaProps extends React$1.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {
}
declare const Textarea: React$1.ForwardRefExoticComponent<TextareaProps & React$1.RefAttributes<HTMLTextAreaElement>>;

export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage, Button, type ButtonProps, Checkbox, Collapsible, CollapsibleContent, CollapsibleTrigger, type Column, DataTable, type DataTableProps, type DropdownGroup, type DropdownItem, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, type DropdownMenuProps, DropdownMenuRoot, DropdownMenuSeparator, DropdownMenuTrigger, Input, type InputProps, Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger, RadioGroup, RadioGroupItem, SearchableSelect, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Separator, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger, Skeleton, Switch, type TabItem, Tabs, type TabsProps, type TabsVariant, Textarea, type TextareaProps, Tooltip, TooltipContent, type TooltipProps, TooltipProvider, TooltipRoot, type TooltipSide, type TooltipSize, TooltipTrigger, type TooltipVariant, buttonVariants, inputVariants, textareaVariants };
