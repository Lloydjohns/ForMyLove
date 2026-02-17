import { motion } from "framer-motion";

const reasons = [
  { emoji: "😊", text: "Your smile lights up my entire world" },
  { emoji: "💪", text: "You make me a better person every day" },
  { emoji: "🤗", text: "Your hugs feel like coming home" },
  { emoji: "😂", text: "You laugh at my worst jokes (and I love you for it)" },
  { emoji: "💖", text: "You love me in ways I never knew I needed" },
  { emoji: "🌟", text: "You're my favorite person in the whole universe" },
  { emoji: "🦋", text: "You still give me butterflies" },
  { emoji: "🏡", text: "With you, anywhere feels like home" },
];

const ReasonsSection = () => {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="grid gap-4">
        {reasons.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex items-center gap-4 bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-[var(--shadow-soft)] transition-shadow"
          >
            <span className="text-3xl flex-shrink-0">{reason.emoji}</span>
            <p className="font-body text-foreground text-base md:text-lg">
              {reason.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReasonsSection;
