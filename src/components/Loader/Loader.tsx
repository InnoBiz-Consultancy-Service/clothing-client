import { cn } from "@/lib/utils"

interface LoaderSpinnerProps {
    size?: "sm" | "md" | "lg" | "xl"
    color?: "primary" | "secondary" | "accent" | "white"
    className?: string
}

export function Loader({ size = "md", color = "primary", className }: LoaderSpinnerProps) {
    const sizeClasses = {
        sm: "h-4 w-4 border-2",
        md: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-3",
        xl: "h-12 w-12 border-4",
    }

    const colorClasses = {
        primary: "border-primary/30 border-t-primary",
        secondary: "border-secondary/30 border-t-secondary",
        accent: "border-blue-500/30 border-t-blue-500",
        white: "border-white/30 border-t-white",
    }

    return (
        <div
            className={cn("animate-spin rounded-full", sizeClasses[size], colorClasses[color], className)}
            role="status"
            aria-label="Loading"
        />
    )
}

