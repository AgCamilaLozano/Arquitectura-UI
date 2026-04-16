import * as React from 'react';
import React__default, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon, X, Loader2Icon, InfoIcon, TriangleAlertIcon, OctagonXIcon, CircleCheckIcon, Sun, Moon, Laptop } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx, jsxs } from 'react/jsx-runtime';
import { cva } from 'class-variance-authority';
import { useTheme, ThemeProvider as ThemeProvider$1 } from 'next-themes';
import { Toaster as Toaster$1, toast as toast$1 } from 'sonner';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var SelectContext = React.createContext(null);
function useSelect() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("Select components must be inside <Select>");
  return ctx;
}
function Select({
  value,
  onValueChange,
  children
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedLabel, setSelectedLabel] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const items = React.useRef([]);
  const rootRef = React.useRef(null);
  const registerItem = (item) => {
    items.current.push(item);
    return items.current.length - 1;
  };
  React.useEffect(() => {
    const item = items.current.find((i) => i.value === value);
    if (item) {
      setSelectedLabel(item.label);
    }
  }, [value]);
  React.useEffect(() => {
    const handle = (e) => {
      var _a;
      if (!((_a = rootRef.current) == null ? void 0 : _a.contains(e.target))) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);
  React.useEffect(() => {
    if (open) {
      items.current = [];
    }
  }, [open]);
  return /* @__PURE__ */ jsx(
    SelectContext.Provider,
    {
      value: {
        value,
        selectedLabel,
        onChange: (val, label) => {
          console.log("SELECT:", val, label);
          setSelectedLabel(label);
          onValueChange(val, label);
        },
        open,
        setOpen,
        activeIndex,
        setActiveIndex,
        items: items.current,
        registerItem
      },
      children: /* @__PURE__ */ jsx("div", { ref: rootRef, className: "relative inline-block", children })
    }
  );
}
function SelectTrigger({
  className,
  children
}) {
  const { open, setOpen, activeIndex, setActiveIndex, items } = useSelect();
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      role: "combobox",
      "aria-expanded": open,
      onClick: () => {
        setOpen(!open);
        if (!open) setActiveIndex(0);
      },
      className: cn(
        "border-border flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm shadow-xs",
        className
      ),
      children: [
        children,
        /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" })
      ]
    }
  );
}
function SelectValue({ placeholder }) {
  const { selectedLabel } = useSelect();
  return /* @__PURE__ */ jsx("span", { children: selectedLabel || placeholder });
}
function SelectContent({
  children,
  className,
  align = "start"
}) {
  const { open } = useSelect();
  const contentRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const [position, setPosition] = React.useState("bottom");
  React.useEffect(() => {
    if (!open) return;
    const trigger = document.querySelector(
      '[role="combobox"]'
    );
    if (!trigger) return;
    triggerRef.current = trigger;
    const rect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropdownHeight = 240;
    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      setPosition("top");
    } else {
      setPosition("bottom");
    }
  }, [open]);
  const alignClass = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0"
  }[align];
  if (!open) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: contentRef,
      role: "listbox",
      className: cn(
        "bg-background absolute z-[9999] min-w-[150px] rounded-md border shadow-md",
        position === "bottom" && "mt-1 top-full",
        position === "top" && "mb-1 bottom-full",
        alignClass,
        className
      ),
      children: /* @__PURE__ */ jsx("div", { className: "p-1", children })
    }
  );
}
function SelectItem({
  value,
  label,
  children
}) {
  const {
    value: selected,
    onChange,
    setOpen,
    registerItem,
    activeIndex,
    setActiveIndex
  } = useSelect();
  const ref = React.useRef(null);
  const index = React.useMemo(
    () => registerItem({ value, label, ref }),
    []
  );
  const isActive = index === activeIndex;
  const isSelected = selected === value;
  React.useEffect(() => {
    var _a;
    if (isActive) {
      (_a = ref.current) == null ? void 0 : _a.scrollIntoView({ block: "nearest" });
    }
  }, [isActive]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      role: "option",
      "aria-selected": isSelected,
      onMouseEnter: () => setActiveIndex(index),
      onMouseLeave: () => setActiveIndex(-1),
      onClick: () => {
        onChange(value, label);
        setOpen(false);
      },
      className: cn(
        "relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm z-[99]",
        isActive && "bg-accent-hover/20 text-accent",
        isSelected && "text-accent"
      ),
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute right-2", children: isSelected && /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }),
        children
      ]
    }
  );
}
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity disabled:cursor-not-allowed rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-accent text-white",
        outline: "border bg-background border-border shadow-xs hover:bg-accent/10",
        secondary: "bg-muted/90 text-secondary dark:text-primary shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)]",
        ghost: "hover:bg-accent/20 hover:text-purple-900 dark:hover:text-accent",
        link: "text-secondary-foreground hover:text-purple-900 dark:hover:text-accent underline-offset-6 decoration-[var(--border-accent)] hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 ",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 ",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React__default.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant, size } = _b, props = __objRest(_b, ["className", "variant", "size"]);
    return /* @__PURE__ */ jsx(
      "button",
      __spreadValues({
        className: buttonVariants({ variant, size, className }),
        ref
      }, props)
    );
  }
);
Button.displayName = "Button";
function Input(_a) {
  var _b = _a, { className, type } = _b, props = __objRest(_b, ["className", "type"]);
  return /* @__PURE__ */ jsx(
    "input",
    __spreadValues({
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-text-muted selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-border h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )
    }, props)
  );
}
var Textarea = React__default.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx(
      "textarea",
      __spreadValues({
        ref,
        className: cn(
          "w-full px-3 py-1 border border-border rounded-md text-sm",
          "focus:outline-none focus:shadow-[0_0_0_3px_var(--accent-soft)] focus:border-accent resize-none transition-all duration-200",
          className
        )
      }, props)
    );
  }
);
Textarea.displayName = "Textarea";
var colorVariantStyles = {
  neutral: {
    filled: "bg-primary text-background",
    soft: "bg-muted text-text-primary border border-border",
    outline: "border border-border text-text-primary bg-transparent"
  },
  accent: {
    filled: "bg-accent text-white",
    soft: "bg-accent-soft text-accent border border-accent/30",
    outline: "border border-accent text-accent bg-transparent"
  },
  success: {
    filled: "bg-text-success text-white",
    soft: "bg-success text-text-success border border-text-success/25",
    outline: "border border-text-success text-text-success bg-transparent"
  },
  error: {
    filled: "bg-text-error text-white",
    soft: "bg-error text-text-error border border-text-error/25",
    outline: "border border-text-error text-text-error bg-transparent"
  },
  warning: {
    filled: "bg-text-warning text-white",
    soft: "bg-warning text-text-warning border border-text-warning/25",
    outline: "border border-text-warning text-text-warning bg-transparent"
  },
  info: {
    filled: "bg-text-info text-white",
    soft: "bg-info text-text-info border border-text-info/25",
    outline: "border border-text-info text-text-info bg-transparent"
  }
};
var sizeStyles = {
  sm: "text-xs px-2 py-0.5 gap-1",
  md: "text-sm px-2.5 py-1 gap-1.5",
  lg: "text-sm px-3 py-1.5 gap-2"
};
var iconSizeStyles = {
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
  lg: "w-4 h-4"
};
function LabelBadge({
  label,
  variant = "soft",
  color = "neutral",
  size = "sm",
  icon,
  onRemove,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-md font-medium",
        colorVariantStyles[color][variant],
        sizeStyles[size],
        className
      ),
      children: [
        icon && /* @__PURE__ */ jsx("span", { className: cn("flex-shrink-0", iconSizeStyles[size]), children: icon }),
        label,
        onRemove && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onRemove,
            className: "ml-0.5 flex-shrink-0 rounded-full opacity-60 hover:opacity-100 transition-opacity focus:outline-none",
            "aria-label": `Eliminar ${label}`,
            children: /* @__PURE__ */ jsx(X, { className: iconSizeStyles[size] })
          }
        )
      ]
    }
  );
}
var variantStyles = {
  success: {
    container: "bg-success text-text-success border border-text-success/20",
    dot: "bg-text-success"
  },
  error: {
    container: "bg-error text-text-error border border-text-error/20",
    dot: "bg-text-error"
  },
  warning: {
    container: "bg-warning text-text-warning border border-text-warning/20",
    dot: "bg-text-warning"
  },
  info: {
    container: "bg-info text-text-info border border-text-info/20",
    dot: "bg-text-info"
  },
  idle: {
    container: "bg-muted text-text-muted border border-border",
    dot: "bg-text-muted"
  }
};
var sizeStylesStatus = {
  sm: "text-xs px-2 py-0.5 gap-1.5",
  md: "text-sm px-2.5 py-1 gap-2"
};
var dotSizeStyles = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2"
};
function StatusBadge({
  status,
  label,
  withDot = true,
  animated = false,
  size = "sm",
  className
}) {
  const { container, dot } = variantStyles[status];
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-md font-medium",
        container,
        sizeStylesStatus[size],
        className
      ),
      children: [
        withDot && /* @__PURE__ */ jsxs("span", { className: "relative flex items-center justify-center", children: [
          animated && /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "absolute inline-flex rounded-full opacity-75 animate-ping",
                dot,
                dotSizeStyles[size]
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "relative inline-flex rounded-full",
                dot,
                dotSizeStyles[size]
              )
            }
          )
        ] }),
        label
      ]
    }
  );
}
var variantClasses = {
  default: "bg-surface dark:bg-background border  shadow-[var(--shadow-surface)]",
  outlined: "bg-surface dark:bg-background border-2 border-border-strong",
  elevated: "bg-surface dark:bg-background border-1 shadow-[var(--shadow-card)]",
  accent: "bg-surface dark:bg-background border border-border border-l-4 border-l-accent shadow-[var(--shadow-surface)]",
  ghost: "bg-background dark:bg-surface border-0 shadow-none"
};
var paddingClasses = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7"
};
function Card({
  variant = "default",
  padding = "md",
  clickable = false,
  onClick,
  fullWidth = false,
  className = "",
  children
}) {
  const isInteractive = clickable || Boolean(onClick);
  return /* @__PURE__ */ jsx(
    "div",
    {
      onClick,
      className: `
        rounded-xl overflow-hidden transition-all duration-200 shadow-sm
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${fullWidth ? "w-full" : ""}
        ${isInteractive ? "cursor-pointer hover:border-accent hover:shadow-accent hover:-translate-y-0.5 active:scale-[0.99]" : ""}
        ${className}
      `,
      children
    }
  );
}
function CardHeader({
  title,
  subtitle,
  action,
  withDivider = false,
  className = ""
}) {
  return /* @__PURE__ */ jsx("div", { className: `${withDivider ? "pb-4 mb-4 border-b border-border" : "mb-3"} ${className}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-base text-lg font-semibold leading-snug", children: title }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm text-text-secondary", children: subtitle })
    ] }),
    action && /* @__PURE__ */ jsx("div", { className: "shrink-0", children: action })
  ] }) });
}
function CardBody({ className = "", children }) {
  return /* @__PURE__ */ jsx("div", { className: `text-sm text-text-primary ${className}`, children });
}
var footerAlignClasses = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
  between: "justify-between"
};
function CardFooter({
  align = "right",
  withDivider = false,
  className = "",
  children
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `
        flex items-center gap-2 mt-4
        ${withDivider ? "pt-4 border-t border-border" : ""}
        ${footerAlignClasses[align]}
        ${className}
      `,
      children
    }
  );
}
function CardImage({
  src,
  alt,
  height = "200px",
  className = ""
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `w-full overflow-hidden bg-muted ${className}`,
      style: { height },
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt,
          className: "w-full h-full object-cover"
        }
      )
    }
  );
}
var Toaster = (props) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    __spreadValues({
      theme,
      position: "bottom-left",
      closeButton: true,
      className: "toaster !z-[999]",
      icons: {
        success: /* @__PURE__ */ jsx(CircleCheckIcon, { className: "size-5 !text-text-success" }),
        error: /* @__PURE__ */ jsx(OctagonXIcon, { className: "size-5 !text-text-error" }),
        warning: /* @__PURE__ */ jsx(TriangleAlertIcon, { className: "size-5 !text-text-warning" }),
        info: /* @__PURE__ */ jsx(InfoIcon, { className: "size-5 !text-text-info" }),
        loading: /* @__PURE__ */ jsx(Loader2Icon, { className: "size-5 animate-spin" })
      },
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--text-primary)",
        "--border-radius": "var(--radius)"
      },
      toastOptions: {
        duration: 3e3,
        classNames: {
          title: "!text-md !font-bold uppercase",
          toast: "!border shadow-md !transition-all !rounded-md ",
          description: "!text-current !font-medium",
          success: "!border-text-success !bg-success !text-text-success !shadow-green-500/30",
          error: "!border-text-error !bg-error !text-text-error !shadow-red-500/30",
          warning: "!border-text-warning !bg-warning !text-text-warning !shadow-yellow-500/30",
          info: "!border-text-info !bg-info !text-text-info !shadow-blue-500/30",
          loading: "!border-accent !bg-accent-hover/80 !text-accent !shadow-accent/30",
          closeButton: "!bg-background !hover:bg-background/80 !text-current !border-current"
        }
      }
    }, props)
  );
};
var sideClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2"
};
var alignClasses = {
  start: "left-0 -translate-x-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0 translate-x-0"
};
var variantClasses2 = {
  default: `
        bg-primary text-background
        rounded-md
        px-3 py-1.5
        text-xs
        shadow-lg
    `,
  rich: `
        bg-surface text-primary
        border border-border
        rounded-lg
        px-4 py-3
        text-sm
        shadow-card
    `
};
var sizeClasses = {
  small: "max-w-[160px] px-2 py-1 text-xs",
  default: "max-w-[200px] px-3 py-1.5 text-xs",
  rich: "max-w-[280px] px-4 py-3 text-sm"
};
var Tooltip = ({
  content,
  children,
  side = "top",
  ariaLabel,
  align = "center",
  variant = "default",
  size,
  disabled = false
}) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const show = () => {
    if (disabled) return;
    timerRef.current = setTimeout(() => setVisible(true), 300);
  };
  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") hide();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  const resolvedSizeClass = size ? sizeClasses[size] : "";
  const accessibleLabel = ariaLabel != null ? ariaLabel : typeof content === "string" ? content : void 0;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative inline-flex items-center",
      onMouseEnter: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide,
      "aria-label": accessibleLabel,
      children: [
        children,
        visible && !disabled && /* @__PURE__ */ jsx(
          "div",
          {
            role: "tooltip",
            className: `
                        absolute ${sideClasses[side]} ${alignClasses[align]}
                        w-max
                        font-normal leading-relaxed
                        z-50
                        transition-opacity duration-150
                        animate-in fade-in
                        pointer-events-none
                        break-words
                        ${variantClasses2[variant]}
                        ${resolvedSizeClass}
                    `,
            children: content
          }
        )
      ]
    }
  );
};
var cellPaddingMap = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-4 text-base"
};
var alignMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};
function SortIcon({ direction }) {
  return /* @__PURE__ */ jsxs("span", { className: "inline-flex flex-col ml-1 gap-[2px] ", children: [
    /* @__PURE__ */ jsx(
      "svg",
      {
        className: `w-2.5 h-2.5 transition-colors ${direction === "asc" ? "text-accent" : "text-text-muted"}`,
        viewBox: "0 0 10 6",
        fill: "currentColor",
        children: /* @__PURE__ */ jsx("path", { d: "M5 0L10 6H0L5 0Z" })
      }
    ),
    /* @__PURE__ */ jsx(
      "svg",
      {
        className: `w-2.5 h-2.5 transition-colors ${direction === "desc" ? "text-accent" : "text-text-muted"}`,
        viewBox: "0 0 10 6",
        fill: "currentColor",
        children: /* @__PURE__ */ jsx("path", { d: "M5 6L0 0H10L5 6Z" })
      }
    )
  ] });
}
function SkeletonRow({ cols, selectable }) {
  return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border", children: [
    selectable && /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded bg-muted animate-pulse" }) }),
    Array.from({ length: cols }).map((_, i) => /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-3 rounded bg-muted animate-pulse",
        style: { width: `${60 + Math.random() * 30}%` }
      }
    ) }, i))
  ] });
}
function EmptyState({ content }) {
  return /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 999, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-text-muted gap-3", children: [
    /* @__PURE__ */ jsx(
      "svg",
      {
        className: "w-10 h-10 opacity-40",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 1.5,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "text-sm", children: content != null ? content : "No hay datos disponibles" })
  ] }) }) });
}
function Table({
  data,
  columns,
  rowKey,
  loading = false,
  skeletonRows = 5,
  emptyState,
  selectable = false,
  selectedRows,
  onSelectionChange,
  onRowClick,
  stickyHeader = false,
  variant = "default",
  size = "md",
  className = "",
  onSort
}) {
  const [internalSort, setInternalSort] = useState({
    key: "",
    direction: null
  });
  const [internalSelected, setInternalSelected] = useState(
    new Set(selectedRows != null ? selectedRows : [])
  );
  const activeSelected = selectedRows !== void 0 ? new Set(selectedRows) : internalSelected;
  const handleSort = (key) => {
    const next = {
      key,
      direction: internalSort.key === key ? internalSort.direction === "asc" ? "desc" : internalSort.direction === "desc" ? null : "asc" : "asc"
    };
    setInternalSort(next);
    onSort == null ? void 0 : onSort(next);
  };
  const sortedData = !onSort && internalSort.key && internalSort.direction ? [...data].sort((a, b) => {
    const aVal = a[internalSort.key];
    const bVal = b[internalSort.key];
    const cmp = typeof aVal === "number" && typeof bVal === "number" ? aVal - bVal : String(aVal).localeCompare(String(bVal));
    return internalSort.direction === "asc" ? cmp : -cmp;
  }) : data;
  const toggleRow = (id) => {
    const next = new Set(activeSelected);
    next.has(id) ? next.delete(id) : next.add(id);
    setInternalSelected(next);
    onSelectionChange == null ? void 0 : onSelectionChange(Array.from(next));
  };
  const toggleAll = () => {
    const allIds = sortedData.map((r) => r[rowKey]);
    const allSelected2 = allIds.every((id) => activeSelected.has(id));
    const next = allSelected2 ? /* @__PURE__ */ new Set() : new Set(allIds);
    setInternalSelected(next);
    onSelectionChange == null ? void 0 : onSelectionChange(Array.from(next));
  };
  const allSelected = sortedData.length > 0 && sortedData.every((r) => activeSelected.has(r[rowKey]));
  const someSelected = sortedData.some((r) => activeSelected.has(r[rowKey]));
  const rowVariantClass = (index, isSelected) => {
    const base = "border-b border-border transition-colors";
    const hover = onRowClick ? "cursor-pointer hover:bg-accent-hover" : "";
    const selected = isSelected ? "bg-accent-soft" : "";
    const striped = variant === "striped" && index % 2 !== 0 && !isSelected ? "bg-muted/40" : "";
    return [base, hover, selected, striped].filter(Boolean).join(" ");
  };
  const cellPadding = cellPaddingMap[size];
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `w-full overflow-visible rounded-md border border-border bg-surface/50 scrollbar-soft ${className}`,
      style: { boxShadow: "var(--shadow-card)" },
      children: /* @__PURE__ */ jsxs(
        "table",
        {
          className: `w-full border-collapse ${variant === "bordered" ? "border border-border" : ""}`,
          children: [
            /* @__PURE__ */ jsx(
              "thead",
              {
                className: `bg-muted text-text-secondary ${stickyHeader ? "sticky top-0 z-10" : ""}`,
                children: /* @__PURE__ */ jsxs("tr", { children: [
                  selectable && /* @__PURE__ */ jsx("th", { className: `${cellPadding} w-10`, children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      type: "checkbox",
                      checked: allSelected,
                      ref: (el) => {
                        if (el) el.indeterminate = someSelected && !allSelected;
                      },
                      onChange: toggleAll,
                      className: "accent-accent w-4 h-4 rounded cursor-pointer",
                      "aria-label": "Seleccionar todas las filas"
                    }
                  ) }),
                  columns.map((col) => {
                    var _a;
                    const key = String(col.key);
                    const isActive = internalSort.key === key;
                    return /* @__PURE__ */ jsx(
                      "th",
                      {
                        className: [
                          cellPadding,
                          "font-bold tracking-widest uppercase text-xs",
                          alignMap[(_a = col.align) != null ? _a : "left"],
                          col.sortable ? "select-none cursor-pointer hover:text-text-primary transition-colors" : "",
                          variant === "bordered" ? "border border-border" : ""
                        ].filter(Boolean).join(" "),
                        style: { width: col.width },
                        onClick: col.sortable ? () => handleSort(key) : void 0,
                        "aria-sort": isActive ? internalSort.direction === "asc" ? "ascending" : "descending" : "none",
                        children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
                          col.header,
                          col.sortable && /* @__PURE__ */ jsx(SortIcon, { direction: isActive ? internalSort.direction : null })
                        ] })
                      },
                      key
                    );
                  })
                ] })
              }
            ),
            /* @__PURE__ */ jsxs("tbody", { className: "overflorw-y-auto scrollbar-soft", children: [
              loading && Array.from({ length: skeletonRows }).map((_, i) => /* @__PURE__ */ jsx(SkeletonRow, { cols: columns.length, selectable }, i)),
              !loading && sortedData.length === 0 && /* @__PURE__ */ jsx(EmptyState, { content: emptyState }),
              !loading && sortedData.map((row, index) => {
                const id = row[rowKey];
                const isSelected = activeSelected.has(id);
                return /* @__PURE__ */ jsxs(
                  "tr",
                  {
                    className: rowVariantClass(index, isSelected),
                    onClick: () => {
                      onRowClick == null ? void 0 : onRowClick(row);
                      if (selectable) toggleRow(id);
                    },
                    children: [
                      selectable && /* @__PURE__ */ jsx("td", { className: cellPadding, children: /* @__PURE__ */ jsx(
                        Input,
                        {
                          type: "checkbox",
                          checked: isSelected,
                          onChange: () => toggleRow(id),
                          onClick: (e) => e.stopPropagation(),
                          className: "accent-accent w-4 h-4 rounded cursor-pointer",
                          "aria-label": `Seleccionar fila ${index + 1}`
                        }
                      ) }),
                      columns.map((col) => {
                        var _a, _b;
                        const key = String(col.key);
                        const value = col.render ? col.render(row, index) : String((_a = row[col.key]) != null ? _a : "\u2014");
                        return /* @__PURE__ */ jsx(
                          "td",
                          {
                            className: [
                              cellPadding,
                              "text-text-primary",
                              alignMap[(_b = col.align) != null ? _b : "left"],
                              variant === "bordered" ? "border border-border" : ""
                            ].filter(Boolean).join(" "),
                            children: value
                          },
                          key
                        );
                      })
                    ]
                  },
                  String(id)
                );
              })
            ] })
          ]
        }
      )
    }
  );
}
function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");
  return /* @__PURE__ */ jsxs("nav", { className: "flex items-center space-x-2 text-xs tracking-widest font-semibold text-text-muted whitespace-nowrap overflow-x-auto scrollbar-hide", children: [
    segments.length === 0 ? /* @__PURE__ */ jsx("span", { className: "text-text-primary", children: "INICIO" }) : /* @__PURE__ */ jsx(Link, { href: "/", className: "hover:text-text-primary transition-colors flex items-center", children: "INICIO" }),
    segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const isLast = index === segments.length - 1;
      let name = decodeURIComponent(segment).replace(/[-_]/g, " ").toUpperCase();
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-text-muted/50", children: "/" }),
        isLast ? /* @__PURE__ */ jsx("span", { className: "text-text-primary", children: name }) : /* @__PURE__ */ jsx(Link, { href, className: "hover:text-text-primary transition-colors", children: name })
      ] }, href);
    })
  ] });
}
function ThemeProvider(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx(ThemeProvider$1, __spreadProps(__spreadValues({}, props), { children }));
}
function AnimatedIconButton({ Icon, onClick }) {
  const iconRef = useRef(null);
  return /* @__PURE__ */ jsx("button", { onClick, className: "group", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-muted/50 rounded-full p-2 text-sm transition-all duration-300 transform group-hover:scale-110 active:scale-95 group-hover:shadow-2xl", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1 right-5 rounded-full w-3 h-3 bg-muted/50" }),
    /* @__PURE__ */ jsx("div", { ref: iconRef, children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 z-50" }) })
  ] }) });
}
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  React.useEffect(() => {
    setMounted(true);
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (!mounted) {
    return /* @__PURE__ */ jsxs(
      "button",
      {
        className: "inline-flex items-center justify-center rounded-md border border-border bg-transparent p-2 text-sm font-medium text-foreground transition-colors",
        "aria-label": "Cargando tema",
        disabled: true,
        children: [
          /* @__PURE__ */ jsx(Sun, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" })
        ]
      }
    );
  }
  const CurrentIcon = theme === "dark" ? Moon : theme === "system" ? Laptop : Sun;
  return /* @__PURE__ */ jsxs("div", { className: "relative", ref: menuRef, children: [
    /* @__PURE__ */ jsx(
      AnimatedIconButton,
      {
        onClick: () => setIsOpen(!isOpen),
        "aria-label": "Cambiar tema",
        Icon: CurrentIcon
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" }),
    isOpen && /* @__PURE__ */ jsx("div", { className: "absolute top-full mt-2 right-0 w-40 rounded-md border border-border-sidebar bg-background text-text-primary shadow-lg z-[9999]", children: /* @__PURE__ */ jsxs("div", { className: "py-1", role: "menu", "aria-orientation": "vertical", "aria-labelledby": "options-menu", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => {
        setTheme("light");
        setIsOpen(false);
      }, className: "flex w-full items-center px-4 py-2 text-sm hover:bg-accent-hover/20 hover:text-accent", children: [
        /* @__PURE__ */ jsx(Sun, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Claro" })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => {
        setTheme("dark");
        setIsOpen(false);
      }, className: "flex w-full items-center px-4 py-2 text-sm hover:bg-accent-hover/20 hover:text-accent", children: [
        /* @__PURE__ */ jsx(Moon, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Oscuro" })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => {
        setTheme("system");
        setIsOpen(false);
      }, className: "flex w-full items-center px-4 py-2 text-sm hover:bg-accent-hover/20 hover:text-accent", children: [
        /* @__PURE__ */ jsx(Laptop, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Sistema" })
      ] })
    ] }) })
  ] });
}
var toast = {
  success: (title, options) => toast$1.success(title, {
    description: options == null ? void 0 : options.description,
    duration: options == null ? void 0 : options.duration,
    action: options == null ? void 0 : options.action
  }),
  error: (title, options) => toast$1.error(title, {
    description: options == null ? void 0 : options.description,
    duration: options == null ? void 0 : options.duration,
    action: options == null ? void 0 : options.action
  }),
  warning: (title, options) => toast$1.warning(title, {
    description: options == null ? void 0 : options.description,
    duration: options == null ? void 0 : options.duration,
    action: options == null ? void 0 : options.action
  }),
  info: (title, options) => toast$1.info(title, {
    description: options == null ? void 0 : options.description,
    duration: options == null ? void 0 : options.duration,
    action: options == null ? void 0 : options.action
  }),
  loading: (title, options) => toast$1.loading(title, {
    description: options == null ? void 0 : options.description
  }),
  promise: (promise, messages) => toast$1.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error
  }),
  custom: (jsx18) => toast$1(jsx18)
};

export { Breadcrumbs, Button, Card, CardBody, CardFooter, CardHeader, CardImage, Input, LabelBadge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, StatusBadge, Table, Textarea, ThemeProvider, ThemeToggle, Toaster, Tooltip, buttonVariants, cn, toast };
