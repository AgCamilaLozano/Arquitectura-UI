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

// lib/components/ui/Base/Selects/searchable-select.tsx
import { useState, useRef, useEffect, useMemo } from "react";

// lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// lib/components/ui/Base/Selects/searchable-select.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function SearchableSelect({
  value,
  onValueChange,
  options,
  placeholder = "Seleccionar...",
  searchPlaceholder = "Buscar...",
  className,
  disabled = false,
  allowCustom = false,
  customPlaceholder = "Escribir otro..."
}) {
  var _a;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const ref = useRef(null);
  const customInputRef = useRef(null);
  const isCustom = value && !options.some((o) => o.value === value);
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
        setShowCustomInput(false);
        setCustomValue("");
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  useEffect(() => {
    if (showCustomInput && customInputRef.current) {
      customInputRef.current.focus();
    }
  }, [showCustomInput]);
  const selected = options.find((o) => o.value === value);
  const displayLabel = (_a = selected == null ? void 0 : selected.label) != null ? _a : isCustom ? value : placeholder;
  function handleCustomConfirm() {
    const trimmed = customValue.trim();
    if (trimmed) {
      onValueChange(trimmed);
    }
    setShowCustomInput(false);
    setCustomValue("");
    setOpen(false);
    setQuery("");
  }
  return /* @__PURE__ */ jsxs("div", { ref, className: cn("relative", className), children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        disabled,
        onClick: () => {
          if (!disabled) setOpen((p) => !p);
          setShowCustomInput(false);
          setCustomValue("");
        },
        className: cn(
          "flex items-center justify-between gap-1 w-full rounded-md border border-border",
          "bg-background px-3 py-2 text-sm ring-offset-background",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "hover:bg-accent-soft/50 transition-colors"
        ),
        children: [
          /* @__PURE__ */ jsx("span", { className: "truncate text-left", children: displayLabel }),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "text-xs shrink-0 text-text-secondary transition-transform duration-200",
                open && "rotate-180"
              ),
              children: "\u25BE"
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsxs("div", { className: "absolute z-50 mt-1 w-full min-w-[200px] rounded-md border bg-background border-border shadow-md outline-none animate-in fade-in-0 zoom-in-95", children: [
      /* @__PURE__ */ jsx("div", { className: "p-2 border-b border-border", children: /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
        "input",
        {
          autoFocus: true,
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: searchPlaceholder,
          className: "w-full rounded-sm border-0 border-border bg-transparent px-2 py-1 text-sm outline-none placeholder:text-text-secondary"
        }
      ) }) }),
      showCustomInput ? /* @__PURE__ */ jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: customInputRef,
            value: customValue,
            onChange: (e) => setCustomValue(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleCustomConfirm();
              }
              if (e.key === "Escape") {
                setShowCustomInput(false);
                setCustomValue("");
              }
            },
            placeholder: customPlaceholder,
            className: "flex-1 rounded-sm border border-border bg-transparent px-2 py-1 text-sm outline-none placeholder:text-text-secondary"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleCustomConfirm,
            disabled: !customValue.trim(),
            className: "px-2 py-1 text-xs font-medium bg-accent text-white rounded-sm disabled:opacity-50",
            children: "OK"
          }
        )
      ] }) }) : /* @__PURE__ */ jsxs("ul", { className: "max-h-56 overflow-y-auto scrollbar-soft py-1", children: [
        filtered.length === 0 && !allowCustom ? /* @__PURE__ */ jsx("li", { className: "px-3 py-2 text-sm text-text-seconcary text-center", children: "Sin resultados" }) : filtered.map((option) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              onValueChange(option.value);
              setOpen(false);
              setQuery("");
            },
            className: "flex items-center gap-2 w-full px-3 py-1.5 text-sm hover:bg-accent-soft/70 rounded-sm transition-colors",
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: cn(
                    "text-xs w-3.5 text-center shrink-0",
                    value === option.value ? "opacity-100" : "opacity-0"
                  ),
                  children: "\u2713"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "truncate", children: option.label })
            ]
          }
        ) }, option.value)),
        allowCustom && /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setShowCustomInput(true);
              setQuery("");
            },
            className: "flex items-center gap-2 w-full px-3 py-1.5 text-sm text-accent font-medium hover:bg-accent-soft/70 rounded-sm transition-colors",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs w-3.5 text-center shrink-0", children: "+" }),
              /* @__PURE__ */ jsx("span", { children: "Otro" })
            ]
          }
        ) })
      ] })
    ] })
  ] });
}

// lib/components/ui/Base/Selects/select.tsx
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Select(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx2(SelectPrimitive.Root, __spreadValues({ "data-slot": "select" }, props));
}
function SelectGroup(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx2(SelectPrimitive.Group, __spreadValues({ "data-slot": "select-group" }, props));
}
function SelectValue(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx2(SelectPrimitive.Value, __spreadValues({ "data-slot": "select-value" }, props));
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
  return /* @__PURE__ */ jsxs2(
    SelectPrimitive.Trigger,
    __spreadProps(__spreadValues({
      "data-slot": "select-trigger",
      type: "button",
      "data-size": size,
      className: cn(
        "group bg-background flex w-full items-center justify-between gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 shadow-xs cursor-pointer select-none",
        "focus:outline-none focus:border-accent focus:ring-4 focus:ring-border-strong/20 focus:ring-offset-0",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
        "data-[size=default]:h-10 data-[size=sm]:h-8 data-[size=sm]:text-xs data-[size=sm]:px-2.5",
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 [&_svg]:text-text-muted/70",
        className
      )
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsx2(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx2(ChevronDown, { className: "transition-transform duration-200 ease-out group-data-[state=open]:rotate-180", strokeWidth: 1.5 }) })
      ]
    })
  );
}
SelectTrigger.displayName = "SelectTrigger";
function SelectContent(_a) {
  var _b = _a, {
    className,
    children,
    position = "popper",
    align = "center"
  } = _b, props = __objRest(_b, [
    "className",
    "children",
    "position",
    "align"
  ]);
  return /* @__PURE__ */ jsx2(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs2(
    SelectPrimitive.Content,
    __spreadProps(__spreadValues({
      "data-slot": "select-content",
      className: cn(
        "bg-background text-text-primary relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border shadow-floating transition-all duration-200",
        position === "popper" && "data-[state=open]:animate-fade-in-soft data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      align
    }, props), {
      children: [
        /* @__PURE__ */ jsx2(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx2(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx2(SelectScrollDownButton, {})
      ]
    })
  ) });
}
SelectContent.displayName = "SelectContent";
function SelectLabel(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx2(
    SelectPrimitive.Label,
    __spreadValues({
      "data-slot": "select-label",
      className: cn("px-2 py-1.5 text-xs font-semibold text-text-muted label-mono border-b border-border mb-1", className)
    }, props)
  );
}
SelectLabel.displayName = "SelectLabel";
function SelectItem(_a) {
  var _b = _a, {
    className,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "children"
  ]);
  return /* @__PURE__ */ jsxs2(
    SelectPrimitive.Item,
    __spreadProps(__spreadValues({
      "data-slot": "select-item",
      className: cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors duration-150 font-sans text-text-primary",
        "focus:bg-muted focus:text-text-primary",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsx2(
          "span",
          {
            "data-slot": "select-item-indicator",
            className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-accent",
            children: /* @__PURE__ */ jsx2(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx2(Check, { strokeWidth: 1.5 }) })
          }
        ),
        /* @__PURE__ */ jsx2(SelectPrimitive.ItemText, { children })
      ]
    })
  );
}
SelectItem.displayName = "SelectItem";
function SelectSeparator(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx2(
    SelectPrimitive.Separator,
    __spreadValues({
      "data-slot": "select-separator",
      className: cn("h-px bg-muted rule-holo my-1 pointer-events-none -mx-1", className)
    }, props)
  );
}
SelectSeparator.displayName = "SelectSeparator";
function SelectScrollUpButton(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx2(
    SelectPrimitive.ScrollUpButton,
    __spreadProps(__spreadValues({
      "data-slot": "select-scroll-up-button",
      className: cn("flex cursor-default items-center justify-center py-1 text-text-muted/80", className)
    }, props), {
      children: /* @__PURE__ */ jsx2(ChevronUp, { className: "size-4", strokeWidth: 1.5 })
    })
  );
}
SelectScrollUpButton.displayName = "SelectScrollUpButton";
function SelectScrollDownButton(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx2(
    SelectPrimitive.ScrollDownButton,
    __spreadProps(__spreadValues({
      "data-slot": "select-scroll-down-button",
      className: cn("flex cursor-default items-center justify-center py-1 text-text-muted/80", className)
    }, props), {
      children: /* @__PURE__ */ jsx2(ChevronDown, { className: "size-4", strokeWidth: 1.5 })
    })
  );
}
SelectScrollDownButton.displayName = "SelectScrollDownButton";

// lib/components/ui/Base/Entradas/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { jsx as jsx3 } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-accent text-white hover:bg-accent/90 shadow-sm",
        outline: "border border-border bg-background text-text-primary hover:bg-muted/50 shadow-xs",
        secondary: "bg-muted text-text-primary hover:bg-muted/80 shadow-xs",
        ghost: "text-text-secondary hover:bg-muted hover:text-text-primary",
        link: "text-text-secondary hover:text-accent underline-offset-4 hover:underline decoration-accent",
        destructive: "bg-text-error text-white hover:bg-text-error/90 shadow-sm focus-visible:ring-text-error"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs gap-1.5",
        lg: "h-10 rounded-md px-6 text-base",
        icon: "h-9 w-9 p-0",
        "icon-sm": "h-8 w-8 p-0",
        "icon-lg": "h-10 w-10 p-0"
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
    var _b = _a, { className, variant, size, asChild = false } = _b, props = __objRest(_b, ["className", "variant", "size", "asChild"]);
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx3(
      Comp,
      __spreadValues({
        className: buttonVariants({ variant, size, className }),
        ref
      }, props)
    );
  }
);
Button.displayName = "Button";

// lib/components/ui/Base/Entradas/input.tsx
import * as React2 from "react";
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var inputVariants = cva2(
  "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-primary file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-secondary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted font-sans transition-all duration-200 shadow-xs",
  {
    variants: {
      variant: {
        default: "border-default focus-visible:border-accent focus-visible:ring-border-strong/20",
        destructive: "border-error focus-visible:border-text-error focus-visible:ring-ring-error/20 text-text-error placeholder:text-text-error/50"
      },
      withIcon: {
        none: "px-3",
        left: "pl-10 pr-3",
        right: "pl-3 pr-10",
        both: "px-10"
      }
    },
    defaultVariants: {
      variant: "default",
      withIcon: "none"
    }
  }
);
var Input = React2.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, type = "text", variant, iconLeft, iconRight, containerClassName } = _b, props = __objRest(_b, ["className", "type", "variant", "iconLeft", "iconRight", "containerClassName"]);
    const iconPosition = iconLeft && iconRight ? "both" : iconLeft ? "left" : iconRight ? "right" : "none";
    return /* @__PURE__ */ jsxs3("div", { className: cn("relative w-full flex items-center text-text-primary", containerClassName), children: [
      iconLeft && /* @__PURE__ */ jsx4(
        "div",
        {
          className: cn(
            "absolute left-3 flex items-center justify-center pointer-events-none text-text-muted [&_svg]:size-4 transition-colors duration-200",
            variant === "destructive" && "text-text-error"
          ),
          "aria-hidden": "true",
          children: iconLeft
        }
      ),
      /* @__PURE__ */ jsx4(
        "input",
        __spreadValues({
          ref,
          type,
          "data-slot": "input",
          className: inputVariants({
            variant,
            withIcon: iconPosition,
            className
          }),
          "aria-invalid": variant === "destructive" || void 0
        }, props)
      ),
      iconRight && /* @__PURE__ */ jsx4(
        "div",
        {
          className: cn(
            "absolute right-3 flex items-center justify-center pointer-events-none text-text-muted [&_svg]:size-4 transition-colors duration-200",
            variant === "destructive" && "text-text-error"
          ),
          "aria-hidden": "true",
          children: iconRight
        }
      )
    ] });
  }
);
Input.displayName = "Input";

