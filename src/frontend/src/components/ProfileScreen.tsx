import { useQueryClient } from "@tanstack/react-query";
import {
  Award,
  Check,
  Edit2,
  Leaf,
  LogOut,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { type AnimeCharacter, animeCharacters } from "../data/animeCharacters";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetCallerUserProfile,
  useUpdateDisplayName,
} from "../hooks/useQueries";

function getRankInfo(points: number): {
  label: string;
  cls: string;
  next: number;
} {
  if (points >= 5000)
    return { label: "Master", cls: "rank-master", next: 5000 };
  if (points >= 2000)
    return { label: "Blossom", cls: "rank-blossom", next: 5000 };
  if (points >= 800) return { label: "Vine", cls: "rank-vine", next: 2000 };
  if (points >= 200) return { label: "Sprout", cls: "rank-sprout", next: 800 };
  return { label: "Seedling", cls: "rank-seedling", next: 200 };
}

interface ProfileScreenProps {
  onViewPresentation?: () => void;
  onChangeCharacter?: () => void;
  onViewShareCertificate?: () => void;
}

export default function ProfileScreen({
  onChangeCharacter,
  onViewPresentation,
  onViewShareCertificate,
}: ProfileScreenProps) {
  const { data: userProfile, isLoading } = useGetCallerUserProfile();
  const { clear, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const updateDisplayName = useUpdateDisplayName();

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const character: AnimeCharacter | null = userProfile?.character
    ? animeCharacters.find((c) => c.id === userProfile.character.id) || null
    : null;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const handleEditName = () => {
    setNameInput(userProfile?.name || "");
    setEditingName(true);
  };
  const handleSaveName = async () => {
    if (!nameInput.trim()) return;
    await updateDisplayName.mutateAsync(nameInput.trim());
    setEditingName(false);
  };
  const handleCancelEdit = () => {
    setEditingName(false);
    setNameInput("");
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(0.10 0.02 240)" }}
      >
        <div
          className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin"
          style={{
            borderColor: "oklch(0.72 0.12 85)",
            borderTopColor: "transparent",
          }}
          data-ocid="profile.loading_state"
        />
      </div>
    );
  }

  const points = Number(userProfile?.points || 0);
  const discoveries = Number(userProfile?.discoveryCount || 0);
  const principal = identity?.getPrincipal().toString() || "";
  const shortPrincipal =
    principal.length > 16
      ? `${principal.slice(0, 8)}...${principal.slice(-6)}`
      : principal;

  const rankInfo = getRankInfo(points);
  const prevThreshold =
    rankInfo.label === "Seedling"
      ? 0
      : rankInfo.label === "Sprout"
        ? 200
        : rankInfo.label === "Vine"
          ? 800
          : rankInfo.label === "Blossom"
            ? 2000
            : 5000;
  const xpProgress =
    rankInfo.next === prevThreshold
      ? 100
      : Math.min(
          100,
          ((points - prevThreshold) / (rankInfo.next - prevThreshold)) * 100,
        );

  const colorSwatches: { label: string; value: string }[] = character
    ? [
        { label: "Primary", value: character.primaryColor },
        { label: "Hair", value: character.hairColor },
        { label: "Eye", value: character.eyeColor },
      ]
    : [];

  return (
    <div
      className="min-h-screen pb-28 text-cream"
      style={{ background: "oklch(0.10 0.02 240)" }}
    >
      {/* Header / Banner */}
      <div
        className="relative h-44 rounded-b-3xl overflow-hidden"
        style={{
          background: character
            ? `linear-gradient(135deg, ${character.primaryColor}44, ${character.secondaryColor}22, oklch(0.10 0.02 240))`
            : "linear-gradient(135deg, oklch(0.65 0.18 145 / 0.4), oklch(0.10 0.02 240))",
        }}
      >
        <img
          src="/assets/generated/profile-banner.dim_1200x400.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[oklch(0.10_0.02_240)]" />

        {/* Avatar centered on bottom edge */}
        <div className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2">
          <div
            className="w-24 h-24 rounded-2xl overflow-hidden border-4"
            style={{
              borderColor: "oklch(0.10 0.02 240)",
              background: character
                ? `linear-gradient(135deg, ${character.primaryColor}44, ${character.secondaryColor}22)`
                : "oklch(1 0 0 / 0.08)",
              boxShadow: character
                ? `0 0 24px ${character.primaryColor}55`
                : undefined,
            }}
          >
            {character?.imageUrl ? (
              <img
                src={character.imageUrl}
                alt={character.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">
                🌿
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 mt-12">
        {/* Name + rank */}
        <div className="text-center mb-6">
          {editingName ? (
            <div className="flex items-center gap-2 justify-center">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="input-premium rounded-lg px-3 py-1.5 text-cream text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveName();
                  if (e.key === "Escape") handleCancelEdit();
                }}
                data-ocid="profile.name_input"
              />
              <button
                type="button"
                onClick={handleSaveName}
                disabled={updateDisplayName.isPending}
                className="p-1.5 rounded-lg transition-colors"
                style={{
                  background: "oklch(0.72 0.12 85 / 0.2)",
                  color: "oklch(0.72 0.12 85)",
                }}
                data-ocid="profile.save_button"
              >
                {updateDisplayName.isPending ? (
                  <div className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="p-1.5 rounded-lg transition-colors"
                style={{
                  background: "oklch(1 0 0 / 0.08)",
                  color: "oklch(0.65 0.04 80 / 0.6)",
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <h2 className="font-playfair text-2xl font-bold text-cream">
                {userProfile?.name || "Explorer"}
              </h2>
              <button
                type="button"
                onClick={handleEditName}
                className="p-1 rounded-lg text-cream/30 hover:text-gold transition-colors"
                data-ocid="profile.edit_button"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {character && (
            <p className="text-sm text-cream/50 mt-1 font-nunito">
              {character.name} · {character.series}
            </p>
          )}

          {/* Rank chip */}
          <div className="flex items-center justify-center mt-3 gap-2">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full font-nunito ${rankInfo.cls}`}
            >
              {rankInfo.label}
            </span>
          </div>

          {/* XP bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-cream/30 font-nunito mb-1">
              <span>{points.toLocaleString()} pts</span>
              <span>Next: {rankInfo.next.toLocaleString()}</span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: "oklch(1 0 0 / 0.08)" }}
            >
              <div
                className="h-full rounded-full animate-xp-fill"
                style={
                  {
                    "--xp-width": `${xpProgress}%`,
                    width: `${xpProgress}%`,
                    background: character
                      ? `linear-gradient(90deg, ${character.primaryColor}, ${character.secondaryColor})`
                      : "linear-gradient(90deg, oklch(0.72 0.12 85), oklch(0.65 0.18 145))",
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
        </div>

        {/* Principal ID */}
        <div
          className="rounded-xl px-3 py-2 mb-5 border"
          style={{
            background: "oklch(1 0 0 / 0.04)",
            borderColor: "oklch(1 0 0 / 0.08)",
          }}
        >
          <p className="text-xs text-cream/40 mb-0.5">Principal ID</p>
          <p className="text-xs text-cream/60 font-mono truncate">
            {shortPrincipal}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            {
              icon: Star,
              label: "Points",
              value: points.toLocaleString(),
              color: "oklch(0.72 0.12 85)",
            },
            {
              icon: Leaf,
              label: "Plants",
              value: String(discoveries),
              color: "oklch(0.65 0.18 145)",
            },
            {
              icon: Award,
              label: "Badge",
              value: userProfile?.badge || "—",
              color: "oklch(0.65 0.22 290)",
            },
          ].map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="rounded-xl p-3 border text-center"
              style={{
                background: `${color.replace(")", " / 0.06)")}\ `,
                borderColor: `${color.replace(")", " / 0.2)")}`,
              }}
            >
              <Icon className="w-5 h-5 mx-auto mb-1" style={{ color }} />
              <p className="font-bold text-lg font-nunito" style={{ color }}>
                {value}
              </p>
              <p className="text-xs text-cream/50 font-nunito">{label}</p>
            </div>
          ))}
        </div>

        {/* Character guide card */}
        {character && (
          <div
            className="rounded-2xl p-4 mb-5 border"
            style={{
              background: `linear-gradient(135deg, ${character.primaryColor}12, ${character.secondaryColor}0a)`,
              borderColor: `${character.primaryColor}44`,
            }}
          >
            <p className="text-xs text-cream/40 mb-3 uppercase tracking-wider font-semibold font-nunito">
              Your Guide
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl overflow-hidden border shrink-0"
                style={{
                  borderColor: "oklch(1 0 0 / 0.2)",
                  background: `${character.primaryColor}22`,
                }}
              >
                <img
                  src={character.imageUrl}
                  alt={character.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div>
                <p className="font-semibold text-cream font-nunito">
                  {character.name}
                </p>
                <p className="text-xs text-cream/50 font-nunito">
                  {character.series}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="flex gap-1.5">
                  {colorSwatches.map((swatch) => (
                    <div
                      key={swatch.label}
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ background: swatch.value }}
                      title={swatch.label}
                    />
                  ))}
                </div>
                {onChangeCharacter && (
                  <button
                    type="button"
                    onClick={onChangeCharacter}
                    data-ocid="profile.change_character_button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-nunito transition-all active:scale-95"
                    style={{
                      background: `${character.primaryColor}22`,
                      color: character.primaryColor,
                      border: `1px solid ${character.primaryColor}44`,
                    }}
                  >
                    <Sparkles className="w-3 h-3" />
                    Change
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Share Certificate */}
        {onViewShareCertificate && (
          <button
            type="button"
            onClick={onViewShareCertificate}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border transition-colors hover:bg-white/5 mb-3"
            style={{
              borderColor: "oklch(0.72 0.12 85 / 0.35)",
              color: "oklch(0.72 0.12 85)",
            }}
          >
            <span className="text-sm">📜</span>
            <span className="font-medium text-sm font-nunito">
              Share Certificate
            </span>
          </button>
        )}

        {/* Presentation */}
        {onViewPresentation && (
          <button
            type="button"
            onClick={onViewPresentation}
            data-ocid="profile.open_modal_button"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border transition-colors hover:bg-white/5 mb-3"
            style={{
              borderColor: "oklch(0.65 0.18 145 / 0.35)",
              color: "oklch(0.65 0.18 145)",
            }}
          >
            <span className="text-sm">🎬</span>
            <span className="font-medium text-sm font-nunito">
              View Presentation
            </span>
          </button>
        )}

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border transition-colors hover:bg-red-500/10"
          style={{
            borderColor: "oklch(0.55 0.22 25 / 0.35)",
            color: "oklch(0.65 0.20 25)",
          }}
          data-ocid="profile.logout_button"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium text-sm font-nunito">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
