import { BookOpen, Camera, Trophy, User } from "lucide-react";
import React from "react";
import type { AnimeCharacter } from "../data/animeCharacters";

interface BottomNavBarProps {
  activeTab: "scan" | "leaderboard" | "discoveries" | "profile";
  onTabChange: (
    tab: "scan" | "leaderboard" | "discoveries" | "profile",
  ) => void;
  character?: AnimeCharacter | null;
}

export default function BottomNavBar({
  activeTab,
  onTabChange,
  character,
}: BottomNavBarProps) {
  const tabs = [
    {
      id: "leaderboard" as const,
      label: "Ranks",
      icon: Trophy,
      ocid: "nav.leaderboard_button",
    },
    {
      id: "scan" as const,
      label: "Scan",
      icon: Camera,
      ocid: "nav.scan_button",
      isScan: true,
    },
    {
      id: "discoveries" as const,
      label: "Plants",
      icon: BookOpen,
      ocid: "nav.discoveries_button",
    },
    {
      id: "profile" as const,
      label: "Profile",
      icon: User,
      ocid: "nav.profile_button",
    },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50">
      <div
        className="glass-card-strong rounded-2xl flex items-center justify-around px-2 py-2"
        style={{
          borderColor: "oklch(0.72 0.12 85 / 0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          if (tab.isScan) {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                data-ocid={tab.ocid}
                className="relative flex flex-col items-center -mt-5"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: character
                      ? `linear-gradient(135deg, ${character.primaryColor}, ${character.secondaryColor})`
                      : "linear-gradient(135deg, oklch(0.65 0.18 145), oklch(0.5 0.14 155))",
                    boxShadow: isActive
                      ? `0 0 20px ${character?.primaryColor ?? "oklch(0.65 0.18 145)"}88, 0 4px 16px rgba(0,0,0,0.4)`
                      : "0 4px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Glow rings when active */}
                  {isActive && (
                    <>
                      <span
                        className="absolute inset-0 rounded-full animate-scan-pulse"
                        style={{
                          border: `2px solid ${character?.primaryColor ?? "oklch(0.65 0.18 145)"}66`,
                        }}
                      />
                      <span
                        className="absolute inset-0 rounded-full animate-scan-pulse"
                        style={{
                          border: `2px solid ${character?.primaryColor ?? "oklch(0.65 0.18 145)"}44`,
                          animationDelay: "0.5s",
                        }}
                      />
                    </>
                  )}
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span
                  className="text-[10px] font-medium mt-1"
                  style={{
                    color: isActive
                      ? "oklch(0.72 0.12 85)"
                      : "oklch(0.65 0.04 80 / 0.6)",
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          }

          const isProfile = tab.id === "profile";

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              data-ocid={tab.ocid}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200"
            >
              {isProfile && character?.imageUrl ? (
                <div
                  className="w-7 h-7 rounded-full overflow-hidden border-2 transition-all duration-200"
                  style={{
                    borderColor: isActive
                      ? "oklch(0.72 0.12 85)"
                      : "oklch(0.65 0.04 80 / 0.2)",
                    boxShadow: isActive
                      ? "0 0 10px oklch(0.72 0.12 85 / 0.6)"
                      : "none",
                  }}
                >
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ) : (
                <div
                  className="w-7 h-7 flex items-center justify-center rounded-xl transition-all duration-200"
                  style={{
                    background: isActive
                      ? "oklch(0.72 0.12 85 / 0.2)"
                      : "transparent",
                  }}
                >
                  <Icon
                    className="w-5 h-5 transition-colors duration-200"
                    style={{
                      color: isActive
                        ? "oklch(0.72 0.12 85)"
                        : "oklch(0.65 0.04 80 / 0.5)",
                    }}
                  />
                </div>
              )}
              <span
                className="text-[10px] font-medium transition-colors duration-200"
                style={{
                  color: isActive
                    ? "oklch(0.72 0.12 85)"
                    : "oklch(0.65 0.04 80 / 0.5)",
                }}
              >
                {tab.label}
              </span>
              {isActive && (
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: "oklch(0.72 0.12 85)" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