// lib/components/ui/Base/Entradas/textarea.tsx
import * as React3 from "react";
import { cva as cva3 } from "class-variance-authority";
import { jsx as jsx5 } from "react/jsx-runtime";
var textareaVariants = cva3(
  "flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted font-sans transition-all duration-200 shadow-xs resize-y",
  {
    variants: {
      variant: {
        /* Sincronización exacta con el comportamiento óptico de producción en AGUSTIN */
        default: "border-border focus-visible:border-accent focus-visible:ring-border-strong/20",
        destructive: "border-error focus-visible:border-text-error focus-visible:ring-ring-error/20 text-text-error placeholder:text-text-error/50"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Textarea = React3.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant } = _b, props = __objRest(_b, ["className", "variant"]);
    return /* @__PURE__ */ jsx5(
      "textarea",
      __spreadValues({
        ref,
        className: cn(textareaVariants({ variant, className })),
        "aria-invalid": variant === "destructive" || void 0
      }, props)
    );
  }
);
Textarea.displayName = "Textarea";

// lib/components/ui/Tema/theme-provider.tsx
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { jsx as jsx6 } from "react/jsx-runtime";
function ThemeProvider(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx6(NextThemesProvider, __spreadProps(__spreadValues({}, props), { children }));
}

// lib/components/ui/Tema/ThemeToggle.tsx
import * as React4 from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { DropdownMenu as DropdownPrimitive } from "radix-ui";
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React4.useState(false);
  React4.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return /* @__PURE__ */ jsx7(
      "button",
      {
        className: "inline-flex items-center justify-center rounded-lg border border-border bg-transparent p-2 text-sm font-medium text-text-muted transition-colors opacity-60",
        "aria-label": "Cargando tema",
        disabled: true,
        children: /* @__PURE__ */ jsx7(Sun, { className: "size-5 animate-pulse" })
      }
    );
  }
  const CurrentIcon = theme === "dark" ? Moon : theme === "system" ? Laptop : Sun;
  return (
    // 2. Encapsulamos con Radix para un comportamiento flotante perfecto
    /* @__PURE__ */ jsxs4(DropdownPrimitive.Root, { children: [
      /* @__PURE__ */ jsx7(DropdownPrimitive.Trigger, { asChild: true, children: /* @__PURE__ */ jsx7("div", { className: "inline-block outline-none", children: /* @__PURE__ */ jsx7(
        "button",
        {
          className: cn(
            "inline-flex items-center justify-center rounded-lg border border-border bg-transparent p-2 text-sm font-medium text-text-muted transition-colors hover:bg-accent-soft hover:text-accent focus:outline-none focus:ring-4 focus:ring-border-strong/20 focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted"
          ),
          "aria-label": "Cambiar tema",
          children: /* @__PURE__ */ jsx7(CurrentIcon, { className: "size-5" })
        }
      ) }) }),
      /* @__PURE__ */ jsx7(DropdownPrimitive.Portal, { children: /* @__PURE__ */ jsxs4(
        DropdownPrimitive.Content,
        {
          align: "end",
          sideOffset: 8,
          className: cn(
            "bg-surface text-text-primary border border-border rounded-md p-1 z-[9999] w-36 outline-none",
            "shadow-xl",
            "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 duration-150"
          ),
          children: [
            /* @__PURE__ */ jsxs4(
              DropdownPrimitive.Item,
              {
                onClick: () => setTheme("light"),
                className: "flex w-full items-center px-3 py-2 text-sm rounded-md outline-none select-none cursor-pointer transition-colors text-text-secondary focus:bg-accent-soft focus:text-accent",
                children: [
                  /* @__PURE__ */ jsx7(Sun, { className: "mr-2.5 size-4" }),
                  /* @__PURE__ */ jsx7("span", { children: "Claro" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs4(
              DropdownPrimitive.Item,
              {
                onClick: () => setTheme("dark"),
                className: "flex w-full items-center px-3 py-2 text-sm rounded-md outline-none select-none cursor-pointer transition-colors text-text-secondary focus:bg-accent-soft focus:text-accent",
                children: [
                  /* @__PURE__ */ jsx7(Moon, { className: "mr-2.5 size-4" }),
                  /* @__PURE__ */ jsx7("span", { children: "Oscuro" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs4(
              DropdownPrimitive.Item,
              {
                onClick: () => setTheme("system"),
                className: "flex w-full items-center px-3 py-2 text-sm rounded-md outline-none select-none cursor-pointer transition-colors text-text-secondary focus:bg-accent-soft focus:text-accent",
                children: [
                  /* @__PURE__ */ jsx7(Laptop, { className: "mr-2.5 size-4" }),
                  /* @__PURE__ */ jsx7("span", { children: "Sistema" })
                ]
              }
            )
          ]
        }
      ) })
    ] })
  );
}

// lib/components/ui/Compuesto/Badges/LabelBadge.tsx
import { X } from "lucide-react";
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var colorVariantStyles = {
  neutral: {
    filled: "bg-primary text-primary-foreground border border-transparent",
    soft: "bg-muted text-text-primary border border-border/40",
    outline: "border border-border text-text-primary bg-transparent"
  },
  accent: {
    filled: "bg-accent text-white border border-transparent",
    soft: "bg-accent-soft text-accent border border-accent/20",
    outline: "border border-accent text-accent bg-transparent"
  },
  success: {
    filled: "bg-text-success text-white border border-transparent",
    soft: "bg-success text-text-success border border-text-success/20",
    outline: "border border-text-success text-text-success bg-transparent"
  },
  error: {
    filled: "bg-text-error text-white border border-transparent",
    soft: "bg-error text-text-error border border-text-error/20",
    outline: "border border-text-error text-text-error bg-transparent"
  },
  warning: {
    filled: "bg-text-warning text-white border border-transparent",
    soft: "bg-warning text-text-warning border border-text-warning/20",
    outline: "border border-text-warning text-text-warning bg-transparent"
  },
  info: {
    filled: "bg-text-info text-white border border-transparent",
    soft: "bg-info text-text-info border border-text-info/20",
    outline: "border border-text-info text-text-info bg-transparent"
  }
};
var sizeStyles = {
  sm: "text-xs px-2 py-0.5 gap-1 rounded-sm",
  md: "text-sm px-2.5 py-1 gap-1.5 rounded-md",
  lg: "text-sm px-3 py-1.5 gap-2 rounded-md"
};
var iconSizeStyles = {
  sm: "[&_svg]:size-3",
  md: "[&_svg]:size-3.5",
  lg: "[&_svg]:size-4"
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
  return /* @__PURE__ */ jsxs5(
    "span",
    {
      className: cn(
        "inline-flex items-center font-medium select-none tracking-tight font-sans transition-all duration-200",
        colorVariantStyles[color][variant],
        sizeStyles[size],
        className
      ),
      children: [
        icon && /* @__PURE__ */ jsx8(
          "span",
          {
            className: cn("flex-shrink-0 flex items-center justify-center text-current/80", iconSizeStyles[size]),
            "aria-hidden": "true",
            children: icon
          }
        ),
        /* @__PURE__ */ jsx8("span", { className: "truncate max-w-[140px] md:max-w-[200px]", children: label }),
        onRemove && /* @__PURE__ */ jsx8(
          "button",
          {
            type: "button",
            onClick: onRemove,
            className: cn(
              "flex items-center justify-center rounded-full opacity-60 hover:opacity-100 transition-all outline-none cursor-pointer p-0.5 hover:bg-current/10 -mr-1",
              "focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-current",
              iconSizeStyles[size]
            ),
            "aria-label": `Eliminar etiqueta ${label}`,
            children: /* @__PURE__ */ jsx8(X, { strokeWidth: 2 })
          }
        )
      ]
    }
  );
}

// lib/components/ui/Compuesto/Badges/label.tsx
import * as React5 from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva as cva4 } from "class-variance-authority";
import { jsx as jsx9 } from "react/jsx-runtime";
var labelVariants = cva4(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
var Label2 = React5.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx9(
    LabelPrimitive.Root,
    __spreadValues({
      ref,
      className: cn(labelVariants(), className)
    }, props)
  );
});
Label2.displayName = LabelPrimitive.Root.displayName;

// lib/components/ui/Compuesto/Contenedores/Card.tsx
import * as React6 from "react";
import { Slot as Slot2 } from "@radix-ui/react-slot";
import { jsx as jsx10, jsxs as jsxs6 } from "react/jsx-runtime";
var variantClasses = {
  default: "bg-background border border-border hover:border-accent/40",
  outlined: "bg-background border border-accent/40",
  elevated: "bg-background border border-border shadow-card hover:shadow-floating",
  accent: "bg-background border border-border border-l-4 border-l-accent shadow-raised",
  ghost: "bg-surface border border-border/50 shadow-none"
};
var Card = React6.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant = "default", clickable = false, fullWidth = false, asChild = false } = _b, props = __objRest(_b, ["className", "variant", "clickable", "fullWidth", "asChild"]);
    const Comp = asChild ? Slot2 : "div";
    return /* @__PURE__ */ jsx10(
      Comp,
      __spreadValues({
        ref,
        className: cn(
          "rounded-md overflow-hidden bg-background text-text-primary transition-all duration-200 flex flex-col w-fit h-auto font-sans border border-transparent",
          variantClasses[variant],
          fullWidth && "w-full",
          clickable && [
            "cursor-pointer outline-none",
            "focus-visible:outline-none focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-border-strong/20 focus-visible:ring-offset-0",
            "hover:-translate-y-0.5 active:scale-[0.99]"
          ],
          className
        )
      }, props)
    );
  }
);
Card.displayName = "Card";
function CardHeader(_a) {
  var _b = _a, {
    title,
    subtitle,
    action,
    withDivider = false,
    as: HeadingTag = "h4",
    className: className
  } = _b, props = __objRest(_b, [
    "title",
    "subtitle",
    "action",
    "withDivider",
    "as",
    // Por defecto h4 acorde a la escala visual de cards corporativas
    "className"
  ]);
  return /* @__PURE__ */ jsxs6("div", __spreadProps(__spreadValues({ className: cn("p-5 pb-3 flex flex-col relative", className) }, props), { children: [
    /* @__PURE__ */ jsxs6("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs6("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx10(HeadingTag, { className: "font-heading font-semibold text-lg leading-snug text-text-primary tracking-tight truncate", children: title }),
        subtitle && /* @__PURE__ */ jsx10("p", { className: "mt-1 text-sm text-text-secondary font-sans truncate", children: subtitle })
      ] }),
      action && /* @__PURE__ */ jsx10("div", { className: "shrink-0 flex items-center", children: action })
    ] }),
    withDivider && /* @__PURE__ */ jsx10("hr", { className: "w-full rule-holo mt-3 absolute bottom-0 left-0" })
  ] }));
}
CardHeader.displayName = "CardHeader";
function CardBody(_a) {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsx10(
    "div",
    __spreadProps(__spreadValues({
      className: cn("px-5 py-3 text-sm text-text-primary font-sans flex-1 leading-relaxed", className)
    }, props), {
      children
    })
  );
}
CardBody.displayName = "CardBody";
var footerAlignClasses = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
  between: "justify-between"
};
function CardFooter(_a) {
  var _b = _a, {
    align = "right",
    withDivider = false,
    className,
    children
  } = _b, props = __objRest(_b, [
    "align",
    "withDivider",
    "className",
    "children"
  ]);
  return /* @__PURE__ */ jsxs6(
    "div",
    __spreadProps(__spreadValues({
      className: cn(
        "flex items-center gap-2 px-5 py-4 mt-auto border-t border-transparent relative font-sans",
        footerAlignClasses[align],
        className
      )
    }, props), {
      children: [
        withDivider && /* @__PURE__ */ jsx10("div", { className: "w-full rule-holo absolute top-0 left-0" }),
        children
      ]
    })
  );
}
CardFooter.displayName = "CardFooter";
function CardImage(_a) {
  var _b = _a, {
    src,
    alt,
    height = "200px",
    className,
    imgClassName
  } = _b, props = __objRest(_b, [
    "src",
    "alt",
    "height",
    "className",
    "imgClassName"
  ]);
  return /* @__PURE__ */ jsx10(
    "div",
    __spreadProps(__spreadValues({
      className: cn("w-full overflow-hidden bg-muted shrink-0 relative", className),
      style: { height }
    }, props), {
      children: /* @__PURE__ */ jsx10(
        "img",
        {
          src,
          alt,
          className: cn("w-full h-full object-cover transition-transform duration-300 hover:scale-105", imgClassName),
          loading: "lazy"
        }
      )
    })
  );
}
CardImage.displayName = "CardImage";

