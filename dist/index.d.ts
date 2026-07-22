export { AlertDialog, AlertDialogAction, AlertDialogActionProps, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Calendar, CalendarGrid, CalendarHeader, CalendarProps, Card, CardBody, CardBodyProps, CardFooter, CardFooterProps, CardHeader, CardHeaderProps, CardImage, CardImageProps, CardProps, CardVariant, ConfirmDeleteDialog, DEFAULT_PASSWORD_RULES, Dialog, DialogBody, DialogBodyProps, DialogFooter, DialogFooterProps, DialogHeader, DialogHeaderProps, DialogProps, DialogSize, DialogVariant, EmptyState, EmptyStateProps, EmptyStateSize, GraficaBar, GraficaDonut, GraficaLine, Label, LabelBadge, LabelColor, LabelVariant, MonthGrid, Pagination, PaginationProps, PasswordInput, PasswordInputProps, PasswordRule, PasswordStrength, PasswordStrengthProps, YearGrid, formatDate, getDiasDelMes, isDisabledDay, isDisabledMonth, isDisabledYear, isPasswordValid, isSameDay, isWeekendDate, useDialogContext } from './components.js';
export { cn } from './utils.js';
export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage, Button, ButtonProps, Checkbox, Collapsible, CollapsibleContent, CollapsibleTrigger, Column, DataTable, DataTableProps, DropdownGroup, DropdownItem, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuProps, DropdownMenuRoot, DropdownMenuSeparator, DropdownMenuTrigger, Input, InputProps, Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger, RadioGroup, RadioGroupItem, SearchableSelect, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Separator, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger, Skeleton, Switch, TabItem, Tabs, TabsProps, TabsVariant, Textarea, TextareaProps, Tooltip, TooltipContent, TooltipProps, TooltipProvider, TooltipRoot, TooltipSide, TooltipSize, TooltipTrigger, TooltipVariant, buttonVariants, inputVariants, textareaVariants } from './primitives.js';
import 'react';
import 'class-variance-authority/types';
import '@radix-ui/react-label';
import 'class-variance-authority';
import 'radix-ui';
import 'clsx';
import '@radix-ui/react-dialog';
import '@radix-ui/react-tooltip';
import '@radix-ui/react-dropdown-menu';
import '@radix-ui/react-select';

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

export { formatHSLToStyle, getTenantThemeStyles };
