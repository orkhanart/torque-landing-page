'use client';

interface ScanLinesProps {
  animate?: boolean;
  opacity?: number;
  dark?: boolean;
  className?: string;
}

export default function ScanLines({
  animate = true,
  opacity = 0.02,
  dark = false,
  className = '',
}: ScanLinesProps) {
  const lineColor = dark ? '255, 255, 255' : '0, 0, 0';

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 2 }}
    >
      {/* Static scan lines */}
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(${lineColor}, ${opacity}) 2px,
            rgba(${lineColor}, ${opacity}) 4px
          )`,
        }}
      />

      {/* Animated scan bar */}
      {animate && (
        <div
          className="absolute inset-x-0 h-32"
          style={{
            background: `linear-gradient(
              180deg,
              transparent 0%,
              rgba(${lineColor}, ${opacity * 2}) 50%,
              transparent 100%
            )`,
            animation: 'scanDown 8s linear infinite',
          }}
        />
      )}

      <style jsx>{`
        @keyframes scanDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(calc(100vh + 100%));
          }
        }
      `}</style>
    </div>
  );
}