// lib/components/ui/Compuesto/Contenedores/Dialog.tsx
import * as React7 from "react";
import { X as X2 } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
var sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl"
};
var DialogContext = React7.createContext({ variant: "default" });
var useDialogContext = () => React7.useContext(DialogContext);
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
  return /* @__PURE__ */ jsx11(DialogPrimitive.Root, { open, onOpenChange: (isOpen) => !isOpen && onClose(), children: /* @__PURE__ */ jsxs7(DialogPrimitive.Portal, { children: [
    /* @__PURE__ */ jsx11(
      DialogPrimitive.Overlay,
      {
        onClick: !closeOnOverlay ? (e) => e.preventDefault() : void 0,
        className: "fixed inset-0 z-50 bg-overlay-dark/50 data-[state=open]:animate-fade-in duration-200"
      }
    ),
    /* @__PURE__ */ jsx11("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none", children: /* @__PURE__ */ jsxs7(
      DialogPrimitive.Content,
      {
        className: cn(
          "relative w-full pointer-events-auto bg-background rounded-md overflow-hidden border border-border shadow-overlay",
          "data-[state=open]:animate-fade-in-soft duration-200 font-sans text-text-primary",
          sizeClasses[size],
          className
        ),
        children: [
          !hideCloseButton && /* @__PURE__ */ jsx11(DialogPrimitive.Close, { asChild: true, children: /* @__PURE__ */ jsx11(
            Button,
            {
              variant: "ghost",
              size: "icon-sm",
              "aria-label": "Cerrar ventana",
              className: "absolute top-4 right-4 text-text-muted hover:text-text-primary z-20",
              children: /* @__PURE__ */ jsx11(X2, {})
            }
          ) }),
          /* @__PURE__ */ jsx11(DialogContext.Provider, { value: { variant }, children })
        ]
      }
    ) })
  ] }) });
}
var variantIconBg = {
  default: "bg-accent-soft text-accent border border-accent/10",
  destructive: "bg-error text-text-error border border-text-error/10",
  warning: "bg-warning text-text-warning border border-text-warning/10",
  info: "bg-info text-text-info border border-text-info/10"
};
function DialogHeader({
  title,
  description,
  icon,
  withDivider = false,
  className = ""
}) {
  const { variant } = useDialogContext();
  return /* @__PURE__ */ jsxs7("div", { className: cn("px-6 pt-6 flex flex-col relative", withDivider ? "pb-4" : "pb-2", className), children: [
    /* @__PURE__ */ jsxs7("div", { className: "flex items-start gap-4", children: [
      icon && /* @__PURE__ */ jsx11(
        "span",
        {
          className: cn("flex items-center justify-center w-10 h-10 rounded-md shrink-0 transition-colors", variantIconBg[variant]),
          "aria-hidden": "true",
          children: icon
        }
      ),
      /* @__PURE__ */ jsxs7("div", { className: "flex-1 min-w-0 pr-6", children: [
        /* @__PURE__ */ jsx11(DialogPrimitive.Title, { asChild: true, children: /* @__PURE__ */ jsx11("h2", { className: "font-heading font-semibold text-lg leading-snug text-text-primary tracking-tight", children: title }) }),
        description && /* @__PURE__ */ jsx11(DialogPrimitive.Description, { asChild: true, children: /* @__PURE__ */ jsx11("p", { className: "mt-1 text-sm text-text-secondary leading-relaxed font-sans", children: description }) })
      ] })
    ] }),
    withDivider && /* @__PURE__ */ jsx11("hr", { className: "w-full rule-holo mt-4 absolute bottom-0 left-0" })
  ] });
}
DialogHeader.displayName = "DialogHeader";
function DialogBody({ scrollable = false, className = "", children }) {
  return /* @__PURE__ */ jsx11(
    "div",
    {
      className: cn(
        "px-6 py-4 text-sm text-text-primary font-sans leading-relaxed",
        scrollable && "overflow-y-auto max-h-[55vh] scrollbar-soft",
        className
      ),
      children
    }
  );
}
DialogBody.displayName = "DialogBody";
var footerAlignClasses2 = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
  between: "justify-between"
};
function DialogFooter({ align = "right", withDivider = true, className = "", children }) {
  return /* @__PURE__ */ jsxs7(
    "div",
    {
      className: cn(
        "flex items-center flex-wrap gap-2 px-6 pb-5 pt-4 border-t border-transparent relative font-sans",
        footerAlignClasses2[align],
        className
      ),
      children: [
        withDivider && /* @__PURE__ */ jsx11("div", { className: "w-full rule-holo absolute top-0 left-0" }),
        children
      ]
    }
  );
}
DialogFooter.displayName = "DialogFooter";

// lib/components/ui/Compuesto/Contenedores/alert-dialog.tsx
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import { jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
function AlertDialog(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx12(AlertDialogPrimitive.Root, __spreadValues({ "data-slot": "alert-dialog" }, props));
}
function AlertDialogTrigger(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx12(AlertDialogPrimitive.Trigger, __spreadValues({ "data-slot": "alert-dialog-trigger" }, props));
}
function AlertDialogPortal(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx12(AlertDialogPrimitive.Portal, __spreadValues({ "data-slot": "alert-dialog-portal" }, props));
}
function AlertDialogOverlay(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx12(
    AlertDialogPrimitive.Overlay,
    __spreadValues({
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "fixed inset-0 z-50 bg-black/40 dark:bg-black/65",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )
    }, props)
  );
}
function AlertDialogContent(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxs8(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx12(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx12(
      AlertDialogPrimitive.Content,
      __spreadValues({
        "data-slot": "alert-dialog-content",
        className: cn(
          "border border-border bg-background rounded-[0.5rem]",
          "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)]",
          "translate-x-[-50%] translate-y-[-50%] gap-5 p-7",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "duration-200 sm:max-w-md",
          className
        )
      }, props)
    )
  ] });
}
function AlertDialogHeader(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx12(
    "div",
    __spreadValues({
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-left", className)
    }, props)
  );
}
function AlertDialogFooter(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx12(
    "div",
    __spreadValues({
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end",
        className
      )
    }, props)
  );
}
function AlertDialogTitle(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx12(
    AlertDialogPrimitive.Title,
    __spreadValues({
      "data-slot": "alert-dialog-title",
      className: cn("font-syne text-xl font-semibold tracking-tight", className)
    }, props)
  );
}
function AlertDialogDescription(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx12(
    AlertDialogPrimitive.Description,
    __spreadValues({
      "data-slot": "alert-dialog-description",
      className: cn("text-text-secondary text-sm leading-relaxed", className)
    }, props)
  );
}
function AlertDialogAction(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx12(
    AlertDialogPrimitive.Action,
    __spreadValues({
      className: cn(buttonVariants({ variant: "destructive", size: "sm" }), className)
    }, props)
  );
}
function AlertDialogCancel(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx12(
    AlertDialogPrimitive.Cancel,
    __spreadValues({
      className: cn(buttonVariants({ variant: "outline", size: "sm" }), className)
    }, props)
  );
}

// lib/components/ui/Compuesto/Contenedores/confirm-delete-dialog.tsx
import { Loader2 } from "lucide-react";
import { jsx as jsx13, jsxs as jsxs9 } from "react/jsx-runtime";
function ConfirmDeleteDialog({
  open,
  onOpenChange,
  title = "Confirmar eliminacion",
  description,
  itemName,
  onConfirm,
  loading = false
}) {
  const desc = description != null ? description : itemName ? `Se eliminara "${itemName}". Esta accion no se puede deshacer.` : "Esta accion no se puede deshacer.";
  return /* @__PURE__ */ jsx13(AlertDialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs9(AlertDialogContent, { children: [
    /* @__PURE__ */ jsxs9(AlertDialogHeader, { children: [
      /* @__PURE__ */ jsx13(AlertDialogTitle, { children: title }),
      /* @__PURE__ */ jsx13(AlertDialogDescription, { children: desc })
    ] }),
    /* @__PURE__ */ jsxs9(AlertDialogFooter, { children: [
      /* @__PURE__ */ jsx13(AlertDialogCancel, { disabled: loading, children: "Cancelar" }),
      /* @__PURE__ */ jsxs9(
        AlertDialogAction,
        {
          onClick: (e) => {
            e.preventDefault();
            onConfirm();
          },
          disabled: loading,
          className: cn(buttonVariants({ variant: "destructive" })),
          children: [
            loading && /* @__PURE__ */ jsx13(Loader2, { className: "size-4 animate-spin" }),
            "Eliminar"
          ]
        }
      )
    ] })
  ] }) });
}

// lib/components/ui/Compuesto/Tooltip.tsx
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { jsx as jsx14, jsxs as jsxs10 } from "react/jsx-runtime";
var variantClasses2 = {
  default: "bg-primary text-white border border-transparent font-sans dark:bg-primary dark:text-primary-foreground",
  rich: "bg-surface text-text-primary border border-border shadow-floating font-sans"
};
var sizeClasses2 = {
  small: "max-w-[160px] px-2 py-1 text-xs font-medium",
  default: "max-w-[200px] px-3 py-1.5 text-xs font-medium",
  rich: "max-w-[280px] px-4 py-3 text-sm leading-relaxed"
};
function Tooltip({
  content,
  children,
  side = "top",
  ariaLabel,
  align = "center",
  variant = "default",
  size,
  disabled = false
}) {
  const resolvedSize = size != null ? size : variant === "rich" ? "rich" : "default";
  return /* @__PURE__ */ jsx14(TooltipPrimitive.Provider, { delayDuration: 200, children: /* @__PURE__ */ jsxs10(TooltipPrimitive.Root, { children: [
    /* @__PURE__ */ jsx14(TooltipPrimitive.Trigger, { asChild: true, children }),
    /* @__PURE__ */ jsx14(TooltipPrimitive.Portal, { children: !disabled && /* @__PURE__ */ jsxs10(
      TooltipPrimitive.Content,
      {
        side,
        align,
        sideOffset: 6,
        className: cn(
          "z-50 w-max break-words pointer-events-none select-none rounded-md shadow-card transition-all animate-fade-in-soft",
          variantClasses2[variant],
          sizeClasses2[resolvedSize]
        ),
        "aria-label": ariaLabel != null ? ariaLabel : typeof content === "string" ? content : void 0,
        children: [
          content,
          /* @__PURE__ */ jsx14(
            TooltipPrimitive.Arrow,
            {
              className: cn(
                "fill-current",
                variant === "default" ? "text-primary" : "text-default"
              ),
              width: 10,
              height: 5
            }
          )
        ]
      }
    ) })
  ] }) });
}

