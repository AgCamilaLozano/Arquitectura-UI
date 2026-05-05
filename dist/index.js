"use client";
"use client";
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

// components/ui/Base/Selects/select.tsx
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";

// lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// components/ui/Base/Selects/select.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Select(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(SelectPrimitive.Root, __spreadValues({ "data-slot": "select" }, props));
}
function SelectGroup(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(SelectPrimitive.Group, __spreadValues({ "data-slot": "select-group" }, props));
}
function SelectValue(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(SelectPrimitive.Value, __spreadValues({ "data-slot": "select-value" }, props));
}
function SelectTrigger(_a) {
  var _b = _a, {
    className,
    size = "default",
    children
  } = _b, props = __objRest(_b, [
    "className",
    "size",
    "children"
  ]);
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    __spreadProps(__spreadValues({
      "data-slot": "select-trigger",
      type: "button",
      "data-size": size,
      className: cn(
        "border-border data-[placeholder]:text-text-muted [&_svg:not([class*='text-'])]:text-text-muted focus-visible:border-ring focus-visible:ring-border-soft/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-background dark:hover:bg-backgraund flex w-fit items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    })
  );
}
function SelectContent(_a) {
  var _b = _a, {
    className,
    children,
    position = "item-aligned",
    align = "center"
  } = _b, props = __objRest(_b, [
    "className",
    "children",
    "position",
    "align"
  ]);
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    __spreadProps(__spreadValues({
      "data-slot": "select-content",
      className: cn(
        "bg-background text-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      align
    }, props), {
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    })
  ) });
}
function SelectLabel(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    SelectPrimitive.Label,
    __spreadValues({
      "data-slot": "select-label",
      className: cn("text-muted-foreground px-2 py-1.5 text-xs border-b", className)
    }, props)
  );
}
function SelectItem(_a) {
  var _b = _a, {
    className,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "children"
  ]);
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    __spreadProps(__spreadValues({
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent-hover focus:text-accent [&_svg:not([class*='text-'])]:text-text-muted relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            "data-slot": "select-item-indicator",
            className: "absolute right-2 flex size-3.5 items-center justify-center",
            children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) })
          }
        ),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    })
  );
}
function SelectSeparator(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    SelectPrimitive.Separator,
    __spreadValues({
      "data-slot": "select-separator",
      className: cn("bg-border-border pointer-events-none -mx-1 my-1 h-px", className)
    }, props)
  );
}
function SelectScrollUpButton(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    __spreadProps(__spreadValues({
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
    })
  );
}
function SelectScrollDownButton(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    __spreadProps(__spreadValues({
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
    })
  );
}

// components/ui/Base/Selects/MultiSelect.tsx
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Seleccionar...",
  className
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const toggle = (value) => {
    onChange(
      selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]
    );
  };
  const normalized = options.map(
    (opt) => typeof opt === "string" ? { label: opt, value: opt } : opt
  );
  const selectedLabels = normalized.filter((o) => selected.includes(o.value)).map((o) => o.label);
  return /* @__PURE__ */ jsxs2("div", { ref, className: cn("relative", className), children: [
    /* @__PURE__ */ jsxs2(
      "button",
      {
        type: "button",
        onClick: () => setOpen((prev) => !prev),
        className: cn(
          "flex items-center justify-between gap-2 min-w-[180px] opacity-100 h-9 rounded-md border border-border px-3 py-2 text-sm shadow-sm",
          "text-muted-foreground hover:opacity-70"
        ),
        children: [
          /* @__PURE__ */ jsx2("span", { children: selected.length === 0 ? placeholder : `${placeholder} (${selected.length})` }),
          /* @__PURE__ */ jsx2(ChevronDown, { className: cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180") })
        ]
      }
    ),
    open && /* @__PURE__ */ jsx2("div", { className: "absolute z-50 mt-1 min-w-[180px] max-h-[250px] overflow-y-auto scrollbar-soft rounded-md border border-border shadow-md bg-surface dark:bg-background", children: /* @__PURE__ */ jsx2("div", { className: "p-1 flex flex-col", children: normalized.map((option) => {
      const isSelected = selected.includes(option.value);
      return /* @__PURE__ */ jsxs2(
        "button",
        {
          type: "button",
          onClick: () => toggle(option.value),
          className: "group flex items-center gap-2 px-2 py-1.5 rounded-sm text-sm text-left hover:bg-accent-hover/20 hover:border-accent hover:text-accent w-full",
          children: [
            /* @__PURE__ */ jsx2(
              "span",
              {
                className: cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-border group-hover:border-accent",
                  isSelected ? "bg-accent text-white border-accent" : "bg-transparent"
                ),
                children: isSelected && /* @__PURE__ */ jsx2(Check, { className: "h-3 w-3" })
              }
            ),
            option.label
          ]
        },
        option.value
      );
    }) }) })
  ] });
}

// components/ui/Base/Entradas/button.tsx
import React from "react";
import { cva } from "class-variance-authority";
import { jsx as jsx3 } from "react/jsx-runtime";
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
var Button = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant, size } = _b, props = __objRest(_b, ["className", "variant", "size"]);
    return /* @__PURE__ */ jsx3(
      "button",
      __spreadValues({
        className: buttonVariants({ variant, size, className }),
        ref
      }, props)
    );
  }
);
Button.displayName = "Button";

// components/ui/Base/Entradas/input.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Input(_a) {
  var _b = _a, { className, type } = _b, props = __objRest(_b, ["className", "type"]);
  return /* @__PURE__ */ jsx4(
    "input",
    __spreadValues({
      type,
      "data-slot": "input",
      className: cn(
        "file:text-text-secondary placeholder:text-text-muted selection:bg-accent-soft selection:text-accent border-border h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )
    }, props)
  );
}

// components/ui/Base/Entradas/textarea.tsx
import React2 from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var Textarea = React2.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx5(
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

// components/ui/Compuesto/Badges/LabelBadge.tsx
import { X } from "lucide-react";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs3(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-md font-medium",
        colorVariantStyles[color][variant],
        sizeStyles[size],
        className
      ),
      children: [
        icon && /* @__PURE__ */ jsx6("span", { className: cn("flex-shrink-0", iconSizeStyles[size]), children: icon }),
        label,
        onRemove && /* @__PURE__ */ jsx6(
          "button",
          {
            type: "button",
            onClick: onRemove,
            className: "ml-0.5 flex-shrink-0 rounded-full opacity-60 hover:opacity-100 transition-opacity focus:outline-none",
            "aria-label": `Eliminar ${label}`,
            children: /* @__PURE__ */ jsx6(X, { className: iconSizeStyles[size] })
          }
        )
      ]
    }
  );
}

