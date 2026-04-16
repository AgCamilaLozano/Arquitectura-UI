type ToastOptions = {
    description?: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
};
declare const toast: {
    success: (title: string, options?: ToastOptions) => string | number;
    error: (title: string, options?: ToastOptions) => string | number;
    warning: (title: string, options?: ToastOptions) => string | number;
    info: (title: string, options?: ToastOptions) => string | number;
    loading: (title: string, options?: ToastOptions) => string | number;
    promise: <T>(promise: Promise<T>, messages: {
        loading: string;
        success: string;
        error: string;
    }) => (string & {
        unwrap: () => Promise<T>;
    }) | (number & {
        unwrap: () => Promise<T>;
    }) | {
        unwrap: () => Promise<T>;
    };
    custom: (jsx: React.ReactNode) => string | number;
};

export { toast };
