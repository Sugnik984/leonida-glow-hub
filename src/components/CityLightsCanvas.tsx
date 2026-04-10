import { useEffect, useRef } from "react";

interface WindowLight {
  x: number; y: number; w: number; h: number;
  hue: number; alpha: number; speed: number; phase: number;
}

interface ShootingStar {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; hue: number;
}

interface LightningBolt {
  points: { x: number; y: number }[];
  alpha: number; decay: number; hue: number;
}

const CityLightsCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Pulsing neon building windows
    const windows: WindowLight[] = [];
    for (let i = 0; i < 120; i++) {
      windows.push({
        x: Math.random() * canvas.width,
        y: canvas.height * 0.3 + Math.random() * canvas.height * 0.45,
        w: Math.random() * 4 + 1,
        h: Math.random() * 6 + 2,
        hue: [300, 180, 45, 270, 20][Math.floor(Math.random() * 5)],
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 2 + 0.5,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Shooting stars
    const shootingStars: ShootingStar[] = [];
    const spawnStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.3,
        vx: (Math.random() - 0.3) * 8,
        vy: Math.random() * 3 + 1,
        life: 0,
        maxLife: Math.random() * 40 + 30,
        hue: [180, 300, 45][Math.floor(Math.random() * 3)],
      });
    };

    // Lightning
    const bolts: LightningBolt[] = [];
    const spawnLightning = () => {
      const startX = Math.random() * canvas.width;
      const points: { x: number; y: number }[] = [{ x: startX, y: 0 }];
      let cx = startX, cy = 0;
      const segments = Math.floor(Math.random() * 6) + 4;
      for (let i = 0; i < segments; i++) {
        cx += (Math.random() - 0.5) * 80;
        cy += canvas.height * 0.35 / segments + Math.random() * 20;
        points.push({ x: cx, y: cy });
      }
      bolts.push({
        points,
        alpha: 0.7,
        decay: 0.03 + Math.random() * 0.02,
        hue: [270, 300, 180][Math.floor(Math.random() * 3)],
      });
    };

    let frame = 0;
    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Draw pulsing windows
      windows.forEach((w) => {
        const pulse = Math.sin(frame * 0.02 * w.speed + w.phase) * 0.3 + 0.7;
        const a = w.alpha * pulse;

        // Glow
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${w.hue}, 100%, 60%, ${a * 0.6})`;
        ctx.fillStyle = `hsla(${w.hue}, 100%, 70%, ${a})`;
        ctx.fillRect(w.x, w.y, w.w, w.h);
        ctx.shadowBlur = 0;

        // Reflection below
        const reflY = canvas.height - (canvas.height - w.y) * 0.15 + canvas.height * 0.08;
        ctx.fillStyle = `hsla(${w.hue}, 100%, 60%, ${a * 0.08})`;
        ctx.fillRect(w.x - 1, reflY, w.w + 2, w.h * 3);
      });

      // Shooting stars
      if (frame % 90 === 0 && shootingStars.length < 3) spawnStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        const progress = s.life / s.maxLife;
        const a = 1 - progress;

        // Trail
        const trailLen = 6;
        for (let t = 0; t < trailLen; t++) {
          const ta = a * (1 - t / trailLen) * 0.6;
          const radius = Math.max(0.5, (1 - t / trailLen) * 2.5);
          ctx.beginPath();
          ctx.arc(s.x - s.vx * t * 0.5, s.y - s.vy * t * 0.5, radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${s.hue}, 100%, 80%, ${ta})`;
          ctx.fill();
        }

        // Glow head
        ctx.beginPath();
        ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 100%, 90%, ${a * 0.3})`;
        ctx.fill();

        if (s.life >= s.maxLife) shootingStars.splice(i, 1);
      }

      // Lightning
      if (frame % 300 === 0 && Math.random() > 0.4) spawnLightning();
      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        ctx.beginPath();
        ctx.moveTo(b.points[0].x, b.points[0].y);
        for (let p = 1; p < b.points.length; p++) {
          ctx.lineTo(b.points[p].x, b.points[p].y);
        }
        ctx.strokeStyle = `hsla(${b.hue}, 100%, 80%, ${b.alpha})`;
        ctx.lineWidth = b.alpha * 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsla(${b.hue}, 100%, 60%, ${b.alpha})`;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Flash overlay
        if (b.alpha > 0.5) {
          ctx.fillStyle = `hsla(${b.hue}, 60%, 90%, ${(b.alpha - 0.5) * 0.04})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        b.alpha -= b.decay;
        if (b.alpha <= 0) bolts.splice(i, 1);
      }

      // Neon haze at horizon
      const hazeGrad = ctx.createLinearGradient(0, canvas.height * 0.4, 0, canvas.height * 0.65);
      const hazeAlpha = 0.03 + Math.sin(frame * 0.008) * 0.015;
      hazeGrad.addColorStop(0, `hsla(300, 100%, 50%, 0)`);
      hazeGrad.addColorStop(0.5, `hsla(300, 80%, 50%, ${hazeAlpha})`);
      hazeGrad.addColorStop(1, `hsla(180, 100%, 50%, 0)`);
      ctx.fillStyle = hazeGrad;
      ctx.fillRect(0, canvas.height * 0.4, canvas.width, canvas.height * 0.25);

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none" />;
};

export default CityLightsCanvas;
