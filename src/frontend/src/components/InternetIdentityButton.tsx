import { Loader2, Shield } from "lucide-react";
import React from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function InternetIdentityButton() {
  const { login, loginStatus } = useInternetIdentity();
  const isLoggingIn = loginStatus === "logging-in";

  return (
    <button
      type="button"
      onClick={() => login()}
      disabled={isLoggingIn}
      className="w-full py-3.5 rounded-2xl btn-ghost-premium flex items-center justify-center gap-3 font-bold font-nunito text-sm disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isLoggingIn ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <Shield size={16} className="text-violet-neon" />
          <span>Internet Identity</span>
        </>
      )}
    </button>
  );
}
