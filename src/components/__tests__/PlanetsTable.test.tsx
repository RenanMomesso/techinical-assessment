import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { PlanetsTable } from '../Table/PlanetsTable';
import { renderWithQueryClient, createMockPlanet } from '../../test-utils';

describe('PlanetsTable', () => {
  const mockPlanets = [
    createMockPlanet({ 
      name: 'Tatooine', 
      climate: 'arid',
      terrain: 'desert',
      population: '200000',
      url: 'https://swapi.dev/api/planets/1/',
      residents: ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/']
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

  const defaultProps = {
    planets: mockPlanets,
    currentPage: 1,
    totalPages: 3,
    sortConfig: { key: 'name' as const, direction: 'asc' as const },
    onPageChange: jest.fn(),
    onSort: jest.fn(),
    onPlanetClick: jest.fn(),
    isFavorite: jest.fn().mockReturnValue(false),
    onToggleFavorite: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders table with planets data', () => {
    renderWithQueryClient(<PlanetsTable {...defaultProps} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Alderaan')).toBeInTheDocument();
  });

  it('displays table headers', () => {
    renderWithQueryClient(<PlanetsTable {...defaultProps} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Climate')).toBeInTheDocument();
    expect(screen.getByText('Terrain')).toBeInTheDocument();
    expect(screen.getByText('Population')).toBeInTheDocument();
    expect(screen.getByText('Known Residents')).toBeInTheDocument();
  });

  it('handles sort when clicking headers', () => {
    renderWithQueryClient(<PlanetsTable {...defaultProps} />);

    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);

    expect(defaultProps.onSort).toHaveBeenCalledWith('name');
  });

  it('handles page navigation', () => {
    renderWithQueryClient(<PlanetsTable {...defaultProps} />);

    const nextPageButton = screen.getByLabelText('Go to page 2');
    fireEvent.click(nextPageButton);

    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('shows empty state when no planets', () => {
    const emptyProps = {
      ...defaultProps,
      planets: []
    };

    renderWithQueryClient(<PlanetsTable {...emptyProps} />);

    expect(screen.getByText('No planets found matching your criteria.')).toBeInTheDocument();
  });

  it('handles planet click', () => {
    renderWithQueryClient(<PlanetsTable {...defaultProps} />);

    const tatooineText = screen.getByText('Tatooine');
    fireEvent.click(tatooineText);

    expect(defaultProps.onPlanetClick).toHaveBeenCalledWith(mockPlanets[0]);
  });
});