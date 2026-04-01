import { Loader2, Shield, Sparkles } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import GoogleSignInButton from "./GoogleSignInButton";

interface SignInScreenProps {
  onSwitchToSignUp: () => void;
}

export default function SignInScreen({ onSwitchToSignUp }: SignInScreenProps) {
  const { login, loginStatus } = useInternetIdentity();
  const isLoggingIn = loginStatus === "logging-in";

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Login failed";
      if (!msg.includes("already authenticated")) {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold font-playfair text-cream">
          Welcome Back
        </h2>
        <p className="text-cream/40 text-sm font-nunito mt-1">
          Sign in to continue your journey
        </p>
      </div>

      {/* Primary: Internet Identity */}
      <button
        type="button"
        onClick={handleLogin}
        disabled={isLoggingIn}
        data-ocid="auth.submit_button"
        className="w-full py-4 rounded-2xl btn-premium flex items-center justify-center gap-3 font-bold font-nunito text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoggingIn ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <Shield size={18} />
            <span>Sign in with Internet Identity</span>
          </>
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border/30" />
        <span className="text-cream/30 text-xs font-nunito">or</span>
        <div className="flex-1 h-px bg-border/30" />
      </div>

      {/* Google */}
      <GoogleSignInButton />

      {/* Info card */}
      <div
        className="glass-card rounded-2xl p-4"
        style={{ borderColor: "oklch(0.72 0.12 85 / 0.15)" }}
      >
        <div className="flex items-start gap-3">
          <Sparkles
            size={15}
            className="mt-0.5 shrink-0"
            style={{ color: "oklch(0.72 0.12 85)" }}
          />
          <div>
            <p className="text-cream/70 text-sm font-nunito font-semibold mb-1">
              What is Internet Identity?
            </p>
            <p className="text-cream/40 text-xs font-nunito leading-relaxed">
              A secure, privacy-preserving authentication system built on the
              Internet Computer. No passwords, no data leaks.
            </p>
          </div>
        </div>
      </div>

      {/* Switch */}
      <p className="text-center text-cream/40 text-sm font-nunito">
        New here?{" "}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          data-ocid="auth.secondary_button"
          className="font-bold transition-colors hover:text-gold-bright"
          style={{ color: "oklch(0.72 0.12 85)" }}
        >
          Create account
        </button>
      </p>
    </div>
  );
}
