import { Loader2 } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

interface GoogleSignInButtonProps {
  label?: string;
}

export default function GoogleSignInButton({ label = 'Continue with Google' }: GoogleSignInButtonProps) {
  const { login, loginStatus } = useInternetIdentity();
  const isLoading = loginStatus === 'logging-in';

  const handleClick = async () => {
    if (isLoading) return;
    try {
      await login();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      if (message === 'User is already authenticated') {
        // Already authenticated, ignore
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      aria-label={label}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl font-semibold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      style={{
        background: 'oklch(0.99 0.005 90)',
        color: 'oklch(0.22 0.04 150)',
        boxShadow: '0 2px 8px oklch(0.10 0.04 150 / 0.25), 0 1px 3px oklch(0.10 0.04 150 / 0.15)',
        border: '1px solid oklch(0.88 0.02 120)',
        fontFamily: 'Nunito, sans-serif',
      }}
      onMouseEnter={(e) => {
        if (!isLoading) {
          (e.currentTarget as HTMLButtonElement).style.background = 'oklch(0.96 0.008 100)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px oklch(0.10 0.04 150 / 0.30), 0 2px 6px oklch(0.10 0.04 150 / 0.18)';
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'oklch(0.99 0.005 90)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px oklch(0.10 0.04 150 / 0.25), 0 1px 3px oklch(0.10 0.04 150 / 0.15)';
      }}
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" style={{ color: 'oklch(0.55 0.18 25)' }} />
      ) : (
        <img
          src="/assets/generated/google-logo-icon.dim_48x48.png"
          alt="Google"
          className="w-5 h-5 object-contain"
        />
      )}
      <span>{isLoading ? 'Connecting...' : label}</span>
    </button>
  );
}
