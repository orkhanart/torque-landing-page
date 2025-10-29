import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// =============================================================================
// Variants Definition using CVA
// =============================================================================

const decoratedButtonVariants = cva(
  "rounded-none transition-colors !font-semibold !shadow-none",
  {
    variants: {
      buttonSize: {
        small: "h-[30px] text-[13px] px-2",
        big: "h-[40px] text-[16px] px-3",
      },
      buttonColor: {
        primary: "!bg-primary text-primary-foreground hover:!bg-primary-hover",
        secondary: "!bg-secondary text-primary-foreground hover:!bg-secondary/80",
      },
    },
    defaultVariants: {
      buttonSize: "big",
      buttonColor: "primary",
    },
  }
);

const cornerVariants = cva("transition-colors", {
  variants: {
    buttonColor: {
      primary: "fill-primary group-hover:fill-primary-hover",
      secondary: "fill-secondary group-hover:fill-secondary/80",
    },
  },
  defaultVariants: {
    buttonColor: "primary",
  },
});

const rectangleVariants = cva("w-[10px] transition-colors", {
  variants: {
    buttonSize: {
      small: "h-[20px]", // 30px button - 10px triangle
      big: "h-[30px]",   // 40px button - 10px triangle
    },
    buttonColor: {
      primary: "bg-primary group-hover:bg-primary-hover",
      secondary: "bg-secondary group-hover:bg-secondary/80",
    },
  },
  defaultVariants: {
    buttonSize: "big",
    buttonColor: "primary",
  },
});

// =============================================================================
// Button Corners Component - Decorative Elements
// =============================================================================

interface ButtonCornersProps {
  buttonSize?: "small" | "big";
  buttonColor?: "primary" | "secondary";
  children: React.ReactNode;
}

const ButtonCorners: React.FC<ButtonCornersProps> = ({
  buttonSize = "big",
  buttonColor = "primary",
  children,
}) => {
  return (
    <div className="relative inline-flex items-center group">
      {/* Left column */}
      <div className="flex flex-col">
        <div className={rectangleVariants({ buttonSize, buttonColor })} />
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 10L0 0H10V10Z"
            className={cornerVariants({ buttonColor })}
          />
        </svg>
      </div>

      {/* Middle section (button content) */}
      {children}

      {/* Right column */}
      <div className="flex flex-col">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L10 10H0V0Z"
            className={cornerVariants({ buttonColor })}
          />
        </svg>
        <div className={rectangleVariants({ buttonSize, buttonColor })} />
      </div>
    </div>
  );
};

// =============================================================================
// Decorated Button Component
// =============================================================================

export interface DecoratedButtonProps
  extends Omit<ButtonProps, "variant" | "size">,
    VariantProps<typeof decoratedButtonVariants> {
  children: React.ReactNode;
  href?: string;
  asLink?: boolean;
}

const DecoratedButton = React.forwardRef<
  HTMLButtonElement,
  DecoratedButtonProps
>(
  (
    { className, children, buttonSize, buttonColor, href, asLink = true, ...props },
    ref
  ) => {
    const size = buttonSize || "big";
    const color = buttonColor || "primary";

    const content = (
      <div className="relative inline-flex items-center group">
        {/* Left column */}
        <div className="flex flex-col">
          <div className={rectangleVariants({ buttonSize: size, buttonColor: color })} />
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 10L0 0H10V10Z"
              className={cornerVariants({ buttonColor: color })}
            />
          </svg>
        </div>

        {/* Middle section (button content) */}
        {/* @ts-expect-error - React 18 ForwardRef type compatibility issue */}
        <Button
          ref={ref}
          variant="default"
          className={cn(
            decoratedButtonVariants({ buttonSize: size, buttonColor: color }),
            className
          )}
          {...props}
        >
          {children}
          <ArrowUpRight className="w-5 h-5 text-primary-foreground ml-2 -mr-1" />
        </Button>


        {/* Right column */}
        <div className="flex flex-col">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0L10 10H0V0Z"
              className={cornerVariants({ buttonColor: color })}
            />
          </svg>
          <div className={rectangleVariants({ buttonSize: size, buttonColor: color })} />
        </div>
      </div>
    );

    // If href is provided and asLink is true, wrap in Link
    if (asLink && href) {
      return (
        /* @ts-expect-error - React 18 ForwardRef type compatibility issue */
        <Link href={href} className="inline-flex">
          {content}
        </Link>
      );
    }

    return content;
  }
);

DecoratedButton.displayName = "DecoratedButton";

// =============================================================================
// Exports
// =============================================================================

export { DecoratedButton, DecoratedButton as CustomButton };
