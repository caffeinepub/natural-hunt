import { Crown, Leaf, Medal, Star, Trophy } from "lucide-react";
import React from "react";
import { animeCharacters } from "../data/animeCharacters";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetCallerUserProfile,
  useGetLeaderboard,
} from "../hooks/useQueries";

function getRankClass(points: number): string {
  if (points >= 5000) return "rank-master";
  if (points >= 2000) return "rank-blossom";
  if (points >= 800) return "rank-vine";
  if (points >= 200) return "rank-sprout";
  return "rank-seedling";
}

function getRankLabel(points: number): string {
  if (points >= 5000) return "Master";
  if (points >= 2000) return "Blossom";
  if (points >= 800) return "Vine";
  if (points >= 200) return "Sprout";
  return "Seedling";
}

export default function LeaderboardScreen() {
  const { data: leaderboard = [], isLoading } = useGetLeaderboard();
  const { data: userProfile } = useGetCallerUserProfile();
  const { identity } = useInternetIdentity();

  const currentPrincipal = identity?.getPrincipal().toString();

  const getCharacterForEntry = (characterId?: string) => {
    if (!characterId) return null;
    return animeCharacters.find((c) => c.id === characterId) || null;
  };

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  const podiumOrder =
    top3.length >= 3
      ? [top3[1], top3[0], top3[2]]
      : top3.length === 2
        ? [top3[1], top3[0]]
        : top3;

  const podiumHeights =
    top3.length >= 3 ? ["h-24", "h-32", "h-20"] : ["h-28", "h-32"];

  const podiumRanks = top3.length >= 3 ? [2, 1, 3] : [2, 1];

  return (
    <div
      className="min-h-screen pb-28"
      style={{ background: "oklch(0.10 0.02 240)" }}
    >
      {/* Header */}
      <div
        className="backdrop-blur-md border-b px-4 py-5"
        style={{
          background: "oklch(0.10 0.02 240 / 0.9)",
          borderColor: "oklch(0.72 0.12 85 / 0.2)",
        }}
      >
        <div className="flex items-center gap-2">
          <Trophy
            className="w-6 h-6"
            style={{ color: "oklch(0.72 0.12 85)" }}
          />
          <h1 className="font-playfair text-xl font-bold text-gradient-gold">
            Leaderboard
          </h1>
        </div>
        <p className="text-cream/50 text-sm mt-1 font-nunito">
          Top plant explorers worldwide
        </p>
      </div>

      <div className="px-4 py-6">
        {isLoading ? (
          <div className="space-y-3">
            {["s1", "s2", "s3", "s4", "s5"].map((id) => (
              <div
                key={id}
                className="h-16 rounded-xl bg-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : leaderboard.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 gap-4"
            data-ocid="leaderboard.empty_state"
          >
            <Leaf
              className="w-14 h-14 animate-float"
              style={{ color: "oklch(0.65 0.18 145 / 0.4)" }}
            />
            <p className="text-cream/40 text-center font-nunito">
              No explorers yet.
              <br />
              Be the first to scan a plant!
            </p>
          </div>
        ) : (
          <>
            {/* Podium top 3 */}
            {top3.length > 0 && (
              <div className="flex items-end justify-center gap-3 mb-8 px-4">
                {podiumOrder.map((entry, i) => {
                  if (!entry) return null;
                  const rank = podiumRanks[i];
                  const principal = entry.principal?.toString() || "";
                  const pts = Number(entry.points || 0);
                  const isMe = principal === currentPrincipal;
                  const charId = isMe ? userProfile?.character?.id : undefined;
                  const character = getCharacterForEntry(charId);
                  const displayName =
                    isMe && userProfile?.name
                      ? userProfile.name
                      : `${principal.slice(0, 4)}...`;

                  const platformH = podiumHeights[i];
                  const medalColors = [
                    "oklch(0.75 0.01 0)",
                    "oklch(0.85 0.14 85)",
                    "oklch(0.6 0.10 50)",
                  ];
                  const medalColor = medalColors[i];

                  return (
                    <div
                      key={principal || i}
                      className="flex flex-col items-center gap-2 flex-1"
                    >
                      {/* Crown/Medal */}
                      {rank === 1 ? (
                        <Crown
                          className="w-6 h-6"
                          style={{ color: "oklch(0.85 0.14 85)" }}
                        />
                      ) : rank === 2 ? (
                        <Medal
                          className="w-5 h-5"
                          style={{ color: "oklch(0.75 0.01 0)" }}
                        />
                      ) : (
                        <Medal
                          className="w-4 h-4"
                          style={{ color: "oklch(0.6 0.10 50)" }}
                        />
                      )}

                      {/* Avatar */}
                      <div
                        className="w-14 h-14 rounded-full overflow-hidden border-2 flex items-center justify-center"
                        style={{
                          borderColor: medalColor,
                          boxShadow: `0 0 16px ${medalColor}66`,
                          background: character
                            ? `linear-gradient(135deg, ${character.primaryColor}33, ${character.secondaryColor}22)`
                            : "rgba(255,255,255,0.1)",
                        }}
                      >
                        {character?.imageUrl ? (
                          <img
                            src={character.imageUrl}
                            alt={character.name}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <Trophy
                            className="w-6 h-6"
                            style={{ color: medalColor }}
                          />
                        )}
                      </div>

                      <p className="text-center font-nunito font-semibold text-xs text-cream truncate w-full text-center">
                        {displayName}
                      </p>
                      <p
                        className="font-bold text-xs"
                        style={{ color: medalColor }}
                      >
                        {pts.toLocaleString()} pts
                      </p>

                      {/* Platform */}
                      <div
                        className={`w-full ${platformH} rounded-t-2xl flex items-center justify-center`}
                        style={{
                          background: `linear-gradient(180deg, ${medalColor}22, ${medalColor}11)`,
                          border: `1px solid ${medalColor}33`,
                        }}
                      >
                        <span
                          className="font-bold text-2xl font-playfair"
                          style={{ color: medalColor }}
                        >
                          #{rank}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Rest */}
            <div className="space-y-3">
              {rest.map((entry, index) => {
                const rank = index + 4;
                const principal = entry.principal?.toString() || "";
                const pts = Number(entry.points || 0);
                const isMe = principal === currentPrincipal;
                const charId = isMe ? userProfile?.character?.id : undefined;
                const character = getCharacterForEntry(charId);
                const displayName =
                  isMe && userProfile?.name
                    ? userProfile.name
                    : `${principal.slice(0, 6)}...${principal.slice(-4)}`;

                return (
                  <div
                    key={principal || index}
                    className="flex items-center gap-3 p-3 rounded-xl border transition-all"
                    style={{
                      background: isMe
                        ? "oklch(0.72 0.12 85 / 0.06)"
                        : "oklch(1 0 0 / 0.03)",
                      borderColor: isMe
                        ? "oklch(0.72 0.12 85 / 0.3)"
                        : "oklch(1 0 0 / 0.08)",
                    }}
                    data-ocid={`leaderboard.item.${index + 1}`}
                  >
                    <div className="w-8 flex items-center justify-center shrink-0">
                      <span
                        className="font-bold text-sm font-nunito"
                        style={{ color: "oklch(0.65 0.04 80 / 0.5)" }}
                      >
                        #{rank}
                      </span>
                    </div>

                    <div
                      className="w-10 h-10 rounded-full overflow-hidden border flex items-center justify-center shrink-0"
                      style={{
                        borderColor: "oklch(1 0 0 / 0.15)",
                        background: "oklch(1 0 0 / 0.06)",
                      }}
                    >
                      {character?.imageUrl ? (
                        <img
                          src={character.imageUrl}
                          alt={character.name}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <Star
                          className="w-4 h-4"
                          style={{ color: "oklch(0.72 0.12 85 / 0.5)" }}
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="font-semibold text-sm truncate font-nunito"
                        style={{
                          color: isMe
                            ? "oklch(0.72 0.12 85)"
                            : "oklch(0.95 0.02 80)",
                        }}
                      >
                        {displayName}
                        {isMe && (
                          <span
                            className="ml-1 text-xs"
                            style={{ color: "oklch(0.72 0.12 85 / 0.6)" }}
                          >
                            (you)
                          </span>
                        )}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-nunito font-semibold ${getRankClass(pts)}`}
                      >
                        {getRankLabel(pts)}
                      </span>
                    </div>

                    <div className="shrink-0 text-right">
                      <p
                        className="font-bold text-sm font-nunito"
                        style={{ color: "oklch(0.72 0.12 85)" }}
                      >
                        {pts.toLocaleString()}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "oklch(0.65 0.04 80 / 0.4)" }}
                      >
                        pts
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
