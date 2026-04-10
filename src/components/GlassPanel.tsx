import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "left" | "right" | "bottom";
  glowColor?: string;
}

const GlassPanel = ({ children, className = "", delay = 0, from = "bottom", glowColor = "300 100% 50%" }: GlassPanelProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 30 });
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 30 });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const initMap = { left: { x: -60, opacity: 0 }, right: { x: 60, opacity: 0 }, bottom: { y: 40, opacity: 0 } };

  return (
    <motion.div
      ref={ref}
      className={`glass-holographic rounded-xl overflow-hidden relative holo-border ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 800, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={initMap[from]}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {/* Dynamic glow that follows cursor */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 opacity-50"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, hsl(${glowColor} / 0.12), transparent 60%)`
          ),
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlassPanel;
