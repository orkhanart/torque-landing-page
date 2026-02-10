'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div';
  startOnView?: boolean;
}

export default function TypeWriter({
  text,
  speed = 50,
  delay = 0,
  cursor = true,
  cursorChar = '_',
  onComplete,
  className = '',
  as: Component = 'span',
  startOnView = false,
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const elementRef = useRef<HTMLElement>(null);

  // Intersection Observer for startOnView
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

  // Typing effect
  useEffect(() => {
    if (!hasStarted) return;

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onComplete, hasStarted]);

  return (
    <Component
      ref={elementRef as any}
      className={cn('font-mono', className)}
    >
      {displayedText}
      {cursor && !isComplete && (
        <span className={cn('animate-pulse', isTyping && 'opacity-100')}>
          {cursorChar}
        </span>
      )}
    </Component>
  );
}
