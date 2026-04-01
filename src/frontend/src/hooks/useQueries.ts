import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AnimeCharacter,
  PlantIdentification,
  UserProfile,
} from "../backend";
import { useActor } from "./useActor";

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useUpdateDisplayName() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newName: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateDisplayName(newName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}

export function useSelectCharacter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (character: AnimeCharacter) => {
      if (!actor) throw new Error("Actor not available");
      return actor.selectCharacter(character);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
      queryClient.invalidateQueries({ queryKey: ["characterCache"] });
    },
  });
}

export function useGetPoints() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ["points"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getPoints();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetDiscoveries() {
  const { actor, isFetching } = useActor();

  return useQuery<PlantIdentification[]>({
    queryKey: ["discoveries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDiscoveries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddIdentification() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (identification: PlantIdentification) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addIdentification(identification);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["points"] });
      queryClient.invalidateQueries({ queryKey: ["discoveries"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}

export function useGetLeaderboard() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      if (!actor) return [];
      const entries = await actor.getLeaderboard();
      const enriched = await Promise.all(
        entries.map(async ([principal, points]) => {
          try {
            const profile = await actor.getUserProfile(principal);
            return {
              principal,
              points,
              profile: profile ?? null,
            };
          } catch {
            return { principal, points, profile: null };
          }
        }),
      );
      return enriched;
    },
    enabled: !!actor && !isFetching,
  });
}
