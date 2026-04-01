import { BookOpen, Calendar, Leaf, Sparkles, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { plantDatabase } from "../data/plantDatabase";
import {
  useGetCallerUserProfile,
  useGetDiscoveries,
} from "../hooks/useQueries";

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

export default function DiscoveriesList() {
  const { data: discoveries, isLoading } = useGetDiscoveries();
  const { data: userProfile } = useGetCallerUserProfile();

  const points = userProfile ? Number(userProfile.points) : 0;
  const discoveryCount = discoveries?.length ?? 0;

  const animatedPoints = useCountUp(points);
  const animatedDiscoveries = useCountUp(discoveryCount);

  const getPlantInfo = (plantName: string) => {
    return (
      plantDatabase.find(
        (p) => p.name.toLowerCase() === plantName.toLowerCase(),
      ) ?? null
    );
  };

  return (
    <div
      className="min-h-screen overflow-y-auto pb-24"
      style={{ background: "var(--forest-dark)" }}
    >
      {/* Header */}
      <div className="relative pt-12 pb-6 px-6">
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-green-500/20 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-green-400" />
            <span className="text-green-400 text-xs font-semibold tracking-widest uppercase">
              My Collection
            </span>
          </div>
          <h1 className="font-playfair text-3xl font-bold text-cream-light">
            Plant Journal
          </h1>
          <p className="text-cream-light/40 text-sm mt-1">
            Your botanical discoveries
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card rounded-2xl p-4 border border-gold-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-gold-primary" />
              <span className="text-cream-light/50 text-xs font-semibold uppercase tracking-wide">
                Total Points
              </span>
            </div>
            <p className="text-3xl font-bold font-orbitron text-gold-primary">
              {animatedPoints.toLocaleString()}
            </p>
          </div>
          <div className="glass-card rounded-2xl p-4 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-4 h-4 text-green-400" />
              <span className="text-cream-light/50 text-xs font-semibold uppercase tracking-wide">
                Discovered
              </span>
            </div>
            <p className="text-3xl font-bold font-orbitron text-green-400">
              {animatedDiscoveries}
            </p>
          </div>
        </div>
      </div>

      {/* Discoveries */}
      <div className="px-4">
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass-card rounded-2xl h-24 animate-pulse"
              />
            ))}
          </div>
        )}

        {!isLoading && (!discoveries || discoveries.length === 0) && (
          <div className="glass-card rounded-3xl p-10 text-center">
            <img
              src="/assets/generated/empty-state-illustration.dim_400x300.png"
              alt="No discoveries"
              className="w-40 h-auto mx-auto mb-4 opacity-60"
            />
            <h3 className="font-playfair text-cream-light/60 text-xl mb-2">
              No plants yet
            </h3>
            <p className="text-cream-light/30 text-sm">
              Use the camera to scan your first plant and start your collection!
            </p>
          </div>
        )}

        {!isLoading && discoveries && discoveries.length > 0 && (
          <div className="space-y-3">
            {discoveries.map((discovery, index) => {
              const info = getPlantInfo(discovery.plantName);
              const date = new Date(Number(discovery.identificationDate));
              const dateStr = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });

              return (
                <div
                  key={`${discovery.plantName}-${index}`}
                  className="glass-card rounded-2xl p-4 flex items-center gap-4 hover:scale-[1.01] transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Plant emoji/icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{
                      background: info
                        ? `${info.accentColor}22`
                        : "oklch(0.20 0.04 145 / 0.3)",
                      border: `1px solid ${info?.accentColor ?? "oklch(0.45 0.14 145)"}44`,
                    }}
                  >
                    {info?.emoji ?? "🌿"}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-cream-light font-bold truncate">
                      {discovery.plantName}
                    </p>
                    {info && (
                      <p className="text-cream-light/40 text-xs truncate">
                        {info.scientificName}
                      </p>
                    )}
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar className="w-2.5 h-2.5 text-cream-light/30" />
                      <span className="text-cream-light/30 text-xs">
                        {dateStr}
                      </span>
                    </div>
                  </div>

                  {/* Points badge */}
                  <div className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-primary/15 border border-gold-primary/25">
                    <Sparkles className="w-2.5 h-2.5 text-gold-primary" />
                    <span className="text-gold-primary text-xs font-bold">
                      +10
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
