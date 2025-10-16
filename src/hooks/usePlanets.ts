import { useState, useEffect } from 'react';
import { Planet, UsePlanetsResult, IPlanetService } from '../types';

export const usePlanets = (planetService: IPlanetService): UsePlanetsResult => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        setLoading(true);
        setError(null);
        const planetsData = await planetService.getAllPlanets();
        setPlanets(planetsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, [planetService]);

  return { planets, loading, error };
};