import { Loader2, Shield, Sparkles, User } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import type { UserProfile } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useSaveCallerUserProfile } from "../hooks/useQueries";
import GoogleSignInButton from "./GoogleSignInButton";

interface SignUpScreenProps {
  onComplete: () => void;
  onSwitchToSignIn: () => void;
}

export default function SignUpScreen({
  onComplete,
  onSwitchToSignIn,
}: SignUpScreenProps) {
  const { login, loginStatus, identity } = useInternetIdentity();
  const saveProfile = useSaveCallerUserProfile();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [step, setStep] = useState<"auth" | "profile">("auth");

  const isLoggingIn = loginStatus === "logging-in";
  const isAuthenticated = !!identity;

  const handleLogin = async () => {
    try {
      await login();
      setStep("profile");
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "";
      if (!msg.includes("already authenticated")) {
        toast.error("Login failed. Please try again.");
      } else {
        setStep("profile");
      }
    }
  };

  const handleSaveProfile = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setNameError("Please enter your display name");
      return;
    }
    if (trimmed.length < 2) {
      setNameError("Name must be at least 2 characters");
      return;
    }
    setNameError("");

    const profile: UserProfile = {
      name: trimmed,
      identifier: { __kind__: "gmail", gmail: "" },
      character: {
        id: "unknown",
        name: "Unknown",
        series: "Unknown",
        imageUrl: "",
        idleAnimation: "idle",
      },
      badge: "🌱",
      points: BigInt(0),
      discoveryCount: BigInt(0),
    };

    try {
      await saveProfile.mutateAsync(profile);
      toast.success("Profile created! Now choose your character.");
      onComplete();
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  const showProfileStep = isAuthenticated || step === "profile";

  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold font-playfair text-cream">
          {showProfileStep ? "Set Up Profile" : "Join Natural Hunt"}
        </h2>
        <p className="text-cream/40 text-sm font-nunito mt-1">
          {showProfileStep
            ? "Choose your display name"
            : "Create your account to start discovering"}
        </p>
      </div>

      {!showProfileStep ? (
        <>
          {/* Primary auth */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoggingIn}
            data-ocid="auth.submit_button"
            className="w-full py-4 rounded-2xl btn-premium flex items-center justify-center gap-3 font-bold font-nunito text-base disabled:opacity-60"
          >
            {isLoggingIn ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Shield size={18} />
                <span>Continue with Internet Identity</span>
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

          {/* Info */}
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
              <p className="text-cream/40 text-xs font-nunito leading-relaxed">
                Internet Identity provides secure, passwordless authentication.
                Your data stays private and decentralized.
              </p>
            </div>
          </div>

          <p className="text-center text-cream/40 text-sm font-nunito">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignIn}
              data-ocid="auth.secondary_button"
              className="font-bold transition-colors hover:text-gold-bright"
              style={{ color: "oklch(0.72 0.12 85)" }}
            >
              Sign in
            </button>
          </p>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <label
              htmlFor="display-name-input"
              className="text-cream/60 text-sm font-nunito font-semibold flex items-center gap-2"
            >
              <User size={14} />
              Display Name
            </label>
            <input
              id="display-name-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSaveProfile()}
              placeholder="Enter your name..."
              className="input-premium w-full rounded-xl px-4 py-3 text-base"
              maxLength={30}
              data-ocid="auth.input"
            />
            {nameError && (
              <p
                className="text-xs font-nunito"
                data-ocid="auth.error_state"
                style={{ color: "oklch(0.55 0.22 25)" }}
              >
                {nameError}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSaveProfile}
            disabled={saveProfile.isPending || !name.trim()}
            data-ocid="auth.submit_button"
            className="w-full py-4 rounded-2xl btn-premium flex items-center justify-center gap-3 font-bold font-nunito text-base disabled:opacity-60"
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Continue</span>
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
}
