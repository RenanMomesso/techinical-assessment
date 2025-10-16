import React from 'react';
import { Planet } from '../types';

interface FavoriteButtonProps {
  planet: Planet;
  isFavorite: boolean;
  onToggleFavorite: (planet: Planet) => void;
  size?: 'small' | 'medium' | 'large';
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  planet,
  isFavorite,
  onToggleFavorite,
  size = 'medium'
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    onToggleFavorite(planet);
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'favorite-button-small';
      case 'large': return 'favorite-button-large';
      default: return 'favorite-button-medium';
    }
  };

  return (
    <button
      className={`favorite-button ${getSizeClass()} ${isFavorite ? 'favorite-active' : ''}`}
      onClick={handleClick}
      title={isFavorite ? `Remove ${planet.name} from favorites` : `Add ${planet.name} to favorites`}
      aria-label={isFavorite ? `Remove ${planet.name} from favorites` : `Add ${planet.name} to favorites`}
    >
      {isFavorite ? '★' : '☆'}
    </button>
  );
};