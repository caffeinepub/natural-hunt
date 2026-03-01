import { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import AuthLayout from './AuthLayout';
import GoogleSignInButton from './GoogleSignInButton';
import InternetIdentityButton from './InternetIdentityButton';

interface SignInScreenProps {
  onSwitchToSignUp: () => void;
}

export default function SignInScreen({ onSwitchToSignUp }: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Email or phone number is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && !/^\+?[\d\s\-()]{7,15}$/.test(email.trim())) {
      newErrors.email = 'Enter a valid email or phone number.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Note: actual auth is handled by Internet Identity via the buttons above.
    // This form is UI-only for professional appearance.
  };

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
          Welcome back
        </h2>
        <p
          className="text-xs mb-5"
          style={{ color: 'oklch(0.58 0.05 140)', fontFamily: 'Nunito, sans-serif' }}
        >
          Sign in to continue your plant journey
        </p>

        {/* Social / Identity auth */}
        <div className="space-y-2 mb-5">
          <GoogleSignInButton label="Sign in with Google" />
          <InternetIdentityButton label="Sign in with Internet Identity" />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: 'oklch(0.52 0.09 145 / 0.2)' }} />
          <span className="text-xs" style={{ color: 'oklch(0.48 0.05 140)', fontFamily: 'Nunito, sans-serif' }}>
            or sign in with credentials
          </span>
          <div className="flex-1 h-px" style={{ background: 'oklch(0.52 0.09 145 / 0.2)' }} />
        </div>

        {/* Credentials form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email / Phone */}
          <div>
            <label
              className="block text-xs font-bold mb-1.5 uppercase tracking-wider"
              style={{ color: 'oklch(0.68 0.08 145)', fontFamily: 'Nunito, sans-serif' }}
            >
              Email or Phone
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
              placeholder="your@email.com or +1 234 567 8900"
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
              style={errors.email ? errorInputStyle : inputStyle}
              onFocus={(e) => (e.target.style.borderColor = 'oklch(0.72 0.14 75 / 0.65)')}
              onBlur={(e) => (e.target.style.borderColor = errors.email ? 'oklch(0.55 0.22 25 / 0.6)' : 'oklch(0.52 0.09 145 / 0.3)')}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="flex items-center gap-1 mt-1.5 text-xs" style={{ color: 'oklch(0.70 0.18 30)', fontFamily: 'Nunito, sans-serif' }}>
                <AlertCircle size={11} className="flex-shrink-0" />
                {errors.email}
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
                onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: undefined })); }}
                placeholder="Enter your password"
                className="w-full px-4 py-3 pr-11 rounded-2xl text-sm outline-none transition-all"
                style={errors.password ? errorInputStyle : inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'oklch(0.72 0.14 75 / 0.65)')}
                onBlur={(e) => (e.target.style.borderColor = errors.password ? 'oklch(0.55 0.22 25 / 0.6)' : 'oklch(0.52 0.09 145 / 0.3)')}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors"
                style={{ color: 'oklch(0.52 0.06 140)' }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="flex items-center gap-1 mt-1.5 text-xs" style={{ color: 'oklch(0.70 0.18 30)', fontFamily: 'Nunito, sans-serif' }}>
                <AlertCircle size={11} className="flex-shrink-0" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot password link */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs transition-colors"
              style={{ color: 'oklch(0.62 0.10 75)', fontFamily: 'Nunito, sans-serif' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'oklch(0.72 0.14 75)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'oklch(0.62 0.10 75)')}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all"
            style={{
              background: 'linear-gradient(135deg, oklch(0.58 0.16 68), oklch(0.72 0.14 75))',
              color: 'oklch(0.12 0.04 150)',
              boxShadow: '0 4px 20px oklch(0.72 0.14 75 / 0.35)',
              fontFamily: 'Nunito, sans-serif',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 24px oklch(0.72 0.14 75 / 0.50)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px oklch(0.72 0.14 75 / 0.35)')}
          >
            Sign In
          </button>
        </form>

        {/* Switch to sign up */}
        <p
          className="mt-5 text-center text-xs"
          style={{ color: 'oklch(0.52 0.05 140)', fontFamily: 'Nunito, sans-serif' }}
        >
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="font-bold transition-colors"
            style={{ color: 'oklch(0.72 0.14 75)' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'oklch(0.82 0.12 80)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'oklch(0.72 0.14 75)')}
          >
            Create account
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
