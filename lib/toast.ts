import { toast as sonnerToast } from "sonner"

type ToastOptions = {
    description?: string
    duration?: number
    action?: {
        label: string
        onClick: () => void
    }
}

export const toast = {
    success: (title: string, options?: ToastOptions) =>
        sonnerToast.success(title, {
            description: options?.description,
            duration: options?.duration,
            action: options?.action,
        }),

    error: (title: string, options?: ToastOptions) =>
        sonnerToast.error(title, {
            description: options?.description,
            duration: options?.duration,
            action: options?.action,
        }),

    warning: (title: string, options?: ToastOptions) =>
        sonnerToast.warning(title, {
            description: options?.description,
            duration: options?.duration,
            action: options?.action,
        }),

    info: (title: string, options?: ToastOptions) =>
        sonnerToast.info(title, {
            description: options?.description,
            duration: options?.duration,
            action: options?.action,
        }),

    loading: (title: string, options?: ToastOptions) =>
        sonnerToast.loading(title, {
            description: options?.description,
        }),

    promise: <T>(
        promise: Promise<T>,
        messages: {
            loading: string
            success: string
            error: string
        }
    ) =>
        sonnerToast.promise(promise, {
            loading: messages.loading,
            success: messages.success,
            error: messages.error,
        }),

    custom: (jsx: React.ReactNode) => sonnerToast(jsx),
}