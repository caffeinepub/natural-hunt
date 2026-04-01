import type React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-bg.dim_1920x1080.png"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      </div>

      {/* Ambient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gold/8 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-violet-neon/8 blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-forest-light/6 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8">
        {/* Logo */}
        <div className="text-center mb-8 animate-slide-down">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass-card border mb-4 animate-float"
            style={{
              borderColor: "oklch(0.72 0.12 85 / 0.35)",
              boxShadow: "0 0 30px oklch(0.72 0.12 85 / 0.2)",
            }}
          >
            <img
              src="/assets/generated/natural-hunt-logo.dim_512x512.png"
              alt="Natural Hunt"
              className="w-14 h-14 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold font-playfair text-gradient-gold">
            Natural Hunt
          </h1>
          <p className="text-cream/40 text-sm font-nunito mt-1">
            Discover the world&apos;s flora
          </p>
        </div>

        {/* Card */}
        <div className="glass-card-strong rounded-3xl p-6 shadow-glass animate-scale-in">
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-cream/20 text-xs font-nunito mt-6">
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
  );
}