// lib/components/ui/Compuesto/dropdown-menu.tsx
import * as React8 from "react";
import * as DropdownPrimitive2 from "@radix-ui/react-dropdown-menu";
import { jsx as jsx15, jsxs as jsxs11 } from "react/jsx-runtime";
var DefaultTriggerIcon = /* @__PURE__ */ jsxs11(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ jsx15("circle", { cx: "12", cy: "12", r: "1" }),
      /* @__PURE__ */ jsx15("circle", { cx: "19", cy: "12", r: "1" }),
      /* @__PURE__ */ jsx15("circle", { cx: "5", cy: "12", r: "1" })
    ]
  }
);
function DropdownMenu({
  trigger,
  groups,
  align = "start",
  width = "w-52",
  disabled = false,
  className = "",
  triggerIcon = DefaultTriggerIcon
}) {
  const handleItemClick = React8.useCallback((item) => {
    var _a;
    if (item.disabled) return;
    (_a = item.onClick) == null ? void 0 : _a.call(item);
  }, []);
  return /* @__PURE__ */ jsxs11(DropdownPrimitive2.Root, { children: [
    /* @__PURE__ */ jsx15(DropdownPrimitive2.Trigger, { asChild: true, disabled, children: /* @__PURE__ */ jsxs11(
      "button",
      {
        type: "button",
        className: cn(
          "group inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-3 h-10 text-sm font-medium text-text-primary shadow-xs cursor-pointer select-none transition-all duration-200 outline-none",
          "focus-visible:outline-none focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-border-strong/20 focus-visible:ring-offset-0",
          "data-[state=open]:border-accent data-[state=open]:ring-4 data-[state=open]:ring-border-strong/20 data-[state=open]:ring-offset-0",
          disabled && "cursor-not-allowed opacity-50 bg-muted text-text-disabled",
          className
        ),
        children: [
          trigger,
          triggerIcon && /* @__PURE__ */ jsx15(
            "span",
            {
              className: "text-text-muted/70 transition-transform duration-200 group-data-[state=open]:rotate-180 flex items-center justify-center",
              "aria-hidden": "true",
              children: triggerIcon
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx15(DropdownPrimitive2.Portal, { children: /* @__PURE__ */ jsx15(
      DropdownPrimitive2.Content,
      {
        align,
        sideOffset: 6,
        className: cn(
          "bg-background text-text-primary border border-border rounded-md p-1 z-50 overflow-hidden font-sans",
          "shadow-floating outline-none",
          "data-[state=open]:animate-fade-in-soft",
          width
        ),
        children: groups.map((group, gIdx) => /* @__PURE__ */ jsxs11(DropdownPrimitive2.Group, { className: "flex flex-col gap-0.5", children: [
          group.groupLabel && /* @__PURE__ */ jsx15(DropdownPrimitive2.Label, { className: "px-3 pt-2 pb-1 text-text-muted select-none label-mono tracking-wider", children: group.groupLabel }),
          group.items.map((item, iIdx) => /* @__PURE__ */ jsxs11("div", { children: [
            /* @__PURE__ */ jsxs11(
              DropdownPrimitive2.Item,
              {
                disabled: item.disabled,
                onSelect: () => handleItemClick(item),
                className: cn(
                  "flex w-full items-center gap-2.5 px-3 py-1.5 text-sm text-left rounded-sm outline-none select-none transition-colors duration-150 cursor-pointer font-sans",
                  "data-[disabled]:cursor-not-allowed data-[disabled]:text-text-disabled data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
                  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
                  item.variant === "danger" ? "text-text-error focus:bg-error focus:text-text-error font-medium" : "text-text-primary focus:bg-muted focus:text-text-primary"
                ),
                children: [
                  item.icon && /* @__PURE__ */ jsx15("span", { className: "shrink-0 text-current flex items-center justify-center", "aria-hidden": "true", children: item.icon }),
                  /* @__PURE__ */ jsx15("span", { className: "flex-1 truncate", children: item.label }),
                  item.trailingIcon && /* @__PURE__ */ jsx15("span", { className: "shrink-0 text-text-muted/60 flex items-center justify-center", "aria-hidden": "true", children: item.trailingIcon })
                ]
              }
            ),
            item.separator && /* @__PURE__ */ jsx15(DropdownPrimitive2.Separator, { className: "h-px bg-muted rule-holo my-1 -mx-1 pointer-events-none" })
          ] }, iIdx)),
          gIdx < groups.length - 1 && /* @__PURE__ */ jsx15(DropdownPrimitive2.Separator, { className: "h-px bg-muted rule-holo my-1 -mx-1 pointer-events-none" })
        ] }, gIdx))
      }
    ) })
  ] });
}

// lib/components/ui/Compuesto/Calendario.tsx
import { useState as useState3, useCallback as useCallback2, useMemo as useMemo2, useEffect as useEffect3 } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, X as X3 } from "lucide-react";
import Holidays from "date-holidays";
import { Popover as PopoverPrimitive } from "radix-ui";
import { Fragment, jsx as jsx16, jsxs as jsxs12 } from "react/jsx-runtime";
var DIAS_SEMANA = ["Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b", "Dom"];
var MESES_LARGO = {
  0: "ENERO",
  1: "FEBRERO",
  2: "MARZO",
  3: "ABRIL",
  4: "MAYO",
  5: "JUNIO",
  6: "JULIO",
  7: "AGOSTO",
  8: "SEPTIEMBRE",
  9: "OCTUBRE",
  10: "NOVIEMBRE",
  11: "DICIEMBRE"
};
var MESES_CORTO = {
  0: "Ene",
  1: "Feb",
  2: "Mar",
  3: "Abr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Ago",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dic"
};
function getDiasDelMes(year, month) {
  const primerDia = new Date(year, month, 1).getDay();
  const offset = primerDia === 0 ? 6 : primerDia - 1;
  const totalDias = new Date(year, month + 1, 0).getDate();
  const dias = Array(offset).fill(null);
  for (let i = 1; i <= totalDias; i++) dias.push(i);
  return dias;
}
function isSameDay(a, b) {
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}
function isWeekendDate(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}
function isDisabledDay(day, year, month, min, max) {
  const d = new Date(year, month, day);
  if (min && d < new Date(min.getFullYear(), min.getMonth(), min.getDate())) return true;
  if (max && d > new Date(max.getFullYear(), max.getMonth(), max.getDate())) return true;
  return false;
}
function isDisabledMonth(year, month, min, max) {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  if (min && end < new Date(min.getFullYear(), min.getMonth(), 1)) return true;
  if (max && start > new Date(max.getFullYear(), max.getMonth() + 1, 0)) return true;
  return false;
}
function isDisabledYear(year, min, max) {
  if (min && year < min.getFullYear()) return true;
  if (max && year > max.getFullYear()) return true;
  return false;
}
function formatDate(date, mode = "date") {
  if (mode === "year") return String(date.getFullYear());
  if (mode === "month") return date.toLocaleDateString("es-CO", { month: "long", year: "numeric" });
  return date.toLocaleDateString("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" });
}
var YearGrid = ({ yearBase, selected, onSelectYear, minDate, maxDate, size = "lg" }) => {
  const years = Array.from({ length: 12 }, (_, i) => yearBase + i);
  const today = /* @__PURE__ */ new Date();
  return /* @__PURE__ */ jsx16("div", { className: "grid grid-cols-4 gap-1", children: years.map((year) => {
    const isSelected = selected ? selected.getFullYear() === year : false;
    const isCurrentYear = today.getFullYear() === year;
    const disabled = isDisabledYear(year, minDate, maxDate);
    return /* @__PURE__ */ jsx16(
      "button",
      {
        type: "button",
        disabled,
        onClick: () => !disabled && onSelectYear(year),
        className: cn(
          "flex items-center justify-center rounded-md border transition-all duration-150 outline-none",
          size === "lg" ? "h-10 text-sm" : "h-8 text-xs",
          isSelected ? "bg-accent text-white border-accent shadow-xs" : isCurrentYear ? "border-accent bg-accent-soft text-accent font-medium" : disabled ? "text-text-disabled bg-muted/50 cursor-not-allowed border-border" : "border-border text-text-primary hover:bg-accent-soft hover:text-accent hover:border-accent cursor-pointer"
        ),
        children: year
      },
      year
    );
  }) });
};
var MonthGrid = ({ year, selected, onSelectMonth, minDate, maxDate, size = "lg" }) => {
  const today = /* @__PURE__ */ new Date();
  return /* @__PURE__ */ jsx16("div", { className: "grid grid-cols-3 gap-1", children: Object.entries(MESES_CORTO).map(([key, label]) => {
    const month = Number(key);
    const isSelected = selected ? selected.getFullYear() === year && selected.getMonth() === month : false;
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    const disabled = isDisabledMonth(year, month, minDate, maxDate);
    return /* @__PURE__ */ jsx16(
      "button",
      {
        type: "button",
        disabled,
        onClick: () => !disabled && onSelectMonth(month),
        className: cn(
          "flex items-center justify-center rounded-md border transition-all duration-150 outline-none",
          size === "lg" ? "h-12 text-sm" : "h-9 text-xs",
          isSelected ? "bg-accent text-white border-accent shadow-xs" : isCurrentMonth ? "border-accent bg-accent-soft text-accent font-medium" : disabled ? "text-text-disabled bg-muted/50 cursor-not-allowed border-border" : "border-border text-text-primary hover:bg-accent-soft hover:text-accent hover:border-accent cursor-pointer"
        ),
        children: label
      },
      month
    );
  }) });
};
var CalendarGrid = ({ year, month, selected, today, onSelectDay, minDate, maxDate, size = "lg" }) => {
  const dias = getDiasDelMes(year, month);
  const holidays = useMemo2(() => {
    const hd = new Holidays("CO");
    return hd.getHolidays(year).map((h) => new Date(h.date));
  }, [year]);
  return /* @__PURE__ */ jsxs12(Fragment, { children: [
    /* @__PURE__ */ jsx16("div", { className: cn("grid grid-cols-7", size === "lg" ? "mb-2" : "mb-1"), children: DIAS_SEMANA.map((d, i) => /* @__PURE__ */ jsx16("div", { className: cn("text-center font-medium border-b border-border text-text-muted select-none", size === "lg" ? "text-sm py-2" : "text-[12px] py-1"), children: d }, i)) }),
    /* @__PURE__ */ jsx16("div", { className: "grid grid-cols-7", children: dias.map((day, i) => {
      if (!day) return /* @__PURE__ */ jsx16("div", { className: size === "lg" ? "h-14 w-full" : "h-8 w-8 mx-auto" }, `empty-${i}`);
      const date = new Date(year, month, day);
      const isSelected = selected ? isSameDay(date, selected) : false;
      const isToday = isSameDay(date, today);
      const disabled = isDisabledDay(day, year, month, minDate, maxDate);
      const isHolidayDay = holidays.some((h) => isSameDay(date, h));
      const isWeekendDayValue = !isHolidayDay && isWeekendDate(date);
      return /* @__PURE__ */ jsxs12(
        "button",
        {
          type: "button",
          disabled,
          onClick: () => !disabled && onSelectDay(day),
          className: cn(
            "flex flex-col items-center justify-center border border-border select-none transition-all duration-150 outline-none",
            size === "lg" ? "h-14 w-full p-1" : "h-8 w-8 mx-auto rounded-md",
            isSelected ? "bg-accent text-white border-accent shadow-xs scale-102" : isToday ? "border-accent bg-accent-soft text-accent font-semibold" : disabled ? "text-text-disabled bg-muted/40 cursor-not-allowed" : isHolidayDay ? "bg-error/40 text-text-error border-text-error/20" : isWeekendDayValue ? "bg-muted/20 text-text-muted hover:bg-muted/40" : "text-text-primary hover:bg-accent-soft hover:text-accent"
          ),
          children: [
            /* @__PURE__ */ jsx16("span", { className: cn("text-center block", size === "lg" ? "text-sm font-medium" : "text-xs"), children: day }),
            size === "lg" && /* @__PURE__ */ jsx16("span", { className: "text-[10px] block opacity-80 truncate", children: isHolidayDay ? "Festivo" : isToday ? "Hoy" : "" })
          ]
        },
        `day-${day}`
      );
    }) })
  ] });
};
var CalendarHeader = ({ year, month, mode, yearBase, onPrev, onNext, onClickTitle, selectionMode, size = "lg" }) => {
  const canDrillUp = mode === "days" && selectionMode === "date" || mode === "months" && (selectionMode === "date" || selectionMode === "month") || mode === "days" && selectionMode === "month";
  const titleLabel = mode === "years" ? `${yearBase} \u2013 ${yearBase + 11}` : mode === "months" ? String(year) : `${MESES_LARGO[month]} ${year}`;
  return /* @__PURE__ */ jsxs12("div", { className: cn("flex items-center justify-between", size === "lg" ? "mb-4 px-1" : "mb-2 px-0"), children: [
    /* @__PURE__ */ jsx16("button", { type: "button", className: cn("flex items-center justify-center rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent hover:bg-accent-soft transition-all duration-150 cursor-pointer outline-none", size === "lg" ? "size-9" : "size-7"), onClick: onPrev, children: /* @__PURE__ */ jsx16(ChevronLeft, { size: size === "lg" ? 16 : 14 }) }),
    /* @__PURE__ */ jsxs12("button", { type: "button", onClick: canDrillUp ? onClickTitle : void 0, className: cn("flex flex-col items-center px-3 py-1 rounded-md transition-all duration-150 outline-none", canDrillUp ? "cursor-pointer hover:bg-accent-soft hover:text-accent" : "cursor-default"), children: [
      /* @__PURE__ */ jsx16("span", { className: cn("font-semibold tracking-wider text-text-primary", size === "lg" ? "text-sm" : "text-xs"), children: titleLabel }),
      canDrillUp && /* @__PURE__ */ jsx16("span", { className: "text-accent text-[9px] font-medium mt-0.5", children: "\u25B2 cambiar vista" })
    ] }),
    /* @__PURE__ */ jsx16("button", { type: "button", className: cn("flex items-center justify-center rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent hover:bg-accent-soft transition-all duration-150 cursor-pointer outline-none", size === "lg" ? "size-9" : "size-7"), onClick: onNext, children: /* @__PURE__ */ jsx16(ChevronRight, { size: size === "lg" ? 16 : 14 }) })
  ] });
};
var Calendar = ({
  variant = "full",
  selectionMode = "date",
  value = null,
  onChange,
  minDate,
  maxDate,
  placeholder = "Seleccionar fecha",
  label,
  disabled = false,
  className = ""
}) => {
  const today = useMemo2(() => /* @__PURE__ */ new Date(), []);
  const [isMounted, setIsMounted] = useState3(false);
  useEffect3(() => {
    setIsMounted(true);
  }, []);
  const [viewDate, setViewDate] = useState3(() => {
    const base = value != null ? value : /* @__PURE__ */ new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const initialMode = selectionMode === "year" ? "years" : selectionMode === "month" ? "months" : "days";
  const [mode, setMode] = useState3(initialMode);
  const [yearBase, setYearBase] = useState3(() => {
    const y = (value != null ? value : /* @__PURE__ */ new Date()).getFullYear();
    return Math.floor(y / 12) * 12;
  });
  const handlePrev = useCallback2(() => {
    if (mode === "years") setYearBase((b) => b - 12);
    else if (mode === "months") setViewDate((d) => new Date(d.getFullYear() - 1, d.getMonth(), 1));
    else setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }, [mode]);
  const handleNext = useCallback2(() => {
    if (mode === "years") setYearBase((b) => b + 12);
    else if (mode === "months") setViewDate((d) => new Date(d.getFullYear() + 1, d.getMonth(), 1));
    else setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }, [mode]);
  const handleClickTitle = useCallback2(() => {
    if (mode === "days") setMode("months");
    else if (mode === "months") {
      setYearBase(Math.floor(viewYear / 12) * 12);
      setMode("years");
    }
  }, [mode, viewYear]);
  const handleSelectYear = useCallback2((year) => {
    setViewDate(new Date(year, viewMonth, 1));
    if (selectionMode === "year") {
      onChange == null ? void 0 : onChange(new Date(year, 0, 1));
    } else setMode("months");
  }, [viewMonth, selectionMode, onChange]);
  const handleSelectMonth = useCallback2((month) => {
    setViewDate(new Date(viewYear, month, 1));
    if (selectionMode === "month" || selectionMode === "year") {
      onChange == null ? void 0 : onChange(new Date(viewYear, month, 1));
    } else setMode("days");
  }, [viewYear, selectionMode, onChange]);
  const handleSelectDay = useCallback2((day) => {
    onChange == null ? void 0 : onChange(new Date(viewYear, viewMonth, day));
  }, [viewYear, viewMonth, onChange]);
  const handleClear = (e) => {
    e.stopPropagation();
    onChange == null ? void 0 : onChange(null);
  };
  const renderBody = (size) => /* @__PURE__ */ jsxs12("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsx16(
      CalendarHeader,
      {
        year: viewYear,
        month: viewMonth,
        mode,
        yearBase,
        onPrev: handlePrev,
        onNext: handleNext,
        onClickTitle: handleClickTitle,
        selectionMode,
        size
      }
    ),
    mode === "years" && /* @__PURE__ */ jsx16(YearGrid, { yearBase, selected: value, onSelectYear: handleSelectYear, minDate, maxDate, size }),
    mode === "months" && /* @__PURE__ */ jsx16(MonthGrid, { year: viewYear, selected: value, onSelectMonth: handleSelectMonth, minDate, maxDate, size }),
    mode === "days" && /* @__PURE__ */ jsx16(CalendarGrid, { year: viewYear, month: viewMonth, selected: value, today, onSelectDay: handleSelectDay, minDate, maxDate, size })
  ] });
  if (!isMounted) return /* @__PURE__ */ jsx16("div", { className: "h-10 min-w-[220px] bg-muted/20 animate-pulse rounded-md" });
  if (variant === "full") {
    return /* @__PURE__ */ jsx16("div", { className: cn("bg-background rounded-xl border border-border p-5 w-full max-w-xl shadow-xs", className), children: renderBody("lg") });
  }
  return /* @__PURE__ */ jsxs12("div", { className: cn("flex flex-col gap-1.5 w-fit", className), children: [
    label && /* @__PURE__ */ jsx16("label", { className: "text-sm text-text-secondary font-medium select-none", children: label }),
    /* @__PURE__ */ jsxs12(PopoverPrimitive.Root, { children: [
      /* @__PURE__ */ jsx16(PopoverPrimitive.Trigger, { asChild: true, disabled, children: /* @__PURE__ */ jsxs12(
        "button",
        {
          type: "button",
          className: cn(
            "inline-flex items-center gap-2 h-10 px-3 rounded-md border text-sm transition-all duration-150 min-w-[220px] text-left bg-background outline-none shadow-xs",
            "border-border text-text-primary hover:border-accent cursor-pointer",
            "data-[state=open]:border-accent data-[state=open]:ring-[3px] data-[state=open]:ring-accent-soft",
            disabled && "opacity-50 cursor-not-allowed bg-muted"
          ),
          children: [
            /* @__PURE__ */ jsx16(CalendarDays, { size: 16, className: "text-text-muted shrink-0" }),
            /* @__PURE__ */ jsx16("span", { className: cn("flex-1 truncate", !value && "text-text-muted"), children: value ? formatDate(value, selectionMode) : placeholder }),
            value && !disabled && /* @__PURE__ */ jsx16("span", { role: "button", onClick: handleClear, className: "text-text-muted hover:text-text-primary transition-colors shrink-0 p-0.5", "aria-label": "Limpiar fecha", children: /* @__PURE__ */ jsx16(X3, { size: 14 }) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx16(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx16(
        PopoverPrimitive.Content,
        {
          side: "bottom",
          sideOffset: 6,
          align: "start",
          className: cn(
            "z-[9999] bg-background border border-border rounded-md p-4 w-auto min-w-64 shadow-[var(--shadow-card)] outline-none",
            "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 duration-150"
          ),
          children: renderBody("sm")
        }
      ) })
    ] })
  ] });
};

// lib/components/ui/DataDisplay/Graficas/GraficaBar.tsx
import { useState as useState4, useRef as useRef2 } from "react";
import { jsx as jsx17, jsxs as jsxs13 } from "react/jsx-runtime";
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
  barRadius = 4,
  legendLabel,
  yLabel
}) => {
  const [hoveredIndex, setHoveredIndex] = useState4(null);
  const containerRef = useRef2(null);
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
  return /* @__PURE__ */ jsxs13(
    "div",
    {
      ref: containerRef,
      className: cn("relative rounded-md border border-border  shadow-xs p-2 select-none", className),
      onMouseLeave: () => {
        setHoveredIndex(null);
        setTooltip(null);
      },
      children: [
        title && /* @__PURE__ */ jsx17("p", { className: "text-sm font-semibold text-text-primary", children: title }),
        description && /* @__PURE__ */ jsx17("p", { className: "text-xs text-text-muted mt-0.5 mb-2", children: description }),
        /* @__PURE__ */ jsxs13("div", { className: "w-full relative overflow-hidden", children: [
          /* @__PURE__ */ jsxs13("svg", { width: "100%", viewBox: `0 0 ${svgW} ${height}`, className: "relative z-0 overflow-visible", children: [
            yLabel && /* @__PURE__ */ jsx17("text", { x: 10, y: padding.top - 5, fill: "var(--text-muted)", fontSize: 10, fontWeight: 600, children: yLabel }),
            /* @__PURE__ */ jsxs13("g", { transform: `translate(${padding.left}, ${padding.top + 10})`, children: [
              yTicks.map((tick) => {
                const y = chartH - tick / ceilMax * chartH;
                return /* @__PURE__ */ jsxs13("g", { children: [
                  /* @__PURE__ */ jsx17(
                    "line",
                    {
                      x1: 0,
                      y1: y,
                      x2: svgW - padding.left - padding.right,
                      y2: y,
                      stroke: "var(--border-default)",
                      strokeDasharray: "4 3",
                      strokeWidth: 0.5
                    }
                  ),
                  /* @__PURE__ */ jsx17("text", { x: -10, y: y + 4, textAnchor: "end", fill: "var(--text-muted)", fontSize: 10, children: formatVal(tick) })
                ] }, tick);
              }),
              data.map((item, i) => {
                const barH = item.value / ceilMax * chartH;
                const x = i * 72 + 16;
                const isHov = hoveredIndex === i;
                return /* @__PURE__ */ jsxs13("g", { children: [
                  /* @__PURE__ */ jsx17(
                    "rect",
                    {
                      x: x - 10,
                      y: 0,
                      width: 48,
                      height: chartH,
                      fill: "transparent",
                      className: "cursor-pointer",
                      onMouseEnter: (e) => {
                        var _a;
                        setHoveredIndex(i);
                        const containerRect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
                        if (!containerRect) return;
                        const xCenter = e.clientX - containerRect.left;
                        const yTop = e.clientY - containerRect.top - 20;
                        setTooltip({ x: xCenter, y: yTop, label: item.label, value: item.value });
                      },
                      onMouseMove: (e) => {
                        var _a;
                        const containerRect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
                        if (!containerRect) return;
                        setTooltip((prev) => prev ? __spreadProps(__spreadValues({}, prev), { x: e.clientX - containerRect.left, y: e.clientY - containerRect.top - 20 }) : null);
                      }
                    }
                  ),
                  isHov && /* @__PURE__ */ jsx17(
                    "rect",
                    {
                      x: x - 6,
                      y: 0,
                      width: 42,
                      height: chartH,
                      rx: 6,
                      fill: chartColors[i % chartColors.length],
                      opacity: 0.06
                    }
                  ),
                  /* @__PURE__ */ jsx17(
                    "rect",
                    {
                      x,
                      y: chartH - barH,
                      width: 30,
                      height: barH,
                      rx: barRadius,
                      fill: chartColors[i % chartColors.length],
                      opacity: isHov ? 1 : 0.85,
                      className: "transition-all duration-200 ease-out pointer-events-none",
                      style: {
                        transformOrigin: `0px ${chartH}px`,
                        filter: isHov ? `drop-shadow(0 4px 12px ${chartColors[i % chartColors.length]}40)` : "none"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsx17(
                    "text",
                    {
                      x: x + 15,
                      y: chartH + 20,
                      textAnchor: "middle",
                      fill: isHov ? "var(--text-primary)" : "var(--text-muted)",
                      fontSize: 11,
                      fontWeight: isHov ? 600 : 400,
                      className: "transition-colors duration-150",
                      children: item.label
                    }
                  )
                ] }, `bar-${item.label}-${i}`);
              }),
              /* @__PURE__ */ jsx17("line", { x1: 0, y1: chartH, x2: svgW - padding.left - padding.right, y2: chartH, stroke: "var(--border-strong)" })
            ] })
          ] }),
          tooltip && /* @__PURE__ */ jsx17(
            "div",
            {
              className: "absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-full transition-all duration-75",
              style: { left: tooltip.x, top: tooltip.y },
              children: /* @__PURE__ */ jsxs13("div", { className: "bg-primary text-background text-xs rounded-lg px-3 py-2 shadow-xl border border-border/10 whitespace-nowrap text-center", children: [
                /* @__PURE__ */ jsx17("p", { className: "opacity-80 text-[10px] uppercase tracking-wider", children: tooltip.label }),
                /* @__PURE__ */ jsx17("p", { className: "text-sm font-bold mt-0.5", children: formatVal(tooltip.value) })
              ] })
            }
          )
        ] }),
        legendLabel && /* @__PURE__ */ jsxs13("div", { className: "flex justify-center items-center gap-2 mt-4", children: [
          /* @__PURE__ */ jsx17("div", { className: "w-3 h-3 rounded-xs", style: { backgroundColor: chartColors[0] } }),
          /* @__PURE__ */ jsx17("span", { className: "text-xs text-text-secondary font-medium", children: legendLabel })
        ] })
      ]
    }
  );
};
var GraficaBar_default = GraficaBar;

// lib/components/ui/DataDisplay/Graficas/GraficaDonut.tsx
import { useState as useState5 } from "react";
import { Fragment as Fragment2, jsx as jsx18, jsxs as jsxs14 } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsxs14("div", { className: "p-6 rounded-2xl bg-background border border-border animate-pulse", children: [
      /* @__PURE__ */ jsx18("div", { className: "h-4 w-32 bg-muted rounded mb-4" }),
      /* @__PURE__ */ jsx18("div", { className: "h-[180px] w-[180px] bg-muted rounded-full mx-auto" })
    ] });
  }
  if (!data.length) {
    return /* @__PURE__ */ jsx18("div", { className: "p-6 rounded-2xl bg-surface border border-border text-center", children: /* @__PURE__ */ jsx18("p", { className: "text-sm text-text-muted", children: "No hay datos disponibles" }) });
  }
  return /* @__PURE__ */ jsxs14("div", { className: "rounded-md bg-background border border-border shadow-xs p-6", children: [
    (title || description) && /* @__PURE__ */ jsxs14("div", { className: "mb-4", children: [
      title && /* @__PURE__ */ jsx18("p", { className: "text-sm font-semibold text-text-primary", children: title }),
      description && /* @__PURE__ */ jsx18("p", { className: "text-xs text-text-muted mt-1", children: description })
    ] }),
    /* @__PURE__ */ jsxs14("div", { className: "flex flex-col items-center gap-8 justify-center", children: [
      /* @__PURE__ */ jsxs14("div", { style: { width: size, height: size }, className: "relative mx-auto md:mx-0", children: [
        /* @__PURE__ */ jsxs14("svg", { className: "w-full h-full -rotate-90", children: [
          /* @__PURE__ */ jsx18(
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
            return /* @__PURE__ */ jsx18("g", { children: /* @__PURE__ */ jsx18(
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
        hoveredIndex !== null && /* @__PURE__ */ jsx18(
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
            children: /* @__PURE__ */ jsxs14("div", { className: "bg-[#0A0A0B] text-white text-xs rounded-md px-3 py-1 shadow-xl whitespace-nowrap", children: [
              /* @__PURE__ */ jsx18("p", { className: "font-semibold", children: segmentMeta[hoveredIndex].label }),
              /* @__PURE__ */ jsx18("p", { className: "text-center", children: formatValue(segmentMeta[hoveredIndex].value) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx18("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none", children: showTotal ? /* @__PURE__ */ jsxs14(Fragment2, { children: [
          /* @__PURE__ */ jsx18("span", { className: "text-xs text-text-muted", children: "Total" }),
          /* @__PURE__ */ jsx18("span", { className: "text-xl font-bold text-accent", children: formatValue(total) })
        ] }) : null })
      ] }),
      /* @__PURE__ */ jsx18("div", { className: "flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4", children: segmentMeta.map((item, i) => {
        const isActive = hoveredIndex === i;
        return /* @__PURE__ */ jsxs14(
          "div",
          {
            onMouseEnter: () => setHoveredIndex(i),
            onMouseLeave: () => setHoveredIndex(null),
            className: `flex items-center gap-2 text-sm transition-all duration-200
                                  ${isActive ? "opacity-100 scale-100" : "opacity-80"}
                                `,
            children: [
              /* @__PURE__ */ jsx18(
                "div",
                {
                  className: "w-2.5 h-2.5 rounded-full",
                  style: {
                    backgroundColor: item.color,
                    boxShadow: isActive ? `0 0 6px ${item.color}` : "none"
                  }
                }
              ),
              /* @__PURE__ */ jsx18("span", { className: "text-text-primary", children: item.label })
            ]
          },
          i
        );
      }) })
    ] })
  ] });
};
var GraficaDonut_default = GraficaDonut;

// lib/components/ui/DataDisplay/Graficas/GraficaLine.tsx
import { useState as useState6, useRef as useRef3 } from "react";
import { Fragment as Fragment3, jsx as jsx19, jsxs as jsxs15 } from "react/jsx-runtime";
var PureLineChart = ({
  className,
  data,
  title,
  description,
  height = 240,
  lineColor = "var(--accent)",
  showArea = true,
  legendLabel,
  yLabel
}) => {
  const [hoveredIndex, setHoveredIndex] = useState6(null);
  const [tooltip, setTooltip] = useState6(null);
  const containerRef = useRef3(null);
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
  const gradientId = `area-grad-${lineColor.replace(/[^a-zA-Z0-9]/g, "")}`;
  const formatVal = (n) => {
    if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
    if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
    return Number.isInteger(n) ? n.toString() : n.toFixed(1);
  };
  return /* @__PURE__ */ jsxs15(
    "div",
    {
      ref: containerRef,
      className: cn("relative rounded-md border border-border shadow-xs p-5 select-none", className),
      onMouseLeave: () => {
        setHoveredIndex(null);
        setTooltip(null);
      },
      children: [
        title && /* @__PURE__ */ jsx19("p", { className: "text-sm font-semibold text-text-primary", children: title }),
        description && /* @__PURE__ */ jsx19("p", { className: "text-xs text-text-muted mt-0.5 mb-2", children: description }),
        /* @__PURE__ */ jsxs15("div", { className: "w-full overflow-x-auto relative scrollbar-none", children: [
          /* @__PURE__ */ jsxs15("svg", { width: "100%", viewBox: `0 0 ${svgW} ${height}`, className: "overflow-visible", children: [
            yLabel && /* @__PURE__ */ jsx19("text", { x: 10, y: padding.top - 8, fill: "var(--text-muted)", fontSize: 10, fontWeight: 600, children: yLabel }),
            /* @__PURE__ */ jsx19("defs", { children: showArea && /* @__PURE__ */ jsxs15("linearGradient", { id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx19("stop", { offset: "0%", stopColor: lineColor, stopOpacity: 0.25 }),
              /* @__PURE__ */ jsx19("stop", { offset: "100%", stopColor: lineColor, stopOpacity: 0 })
            ] }) }),
            /* @__PURE__ */ jsxs15("g", { transform: `translate(${padding.left}, ${padding.top + 15})`, children: [
              yTicks.map((tick) => {
                const y = scaleY(tick);
                return /* @__PURE__ */ jsxs15("g", { children: [
                  /* @__PURE__ */ jsx19("line", { x1: 0, y1: y, x2: chartW, y2: y, stroke: "var(--border-default)", strokeDasharray: "4 3", strokeWidth: 0.5 }),
                  /* @__PURE__ */ jsx19("text", { x: -10, y: y + 4, textAnchor: "end", fill: "var(--text-muted)", fontSize: 10, children: formatVal(Math.round(tick)) })
                ] }, tick);
              }),
              showArea && /* @__PURE__ */ jsx19("path", { d: areaPath, fill: `url(#${gradientId})` }),
              /* @__PURE__ */ jsx19("path", { d: smoothLine, fill: "none", stroke: lineColor, strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }),
              hoveredIndex !== null && /* @__PURE__ */ jsxs15(Fragment3, { children: [
                /* @__PURE__ */ jsx19(
                  "line",
                  {
                    x1: scaleX(hoveredIndex),
                    y1: 0,
                    x2: scaleX(hoveredIndex),
                    y2: chartH,
                    stroke: lineColor,
                    strokeWidth: 1,
                    strokeDasharray: "4 3",
                    className: "opacity-40"
                  }
                ),
                /* @__PURE__ */ jsx19("circle", { cx: scaleX(hoveredIndex), cy: scaleY(data[hoveredIndex].value), r: 6, fill: lineColor, className: "opacity-20" })
              ] }),
              data.map((d, i) => {
                const cx = scaleX(i), cy = scaleY(d.value);
                const isHov = hoveredIndex === i;
                return /* @__PURE__ */ jsx19(
                  "circle",
                  {
                    cx,
                    cy,
                    r: isHov ? 5 : 3,
                    fill: "var(--bg-surface)",
                    stroke: lineColor,
                    strokeWidth: 2,
                    className: "transition-all duration-150"
                  },
                  i
                );
              }),
              data.map((d, i) => /* @__PURE__ */ jsx19(
                "text",
                {
                  x: scaleX(i),
                  y: chartH + 20,
                  textAnchor: "middle",
                  fill: hoveredIndex === i ? "var(--text-primary)" : "var(--text-muted)",
                  fontSize: 11,
                  fontWeight: hoveredIndex === i ? 600 : 400,
                  className: "transition-colors duration-150",
                  children: d.label
                },
                i
              )),
              /* @__PURE__ */ jsx19(
                "rect",
                {
                  x: 0,
                  y: 0,
                  width: chartW,
                  height: chartH,
                  fill: "transparent",
                  className: "cursor-crosshair",
                  onMouseMove: (e) => {
                    var _a;
                    const containerRect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
                    const svgEl = e.currentTarget.closest("svg");
                    const svgRect = svgEl == null ? void 0 : svgEl.getBoundingClientRect();
                    if (!containerRect || !svgRect) return;
                    const svgLeftPadding = padding.left * (svgRect.width / svgW);
                    const activeChartWidth = chartW * (svgRect.width / svgW);
                    const mouseXOnChart = e.clientX - svgRect.left - svgLeftPadding;
                    const idx = Math.max(0, Math.min(
                      data.length - 1,
                      Math.round(mouseXOnChart / activeChartWidth * (data.length - 1))
                    ));
                    setHoveredIndex(idx);
                    setTooltip({
                      x: e.clientX - containerRect.left,
                      y: e.clientY - containerRect.top - 16,
                      label: data[idx].label,
                      value: data[idx].value
                    });
                  }
                }
              ),
              /* @__PURE__ */ jsx19("line", { x1: 0, y1: chartH, x2: chartW, y2: chartH, stroke: "var(--border-strong)" })
            ] })
          ] }),
          tooltip && /* @__PURE__ */ jsx19(
            "div",
            {
              className: "absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-full transition-all duration-75",
              style: { left: tooltip.x, top: tooltip.y },
              children: /* @__PURE__ */ jsxs15("div", { className: "bg-primary text-background text-xs rounded-lg px-3 py-1.5 shadow-md border border-border/10 text-center", children: [
                /* @__PURE__ */ jsx19("p", { className: "opacity-80 text-[10px] uppercase tracking-wider", children: tooltip.label }),
                /* @__PURE__ */ jsx19("p", { className: "text-sm font-bold mt-0.5", children: formatVal(tooltip.value) })
              ] })
            }
          )
        ] }),
        legendLabel && /* @__PURE__ */ jsxs15("div", { className: "flex justify-center items-center gap-2 mt-3", children: [
          /* @__PURE__ */ jsx19("div", { className: "w-4 h-0.5 rounded-sm", style: { backgroundColor: lineColor } }),
          /* @__PURE__ */ jsx19("span", { className: "text-xs text-text-secondary font-medium", children: legendLabel })
        ] })
      ]
    }
  );
};
var GraficaLine_default = PureLineChart;

// lib/components/ui/DataDisplay/Tabs.tsx
import * as React13 from "react";
import { jsx as jsx20, jsxs as jsxs16 } from "react/jsx-runtime";
var triggerBase = "inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer select-none outline-none font-sans focus-visible:outline-none focus-visible:border-strong focus-visible:ring-4 focus-visible:ring-border-strong/20 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-40";
var variantStyles = {
  underline: {
    list: "flex border-b border-border gap-1 bg-transparent",
    trigger: "px-4 py-2.5 border-b-2 -mb-px relative",
    active: "border-accent text-accent font-semibold",
    inactive: "border-transparent text-text-secondary hover:text-text-primary hover:border-border"
  },
  pill: {
    list: "flex gap-1 bg-muted p-1 rounded-md w-fit border border-border/30",
    trigger: "px-4 py-1.5 rounded-sm",
    active: "bg-background text-text-primary shadow-xs font-semibold border border-border/20",
    inactive: "text-text-muted hover:text-text-primary hover:bg-background/40"
  },
  card: {
    list: "flex gap-1",
    trigger: "px-4 py-2 rounded-t-md border border-b-0 -mb-px",
    active: "border-border bg-background text-text-primary font-semibold",
    inactive: "border-transparent bg-muted/60 text-text-muted hover:text-text-primary hover:bg-muted"
  }
};
var alignClass = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  stretch: "[&>button]:flex-1 [&>button]:justify-center w-full"
};
var Tabs = React13.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, tabs, defaultTab, activeTab: controlledTab, onChange, variant = "underline", align = "start" } = _b, props = __objRest(_b, ["className", "tabs", "defaultTab", "activeTab", "onChange", "variant", "align"]);
    var _a2, _b2;
    const [internalActive, setInternalActive] = React13.useState(
      (_b2 = defaultTab != null ? defaultTab : (_a2 = tabs[0]) == null ? void 0 : _a2.id) != null ? _b2 : ""
    );
    const isControlled = controlledTab !== void 0;
    const active = isControlled ? controlledTab : internalActive;
    const handleSelect = React13.useCallback((id) => {
      if (!isControlled) setInternalActive(id);
      onChange == null ? void 0 : onChange(id);
    }, [isControlled, onChange]);
    const handleKeyDown = React13.useCallback((e) => {
      const activeTabs = tabs.filter((t) => !t.disabled);
      const currentIndex = activeTabs.findIndex((t) => t.id === active);
      if (currentIndex === -1) return;
      let nextIndex = currentIndex;
      if (e.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % activeTabs.length;
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + activeTabs.length) % activeTabs.length;
        e.preventDefault();
      } else if (e.key === "Home") {
        nextIndex = 0;
        e.preventDefault();
      } else if (e.key === "End") {
        nextIndex = activeTabs.length - 1;
        e.preventDefault();
      }
      if (nextIndex !== currentIndex) {
        const nextTab = activeTabs[nextIndex];
        handleSelect(nextTab.id);
        const nextElement = document.getElementById(`tab-trigger-${nextTab.id}`);
        nextElement == null ? void 0 : nextElement.focus();
      }
    }, [tabs, active, handleSelect]);
    const styles = variantStyles[variant];
    return /* @__PURE__ */ jsxs16(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: cn("flex flex-col w-full bg-background text-text-primary font-sans", className)
      }, props), {
        children: [
          /* @__PURE__ */ jsx20(
            "div",
            {
              role: "tablist",
              "aria-orientation": "horizontal",
              onKeyDown: handleKeyDown,
              className: cn(styles.list, alignClass[align]),
              children: tabs.map((tab) => {
                const isActive = tab.id === active;
                return /* @__PURE__ */ jsxs16(
                  "button",
                  {
                    id: `tab-trigger-${tab.id}`,
                    role: "tab",
                    type: "button",
                    "aria-selected": isActive,
                    "aria-controls": `tabpanel-${tab.id}`,
                    disabled: tab.disabled,
                    tabIndex: isActive ? 0 : -1,
                    onClick: () => !tab.disabled && handleSelect(tab.id),
                    className: cn(
                      triggerBase,
                      styles.trigger,
                      isActive ? styles.active : styles.inactive
                    ),
                    children: [
                      tab.icon && /* @__PURE__ */ jsx20("span", { className: "shrink-0 size-4 flex items-center justify-center text-current/80", "aria-hidden": "true", children: tab.icon }),
                      /* @__PURE__ */ jsx20("span", { children: tab.label })
                    ]
                  },
                  tab.id
                );
              })
            }
          ),
          tabs.map((tab) => {
            const isActive = tab.id === active;
            if (!isActive) return null;
            return /* @__PURE__ */ jsx20(
              "div",
              {
                role: "tabpanel",
                id: `tabpanel-${tab.id}`,
                "aria-labelledby": `tab-trigger-${tab.id}`,
                className: "mt-4 text-text-primary animate-fade-in-soft outline-none font-sans",
                children: tab.content
              },
              tab.id
            );
          })
        ]
      })
    );
  }
);
Tabs.displayName = "Tabs";

// lib/components/ui/DataDisplay/Table.tsx
import * as React14 from "react";

// lib/components/ui/skeleton.tsx
import { jsx as jsx21 } from "react/jsx-runtime";
function Skeleton(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx21(
    "div",
    __spreadValues({
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className)
    }, props)
  );
}

// lib/components/ui/DataDisplay/Table.tsx
import { jsx as jsx22, jsxs as jsxs17 } from "react/jsx-runtime";
function getCellValue(row, col) {
  if (col.render) return col.render(row);
  if (!col.accessor) return null;
  if (typeof col.accessor === "function") return col.accessor(row);
  return row[col.accessor];
}
var paddingClasses = {
  sm: "py-2 px-3 text-xs",
  md: "p-4 text-sm",
  lg: "py-5 px-6 text-base"
};
var DataTable = React14.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, data = [], columns = [], maxHeight = "70vh", rowKey, emptyState, isLoading = false, headerVariant = "default", size = "md" } = _b, props = __objRest(_b, ["className", "data", "columns", "maxHeight", "rowKey", "emptyState", "isLoading", "headerVariant", "size"]);
    var _a2;
    const groupedHeaders = React14.useMemo(() => {
      const result = [];
      let i = 0;
      while (i < columns.length) {
        const col = columns[i];
        if (col.group) {
          let span = 0;
          while (i < columns.length && columns[i].group === col.group) {
            span++;
            i++;
          }
          result.push({ label: col.group, start: i - span, span });
        } else {
          result.push({ label: "", start: i, span: 1 });
          i++;
        }
      }
      return result;
    }, [columns]);
    const hasGroups = React14.useMemo(() => columns.some((c) => c.group), [columns]);
    const cellPaddingClass = (_a2 = paddingClasses[size]) != null ? _a2 : paddingClasses.md;
    const isAccent = headerVariant === "accent";
    return /* @__PURE__ */ jsx22(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: cn(
          "relative w-full overflow-hidden rounded-md border border-border bg-background flex flex-col shadow-xs",
          className
        )
      }, props), {
        children: /* @__PURE__ */ jsx22(
          "div",
          {
            className: "scrollbar-soft overflow-auto w-full h-auto",
            style: { maxHeight },
            children: /* @__PURE__ */ jsxs17("table", { className: "w-full text-sm text-left border-collapse font-sans text-text-primary", children: [
              /* @__PURE__ */ jsxs17(
                "thead",
                {
                  className: cn(
                    "sticky top-0 z-20 font-heading select-none border-b border-border transition-colors duration-150",
                    isAccent ? "bg-accent text-white" : "bg-surface text-text-secondary"
                  ),
                  children: [
                    hasGroups && /* @__PURE__ */ jsx22("tr", { className: "border-b border-border/50", children: groupedHeaders.map((g, idx) => /* @__PURE__ */ jsx22(
                      "th",
                      {
                        colSpan: g.span,
                        className: cn(
                          "py-2 px-4 text-center font-bold text-[10px] tracking-wider uppercase whitespace-nowrap",
                          idx !== 0 && "border-l border-border/30",
                          isAccent ? "text-white/90" : "text-accent label-mono"
                        ),
                        children: g.label
                      },
                      `group-${g.label}-${idx}`
                    )) }),
                    /* @__PURE__ */ jsx22("tr", { className: "border-b border-border", children: columns.map((col, i) => {
                      var _a3, _b2, _c;
                      const isFirstInGroup = col.group && (i === 0 || columns[i - 1].group !== col.group);
                      return /* @__PURE__ */ jsx22(
                        "th",
                        {
                          className: cn(
                            "font-semibold text-xs tracking-tight whitespace-nowrap align-middle h-10",
                            isFirstInGroup && i !== 0 && "border-l border-border/30",
                            cellPaddingClass
                          ),
                          style: {
                            textAlign: (_a3 = col.align) != null ? _a3 : "left",
                            width: (_b2 = col.width) != null ? _b2 : "auto",
                            minWidth: (_c = col.width) != null ? _c : "110px"
                          },
                          children: col.header
                        },
                        col.key
                      );
                    }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsx22("tbody", { className: "divide-y divide-border bg-background", children: isLoading ? (
                /* Fila Animada Automática (Skeleton Progress) sin saltos visuales de CLS [cite: 1754, 1755] */
                Array.from({ length: 5 }).map((_, rowIdx) => /* @__PURE__ */ jsx22("tr", { className: "border-b border-border last:border-0", children: columns.map((col) => /* @__PURE__ */ jsx22("td", { className: cellPaddingClass, children: /* @__PURE__ */ jsx22(Skeleton, { className: "h-4 w-2/3 rounded-sm" }) }, `skeleton-cell-${col.key}`)) }, `skeleton-row-${rowIdx}`))
              ) : data.length === 0 ? /* @__PURE__ */ jsx22("tr", { children: /* @__PURE__ */ jsx22(
                "td",
                {
                  colSpan: columns.length,
                  className: "py-12 px-4 text-center text-text-muted font-sans font-normal",
                  children: emptyState != null ? emptyState : "No se encontraron registros en este m\xF3dulo."
                }
              ) }) : data.map((row) => {
                const key = String(row[rowKey]);
                return /* @__PURE__ */ jsx22(
                  "tr",
                  {
                    className: "transition-colors duration-150 hover:bg-muted/30 font-sans border-b border-border last:border-0",
                    children: columns.map((col, i) => {
                      var _a3;
                      const isFirstInGroup = col.group && (i === 0 || columns[i - 1].group !== col.group);
                      return /* @__PURE__ */ jsx22(
                        "td",
                        {
                          className: cn(
                            "align-middle tracking-tight text-text-primary font-normal",
                            isFirstInGroup && i !== 0 && "border-l border-border/30",
                            cellPaddingClass
                          ),
                          style: { textAlign: (_a3 = col.align) != null ? _a3 : "left" },
                          children: getCellValue(row, col)
                        },
                        col.key
                      );
                    })
                  },
                  key
                );
              }) })
            ] })
          }
        )
      })
    );
  }
);
DataTable.displayName = "DataTable";

// lib/components/ui/Groups/empty-state.tsx
import { jsx as jsx23, jsxs as jsxs18 } from "react/jsx-runtime";
function EmptyState({ icon: Icon2, title, description, action, className }) {
  return /* @__PURE__ */ jsxs18("div", { className: cn("flex flex-col items-center justify-center py-16 text-center", className), children: [
    Icon2 && /* @__PURE__ */ jsx23(Icon2, { className: "size-12 text-text-secondary mb-3" }),
    /* @__PURE__ */ jsx23("h3", { className: "font-display text-lg font-medium text-text-primary", children: title }),
    description && /* @__PURE__ */ jsx23("p", { className: "mt-1.5 text-sm text-text-secondary max-w-sm", children: description }),
    action && /* @__PURE__ */ jsx23("div", { className: "mt-4", children: action })
  ] });
}

// lib/components/ui/Groups/pagination.tsx
import { jsx as jsx24, jsxs as jsxs19 } from "react/jsx-runtime";
function getPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const result = [1];
  if (current > 3) result.push("\u2026");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) result.push(i);
  if (current < total - 2) result.push("\u2026");
  result.push(total);
  return result;
}
function Pagination({ page, totalPages, onPageChange, className }) {
  if (totalPages <= 1) return null;
  const pages = getPages(page, totalPages);
  return /* @__PURE__ */ jsxs19("div", { className: cn("flex items-center justify-center gap-0.5 py-4", className), children: [
    /* @__PURE__ */ jsx24(
      "button",
      {
        disabled: page <= 1,
        onClick: () => onPageChange(page - 1),
        "aria-label": "P\xE1gina anterior",
        className: cn(
          "h-8 px-2.5 text-sm rounded-md transition-colors duration-150",
          "text-text-secondary hover:text-text-primary hover:bg-muted",
          "disabled:opacity-30 disabled:pointer-events-none"
        ),
        children: "\u2190"
      }
    ),
    pages.map(
      (p, i) => p === "\u2026" ? /* @__PURE__ */ jsx24(
        "span",
        {
          className: "w-8 text-center text-sm text-text-muted select-none",
          children: "\xB7\xB7\xB7"
        },
        `ellipsis-${i}`
      ) : /* @__PURE__ */ jsx24(
        "button",
        {
          onClick: () => onPageChange(p),
          "aria-label": `P\xE1gina ${p}`,
          "aria-current": p === page ? "page" : void 0,
          className: cn(
            "h-8 w-8 text-sm rounded-md transition-colors duration-150",
            p === page ? "bg-accent text-white font-medium" : "text-text-secondary hover:text-text-primary hover:bg-muted"
          ),
          children: p
        },
        p
      )
    ),
    /* @__PURE__ */ jsx24(
      "button",
      {
        disabled: page >= totalPages,
        onClick: () => onPageChange(page + 1),
        "aria-label": "P\xE1gina siguiente",
        className: cn(
          "h-8 px-2.5 text-sm rounded-md transition-colors duration-150",
          "text-text-secondary hover:text-text-primary hover:bg-muted",
          "disabled:opacity-30 disabled:pointer-events-none"
        ),
        children: "\u2192"
      }
    )
  ] });
}

// lib/components/ui/Groups/radio-group.tsx
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { jsx as jsx25 } from "react/jsx-runtime";
function RadioGroup(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx25(
    RadioGroupPrimitive.Root,
    __spreadValues({
      "data-slot": "radio-group",
      className: cn("grid gap-2", className)
    }, props)
  );
}
function RadioGroupItem(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx25(
    RadioGroupPrimitive.Item,
    __spreadProps(__spreadValues({
      "data-slot": "radio-group-item",
      className: cn(
        "border-accent text-accent focus-visible:ring-ring aspect-square size-4 rounded-full border shadow focus:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx25(
        RadioGroupPrimitive.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ jsx25("span", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] leading-none text-accent", children: "\u25CF" })
        }
      )
    })
  );
}

// lib/components/ui/Password/password-input.tsx
import * as React15 from "react";
import { jsx as jsx26, jsxs as jsxs20 } from "react/jsx-runtime";
var PasswordInput = React15.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  const [showPassword, setShowPassword] = React15.useState(false);
  return /* @__PURE__ */ jsxs20("div", { className: "relative", children: [
    /* @__PURE__ */ jsx26(
      "input",
      __spreadValues({
        type: showPassword ? "text" : "password",
        className: cn(
          "flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 pr-10 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref
      }, props)
    ),
    /* @__PURE__ */ jsxs20(
      Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "absolute right-0 top-0 size-9 text-text-secondary hover:text-text-primary",
        onClick: () => setShowPassword((prev) => !prev),
        tabIndex: -1,
        children: [
          showPassword ? /* @__PURE__ */ jsx26("span", { className: "text-xs leading-none", children: "\u25CB" }) : /* @__PURE__ */ jsx26("span", { className: "text-xs leading-none", children: "\u25C9" }),
          /* @__PURE__ */ jsx26("span", { className: "sr-only", children: showPassword ? "Ocultar contrase\xF1a" : "Mostrar contrase\xF1a" })
        ]
      }
    )
  ] });
});
PasswordInput.displayName = "PasswordInput";

// lib/components/ui/Password/password-strength.tsx
import { jsx as jsx27, jsxs as jsxs21 } from "react/jsx-runtime";
var rules = [
  { label: "M\xEDnimo 8 caracteres", test: (p) => p.length >= 8 },
  { label: "Al menos una may\xFAscula", test: (p) => /[A-Z]/.test(p) },
  { label: "Al menos un n\xFAmero", test: (p) => /\d/.test(p) }
];
function isPasswordValid(password) {
  return rules.every((rule) => rule.test(password));
}
function PasswordStrength({ password }) {
  return /* @__PURE__ */ jsx27("ul", { className: "space-y-1 text-sm", children: rules.map((rule) => {
    const passes = rule.test(password);
    return /* @__PURE__ */ jsxs21(
      "li",
      {
        className: cn(
          "flex items-center gap-2 transition-colors",
          passes ? "text-text-success" : "text-text-secondary"
        ),
        children: [
          passes ? /* @__PURE__ */ jsx27("span", { className: "text-xs leading-none font-bold w-3.5 text-center", children: "\u2713" }) : /* @__PURE__ */ jsx27("span", { className: "text-xs leading-none font-bold w-3.5 text-center", children: "\xD7" }),
          rule.label
        ]
      },
      rule.label
    );
  }) });
}

// lib/components/ui/avatar.tsx
import { Avatar as AvatarPrimitive } from "radix-ui";
import { jsx as jsx28 } from "react/jsx-runtime";
function Avatar(_a) {
  var _b = _a, {
    className,
    size = "default"
  } = _b, props = __objRest(_b, [
    "className",
    "size"
  ]);
  return /* @__PURE__ */ jsx28(
    AvatarPrimitive.Root,
    __spreadValues({
      "data-slot": "avatar",
      "data-size": size,
      className: cn(
        "group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6",
        className
      )
    }, props)
  );
}
function AvatarImage(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx28(
    AvatarPrimitive.Image,
    __spreadValues({
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className)
    }, props)
  );
}
function AvatarFallback(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx28(
    AvatarPrimitive.Fallback,
    __spreadValues({
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs",
        className
      )
    }, props)
  );
}

// lib/components/ui/breadcrumb.tsx
import { Slot as Slot3 } from "radix-ui";
import { jsx as jsx29, jsxs as jsxs22 } from "react/jsx-runtime";
function Breadcrumb(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx29("nav", __spreadValues({ "aria-label": "breadcrumb", "data-slot": "breadcrumb" }, props));
}
function BreadcrumbList(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx29(
    "ol",
    __spreadValues({
      "data-slot": "breadcrumb-list",
      className: cn(
        "text-text-muted flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )
    }, props)
  );
}
function BreadcrumbItem(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx29(
    "li",
    __spreadValues({
      "data-slot": "breadcrumb-item",
      className: cn("inline-flex items-center gap-1.5", className)
    }, props)
  );
}
function BreadcrumbLink(_a) {
  var _b = _a, {
    asChild,
    className
  } = _b, props = __objRest(_b, [
    "asChild",
    "className"
  ]);
  const Comp = asChild ? Slot3.Root : "a";
  return /* @__PURE__ */ jsx29(
    Comp,
    __spreadValues({
      "data-slot": "breadcrumb-link",
      className: cn("hover:text-text-primary transition-colors", className)
    }, props)
  );
}
function BreadcrumbPage(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx29(
    "span",
    __spreadValues({
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: cn("text-text-primary font-normal", className)
    }, props)
  );
}
function BreadcrumbSeparator(_a) {
  var _b = _a, {
    children,
    className
  } = _b, props = __objRest(_b, [
    "children",
    "className"
  ]);
  return /* @__PURE__ */ jsx29(
    "li",
    __spreadProps(__spreadValues({
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: cn("text-text-secondary/50 text-xs select-none", className)
    }, props), {
      children: children != null ? children : /* @__PURE__ */ jsx29("span", { "aria-hidden": "true", children: "\u203A" })
    })
  );
}

// lib/components/ui/checkbox.tsx
import * as React16 from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { jsx as jsx30 } from "react/jsx-runtime";
var Checkbox = React16.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx30(
    CheckboxPrimitive.Root,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "peer h-4 w-4 shrink-0 rounded-xs border border-accent shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent data-[state=checked]:text-white",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx30(
        CheckboxPrimitive.Indicator,
        {
          className: cn("flex items-center justify-center text-current"),
          children: /* @__PURE__ */ jsx30("span", { className: "text-[10px] leading-none font-bold", children: "\u2713" })
        }
      )
    })
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// lib/components/ui/collapsible.tsx
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { jsx as jsx31 } from "react/jsx-runtime";
function Collapsible(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx31(CollapsiblePrimitive.Root, __spreadValues({ "data-slot": "collapsible" }, props));
}
function CollapsibleTrigger(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx31(
    CollapsiblePrimitive.CollapsibleTrigger,
    __spreadValues({
      "data-slot": "collapsible-trigger"
    }, props)
  );
}
function CollapsibleContent(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx31(
    CollapsiblePrimitive.CollapsibleContent,
    __spreadValues({
      "data-slot": "collapsible-content"
    }, props)
  );
}

// lib/components/ui/popover.tsx
import { Popover as PopoverPrimitive2 } from "radix-ui";
import { jsx as jsx32 } from "react/jsx-runtime";
function Popover(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx32(PopoverPrimitive2.Root, __spreadValues({ "data-slot": "popover" }, props));
}
function PopoverTrigger(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx32(PopoverPrimitive2.Trigger, __spreadValues({ "data-slot": "popover-trigger" }, props));
}
function PopoverContent(_a) {
  var _b = _a, {
    className,
    align = "center",
    sideOffset = 4
  } = _b, props = __objRest(_b, [
    "className",
    "align",
    "sideOffset"
  ]);
  return /* @__PURE__ */ jsx32(PopoverPrimitive2.Portal, { children: /* @__PURE__ */ jsx32(
    PopoverPrimitive2.Content,
    __spreadValues({
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "glass-heavy bg-background rounded-md border border-border p-4 shadow-md outline-none",
        "z-50 w-72 origin-(--radix-popover-content-transform-origin)",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )
    }, props)
  ) });
}

// lib/components/ui/separator.tsx
import { Separator as SeparatorPrimitive } from "radix-ui";
import { jsx as jsx33 } from "react/jsx-runtime";
function Separator3(_a) {
  var _b = _a, {
    className,
    orientation = "horizontal",
    decorative = true
  } = _b, props = __objRest(_b, [
    "className",
    "orientation",
    "decorative"
  ]);
  return /* @__PURE__ */ jsx33(
    SeparatorPrimitive.Root,
    __spreadValues({
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "shrink-0",
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        "data-[orientation=horizontal]:bg-border/70",
        "data-[orientation=vertical]:bg-border/70",
        className
      )
    }, props)
  );
}

// lib/components/ui/sonner.tsx
import { useTheme as useTheme2 } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { jsx as jsx34 } from "react/jsx-runtime";
var Toaster = (_a) => {
  var props = __objRest(_a, []);
  const { theme = "system" } = useTheme2();
  return /* @__PURE__ */ jsx34(
    Sonner,
    __spreadValues({
      theme,
      className: "toaster group",
      icons: {
        success: /* @__PURE__ */ jsx34("span", { className: "text-sm leading-none font-bold", children: "\u2713" }),
        info: /* @__PURE__ */ jsx34("span", { className: "text-sm leading-none font-bold", children: "i" }),
        warning: /* @__PURE__ */ jsx34("span", { className: "text-sm leading-none font-bold", children: "!" }),
        error: /* @__PURE__ */ jsx34("span", { className: "text-sm leading-none font-bold", children: "\xD7" }),
        loading: /* @__PURE__ */ jsx34("span", { className: "text-sm leading-none animate-spin", children: "\u27F3" })
      },
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)"
      }
    }, props)
  );
};

// lib/components/ui/switch.tsx
import { Switch as SwitchPrimitive } from "radix-ui";
import { jsx as jsx35 } from "react/jsx-runtime";
function Switch(_a) {
  var _b = _a, {
    className,
    size = "default"
  } = _b, props = __objRest(_b, [
    "className",
    "size"
  ]);
  return /* @__PURE__ */ jsx35(
    SwitchPrimitive.Root,
    __spreadProps(__spreadValues({
      "data-slot": "switch",
      "data-size": size,
      className: cn(
        "peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-colors duration-200 outline-none cursor-pointer",
        "data-[state=checked]:bg-accent data-[state=unchecked]:bg-muted",
        "focus-visible:ring-[3px] focus-visible:ring-accent-soft focus-visible:border-accent",
        "disabled:cursor-not-allowed disabled:opacity-30 data-[disabled]:opacity-30",
        "data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-4 data-[size=sm]:w-7",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx35(
        SwitchPrimitive.Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-white  pointer-events-none block rounded-full shadow-xs ring-0 transition-transform duration-200 math-rendering-fallback",
            "group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3",
            "data-[state=unchecked]:translate-x-0.5",
            "group-data-[size=default]/switch:data-[state=checked]:translate-x-[16px]",
            "group-data-[size=sm]/switch:data-[state=checked]:translate-x-[12px]"
          )
        }
      )
    })
  );
}

// lib/toast.ts
import { toast as sonnerToast } from "sonner";
var toast = {
  success: (title, options) => {
    var _a;
    return sonnerToast.success(title, {
      description: options == null ? void 0 : options.description,
      duration: (_a = options == null ? void 0 : options.duration) != null ? _a : 4e3,
      action: options == null ? void 0 : options.action
    });
  },
  error: (title, options) => {
    var _a;
    return sonnerToast.error(title, {
      description: options == null ? void 0 : options.description,
      duration: (_a = options == null ? void 0 : options.duration) != null ? _a : Infinity,
      action: options == null ? void 0 : options.action
    });
  },
  warning: (title, options) => {
    var _a;
    return sonnerToast.warning(title, {
      description: options == null ? void 0 : options.description,
      duration: (_a = options == null ? void 0 : options.duration) != null ? _a : 6e3,
      action: options == null ? void 0 : options.action
    });
  },
  info: (title, options) => {
    var _a;
    return sonnerToast.info(title, {
      description: options == null ? void 0 : options.description,
      duration: (_a = options == null ? void 0 : options.duration) != null ? _a : 4e3,
      action: options == null ? void 0 : options.action
    });
  },
  loading: (title, options) => sonnerToast.loading(title, {
    description: options == null ? void 0 : options.description
  }),
  promise: (promise, messages) => sonnerToast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error
  }),
  custom: (jsx36) => sonnerToast(jsx36)
};
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Calendar,
  CalendarGrid,
  CalendarHeader,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImage,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ConfirmDeleteDialog,
  DataTable,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DropdownMenu,
  EmptyState,
  GraficaBar_default as GraficaBar,
  GraficaDonut_default as GraficaDonut,
  GraficaLine_default as GraficaLine,
  Input,
  Label2 as Label,
  LabelBadge,
  MonthGrid,
  Pagination,
  PasswordInput,
  PasswordStrength,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  SearchableSelect,
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
  Separator3 as Separator,
  Skeleton,
  Switch,
  Tabs,
  Textarea,
  ThemeProvider,
  ThemeToggle,
  Toaster,
  Tooltip,
  YearGrid,
  buttonVariants,
  cn,
  formatDate,
  getDiasDelMes,
  inputVariants,
  isDisabledDay,
  isDisabledMonth,
  isDisabledYear,
  isPasswordValid,
  isSameDay,
  isWeekendDate,
  textareaVariants,
  toast,
  useDialogContext
};
