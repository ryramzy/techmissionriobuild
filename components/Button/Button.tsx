import { cva, type VariantProps } from "class-variance-authority"
import { type ButtonHTMLAttributes, forwardRef } from "react"
import { twMerge } from "tailwind-merge"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      intent: {
        primary:
          "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
        outline:
          "border-2 border-gray-200 bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-500 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, href, ...props }, ref) => {
    const Comp = href ? "a" : "button"
    return (
      <Comp
        className={twMerge(buttonVariants({ intent, size, className }))}
        ref={ref as any}
        href={href}
        {...props}
      />
    )
  },
)

Button.displayName = "Button"
