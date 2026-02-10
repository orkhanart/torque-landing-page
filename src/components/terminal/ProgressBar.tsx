'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  animate?: boolean;
  animationDuration?: number;
  variant?: 'default' | 'dark' | 'striped';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  animate = true,
  animationDuration = 1000,
  variant = 'default',
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);
  const [hasAnimated, setHasAnimated] = useState(!animate);
  const elementRef = useRef<HTMLDivElement>(null);

  const percentage = Math.min((displayValue / max) * 100, 100);

  // Intersection observer for animate on view
  useEffect(() => {
    if (!animate || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [animate, hasAnimated]);

  // Animate value
  useEffect(() => {
    if (!hasAnimated || !animate) return;

    const start = performance.now();
    const startValue = 0;
    const endValue = value;

    const animateValue = (currentTime: number) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / animationDuration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOut;

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };

    requestAnimationFrame(animateValue);
  }, [hasAnimated, animate, value, animationDuration]);

  // Update when value changes (non-animated)
  useEffect(() => {
    if (!animate) {
      setDisplayValue(value);
    }
  }, [value, animate]);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div ref={elementRef} className={cn('w-full', className)}>
      {/* Label row */}
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
              {label}
            </span>
          )}
          {showValue && (
            <span className="font-mono text-xs tabular-nums">
              {Math.round(displayValue)}%
            </span>
          )}
        </div>
      )}

      {/* Progress bar */}
      <div
        className={cn(
          'w-full overflow-hidden',
          variant === 'dark' ? 'bg-white/10' : 'bg-gray-200',
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out',
            variant === 'dark' ? 'bg-white' : 'bg-black',
            variant === 'striped' && 'bg-striped'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <style jsx>{`
        .bg-striped {
          background: repeating-linear-gradient(
            -45deg,
            #000,
            #000 5px,
            #333 5px,
            #333 10px
          );
          animation: stripe-move 1s linear infinite;
        }

        @keyframes stripe-move {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 14px 0;
          }
        }
      `}</style>
    </div>
  );
}
