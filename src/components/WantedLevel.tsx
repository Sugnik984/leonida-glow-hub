import { motion } from "framer-motion";
import { Star } from "lucide-react";

const WantedLevel = () => {
  const level = 3;

  return (
    <motion.div
      className="glass-holographic rounded-xl p-4 holo-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">WANTED LEVEL</h2>
        <span className="font-accent text-[10px] text-neon-magenta">ACTIVE</span>
      </div>
      <div className="flex gap-2 justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.div
            key={star}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.5 + star * 0.1, type: "spring", damping: 12 }}
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
        ))}
      </div>
      {/* Progress bar */}
      <div className="mt-3 h-1 rounded-full bg-muted/30 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, hsl(300 100% 50%), hsl(330 100% 60%))",
            boxShadow: "0 0 10px hsl(300 100% 50% / 0.5)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: "60%" }}
          transition={{ delay: 2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="font-display text-[7px] tracking-wider text-muted-foreground">HEAT DECAY</span>
        <span className="font-display text-[7px] tracking-wider text-neon-magenta">02:47</span>
      </div>
    </motion.div>
  );
};

export default WantedLevel;
