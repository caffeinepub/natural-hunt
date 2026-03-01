import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { PlantIdentification, UserProfile, AnimeCharacter } from '../backend';
import { animeCharacters } from '../data/animeCharacters';

// Local storage fallback for anonymous users
const LOCAL_POINTS_KEY = 'natural_hunt_points';
const LOCAL_DISCOVERIES_KEY = 'natural_hunt_discoveries';

function getLocalPoints(): number {
  try {
    return parseInt(localStorage.getItem(LOCAL_POINTS_KEY) || '0', 10);
  } catch {
    return 0;
  }
}

function getLocalDiscoveries(): PlantIdentification[] {
  try {
    const raw = localStorage.getItem(LOCAL_DISCOVERIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalPoints(points: number): void {
  try {
    localStorage.setItem(LOCAL_POINTS_KEY, points.toString());
  } catch {
    // ignore
  }
}

function saveLocalDiscoveries(discoveries: PlantIdentification[]): void {
  try {
    localStorage.setItem(LOCAL_DISCOVERIES_KEY, JSON.stringify(discoveries));
  } catch {
    // ignore
  }
}

export function useGetPoints() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<number>({
    queryKey: ['points'],
    queryFn: async () => {
      if (!actor) return getLocalPoints();
      try {
        const pts = await actor.getPoints();
        return Number(pts);
      } catch {
        return getLocalPoints();
      }
    },
    enabled: !actorFetching,
    staleTime: 30_000,
  });
}

export function useGetDiscoveries() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<PlantIdentification[]>({
    queryKey: ['discoveries'],
    queryFn: async () => {
      if (!actor) return getLocalDiscoveries();
      try {
        return await actor.getDiscoveries();
      } catch {
        return getLocalDiscoveries();
      }
    },
    enabled: !actorFetching,
    staleTime: 30_000,
  });
}

export function useAddIdentification() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (identification: PlantIdentification) => {
      if (!actor) throw new Error('Actor not available');
      try {
        await actor.addIdentification(identification);
      } catch {
        // Fallback to local storage for anonymous users
        const discoveries = getLocalDiscoveries();
        discoveries.unshift(identification);
        saveLocalDiscoveries(discoveries);

        const currentPoints = getLocalPoints();
        saveLocalPoints(currentPoints + 10);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['points'] });
      queryClient.invalidateQueries({ queryKey: ['discoveries'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    },
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.getCallerUserProfile();
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        // If unauthorized (guest/anonymous), return null to show sign-up
        if (message.includes('Unauthorized') || message.includes('trap')) {
          return null;
        }
        throw err;
      }
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

export function useSaveUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available. Please wait for initialization.');
      try {
        await actor.saveCallerUserProfile(profile);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        if (message.includes('Unauthorized')) {
          throw new Error('You must be logged in to save a profile.');
        }
        throw new Error(`Failed to save profile: ${message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
    onError: () => {
      // Error is handled in the component via mutation.error
    },
  });
}

export function useSelectCharacter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (character: AnimeCharacter) => {
      if (!actor) throw new Error('Actor not available.');
      try {
        await actor.selectCharacter(character);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        throw new Error(`Failed to select character: ${message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export type LeaderboardEntry = {
  principal: string;
  points: number;
  profile: {
    name: string;
    character: AnimeCharacter | null;
  } | null;
};

export function useGetLeaderboard() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Array<[{ toString(): string }, bigint, { name: string; character: AnimeCharacter | null } | null]>>({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const raw = await actor.getLeaderboard();
        // Enrich with user profiles
        const enriched = await Promise.all(
          raw.map(async ([principal, points]) => {
            let profile: { name: string; character: AnimeCharacter | null } | null = null;
            try {
              const userProfile = await actor.getUserProfile(principal);
              if (userProfile) {
                profile = {
                  name: userProfile.name,
                  character: userProfile.character ?? null,
                };
              }
            } catch {
              // profile not available
            }
            return [principal, points, profile] as [typeof principal, bigint, typeof profile];
          })
        );
        return enriched;
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching,
    staleTime: 60_000,
  });
}
