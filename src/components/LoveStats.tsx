import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { label: "Days Together", value: 365, emoji: "📅", suffix: "+" },
  { label: "Hug Given", value: 99, emoji: "🫂", suffix: "+" },
  { label: "Times I Smiled Because of You", value: 9999, emoji: "😊", suffix: "+" },
  { label: "Love Level", value: 93, emoji: "💯", suffix: "%" },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, value]);

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      className="font-display text-3xl md:text-4xl text-foreground"
    >
      {display.toLocaleString()}{suffix}
    </motion.span>
  );
};

const LoveStats = () => {
  return (
    <div className="max-w-3xl mx-auto grid grid-cols-2 gap-6 px-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm hover:shadow-[var(--shadow-soft)] transition-shadow"
        >
          <p className="text-3xl mb-2">{stat.emoji}</p>
          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          <p className="font-body text-sm text-muted-foreground mt-2">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default LoveStats;
