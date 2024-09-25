import React from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  children: React.ReactNode
  customVariant?: 'default' | 'big'
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, children, customVariant = 'default', ...props }, ref) => {
    const isBig = customVariant === 'big'
    const rectangleHeight = isBig ? 'h-[54px]' : 'h-[38px]'
    const buttonHeight = isBig ? 'h-[64px] text-[20px] px-3' : 'h-[48px] text-[16px]'

    return (
      <div className="relative inline-flex items-center group">
        {/* Left column */}
        <div className="flex flex-col">
          <div className={cn("w-[10px] bg-primary group-hover:bg-primary-hover transition-colors", rectangleHeight)} />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="Corner" d="M10 10L0 0H10V10Z" className="fill-primary group-hover:fill-primary-hover transition-colors"/>
          </svg>
        </div>

        {/* Middle section (button content) */}
        <Button
          ref={ref}
          variant="default"
          className={cn(
            buttonHeight, "rounded-none px-2 py-2 !bg-primary !shadow-none group-hover:!bg-primary-hover transition-colors !font-semibold",
            className
          )}
          {...props}
        >
          {children}
        </Button>

        {/* Right column */}
        <div className="flex flex-col">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="Corner" d="M0 0L10 10H0V0Z" className="fill-primary group-hover:fill-primary-hover transition-colors"/>
          </svg>
          <div className={cn("w-[10px] bg-primary group-hover:bg-primary-hover transition-colors", rectangleHeight)} />
        </div>
      </div>
    )
  }
)

CustomButton.displayName = 'CustomShapedButton'

export { CustomButton }