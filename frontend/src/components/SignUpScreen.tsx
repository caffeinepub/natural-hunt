import { useState } from 'react';
import { Mail, Phone, Leaf, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useSaveUserProfile } from '../hooks/useQueries';
import type { Identifier } from '../backend';

interface SignUpScreenProps {
  onComplete: () => void;
}

type IdentifierType = 'gmail' | 'phone';

function validateGmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validatePhone(phone: string): boolean {
  return /^\+?[\d\s\-()]{7,15}$/.test(phone.trim());
}

export default function SignUpScreen({ onComplete }: SignUpScreenProps) {
  const [identifierType, setIdentifierType] = useState<IdentifierType>('gmail');
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState<string | null>(null);

  const saveProfile = useSaveUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (identifierType === 'gmail') {
      if (!validateGmail(identifier)) {
        setError('Please enter a valid Gmail address.');
        return;
      }
    } else {
      if (!validatePhone(identifier)) {
        setError('Please enter a valid mobile number (7–15 digits).');
        return;
      }
    }

    const id: Identifier =
      identifierType === 'gmail'
        ? { __kind__: 'gmail', gmail: identifier.trim() }
        : { __kind__: 'phone', phone: identifier.trim() };

    try {
      await saveProfile.mutateAsync({ name: name.trim(), identifier: id });
      onComplete();
    } catch {
      setError('Failed to save profile. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, oklch(0.12 0.06 150) 0%, oklch(0.18 0.09 155) 50%, oklch(0.14 0.07 148) 100%)',
      }}
    >
      {/* Decorative background blobs */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, oklch(0.72 0.14 75), transparent 70%)', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, oklch(0.52 0.12 148), transparent 70%)', transform: 'translate(-30%, 30%)' }}
      />

      {/* Logo / Header */}
      <div className="flex flex-col items-center mb-8 animate-fade-in-up">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4 animate-float"
          style={{
            background: 'linear-gradient(135deg, oklch(0.32 0.10 150), oklch(0.42 0.12 148))',
            boxShadow: '0 8px 32px oklch(0.52 0.12 148 / 0.4)',
            border: '1px solid oklch(0.52 0.09 145 / 0.4)',
          }}
        >
          <Leaf size={36} style={{ color: 'oklch(0.72 0.14 75)' }} />
        </div>
        <h1
          className="text-3xl font-black text-center mb-1"
          style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.97 0.015 90)' }}
        >
          Natural Hunt
        </h1>
        <p className="text-sm text-center" style={{ color: 'oklch(0.65 0.06 145)', fontFamily: 'Nunito, sans-serif' }}>
          Discover the world of plants 🌿
        </p>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-sm rounded-3xl p-6 animate-fade-in-up delay-200"
        style={{
          background: 'oklch(0.16 0.06 150 / 0.85)',
          border: '1px solid oklch(0.52 0.09 145 / 0.25)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px oklch(0.08 0.04 150 / 0.6)',
        }}
      >
        <h2
          className="text-xl font-bold mb-1"
          style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.95 0.015 90)' }}
        >
          Create Your Profile
        </h2>
        <p className="text-xs mb-5" style={{ color: 'oklch(0.60 0.05 140)', fontFamily: 'Nunito, sans-serif' }}>
          Join to track your plant discoveries and earn points!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field */}
          <div>
            <label
              className="block text-xs font-bold mb-1.5 uppercase tracking-wider"
              style={{ color: 'oklch(0.72 0.09 145)', fontFamily: 'Nunito, sans-serif' }}
            >
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
              style={{
                background: 'oklch(0.12 0.04 150 / 0.6)',
                border: '1px solid oklch(0.52 0.09 145 / 0.3)',
                color: 'oklch(0.95 0.015 90)',
                fontFamily: 'Nunito, sans-serif',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'oklch(0.72 0.14 75 / 0.7)')}
              onBlur={(e) => (e.target.style.borderColor = 'oklch(0.52 0.09 145 / 0.3)')}
            />
          </div>

          {/* Identifier type toggle */}
          <div>
            <label
              className="block text-xs font-bold mb-1.5 uppercase tracking-wider"
              style={{ color: 'oklch(0.72 0.09 145)', fontFamily: 'Nunito, sans-serif' }}
            >
              Sign Up With
            </label>
            <div
              className="flex rounded-2xl p-1 mb-3"
              style={{ background: 'oklch(0.12 0.04 150 / 0.6)', border: '1px solid oklch(0.52 0.09 145 / 0.2)' }}
            >
              <button
                type="button"
                onClick={() => { setIdentifierType('gmail'); setIdentifier(''); setError(null); }}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: identifierType === 'gmail' ? 'linear-gradient(135deg, oklch(0.32 0.10 150), oklch(0.42 0.12 148))' : 'transparent',
                  color: identifierType === 'gmail' ? 'oklch(0.97 0.015 90)' : 'oklch(0.55 0.06 140)',
                  fontFamily: 'Nunito, sans-serif',
                }}
              >
                <Mail size={14} />
                Gmail
              </button>
              <button
                type="button"
                onClick={() => { setIdentifierType('phone'); setIdentifier(''); setError(null); }}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: identifierType === 'phone' ? 'linear-gradient(135deg, oklch(0.32 0.10 150), oklch(0.42 0.12 148))' : 'transparent',
                  color: identifierType === 'phone' ? 'oklch(0.97 0.015 90)' : 'oklch(0.55 0.06 140)',
                  fontFamily: 'Nunito, sans-serif',
                }}
              >
                <Phone size={14} />
                Mobile
              </button>
            </div>

            {/* Identifier input */}
            <input
              type={identifierType === 'gmail' ? 'email' : 'tel'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={identifierType === 'gmail' ? 'your@gmail.com' : '+1 234 567 8900'}
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
              style={{
                background: 'oklch(0.12 0.04 150 / 0.6)',
                border: '1px solid oklch(0.52 0.09 145 / 0.3)',
                color: 'oklch(0.95 0.015 90)',
                fontFamily: 'Nunito, sans-serif',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'oklch(0.72 0.14 75 / 0.7)')}
              onBlur={(e) => (e.target.style.borderColor = 'oklch(0.52 0.09 145 / 0.3)')}
            />
          </div>

          {/* Error message */}
          {error && (
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
              style={{
                background: 'oklch(0.55 0.22 25 / 0.15)',
                border: '1px solid oklch(0.55 0.22 25 / 0.3)',
                color: 'oklch(0.75 0.18 30)',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              <AlertCircle size={14} className="flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={saveProfile.isPending}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all btn-shimmer"
            style={{
              background: saveProfile.isPending
                ? 'oklch(0.32 0.08 148)'
                : 'linear-gradient(135deg, oklch(0.58 0.16 68), oklch(0.72 0.14 75))',
              color: 'oklch(0.12 0.04 150)',
              boxShadow: saveProfile.isPending ? 'none' : '0 4px 20px oklch(0.72 0.14 75 / 0.4)',
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Start Exploring
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer note */}
      <p
        className="mt-6 text-xs text-center max-w-xs animate-fade-in delay-400"
        style={{ color: 'oklch(0.45 0.04 140)', fontFamily: 'Nunito, sans-serif' }}
      >
        Your data is stored securely on the Internet Computer blockchain.
      </p>
    </div>
  );
}
