import { Planet, SWAPIResponse, IPlanetService } from '../types';

const baseUrl = 'https://swapi.dev/api';

const fetchAllPlanets = async (): Promise<Planet[]> => {
  const allPlanets: Planet[] = [];
  let nextUrl: string | null = `${baseUrl}/planets/`;

  try {
    while (nextUrl) {
      const response = await fetch(nextUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: SWAPIResponse<Planet> = await response.json();
      allPlanets.push(...data.results);
      nextUrl = data.next;
    }
    
    return allPlanets;
  } catch (error) {
    console.error('Error fetching planets:', error);
    throw new Error('Failed to fetch planets');
  }
};

export const planetService: IPlanetService = {
  getAllPlanets: fetchAllPlanets
};