"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
    CircleCheckIcon,
    InfoIcon,
    TriangleAlertIcon,
    OctagonXIcon,
    Loader2Icon,
} from "lucide-react"

export const Toaster = (props: ToasterProps) => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            position="bottom-left"
            closeButton
            className="toaster !z-[999]"
            icons={{
                success: <CircleCheckIcon className="size-5 !text-text-success" />,
                error: <OctagonXIcon className="size-5 !text-text-error" />,
                warning: <TriangleAlertIcon className="size-5 !text-text-warning" />,
                info: <InfoIcon className="size-5 !text-text-info" />,
                loading: <Loader2Icon className="size-5 animate-spin" />,
            }}
            style={
                {
                    "--normal-bg": "var(--popover)",
                    "--normal-text": "var(--text-primary)",
                    "--border-radius": "var(--radius)",
                } as React.CSSProperties
            }
            toastOptions={{
                classNames: {
                    title:
                        "!text-md !font-bold uppercase",
                    toast:
                        "!border shadow-md !transition-all !rounded-md ",
                    description:
                        "!text-current !font-medium",

                    success:
                        "!border-text-success !bg-success !text-text-success !shadow-green-500/30",

                    error:
                        "!border-text-error !bg-error !text-text-error !shadow-red-500/30",

                    warning:
                        "!border-text-warning !bg-warning !text-text-warning !shadow-yellow-500/30",

                    info:
                        "!border-text-info !bg-info !text-text-info !shadow-blue-500/30",

                    loading:
                        "!border-accent !bg-accent-hover/80 !text-accent !shadow-accent/30",

                    closeButton:
                        "!bg-background !hover:bg-background/80 !text-current !border-current"
                },
            }}
            {...props}
        />
    )
}