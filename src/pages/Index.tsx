import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState, FormEvent } from "react";
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

function AnniversaryGate({ onUnlock }: { onUnlock: (token: string) => void }) {
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setChecking(true); setError("");
    try {
      const response = await fetch("/api/verify-anniversary", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ date }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Couldn't check that date.");
      onUnlock(data.token);
    } catch (e) { setError(e instanceof Error ? e.message : "Please try again."); }
    finally { setChecking(false); }
  };
  return <main className="min-h-screen flex items-center justify-center px-5 py-16" style={{ background: "var(--gradient-hero)" }}>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-[2rem] border border-primary/15 bg-card/90 p-8 text-center shadow-[var(--shadow-soft)] sm:p-10">
      <div className="mb-5 text-5xl">💌</div><p className="mb-3 text-xs uppercase tracking-[.25em] text-primary">A little private corner</p>
      <h1 className="mb-4 font-display text-3xl text-foreground">Before you come in…</h1>
      <p className="mb-8 font-body leading-relaxed text-muted-foreground">Some memories belong just to us. Enter our secret to open the door.</p>
      <form onSubmit={submit} className="space-y-4">
        <label htmlFor="anniversary" className="block text-left font-body text-sm font-semibold text-foreground">Our secret password</label>
        <input id="anniversary" required type="password" autoComplete="current-password" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Our anniversary (YYYY-MM-DD)" className="w-full rounded-xl border border-border bg-background px-4 py-3 font-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        {error && <p role="alert" className="text-sm text-primary">{error}</p>}
        <button disabled={checking} className="w-full rounded-full bg-primary px-6 py-3.5 font-body font-semibold text-primary-foreground shadow-[var(--shadow-soft)] disabled:opacity-60">{checking ? "Checking…" : "Unlock our story ♥"}</button>
      </form>
      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">A little secret only we know. Take your time. 💗</p>
    </motion.div>
  </main>;
}

function LoveNoteForm({ token }: { token: string }) {
  const [name, setName] = useState(""); const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); const [sending, setSending] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setSending(true); setStatus("");
    try {
      const response = await fetch("/api/send-message", { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${token}` }, body: JSON.stringify({ name, message }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Couldn't send your note.");
      setStatus("Your words are on their way to me. Thank you for leaving a little piece of your heart here. 💌"); setMessage("");
    } catch (e) { setStatus(e instanceof Error ? e.message : "Please try again in a moment."); }
    finally { setSending(false); }
  };
  return <section className="relative z-10 px-4 py-20" style={{ background: "var(--gradient-warm)" }}>
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-primary/15 bg-card p-7 shadow-[var(--shadow-soft)] sm:p-10">
      <div className="mb-8 text-center"><p className="mb-3 text-4xl">✍️</p><h2 className="mb-3 font-display text-3xl text-foreground">Leave a little note for me</h2><p className="mx-auto max-w-lg font-body leading-relaxed text-muted-foreground">Tell me what’s on your heart—something you remember, something you hope for, or just a few words you want me to keep. I’ll receive it in my email.</p></div>
      <form onSubmit={submit} className="space-y-4">
        <label className="block font-body text-sm font-semibold">Your name <span className="font-normal text-muted-foreground">(optional)</span><input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none focus:border-primary" placeholder="What should I call you?" /></label>
        <label className="block font-body text-sm font-semibold">Your message<textarea required minLength={5} maxLength={4000} rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="mt-2 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 font-normal leading-relaxed outline-none focus:border-primary" placeholder="Write as much or as little as you like…" /></label>
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center"><span className="text-xs text-muted-foreground">{message.length}/4000</span><button disabled={sending} className="rounded-full bg-primary px-7 py-3 font-body font-semibold text-primary-foreground disabled:opacity-60">{sending ? "Sending…" : "Send my note ♥"}</button></div>
        {status && <p role="status" className="rounded-xl bg-primary/10 p-4 text-sm leading-relaxed text-foreground">{status}</p>}
      </form>
    </div>
  </section>;
}

const Index = () => {
  const [token, setToken] = useState(() => sessionStorage.getItem("love-story-token") || "");
  const unlock = (value: string) => { sessionStorage.setItem("love-story-token", value); setToken(value); };
  if (!token) return <AnniversaryGate onUnlock={unlock} />;
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
            To the person who made ordinary days feel like ours
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-xl md:text-2xl text-muted-foreground italic mb-2"
          >
            My favorite place has always been beside you
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
              Walk through our story
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

      <LoveNoteForm token={token} />

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
