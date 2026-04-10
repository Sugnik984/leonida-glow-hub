import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import skylineImg from "@/assets/vice-skyline.jpg";
import cityVideo from "@/assets/city-background.mp4.asset.json";
import CityLightsCanvas from "./CityLightsCanvas";

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMouse);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; hue: number }[] = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.1,
        size: Math.random() * 2.5 + 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        hue: [300, 180, 270, 45][Math.floor(Math.random() * 4)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.8;
          p.vx += (dx / dist) * force * 0.1;
          p.vy += (dy / dist) * force * 0.1;
        }
        
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.alpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, ${p.alpha * 0.1})`;
        ctx.fill();
      });

      // Draw energy lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(${particles[i].hue}, 100%, 50%, ${(1 - dist / 80) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[2] pointer-events-none" />;
};

const TrafficStreaks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    interface Streak { x: number; y: number; speed: number; length: number; color: string; }
    const streaks: Streak[] = [];
    for (let i = 0; i < 15; i++) {
      streaks.push({
        x: Math.random() * canvas.width,
        y: canvas.height * 0.55 + Math.random() * canvas.height * 0.3,
        speed: Math.random() * 3 + 1,
        length: Math.random() * 60 + 20,
        color: Math.random() > 0.5 ? "hsla(0, 80%, 60%, 0.3)" : "hsla(45, 100%, 70%, 0.2)",
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      streaks.forEach(s => {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.length, s.y);
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1;
        ctx.stroke();
        s.x += s.speed;
        if (s.x > canvas.width + 100) {
          s.x = -s.length - 50;
          s.y = canvas.height * 0.55 + Math.random() * canvas.height * 0.3;
        }
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none opacity-60" />;
};

const SkylineBackground = () => {
  const { normalizedX, normalizedY } = useMousePosition();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Sky layer - deep parallax */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${normalizedX * -15}px, ${normalizedY * -10}px) scale(1.1)`,
          background: "linear-gradient(180deg, hsl(260 40% 5%) 0%, hsl(280 30% 8%) 30%, hsl(200 20% 10%) 60%, hsl(240 15% 3%) 100%)",
        }}
      />

      {/* Skyline image - mid parallax */}
      <motion.div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${normalizedX * -8}px, ${normalizedY * -5}px) scale(1.08)`,
        }}
        animate={{ scale: [1.08, 1.12, 1.08] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <video
          src={cityVideo.url}
          autoPlay
          loop
          muted
          playsInline
          poster={skylineImg}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Traffic streaks layer */}
      <TrafficStreaks />

      {/* City lights — pulsing windows, shooting stars, lightning */}
      <CityLightsCanvas />

      {/* Fog layer - close parallax */}
      <div
        className="absolute inset-0 z-[1] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${normalizedX * -3}px, ${normalizedY * -2}px)`,
          background: `radial-gradient(ellipse at 50% 80%, hsl(240 15% 3% / 0.4) 0%, transparent 60%)`,
        }}
      />

      {/* Helicopter spotlight */}
      <motion.div
        className="absolute z-[1] pointer-events-none"
        style={{
          width: 200,
          height: 400,
          background: "conic-gradient(from 180deg, transparent 170deg, hsl(45 100% 90% / 0.03) 180deg, transparent 190deg)",
          filter: "blur(10px)",
        }}
        animate={{
          x: [100, 600, 300, 800, 100],
          y: [50, 100, 30, 80, 50],
          rotate: [0, 10, -5, 8, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Deep gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(ellipse at ${50 + normalizedX * 10}% ${30 + normalizedY * 10}%, hsl(300 100% 50% / 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, hsl(180 100% 50% / 0.06) 0%, transparent 40%),
            linear-gradient(180deg, hsl(240 15% 3% / 0.7) 0%, hsl(240 15% 3% / 0.4) 30%, hsl(240 15% 3% / 0.85) 100%)
          `,
        }}
      />

      {/* Ocean shimmer */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/4 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent, hsl(200 60% 40% / 0.03))",
        }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Chromatic aberration */}
      <div
        className="absolute inset-0 mix-blend-screen opacity-[0.04] z-[2]"
        style={{
          background: `
            linear-gradient(90deg, hsl(0 100% 50% / 0.5) 0%, transparent 20%),
            linear-gradient(90deg, transparent 80%, hsl(180 100% 50% / 0.5) 100%)
          `,
        }}
      />

      <ParticleField />

      {/* Film grain */}
      <div className="film-grain absolute inset-0 pointer-events-none z-[3]" />

      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-[3]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(0 0% 100% / 0.03) 2px, hsl(0 0% 100% / 0.03) 4px)",
        }}
      />

      {/* Vertical energy scan beam */}
      <motion.div
        className="absolute left-0 right-0 h-40 pointer-events-none z-[3]"
        style={{
          background: "linear-gradient(180deg, transparent, hsl(300 100% 50% / 0.04), hsl(180 100% 50% / 0.02), transparent)",
        }}
        animate={{ y: ["-10%", "110%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Glitch distortion - occasional */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[4]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(300 100% 50% / 0.03) 50%, transparent 50.5%, transparent 100%)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0], x: [0, 0, 0, 0, -3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </div>
  );
};

export default SkylineBackground;
