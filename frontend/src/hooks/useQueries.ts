import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { PlantIdentification, UserProfile } from '../backend';

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
      } catch {
        return null;
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
      if (!actor) throw new Error('Actor not available');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
