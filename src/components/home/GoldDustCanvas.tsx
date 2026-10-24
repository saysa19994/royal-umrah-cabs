'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  driftX: number;
  wobbleSpeed: number;
  wobbleAngle: number;
  baseAlpha: number;
}

export function GoldDustCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect user accessibility preference
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];

    const initParticles = () => {
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 35 : 70;
      particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: (Math.random() * 1.5 + 0.75) * dpr,
          speedY: (Math.random() * 0.4 + 0.18) * dpr,
          driftX: (Math.random() - 0.5) * 0.2 * dpr,
          wobbleSpeed: Math.random() * 0.02 + 0.01,
          wobbleAngle: Math.random() * Math.PI * 2,
          baseAlpha: Math.random() * 0.55 + 0.25,
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width * dpr;
      height = rect.height * dpr;

      canvas.width = width;
      canvas.height = height;

      initParticles();
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.wobbleAngle += p.wobbleSpeed;
        p.x += p.driftX + Math.sin(p.wobbleAngle) * (0.35 * dpr);

        // Wrap around vertically
        if (p.y < -10 * dpr) {
          p.y = height + 10 * dpr;
          p.x = Math.random() * width;
        }

        // Wrap around horizontally
        if (p.x < -10 * dpr) p.x = width + 10 * dpr;
        if (p.x > width + 10 * dpr) p.x = -10 * dpr;

        const currentAlpha = Math.max(0.1, p.baseAlpha * (0.7 + 0.3 * Math.sin(p.wobbleAngle * 2)));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 199, 102, ${currentAlpha.toFixed(3)})`;
        ctx.shadowColor = 'rgba(212, 167, 44, 0.45)';
        ctx.shadowBlur = 3 * dpr;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
    />
  );
}
