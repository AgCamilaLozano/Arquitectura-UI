"use client";

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
  custom: (jsx) => sonnerToast(jsx)
};
export {
  toast
};
