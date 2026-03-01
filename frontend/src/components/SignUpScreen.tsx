import { useState } from 'react';
import { Mail, Phone, Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useSaveUserProfile } from '../hooks/useQueries';
import type { Identifier } from '../backend';
import AuthLayout from './AuthLayout';
import GoogleSignInButton from './GoogleSignInButton';
import InternetIdentityButton from './InternetIdentityButton';

interface SignUpScreenProps {
  onComplete: () => void;
  onSwitchToSignIn?: () => void;
}

type IdentifierType = 'gmail' | 'phone';

function validateGmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validatePhone(phone: string): boolean {
  return /^\+?[\d\s\-()]{7,15}$/.test(phone.trim());
}

export default function SignUpScreen({ onComplete, onSwitchToSignIn }: SignUpScreenProps) {
  const [identifierType, setIdentifierType] = useState<IdentifierType>('gmail');
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    identifier?: string;
    password?: string;
  }>({});

  const saveProfile = useSaveUserProfile();

  const validate = () => {
    const errors: { name?: string; identifier?: string; password?: string } = {};

    if (!name.trim()) {
      errors.name = 'Please enter your name.';
    }

    if (identifierType === 'gmail') {
      if (!identifier.trim()) {
        errors.identifier = 'Email address is required.';
      } else if (!validateGmail(identifier)) {
        errors.identifier = 'Please enter a valid email address.';
      }
    } else {
      if (!identifier.trim()) {
        errors.identifier = 'Phone number is required.';
      } else if (!validatePhone(identifier)) {
        errors.identifier = 'Please enter a valid mobile number (7–15 digits).';
      }
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const id: Identifier =
      identifierType === 'gmail'
        ? { __kind__: 'gmail', gmail: identifier.trim() }
        : { __kind__: 'phone', phone: identifier.trim() };

    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        identifier: id,
        character: { id: 'unknown', name: 'Unknown', series: 'unknown', imageUrl: '' },
        badge: 'newbie',
      });
      onComplete();
    } catch {
      // Error displayed via saveProfile.error
    }
  };

  const mutationError = saveProfile.error ? saveProfile.error.message : null;

  const inputStyle = {
    background: 'oklch(0.12 0.04 150 / 0.6)',
    border: '1px solid oklch(0.52 0.09 145 / 0.3)',
    color: 'oklch(0.95 0.015 90)',
    fontFamily: 'Nunito, sans-serif',
  };

  const errorInputStyle = {
    ...inputStyle,
    border: '1px solid oklch(0.55 0.22 25 / 0.6)',
  };

  return (
    <AuthLayout>
      <div
        className="rounded-3xl p-6 animate-fade-in-up"
        style={{
          background: 'oklch(0.15 0.06 150 / 0.88)',
          border: '1px solid oklch(0.52 0.09 145 / 0.22)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 24px 64px oklch(0.06 0.03 150 / 0.7)',
        }}
      >
        <h2
          className="text-xl font-bold mb-1"
          style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.95 0.015 90)' }}
        >
          Create your account
        </h2>
        <p
          className="text-xs mb-5"
          style={{ color: 'oklch(0.58 0.05 140)', fontFamily: 'Nunito, sans-serif' }}
        >
          Join to track discoveries and earn points!
        </p>

        {/* Social / Identity auth */}
        <div className="space-y-2 mb-5">
          <GoogleSignInButton label="Sign up with Google" />
          <InternetIdentityButton label="Sign up with Internet Identity" />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: 'oklch(0.52 0.09 145 / 0.2)' }} />
          <span className="text-xs" style={{ color: 'oklch(0.48 0.05 140)', fontFamily: 'Nunito, sans-serif' }}>
            or create with credentials
          </span>
          <div className="flex-1 h-px" style={{ background: 'oklch(0.52 0.09 145 / 0.2)' }} />
        </div>

        {/* Mutation error */}
        {mutationError && (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs mb-4"
            style={{
              background: 'oklch(0.55 0.22 25 / 0.12)',
              border: '1px solid oklch(0.55 0.22 25 / 0.3)',
              color: 'oklch(0.72 0.18 30)',
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            <AlertCircle size={13} className="flex-shrink-0" />
            {mutationError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Name */}
          <div>
            <label
              className="block text-xs font-bold mb-1.5 uppercase tracking-wider"
              style={{ color: 'oklch(0.68 0.08 145)', fontFamily: 'Nunito, sans-serif' }}
            >
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (validationErrors.name) setValidationErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={validationErrors.name ? errorInputStyle : inputStyle}
              autoComplete="name"
            />
            {validationErrors.name && (
              <p className="text-xs mt-1" style={{ color: 'oklch(0.72 0.18 30)', fontFamily: 'Nunito, sans-serif' }}>
                {validationErrors.name}
              </p>
            )}
          </div>

          {/* Identifier type toggle */}
          <div>
            <div className="flex gap-2 mb-2">
              {(['gmail', 'phone'] as IdentifierType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setIdentifierType(type);
                    setIdentifier('');
                    setValidationErrors((prev) => ({ ...prev, identifier: undefined }));
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: identifierType === type ? 'oklch(0.32 0.10 150 / 0.5)' : 'transparent',
                    color: identifierType === type ? 'oklch(0.82 0.10 145)' : 'oklch(0.52 0.05 140)',
                    border: identifierType === type ? '1px solid oklch(0.52 0.09 145 / 0.4)' : '1px solid transparent',
                    fontFamily: 'Nunito, sans-serif',
                  }}
                >
                  {type === 'gmail' ? <Mail size={12} /> : <Phone size={12} />}
                  {type === 'gmail' ? 'Email' : 'Phone'}
                </button>
              ))}
            </div>
            <input
              type={identifierType === 'gmail' ? 'email' : 'tel'}
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (validationErrors.identifier) setValidationErrors((prev) => ({ ...prev, identifier: undefined }));
              }}
              placeholder={identifierType === 'gmail' ? 'you@example.com' : '+1 234 567 8900'}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={validationErrors.identifier ? errorInputStyle : inputStyle}
              autoComplete={identifierType === 'gmail' ? 'email' : 'tel'}
            />
            {validationErrors.identifier && (
              <p className="text-xs mt-1" style={{ color: 'oklch(0.72 0.18 30)', fontFamily: 'Nunito, sans-serif' }}>
                {validationErrors.identifier}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-xs font-bold mb-1.5 uppercase tracking-wider"
              style={{ color: 'oklch(0.68 0.08 145)', fontFamily: 'Nunito, sans-serif' }}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (validationErrors.password) setValidationErrors((prev) => ({ ...prev, password: undefined }));
                }}
                placeholder="Min. 6 characters"
                className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all"
                style={validationErrors.password ? errorInputStyle : inputStyle}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors"
                style={{ color: 'oklch(0.52 0.05 140)' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {validationErrors.password && (
              <p className="text-xs mt-1" style={{ color: 'oklch(0.72 0.18 30)', fontFamily: 'Nunito, sans-serif' }}>
                {validationErrors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={saveProfile.isPending}
            className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 mt-2"
            style={{
              background: 'linear-gradient(135deg, oklch(0.32 0.10 150), oklch(0.42 0.12 148))',
              color: 'oklch(0.97 0.015 90)',
              fontFamily: 'Nunito, sans-serif',
              boxShadow: '0 4px 16px oklch(0.28 0.12 150 / 0.4)',
            }}
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Switch to sign in */}
        {onSwitchToSignIn && (
          <p
            className="text-center text-xs mt-4"
            style={{ color: 'oklch(0.52 0.05 140)', fontFamily: 'Nunito, sans-serif' }}
          >
            Already have an account?{' '}
            <button
              onClick={onSwitchToSignIn}
              className="font-bold transition-colors"
              style={{ color: 'oklch(0.72 0.14 75)' }}
            >
              Sign in
            </button>
          </p>
        )}
      </div>
    </AuthLayout>
  );
}
