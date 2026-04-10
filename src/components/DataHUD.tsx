import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Activity, Wifi, Cpu, Database } from "lucide-react";
import GlassPanel from "./GlassPanel";

const StreamingNumber = ({ target, prefix = "", suffix = "", color }: { target: number; prefix?: string; suffix?: string; color: string }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame: number;
    let start: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 1500, 1);
      setValue(Math.floor(target * progress));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <span className="font-display text-lg font-bold tabular-nums" style={{ color: `hsl(${color})` }}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
};

const CircularMeter = ({ value, label, color, delay }: { value: number; label: string; color: string; delay: number }) => {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;

  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", damping: 12 }}
    >
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={r} fill="none" stroke="hsl(240 10% 12%)" strokeWidth="3" />
          <motion.circle
            cx="32" cy="32" r={r} fill="none"
            stroke={`hsl(${color})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ delay: delay + 0.3, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: `drop-shadow(0 0 6px hsl(${color} / 0.6))` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xs font-bold text-foreground">{value}%</span>
        </div>
      </div>
      <span className="font-display text-[7px] tracking-[0.2em] text-muted-foreground">{label}</span>
    </motion.div>
  );
};

const ScanLine = ({ label, delay }: { label: string; delay: number }) => {
  const [scanning, setScanning] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setScanning(false), 2000 + delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <motion.div
      className="flex items-center gap-2 py-1"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.15 + 2 }}
    >
      <motion.div
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: scanning ? "hsl(45 100% 55%)" : "hsl(120 80% 50%)" }}
        animate={scanning ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 0.5, repeat: scanning ? Infinity : 0 }}
      />
      <span className="font-display text-[8px] tracking-wider text-muted-foreground flex-1">{label}</span>
      <span className="font-accent text-[9px]" style={{ color: scanning ? "hsl(45 100% 55%)" : "hsl(120 80% 50%)" }}>
        {scanning ? "SCANNING…" : "ONLINE"}
      </span>
    </motion.div>
  );
};

const WaveformGraph = ({ color, delay }: { color: string; delay: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = 200;
    canvas.height = 40;
    let offset = 0;
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, 200, 40);
      ctx.beginPath();
      ctx.moveTo(0, 20);
      for (let x = 0; x < 200; x++) {
        const y = 20 + Math.sin((x + offset) * 0.05) * 8 + Math.sin((x + offset) * 0.12) * 4 + Math.random() * 2;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `hsl(${color})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Glow
      ctx.beginPath();
      ctx.moveTo(0, 20);
      for (let x = 0; x < 200; x++) {
        const y = 20 + Math.sin((x + offset) * 0.05) * 8 + Math.sin((x + offset) * 0.12) * 4;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `hsla(${color.split(" ")[0]}, 100%, 50%, 0.15)`;
      ctx.lineWidth = 6;
      ctx.stroke();

      offset += 1.5;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [color]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="w-full h-10 rounded"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    />
  );
};

const DataHUD = () => {
  return (
    <GlassPanel delay={1.8} from="bottom" glowColor="270 100% 60%">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-neon-violet"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <h2 className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">NEURAL INTERFACE</h2>
          </div>
          <span className="font-display text-[8px] tracking-wider text-neon-violet">AI ACTIVE</span>
        </div>

        {/* Meters row */}
        <div className="flex justify-around mb-3">
          <CircularMeter value={94} label="CPU" color="180 100% 50%" delay={2} />
          <CircularMeter value={67} label="MEMORY" color="300 100% 50%" delay={2.1} />
          <CircularMeter value={82} label="NETWORK" color="270 100% 60%" delay={2.2} />
          <CircularMeter value={99} label="UPTIME" color="45 100% 55%" delay={2.3} />
        </div>

        {/* Waveform */}
        <div className="mb-3 p-2 rounded-lg bg-muted/10">
          <div className="flex items-center gap-1.5 mb-1">
            <Activity size={10} className="text-neon-cyan" />
            <span className="font-display text-[7px] tracking-[0.2em] text-muted-foreground">SIGNAL WAVEFORM</span>
          </div>
          <WaveformGraph color="180 100% 50%" delay={2.2} />
        </div>

        {/* Streaming stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { icon: Wifi, label: "BANDWIDTH", target: 847, suffix: " MB/s", color: "180 100% 50%" },
            { icon: Cpu, label: "THREADS", target: 256, color: "300 100% 50%" },
            { icon: Database, label: "RECORDS", target: 12847, color: "45 100% 55%" },
          ].map((s, i) => (
            <div key={s.label} className="text-center p-2 rounded-lg bg-muted/10">
              <s.icon size={12} className="mx-auto mb-1" style={{ color: `hsl(${s.color})` }} />
              <StreamingNumber target={s.target} suffix={s.suffix || ""} color={s.color} />
              <div className="font-display text-[6px] tracking-[0.2em] text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* System scan lines */}
        <div className="border-t border-border/20 pt-2">
          {["FIREWALL MODULE", "ENCRYPTION LAYER", "GPS SPOOFER", "COMM RELAY"].map((label, i) => (
            <ScanLine key={label} label={label} delay={i} />
          ))}
        </div>
      </div>
    </GlassPanel>
  );
};

export default DataHUD;
