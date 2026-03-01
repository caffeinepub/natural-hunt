import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, oklch(0.10 0.05 150) 0%, oklch(0.16 0.08 155) 50%, oklch(0.12 0.06 148) 100%)',
      }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/generated/botanical-bg.dim_1200x900.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.06,
        }}
      />

      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.72 0.14 75 / 0.12), transparent 70%)',
          transform: 'translate(35%, -35%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.42 0.12 148 / 0.15), transparent 70%)',
          transform: 'translate(-35%, 35%)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.32 0.10 150 / 0.08), transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Logo */}
      <div className="flex flex-col items-center mb-6 animate-fade-in-up z-10">
        <div className="w-16 h-16 rounded-2xl overflow-hidden mb-3 animate-float"
          style={{
            boxShadow: '0 8px 32px oklch(0.52 0.12 148 / 0.5)',
            border: '1px solid oklch(0.52 0.09 145 / 0.4)',
          }}
        >
          <img
            src="/assets/generated/natural-hunt-logo.dim_512x512.png"
            alt="Natural Hunt"
            className="w-full h-full object-cover"
          />
        </div>
        <h1
          className="text-2xl font-black text-center"
          style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.97 0.015 90)' }}
        >
          Natural Hunt
        </h1>
        <p
          className="text-xs text-center mt-0.5"
          style={{ color: 'oklch(0.62 0.07 145)', fontFamily: 'Nunito, sans-serif' }}
        >
          Discover the world of plants 🌿
        </p>
      </div>

      {/* Card content */}
      <div className="w-full max-w-sm z-10">
        {children}
      </div>

      {/* Footer */}
      <p
        className="mt-6 text-xs text-center max-w-xs z-10 animate-fade-in"
        style={{ color: 'oklch(0.40 0.04 140)', fontFamily: 'Nunito, sans-serif' }}
      >
        Secured by the Internet Computer blockchain
      </p>
    </div>
  );
}
