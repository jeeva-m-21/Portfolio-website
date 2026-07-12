'use client';

import { useEffect, useRef } from 'react';

interface SystemNode {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
  type: 'active' | 'idle' | 'dormant';
}

const NODE_COUNT = 50;
const CONNECTION_DISTANCE = 220;

export function AmbientTopology() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<SystemNode[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const types: SystemNode['type'][] = ['active', 'active', 'idle', 'idle', 'idle', 'dormant', 'dormant'];
    const nodes: SystemNode[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: 1 + Math.random() * 2,
        opacity: 0,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.3 + Math.random() * 0.8,
        type: types[Math.floor(Math.random() * types.length)]!,
      });
    }
    nodesRef.current = nodes;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let lastTime = 0;
    const animate = (time: number) => {
      const dt = Math.min(time - lastTime, 50) / 1000;
      lastTime = time;
      timeRef.current += dt;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      /* Subtle grid — architectural blueprint feel */
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = gridSize; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = gridSize; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      /* Update nodes */
      for (const node of nodes) {
        node.x += node.vx * dt * 60;
        node.y += node.vy * dt * 60;
        if (node.x < 0) { node.x = 0; node.vx *= -1; }
        if (node.x > canvas.width) { node.x = canvas.width; node.vx *= -1; }
        if (node.y < 0) { node.y = 0; node.vy *= -1; }
        if (node.y > canvas.height) { node.y = canvas.height; node.vy *= -1; }
        node.pulsePhase += dt * node.pulseSpeed;
      }

      /* Draw connections */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]!;
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.04;
            ctx.strokeStyle = `rgba(161, 161, 170, ${alpha})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      /* Draw nodes */
      for (const node of nodes) {
        let baseOpacity = node.type === 'active' ? 0.10 : node.type === 'idle' ? 0.05 : 0.025;
        let opacity = baseOpacity * (0.5 + 0.5 * Math.sin(node.pulsePhase));

        const mdx = node.x - mx;
        const mdy = node.y - my;
        const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mouseDist < 150) {
          opacity += 0.10 * (1 - mouseDist / 150);
        }
        opacity = Math.min(opacity, 0.20);

        if (opacity < 0.003) continue;

        const color = node.type === 'active'
          ? `rgba(59, 130, 246, ${opacity})`
          : `rgba(161, 161, 170, ${opacity})`;

        const glowRadius = node.radius * 3;
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.5, color.replace(`${opacity})`, `${opacity * 0.15})`));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        if (opacity > 0.01) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = color.replace(`${opacity})`, `${Math.min(opacity * 2, 0.3)})`);
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
