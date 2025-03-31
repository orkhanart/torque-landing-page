import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CustomButtonProps extends Omit<ButtonProps, "variant"> {
  children: React.ReactNode;
  customVariant?: "default" | "big" | "ghost";
  href?: string;
  isLink?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    { className, children, customVariant, href, isLink = true, ...props },
    ref
  ) => {
    const isBig = customVariant === "big";
    const isGhost = customVariant === "ghost";
    const rectangleHeight = isBig ? "h-[54px]" : "h-[38px]";
    const buttonHeight = isBig
      ? "h-[64px] text-[20px] px-3"
      : "h-[48px] text-[16px]";

    const buttonContent = (
      <div className="relative inline-flex items-center group">
        {/* Left column */}
        <div className="flex flex-col">
          <div
            className={cn(
              "w-[10px] transition-colors",
              isGhost
                ? "bg-transparent group-hover:bg-primary/10"
                : "bg-primary group-hover:bg-primary-hover",
              rectangleHeight
            )}
          />
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Corner"
              d="M10 10L0 0H10V10Z"
              className={cn(
                "transition-colors",
                isGhost
                  ? "fill-transparent group-hover:fill-primary/10"
                  : "fill-primary group-hover:fill-primary-hover"
              )}
            />
          </svg>
        </div>

        {/* Middle section (button content) */}
        <div
          style={{
            boxShadow: isGhost
              ? "none"
              : "0px 0px 40px 0px rgba(161, 255, 255, 0.4)",
          }}
        >
          <Button
            ref={ref}
            variant={isGhost ? "ghost" : "default"}
            className={cn(
              buttonHeight,
              "rounded-none px-2 py-2 transition-colors !font-semibold",
              isGhost
                ? "!bg-transparent text-primary hover:!bg-primary/10 hover:!text-primary-hover"
                : "!bg-primary !shadow-none group-hover:!bg-primary-hover",
              className
            )}
            {...props}
          >
            {children}
          </Button>
        </div>

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
              id="Corner"
              d="M0 0L10 10H0V0Z"
              className={cn(
                "transition-colors",
                isGhost
                  ? "fill-transparent group-hover:fill-primary/10"
                  : "fill-primary group-hover:fill-primary-hover"
              )}
            />
          </svg>
          <div
            className={cn(
              "w-[10px] transition-colors",
              isGhost
                ? "bg-transparent group-hover:bg-primary/10"
                : "bg-primary group-hover:bg-primary-hover",
              rectangleHeight
            )}
          />
        </div>
      </div>
    );
    if (isLink && href && href !== "default") {
      return (
        <Link href={href} className="relative inline-flex items-center group">
          {buttonContent}
        </Link>
      );
    }
    return buttonContent;
  }
);

CustomButton.displayName = "CustomShapedButton";

export { CustomButton };
