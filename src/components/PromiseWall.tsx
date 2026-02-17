import { motion } from "framer-motion";
import { useState } from "react";

const promises = [
  { front: "💪", back: "I promise to always be your strength when you feel weak" },
  { front: "🌙", back: "I promise to never let you fall asleep feeling unloved" },
  { front: "😂", back: "I promise to make you laugh even on your worst days" },
  { front: "🏠", back: "I promise to build a home wherever we are, together" },
  { front: "🫂", back: "I promise to always hold you when the world feels heavy" },
  { front: "🌹", back: "I promise to never stop choosing you, every single day" },
  { front: "✈️", back: "I promise to go on adventures with you, big and small" },
  { front: "🍳", back: "I promise to cook your favorite meal (or at least try)" },
  { front: "💎", back: "I promise to treasure every moment we share" },
];

const PromiseCard = ({
  front,
  back,
  index,
}: {
  front: string;
  back: string;
  index: number;
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer perspective-1000"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full aspect-square"
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-card border border-border rounded-2xl flex flex-col items-center justify-center shadow-sm hover:shadow-[var(--shadow-soft)] transition-shadow"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-4xl mb-2">{front}</span>
          <p className="font-body text-xs text-muted-foreground">Tap to reveal</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-primary/10 border-2 border-primary/30 rounded-2xl flex items-center justify-center p-4"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="font-body text-sm text-foreground text-center leading-relaxed">
            {back}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PromiseWall = () => {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="grid grid-cols-3 gap-4">
        {promises.map((promise, i) => (
          <PromiseCard key={i} front={promise.front} back={promise.back} index={i} />
        ))}
      </div>
    </div>
  );
};

export default PromiseWall;
