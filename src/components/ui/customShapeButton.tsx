import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const customButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // Add more variants as needed
      },
      size: {
        default: "h-10 px-4 py-2",
        // Add more sizes as needed
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof customButtonVariants> {}

const CustomShapeButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(
          customButtonVariants({ variant, size, className }),
          'before:content-[""] before:absolute before:top-0 before:left-0 before:w-4 before:h-full before:bg-black before:transform before:skew-x-[20deg] before:-translate-x-4',
          'after:content-[""] after:absolute after:top-0 after:right-0 after:w-4 after:h-full after:bg-black after:transform after:skew-x-[20deg] after:translate-x-4 bg-[#b3f5ff] text-black hover:bg-[#80eeff]'
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
CustomShapeButton.displayName = "CustomShapeButton"

export { CustomShapeButton, customButtonVariants }