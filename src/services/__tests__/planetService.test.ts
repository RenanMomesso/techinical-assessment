import { planetService } from '../planetService';
import { Planet } from '../../types';

// Mock fetch
global.fetch = jest.fn();
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('planetService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllPlanets', () => {
    it('fetches planets successfully', async () => {
      const mockPlanets: Planet[] = [
        {
          name: 'Tatooine',
          climate: 'arid',
          terrain: 'desert',
          population: '200000',
          diameter: '10465',
          residents: ['https://swapi.dev/api/people/1/'],
          url: 'https://swapi.dev/api/planets/1/'
        },
        {
          name: 'Alderaan',
          climate: 'temperate',
          terrain: 'grasslands, mountains',
          population: '2000000000',
          diameter: '12500',
          residents: [],
          url: 'https://swapi.dev/api/planets/2/'
        }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ results: mockPlanets, next: null })
      } as Response);

      const result = await planetService.getAllPlanets();

      expect(mockFetch).toHaveBeenCalledWith('https://swapi.dev/api/planets/');
      expect(result).toEqual(mockPlanets);
    });

    it('handles pagination by fetching all pages', async () => {
      const firstPagePlanets: Planet[] = [
        {
          name: 'Tatooine',
          climate: 'arid',
          terrain: 'desert',
          population: '200000',
          diameter: '10465',
          residents: [],
          url: 'https://swapi.dev/api/planets/1/'
        }
      ];

      const secondPagePlanets: Planet[] = [
        {
          name: 'Alderaan',
          climate: 'temperate',
          terrain: 'grasslands',
          population: '2000000000',
          diameter: '12500',
          residents: [],
          url: 'https://swapi.dev/api/planets/2/'
        }
      ];

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ 
            results: firstPagePlanets, 
            next: 'https://swapi.dev/api/planets/?page=2' 
          })
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ 
            results: secondPagePlanets, 
            next: null 
          })
        } as Response);

      const result = await planetService.getAllPlanets();

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result).toEqual([...firstPagePlanets, ...secondPagePlanets]);
    });

    it('throws error when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      } as Response);

      await expect(planetService.getAllPlanets()).rejects.toThrow('Failed to fetch planets');
    });
  });
});