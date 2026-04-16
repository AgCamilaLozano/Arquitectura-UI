"use client";

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
  custom: (jsx) => sonnerToast(jsx)
};
export {
  toast
};
