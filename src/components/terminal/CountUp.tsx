'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  className?: string;
  startOnView?: boolean;
  onComplete?: () => void;
}

export default function CountUp({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = ',',
  className = '',
  startOnView = true,
  onComplete,
}: CountUpProps) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const elementRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number>(0);

  // Intersection Observer
  useEffect(() => {
    if (!startOnView || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  // Animation
  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now() + delay;
    const range = end - start;

    const animate = (currentTime: number) => {
      if (currentTime < startTime) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out-quart)
      const easeOut = 1 - Math.pow(1 - progress, 4);

      const currentValue = start + range * easeOut;
      setCount(currentValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
        onComplete?.();
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, [hasStarted, start, end, duration, delay, onComplete]);

  // Format number with separators
  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals);
    const [integer, decimal] = fixed.split('.');

    const withSeparator = integer.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      separator
    );

    return decimal ? `${withSeparator}.${decimal}` : withSeparator;
  };

  return (
    <span
      ref={elementRef}
      className={cn('font-mono tabular-nums', className)}
    >
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