// components/ui/Compuesto/Badges/StatusBadge.tsx
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs4(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-md font-medium",
        container,
        sizeStylesStatus[size],
        className
      ),
      children: [
        withDot && /* @__PURE__ */ jsxs4("span", { className: "relative flex items-center justify-center", children: [
          animated && /* @__PURE__ */ jsx7(
            "span",
            {
              className: cn(
                "absolute inline-flex rounded-full opacity-75 animate-ping",
                dot,
                dotSizeStyles[size]
              )
            }
          ),
          /* @__PURE__ */ jsx7(
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

// components/ui/Compuesto/Modals/Card.tsx
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var variantClasses = {
  default: "bg-background border border-border",
  outlined: "bg-background border border-accent",
  elevated: "bg-background border-1 ",
  accent: "bg-background border border-border border-l-2 border-l-accent shadow-[var(--shadow-surface)]",
  ghost: "bg-surface border-0 shadow-none"
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
  return /* @__PURE__ */ jsx8(
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
  return /* @__PURE__ */ jsx8("div", { className: `${withDivider ? "pb-4 mb-4 border-b border-border" : "mb-3"} ${className}`, children: /* @__PURE__ */ jsxs5("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxs5("div", { children: [
      /* @__PURE__ */ jsx8("h3", { className: "text-base text-lg font-semibold leading-snug", children: title }),
      subtitle && /* @__PURE__ */ jsx8("p", { className: "mt-0.5 text-sm text-text-secondary", children: subtitle })
    ] }),
    action && /* @__PURE__ */ jsx8("div", { className: "shrink-0", children: action })
  ] }) });
}
function CardBody({ className = "", children }) {
  return /* @__PURE__ */ jsx8("div", { className: `text-sm text-text-primary ${className}`, children });
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
  return /* @__PURE__ */ jsx8(
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
  return /* @__PURE__ */ jsx8(
    "div",
    {
      className: `w-full overflow-hidden bg-muted ${className}`,
      style: { height },
      children: /* @__PURE__ */ jsx8(
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

// components/ui/Compuesto/Modals/Dialog.tsx
import React3, { useEffect as useEffect2, useCallback } from "react";
import { X as X2 } from "lucide-react";
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
var sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl"
};
function Dialog({
  open,
  onClose,
  variant = "default",
  size = "md",
  closeOnOverlay = true,
  hideCloseButton = false,
  className = "",
  children
}) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  useEffect2(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);
  if (!open) return null;
  return (
    /* Overlay */
    /* @__PURE__ */ jsxs6(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        children: [
          /* @__PURE__ */ jsx9(
            "div",
            {
              className: "absolute inset-0 bg-black/50 animate-in fade-in duration-200",
              onClick: closeOnOverlay ? onClose : void 0,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxs6(
            "div",
            {
              className: `
          relative z-10 w-full
          bg-surface dark:bg-background
          rounded-xl overflow-hidden
          border border-border
          shadow-[var(--shadow-card)]
          animate-in fade-in zoom-in-95 duration-200
          ${sizeClasses[size]}
          ${className}
        `,
              children: [
                !hideCloseButton && /* @__PURE__ */ jsx9(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon-sm",
                    onClick: onClose,
                    "aria-label": "Cerrar",
                    className: "absolute top-3 right-3 text-text-muted hover:text-text-primary",
                    children: /* @__PURE__ */ jsx9(X2, {})
                  }
                ),
                /* @__PURE__ */ jsx9(DialogContext.Provider, { value: { variant }, children })
              ]
            }
          )
        ]
      }
    )
  );
}
var DialogContext = React3.createContext({
  variant: "default"
});
var useDialogContext = () => React3.useContext(DialogContext);
var variantIconBg = {
  default: "bg-accent-soft text-accent",
  destructive: "bg-error text-text-error",
  warning: "bg-warning text-text-warning",
  info: "bg-info text-text-info"
};
function DialogHeader({
  title,
  description,
  icon,
  withDivider = false,
  className = ""
}) {
  const { variant } = useDialogContext();
  return /* @__PURE__ */ jsx9(
    "div",
    {
      className: `
        px-6 pt-6
        ${withDivider ? "pb-4 border-b border-border" : "pb-2"}
        ${className}
      `,
      children: /* @__PURE__ */ jsxs6("div", { className: "flex items-start gap-3", children: [
        icon && /* @__PURE__ */ jsx9(
          "span",
          {
            className: `
              mt-0.5 flex items-center justify-center
              w-9 h-9 rounded-lg shrink-0
              ${variantIconBg[variant]}
            `,
            children: icon
          }
        ),
        /* @__PURE__ */ jsxs6("div", { className: "flex-1 min-w-0 pr-6", children: [
          /* @__PURE__ */ jsx9("h2", { className: "font-heading text-base font-semibold leading-snug text-text-primary", children: title }),
          description && /* @__PURE__ */ jsx9("p", { className: "mt-1 text-sm text-text-secondary leading-relaxed", children: description })
        ] })
      ] })
    }
  );
}
function DialogBody({
  scrollable = false,
  className = "",
  children
}) {
  return /* @__PURE__ */ jsx9(
    "div",
    {
      className: `
        px-6 py-4 text-sm text-text-primary
        ${scrollable ? "overflow-y-auto max-h-[60vh] scrollbar-soft" : ""}
        ${className}
      `,
      children
    }
  );
}
var footerAlignClasses2 = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
  between: "justify-between"
};
function DialogFooter({
  align = "right",
  withDivider = true,
  className = "",
  children
}) {
  return /* @__PURE__ */ jsx9(
    "div",
    {
      className: `
        flex items-center flex-wrap gap-2 px-6 pb-5 pt-4
        ${withDivider ? "border-t border-border" : ""}
        ${footerAlignClasses2[align]}
        ${className}
      `,
      children
    }
  );
}

// components/ui/Compuesto/Toaster.tsx
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon
} from "lucide-react";
import { jsx as jsx10 } from "react/jsx-runtime";
var Toaster = (props) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx10(
    Sonner,
    __spreadValues({
      theme,
      position: "bottom-left",
      closeButton: true,
      className: "toaster !z-[999]",
      icons: {
        success: /* @__PURE__ */ jsx10(CircleCheckIcon, { className: "size-5 !text-text-success" }),
        error: /* @__PURE__ */ jsx10(OctagonXIcon, { className: "size-5 !text-text-error" }),
        warning: /* @__PURE__ */ jsx10(TriangleAlertIcon, { className: "size-5 !text-text-warning" }),
        info: /* @__PURE__ */ jsx10(InfoIcon, { className: "size-5 !text-text-info" }),
        loading: /* @__PURE__ */ jsx10(Loader2Icon, { className: "size-5 animate-spin" })
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

// components/ui/Compuesto/Tooltip.tsx
import { useState as useState2, useEffect as useEffect3, useRef as useRef2 } from "react";
import { jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
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
var sizeClasses2 = {
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
  const [visible, setVisible] = useState2(false);
  const timerRef = useRef2(null);
  const show = () => {
    if (disabled) return;
    timerRef.current = setTimeout(() => setVisible(true), 300);
  };
  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };
  useEffect3(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") hide();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  const resolvedSizeClass = size ? sizeClasses2[size] : "";
  const accessibleLabel = ariaLabel != null ? ariaLabel : typeof content === "string" ? content : void 0;
  return /* @__PURE__ */ jsxs7(
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
        visible && !disabled && /* @__PURE__ */ jsx11(
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

// components/ui/Compuesto/dropdown-menu.tsx
import { useEffect as useEffect4, useRef as useRef3, useState as useState3 } from "react";
import { jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
var alignMap = {
  left: "left-0",
  right: "right-0",
  center: "left-1/2 -translate-x-1/2"
};
function DropdownMenu({
  trigger,
  groups,
  align = "left",
  width = "w-52",
  disabled = false,
  className = ""
}) {
  const [open, setOpen] = useState3(false);
  const containerRef = useRef3(null);
  useEffect4(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  useEffect4(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);
  const handleItemClick = (item) => {
    var _a;
    if (item.disabled) return;
    (_a = item.onClick) == null ? void 0 : _a.call(item);
    setOpen(false);
  };
  return /* @__PURE__ */ jsxs8("div", { ref: containerRef, className: `relative  inline-block ${className}`, children: [
    /* @__PURE__ */ jsxs8(
      "button",
      {
        type: "button",
        onClick: () => !disabled && setOpen((prev) => !prev),
        disabled,
        "aria-haspopup": "menu",
        "aria-expanded": open,
        className: [
          "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
          "border border-border bg-surface text-text-primary",
          "transition-colors duration-150",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          disabled ? "cursor-not-allowed opacity-50" : "hover:bg-muted cursor-pointer",
          open ? "ring-2 ring-accent" : ""
        ].filter(Boolean).join(" "),
        children: [
          trigger,
          /* @__PURE__ */ jsx12(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "14",
              height: "14",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: `text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`,
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsx12("polyline", { points: "6 9 12 15 18 9" })
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsx12(
      "div",
      {
        role: "menu",
        "aria-orientation": "vertical",
        className: [
          "absolute  z-[9999] mt-2",
          alignMap[align],
          width,
          "rounded-xl border border-border bg-surface py-1",
          "shadow-[var(--shadow-card)]",
          "animate-in fade-in-0 zoom-in-95 duration-150"
        ].join(" "),
        children: groups.map((group, gIdx) => /* @__PURE__ */ jsxs8("div", { children: [
          group.groupLabel && /* @__PURE__ */ jsx12("p", { className: "px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted select-none", children: group.groupLabel }),
          group.items.map((item, iIdx) => /* @__PURE__ */ jsxs8("div", { children: [
            /* @__PURE__ */ jsxs8(
              "button",
              {
                role: "menuitem",
                type: "button",
                disabled: item.disabled,
                onClick: () => handleItemClick(item),
                className: [
                  "flex w-full items-center gap-2.5 px-3 py-2 text-sm text-left",
                  "transition-colors duration-100",
                  item.disabled ? "cursor-not-allowed text-text-disabled" : item.variant === "danger" ? "cursor-pointer text-text-error hover:bg-error" : "cursor-pointer text-text-primary hover:bg-accent-soft hover:text-accent"
                ].filter(Boolean).join(" "),
                children: [
                  item.icon && /* @__PURE__ */ jsx12("span", { className: "shrink-0 text-current", "aria-hidden": "true", children: item.icon }),
                  /* @__PURE__ */ jsx12("span", { className: "flex-1", children: item.label }),
                  item.trailingIcon && /* @__PURE__ */ jsx12("span", { className: "shrink-0 text-text-muted", "aria-hidden": "true", children: item.trailingIcon })
                ]
              }
            ),
            item.separator && /* @__PURE__ */ jsx12("hr", { className: "my-1 border-border" })
          ] }, iIdx)),
          gIdx < groups.length - 1 && /* @__PURE__ */ jsx12("hr", { className: "my-1 border-border" })
        ] }, gIdx))
      }
    )
  ] });
}

// components/ui/DataDisplay/Graficas/GraficaBar.tsx
import { useState as useState4, useRef as useRef4 } from "react";
import { jsx as jsx13, jsxs as jsxs9 } from "react/jsx-runtime";
var chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)"
];
var GraficaBar = ({
  className,
  data,
  title,
  description,
  height = 240,
  barRadius = 2,
  animated = true,
  legendLabel,
  yLabel
}) => {
  const [hoveredIndex, setHoveredIndex] = useState4(null);
  const containerRef = useRef4(null);
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const ceilMax = Math.ceil(maxValue * 1.15);
  const padding = { top: 16, bottom: 36, left: 52, right: 16 };
  const svgW = Math.max(data.length * 72 + padding.left + padding.right, 320);
  const chartH = height - padding.top - padding.bottom;
  const yTicks = Array.from({ length: 5 }, (_, i) => Math.round(ceilMax / 4 * i));
  const formatVal = (n) => {
    if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
    if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
    return n.toString();
  };
  const [tooltip, setTooltip] = useState4(null);
  return /* @__PURE__ */ jsxs9(
    "div",
    {
      ref: containerRef,
      className: "relative rounded-2xl border border-border bg-background shadow-sm p-5",
      onMouseLeave: () => {
        setHoveredIndex(null);
        setTooltip(null);
      },
      children: [
        title && /* @__PURE__ */ jsx13("p", { className: "text-sm font-semibold text-text-primary", children: title }),
        description && /* @__PURE__ */ jsx13("p", { className: "text-xs text-text-muted mt-0.5 mb-2", children: description }),
        /* @__PURE__ */ jsxs9("div", { className: "w-full relative overflow-hidden", children: [
          /* @__PURE__ */ jsxs9("svg", { width: "100%", viewBox: `0 0 ${svgW} ${height}`, className: "select-none relative z-0", children: [
            yLabel && /* @__PURE__ */ jsx13(
              "text",
              {
                x: 10,
                y: padding.top - 5,
                fill: "var(--text-muted)",
                fontSize: 10,
                fontWeight: 600,
                children: yLabel
              }
            ),
            /* @__PURE__ */ jsxs9("g", { transform: `translate(${padding.left}, ${padding.top + 10})`, children: [
              yTicks.map((tick) => {
                const y = chartH - tick / ceilMax * chartH;
                return /* @__PURE__ */ jsxs9("g", { children: [
                  /* @__PURE__ */ jsx13(
                    "line",
                    {
                      x1: 0,
                      y1: y,
                      x2: svgW - padding.left - padding.right,
                      y2: y,
                      stroke: "var(--border-default)",
                      strokeDasharray: "4 3"
                    }
                  ),
                  /* @__PURE__ */ jsx13("text", { x: -10, y: y + 4, textAnchor: "end", fill: "var(--text-muted)", fontSize: 10, children: formatVal(tick) })
                ] }, tick);
              }),
              data.map((item, i) => {
                const barH = item.value / ceilMax * chartH;
                const x = i * 72 + 16;
                const isHov = hoveredIndex === i;
                return /* @__PURE__ */ jsxs9("g", { children: [
                  /* @__PURE__ */ jsx13(
                    "rect",
                    {
                      x: x - 4,
                      y: 0,
                      width: 28,
                      height: chartH,
                      fill: "transparent",
                      style: { cursor: "pointer" },
                      onMouseEnter: (e) => {
                        var _a;
                        setHoveredIndex(i);
                        const containerRect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
                        const svgEl = e.currentTarget.closest("svg");
                        const svgRect = svgEl == null ? void 0 : svgEl.getBoundingClientRect();
                        if (!containerRect || !svgRect) return;
                        const scaleX = svgRect.width / svgW;
                        const scaleY = svgRect.height / height;
                        const xCenter = (x + 35 + padding.left) * scaleX + (svgRect.left - containerRect.left);
                        const yTop = (chartH - barH + padding.top) * scaleY + (svgRect.top - containerRect.top);
                        setTooltip({ x: xCenter, y: yTop, label: item.label, value: item.value });
                      }
                    }
                  ),
                  isHov && /* @__PURE__ */ jsx13(
                    "rect",
                    {
                      x: x - 6,
                      y: 0,
                      width: 42,
                      height: chartH,
                      rx: 8,
                      fill: chartColors[i % chartColors.length],
                      opacity: 0.08,
                      className: "transition-all duration-300"
                    }
                  ),
                  /* @__PURE__ */ jsx13(
                    "rect",
                    {
                      x,
                      y: chartH - barH,
                      width: 28,
                      height: barH,
                      rx: barRadius,
                      fill: chartColors[i % chartColors.length],
                      opacity: isHov ? 1 : 0.85,
                      className: "transition-all duration-300 ease-out pointer-events-none",
                      style: {
                        filter: isHov ? `drop-shadow(0 4px 8px ${chartColors[i % chartColors.length]}40)` : "none"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsx13(
                    "text",
                    {
                      x: x + 14,
                      y: chartH + 18,
                      textAnchor: "middle",
                      fill: isHov ? "var(--text-primary)" : "var(--text-muted)",
                      fontSize: 11,
                      fontWeight: isHov ? 600 : 400,
                      className: "pointer-events-none transition-all duration-200",
                      children: item.label
                    }
                  )
                ] }, i);
              }),
              /* @__PURE__ */ jsx13("line", { x1: 0, y1: chartH, x2: svgW - padding.left - padding.right, y2: chartH, stroke: "var(--border-strong)" })
            ] }),
            /* @__PURE__ */ jsx13("style", { children: `
                        @keyframes barGrow {
                            from { transform: scaleY(0); opacity: 0; }
                            to   { transform: scaleY(1); opacity: 1; }
                        }
                    ` })
          ] }),
          tooltip && /* @__PURE__ */ jsx13(
            "div",
            {
              className: "absolute z-50 pointer-events-none transition-all duration-150",
              style: {
                left: tooltip.x,
                top: tooltip.y,
                transform: "translate(calc(-50% - 10px), calc(-50% - 10px))"
              },
              children: /* @__PURE__ */ jsxs9("div", { className: "relative bg-[#0A0A0B] text-white text-xs rounded-lg px-3 py-2 shadow-2xl border border-white/10 backdrop-blur-sm whitespace-nowrap", children: [
                /* @__PURE__ */ jsx13("p", { className: "text-[11px] text-center", children: tooltip.label }),
                /* @__PURE__ */ jsx13("p", { className: "text-sm font-semibold", children: formatVal(tooltip.value) })
              ] })
            }
          )
        ] }),
        legendLabel && /* @__PURE__ */ jsx13("div", { className: "flex justify-center items-center gap-2 mt-4 px-2", children: /* @__PURE__ */ jsxs9("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx13(
            "div",
            {
              className: "w-3 h-3 rounded-sm",
              style: { backgroundColor: chartColors[0] }
            }
          ),
          /* @__PURE__ */ jsx13("span", { className: "text-sm font-medium", children: legendLabel })
        ] }) })
      ]
    }
  );
};
var GraficaBar_default = GraficaBar;

// components/ui/DataDisplay/Graficas/GraficaDonut.tsx
import { useState as useState5 } from "react";
import { Fragment, jsx as jsx14, jsxs as jsxs10 } from "react/jsx-runtime";
var chartColors2 = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)"
];
var GraficaDonut = ({
  data,
  title,
  description,
  size = 300,
  strokeWidth = 40,
  loading = false,
  showTotal = true,
  totalValue,
  formatValue = (v) => `${v}%`
}) => {
  const [hoveredIndex, setHoveredIndex] = useState5(null);
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  let accumulated = 0;
  const segmentMeta = data.map((segment, i) => {
    const percentage = segment.value / total;
    const strokeDash = percentage * circumference;
    const offset = accumulated;
    accumulated += strokeDash;
    return __spreadProps(__spreadValues({}, segment), {
      color: chartColors2[i % chartColors2.length],
      strokeDash,
      offset,
      index: i
    });
  });
  if (loading) {
    return /* @__PURE__ */ jsxs10("div", { className: "p-6 rounded-2xl bg-background border border-border animate-pulse", children: [
      /* @__PURE__ */ jsx14("div", { className: "h-4 w-32 bg-muted rounded mb-4" }),
      /* @__PURE__ */ jsx14("div", { className: "h-[180px] w-[180px] bg-muted rounded-full mx-auto" })
    ] });
  }
  if (!data.length) {
    return /* @__PURE__ */ jsx14("div", { className: "p-6 rounded-2xl bg-surface border border-border text-center", children: /* @__PURE__ */ jsx14("p", { className: "text-sm text-text-muted", children: "No hay datos disponibles" }) });
  }
  return /* @__PURE__ */ jsxs10("div", { className: "rounded-2xl bg-background border border-border shadow-md p-6", children: [
    (title || description) && /* @__PURE__ */ jsxs10("div", { className: "mb-4", children: [
      title && /* @__PURE__ */ jsx14("p", { className: "text-sm font-semibold text-text-primary", children: title }),
      description && /* @__PURE__ */ jsx14("p", { className: "text-xs text-text-muted mt-1", children: description })
    ] }),
    /* @__PURE__ */ jsxs10("div", { className: "flex flex-col items-center gap-8 justify-center", children: [
      /* @__PURE__ */ jsxs10("div", { style: { width: size, height: size }, className: "relative mx-auto md:mx-0", children: [
        /* @__PURE__ */ jsxs10("svg", { className: "w-full h-full -rotate-90", children: [
          /* @__PURE__ */ jsx14(
            "circle",
            {
              cx: center,
              cy: center,
              r: radius,
              stroke: "var(--bg-muted)",
              strokeWidth,
              fill: "transparent",
              strokeLinecap: "butt"
            }
          ),
          segmentMeta.map((seg) => {
            const isHov = hoveredIndex === seg.index;
            const sliceAngle = seg.value / total * 360;
            const startAngle = seg.offset / circumference * 360;
            const midAngleDeg = startAngle + sliceAngle / 2 - 90;
            const midAngleRad = midAngleDeg * Math.PI / 180;
            const tooltipRadius = radius + strokeWidth / 2 + 16;
            const tx = center + tooltipRadius * Math.cos(midAngleRad);
            const ty = center + tooltipRadius * Math.sin(midAngleRad);
            return /* @__PURE__ */ jsx14("g", { children: /* @__PURE__ */ jsx14(
              "circle",
              {
                cx: center,
                cy: center,
                r: radius,
                stroke: seg.color,
                strokeWidth,
                fill: "transparent",
                strokeDasharray: `${seg.strokeDash} ${circumference}`,
                strokeDashoffset: -seg.offset,
                className: "transition-all duration-300 cursor-pointer stroke-linecap-butt",
                onMouseEnter: () => setHoveredIndex(seg.index),
                onMouseLeave: () => setHoveredIndex(null),
                style: {
                  pointerEvents: "stroke",
                  filter: hoveredIndex === seg.index ? "drop-shadow(0 0 4px rgba(0,0,0,0.5))" : "none",
                  transform: hoveredIndex === seg.index ? "scale(1.02)" : "scale(1)",
                  transformOrigin: "center"
                },
                strokeLinecap: "butt"
              }
            ) }, seg.index);
          })
        ] }),
        hoveredIndex !== null && /* @__PURE__ */ jsx14(
          "div",
          {
            className: "absolute pointer-events-none z-10",
            style: {
              left: (() => {
                const seg = segmentMeta[hoveredIndex];
                const sliceAngle = seg.value / total * 360;
                const startAngle = seg.offset / circumference * 360;
                const midAngleDeg = startAngle + sliceAngle / 2 - 90;
                const rad = midAngleDeg * Math.PI / 180;
                const tooltipRadius = radius + strokeWidth / 2 + 16;
                return center + tooltipRadius * Math.cos(rad);
              })(),
              top: (() => {
                const seg = segmentMeta[hoveredIndex];
                const sliceAngle = seg.value / total * 360;
                const startAngle = seg.offset / circumference * 360;
                const midAngleDeg = startAngle + sliceAngle / 2 - 90;
                const rad = midAngleDeg * Math.PI / 180;
                const tooltipRadius = radius + strokeWidth / 2 + 16;
                return center + tooltipRadius * Math.sin(rad);
              })(),
              transform: "translate(-50%, -50%)"
            },
            children: /* @__PURE__ */ jsxs10("div", { className: "bg-[#0A0A0B] text-white text-xs rounded-md px-3 py-1 shadow-xl whitespace-nowrap", children: [
              /* @__PURE__ */ jsx14("p", { className: "font-semibold", children: segmentMeta[hoveredIndex].label }),
              /* @__PURE__ */ jsx14("p", { className: "text-center", children: formatValue(segmentMeta[hoveredIndex].value) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx14("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none", children: showTotal ? /* @__PURE__ */ jsxs10(Fragment, { children: [
          /* @__PURE__ */ jsx14("span", { className: "text-xs text-text-muted", children: "Total" }),
          /* @__PURE__ */ jsx14("span", { className: "text-xl font-bold text-accent", children: formatValue(total) })
        ] }) : null })
      ] }),
      /* @__PURE__ */ jsx14("div", { className: "flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4", children: segmentMeta.map((item, i) => {
        const isActive = hoveredIndex === i;
        return /* @__PURE__ */ jsxs10(
          "div",
          {
            onMouseEnter: () => setHoveredIndex(i),
            onMouseLeave: () => setHoveredIndex(null),
            className: `flex items-center gap-2 text-sm transition-all duration-200
                                  ${isActive ? "opacity-100 scale-100" : "opacity-80"}
                                `,
            children: [
              /* @__PURE__ */ jsx14(
                "div",
                {
                  className: "w-2.5 h-2.5 rounded-full",
                  style: {
                    backgroundColor: item.color,
                    boxShadow: isActive ? `0 0 6px ${item.color}` : "none"
                  }
                }
              ),
              /* @__PURE__ */ jsx14("span", { className: "text-text-primary", children: item.label })
            ]
          },
          i
        );
      }) })
    ] })
  ] });
};
var GraficaDonut_default = GraficaDonut;

// components/ui/DataDisplay/Graficas/GraficaLine.tsx
import { useState as useState6, useRef as useRef5 } from "react";
import { Fragment as Fragment2, jsx as jsx15, jsxs as jsxs11 } from "react/jsx-runtime";
var PureLineChart = ({
  data,
  title,
  description,
  height = 240,
  lineColor = "#7c3aed",
  showArea = false,
  animated = true,
  legendLabel,
  yLabel
}) => {
  const [hoveredIndex, setHoveredIndex] = useState6(null);
  const [tooltip, setTooltip] = useState6(null);
  const containerRef = useRef5(null);
  const maxValue = Math.max(...data.map((d) => d.value), 1) * 1.15;
  const padding = { top: 16, bottom: 36, left: 52, right: 24 };
  const svgW = Math.max(data.length * 80 + padding.left + padding.right, 360);
  const chartW = svgW - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const scaleX = (i) => i / Math.max(data.length - 1, 1) * chartW;
  const scaleY = (v) => chartH - v / maxValue * chartH;
  const buildSmoothPath = () => {
    if (data.length < 2) return "";
    let path = `M${scaleX(0)},${scaleY(data[0].value)}`;
    for (let i = 0; i < data.length - 1; i++) {
      const x0 = scaleX(i), y0 = scaleY(data[i].value);
      const x1 = scaleX(i + 1), y1 = scaleY(data[i + 1].value);
      const cpx = (x0 + x1) / 2;
      path += ` C${cpx},${y0} ${cpx},${y1} ${x1},${y1}`;
    }
    return path;
  };
  const smoothLine = buildSmoothPath();
  const areaPath = smoothLine + ` L${scaleX(data.length - 1)},${chartH} L${scaleX(0)},${chartH} Z`;
  const yTicks = Array.from({ length: 5 }, (_, i) => Math.round(maxValue / 4 * i));
  const gradientId = `area-grad-${lineColor.replace("#", "")}`;
  const formatVal = (n) => {
    if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
    if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
    return Number.isInteger(n) ? n.toString() : n.toFixed(1);
  };
  const updateTooltip = (e, i) => {
    var _a;
    const containerRect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    const svgEl = e.currentTarget.closest("svg");
    const svgRect = svgEl == null ? void 0 : svgEl.getBoundingClientRect();
    if (!containerRect || !svgRect) return;
    const scaleFactorX = svgRect.width / svgW;
    const scaleFactorY = svgRect.height / height;
    const xPx = (scaleX(i) + padding.left) * scaleFactorX + (svgRect.left - containerRect.left);
    const yPx = (scaleY(data[i].value) + padding.top) * scaleFactorY + (svgRect.top - containerRect.top);
    setTooltip({ x: xPx, y: yPx, label: data[i].label, value: data[i].value });
  };
  const handleMouseMove = (e) => {
    const svgEl = e.currentTarget.closest("svg");
    const svgRect = svgEl == null ? void 0 : svgEl.getBoundingClientRect();
    if (!svgRect) return;
    const scaleFactorX = svgRect.width / svgW;
    const mouseX = e.clientX - svgRect.left - padding.left * scaleFactorX;
    const idx = Math.round(mouseX / (chartW * scaleFactorX) * (data.length - 1));
    const clampedIdx = Math.max(0, Math.min(data.length - 1, idx));
    setHoveredIndex(clampedIdx);
  };
  return /* @__PURE__ */ jsxs11(
    "div",
    {
      ref: containerRef,
      className: "relative rounded-2xl border border-border bg-surface shadow-sm p-5",
      onMouseLeave: () => {
        setHoveredIndex(null);
        setTooltip(null);
      },
      children: [
        title && /* @__PURE__ */ jsx15("p", { className: "text-sm font-semibold text-text-primary", children: title }),
        description && /* @__PURE__ */ jsx15("p", { className: "text-xs text-text-muted mt-0.5 mb-2", children: description }),
        /* @__PURE__ */ jsxs11("div", { className: "w-full overflow-x-auto relative", children: [
          /* @__PURE__ */ jsxs11("svg", { width: "100%", viewBox: `0 0 ${svgW} ${height}`, className: "select-none", children: [
            yLabel && /* @__PURE__ */ jsx15(
              "text",
              {
                x: 10,
                y: padding.top - 8,
                fill: "var(--text-muted)",
                fontSize: 10,
                fontWeight: 600,
                children: yLabel
              }
            ),
            /* @__PURE__ */ jsx15("defs", { children: showArea && /* @__PURE__ */ jsxs11("linearGradient", { id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx15("stop", { offset: "0%", stopColor: lineColor, stopOpacity: 0.3 }),
              /* @__PURE__ */ jsx15("stop", { offset: "100%", stopColor: lineColor, stopOpacity: 0.02 })
            ] }) }),
            /* @__PURE__ */ jsxs11("g", { transform: `translate(${padding.left}, ${padding.top + 15})`, children: [
              yTicks.map((tick) => {
                const y = scaleY(tick);
                return /* @__PURE__ */ jsxs11("g", { children: [
                  /* @__PURE__ */ jsx15(
                    "line",
                    {
                      x1: 0,
                      y1: y,
                      x2: chartW,
                      y2: y,
                      stroke: "var(--border-default)",
                      strokeDasharray: "4 3"
                    }
                  ),
                  /* @__PURE__ */ jsx15("text", { x: -10, y: y + 4, textAnchor: "end", fill: "var(--text-muted)", fontSize: 10, children: formatVal(Math.round(tick)) })
                ] }, tick);
              }),
              showArea && /* @__PURE__ */ jsx15("path", { d: areaPath, fill: `url(#${gradientId})` }),
              /* @__PURE__ */ jsx15(
                "path",
                {
                  d: smoothLine,
                  fill: "none",
                  stroke: lineColor,
                  strokeWidth: 2.5,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  style: animated ? {
                    strokeDasharray: 2e3,
                    strokeDashoffset: 2e3,
                    animation: `drawLine 1.2s ease-out forwards`
                  } : void 0
                }
              ),
              hoveredIndex !== null && /* @__PURE__ */ jsxs11(Fragment2, { children: [
                /* @__PURE__ */ jsx15(
                  "line",
                  {
                    x1: scaleX(hoveredIndex),
                    y1: 0,
                    x2: scaleX(hoveredIndex),
                    y2: chartH,
                    stroke: lineColor,
                    strokeWidth: 1,
                    strokeDasharray: "3 3",
                    opacity: 0.4
                  }
                ),
                /* @__PURE__ */ jsx15(
                  "circle",
                  {
                    cx: scaleX(hoveredIndex),
                    cy: scaleY(data[hoveredIndex].value),
                    r: 7,
                    fill: lineColor,
                    opacity: 0.15
                  }
                )
              ] }),
              data.map((d, i) => {
                const cx = scaleX(i), cy = scaleY(d.value);
                const isHov = hoveredIndex === i;
                return /* @__PURE__ */ jsxs11("g", { children: [
                  /* @__PURE__ */ jsx15(
                    "circle",
                    {
                      cx,
                      cy,
                      r: isHov ? 5.5 : 3.5,
                      fill: "var(--bg-surface)",
                      stroke: lineColor,
                      strokeWidth: 2.5,
                      className: "transition-all duration-200 pointer-events-none"
                    }
                  ),
                  /* @__PURE__ */ jsx15("circle", { cx, cy, r: 14, fill: "transparent" })
                ] }, i);
              }),
              data.map((d, i) => /* @__PURE__ */ jsx15(
                "text",
                {
                  x: scaleX(i),
                  y: chartH + 18,
                  textAnchor: "middle",
                  fill: "var(--text-muted)",
                  fontSize: 11,
                  fontWeight: hoveredIndex === i ? 600 : 400,
                  className: "pointer-events-none",
                  children: d.label
                },
                i
              )),
              /* @__PURE__ */ jsx15(
                "rect",
                {
                  x: 0,
                  y: 0,
                  width: chartW,
                  height: chartH,
                  fill: "transparent",
                  onMouseMove: (e) => {
                    const svgEl = e.currentTarget.closest("svg");
                    const svgRect = svgEl == null ? void 0 : svgEl.getBoundingClientRect();
                    if (!svgRect) return;
                    const scaleFactorX = svgRect.width / svgW;
                    const mouseX = e.clientX - svgRect.left - padding.left * scaleFactorX;
                    const idx = Math.max(0, Math.min(
                      data.length - 1,
                      Math.round(mouseX / (chartW * scaleFactorX) * (data.length - 1))
                    ));
                    setHoveredIndex(idx);
                    updateTooltip(e, idx);
                  },
                  onMouseLeave: () => {
                    setHoveredIndex(null);
                    setTooltip(null);
                  }
                }
              ),
              /* @__PURE__ */ jsx15("line", { x1: 0, y1: chartH, x2: chartW, y2: chartH, stroke: "var(--border-strong)" })
            ] }),
            /* @__PURE__ */ jsx15("style", { children: `
                        @keyframes drawLine { to { stroke-dashoffset: 0; } }
                    ` })
          ] }),
          tooltip && /* @__PURE__ */ jsx15(
            "div",
            {
              className: "absolute z-50 pointer-events-none transition-all duration-150",
              style: {
                left: tooltip.x,
                top: tooltip.y,
                transform: "translate(-90%, -70%)"
              },
              children: /* @__PURE__ */ jsxs11("div", { className: "relative bg-[#0A0A0B] text-white text-sm rounded-lg px-8 py-2 shadow-2xl border border-white/10 whitespace-nowrap", children: [
                /* @__PURE__ */ jsx15("p", { className: "text-[11px] text-center", children: tooltip.label }),
                /* @__PURE__ */ jsx15("p", { className: "text-sm font-semibold text-center", children: formatVal(tooltip.value) })
              ] })
            }
          )
        ] }),
        legendLabel && /* @__PURE__ */ jsx15("div", { className: "flex justify-center items-center gap-2 mt-4 px-2", children: /* @__PURE__ */ jsxs11("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx15(
            "div",
            {
              className: "w-3 h-1 rounded-sm",
              style: { backgroundColor: lineColor }
            }
          ),
          /* @__PURE__ */ jsx15("span", { className: "text-sm font-medium", children: legendLabel })
        ] }) })
      ]
    }
  );
};
var GraficaLine_default = PureLineChart;

// components/ui/DataDisplay/Tabs.tsx
import { useState as useState7 } from "react";
import { jsx as jsx16, jsxs as jsxs12 } from "react/jsx-runtime";
var triggerBase = "inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
var variantStyles2 = {
  underline: {
    list: "flex border-b border-border gap-1",
    trigger: "px-4 py-2.5 border-b-2 -mb-px",
    active: "border-accent text-accent",
    inactive: "border-transparent text-text-secondary hover:text-text-primary hover:border-border-strong"
  },
  pill: {
    list: "flex gap-1 bg-muted p-1 rounded-xl",
    trigger: "px-4 py-2 rounded-lg",
    active: "bg-surface text-text-primary shadow-[var(--shadow-surface)]",
    inactive: "text-text-muted hover:text-text-primary hover:bg-accent-hover"
  },
  card: {
    list: "flex gap-2",
    trigger: "px-4 py-2.5 rounded-t-lg border border-b-0",
    active: "border-border bg-surface text-text-primary",
    inactive: "border-transparent bg-muted text-text-muted hover:text-text-primary hover:bg-accent-soft"
  }
};
var alignClass = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  stretch: "[&>button]:flex-1 [&>button]:justify-center"
};
function Tabs({
  tabs,
  defaultTab,
  activeTab: controlledTab,
  onChange,
  variant = "underline",
  className = "",
  align = "start"
}) {
  var _a, _b;
  const [internalActive, setInternalActive] = useState7(
    (_b = defaultTab != null ? defaultTab : (_a = tabs[0]) == null ? void 0 : _a.id) != null ? _b : ""
  );
  const isControlled = controlledTab !== void 0;
  const active = isControlled ? controlledTab : internalActive;
  const handleSelect = (id) => {
    if (!isControlled) setInternalActive(id);
    onChange == null ? void 0 : onChange(id);
  };
  const styles = variantStyles2[variant];
  return /* @__PURE__ */ jsxs12("div", { className: `flex flex-col w-full ${className}`, children: [
    /* @__PURE__ */ jsx16(
      "div",
      {
        role: "tablist",
        className: `${styles.list} ${alignClass[align]}`,
        children: tabs.map((tab) => {
          const isActive = tab.id === active;
          return /* @__PURE__ */ jsxs12(
            "button",
            {
              role: "tab",
              "aria-selected": isActive,
              "aria-controls": `tabpanel-${tab.id}`,
              disabled: tab.disabled,
              onClick: () => !tab.disabled && handleSelect(tab.id),
              className: [
                triggerBase,
                styles.trigger,
                isActive ? styles.active : styles.inactive
              ].join(" "),
              children: [
                tab.icon && /* @__PURE__ */ jsx16("span", { className: "shrink-0 size-4", children: tab.icon }),
                tab.label
              ]
            },
            tab.id
          );
        })
      }
    ),
    tabs.map((tab) => /* @__PURE__ */ jsx16(
      "div",
      {
        role: "tabpanel",
        id: `tabpanel-${tab.id}`,
        "aria-labelledby": tab.id,
        hidden: tab.id !== active,
        className: "mt-4 text-text-primary",
        children: tab.content
      },
      tab.id
    ))
  ] });
}

// components/ui/DataDisplay/Table.tsx
import React7 from "react";
import { jsx as jsx17, jsxs as jsxs13 } from "react/jsx-runtime";
function getCellValue(row, col) {
  if (col.render) return col.render(row);
  if (!col.accessor) return null;
  if (typeof col.accessor === "function") return col.accessor(row);
  return row[col.accessor];
}
var CELL_PADDING = {
  sm: "6px 10px",
  md: "10px 12px",
  lg: "14px 16px"
};
var FONT_SIZE = {
  sm: "12px",
  md: "13px",
  lg: "14px"
};
function DataTable({
  data,
  columns,
  maxHeight = "70vh",
  rowKey,
  emptyState,
  isLoading = false,
  className,
  headerVariant = "default",
  size = "md"
}) {
  var _a, _b;
  const groupedHeaders = React7.useMemo(() => {
    const result = [];
    let i = 0;
    while (i < columns.length) {
      const col = columns[i];
      if (col.group) {
        let span = 0;
        const start = i;
        while (i < columns.length && columns[i].group === col.group) {
          span++;
          i++;
        }
        result.push({ label: col.group, start, span });
      } else {
        result.push({ label: "", start: i, span: 1 });
        i++;
      }
    }
    return result;
  }, [columns]);
  const hasGroups = columns.some((c) => c.group);
  const cellPadding = (_a = CELL_PADDING[size]) != null ? _a : CELL_PADDING.md;
  const fontSize = (_b = FONT_SIZE[size]) != null ? _b : FONT_SIZE.md;
  const headerBg = headerVariant === "accent" ? "var(--accent)" : "var(--bg-muted)";
  const headerText = headerVariant === "accent" ? "#ffffff" : "var(--text-secondary)";
  const groupLabelColor = headerVariant === "accent" ? "#f7f4f4ff" : "var(--accent)";
  const groupBorderColor = headerVariant === "accent" ? "var(--border-default)" : "var(--border-strong)";
  const groupStyles = React7.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    columns.forEach((col) => {
      if (col.group && col.groupStyle && !map.has(col.group)) {
        map.set(col.group, col.groupStyle);
      }
    });
    return map;
  }, [columns]);
  return /* @__PURE__ */ jsxs13(
    "div",
    {
      className,
      style: {
        border: "0.5px solid var(--border-default)",
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        background: "var(--bg-surface)",
        boxShadow: "var(--shadow-card)"
      },
      children: [
        /* @__PURE__ */ jsx17(
          "div",
          {
            className: "scrollbar-soft",
            style: { overflowX: "auto", overflowY: "auto", maxHeight },
            children: /* @__PURE__ */ jsxs13(
              "table",
              {
                style: {
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  fontSize,
                  minWidth: "600px",
                  fontFamily: "var(--font-body), sans-serif"
                },
                children: [
                  /* @__PURE__ */ jsxs13(
                    "thead",
                    {
                      style: {
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                        background: headerBg
                      },
                      children: [
                        hasGroups && /* @__PURE__ */ jsx17("tr", { children: groupedHeaders.map((g, idx) => {
                          var _a2, _b2;
                          const style = groupStyles.get(g.label);
                          return g.label ? /* @__PURE__ */ jsx17(
                            "th",
                            {
                              colSpan: g.span,
                              style: {
                                padding: "5px 12px",
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: "10px",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: groupLabelColor,
                                borderBottom: `0.5px solid ${(_a2 = style == null ? void 0 : style.border) != null ? _a2 : groupBorderColor}`,
                                background: (_b2 = style == null ? void 0 : style.bg) != null ? _b2 : headerBg,
                                borderLeft: idx !== 0 ? "0.5px solid var(--border-default)" : void 0,
                                borderRight: idx === groupedHeaders.length - 1 ? "2px solid var(--border-default)" : "2px solid transparent",
                                whiteSpace: "nowrap"
                              },
                              children: g.label
                            },
                            `group-${g.label}-${idx}`
                          ) : /* @__PURE__ */ jsx17(
                            "th",
                            {
                              style: {
                                padding: 0,
                                borderBottom: "0.5px solid var(--border-default)"
                              }
                            },
                            `empty-${g.start}`
                          );
                        }) }),
                        /* @__PURE__ */ jsx17("tr", { children: columns.map((col, i) => {
                          var _a2, _b2, _c;
                          const isFirstInGroup = col.group && (i === 0 || columns[i - 1].group !== col.group);
                          const style = col.group ? groupStyles.get(col.group) : void 0;
                          return /* @__PURE__ */ jsx17(
                            "th",
                            {
                              style: {
                                padding: cellPadding,
                                textAlign: (_a2 = col.align) != null ? _a2 : "left",
                                fontWeight: 600,
                                fontSize: "11px",
                                letterSpacing: "0.04em",
                                color: headerText,
                                background: (_b2 = style == null ? void 0 : style.bg) != null ? _b2 : headerBg,
                                borderBottom: "0.5px solid var(--border-default)",
                                borderLeft: isFirstInGroup && i !== 0 ? `1px solid ${(_c = style == null ? void 0 : style.border) != null ? _c : "var(--border-default)"}` : void 0,
                                whiteSpace: "nowrap",
                                width: col.width !== void 0 ? typeof col.width === "number" ? `${col.width}px` : col.width : void 0,
                                minWidth: col.width !== void 0 ? typeof col.width === "number" ? `${col.width}px` : col.width : "100px"
                              },
                              children: col.header
                            },
                            col.key
                          );
                        }) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx17("tbody", { children: isLoading ? Array.from({ length: 5 }).map((_, rowIdx) => /* @__PURE__ */ jsx17("tr", { children: columns.map((col) => /* @__PURE__ */ jsx17(
                    "td",
                    {
                      style: {
                        padding: cellPadding,
                        borderBottom: "0.5px solid var(--border-default)"
                      },
                      children: /* @__PURE__ */ jsx17(
                        "div",
                        {
                          style: {
                            height: "12px",
                            borderRadius: "var(--r-sm)",
                            background: "var(--bg-muted)",
                            width: `${60 + Math.random() * 30}%`,
                            animation: "dt-pulse 1.5s ease-in-out infinite"
                          }
                        }
                      )
                    },
                    col.key
                  )) }, `skeleton-${rowIdx}`)) : data.length === 0 ? /* @__PURE__ */ jsx17("tr", { children: /* @__PURE__ */ jsx17(
                    "td",
                    {
                      colSpan: columns.length,
                      style: {
                        padding: "48px 16px",
                        textAlign: "center",
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-body), sans-serif"
                      },
                      children: emptyState != null ? emptyState : "Sin resultados"
                    }
                  ) }) : data.map((row, rowIdx) => {
                    const key = String(row[rowKey]);
                    return /* @__PURE__ */ jsx17(
                      "tr",
                      {
                        style: {
                          background: "var(--bg-base)"
                        },
                        children: columns.map((col, i) => {
                          var _a2;
                          const isFirstInGroup = col.group && (i === 0 || columns[i - 1].group !== col.group);
                          return /* @__PURE__ */ jsx17(
                            "td",
                            {
                              style: {
                                padding: cellPadding,
                                textAlign: (_a2 = col.align) != null ? _a2 : "left",
                                borderBottom: "0.5px solid var(--border-default)",
                                borderLeft: isFirstInGroup && i !== 0 ? "0.5px solid var(--border-default)" : void 0,
                                color: "var(--text-primary)",
                                whiteSpace: "nowrap"
                              },
                              children: getCellValue(row, col)
                            },
                            col.key
                          );
                        })
                      },
                      key
                    );
                  }) })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsx17("style", { children: `
                @keyframes dt-pulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.35; }
                }
            ` })
      ]
    }
  );
}

// components/ui/Navegacion/Breadcrumbs.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { jsx as jsx18, jsxs as jsxs14 } from "react/jsx-runtime";
function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");
  return /* @__PURE__ */ jsxs14("nav", { className: "flex items-center space-x-2 text-xs tracking-widest font-semibold text-text-muted whitespace-nowrap overflow-x-auto scrollbar-hide", children: [
    segments.length === 0 ? /* @__PURE__ */ jsx18("span", { className: "text-text-primary", children: "INICIO" }) : /* @__PURE__ */ jsx18(Link, { href: "/", className: "hover:text-text-primary transition-colors flex items-center", children: "INICIO" }),
    segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const isLast = index === segments.length - 1;
      let name = decodeURIComponent(segment).replace(/[-_]/g, " ").toUpperCase();
      return /* @__PURE__ */ jsxs14("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx18("span", { className: "text-text-muted/50", children: "/" }),
        isLast ? /* @__PURE__ */ jsx18("span", { className: "text-text-primary", children: name }) : /* @__PURE__ */ jsx18(Link, { href, className: "hover:text-text-primary transition-colors", children: name })
      ] }, href);
    })
  ] });
}

// components/ui/Tema/theme-provider.tsx
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { jsx as jsx19 } from "react/jsx-runtime";
function ThemeProvider(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx19(NextThemesProvider, __spreadProps(__spreadValues({}, props), { children }));
}

// components/ui/Tema/ThemeToggle.tsx
import * as React8 from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme as useTheme2 } from "next-themes";

// components/ui/buttonIcons/fondoIcons.tsx
import { useRef as useRef6 } from "react";
import { jsx as jsx20, jsxs as jsxs15 } from "react/jsx-runtime";
function AnimatedIconButton({ Icon, onClick }) {
  const iconRef = useRef6(null);
  return /* @__PURE__ */ jsx20("button", { onClick, className: "group", children: /* @__PURE__ */ jsxs15("div", { className: "relative bg-muted/50 rounded-full p-2 text-sm transition-all duration-300 transform group-hover:scale-110 active:scale-95 group-hover:shadow-2xl", children: [
    /* @__PURE__ */ jsx20("div", { className: "absolute -bottom-1 right-5 rounded-full w-3 h-3 bg-muted/50" }),
    /* @__PURE__ */ jsx20("div", { ref: iconRef, children: /* @__PURE__ */ jsx20(Icon, { className: "h-5 w-5 z-50" }) })
  ] }) });
}

// components/ui/Tema/ThemeToggle.tsx
import { jsx as jsx21, jsxs as jsxs16 } from "react/jsx-runtime";
function ThemeToggle() {
  const { theme, setTheme } = useTheme2();
  const [mounted, setMounted] = React8.useState(false);
  const [isOpen, setIsOpen] = React8.useState(false);
  const menuRef = React8.useRef(null);
  React8.useEffect(() => {
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
    return /* @__PURE__ */ jsxs16(
      "button",
      {
        className: "inline-flex items-center justify-center rounded-md border border-border bg-transparent p-2 text-sm font-medium text-foreground transition-colors",
        "aria-label": "Cargando tema",
        disabled: true,
        children: [
          /* @__PURE__ */ jsx21(Sun, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsx21("span", { className: "sr-only", children: "Toggle theme" })
        ]
      }
    );
  }
  const CurrentIcon = theme === "dark" ? Moon : theme === "system" ? Laptop : Sun;
  return /* @__PURE__ */ jsxs16("div", { className: "relative", ref: menuRef, children: [
    /* @__PURE__ */ jsx21(
      AnimatedIconButton,
      {
        onClick: () => setIsOpen(!isOpen),
        "aria-label": "Cambiar tema",
        Icon: CurrentIcon
      }
    ),
    /* @__PURE__ */ jsx21("span", { className: "sr-only", children: "Toggle theme" }),
    isOpen && /* @__PURE__ */ jsx21("div", { className: "absolute top-full mt-2 right-0 w-40 rounded-md border border-border-sidebar bg-background text-text-primary shadow-lg z-[9999]", children: /* @__PURE__ */ jsxs16("div", { className: "py-1", role: "menu", "aria-orientation": "vertical", "aria-labelledby": "options-menu", children: [
      /* @__PURE__ */ jsxs16("button", { onClick: () => {
        setTheme("light");
        setIsOpen(false);
      }, className: "flex w-full items-center px-4 py-2 text-sm hover:bg-accent-hover/20 hover:text-accent", children: [
        /* @__PURE__ */ jsx21(Sun, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx21("span", { children: "Claro" })
      ] }),
      /* @__PURE__ */ jsxs16("button", { onClick: () => {
        setTheme("dark");
        setIsOpen(false);
      }, className: "flex w-full items-center px-4 py-2 text-sm hover:bg-accent-hover/20 hover:text-accent", children: [
        /* @__PURE__ */ jsx21(Moon, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx21("span", { children: "Oscuro" })
      ] }),
      /* @__PURE__ */ jsxs16("button", { onClick: () => {
        setTheme("system");
        setIsOpen(false);
      }, className: "flex w-full items-center px-4 py-2 text-sm hover:bg-accent-hover/20 hover:text-accent", children: [
        /* @__PURE__ */ jsx21(Laptop, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx21("span", { children: "Sistema" })
      ] })
    ] }) })
  ] });
}

// components/Prueba/AlertDialog.tsx
import React9, { useEffect as useEffect6, useCallback as useCallback2 } from "react";
import { X as X3, AlertTriangle, AlertCircle, CheckCircle, Info } from "lucide-react";
import { jsx as jsx22, jsxs as jsxs17 } from "react/jsx-runtime";
var sizeClasses3 = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg"
};
var variantConfig = {
  destructive: {
    icon: /* @__PURE__ */ jsx22(AlertTriangle, { className: "w-5 h-5" }),
    iconBg: "bg-error/10 text-text-error",
    confirmVariant: "destructive"
  },
  warning: {
    icon: /* @__PURE__ */ jsx22(AlertCircle, { className: "w-5 h-5" }),
    iconBg: "bg-warning/10 text-text-warning",
    confirmVariant: "primary"
  },
  success: {
    icon: /* @__PURE__ */ jsx22(CheckCircle, { className: "w-5 h-5" }),
    iconBg: "bg-success/10 text-text-success",
    confirmVariant: "primary"
  },
  info: {
    icon: /* @__PURE__ */ jsx22(Info, { className: "w-5 h-5" }),
    iconBg: "bg-info/10 text-text-info",
    confirmVariant: "primary"
  }
};
function AlertDialog({
  open,
  onClose,
  variant = "info",
  size = "md",
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  closeOnOverlay = true,
  hideCloseButton = false,
  className = "",
  children
}) {
  const handleKeyDown = useCallback2(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  useEffect6(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);
  const config = variantConfig[variant];
  if (!open) return null;
  return /* @__PURE__ */ jsxs17("div", { role: "alertdialog", "aria-modal": "true", className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx22(
      "div",
      {
        className: "absolute inset-0 bg-black/50 animate-in fade-in duration-200",
        onClick: closeOnOverlay ? onClose : void 0,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs17(
      "div",
      {
        className: `
          relative z-10 w-full
          bg-surface dark:bg-background
          rounded-xl overflow-hidden
          border border-border
          shadow-[var(--shadow-card)]
          animate-in fade-in zoom-in-95 duration-200
          ${sizeClasses3[size]}
          ${className}
        `,
        children: [
          !hideCloseButton && /* @__PURE__ */ jsx22(
            Button,
            {
              variant: "ghost",
              size: "icon-sm",
              onClick: onClose,
              "aria-label": "Cerrar",
              className: "absolute top-3 right-3 text-text-muted hover:text-text-primary z-10",
              children: /* @__PURE__ */ jsx22(X3, {})
            }
          ),
          /* @__PURE__ */ jsxs17(AlertDialogContext.Provider, { value: { variant, config }, children: [
            /* @__PURE__ */ jsx22("div", { className: "px-6 pt-6 pb-4", children: /* @__PURE__ */ jsxs17("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx22("span", { className: `flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${config.iconBg}`, children: config.icon }),
              /* @__PURE__ */ jsxs17("div", { className: "flex-1 min-w-0 pr-6", children: [
                /* @__PURE__ */ jsx22("h2", { className: "font-heading text-lg font-semibold leading-snug text-text-primary", children: title }),
                description && /* @__PURE__ */ jsx22("p", { className: "mt-2 text-sm text-text-secondary leading-relaxed", children: description })
              ] })
            ] }) }),
            (children || onConfirm || onCancel) && /* @__PURE__ */ jsx22("div", { className: "border-t border-border px-6 py-4", children: children || /* @__PURE__ */ jsxs17("div", { className: "flex items-center justify-end gap-2", children: [
              onCancel && /* @__PURE__ */ jsx22(Button, { variant: "secondary", onClick: onCancel, children: cancelLabel }),
              onConfirm && /* @__PURE__ */ jsx22(Button, { variant: "default", onClick: onConfirm, children: confirmLabel })
            ] }) })
          ] })
        ]
      }
    )
  ] });
}
var AlertDialogContext = React9.createContext({
  variant: "info",
  config: variantConfig["info"]
});
var useAlertDialogContext = () => React9.useContext(AlertDialogContext);

// lib/toast.ts
import { toast as sonnerToast } from "sonner";
var toast = {
  success: (title, options) => sonnerToast.success(title, {
    description: options == null ? void 0 : options.description,
    duration: options == null ? void 0 : options.duration,
    action: options == null ? void 0 : options.action
  }),
  error: (title, options) => sonnerToast.error(title, {
    description: options == null ? void 0 : options.description,
    duration: options == null ? void 0 : options.duration,
    action: options == null ? void 0 : options.action
  }),
  warning: (title, options) => sonnerToast.warning(title, {
    description: options == null ? void 0 : options.description,
    duration: options == null ? void 0 : options.duration,
    action: options == null ? void 0 : options.action
  }),
  info: (title, options) => sonnerToast.info(title, {
    description: options == null ? void 0 : options.description,
    duration: options == null ? void 0 : options.duration,
    action: options == null ? void 0 : options.action
  }),
  loading: (title, options) => sonnerToast.loading(title, {
    description: options == null ? void 0 : options.description
  }),
  promise: (promise, messages) => sonnerToast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error
  }),
  custom: (jsx23) => sonnerToast(jsx23)
};
export {
  AlertDialog,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImage,
  DataTable,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DropdownMenu,
  GraficaBar_default as GraficaBar,
  GraficaDonut_default as GraficaDonut,
  GraficaLine_default as GraficaLine,
  Input,
  LabelBadge,
  MultiSelect,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  StatusBadge,
  Tabs,
  Textarea,
  ThemeProvider,
  ThemeToggle,
  Toaster,
  Tooltip,
  buttonVariants,
  cn,
  toast,
  useAlertDialogContext,
  useDialogContext
};
