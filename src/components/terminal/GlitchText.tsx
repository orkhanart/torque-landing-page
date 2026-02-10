'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  children: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  triggerOnHover?: boolean;
  triggerOnView?: boolean;
  continuous?: boolean;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div';
}

export default function GlitchText({
  children,
  intensity = 'subtle',
  triggerOnHover = true,
  triggerOnView = false,
  continuous = false,
  className = '',
  as: Component = 'span',
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(continuous);
  const elementRef = useRef<HTMLElement>(null);

  // Intersection observer for triggerOnView
  useEffect(() => {
    if (!triggerOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 500);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnView]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      setIsGlitching(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerOnHover && !continuous) {
      setIsGlitching(false);
    }
  };

  const intensityConfig = {
    subtle: {
      offset: 1,
      duration: '0.1s',
      opacity: 0.5,
    },
    medium: {
      offset: 2,
      duration: '0.15s',
      opacity: 0.7,
    },
    strong: {
      offset: 3,
      duration: '0.2s',
      opacity: 0.9,
    },
  };

  const config = intensityConfig[intensity];

  return (
    <Component
      ref={elementRef as any}
      className={cn('relative inline-block', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-text={children}
    >
      {/* Main text */}
      <span className="relative z-10">{children}</span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <span
            className="absolute inset-0 z-0"
            style={{
              color: 'inherit',
              opacity: config.opacity,
              animation: `glitch-1 ${config.duration} infinite linear alternate-reverse`,
              clipPath: 'inset(10% 0 60% 0)',
            }}
            aria-hidden
          >
            {children}
          </span>
          <span
            className="absolute inset-0 z-0"
            style={{
              color: 'inherit',
              opacity: config.opacity,
              animation: `glitch-2 ${config.duration} infinite linear alternate-reverse`,
              clipPath: 'inset(60% 0 10% 0)',
            }}
            aria-hidden
          >
            {children}
          </span>
        </>
      )}

      <style jsx>{`
        @keyframes glitch-1 {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-${config.offset}px, ${config.offset}px);
          }
          40% {
            transform: translate(-${config.offset}px, -${config.offset}px);
          }
          60% {
            transform: translate(${config.offset}px, ${config.offset}px);
          }
          80% {
            transform: translate(${config.offset}px, -${config.offset}px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes glitch-2 {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(${config.offset}px, -${config.offset}px);
          }
          40% {
            transform: translate(${config.offset}px, ${config.offset}px);
          }
          60% {
            transform: translate(-${config.offset}px, -${config.offset}px);
          }
          80% {
            transform: translate(-${config.offset}px, ${config.offset}px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </Component>
  );
}
