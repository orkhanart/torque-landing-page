import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react"; // Using Lucide icons instead of Image

const selectBadgeVariants = cva(
  "inline-flex items-center justify-between px-3 py-1 text-lg font-medium rounded",
  {
    variants: {
      variant: {
        blue: "text-[#A1FFFF]",
        red: "text-[#F1A3A1]",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  }
)

export interface SelectBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof selectBadgeVariants> {}

function SelectBadge({ className, variant, children, ...props }: SelectBadgeProps) {
  const getStyles = (variant: SelectBadgeProps['variant']) => {
    const baseStyle = {
      background: 'linear-gradient(180deg, rgba(161, 255, 255, 0.12) 0%, rgba(161, 255, 255, 0.02) 100%)',
      borderImage: 'linear-gradient(180deg, rgba(161, 255, 255, 0.8) 0%, rgba(161, 255, 255, 0.03) 100%) 1',
      borderImageSlice: '1',
      borderWidth: '1px',
      borderStyle: 'solid',
    };

    if (variant === 'red') {
      return {
        ...baseStyle,
        background: 'linear-gradient(180deg, rgba(241, 163, 161, 0.12) 0%, rgba(241, 163, 161, 0.02) 100%)',
        borderImage: 'linear-gradient(180deg, rgba(241, 163, 161, 0.8) 0%, rgba(241, 163, 161, 0.03) 100%) 1',
      };
    }

    return baseStyle;
  };

  return (
    <div 
      className={cn(selectBadgeVariants({ variant }), className)}
      style={getStyles(variant)}
      {...props}
    >
      {children}
      <ChevronDown size={16} className="ml-1" />
    </div>
  )
}

export { SelectBadge, selectBadgeVariants }