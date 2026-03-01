import { useState, useEffect } from 'react';
import { Leaf, Zap, Trophy, Camera, ChevronRight, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [permissionState, setPermissionState] = useState<'idle' | 'requesting' | 'granted' | 'denied' | 'unsupported'>('idle');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const requestCameraPermission = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setPermissionState('unsupported');
      return;
    }

    setPermissionState('requesting');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setPermissionState('granted');
      setTimeout(onStart, 400);
    } catch {
      setPermissionState('denied');
    }
  };

  const features = [
    {
      icon: Camera,
      title: 'Instant Scan',
      desc: 'Point & identify any plant in seconds',
    },
    {
      icon: Sparkles,
      title: 'AI Powered',
      desc: 'Advanced recognition technology',
    },
    {
      icon: Trophy,
      title: 'Earn Points',
      desc: 'Build your botanical collection',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Full-bleed botanical background */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/botanical-bg.dim_1200x900.png"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Layered gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, oklch(0.18 0.08 155 / 0.55) 0%, oklch(0.12 0.06 150 / 0.75) 50%, oklch(0.10 0.05 148 / 0.95) 100%)',
          }}
        />
        {/* Radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, oklch(0.08 0.04 150 / 0.6) 100%)',
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-16 right-8 opacity-20 animate-float" style={{ animationDelay: '0s' }}>
        <Leaf size={48} style={{ color: 'oklch(0.72 0.14 75)' }} />
      </div>
      <div className="absolute top-32 left-6 opacity-15 animate-float" style={{ animationDelay: '1.5s' }}>
        <Leaf size={32} style={{ color: 'oklch(0.62 0.12 148)' }} />
      </div>
      <div className="absolute bottom-48 right-6 opacity-15 animate-float" style={{ animationDelay: '0.8s' }}>
        <Sparkles size={28} style={{ color: 'oklch(0.72 0.14 75)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 pt-16 pb-10">
        {/* Logo & Brand */}
        <div
          className={`flex flex-col items-center text-center mb-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Logo */}
          <div className="relative mb-6">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center animate-glow-pulse"
              style={{
                background: 'linear-gradient(135deg, oklch(0.28 0.12 150), oklch(0.38 0.10 148))',
                border: '2px solid oklch(0.72 0.14 75 / 0.5)',
              }}
            >
              <img
                src="/assets/generated/natural-hunt-logo.dim_512x512.png"
                alt="Natural Hunt"
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <Leaf
                size={40}
                className="absolute"
                style={{ color: 'oklch(0.72 0.14 75)', display: 'none' }}
              />
            </div>
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-3xl -z-10"
              style={{
                background: 'oklch(0.72 0.14 75 / 0.2)',
                filter: 'blur(16px)',
                transform: 'scale(1.3)',
              }}
            />
          </div>

          {/* Headline */}
          <div
            className={`transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <p
              className="text-xs font-bold tracking-[0.3em] uppercase mb-2"
              style={{ color: 'oklch(0.72 0.14 75)', fontFamily: 'Nunito, sans-serif' }}
            >
              Botanical Explorer
            </p>
            <h1
              className="text-6xl font-black leading-none mb-1"
              style={{
                fontFamily: 'Playfair Display, serif',
                color: 'oklch(0.97 0.015 90)',
                textShadow: '0 2px 20px oklch(0.12 0.04 150 / 0.5)',
              }}
            >
              Natural
            </h1>
            <h1
              className="text-6xl font-black leading-none mb-4"
              style={{
                fontFamily: 'Playfair Display, serif',
                background: 'linear-gradient(135deg, oklch(0.72 0.14 75), oklch(0.82 0.12 80))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Hunt
            </h1>
            <p
              className="text-base leading-relaxed max-w-xs mx-auto"
              style={{ color: 'oklch(0.80 0.04 140)', fontFamily: 'Nunito, sans-serif' }}
            >
              Discover the hidden world of plants around you. Scan, identify, and build your botanical legacy.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="my-8 space-y-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`glass flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ animationDelay: `${0.2 + i * 0.1}s`, transitionDelay: `${0.2 + i * 0.1}s` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, oklch(0.72 0.14 75 / 0.2), oklch(0.72 0.14 75 / 0.1))',
                    border: '1px solid oklch(0.72 0.14 75 / 0.3)',
                  }}
                >
                  <Icon size={18} style={{ color: 'oklch(0.72 0.14 75)' }} />
                </div>
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{ color: 'oklch(0.95 0.015 90)', fontFamily: 'Nunito, sans-serif' }}
                  >
                    {feature.title}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: 'oklch(0.72 0.04 140)', fontFamily: 'Nunito, sans-serif' }}
                  >
                    {feature.desc}
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className="ml-auto flex-shrink-0"
                  style={{ color: 'oklch(0.72 0.14 75 / 0.6)' }}
                />
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div
          className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.5s' }}
        >
          {permissionState === 'denied' && (
            <div
              className="mb-4 p-4 rounded-2xl text-center"
              style={{
                background: 'oklch(0.55 0.22 25 / 0.2)',
                border: '1px solid oklch(0.55 0.22 25 / 0.4)',
              }}
            >
              <p className="text-sm font-semibold" style={{ color: 'oklch(0.85 0.10 30)' }}>
                Camera access denied
              </p>
              <p className="text-xs mt-1" style={{ color: 'oklch(0.75 0.06 30)' }}>
                Please enable camera permissions in your browser settings to continue.
              </p>
            </div>
          )}

          {permissionState === 'unsupported' && (
            <div
              className="mb-4 p-4 rounded-2xl text-center"
              style={{
                background: 'oklch(0.55 0.22 25 / 0.2)',
                border: '1px solid oklch(0.55 0.22 25 / 0.4)',
              }}
            >
              <p className="text-sm font-semibold" style={{ color: 'oklch(0.85 0.10 30)' }}>
                Camera not supported
              </p>
              <p className="text-xs mt-1" style={{ color: 'oklch(0.75 0.06 30)' }}>
                Your browser doesn't support camera access.
              </p>
            </div>
          )}

          <button
            onClick={requestCameraPermission}
            disabled={permissionState === 'requesting' || permissionState === 'granted'}
            className="btn-shimmer w-full py-4 rounded-2xl font-bold text-base tracking-wide transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(135deg, oklch(0.32 0.10 150), oklch(0.42 0.12 148))',
              color: 'oklch(0.97 0.015 90)',
              border: '1px solid oklch(0.72 0.14 75 / 0.4)',
              boxShadow: '0 4px 24px oklch(0.28 0.12 150 / 0.5), 0 0 0 1px oklch(0.72 0.14 75 / 0.1)',
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            {permissionState === 'requesting' ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Requesting Access...</span>
              </>
            ) : permissionState === 'granted' ? (
              <>
                <Leaf size={20} />
                <span>Launching Explorer...</span>
              </>
            ) : (
              <>
                <Camera size={20} />
                <span>Begin Exploration</span>
              </>
            )}
          </button>

          <p
            className="text-center text-xs mt-4"
            style={{ color: 'oklch(0.60 0.04 140)', fontFamily: 'Nunito, sans-serif' }}
          >
            Camera access required for plant identification
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs" style={{ color: 'oklch(0.45 0.04 140)' }}>
            © {new Date().getFullYear()} Natural Hunt · Built with{' '}
            <span style={{ color: 'oklch(0.65 0.18 25)' }}>♥</span> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'oklch(0.72 0.14 75)' }}
              className="hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
