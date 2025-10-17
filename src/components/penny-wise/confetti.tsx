"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const confettiColors = [
  'bg-yellow-400',
  'bg-green-400',
  'bg-blue-400',
  'bg-red-400',
  'bg-purple-400',
  'bg-pink-400',
];

export function Confetti() {
  const [pieces, setPieces] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const newPieces = Array(50).fill(null).map((_, i) => {
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const size = Math.random() * 0.5 + 0.25; // 0.25rem to 0.75rem
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 2 + 3; // 3s to 5s
      const animationDelay = Math.random() * 5;

      return (
        <div
          key={i}
          className={cn('absolute top-0 rounded-full animate-confetti-fall', color)}
          style={{
            width: `${size}rem`,
            height: `${size}rem`,
            left: `${left}%`,
            animationDuration: `${animationDuration}s`,
            animationDelay: `${animationDelay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        />
      );
    });
    setPieces(newPieces);
  }, []);

  return <div className="absolute inset-0 w-full h-full pointer-events-none">{pieces}</div>;
}
