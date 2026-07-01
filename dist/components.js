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

// lib/components/ui/Base/Selects/select.tsx
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";

// lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// lib/components/ui/Base/Selects/select.tsx
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
        "group border-border data-[placeholder]:text-text-muted [&_svg:not([class*='text-'])]:text-text-muted focus-visible:border-accent focus-visible:ring-accent-soft/50 aria-invalid:ring-text-error/20 dark:aria-invalid:ring-text-error/40 aria-invalid:border-text-error bg-background flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(
          "svg",
          {
            width: "12",
            height: "12",
            viewBox: "0 0 18 18",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: "transition-transform duration-300 ease-out group-data-[state=open]:rotate-180",
            children: /* @__PURE__ */ jsx("path", { d: "M3 5.5L8 11L13 5.5H3Z", fill: "#767676" })
          }
        ) })
      ]
    })
  );
}
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
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    __spreadProps(__spreadValues({
      "data-slot": "select-content",
      className: cn(
        "bg-surface text-text-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border-2 border-border shadow-lg",
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
      className: cn("text-text-muted px-2 py-1.5 text-xs border-b border-border", className)
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
        "hover:bg-text-muted/10 focus:bg-muted focus:text-text-primary transition-colors [&_svg:not([class*='text-'])]:text-text-muted relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            "data-slot": "select-item-indicator",
            className: "absolute right-2 !text-accent flex size-3.5 items-center justify-center",
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

// lib/components/ui/Base/Selects/MultiSelect.tsx
import { useState, useRef, useEffect, useMemo } from "react";
import { Check } from "lucide-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Seleccionar...",
  className
}) {
  var _a;
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
  const normalized = useMemo(() => {
    return options.map(
      (opt) => typeof opt === "string" ? { label: opt, value: opt } : opt
    );
  }, [options]);
  const hasSelected = selected.length > 0;
  return /* @__PURE__ */ jsxs2("div", { ref, className: cn("relative min-w-[180px]", className), children: [
    /* @__PURE__ */ jsxs2(
      "button",
      {
        type: "button",
        onClick: () => setOpen((prev) => !prev),
        className: cn(
          // Base del botón (Unificado con tus inputs y botones previos)
          "flex items-center justify-between gap-2 w-full h-9 rounded-md border border-border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none",
          "focus-visible:border-accent focus-visible:ring-accent-soft focus-visible:ring-[3px]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // CORREGIDO: Cambia de color dinámicamente si hay elementos elegidos
          hasSelected ? "text-text-primary font-medium" : "text-text-muted"
        ),
        children: [
          /* @__PURE__ */ jsx2("span", { className: "flex-1 text-left truncate", children: !hasSelected ? placeholder : selected.length === 1 ? (_a = normalized.find((opt) => opt.value === selected[0])) == null ? void 0 : _a.label : `${selected.length} seleccionados` }),
          /* @__PURE__ */ jsx2(
            "svg",
            {
              width: "12",
              height: "12",
              viewBox: "0 0 18 18",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: cn("h-4 w-4 shrink-0 text-text-muted transition-transform duration-200", open && "rotate-180"),
              children: /* @__PURE__ */ jsx2("path", { d: "M3 5.5L8 11L13 5.5H3Z", fill: "#767676" })
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsx2("div", { className: "absolute z-50 mt-1 w-full max-h-[250px] overflow-y-auto scrollbar-soft rounded-md border border-border shadow-md bg-surface", children: /* @__PURE__ */ jsx2("div", { className: "p-1 flex flex-col gap-0.5", children: normalized.map((option) => {
      const isSelected = selected.includes(option.value);
      return /* @__PURE__ */ jsxs2(
        "button",
        {
          type: "button",
          onClick: () => toggle(option.value),
          className: cn(
            "group flex items-center gap-2 px-2 py-1.5 rounded-sm text-sm text-left w-full outline-none transition-colors",
            // CORREGIDO: Uso de tus tokens bg-muted para consistencia visual con el Select
            "hover:bg-muted text-text-primary focus:bg-muted"
          ),
          children: [
            /* @__PURE__ */ jsx2(
              "span",
              {
                className: cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-border transition-colors group-hover:border-accent",
                  isSelected ? "bg-accent text-white border-accent" : "bg-transparent"
                ),
                children: isSelected && /* @__PURE__ */ jsx2(Check, { className: "h-3 w-3 stroke-[3]" })
              }
            ),
            /* @__PURE__ */ jsx2("span", { className: "truncate", children: option.label })
          ]
        },
        option.value
      );
    }) }) })
  ] });
}

// lib/components/ui/Base/Entradas/button.tsx
import React from "react";
import { cva } from "class-variance-authority";
import { jsx as jsx3 } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity disabled:cursor-not-allowed rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:border-accent focus-visible:ring-accent-soft/50 focus-visible:ring-[3px] aria-invalid:ring-text-error/20 dark:aria-invalid:ring-text-error/40 aria-invalid:border-text-error",
  {
    variants: {
      variant: {
        default: "bg-accent text-white",
        outline: "border bg-background border-border shadow-xs hover:bg-text-muted/10",
        secondary: "bg-muted/90 text-secondary dark:text-primary shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)]",
        ghost: "hover:bg-text-muted/10 hover:text-text-primary text-text-secondary",
        link: "text-text-secondary hover:text-accent dark:hover:text-accent underline-offset-6 decoration-accent hover:underline",
        destructive: "bg-text-error text-white hover:bg-text-error/90"
      },
      size: {
        default: "h-9 px-4 py-1 text-[12.5px]",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-sm",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4 text-sm",
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

// lib/components/ui/Base/Entradas/input.tsx
import React2 from "react";
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var inputVariants = cva2(
  "file:text-text-secondary placeholder:text-text-muted selection:bg-accent-soft selection:text-accent h-9 w-full min-w-0 rounded-md border bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "border-border focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]",
        destructive: "border-text-error focus:border-text-error focus:shadow-[0_0_0_3px_rgba(231,0,11,0.15)] text-text-error placeholder:text-text-error/50"
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
    return (
      /* CAMBIO CLAVE: Usamos cn() para fusionar estilos. 
        Por defecto es w-full, pero si le pasas otra medida por containerClassName, se adaptará.
      */
      /* @__PURE__ */ jsxs3("div", { className: cn("relative RussoOne-Normal w-full flex items-center", containerClassName), children: [
        iconLeft && /* @__PURE__ */ jsx4("div", { className: cn(
          "absolute left-3 flex items-center justify-center pointer-events-none text-text-muted [&_svg]:size-4",
          variant === "destructive" && "text-text-error"
        ), children: iconLeft }),
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
              // Aplica las clases solo al tag <input> nativo
            }),
            "aria-invalid": variant === "destructive" || void 0
          }, props)
        ),
        iconRight && /* @__PURE__ */ jsx4("div", { className: cn(
          "absolute right-3 flex items-center justify-center pointer-events-none text-text-muted [&_svg]:size-4",
          variant === "destructive" && "text-text-error"
        ), children: iconRight })
      ] })
    );
  }
);
Input.displayName = "Input";

// lib/components/ui/Base/Entradas/textarea.tsx
import React3 from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var Textarea = React3.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx5(
      "textarea",
      __spreadValues({
        ref,
        className: cn(
          "w-full min-h-[80px] px-3 py-2 border border-border rounded-md text-sm bg-transparent placeholder:text-text-muted transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]",
          "aria-invalid:ring-text-error/20 dark:aria-invalid:ring-text-error/40 aria-invalid:border-text-error",
          className
        )
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

// lib/components/ui/buttonIcons/fondoIcons.tsx
import { useRef as useRef2 } from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
function AnimatedIconButton({ Icon, onClick }) {
  const iconRef = useRef2(null);
  return /* @__PURE__ */ jsx7("button", { onClick, className: "group", children: /* @__PURE__ */ jsx7("div", { className: "relative bg-muted/50 rounded-full p-2 text-sm transition-all duration-300 transform group-hover:scale-110 active:scale-95 group-hover:shadow-2xl", children: /* @__PURE__ */ jsx7("div", { ref: iconRef, children: /* @__PURE__ */ jsx7(Icon, { className: "h-5 w-5 z-50" }) }) }) });
}

// lib/components/ui/Tema/ThemeToggle.tsx
import { jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React4.useState(false);
  React4.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return /* @__PURE__ */ jsx8(
      "button",
      {
        className: "inline-flex items-center justify-center rounded-lg border border-border bg-transparent p-2 text-sm font-medium text-text-muted transition-colors opacity-60",
        "aria-label": "Cargando tema",
        disabled: true,
        children: /* @__PURE__ */ jsx8(Sun, { className: "size-5 animate-pulse" })
      }
    );
  }
  const CurrentIcon = theme === "dark" ? Moon : theme === "system" ? Laptop : Sun;
  return (
    // 2. Encapsulamos con Radix para un comportamiento flotante perfecto
    /* @__PURE__ */ jsxs4(DropdownPrimitive.Root, { children: [
      /* @__PURE__ */ jsx8(DropdownPrimitive.Trigger, { asChild: true, children: /* @__PURE__ */ jsx8("div", { className: "inline-block outline-none", children: /* @__PURE__ */ jsx8(
        AnimatedIconButton,
        {
          "aria-label": "Cambiar tema",
          Icon: CurrentIcon
        }
      ) }) }),
      /* @__PURE__ */ jsx8(DropdownPrimitive.Portal, { children: /* @__PURE__ */ jsxs4(
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
                  /* @__PURE__ */ jsx8(Sun, { className: "mr-2.5 size-4" }),
                  /* @__PURE__ */ jsx8("span", { children: "Claro" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs4(
              DropdownPrimitive.Item,
              {
                onClick: () => setTheme("dark"),
                className: "flex w-full items-center px-3 py-2 text-sm rounded-md outline-none select-none cursor-pointer transition-colors text-text-secondary focus:bg-accent-soft focus:text-accent",
                children: [
                  /* @__PURE__ */ jsx8(Moon, { className: "mr-2.5 size-4" }),
                  /* @__PURE__ */ jsx8("span", { children: "Oscuro" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs4(
              DropdownPrimitive.Item,
              {
                onClick: () => setTheme("system"),
                className: "flex w-full items-center px-3 py-2 text-sm rounded-md outline-none select-none cursor-pointer transition-colors text-text-secondary focus:bg-accent-soft focus:text-accent",
                children: [
                  /* @__PURE__ */ jsx8(Laptop, { className: "mr-2.5 size-4" }),
                  /* @__PURE__ */ jsx8("span", { children: "Sistema" })
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
import { jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
var colorVariantStyles = {
  neutral: {
    filled: "bg-primary text-background border border-transparent",
    soft: "bg-muted text-text-primary border border-border",
    outline: "border border-border text-text-primary bg-transparent"
  },
  accent: {
    filled: "bg-accent text-white border border-transparent",
    soft: "bg-accent-soft text-accent border border-accent/30",
    outline: "border border-accent text-accent bg-transparent"
  },
  success: {
    filled: "bg-text-success text-white border border-transparent",
    soft: "bg-success text-text-success border border-text-success/25",
    outline: "border border-text-success text-text-success bg-transparent"
  },
  error: {
    filled: "bg-text-error text-white border border-transparent",
    soft: "bg-error text-text-error border border-text-error/25",
    outline: "border border-text-error text-text-error bg-transparent"
  },
  warning: {
    filled: "bg-text-warning text-white border border-transparent",
    soft: "bg-warning text-text-warning border border-text-warning/25",
    outline: "border border-text-warning text-text-warning bg-transparent"
  },
  info: {
    filled: "bg-text-info text-white border border-transparent",
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
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4"
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
        "inline-flex items-center rounded-md font-medium select-none",
        colorVariantStyles[color][variant],
        sizeStyles[size],
        className
      ),
      children: [
        icon && /* @__PURE__ */ jsx9("span", { className: cn("flex-shrink-0 [&_svg]:size-full", iconSizeStyles[size]), children: icon }),
        /* @__PURE__ */ jsx9("span", { className: "truncate", children: label }),
        onRemove && /* @__PURE__ */ jsx9(
          "button",
          {
            type: "button",
            onClick: onRemove,
            className: cn(
              "flex items-center justify-center rounded-full opacity-60 hover:opacity-100 transition-all outline-none cursor-pointer",
              "focus-visible:ring-1 focus-visible:ring-current"
            ),
            "aria-label": `Eliminar ${label}`,
            children: /* @__PURE__ */ jsx9(X, { className: iconSizeStyles[size] })
          }
        )
      ]
    }
  );
}

// lib/components/ui/Compuesto/Badges/StatusBadge.tsx
import { jsx as jsx10, jsxs as jsxs6 } from "react/jsx-runtime";
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
  sm: "size-1.5",
  md: "size-2"
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
  return /* @__PURE__ */ jsxs6(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-md font-medium select-none",
        container,
        sizeStylesStatus[size],
        className
      ),
      children: [
        withDot && /* @__PURE__ */ jsxs6("span", { className: "relative flex items-center justify-center shrink-0", children: [
          animated && /* @__PURE__ */ jsx10(
            "span",
            {
              className: cn(
                "absolute inline-flex rounded-full opacity-75 animate-ping",
                dot,
                dotSizeStyles[size]
              )
            }
          ),
          /* @__PURE__ */ jsx10(
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
        /* @__PURE__ */ jsx10("span", { className: "truncate", children: label })
      ]
    }
  );
}

// lib/components/ui/Compuesto/Contenedores/Card.tsx
import { jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
var variantClasses = {
  default: "bg-background dark:bg-surface border border-border hover:border-accent/30",
  outlined: "bg-background border border-accent/40",
  elevated: "bg-background border border-border shadow-md",
  // Ajustado para dar sensación de elevación
  accent: "bg-background border border-border border-l-4 border-l-accent shadow-xs",
  ghost: "bg-surface border border-border shadow-none"
};
function Card({
  variant = "default",
  clickable = false,
  onClick,
  fullWidth = false,
  className = "",
  children
}) {
  const isInteractive = clickable || Boolean(onClick);
  const Component = isInteractive ? "button" : "div";
  return /* @__PURE__ */ jsx11(
    Component,
    {
      onClick,
      type: isInteractive ? "button" : void 0,
      tabIndex: isInteractive ? 0 : void 0,
      className: cn(
        "rounded-md overflow-hidden transition-all duration-200 text-left block flex flex-col w-fit",
        variantClasses[variant],
        fullWidth && "w-full",
        isInteractive && [
          "cursor-pointer focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-soft focus-visible:border-accent",
          "hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]"
        ],
        className
      ),
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
  return /* @__PURE__ */ jsx11("div", { className: cn("p-5 pb-3", withDivider && "border-b border-border mb-3", className), children: /* @__PURE__ */ jsxs7("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxs7("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx11("h3", { className: "font-semibold text-lg leading-snug text-text-primary truncate", children: title }),
      subtitle && /* @__PURE__ */ jsx11("p", { className: "mt-0.5 text-sm text-text-secondary truncate", children: subtitle })
    ] }),
    action && /* @__PURE__ */ jsx11("div", { className: "shrink-0", children: action })
  ] }) });
}
function CardBody({ className = "", children }) {
  return (
    // Se añade el padding nativo aquí para aislarlo de CardImage
    /* @__PURE__ */ jsx11("div", { className: cn("px-5 py-3 text-sm text-text-primary flex-1", className), children })
  );
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
  return /* @__PURE__ */ jsx11(
    "div",
    {
      className: cn(
        "flex items-center gap-2 p-5 pt-3 mt-auto",
        withDivider && "border-t border-border",
        footerAlignClasses[align],
        className
      ),
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
  return /* @__PURE__ */ jsx11(
    "div",
    {
      className: cn("w-full overflow-hidden bg-muted shrink-0", className),
      style: { height },
      children: /* @__PURE__ */ jsx11(
        "img",
        {
          src,
          alt,
          className: "w-full h-full object-cover",
          loading: "lazy"
        }
      )
    }
  );
}

// lib/components/ui/Compuesto/Contenedores/Dialog.tsx
import React5 from "react";
import { X as X2 } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
var sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl"
};
var DialogContext = React5.createContext({ variant: "default" });
var useDialogContext = () => React5.useContext(DialogContext);
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
  return (
    // Radix controla el estado abierto y el disparo del cierre de forma nativa
    /* @__PURE__ */ jsx12(DialogPrimitive.Root, { open, onOpenChange: (isOpen) => !isOpen && onClose(), children: /* @__PURE__ */ jsxs8(DialogPrimitive.Portal, { children: [
      /* @__PURE__ */ jsx12(
        DialogPrimitive.Overlay,
        {
          onClick: !closeOnOverlay ? (e) => e.preventDefault() : void 0,
          className: "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=open]:fade-in duration-200"
        }
      ),
      /* @__PURE__ */ jsx12("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none", children: /* @__PURE__ */ jsxs8(
        DialogPrimitive.Content,
        {
          className: cn(
            "relative w-full pointer-events-auto",
            "bg-background rounded-md overflow-hidden border border-border shadow-[var(--shadow-card)]",
            "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 duration-200",
            sizeClasses[size],
            className
          ),
          children: [
            !hideCloseButton && /* @__PURE__ */ jsx12(DialogPrimitive.Close, { asChild: true, children: /* @__PURE__ */ jsx12(
              Button,
              {
                variant: "ghost",
                size: "icon-sm",
                "aria-label": "Cerrar",
                className: "absolute top-3 right-3 text-text-muted hover:text-text-primary z-20",
                children: /* @__PURE__ */ jsx12(X2, {})
              }
            ) }),
            /* @__PURE__ */ jsx12(DialogContext.Provider, { value: { variant }, children })
          ]
        }
      ) })
    ] }) })
  );
}
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
  return /* @__PURE__ */ jsx12("div", { className: cn("px-6 pt-6", withDivider ? "pb-4 border-b border-border" : "pb-2", className), children: /* @__PURE__ */ jsxs8("div", { className: "flex items-start gap-3", children: [
    icon && /* @__PURE__ */ jsx12("span", { className: cn("mt-0.5 flex items-center justify-center w-9 h-9 rounded-md shrink-0", variantIconBg[variant]), children: icon }),
    /* @__PURE__ */ jsxs8("div", { className: "flex-1 min-w-0 pr-6", children: [
      /* @__PURE__ */ jsx12(DialogPrimitive.Title, { asChild: true, children: /* @__PURE__ */ jsx12("h3", { className: "font-semibold text-lg leading-snug text-text-primary", children: title }) }),
      description && /* @__PURE__ */ jsx12(DialogPrimitive.Description, { asChild: true, children: /* @__PURE__ */ jsx12("p", { className: "mt-1 text-sm text-text-secondary leading-relaxed", children: description }) })
    ] })
  ] }) });
}
function DialogBody({ scrollable = false, className = "", children }) {
  return /* @__PURE__ */ jsx12("div", { className: cn("px-6 py-4 text-sm text-text-primary", scrollable && "overflow-y-auto max-h-[60vh] scrollbar-soft", className), children });
}
var footerAlignClasses2 = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
  between: "justify-between"
};
function DialogFooter({ align = "right", withDivider = true, className = "", children }) {
  return /* @__PURE__ */ jsx12("div", { className: cn("flex items-center flex-wrap gap-2 px-6 pb-5 pt-4", withDivider && "border-t border-border", footerAlignClasses2[align], className), children });
}

// lib/components/ui/Compuesto/Toaster.tsx
import { useTheme as useTheme2 } from "next-themes";
import { Toaster as Sonner } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon
} from "lucide-react";
import { jsx as jsx13 } from "react/jsx-runtime";
var Toaster = (props) => {
  const { theme = "system" } = useTheme2();
  return /* @__PURE__ */ jsx13(
    Sonner,
    __spreadValues({
      theme,
      position: "bottom-left",
      closeButton: true,
      className: "toaster !z-[999]",
      icons: {
        success: /* @__PURE__ */ jsx13(CircleCheckIcon, { className: "size-5 !text-text-success" }),
        error: /* @__PURE__ */ jsx13(OctagonXIcon, { className: "size-5 !text-text-error" }),
        warning: /* @__PURE__ */ jsx13(TriangleAlertIcon, { className: "size-5 !text-text-warning" }),
        info: /* @__PURE__ */ jsx13(InfoIcon, { className: "size-5 !text-text-info" }),
        loading: /* @__PURE__ */ jsx13(Loader2Icon, { className: "size-5 animate-spin" })
      },
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--text-primary)",
        "--border-radius": "var(--radius)"
      },
      toastOptions: {
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

// lib/components/ui/Compuesto/Tooltip.tsx
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
var variantClasses2 = {
  default: "bg-primary text-white dark:text-black rounded-md shadow-md",
  rich: "bg-surface text-text-primary rounded-md shadow-lg"
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
  const resolvedSize = size != null ? size : variant === "rich" ? "rich" : "default";
  return (
    // Provider global de Radix para controlar el delay (300ms como tenías en tu timeout)
    /* @__PURE__ */ jsx14(TooltipPrimitive.Provider, { delayDuration: 300, children: /* @__PURE__ */ jsxs9(TooltipPrimitive.Root, { children: [
      /* @__PURE__ */ jsx14(TooltipPrimitive.Trigger, { asChild: true, children: /* @__PURE__ */ jsx14(
        "span",
        {
          className: "inline-flex items-center",
          "aria-label": ariaLabel != null ? ariaLabel : typeof content === "string" ? content : void 0,
          children
        }
      ) }),
      /* @__PURE__ */ jsx14(TooltipPrimitive.Portal, { children: !disabled && /* @__PURE__ */ jsxs9(
        TooltipPrimitive.Content,
        {
          side,
          align,
          sideOffset: 8,
          className: cn(
            "z-[9999] w-max font-normal leading-relaxed break-words pointer-events-none select-none",
            // Animaciones nativas de Radix acopladas a Tailwind v4
            "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out",
            variantClasses2[variant],
            sizeClasses2[resolvedSize]
          ),
          children: [
            content,
            /* @__PURE__ */ jsx14(
              TooltipPrimitive.Arrow,
              {
                className: cn(
                  "fill-current",
                  variant === "default" ? "text-primary" : "text-surface"
                ),
                width: 10,
                height: 5
              }
            )
          ]
        }
      ) })
    ] }) })
  );
};

// lib/components/ui/Compuesto/dropdown-menu.tsx
import { DropdownMenu as DropdownPrimitive2 } from "radix-ui";
import { jsx as jsx15, jsxs as jsxs10 } from "react/jsx-runtime";
var DefaultTriggerIcon = /* @__PURE__ */ jsxs10(
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
  // Por defecto a la izquierda
  width = "w-52",
  disabled = false,
  className = "",
  triggerIcon = DefaultTriggerIcon
}) {
  const handleItemClick = (item) => {
    var _a;
    if (item.disabled) return;
    (_a = item.onClick) == null ? void 0 : _a.call(item);
  };
  return (
    // 1. Contenedor Raíz de Radix
    /* @__PURE__ */ jsxs10(DropdownPrimitive2.Root, { children: [
      /* @__PURE__ */ jsx15(DropdownPrimitive2.Trigger, { asChild: true, disabled, children: /* @__PURE__ */ jsxs10(
        "button",
        {
          type: "button",
          className: cn(
            "group inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
            "border border-border bg-background text-text-primary shadow-xs",
            "transition-colors duration-150 outline-none cursor-pointer",
            "focus-visible:ring-[3px] focus-visible:ring-accent-soft focus-visible:border-accent",
            "data-[state=open]:ring-[3px] data-[state=open]:ring-accent-soft data-[state=open]:border-accent",
            disabled && "cursor-not-allowed opacity-50",
            className
          ),
          children: [
            trigger,
            triggerIcon && /* @__PURE__ */ jsx15(
              "span",
              {
                className: "text-text-muted transition-transform duration-200 group-data-[state=open]:rotate-180 [&_svg]:size-full",
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
          sideOffset: 8,
          className: cn(
            // Estilos del panel (Copiados de tu SelectContent para consistencia total)
            "bg-background text-text-primary border border-border rounded-md p-1 z-[9999]",
            "shadow-[var(--shadow-card)] outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
            width
          ),
          children: groups.map((group, gIdx) => (
            // Agrupador nativo de Radix
            /* @__PURE__ */ jsxs10(DropdownPrimitive2.Group, { className: "flex flex-col gap-0.5", children: [
              group.groupLabel && /* @__PURE__ */ jsx15(DropdownPrimitive2.Label, { className: "px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted select-none", children: group.groupLabel }),
              group.items.map((item, iIdx) => /* @__PURE__ */ jsxs10("div", { children: [
                /* @__PURE__ */ jsxs10(
                  DropdownPrimitive2.Item,
                  {
                    disabled: item.disabled,
                    onSelect: () => handleItemClick(item),
                    className: cn(
                      "flex w-full items-center gap-2.5 px-3 py-2 text-sm text-left rounded-md outline-none select-none transition-colors duration-100",
                      "data-[disabled]:cursor-not-allowed data-[disabled]:text-text-disabled data-[disabled]:pointer-events-none",
                      item.variant === "danger" ? "text-text-error focus:bg-error/20 focus:text-text-error cursor-pointer" : "text-text-primary focus:bg-muted focus:text-text-primary cursor-pointer"
                    ),
                    children: [
                      item.icon && /* @__PURE__ */ jsx15("span", { className: "shrink-0 text-current [&_svg]:size-4", "aria-hidden": "true", children: item.icon }),
                      /* @__PURE__ */ jsx15("span", { className: "flex-1 truncate", children: item.label }),
                      item.trailingIcon && /* @__PURE__ */ jsx15("span", { className: "shrink-0 text-text-muted [&_svg]:size-4", "aria-hidden": "true", children: item.trailingIcon })
                    ]
                  }
                ),
                item.separator && /* @__PURE__ */ jsx15(DropdownPrimitive2.Separator, { className: "my-1 h-px bg-border-border -mx-1" })
              ] }, iIdx)),
              gIdx < groups.length - 1 && /* @__PURE__ */ jsx15(DropdownPrimitive2.Separator, { className: "my-1 h-px bg-border-border -mx-1" })
            ] }, gIdx)
          ))
        }
      ) })
    ] })
  );
}

// lib/components/ui/Compuesto/Calendario.tsx
import { useState as useState3, useCallback, useMemo as useMemo2, useEffect as useEffect3 } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, X as X3 } from "lucide-react";
import Holidays from "date-holidays";
import { Popover as PopoverPrimitive } from "radix-ui";
import { Fragment, jsx as jsx16, jsxs as jsxs11 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs11(Fragment, { children: [
    /* @__PURE__ */ jsx16("div", { className: cn("grid grid-cols-7", size === "lg" ? "mb-2" : "mb-1"), children: DIAS_SEMANA.map((d, i) => /* @__PURE__ */ jsx16("div", { className: cn("text-center font-medium border-b border-border text-text-muted select-none", size === "lg" ? "text-sm py-2" : "text-[12px] py-1"), children: d }, i)) }),
    /* @__PURE__ */ jsx16("div", { className: "grid grid-cols-7", children: dias.map((day, i) => {
      if (!day) return /* @__PURE__ */ jsx16("div", { className: size === "lg" ? "h-14 w-full" : "h-8 w-8 mx-auto" }, `empty-${i}`);
      const date = new Date(year, month, day);
      const isSelected = selected ? isSameDay(date, selected) : false;
      const isToday = isSameDay(date, today);
      const disabled = isDisabledDay(day, year, month, minDate, maxDate);
      const isHolidayDay = holidays.some((h) => isSameDay(date, h));
      const isWeekendDayValue = !isHolidayDay && isWeekendDate(date);
      return /* @__PURE__ */ jsxs11(
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
  return /* @__PURE__ */ jsxs11("div", { className: cn("flex items-center justify-between", size === "lg" ? "mb-4 px-1" : "mb-2 px-0"), children: [
    /* @__PURE__ */ jsx16("button", { type: "button", className: cn("flex items-center justify-center rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent hover:bg-accent-soft transition-all duration-150 cursor-pointer outline-none", size === "lg" ? "size-9" : "size-7"), onClick: onPrev, children: /* @__PURE__ */ jsx16(ChevronLeft, { size: size === "lg" ? 16 : 14 }) }),
    /* @__PURE__ */ jsxs11("button", { type: "button", onClick: canDrillUp ? onClickTitle : void 0, className: cn("flex flex-col items-center px-3 py-1 rounded-md transition-all duration-150 outline-none", canDrillUp ? "cursor-pointer hover:bg-accent-soft hover:text-accent" : "cursor-default"), children: [
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
  const handlePrev = useCallback(() => {
    if (mode === "years") setYearBase((b) => b - 12);
    else if (mode === "months") setViewDate((d) => new Date(d.getFullYear() - 1, d.getMonth(), 1));
    else setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }, [mode]);
  const handleNext = useCallback(() => {
    if (mode === "years") setYearBase((b) => b + 12);
    else if (mode === "months") setViewDate((d) => new Date(d.getFullYear() + 1, d.getMonth(), 1));
    else setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }, [mode]);
  const handleClickTitle = useCallback(() => {
    if (mode === "days") setMode("months");
    else if (mode === "months") {
      setYearBase(Math.floor(viewYear / 12) * 12);
      setMode("years");
    }
  }, [mode, viewYear]);
  const handleSelectYear = useCallback((year) => {
    setViewDate(new Date(year, viewMonth, 1));
    if (selectionMode === "year") {
      onChange == null ? void 0 : onChange(new Date(year, 0, 1));
    } else setMode("months");
  }, [viewMonth, selectionMode, onChange]);
  const handleSelectMonth = useCallback((month) => {
    setViewDate(new Date(viewYear, month, 1));
    if (selectionMode === "month" || selectionMode === "year") {
      onChange == null ? void 0 : onChange(new Date(viewYear, month, 1));
    } else setMode("days");
  }, [viewYear, selectionMode, onChange]);
  const handleSelectDay = useCallback((day) => {
    onChange == null ? void 0 : onChange(new Date(viewYear, viewMonth, day));
  }, [viewYear, viewMonth, onChange]);
  const handleClear = (e) => {
    e.stopPropagation();
    onChange == null ? void 0 : onChange(null);
  };
  const renderBody = (size) => /* @__PURE__ */ jsxs11("div", { className: "flex flex-col gap-1.5", children: [
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
  return /* @__PURE__ */ jsxs11("div", { className: cn("flex flex-col gap-1.5 w-fit", className), children: [
    label && /* @__PURE__ */ jsx16("label", { className: "text-sm text-text-secondary font-medium select-none", children: label }),
    /* @__PURE__ */ jsxs11(PopoverPrimitive.Root, { children: [
      /* @__PURE__ */ jsx16(PopoverPrimitive.Trigger, { asChild: true, disabled, children: /* @__PURE__ */ jsxs11(
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
import { useState as useState4, useRef as useRef3 } from "react";
import { jsx as jsx17, jsxs as jsxs12 } from "react/jsx-runtime";
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
  const containerRef = useRef3(null);
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
  return /* @__PURE__ */ jsxs12(
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
        /* @__PURE__ */ jsxs12("div", { className: "w-full relative overflow-hidden", children: [
          /* @__PURE__ */ jsxs12("svg", { width: "100%", viewBox: `0 0 ${svgW} ${height}`, className: "relative z-0 overflow-visible", children: [
            yLabel && /* @__PURE__ */ jsx17("text", { x: 10, y: padding.top - 5, fill: "var(--text-muted)", fontSize: 10, fontWeight: 600, children: yLabel }),
            /* @__PURE__ */ jsxs12("g", { transform: `translate(${padding.left}, ${padding.top + 10})`, children: [
              yTicks.map((tick) => {
                const y = chartH - tick / ceilMax * chartH;
                return /* @__PURE__ */ jsxs12("g", { children: [
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
                return /* @__PURE__ */ jsxs12("g", { children: [
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
              children: /* @__PURE__ */ jsxs12("div", { className: "bg-primary text-background text-xs rounded-lg px-3 py-2 shadow-xl border border-border/10 whitespace-nowrap text-center", children: [
                /* @__PURE__ */ jsx17("p", { className: "opacity-80 text-[10px] uppercase tracking-wider", children: tooltip.label }),
                /* @__PURE__ */ jsx17("p", { className: "text-sm font-bold mt-0.5", children: formatVal(tooltip.value) })
              ] })
            }
          )
        ] }),
        legendLabel && /* @__PURE__ */ jsxs12("div", { className: "flex justify-center items-center gap-2 mt-4", children: [
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
import { Fragment as Fragment2, jsx as jsx18, jsxs as jsxs13 } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsxs13("div", { className: "p-6 rounded-2xl bg-background border border-border animate-pulse", children: [
      /* @__PURE__ */ jsx18("div", { className: "h-4 w-32 bg-muted rounded mb-4" }),
      /* @__PURE__ */ jsx18("div", { className: "h-[180px] w-[180px] bg-muted rounded-full mx-auto" })
    ] });
  }
  if (!data.length) {
    return /* @__PURE__ */ jsx18("div", { className: "p-6 rounded-2xl bg-surface border border-border text-center", children: /* @__PURE__ */ jsx18("p", { className: "text-sm text-text-muted", children: "No hay datos disponibles" }) });
  }
  return /* @__PURE__ */ jsxs13("div", { className: "rounded-md bg-background border border-border shadow-xs p-6", children: [
    (title || description) && /* @__PURE__ */ jsxs13("div", { className: "mb-4", children: [
      title && /* @__PURE__ */ jsx18("p", { className: "text-sm font-semibold text-text-primary", children: title }),
      description && /* @__PURE__ */ jsx18("p", { className: "text-xs text-text-muted mt-1", children: description })
    ] }),
    /* @__PURE__ */ jsxs13("div", { className: "flex flex-col items-center gap-8 justify-center", children: [
      /* @__PURE__ */ jsxs13("div", { style: { width: size, height: size }, className: "relative mx-auto md:mx-0", children: [
        /* @__PURE__ */ jsxs13("svg", { className: "w-full h-full -rotate-90", children: [
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
            children: /* @__PURE__ */ jsxs13("div", { className: "bg-[#0A0A0B] text-white text-xs rounded-md px-3 py-1 shadow-xl whitespace-nowrap", children: [
              /* @__PURE__ */ jsx18("p", { className: "font-semibold", children: segmentMeta[hoveredIndex].label }),
              /* @__PURE__ */ jsx18("p", { className: "text-center", children: formatValue(segmentMeta[hoveredIndex].value) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx18("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none", children: showTotal ? /* @__PURE__ */ jsxs13(Fragment2, { children: [
          /* @__PURE__ */ jsx18("span", { className: "text-xs text-text-muted", children: "Total" }),
          /* @__PURE__ */ jsx18("span", { className: "text-xl font-bold text-accent", children: formatValue(total) })
        ] }) : null })
      ] }),
      /* @__PURE__ */ jsx18("div", { className: "flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4", children: segmentMeta.map((item, i) => {
        const isActive = hoveredIndex === i;
        return /* @__PURE__ */ jsxs13(
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
import { useState as useState6, useRef as useRef4 } from "react";
import { Fragment as Fragment3, jsx as jsx19, jsxs as jsxs14 } from "react/jsx-runtime";
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
  const containerRef = useRef4(null);
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
  return /* @__PURE__ */ jsxs14(
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
        /* @__PURE__ */ jsxs14("div", { className: "w-full overflow-x-auto relative scrollbar-none", children: [
          /* @__PURE__ */ jsxs14("svg", { width: "100%", viewBox: `0 0 ${svgW} ${height}`, className: "overflow-visible", children: [
            yLabel && /* @__PURE__ */ jsx19("text", { x: 10, y: padding.top - 8, fill: "var(--text-muted)", fontSize: 10, fontWeight: 600, children: yLabel }),
            /* @__PURE__ */ jsx19("defs", { children: showArea && /* @__PURE__ */ jsxs14("linearGradient", { id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx19("stop", { offset: "0%", stopColor: lineColor, stopOpacity: 0.25 }),
              /* @__PURE__ */ jsx19("stop", { offset: "100%", stopColor: lineColor, stopOpacity: 0 })
            ] }) }),
            /* @__PURE__ */ jsxs14("g", { transform: `translate(${padding.left}, ${padding.top + 15})`, children: [
              yTicks.map((tick) => {
                const y = scaleY(tick);
                return /* @__PURE__ */ jsxs14("g", { children: [
                  /* @__PURE__ */ jsx19("line", { x1: 0, y1: y, x2: chartW, y2: y, stroke: "var(--border-default)", strokeDasharray: "4 3", strokeWidth: 0.5 }),
                  /* @__PURE__ */ jsx19("text", { x: -10, y: y + 4, textAnchor: "end", fill: "var(--text-muted)", fontSize: 10, children: formatVal(Math.round(tick)) })
                ] }, tick);
              }),
              showArea && /* @__PURE__ */ jsx19("path", { d: areaPath, fill: `url(#${gradientId})` }),
              /* @__PURE__ */ jsx19("path", { d: smoothLine, fill: "none", stroke: lineColor, strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }),
              hoveredIndex !== null && /* @__PURE__ */ jsxs14(Fragment3, { children: [
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
              children: /* @__PURE__ */ jsxs14("div", { className: "bg-primary text-background text-xs rounded-lg px-3 py-1.5 shadow-md border border-border/10 text-center", children: [
                /* @__PURE__ */ jsx19("p", { className: "opacity-80 text-[10px] uppercase tracking-wider", children: tooltip.label }),
                /* @__PURE__ */ jsx19("p", { className: "text-sm font-bold mt-0.5", children: formatVal(tooltip.value) })
              ] })
            }
          )
        ] }),
        legendLabel && /* @__PURE__ */ jsxs14("div", { className: "flex justify-center items-center gap-2 mt-3", children: [
          /* @__PURE__ */ jsx19("div", { className: "w-4 h-0.5 rounded-sm", style: { backgroundColor: lineColor } }),
          /* @__PURE__ */ jsx19("span", { className: "text-xs text-text-secondary font-medium", children: legendLabel })
        ] })
      ]
    }
  );
};
var GraficaLine_default = PureLineChart;

// lib/components/ui/DataDisplay/Tabs.tsx
import { useState as useState7 } from "react";
import { jsx as jsx20, jsxs as jsxs15 } from "react/jsx-runtime";
var triggerBase = "inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-soft focus-visible:border-accent";
var variantStyles2 = {
  underline: {
    list: "flex border-b border-border gap-1",
    trigger: "px-4 py-2.5 border-b-2 -mb-px outline-none",
    active: "border-accent text-accent",
    inactive: "border-transparent text-text-secondary hover:text-text-primary hover:border-accent"
  },
  pill: {
    list: "flex gap-1 bg-muted p-1 rounded-xl w-fit",
    trigger: "px-4 py-2 rounded-lg outline-none",
    active: "bg-surface text-text-primary shadow-xs",
    inactive: "text-text-muted hover:text-text-primary hover:bg-muted/60"
  },
  card: {
    list: "flex gap-1.5",
    trigger: "px-4 py-2.5 rounded-t-xl border border-b-0 outline-none",
    active: "border-border bg-surface text-text-primary",
    inactive: "border-transparent bg-muted/50 text-text-muted hover:text-text-primary hover:bg-accent-soft"
  }
};
var alignClass = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  stretch: "[&>button]:flex-1 [&>button]:justify-center w-full"
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
  return /* @__PURE__ */ jsxs15("div", { className: cn("flex flex-col w-full", className), children: [
    /* @__PURE__ */ jsx20(
      "div",
      {
        role: "tablist",
        "aria-orientation": "horizontal",
        className: cn(styles.list, alignClass[align]),
        children: tabs.map((tab) => {
          const isActive = tab.id === active;
          return /* @__PURE__ */ jsxs15(
            "button",
            {
              id: `tab-trigger-${tab.id}`,
              role: "tab",
              type: "button",
              "aria-selected": isActive,
              "aria-controls": `tabpanel-${tab.id}`,
              disabled: tab.disabled,
              onClick: () => !tab.disabled && handleSelect(tab.id),
              className: cn(
                triggerBase,
                styles.trigger,
                isActive ? styles.active : styles.inactive
              ),
              children: [
                tab.icon && /* @__PURE__ */ jsx20("span", { className: "shrink-0 size-4 [&_svg]:size-full", children: tab.icon }),
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
          className: "mt-4 text-text-primary animate-in fade-in duration-200 outline-none",
          children: tab.content
        },
        tab.id
      );
    })
  ] });
}

// lib/components/ui/DataDisplay/Table.tsx
import React10 from "react";
import { jsx as jsx21, jsxs as jsxs16 } from "react/jsx-runtime";
function getCellValue(row, col) {
  if (col.render) return col.render(row);
  if (!col.accessor) return null;
  if (typeof col.accessor === "function") return col.accessor(row);
  return row[col.accessor];
}
var paddingClasses = {
  sm: "py-1.5 px-2.5 text-xs",
  md: "py-2.5 px-3 text-sm",
  lg: "py-3.5 px-4 text-base"
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
  var _a;
  const groupedHeaders = React10.useMemo(() => {
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
  const cellPaddingClass = (_a = paddingClasses[size]) != null ? _a : paddingClasses.md;
  const isAccent = headerVariant === "accent";
  const headerBgClass = isAccent ? "bg-accent text-white" : "bg-muted text-text-secondary";
  const groupLabelColorClass = isAccent ? "text-background/90" : "text-accent";
  const groupBorderClass = isAccent ? "border-border" : "border-border-strong";
  const groupStyles = React10.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    columns.forEach((col) => {
      if (col.group && col.groupStyle && !map.has(col.group)) {
        map.set(col.group, col.groupStyle);
      }
    });
    return map;
  }, [columns]);
  return /* @__PURE__ */ jsxs16(
    "div",
    {
      className: cn(
        "border border-border rounded-md overflow-hidden bg-surface shadow-xs w-full flex flex-col",
        className
      ),
      children: [
        /* @__PURE__ */ jsx21(
          "div",
          {
            className: "scrollbar-soft overflow-auto w-full",
            style: { maxHeight },
            children: /* @__PURE__ */ jsxs16("table", { className: "w-full border-separate border-spacing-0 min-w-[600px] font-body", children: [
              /* @__PURE__ */ jsxs16("thead", { className: cn("sticky top-0 z-10 font-semibold select-none", headerBgClass), children: [
                hasGroups && /* @__PURE__ */ jsx21("tr", { children: groupedHeaders.map((g, idx) => {
                  var _a2, _b;
                  const style = groupStyles.get(g.label);
                  return g.label ? /* @__PURE__ */ jsx21(
                    "th",
                    {
                      colSpan: g.span,
                      className: cn(
                        "py-1.5 px-3 text-center font-bold text-[10px] tracking-wider uppercase whitespace-nowrap border-b",
                        groupLabelColorClass
                      ),
                      style: {
                        borderBottomColor: (_a2 = style == null ? void 0 : style.border) != null ? _a2 : isAccent ? "var(--border-default)" : "var(--border-strong)",
                        backgroundColor: (_b = style == null ? void 0 : style.bg) != null ? _b : void 0,
                        borderLeft: idx !== 0 ? "0.5px solid var(--border-default)" : void 0
                      },
                      children: g.label
                    },
                    `group-${g.label}-${idx}`
                  ) : /* @__PURE__ */ jsx21(
                    "th",
                    {
                      className: "p-0 border-b border-border"
                    },
                    `empty-${g.start}`
                  );
                }) }),
                /* @__PURE__ */ jsx21("tr", { children: columns.map((col, i) => {
                  var _a2, _b, _c, _d, _e;
                  const isFirstInGroup = col.group && (i === 0 || columns[i - 1].group !== col.group);
                  const style = col.group ? groupStyles.get(col.group) : void 0;
                  return /* @__PURE__ */ jsx21(
                    "th",
                    {
                      className: cn(
                        "font-semibold text-[11px] tracking-wide whitespace-nowrap border-b border-border",
                        cellPaddingClass
                      ),
                      style: {
                        textAlign: (_a2 = col.align) != null ? _a2 : "left",
                        backgroundColor: (_b = style == null ? void 0 : style.bg) != null ? _b : void 0,
                        borderLeft: isFirstInGroup && i !== 0 ? `1px solid ${(_c = style == null ? void 0 : style.border) != null ? _c : "var(--border-default)"}` : void 0,
                        width: (_d = col.width) != null ? _d : "auto",
                        minWidth: (_e = col.width) != null ? _e : "100px"
                      },
                      children: col.header
                    },
                    col.key
                  );
                }) })
              ] }),
              /* @__PURE__ */ jsx21("tbody", { children: isLoading ? Array.from({ length: 5 }).map((_, rowIdx) => /* @__PURE__ */ jsx21("tr", { className: "bg-background hover:bg-muted/30 transition-colors", children: columns.map((col) => /* @__PURE__ */ jsx21("td", { className: cn("border-b border-border", cellPaddingClass), children: /* @__PURE__ */ jsx21(
                "div",
                {
                  className: "h-3 bg-muted rounded-xs animate-pulse",
                  style: { width: `${60 + Math.random() * 30}%` }
                }
              ) }, col.key)) }, `skeleton-${rowIdx}`)) : data.length === 0 ? /* @__PURE__ */ jsx21("tr", { className: "bg-background", children: /* @__PURE__ */ jsx21(
                "td",
                {
                  colSpan: columns.length,
                  className: "py-12 px-4 text-center text-text-muted font-normal",
                  children: emptyState != null ? emptyState : "Sin resultados"
                }
              ) }) : data.map((row, rowIdx) => {
                const key = String(row[rowKey]);
                return /* @__PURE__ */ jsx21(
                  "tr",
                  {
                    className: "bg-background hover:bg-muted/20 active:bg-muted/40 transition-colors border-b border-border",
                    children: columns.map((col, i) => {
                      var _a2;
                      const isFirstInGroup = col.group && (i === 0 || columns[i - 1].group !== col.group);
                      return /* @__PURE__ */ jsx21(
                        "td",
                        {
                          className: cn(
                            "text-text-primary border-b border-border font-normal text-sm",
                            cellPaddingClass
                          ),
                          style: {
                            textAlign: (_a2 = col.align) != null ? _a2 : "left",
                            borderLeft: isFirstInGroup && i !== 0 ? "0.5px solid var(--border-default)" : void 0
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
            ] })
          }
        ),
        /* @__PURE__ */ jsx21("style", { children: `
                @keyframes dt-pulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.35; }
                }
            ` })
      ]
    }
  );
}

// lib/components/ui/Navegacion/Breadcrumbs.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { jsx as jsx22, jsxs as jsxs17 } from "react/jsx-runtime";
function Breadcrumbs({ className }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");
  return /* @__PURE__ */ jsxs17(
    "nav",
    {
      "aria-label": "Breadcrumb",
      className: cn(
        "flex items-center space-x-2 text-xs tracking-widest font-semibold text-text-muted whitespace-nowrap overflow-x-auto scrollbar-none py-1",
        className
      ),
      children: [
        segments.length === 0 ? /* @__PURE__ */ jsx22("span", { className: "text-text-primary", "aria-current": "page", children: "INICIO" }) : /* @__PURE__ */ jsx22(Link, { href: "/", className: "hover:text-text-primary text-text-muted transition-colors flex items-center outline-none focus-visible:text-accent", children: "INICIO" }),
        segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const name = decodeURIComponent(segment).replace(/[-_]/g, " ").toUpperCase();
          return /* @__PURE__ */ jsxs17("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx22(
              "span",
              {
                className: "text-text-muted/40 select-none text-md",
                "aria-hidden": "true",
                children: "\u203A"
              }
            ),
            isLast ? /* @__PURE__ */ jsx22(
              "span",
              {
                className: "text-text-primary font-bold",
                "aria-current": "page",
                children: name
              }
            ) : (
              // Elementos intermedios navegables
              /* @__PURE__ */ jsx22(
                Link,
                {
                  href,
                  className: "hover:text-text-primary text-text-muted transition-colors outline-none focus-visible:text-accent",
                  children: name
                }
              )
            )
          ] }, href);
        })
      ]
    }
  );
}

// lib/components/ui/Navegacion/SideBar.tsx
import { useState as useState8 } from "react";
import { ChevronLeft as ChevronLeft2, ChevronRight as ChevronRight2, Folder, ChevronDown as ChevronDown2 } from "lucide-react";
import { Fragment as Fragment4, jsx as jsx23, jsxs as jsxs18 } from "react/jsx-runtime";
function Sidebar({
  links,
  subLinks = [],
  subLinksTitle = "Secci\xF3n",
  userName = "Usuario",
  userRole = "Miembro",
  userInitials = "US",
  className
}) {
  const [isCollapsed, setIsCollapsed] = useState8(false);
  const [isSubOpen, setIsSubOpen] = useState8(true);
  return /* @__PURE__ */ jsxs18(
    "aside",
    {
      className: cn(
        "h-screen bg-surface border-r border-border flex flex-col justify-between transition-all duration-300 ease-in-out relative select-none font-body text-text-primary shrink-0",
        isCollapsed ? "w-16" : "w-64",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs18("div", { className: cn("p-4 flex items-center justify-between border-b border-border/40 h-16 shrink-0", isCollapsed && "justify-center px-2"), children: [
          !isCollapsed && /* @__PURE__ */ jsx23("div", { className: "flex items-center gap-1.5 truncate animate-in fade-in duration-200", children: /* @__PURE__ */ jsx23("span", { className: "font-bold text-base tracking-tight text-text-primary uppercase", children: "Agustin" }) }),
          /* @__PURE__ */ jsx23(Tooltip, { content: isCollapsed ? "Expandir" : "Colapsar", side: "right", children: /* @__PURE__ */ jsx23(
            "button",
            {
              type: "button",
              onClick: () => setIsCollapsed(!isCollapsed),
              className: "p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-text-secondary hover:text-text-primary outline-none cursor-pointer transition-colors",
              children: isCollapsed ? /* @__PURE__ */ jsx23(ChevronRight2, { className: "size-4" }) : /* @__PURE__ */ jsx23(ChevronLeft2, { className: "size-4" })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs18("div", { className: "flex-1 overflow-y-auto p-3 space-y-4 scrollbar-none", children: [
          /* @__PURE__ */ jsx23("nav", { className: "space-y-1", children: links.map((item) => {
            const Icon = item.icon;
            return /* @__PURE__ */ jsxs18(
              "button",
              {
                type: "button",
                onClick: item.onClick,
                className: cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all outline-none cursor-pointer",
                  item.active ? "bg-accent-soft text-accent font-semibold" : "text-text-secondary hover:bg-muted hover:text-text-primary",
                  isCollapsed && "justify-center px-0 h-9"
                ),
                children: [
                  /* @__PURE__ */ jsx23(Icon, { className: cn("size-4 shrink-0", item.active ? "text-accent" : "text-text-muted") }),
                  !isCollapsed ? /* @__PURE__ */ jsx23("span", { className: "truncate animate-in fade-in duration-200", children: item.label }) : /* @__PURE__ */ jsx23("span", { className: "text-[11px] font-bold tracking-tighter uppercase md:hidden", children: item.short })
                ]
              },
              item.id
            );
          }) }),
          subLinks.length > 0 && /* @__PURE__ */ jsx23("div", { className: "space-y-1", children: !isCollapsed ? /* @__PURE__ */ jsxs18(Fragment4, { children: [
            /* @__PURE__ */ jsxs18(
              "button",
              {
                type: "button",
                onClick: () => setIsSubOpen(!isSubOpen),
                className: "w-full flex items-center justify-between px-3 py-2 text-[11px] font-bold tracking-wider text-text-muted uppercase hover:text-text-primary transition-colors cursor-pointer outline-none",
                children: [
                  /* @__PURE__ */ jsx23("span", { children: subLinksTitle }),
                  /* @__PURE__ */ jsx23(ChevronDown2, { className: cn("size-3 transition-transform duration-200", !isSubOpen && "-rotate-90") })
                ]
              }
            ),
            isSubOpen && /* @__PURE__ */ jsx23("div", { className: "pl-4 space-y-0.5 animate-in slide-in-from-top-1 duration-150", children: subLinks.map((p, idx) => /* @__PURE__ */ jsxs18(
              "a",
              {
                href: p.href,
                className: "flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary rounded-md hover:bg-muted/50 transition-colors truncate",
                children: [
                  p.isDot && /* @__PURE__ */ jsx23("span", { className: "size-2 rounded-full bg-text-success shrink-0" }),
                  /* @__PURE__ */ jsx23("span", { className: "truncate", children: p.label })
                ]
              },
              idx
            )) })
          ] }) : /* @__PURE__ */ jsx23("div", { className: "flex justify-center py-2 border-t border-border/40 text-text-muted", children: /* @__PURE__ */ jsx23(Folder, { className: "size-4" }) }) })
        ] }),
        /* @__PURE__ */ jsx23("div", { className: cn("p-4 border-t border-border/40 flex items-center gap-3 h-16 shrink-0", isCollapsed && "justify-center px-2"), children: /* @__PURE__ */ jsx23("div", { className: "shrink-0", children: /* @__PURE__ */ jsx23(ThemeToggle, {}) }) })
      ]
    }
  );
}
export {
  Breadcrumbs,
  Button,
  Calendar,
  CalendarGrid,
  CalendarHeader,
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
  MonthGrid,
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
  Sidebar,
  StatusBadge,
  Tabs,
  Textarea,
  ThemeProvider,
  ThemeToggle,
  Toaster,
  Tooltip,
  YearGrid,
  buttonVariants,
  formatDate,
  getDiasDelMes,
  inputVariants,
  isDisabledDay,
  isDisabledMonth,
  isDisabledYear,
  isSameDay,
  isWeekendDate,
  useDialogContext
};
