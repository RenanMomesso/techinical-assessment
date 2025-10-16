import { useQuery } from '@tanstack/react-query';
import { IPlanetService } from '../types';
import { queryKeys } from '../lib/queryClient';

export const usePlanetsQuery = (planetService: IPlanetService) => {
  const query = useQuery({
    queryKey: queryKeys.planets,
    queryFn: planetService.getAllPlanets,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    planets: query.data || [],
    loading: query.isLoading,
    error: query.error?.message || null,
  };
};