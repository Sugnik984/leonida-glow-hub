import { useEffect, useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

const NeonCursor = () => {
  const { x, y, speed } = useMousePosition();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trail = useRef<{ x: number; y: number; age: number; hue: number }[]>([]);
  const animRef = useRef<number>(0);
  const smoothPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    document.body.style.cursor = "none";
    return () => { document.body.style.cursor = ""; };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Smooth follow
      smoothPos.current.x += (x - smoothPos.current.x) * 0.15;
      smoothPos.current.y += (y - smoothPos.current.y) * 0.15;
      const sx = smoothPos.current.x;
      const sy = smoothPos.current.y;

      // Add trail particles
      if (speed > 0.5) {
        for (let i = 0; i < Math.min(Math.floor(speed / 3), 4); i++) {
          trail.current.push({
            x: sx + (Math.random() - 0.5) * 8,
            y: sy + (Math.random() - 0.5) * 8,
            age: 0,
            hue: Math.random() > 0.5 ? 300 : 180,
          });
        }
      }

      // Draw trail
      trail.current.forEach((p, i) => {
        p.age += 0.025;
        const alpha = Math.max(0, 1 - p.age);
        const size = (1 - p.age) * 3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${alpha * 0.6})`;
        ctx.fill();
      });
      trail.current = trail.current.filter(p => p.age < 1);

      // Outer glow
      const glowSize = 30 + Math.min(speed, 30);
      const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowSize);
      grad.addColorStop(0, "hsla(300, 100%, 60%, 0.15)");
      grad.addColorStop(0.3, "hsla(270, 100%, 55%, 0.08)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(sx - glowSize, sy - glowSize, glowSize * 2, glowSize * 2);

      // Core orb
      const coreGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, 8);
      coreGrad.addColorStop(0, "hsla(0, 0%, 100%, 0.9)");
      coreGrad.addColorStop(0.3, "hsla(300, 100%, 70%, 0.7)");
      coreGrad.addColorStop(0.7, "hsla(180, 100%, 60%, 0.3)");
      coreGrad.addColorStop(1, "transparent");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(sx, sy, 8, 0, Math.PI * 2);
      ctx.fill();

      // Crosshair
      ctx.strokeStyle = "hsla(180, 100%, 60%, 0.25)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(sx - 16, sy); ctx.lineTo(sx - 6, sy);
      ctx.moveTo(sx + 6, sy); ctx.lineTo(sx + 16, sy);
      ctx.moveTo(sx, sy - 16); ctx.lineTo(sx, sy - 6);
      ctx.moveTo(sx, sy + 6); ctx.lineTo(sx, sy + 16);
      ctx.stroke();

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [x, y, speed]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[9999] pointer-events-none" />;
};

export default NeonCursor;
