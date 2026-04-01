import {
  Camera,
  ChevronRight,
  Leaf,
  Monitor,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onViewPresentation?: () => void;
}

const PARTICLES = [
  {
    id: "p1",
    top: "8%",
    left: "12%",
    color: "oklch(0.65 0.18 145)",
    delay: "0s",
    dur: "3.5s",
  },
  {
    id: "p2",
    top: "15%",
    left: "78%",
    color: "oklch(0.72 0.12 85)",
    delay: "0.6s",
    dur: "3.9s",
  },
  {
    id: "p3",
    top: "28%",
    left: "5%",
    color: "oklch(0.65 0.22 290)",
    delay: "1.2s",
    dur: "4.3s",
  },
  {
    id: "p4",
    top: "35%",
    left: "90%",
    color: "oklch(0.65 0.18 145)",
    delay: "0.3s",
    dur: "4.7s",
  },
  {
    id: "p5",
    top: "52%",
    left: "20%",
    color: "oklch(0.72 0.12 85)",
    delay: "1.8s",
    dur: "5.1s",
  },
  {
    id: "p6",
    top: "60%",
    left: "85%",
    color: "oklch(0.65 0.18 145)",
    delay: "0.9s",
    dur: "4.0s",
  },
  {
    id: "p7",
    top: "72%",
    left: "8%",
    color: "oklch(0.65 0.22 290)",
    delay: "2.4s",
    dur: "4.4s",
  },
  {
    id: "p8",
    top: "78%",
    left: "70%",
    color: "oklch(0.72 0.12 85)",
    delay: "1.5s",
    dur: "3.7s",
  },
  {
    id: "p9",
    top: "88%",
    left: "40%",
    color: "oklch(0.65 0.18 145)",
    delay: "3s",
    dur: "5.5s",
  },
  {
    id: "p10",
    top: "92%",
    left: "95%",
    color: "oklch(0.72 0.12 85)",
    delay: "2s",
    dur: "4.8s",
  },
];

const features = [
  {
    icon: Camera,
    title: "AI Plant Scanner",
    desc: "Identify any plant instantly with your camera",
    borderColor: "oklch(0.65 0.18 145 / 0.4)",
    iconColor: "oklch(0.65 0.18 145)",
    glowColor: "oklch(0.65 0.18 145 / 0.08)",
  },
  {
    icon: Trophy,
    title: "Earn Points & Rank",
    desc: "Compete on the global leaderboard",
    borderColor: "oklch(0.72 0.12 85 / 0.4)",
    iconColor: "oklch(0.72 0.12 85)",
    glowColor: "oklch(0.72 0.12 85 / 0.08)",
  },
  {
    icon: Star,
    title: "Anime Companions",
    desc: "Choose your favorite anime guide",
    borderColor: "oklch(0.65 0.22 290 / 0.4)",
    iconColor: "oklch(0.65 0.22 290)",
    glowColor: "oklch(0.65 0.22 290 / 0.08)",
  },
];

export default function WelcomeScreen({
  onGetStarted,
  onViewPresentation,
}: WelcomeScreenProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-bg.dim_1920x1080.png"
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
      </div>

      {/* Ambient blobs */}
      <div className="absolute top-20 right-10 w-56 h-56 rounded-full bg-gold/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-72 h-72 rounded-full bg-violet-neon/6 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full -translate-x-1/2 -translate-y-1/2 bg-forest-light/4 blur-3xl pointer-events-none" />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none animate-particle"
          style={
            {
              top: p.top,
              left: p.left,
              background: p.color,
              opacity: 0.35,
              "--duration": p.dur,
              animationDelay: p.delay,
            } as React.CSSProperties
          }
        />
      ))}

      <div
        className="relative z-10 flex flex-col flex-1 px-6 pt-14 pb-8 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
        }}
      >
        {/* Logo area */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-28 h-28 rounded-3xl glass-card border mb-6 animate-float"
            style={{
              borderColor: "oklch(0.72 0.12 85 / 0.4)",
              boxShadow:
                "0 0 40px oklch(0.72 0.12 85 / 0.25), 0 0 80px oklch(0.72 0.12 85 / 0.1)",
            }}
          >
            <img
              src="/assets/generated/natural-hunt-logo.dim_512x512.png"
              alt="Natural Hunt"
              className="w-20 h-20 object-contain"
            />
          </div>

          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border mb-4"
            style={{ borderColor: "oklch(0.72 0.12 85 / 0.25)" }}
          >
            <Sparkles size={11} style={{ color: "oklch(0.72 0.12 85)" }} />
            <span
              className="text-[10px] font-nunito font-bold tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.12 85)" }}
            >
              Welcome to
            </span>
          </div>

          <h1 className="text-5xl font-bold font-playfair leading-tight mb-3 text-gradient-gold">
            Natural Hunt
          </h1>
          <p className="text-cream/50 font-nunito text-base leading-relaxed max-w-xs mx-auto">
            Discover, identify, and learn about plants with your anime companion
            by your side
          </p>
        </div>

        {/* Feature chips */}
        <div className="flex gap-2 justify-center flex-wrap mb-10">
          {features.map(
            ({ icon: Icon, title, borderColor, iconColor, glowColor }) => (
              <div
                key={title}
                className="flex items-center gap-2 px-3 py-2 rounded-full glass-card"
                style={{ borderColor, background: glowColor }}
              >
                <Icon size={14} style={{ color: iconColor }} />
                <span className="text-cream/80 text-xs font-nunito font-semibold whitespace-nowrap">
                  {title}
                </span>
              </div>
            ),
          )}
        </div>

        {/* Detailed feature list */}
        <div className="space-y-3 mb-10">
          {features.map(
            (
              { icon: Icon, title, desc, borderColor, iconColor, glowColor },
              i,
            ) => (
              <div
                key={title}
                className="glass-card rounded-2xl p-4 flex items-center gap-4 transition-all duration-500"
                style={{
                  borderColor,
                  transitionDelay: `${i * 100 + 200}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateX(-20px)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: glowColor,
                    borderColor,
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  <Icon size={22} style={{ color: iconColor }} />
                </div>
                <div>
                  <p className="text-cream font-bold font-nunito">{title}</p>
                  <p className="text-cream/40 text-sm font-nunito">{desc}</p>
                </div>
              </div>
            ),
          )}
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <button
            type="button"
            onClick={onGetStarted}
            data-ocid="welcome.primary_button"
            className="w-full py-4 rounded-2xl btn-premium flex items-center justify-center gap-3 font-bold font-nunito text-lg"
          >
            <Leaf size={20} />
            <span>Start Exploring</span>
            <ChevronRight size={20} />
          </button>

          {onViewPresentation && (
            <button
              type="button"
              onClick={onViewPresentation}
              data-ocid="welcome.secondary_button"
              className="w-full py-3 mt-3 rounded-2xl flex items-center justify-center gap-2 font-semibold font-nunito text-sm transition-all hover:bg-white/5"
              style={{
                border: "1px solid oklch(0.72 0.12 85 / 0.25)",
                color: "oklch(0.72 0.12 85 / 0.7)",
              }}
            >
              <Monitor size={16} />
              <span>View Presentation</span>
            </button>
          )}

          <p className="text-center text-cream/20 text-xs font-nunito mt-5">
            © {new Date().getFullYear()} · Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "natural-hunt")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold/60 transition-colors"
              style={{ color: "oklch(0.72 0.12 85 / 0.4)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
