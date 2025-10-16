import { residentService } from '../residentService';
import { Resident } from '../../types';

// Mock fetch
global.fetch = jest.fn();
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('residentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getResident', () => {
    it('fetches resident successfully', async () => {
      const mockResident: Resident = {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        birth_year: '19BBY',
        gender: 'male',
        url: 'https://swapi.dev/api/people/1/'
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResident
      } as Response);

      const result = await residentService.getResident('https://swapi.dev/api/people/1/');

      expect(mockFetch).toHaveBeenCalledWith('https://swapi.dev/api/people/1/');
      expect(result).toEqual(mockResident);
    });

    it('throws error when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      } as Response);

      await expect(residentService.getResident('https://swapi.dev/api/people/999/'))
        .rejects.toThrow('Failed to fetch resident');
    });
  });

  describe('getResidents', () => {
    it('fetches multiple residents successfully', async () => {
      const mockResident: Resident = {
        name: 'Leia Organa',
        height: '150',
        mass: '49',
        birth_year: '19BBY',
        gender: 'female',
        url: 'https://swapi.dev/api/people/5/'
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResident
      } as Response);

      const urls = ['https://swapi.dev/api/people/5/', 'https://swapi.dev/api/people/6/'];
      const result = await residentService.getMultipleResidents(urls);

      expect(result).toHaveLength(2);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });
});