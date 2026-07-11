'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number; y: number;
  ox: number; oy: number; // original position (for spring-back)
  radius: number;
  baseOpacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
  layer: 0 | 1 | 2;
  displacementX: number; // current gravitational offset
  displacementY: number;
}

const STAR_COUNT = 400;
const LAYERS = [
  { count: 150, speed: 0.015, maxOpacity: 0.06, maxRadius: 1.2, mass: 0.3 },
  { count: 150, speed: 0.035, maxOpacity: 0.10, maxRadius: 1.6, mass: 0.6 },
  { count: 100, speed: 0.070, maxOpacity: 0.16, maxRadius: 2.2, mass: 1.0 },
];

export function AmbientTopology() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000, prevX: -1000, prevY: -1000 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stars: Star[] = [];
    for (const layer of LAYERS) {
      for (let i = 0; i < layer.count; i++) {
        const cx = Math.random();
        const cy = Math.random();
        const spread = 0.3 + Math.random() * 0.7;
        const x = ((cx + (Math.random() - 0.5) * spread) + 1) % 1;
        const y = ((cy + (Math.random() - 0.5) * spread) + 1) % 1;
        stars.push({
          x, y, ox: x, oy: y,
          radius: 0.3 + Math.random() * layer.maxRadius,
          baseOpacity: layer.maxOpacity * (0.2 + Math.random() * 0.8),
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.1 + Math.random() * 0.5,
          layer: i < 75 ? 0 : i < 150 ? 1 : 2,
          displacementX: 0, displacementY: 0,
        });
      }
    }
    starsRef.current = stars;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      const m = mouseRef.current;
      m.prevX = m.x;
      m.prevY = m.y;
      m.x = e.clientX;
      m.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let lastTime = 0;
    const animate = (time: number) => {
      const dt = Math.min(time - lastTime, 50) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const scrollY = scrollRef.current;

      /* === CURSOR GLOW === */
      if (mx > 0 && my > 0) {
        // Outer ambient glow
        const outerGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 300);
        outerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.04)');
        outerGlow.addColorStop(0.3, 'rgba(255, 255, 255, 0.015)');
        outerGlow.addColorStop(0.6, 'rgba(255, 255, 255, 0.004)');
        outerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(mx, my, 300, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Inner core glow
        const innerGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 80);
        innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.07)');
        innerGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
        innerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(mx, my, 80, 0, Math.PI * 2);
        ctx.fillStyle = innerGlow;
        ctx.fill();
      }

      for (const star of stars) {
        // Parallax drift
        const layerSpeed = LAYERS[star.layer]!.speed;
        const driftX = time * 0.0001 * layerSpeed;
        const driftY = scrollY * 0.00003 * layerSpeed;
        star.ox = ((star.ox + driftX * 0.001) % 1 + 1) % 1;
        star.oy = ((star.oy + driftY * 0.001) % 1 + 1) % 1;

        let sx = star.ox * canvas.width;
        let sy = star.oy * canvas.height;

        /* === GRAVITATIONAL LENSING === */
        if (mx > 0 && my > 0) {
          const dx = sx - mx;
          const dy = sy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influenceRadius = 250;

          if (dist < influenceRadius && dist > 1) {
            // Gravitational pull strength (inverse square, capped)
            const strength = (1 - dist / influenceRadius);
            const pull = strength * strength * 25 * LAYERS[star.layer]!.mass;

            // Pull toward cursor
            const nx = dx / dist;
            const ny = dy / dist;

            // Spring physics: displacement follows cursor with damping
            const targetDx = -nx * pull;
            const targetDy = -ny * pull;

            star.displacementX += (targetDx - star.displacementX) * 0.08;
            star.displacementY += (targetDy - star.displacementY) * 0.08;
          } else {
            // Spring back to origin
            star.displacementX *= 0.92;
            star.displacementY *= 0.92;
          }
        } else {
          star.displacementX *= 0.92;
          star.displacementY *= 0.92;
        }

        sx += star.displacementX;
        sy += star.displacementY;

        // Twinkle
        star.twinklePhase += star.twinkleSpeed * dt;
        const twinkle = 0.6 + 0.4 * Math.sin(star.twinklePhase);
        let opacity = star.baseOpacity * twinkle;

        // Brighten near cursor
        if (mx > 0 && my > 0) {
          const mdx = sx - mx;
          const mdy = sy - my;
          const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mouseDist < 200) {
            opacity += star.baseOpacity * 3 * (1 - mouseDist / 200);
          }
        }
        opacity = Math.min(opacity, 0.4);

        if (opacity < 0.004) continue;

        // Glow
        const glowRadius = star.radius * 3.5;
        const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowRadius);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(0.4, `rgba(255, 255, 255, ${opacity * 0.2})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(sx, sy, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        if (opacity > 0.015) {
          ctx.beginPath();
          ctx.arc(sx, sy, star.radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(opacity * 1.8, 0.8)})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrameRef.current);
      } else {
        lastTime = performance.now();
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
