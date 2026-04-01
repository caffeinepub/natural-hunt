import {
  Brain,
  Camera,
  ChevronLeft,
  ChevronRight,
  Globe,
  Leaf,
  Mic,
  Pause,
  Play,
  Shield,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface PresentationScreenProps {
  onClose: () => void;
}

const slides = [
  { id: 1, accent: "#22c55e", accentOklch: "oklch(0.65 0.20 145)" },
  { id: 2, accent: "#f59e0b", accentOklch: "oklch(0.72 0.15 85)" },
  { id: 3, accent: "#10b981", accentOklch: "oklch(0.68 0.18 162)" },
  { id: 4, accent: "#8b5cf6", accentOklch: "oklch(0.60 0.22 290)" },
  { id: 5, accent: "#ec4899", accentOklch: "oklch(0.62 0.22 330)" },
  { id: 6, accent: "#06b6d4", accentOklch: "oklch(0.68 0.16 210)" },
  { id: 7, accent: "#f59e0b", accentOklch: "oklch(0.72 0.15 85)" },
  { id: 8, accent: "#22c55e", accentOklch: "oklch(0.65 0.20 145)" },
  { id: 9, accent: "#6366f1", accentOklch: "oklch(0.58 0.22 276)" },
  { id: 10, accent: "#22c55e", accentOklch: "oklch(0.65 0.20 145)" },
];

const CHARACTERS = [
  { name: "Naruto", specialty: "Determination & Growth", emoji: "🍃" },
  { name: "Sasuke", specialty: "Analytical Precision", emoji: "⚡" },
  { name: "Sakura", specialty: "Medicinal Knowledge", emoji: "🌸" },
  { name: "Goku", specialty: "Explorer Spirit", emoji: "💥" },
  { name: "Sailor Moon", specialty: "Nature Harmony", emoji: "🌙" },
  { name: "Luffy", specialty: "Adventure Guide", emoji: "🌊" },
  { name: "Pikachu", specialty: "Quick Scan Power", emoji: "⚡" },
  { name: "Totoro", specialty: "Forest Wisdom", emoji: "🌿" },
];

function Slide1({ accent }: { accent: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
        className="w-28 h-28 rounded-3xl mb-8 flex items-center justify-center"
        style={{
          background: `${accent}18`,
          border: `2px solid ${accent}50`,
          boxShadow: `0 0 60px ${accent}40, 0 0 120px ${accent}20`,
        }}
      >
        <Leaf size={56} style={{ color: accent }} />
      </motion.div>
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-6xl font-bold mb-4"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: accent,
          textShadow: `0 0 40px ${accent}60`,
        }}
      >
        Natural Hunt
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-xl text-white/60 max-w-md"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        Where Nature Meets Anime Intelligence
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex gap-3 mt-8"
      >
        {["🌿", "🤖", "✨", "🎮", "🌸"].map((emoji, i) => (
          <span
            key={emoji}
            className="text-3xl"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {emoji}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Slide2({ accent }: { accent: string }) {
  const stats = [
    { value: "300,000+", label: "Plant species on Earth", icon: "🌍" },
    { value: "Most", label: "Unidentified by the public", icon: "❓" },
    { value: "Hidden", label: "Medicinal value unexplored", icon: "💊" },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            color: accent,
            background: `${accent}18`,
            border: `1px solid ${accent}40`,
          }}
        >
          The Problem
        </span>
        <h2
          className="text-4xl font-bold text-white mt-4 mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          We Walk Past Thousands of Plants
        </h2>
        <p className="text-white/50 text-lg">Knowing nothing about them.</p>
      </motion.div>
      <div className="grid grid-cols-3 gap-4 w-full">
        {stats.map(({ value, label, icon }, i) => (
          <motion.div
            key={label}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className="rounded-2xl p-5 text-center"
            style={{
              background: `${accent}10`,
              border: `1px solid ${accent}35`,
            }}
          >
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-xl font-bold" style={{ color: accent }}>
              {value}
            </div>
            <div className="text-white/50 text-xs mt-1">{label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Slide3({ accent }: { accent: string }) {
  const steps = [
    {
      step: "01",
      title: "Point Camera",
      desc: "Aim at any plant with one touch",
    },
    {
      step: "02",
      title: "AI Identifies",
      desc: "Instant AI-powered recognition",
    },
    {
      step: "03",
      title: "Learn Everything",
      desc: "Benefits, risks, medical uses",
    },
    { step: "04", title: "Earn Points", desc: "Grow your botanical rank" },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            color: accent,
            background: `${accent}18`,
            border: `1px solid ${accent}40`,
          }}
        >
          Our Solution
        </span>
        <h2
          className="text-4xl font-bold text-white mt-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          AI-Powered Plant Intelligence
        </h2>
      </motion.div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {steps.map(({ step, title, desc }, i) => (
          <motion.div
            // biome-ignore lint/suspicious/noArrayIndexKey: static slide arrays
            key={i}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="rounded-2xl p-5"
            style={{
              background: `${accent}10`,
              border: `1px solid ${accent}35`,
            }}
          >
            <div
              className="text-3xl font-bold mb-2 opacity-30"
              style={{ color: accent }}
            >
              {step}
            </div>
            <div className="text-white font-bold mb-1">{title}</div>
            <div className="text-white/50 text-sm">{desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Slide4({ accent }: { accent: string }) {
  const features = [
    {
      icon: Camera,
      title: "AI Plant Scanner",
      desc: "One-touch real-time identification with instant results",
      color: "#22c55e",
    },
    {
      icon: Brain,
      title: "Anime Companions",
      desc: "8 authentic characters with unique voices & personalities",
      color: "#8b5cf6",
    },
    {
      icon: Trophy,
      title: "Gamification",
      desc: "Points, leaderboard, ranks and daily challenges",
      color: "#f59e0b",
    },
    {
      icon: Leaf,
      title: "Scan History",
      desc: "Revisit and explore all your past plant discoveries",
      color: "#06b6d4",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            color: accent,
            background: `${accent}18`,
            border: `1px solid ${accent}40`,
          }}
        >
          Key Features
        </span>
        <h2
          className="text-4xl font-bold text-white mt-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Everything You Need
        </h2>
      </motion.div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {features.map(({ icon: Icon, title, desc, color }, i) => (
          <motion.div
            // biome-ignore lint/suspicious/noArrayIndexKey: static slide arrays
            key={i}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="rounded-2xl p-5"
            style={{ background: `${color}10`, border: `1px solid ${color}40` }}
          >
            <Icon size={28} className="mb-3" style={{ color }} />
            <div className="text-white font-bold mb-1">{title}</div>
            <div className="text-white/50 text-sm">{desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Slide5({ accent }: { accent: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-6"
      >
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            color: accent,
            background: `${accent}18`,
            border: `1px solid ${accent}40`,
          }}
        >
          Anime Characters
        </span>
        <h2
          className="text-4xl font-bold text-white mt-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your Personal Guides
        </h2>
      </motion.div>
      <div className="grid grid-cols-4 gap-3 w-full">
        {CHARACTERS.map(({ name, specialty, emoji }, i) => (
          <motion.div
            // biome-ignore lint/suspicious/noArrayIndexKey: static slide arrays
            key={i}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="rounded-2xl p-4 text-center"
            style={{
              background: `${accent}10`,
              border: `1px solid ${accent}30`,
            }}
          >
            <div className="text-3xl mb-2">{emoji}</div>
            <div className="text-white font-bold text-sm">{name}</div>
            <div className="text-white/40 text-xs mt-1">{specialty}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Slide6({ accent }: { accent: string }) {
  const info = [
    {
      label: "Advantages",
      icon: "✅",
      desc: "Health benefits & nutritional value",
    },
    {
      label: "Disadvantages",
      icon: "⚠️",
      desc: "Risks, toxicity & side effects",
    },
    {
      label: "Medical Uses",
      icon: "💊",
      desc: "Traditional & modern medicine",
    },
    { label: "Scientific Name", icon: "🔬", desc: "Binomial nomenclature" },
    { label: "Habitat", icon: "🌍", desc: "Where the plant thrives" },
    { label: "Rarity Score", icon: "⭐", desc: "Points based on rarity" },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-6"
      >
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            color: accent,
            background: `${accent}18`,
            border: `1px solid ${accent}40`,
          }}
        >
          Plant Intelligence
        </span>
        <h2
          className="text-4xl font-bold text-white mt-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Deep Plant Knowledge
        </h2>
      </motion.div>
      <div className="grid grid-cols-3 gap-3 w-full">
        {info.map(({ label, icon, desc }, i) => (
          <motion.div
            // biome-ignore lint/suspicious/noArrayIndexKey: static slide arrays
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="rounded-xl p-4"
            style={{
              background: `${accent}10`,
              border: `1px solid ${accent}35`,
            }}
          >
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-white font-bold text-sm">{label}</div>
            <div className="text-white/40 text-xs mt-1">{desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Slide7({ accent }: { accent: string }) {
  const ranks = [
    { rank: "🌱 Seedling", pts: "0–100 pts", color: "#22c55e" },
    { rank: "🧭 Explorer", pts: "101–500 pts", color: "#06b6d4" },
    { rank: "🌿 Botanist", pts: "501–2000 pts", color: "#8b5cf6" },
    { rank: "👑 Master", pts: "2001+ pts", color: "#f59e0b" },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-6"
      >
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            color: accent,
            background: `${accent}18`,
            border: `1px solid ${accent}40`,
          }}
        >
          Gamification
        </span>
        <h2
          className="text-4xl font-bold text-white mt-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Compete & Rise
        </h2>
      </motion.div>
      <div className="grid grid-cols-2 gap-4 w-full mb-4">
        {ranks.map(({ rank, pts, color }, i) => (
          <motion.div
            // biome-ignore lint/suspicious/noArrayIndexKey: static slide arrays
            key={i}
            initial={{ x: i % 2 === 0 ? -30 : 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="rounded-2xl p-5 flex items-center gap-3"
            style={{ background: `${color}12`, border: `1px solid ${color}45` }}
          >
            <div className="text-2xl">{rank.split(" ")[0]}</div>
            <div>
              <div className="text-white font-bold">
                {rank.split(" ").slice(1).join(" ")}
              </div>
              <div className="text-sm" style={{ color }}>
                {pts}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="rounded-2xl p-4 text-center w-full"
        style={{ background: `${accent}10`, border: `1px solid ${accent}35` }}
      >
        <Zap size={20} className="inline mr-2" style={{ color: accent }} />
        <span className="text-white/70">
          Daily challenges unlock bonus points & exclusive character skins
        </span>
      </motion.div>
    </div>
  );
}

function Slide8({ accent }: { accent: string }) {
  const cameraFeatures = [
    { icon: "📱", title: "One-Touch Scan", desc: "Instant camera activation" },
    {
      icon: "🔍",
      title: "Real-Time Detection",
      desc: "Live plant identification",
    },
    { icon: "🖼️", title: "Photo Upload", desc: "Works with existing photos" },
    {
      icon: "🎙️",
      title: "Hindi Voice Output",
      desc: "Multilingual AI responses",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-6"
      >
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            color: accent,
            background: `${accent}18`,
            border: `1px solid ${accent}40`,
          }}
        >
          Camera Experience
        </span>
        <h2
          className="text-4xl font-bold text-white mt-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Scan in Seconds
        </h2>
      </motion.div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {cameraFeatures.map(({ icon, title, desc }, i) => (
          <motion.div
            // biome-ignore lint/suspicious/noArrayIndexKey: static slide arrays
            key={i}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="rounded-2xl p-5"
            style={{
              background: `${accent}10`,
              border: `1px solid ${accent}35`,
            }}
          >
            <div className="text-3xl mb-3">{icon}</div>
            <div className="text-white font-bold mb-1">{title}</div>
            <div className="text-white/50 text-sm">{desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Slide9({ accent }: { accent: string }) {
  const tech = [
    {
      icon: Shield,
      label: "Internet Computer",
      desc: "Blockchain-grade security & hosting",
      color: "#6366f1",
    },
    {
      icon: Globe,
      label: "React + TypeScript",
      desc: "Modern responsive frontend",
      color: "#06b6d4",
    },
    {
      icon: Brain,
      label: "AI Plant Recognition",
      desc: "Google & ChatGPT models",
      color: "#22c55e",
    },
    {
      icon: Mic,
      label: "Web Speech API",
      desc: "Hindi & multilingual voice",
      color: "#ec4899",
    },
    {
      icon: Zap,
      label: "Motoko Backend",
      desc: "IC native smart contracts",
      color: "#f59e0b",
    },
    {
      icon: Camera,
      label: "Camera API",
      desc: "One-touch scan with fallback",
      color: "#8b5cf6",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-6"
      >
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            color: accent,
            background: `${accent}18`,
            border: `1px solid ${accent}40`,
          }}
        >
          Tech Stack
        </span>
        <h2
          className="text-4xl font-bold text-white mt-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Built for the Future
        </h2>
      </motion.div>
      <div className="grid grid-cols-3 gap-3 w-full">
        {tech.map(({ icon: Icon, label, desc, color }, i) => (
          <motion.div
            // biome-ignore lint/suspicious/noArrayIndexKey: static slide arrays
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="rounded-xl p-4"
            style={{ background: `${color}10`, border: `1px solid ${color}35` }}
          >
            <Icon size={22} className="mb-2" style={{ color }} />
            <div className="text-white font-bold text-sm">{label}</div>
            <div className="text-white/40 text-xs mt-1">{desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Slide10({ accent, onClose }: { accent: string; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
        style={{
          background: `${accent}18`,
          border: `2px solid ${accent}50`,
          boxShadow: `0 0 60px ${accent}40`,
        }}
      >
        <Leaf size={44} style={{ color: accent }} />
      </motion.div>
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-5xl font-bold mb-3"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: accent,
          textShadow: `0 0 40px ${accent}60`,
        }}
      >
        Join Natural Hunt
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="text-2xl text-white/50 mb-8"
      >
        Scan. Learn. Grow.
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-3 items-center mb-10"
      >
        {["🌿", "🌸", "🍃", "🌺", "🌱"].map((e) => (
          <span key={e} className="text-2xl">
            {e}
          </span>
        ))}
      </motion.div>
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.65 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        type="button"
        onClick={onClose}
        data-ocid="presentation.primary_button"
        className="px-10 py-4 rounded-2xl font-bold text-lg text-black"
        style={{
          background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
          boxShadow: `0 0 40px ${accent}50`,
        }}
      >
        🌿 Get Started Now
      </motion.button>
    </div>
  );
}

const SLIDE_COMPONENTS = [
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
  Slide7,
  Slide8,
  Slide9,
];

export default function PresentationScreen({
  onClose,
}: PresentationScreenProps) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hovered = useRef(false);

  const total = slides.length;

  const goTo = useCallback((index: number, dir: 1 | -1 = 1) => {
    setDirection(dir);
    setCurrent(index);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    if (current < total - 1) goTo(current + 1, 1);
  }, [current, total, goTo]);

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1, -1);
  }, [current, goTo]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      setProgress(0);
      return;
    }
    setProgress(0);
    let elapsed = 0;
    const TOTAL_MS = 5000;
    progressRef.current = setInterval(() => {
      if (!hovered.current) {
        elapsed += 100;
        setProgress(Math.min((elapsed / TOTAL_MS) * 100, 100));
      }
    }, 100);
    timerRef.current = setInterval(() => {
      if (!hovered.current) {
        elapsed = 0;
        setProgress(0);
        setCurrent((c) => {
          if (c < total - 1) return c + 1;
          return c;
        });
      }
    }, TOTAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [autoPlay, total]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, onClose]);

  // Touch swipe
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const slide = slides[current];
  const CurrentSlideComponent =
    current < SLIDE_COMPONENTS.length ? SLIDE_COMPONENTS[current] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "#0a0a0f" }}
      onMouseEnter={() => {
        hovered.current = true;
      }}
      onMouseLeave={() => {
        hovered.current = false;
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient gradient per slide */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${slide.accent}18 0%, transparent 70%)`,
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 py-3 border-b border-white/8">
        <div className="flex items-center gap-2">
          <Leaf size={16} style={{ color: slide.accent }} />
          <span
            className="text-white/70 text-sm font-semibold"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Natural Hunt Presentation
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAutoPlay((v) => !v)}
            data-ocid="presentation.toggle"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{
              background: autoPlay
                ? `${slide.accent}25`
                : "rgba(255,255,255,0.06)",
              border: `1px solid ${autoPlay ? `${slide.accent}60` : "rgba(255,255,255,0.12)"}`,
              color: autoPlay ? slide.accent : "rgba(255,255,255,0.5)",
            }}
          >
            {autoPlay ? <Pause size={12} /> : <Play size={12} />}
            <span>{autoPlay ? "Pause" : "Auto"}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            data-ocid="presentation.close_button"
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Auto-play progress bar */}
      {autoPlay && (
        <div
          className="h-0.5 w-full"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="h-full transition-all duration-100"
            style={{ width: `${progress}%`, background: slide.accent }}
          />
        </div>
      )}

      {/* Slide content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: direction * -60, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {CurrentSlideComponent ? (
              <CurrentSlideComponent accent={slide.accent} />
            ) : (
              <Slide10 accent={slide.accent} onClose={onClose} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4 border-t border-white/8">
        <button
          type="button"
          onClick={prev}
          disabled={current === 0}
          data-ocid="presentation.pagination_prev"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-25"
          style={{
            background:
              current > 0 ? `${slide.accent}20` : "rgba(255,255,255,0.04)",
            border: `1px solid ${current > 0 ? `${slide.accent}40` : "rgba(255,255,255,0.10)"}`,
            color: current > 0 ? slide.accent : "rgba(255,255,255,0.3)",
          }}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i, i > current ? 1 : -1)}
              data-ocid={"presentation.tab"}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? "20px" : "6px",
                height: "6px",
                background: i === current ? s.accent : "rgba(255,255,255,0.2)",
                boxShadow: i === current ? `0 0 10px ${s.accent}80` : "none",
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span
            className="text-white/30 text-xs"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {current + 1} / {total}
          </span>
          <button
            type="button"
            onClick={next}
            disabled={current === total - 1}
            data-ocid="presentation.pagination_next"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-25"
            style={{
              background:
                current < total - 1
                  ? `${slide.accent}20`
                  : "rgba(255,255,255,0.04)",
              border: `1px solid ${current < total - 1 ? `${slide.accent}40` : "rgba(255,255,255,0.10)"}`,
              color:
                current < total - 1 ? slide.accent : "rgba(255,255,255,0.3)",
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
