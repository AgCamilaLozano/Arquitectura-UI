import { toast as toast$1 } from 'sonner';

// lib/toast.ts
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
  custom: (jsx) => toast$1(jsx)
};

export { toast };
