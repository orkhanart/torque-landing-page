import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex !items-center",
  {
    variants: {
      variant: {
        primary: "text-primary border-primary",
        accent: "text-accent border-accent",
        tertiary: "text-tertiary border-tertiary",
        white: "text-white border-white",
      },
      size: {
        default: "h-[40px] text-[18px]",
        sm: "h-[32px] text-[16px]",
      },
    },
    defaultVariants: {
      variant: "accent",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, children, ...props }: BadgeProps) {
  // Map variant to color
  const getStrokeColor = (variant: BadgeProps['variant']) => {
    switch (variant) {
      case 'primary':
        return 'hsla(180, 100%, 82%, 1)';
      case 'accent':
        return 'hsla(2, 74%, 79%, 1)';
      case 'tertiary':
        return 'hsl(180, 10%, 80%, 1)';
      case 'white':
        return 'hsl(0, 0%, 100%, 1)';
      default:
        return 'hsla(2, 74%, 79%, 1)'; // Default to accent color
    }
  };

  const strokeColor = getStrokeColor(variant);
  const textShadowColor = strokeColor.replace('1)', '0.5)');
  const svgHeight = size === "sm" ? "32" : "40";
  const svgViewBox = size === "sm" ? "0 0 17 50" : "0 0 17 50";
  const boxBorderWidth = size === "sm" ? "border-y-[1.3px]" : "border-y-[1.5px]";

  return (
    <div className={cn(badgeVariants({ variant, size }), "flex items-center", className)} {...props}>
      <svg className="-mr-1" width="16" height={svgHeight} viewBox={svgViewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Left side" d="M17 1.00021L12.6569 1.00021C11.596 1.00021 10.5786 1.42164 9.82843 2.17179L2.17157 9.82864C1.42143 10.5788 1 11.5962 1 12.6571L0.999998 21.9244L1 44.9999C1 47.209 2.79086 48.9999 5 48.9999L9 48.9999L17 48.9999" stroke={strokeColor} strokeWidth="1.6"/>
      </svg>
      <div 
        className={`${boxBorderWidth} px-2.5 py-0.5 font-semibold flex items-center ${badgeVariants({ variant, size })}`}
        style={{ textShadow: `0px 0px 8px ${textShadowColor}` }}
      >
        {children}
      </div>
      <svg className="-ml-1" width="16" height={svgHeight} viewBox={svgViewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Right side" d="M3.81567e-07 48.9998L4.34315 48.9998C5.40401 48.9998 6.42143 48.5784 7.17157 47.8282L14.8284 40.1714C15.5786 39.4212 16 38.4038 16 37.3429L16 28.0756L16 5.00013C16 2.79099 14.2091 1.00012 12 1.00012L8 1.00012L0 1.00012" stroke={strokeColor} strokeWidth="1.6"/>
      </svg>
    </div>
  )
}

export { Badge, badgeVariants }
