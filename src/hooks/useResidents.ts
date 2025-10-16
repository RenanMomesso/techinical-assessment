import { useState, useEffect } from 'react';
import { Resident, ResidentStats, GenderDistribution, HeightData, IResidentService } from '../types';

export const useResidents = (residentUrls: string[], residentService: IResidentService) => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ResidentStats | null>(null);

  useEffect(() => {
    if (residentUrls.length === 0) {
      setResidents([]);
      setStats(null);
      return;
    }

    const fetchResidents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const residentsData = await residentService.getMultipleResidents(residentUrls);
        setResidents(residentsData);
        
        // Calculate statistics
        const calculatedStats = calculateStats(residentsData);
        setStats(calculatedStats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, [residentUrls, residentService]);

  return { residents, loading, error, stats };
};

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