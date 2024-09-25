import React from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'


interface CustomShapedButtonProps extends ButtonProps {
  children: React.ReactNode
}

const CustomShapedButton = React.forwardRef<HTMLButtonElement, CustomShapedButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        {/* Left column */}
        <div className="flex flex-col">
          <div className="w-[10px] h-[54px] bg-primary" />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="Corner" d="M10 10L0 0H10V10Z" fill="#A1FFFF"/>
          </svg>

        </div>

        {/* Middle section (button content) */}
        <Button
          ref={ref}
          variant="default"
          className={cn(
            "h-[64px] rounded-none px-4 py-2 !bg-primary !shadow-none",
            className
          )}
          {...props}
        >
          {children}
        </Button>

        {/* Right column */}
        <div className="flex flex-col">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="Corner" d="M0 0L10 10H0V0Z" fill="#A1FFFF"/>
        </svg>

          <div className="w-[10px] h-[54px] bg-primary" />
        </div>
      </div>
    )
  }
)

CustomShapedButton.displayName = 'CustomShapedButton'

export { CustomShapedButton }