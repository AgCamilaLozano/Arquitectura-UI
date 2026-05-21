import { cn } from "@/lib/utils";

export type StatusVariant = "success" | "error" | "warning" | "info" | "idle";

interface StatusBadgeProps {
    status: StatusVariant;
    label: string;
    withDot?: boolean;
    animated?: boolean;
    size?: "sm" | "md";
    className?: string;
}

const variantStyles: Record<StatusVariant, { container: string; dot: string }> = {
    success: {
        container: "bg-success text-text-success border border-text-success/20",
        dot: "bg-text-success",
    },
    error: {
        container: "bg-error text-text-error border border-text-error/20",
        dot: "bg-text-error",
    },
    warning: {
        container: "bg-warning text-text-warning border border-text-warning/20",
        dot: "bg-text-warning",
    },
    info: {
        container: "bg-info text-text-info border border-text-info/20",
        dot: "bg-text-info",
    },
    idle: {
        container: "bg-muted text-text-muted border border-border",
        dot: "bg-text-muted",
    },
};

const sizeStylesStatus = {
    sm: "text-xs px-2 py-0.5 gap-1.5",
    md: "text-sm px-2.5 py-1 gap-2",
};

const dotSizeStyles = {
    sm: "size-1.5",
    md: "size-2",
};

export function StatusBadge({
    status,
    label,
    withDot = true,
    animated = false,
    size = "sm",
    className,
}: StatusBadgeProps) {
    const { container, dot } = variantStyles[status];

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-md font-medium select-none",
                container,
                sizeStylesStatus[size],
                className
            )}
        >
            {withDot && (
                <span className="relative flex items-center justify-center shrink-0">
                    {animated && (
                        <span
                            className={cn(
                                "absolute inline-flex rounded-full opacity-75 animate-ping",
                                dot,
                                dotSizeStyles[size]
                            )}
                        />
                    )}
                    <span
                        className={cn(
                            "relative inline-flex rounded-full",
                            dot,
                            dotSizeStyles[size]
                        )}
                    />
                </span>
            )}
            <span className="truncate">{label}</span>
        </span>
    );
}