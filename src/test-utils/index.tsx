import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Planet, Resident } from '../types';

// Create a fresh QueryClient for each test
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

// Custom render function with QueryClient provider
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
}

export const renderWithQueryClient = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { queryClient = createTestQueryClient(), ...renderOptions } = options;

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient,
  };
};

// Mock data generators
export const createMockPlanet = (overrides: Partial<Planet> = {}): Planet => ({
  name: 'Tatooine',
  climate: 'arid',
  terrain: 'desert',
  population: '200000',
  residents: ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/'],
  diameter: '10465',
  url: 'https://swapi.dev/api/planets/1/',
  ...overrides,
});

export const createMockResident = (overrides: Partial<Resident> = {}): Resident => ({
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
  ...overrides,
});

export const createMockPlanets = (count: number = 3): Planet[] => 
  Array.from({ length: count }, (_, index) => 
    createMockPlanet({
      name: `Planet ${index + 1}`,
      url: `https://swapi.dev/api/planets/${index + 1}/`,
      population: `${(index + 1) * 100000}`,
    })
  );

export const createMockResidents = (count: number = 3): Resident[] =>
  Array.from({ length: count }, (_, index) =>
    createMockResident({
      name: `Resident ${index + 1}`,
      url: `https://swapi.dev/api/people/${index + 1}/`,
      height: `${170 + index * 5}`,
      mass: `${70 + index * 5}`,
    })
  );

// Mock service functions
export const createMockPlanetService = (planets: Planet[] = createMockPlanets()) => ({
  getAllPlanets: jest.fn().mockResolvedValue(planets),
  invalidatePlanets: jest.fn().mockResolvedValue(undefined),
  prefetchPlanets: jest.fn().mockResolvedValue(undefined),
  getCachedPlanets: jest.fn().mockReturnValue(planets),
});

export const createMockResidentService = (residents: Resident[] = createMockResidents()) => ({
  getResident: jest.fn().mockImplementation((url: string) => 
    Promise.resolve(residents.find(r => r.url === url) || residents[0])
  ),
  getMultipleResidents: jest.fn().mockResolvedValue(residents),
  invalidateResident: jest.fn().mockResolvedValue(undefined),
  invalidateResidents: jest.fn().mockResolvedValue(undefined),
  prefetchResident: jest.fn().mockResolvedValue(undefined),
  prefetchResidents: jest.fn().mockResolvedValue(undefined),
  getCachedResident: jest.fn().mockReturnValue(residents[0]),
  getCachedResidents: jest.fn().mockReturnValue(residents),
});

// Common test assertions
export const expectToBeInDocument = (element: HTMLElement | null) => {
  expect(element).toBeInTheDocument();
};

export const expectToHaveClass = (element: HTMLElement, className: string) => {
  expect(element).toHaveClass(className);
};

export const expectToHaveTextContent = (element: HTMLElement, text: string) => {
  expect(element).toHaveTextContent(text);
};