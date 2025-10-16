import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Resident, ResidentStats, GenderDistribution, HeightData, IResidentService } from '../types';
import { queryKeys } from '../lib/queryClient';

export const useResidentsQuery = (residentUrls: string[], residentService: IResidentService) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.residents(residentUrls),
    queryFn: () => residentService.getMultipleResidents(residentUrls),
    enabled: residentUrls.length > 0,
    staleTime: 1000 * 60 * 10, // 10 minutes - residents change less frequently
    gcTime: 1000 * 60 * 15, // 15 minutes
  });

  // Calculate statistics when data is available
  const stats: ResidentStats | null = query.data ? calculateStats(query.data) : null;

  // Additional utility functions
  const invalidateResidents = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.residents(residentUrls) });
  };

  const refetchResidents = () => {
    return query.refetch();
  };

  const prefetchResidents = () => {
    if (residentUrls.length === 0) return Promise.resolve();
    
    return queryClient.prefetchQuery({
      queryKey: queryKeys.residents(residentUrls),
      queryFn: () => residentService.getMultipleResidents(residentUrls),
    });
  };

  return {
    residents: query.data || [],
    loading: query.isLoading,
    error: query.error?.message || null,
    isError: query.isError,
    isFetching: query.isFetching,
    isRefetching: query.isRefetching,
    stats,
    invalidateResidents,
    refetchResidents,
    prefetchResidents,
  };
};

// Statistics calculation function (same as before)
const calculateStats = (residents: Resident[]): ResidentStats => {
  if (residents.length === 0) {
    return {
      averageHeight: 0,
      averageMass: 0,
      genderDistribution: [],
      heightData: []
    };
  }

  // Calculate average height
  const validHeights = residents
    .map(r => parseFloat(r.height))
    .filter(h => !isNaN(h));
  const averageHeight = validHeights.length > 0 
    ? Math.round(validHeights.reduce((sum, h) => sum + h, 0) / validHeights.length)
    : 0;

  // Calculate average mass
  const validMasses = residents
    .map(r => parseFloat(r.mass.replace(/,/g, '')))
    .filter(m => !isNaN(m));
  const averageMass = validMasses.length > 0
    ? Math.round(validMasses.reduce((sum, m) => sum + m, 0) / validMasses.length)
    : 0;

  // Calculate gender distribution
  const genderCounts = residents.reduce((acc, resident) => {
    const gender = resident.gender === 'n/a' ? 'Unknown' : resident.gender;
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const genderDistribution: GenderDistribution[] = Object.entries(genderCounts).map(([gender, count]) => ({
    gender: gender.charAt(0).toUpperCase() + gender.slice(1),
    count,
    percentage: Math.round((count / residents.length) * 100)
  }));

  // Prepare height data for chart
  const heightData: HeightData[] = residents
    .filter(r => !isNaN(parseFloat(r.height)))
    .map(r => ({
      name: r.name,
      height: parseFloat(r.height)
    }))
    .sort((a, b) => b.height - a.height); // Sort by height descending

  return {
    averageHeight,
    averageMass,
    genderDistribution,
    heightData
  };
};