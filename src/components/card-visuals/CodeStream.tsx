"use client";

import React, { useEffect, useRef } from "react";

interface CodeStreamProps {
  color?: string;
  className?: string;
}

const codeSnippets = [
  "const reward = await torque.create({",
  '  trigger: "trade",',
  '  condition: "volume > 1000",',
  '  amount: "10 USDC"',
  "});",
  "",
  "torque.on('claim', async (event) => {",
  "  await processReward(event.wallet);",
  "});",
  "",
  "const leaderboard = torque.rank({",
  '  metric: "volume",',
  '  period: "7d"',
  "});",
  "",
  "await torque.webhook.send({",
  "  url: endpoint,",
  "  events: ['reward.claimed']",
  "});",
];

export function CodeStream({ color = "#0000FF", className = "" }: CodeStreamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lineHeight = 18;
    const totalHeight = codeSnippets.length * lineHeight;

    const animate = () => {
      offsetRef.current += 0.3;

      if (offsetRef.current >= totalHeight) {
        offsetRef.current = 0;
      }

      container.style.transform = `translateY(-${offsetRef.current}px)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Syntax highlighting helper
  const highlightCode = (line: string) => {
    return line
      .replace(
        /(const|await|async|return)/g,
        `<span style="color: #ff79c6">$1</span>`
      )
      .replace(
        /(".*?")/g,
        `<span style="color: ${color}">$1</span>`
      )
      .replace(
        /(torque)/g,
        `<span style="color: #50fa7b">$1</span>`
      )
      .replace(
        /(\.\w+)/g,
        `<span style="color: #8be9fd">$1</span>`
      )
      .replace(
        /([{}()[\],;:])/g,
        `<span style="color: #6272a4">$1</span>`
      );
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none opacity-30 ${className}`}
    >
      <div ref={containerRef} className="font-mono text-[10px] leading-[18px] whitespace-pre">
        {/* Render code twice for seamless loop */}
        {[...codeSnippets, ...codeSnippets].map((line, i) => (
          <div
            key={i}
            className="text-black/60"
            dangerouslySetInnerHTML={{ __html: highlightCode(line) || "&nbsp;" }}
          />
        ))}
      </div>
    </div>
  );
}

export default CodeStream;
