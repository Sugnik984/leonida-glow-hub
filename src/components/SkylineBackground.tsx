import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import skylineImg from "@/assets/vice-skyline.jpg";

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; hue: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        hue: Math.random() > 0.5 ? 300 : 180,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, ${p.alpha})`;
        ctx.fill();

        // glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, ${p.alpha * 0.15})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[2] pointer-events-none" />;
};

const SkylineBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Skyline image with slow pan */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.08, 1], x: [0, -30, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <img src={skylineImg} alt="" className="w-full h-full object-cover" />
      </motion.div>

      {/* Deep gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, hsl(300 100% 50% / 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, hsl(180 100% 50% / 0.06) 0%, transparent 40%),
            linear-gradient(180deg, hsl(240 15% 3% / 0.75) 0%, hsl(240 15% 3% / 0.5) 30%, hsl(240 15% 3% / 0.85) 100%)
          `,
        }}
      />

      {/* Chromatic aberration */}
      <div
        className="absolute inset-0 mix-blend-screen opacity-[0.04]"
        style={{
          background: `
            linear-gradient(90deg, hsl(0 100% 50% / 0.4) 0%, transparent 25%),
            linear-gradient(90deg, transparent 75%, hsl(180 100% 50% / 0.4) 100%)
          `,
        }}
      />

      {/* Particles */}
      <ParticleField />

      {/* Film grain */}
      <div className="film-grain absolute inset-0 pointer-events-none z-[3]" />

      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] z-[3]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(0 0% 100% / 0.03) 2px, hsl(0 0% 100% / 0.03) 4px)",
        }}
      />

      {/* Animated scan beam */}
      <motion.div
        className="absolute left-0 right-0 h-32 pointer-events-none z-[3]"
        style={{
          background: "linear-gradient(180deg, transparent, hsl(300 100% 50% / 0.03), transparent)",
        }}
        animate={{ y: ["-10%", "110%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default SkylineBackground;
