import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles - clean digital aesthetic
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "font-mono text-xs uppercase tracking-wider font-medium",
    "rounded-[3px]",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "strobe-glitch",
  ],
  {
    variants: {
      variant: {
        // Primary: Black bg, white text
        default: [
          "bg-black text-white border border-black",
          "hover:bg-black-light",
        ],
        // Accent: Digital Blue
        accent: [
          "bg-blue text-white border border-blue",
          "hover:bg-blue-dark hover:border-blue-dark",
        ],
        // Outline: White bg, black border
        outline: [
          "bg-white text-black border border-black/20",
          "hover:border-black hover:bg-gray-100",
        ],
        // Secondary: Gray bg
        secondary: [
          "bg-black/10 text-black border border-transparent",
          "hover:bg-black/20",
        ],
        // Ghost: No bg, just text with underline on hover
        ghost: [
          "bg-transparent text-black border-none",
          "hover:underline underline-offset-4",
        ],
        // Link: Text only with arrow
        link: [
          "bg-transparent text-black border-none p-0 h-auto",
          "hover:underline underline-offset-4",
        ],
        // Inverse variants for dark backgrounds
        "inverse": [
          "bg-white text-black border border-white",
          "hover:bg-gray-100",
        ],
        "inverse-outline": [
          "bg-transparent text-white border border-white",
          "hover:bg-white hover:text-black",
        ],
        "inverse-ghost": [
          "bg-transparent text-white border-none",
          "hover:underline underline-offset-4",
        ],
        // Blue outline (for light backgrounds)
        "blue-outline": [
          "bg-transparent text-blue border border-blue",
          "hover:bg-blue hover:text-white",
        ],
        // Aqua: Cyan bg, dark text (for dark backgrounds)
        aqua: [
          "bg-aquamarine text-black border border-aquamarine",
          "hover:bg-aquamarine-dark hover:border-aquamarine-dark",
        ],
        // Destructive
        destructive: [
          "bg-red-600 text-white border border-red-600",
          "hover:bg-red-700 hover:border-red-700",
        ],
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 py-2 text-[10px]",
        lg: "h-13 px-8 py-4",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
  external?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, external = false, children, ...props }, ref) => {
    // If href is provided, render as a link
    if (href) {
      const isExternal = external || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant, size, className }))}
          >
            {children}
          </a>
        )
      }

      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      )
    }

    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
