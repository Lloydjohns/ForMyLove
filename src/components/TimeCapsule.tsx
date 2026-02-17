import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Lock, Unlock } from "lucide-react";

const UNLOCK_DATE = new Date("2025-02-14T00:00:00");

const TimeCapsule = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = UNLOCK_DATE.getTime() - now;

      if (distance <= 0) {
        setIsUnlocked(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-card border border-border rounded-xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-sm">
        <motion.span
          key={value}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-display text-2xl md:text-3xl text-foreground"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </div>
      <span className="font-body text-xs text-muted-foreground mt-2">{label}</span>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto px-4">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="capsule"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-card border-2 border-primary/20 rounded-3xl p-8 text-center shadow-[var(--shadow-soft)]"
          >
            <motion.div
              animate={{ rotate: isUnlocked ? [0, -10, 10, 0] : 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              {isUnlocked ? (
                <Unlock className="w-12 h-12 mx-auto text-primary" />
              ) : (
                <Lock className="w-12 h-12 mx-auto text-muted-foreground" />
              )}
            </motion.div>

            <h3 className="font-display text-2xl text-foreground mb-2">
              {isUnlocked ? "The capsule is ready!" : "Time Capsule"}
            </h3>
            <p className="font-body text-muted-foreground mb-8">
              {isUnlocked
                ? "Tap to reveal what's inside 💝"
                : "A special message awaits..."}
            </p>

            {!isUnlocked ? (
              <div className="flex justify-center gap-3">
                <TimeUnit value={timeLeft.days} label="Days" />
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <TimeUnit value={timeLeft.minutes} label="Mins" />
                <TimeUnit value={timeLeft.seconds} label="Secs" />
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRevealed(true)}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-body font-semibold text-lg shadow-[var(--shadow-glow)]"
              >
                Open Time Capsule 🔓
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-card border-2 border-primary/20 rounded-3xl p-8 text-center shadow-[var(--shadow-glow)]"
          >
            <p className="text-4xl mb-4">💌</p>
            <h3 className="font-display text-2xl text-foreground mb-4 italic">
              From the Past, With Love
            </h3>
            <div className="font-body text-muted-foreground leading-relaxed space-y-3">
              <p>
                If you're reading this, it means we made it to another special day together.
              </p>
              <p>
                I wrote this to remind future-us how lucky we are. Every moment with you is a gift I'll never take for granted.
              </p>
              <p className="text-foreground font-semibold pt-2">
                Here's to a million more memories together. I love you endlessly. 💕
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRevealed(false)}
              className="mt-6 bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-body text-sm"
            >
              Close Capsule
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimeCapsule;
