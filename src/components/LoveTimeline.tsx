import { motion } from "framer-motion";

const milestones = [
  { date: "Day 1", emoji: "👋", title: "We Met", description: "At the Sto Domingo Church - the day everything changed forever" },
  { date: "Week 2", emoji: "💬", title: "First Real Talk", description: "We stayed up all night talking about everything we felt for each other" },
  { date: "Month 1", emoji: "💕", title: "First Date", description: "Butterflies, nervous laughter, and the best time ever - River Esplanade <3" },
  { date: "Month 3", emoji: "💑", title: "Made It Official", description: "No Courtship just word of affirmation and label - we both commit and said yes, and I've been smiling ever since - SM North-Sky Garden" },
  { date: "Month 4", emoji: "🌍", title: "First Trip Together", description: "Adventures are better with you by my side - SM MOA-Sea Side - " },
  { date: "Month 5", emoji: "🎂", title: "Christmas Day!", description: "We go to you're dorm with sincere moment and walk aside UST and both Jollibee - I'm happy you bought my fave Food 😋" },
  { date: "Now", emoji: "❤️‍🔥", title: "Still Falling", description: "Every day I love you more than the last" },
];

const LoveTimeline = () => {
  return (
    <div className="max-w-lg mx-auto px-4 relative">
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

      <div className="space-y-12">
        {milestones.map((milestone, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`relative flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}
            >
              {/* Content card */}
              <div className={`w-[calc(50%-24px)] ${isLeft ? "text-right pr-2" : "text-left pl-2"}`}>
                <div className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-[var(--shadow-soft)] transition-shadow">
                  <span className="font-body text-xs text-primary font-semibold uppercase tracking-wider">
                    {milestone.date}
                  </span>
                  <h4 className="font-display text-lg text-foreground mt-1">
                    {milestone.title}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* Center dot */}
              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="w-10 h-10 bg-card border-2 border-primary rounded-full flex items-center justify-center shadow-sm"
                >
                  <span className="text-lg">{milestone.emoji}</span>
                </motion.div>
              </div>

              {/* Spacer for the other side */}
              <div className="w-[calc(50%-24px)]" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LoveTimeline;
