import { motion } from "framer-motion";
import { Star } from "lucide-react";
import GlassPanel from "./GlassPanel";

const WantedLevel = () => {
  const level = 3;

  return (
    <GlassPanel delay={1.3} from="left" glowColor="300 100% 50%">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">WANTED LEVEL</h2>
          <motion.span
            className="font-accent text-[10px] text-neon-magenta"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ACTIVE
          </motion.span>
        </div>
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.div
              key={star}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.5 + star * 0.1, type: "spring", damping: 12 }}
            >
              <motion.div
                animate={star <= level ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, delay: star * 0.2 }}
              >
                <Star
                  size={22}
                  fill={star <= level ? "hsl(300, 100%, 50%)" : "transparent"}
                  stroke={star <= level ? "hsl(300, 100%, 50%)" : "hsl(240, 10%, 25%)"}
                  strokeWidth={1.5}
                  style={star <= level ? {
                    filter: "drop-shadow(0 0 6px hsl(300 100% 50% / 0.6)) drop-shadow(0 0 12px hsl(300 100% 50% / 0.3))",
                  } : {}}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
        {/* Siren pulse */}
        <motion.div
          className="mt-3 h-1 rounded-full overflow-hidden relative"
          style={{ backgroundColor: "hsl(240 10% 10%)" }}
        >
          <motion.div
            className="h-full rounded-full absolute inset-y-0 left-0"
            style={{
              background: "linear-gradient(90deg, hsl(300 100% 50%), hsl(0 80% 50%), hsl(300 100% 50%))",
              backgroundSize: "200% 100%",
              boxShadow: "0 0 10px hsl(300 100% 50% / 0.5)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "60%", backgroundPosition: ["0% 0%", "200% 0%"] }}
            transition={{
              width: { delay: 2, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
              backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
            }}
          />
        </motion.div>
        <div className="flex justify-between mt-1.5">
          <span className="font-display text-[7px] tracking-wider text-muted-foreground">HEAT DECAY</span>
          <motion.span
            className="font-display text-[7px] tracking-wider text-neon-magenta"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            02:47
          </motion.span>
        </div>
      </div>
    </GlassPanel>
  );
};

export default WantedLevel;
