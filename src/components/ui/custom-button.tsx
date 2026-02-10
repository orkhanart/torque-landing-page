import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

// =============================================================================
// CustomButton - Terminal style button with optional arrow
// =============================================================================

export interface CustomButtonProps extends Omit<ButtonProps, 'size'> {
  children: React.ReactNode;
  href?: string;
  showArrow?: boolean;
  buttonSize?: "small" | "big";
  buttonColor?: "primary" | "secondary";
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({
    className,
    children,
    href,
    showArrow = true,
    buttonSize = "big",
    buttonColor = "primary",
    variant,
    ...props
  }, ref) => {
    // Map old props to new system
    const size = buttonSize === "small" ? "sm" : "default";
    const buttonVariant = buttonColor === "secondary" ? "outline" : (variant || "default");

    return (
      <Button
        ref={ref}
        variant={buttonVariant}
        size={size}
        href={href}
        className={cn(className)}
        {...props}
      >
        {children}
        {showArrow && (
          <ArrowUpRight className="w-4 h-4 ml-2 -mr-1" />
        )}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";

// Backwards compatibility
const DecoratedButton = CustomButton;

export { CustomButton, DecoratedButton };
