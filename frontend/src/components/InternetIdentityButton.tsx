import { Loader2, Shield } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

interface InternetIdentityButtonProps {
  label?: string;
}

export default function InternetIdentityButton({ label = 'Continue with Internet Identity' }: InternetIdentityButtonProps) {
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
      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 disabled:opacity-60 disabled:cursor-not-allowed"
      style={{
        background: 'transparent',
        color: 'oklch(0.62 0.07 145)',
        border: '1px solid oklch(0.52 0.09 145 / 0.25)',
        fontFamily: 'Nunito, sans-serif',
      }}
      onMouseEnter={(e) => {
        if (!isLoading) {
          (e.currentTarget as HTMLButtonElement).style.background = 'oklch(0.52 0.09 145 / 0.08)';
          (e.currentTarget as HTMLButtonElement).style.color = 'oklch(0.72 0.09 145)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'oklch(0.52 0.09 145 / 0.45)';
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
        (e.currentTarget as HTMLButtonElement).style.color = 'oklch(0.62 0.07 145)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'oklch(0.52 0.09 145 / 0.25)';
      }}
    >
      {isLoading ? (
        <Loader2 size={13} className="animate-spin" />
      ) : (
        <Shield size={13} />
      )}
      <span>{isLoading ? 'Connecting...' : label}</span>
    </button>
  );
}
