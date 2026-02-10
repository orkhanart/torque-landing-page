'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import CountUp from './CountUp';

export type InsightType = 'activation' | 'churn' | 'waste';

interface InsightMetric {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
}

interface InsightCardProps {
  type: InsightType;
  title: string;
  metrics: InsightMetric[];
  action?: {
    label: string;
    onClick?: () => void;
  };
  live?: boolean;
  variant?: 'default' | 'dark';
  className?: string;
}

const TYPE_CONFIG: Record<InsightType, { label: string; color: string }> = {
  activation: { label: 'ACTIVATION_OPPORTUNITY', color: 'text-black' },
  churn: { label: 'CHURN_RISK', color: 'text-black' },
  waste: { label: 'WASTE_DETECTED', color: 'text-black' },
};

export default function InsightCard({
  type,
  title,
  metrics,
  action,
  live = true,
  variant = 'default',
  className = '',
}: InsightCardProps) {
  const [time, setTime] = useState('0s');
  const config = TYPE_CONFIG[type];
  const isDark = variant === 'dark';

  // Update time
  useEffect(() => {
    if (!live) return;

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      if (elapsed < 60) {
        setTime(`${elapsed}s ago`);
      } else {
        setTime(`${Math.floor(elapsed / 60)}m ago`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [live]);

  return (
    <div
      className={cn(
        'border overflow-hidden',
        isDark
          ? 'border-white/20 bg-black text-white'
          : 'border-black bg-white text-black',
        className
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between px-4 py-2.5 border-b',
          isDark
            ? 'border-white/10 bg-white/5'
            : 'border-black/10 bg-gray-50'
        )}
      >
        <div className="flex items-center gap-2">
          {/* Live indicator */}
          {live && (
            <div
              className={cn(
                'w-2 h-2',
                isDark ? 'bg-white' : 'bg-black',
                'animate-pulse'
              )}
            />
          )}
          <span
            className={cn(
              'font-mono text-[10px] uppercase tracking-wider font-medium',
              isDark ? 'text-white' : 'text-black'
            )}
          >
            {config.label}
          </span>
        </div>
        {live && (
          <span
            className={cn(
              'font-mono text-[10px]',
              isDark ? 'text-white/40' : 'text-gray-400'
            )}
          >
            {time}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <h3
          className={cn(
            'font-display text-lg font-medium leading-tight',
            isDark ? 'text-white' : 'text-black'
          )}
        >
          {title}
        </h3>

        {/* Metrics */}
        <div
          className={cn(
            'grid gap-3 p-3',
            isDark ? 'bg-white/5' : 'bg-gray-50',
            metrics.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
          )}
        >
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div
                className={cn(
                  'font-mono text-lg font-semibold',
                  isDark ? 'text-white' : 'text-black'
                )}
              >
                {typeof metric.value === 'number' ? (
                  <CountUp
                    end={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    duration={1500}
                    delay={index * 200}
                  />
                ) : (
                  <>
                    {metric.prefix}
                    {metric.value}
                    {metric.suffix}
                  </>
                )}
              </div>
              <div
                className={cn(
                  'font-mono text-[9px] uppercase tracking-wider mt-0.5',
                  isDark ? 'text-white/40' : 'text-gray-400'
                )}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action */}
      {action && (
        <div
          className={cn(
            'px-4 py-3 border-t',
            isDark
              ? 'border-white/10'
              : 'border-black/10'
          )}
        >
          <button
            onClick={action.onClick}
            className={cn(
              'w-full font-mono text-xs uppercase tracking-wider font-medium py-2.5 px-4 transition-all duration-200',
              isDark
                ? 'bg-white text-black hover:bg-white/90'
                : 'bg-black text-white hover:bg-gray-800'
            )}
          >
            {action.label}
          </button>
        </div>
      )}
    </div>
  );
}
