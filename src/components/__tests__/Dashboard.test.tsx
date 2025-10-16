import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Dashboard } from '../Dashboard';
import { renderWithQueryClient, createMockPlanet, createMockPlanetService } from '../../test-utils';
import { usePlanetsQuery } from '../../hooks/usePlanetsQuery';

jest.mock('../../hooks/usePlanetsQuery', () => ({
  usePlanetsQuery: jest.fn()
}));

const mockUsePlanetsQuery = usePlanetsQuery as jest.MockedFunction<typeof usePlanetsQuery>;

describe('Dashboard', () => {
  const mockPlanets = [
    createMockPlanet({ 
      name: 'Tatooine', 
      climate: 'arid',
      terrain: 'desert',
      population: '200000',
      url: 'https://swapi.dev/api/planets/1/',
      residents: ['https://swapi.dev/api/people/1/']
    }),
    createMockPlanet({
      name: 'Alderaan',
      climate: 'temperate',
      terrain: 'grasslands, mountains',
      population: '2000000000',
      url: 'https://swapi.dev/api/planets/2/',
      residents: []
    })
  ];

  const mockPlanetService = createMockPlanetService();

  const mockCacheManagement = {
    clearAllCache: jest.fn(),
    invalidateAllPlanets: jest.fn(),
    invalidateAllResidents: jest.fn(),
    prefetchPlanet: jest.fn(),
    getCacheStats: jest.fn().mockReturnValue({
      totalQueries: 5,
      planetsQueries: 2,
      residentsQueries: 3,
      residentQueries: 5,
      staleQueries: 1
    }),
    removeQueryFromCache: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUsePlanetsQuery.mockReturnValue({
      planets: mockPlanets,
      loading: false,
      error: null,
      isError: false,
      isFetching: false,
      isRefetching: false,
      invalidatePlanets: jest.fn(),
      refetchPlanets: jest.fn(),
      prefetchPlanets: jest.fn()
    });

    mockUseCacheManagement.mockReturnValue(mockCacheManagement);

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue('[]'),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
      },
      writable: true
    });
  });

  it('renders dashboard with planets table', () => {
    renderWithQueryClient(<Dashboard planetService={mockPlanetService} />);

    expect(screen.getByText('🌌 Star Wars Planets & Residents Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Alderaan')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    mockUsePlanetsQuery.mockReturnValue({
      planets: [],
      loading: true,
      error: null,
      isError: false,
      isFetching: true,
      isRefetching: false,
      invalidatePlanets: jest.fn(),
      refetchPlanets: jest.fn(),
      prefetchPlanets: jest.fn()
    });

    renderWithQueryClient(<Dashboard planetService={mockPlanetService} />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('displays error state', () => {
    mockUsePlanetsQuery.mockReturnValue({
      planets: [],
      loading: false,
      error: 'Failed to fetch planets',
      isError: true,
      isFetching: false,
      isRefetching: false,
      invalidatePlanets: jest.fn(),
      refetchPlanets: jest.fn(),
      prefetchPlanets: jest.fn()
    });

    renderWithQueryClient(<Dashboard planetService={mockPlanetService} />);

    expect(screen.getByText('Failed to fetch planets')).toBeInTheDocument();
  });

  it('opens planet detail modal when planet is clicked', () => {
    renderWithQueryClient(<Dashboard planetService={mockPlanetService} />);

    const tatooineText = screen.getByText('Tatooine');
    fireEvent.click(tatooineText);

    expect(screen.getByText('Planet Details')).toBeInTheDocument();
  });
});