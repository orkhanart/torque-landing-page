'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TerminalCardProps {
  title?: string;
  children: ReactNode;
  variant?: 'default' | 'dark';
  showDots?: boolean;
  className?: string;
  bodyClassName?: string;
}

export default function TerminalCard({
  title,
  children,
  variant = 'default',
  showDots = true,
  className = '',
  bodyClassName = '',
}: TerminalCardProps) {
  const isDark = variant === 'dark';

  return (
    <div
      className={cn(
        'border overflow-hidden rounded-[3px]',
        isDark
          ? 'border-white/20 bg-black'
          : 'border-black bg-white',
        className
      )}
    >
      {/* Header */}
      {(title || showDots) && (
        <div
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 border-b',
            isDark
              ? 'bg-white/5 text-white border-white/10'
              : 'bg-black text-white border-black'
          )}
        >
          {showDots && (
            <div className="flex gap-1.5">
              <div className={cn(
                'w-2.5 h-2.5 rounded-full',
                isDark ? 'bg-white/20' : 'bg-white/30'
              )} />
              <div className={cn(
                'w-2.5 h-2.5 rounded-full',
                isDark ? 'bg-white/20' : 'bg-white/30'
              )} />
              <div className={cn(
                'w-2.5 h-2.5 rounded-full',
                isDark ? 'bg-white/20' : 'bg-white/30'
              )} />
            </div>
          )}
          {title && (
            <span className="font-mono text-xs uppercase tracking-wider font-medium ml-2">
              {title}
            </span>
          )}
        </div>
      )}

      {/* Body */}
      <div className={cn('p-4', bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
