import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteButton } from '../FavoriteButton';
import { createMockPlanet } from '../../test-utils';

describe('FavoriteButton', () => {
  const mockPlanet = createMockPlanet();
  const mockOnToggleFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with star outline when not favorite', () => {
    render(
      <FavoriteButton
        planet={mockPlanet}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('☆');
  });

  it('renders with filled star when favorite', () => {
    render(
      <FavoriteButton
        planet={mockPlanet}
        isFavorite={true}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('★');
  });

  it('calls onToggleFavorite when clicked', () => {
    render(
      <FavoriteButton
        planet={mockPlanet}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnToggleFavorite).toHaveBeenCalledWith(mockPlanet);
  });
});