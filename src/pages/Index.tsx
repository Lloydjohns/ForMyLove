import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import LoveQuiz from "@/components/LoveQuiz";
import ReasonsSection from "@/components/ReasonsSection";
import LoveLetterReveal from "@/components/LoveLetterReveal";
import PhotoMemoryGallery from "@/components/PhotoMemoryGallery";
import LoveStats from "@/components/LoveStats";
import ThisOrThat from "@/components/ThisOrThat";
import MusicSection from "@/components/MusicSection";
import ConstellationMap from "@/components/ConstellationMap";
import TimeCapsule from "@/components/TimeCapsule";
import PromiseWall from "@/components/PromiseWall";
import LoveTimeline from "@/components/LoveTimeline";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingHearts />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20"
        style={{ background: "var(--gradient-hero)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-7xl md:text-8xl mb-6"
          >
            💕
          </motion.div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-4 leading-tight">
            Happy Valentine's Day
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-xl md:text-2xl text-muted-foreground italic mb-2"
          >
            To the most special person in my life
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="font-body text-muted-foreground text-base md:text-lg max-w-md mx-auto mt-4"
          >
            I made this just for you, because you deserve to know how amazing you are ✨
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-10"
          >
            <motion.a
              href="#memories"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-body font-semibold text-lg shadow-[var(--shadow-glow)] hover:shadow-[0_0_50px_hsl(345_80%_65%_/_0.4)] transition-shadow cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              Discover Why You're Special
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 text-muted-foreground"
        >
          <p className="font-body text-sm">scroll down ↓</p>
        </motion.div>
      </section>

      {/* Photo Memory Gallery */}
      <section id="memories" className="relative z-10 py-20 px-4 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-4xl mb-3">📸</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            Our Memories
          </h2>
          <p className="font-body text-muted-foreground">
            Moments I never want to forget 💭
          </p>
        </motion.div>
        <PhotoMemoryGallery />
      </section>

      {/* Love Stats */}
      <section className="relative z-10 py-20 px-4" style={{ background: "var(--gradient-warm)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-4xl mb-3">📊</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            Us in Numbers
          </h2>
          <p className="font-body text-muted-foreground">
            Because our love is off the charts 📈
          </p>
        </motion.div>
        <LoveStats />
      </section>

      {/* Reasons Section */}
      <section id="reasons" className="relative z-10 py-20 px-4 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-4xl mb-3">🌹</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            Reasons I Love You
          </h2>
          <p className="font-body text-muted-foreground">
            Just a few of the million reasons...
          </p>
        </motion.div>
        <ReasonsSection />
      </section>

      {/* This or That */}
      <section className="relative z-10 py-20 px-4" style={{ background: "var(--gradient-warm)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-4xl mb-3">🤔</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            This or That?
          </h2>
          <p className="font-body text-muted-foreground">
            Let's see what we vibe with 😏
          </p>
        </motion.div>
        <ThisOrThat />
      </section>

      {/* Quiz Section */}
      <section className="relative z-10 py-20 px-4 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-4xl mb-3">💝</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            How Well Do You Know Us?
          </h2>
          <p className="font-body text-muted-foreground">
            Let's play a little game, baby 😏
          </p>
        </motion.div>
        <LoveQuiz />
      </section>

      {/* Music Section */}
      <section className="relative z-10 py-20 px-4" style={{ background: "var(--gradient-warm)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-4xl mb-3">🎵</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            Our Soundtrack
          </h2>
          <p className="font-body text-muted-foreground">
            Songs that tell our story 🎧
          </p>
        </motion.div>
        <MusicSection />
      </section>

      {/* Love Timeline */}
      <section className="relative z-10 py-20 px-4 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-4xl mb-3">🗺️</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            Our Love Journey
          </h2>
          <p className="font-body text-muted-foreground">
            Every chapter of our story matters 📖
          </p>
        </motion.div>
        <LoveTimeline />
      </section>

      {/* Promise Wall */}
      <section className="relative z-10 py-20 px-4" style={{ background: "var(--gradient-warm)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-4xl mb-3">🤞</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            My Promises to You
          </h2>
          <p className="font-body text-muted-foreground">
            Tap each card to see what I promise 💫
          </p>
        </motion.div>
        <PromiseWall />
      </section>

      {/* Constellation Map */}
      <section className="relative z-10 py-20 px-4 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-4xl mb-3">🌌</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            Our Love Constellation
          </h2>
          <p className="font-body text-muted-foreground">
            Draw our stars together ⭐
          </p>
        </motion.div>
        <ConstellationMap />
      </section>

      {/* Time Capsule */}
      <section className="relative z-10 py-20 px-4" style={{ background: "var(--gradient-warm)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-4xl mb-3">⏳</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            Time Capsule
          </h2>
          <p className="font-body text-muted-foreground">
            A sealed message waiting for the right moment 🔒
          </p>
        </motion.div>
        <TimeCapsule />
      </section>

      {/* Love Letter Section */}
      <section className="relative z-10 py-20 px-4 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-4xl mb-3">✉️</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            A Little Something Extra
          </h2>
          <p className="font-body text-muted-foreground">
            Go ahead, open it...
          </p>
        </motion.div>
        <LoveLetterReveal />
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 bg-background text-center border-t border-border">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-5xl mb-4 animate-heartbeat inline-block">❤️</p>
          <p className="font-display text-xl text-foreground">
            Made with love, just for you
          </p>
          <p className="font-body text-sm text-muted-foreground mt-2">
            Happy Valentine's Day 2026 💕
          </p>
        </motion.div>
      </footer>
    </div>
  );
};

export default Index;
