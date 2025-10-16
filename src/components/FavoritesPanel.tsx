import React, { useState } from 'react';
import { Planet } from '../types';

interface FavoritesPanelProps {
  favoritePlanets: Planet[];
  onPlanetClick: (planet: Planet) => void;
  onRemoveFromFavorites: (planetName: string) => void;
  onClearFavorites: () => void;
}

export const FavoritesPanel: React.FC<FavoritesPanelProps> = ({
  favoritePlanets,
  onPlanetClick,
  onRemoveFromFavorites,
  onClearFavorites
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (favoritePlanets.length === 0) {
    return (
      <div className="favorites-panel empty">
        <div className="favorites-header">
          <h3>⭐ Favorite Planets</h3>
        </div>
        <p className="no-favorites">No favorite planets yet. Click the ★ icon on any planet to add it to your favorites!</p>
      </div>
    );
  }

  return (
    <div className="favorites-panel">
      <div className="favorites-header">
        <h3>⭐ Favorite Planets ({favoritePlanets.length})</h3>
        <div className="favorites-controls">
          <button
            className="toggle-favorites-button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse favorites' : 'Expand favorites'}
          >
            {isExpanded ? '▼' : '▲'}
          </button>
          <button
            className="clear-favorites-button"
            onClick={onClearFavorites}
            title="Clear all favorites"
          >
            🗑️
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="favorites-list">
          {favoritePlanets.map((planet) => (
            <div key={planet.url} className="favorite-item">
              <button
                className="favorite-planet-button"
                onClick={() => onPlanetClick(planet)}
                title={`View details for ${planet.name}`}
              >
                <span className="favorite-planet-name">{planet.name}</span>
                <span className="favorite-planet-info">
                  {planet.climate} • {planet.residents.length} residents
                </span>
              </button>
              <button
                className="remove-favorite-button"
                onClick={() => onRemoveFromFavorites(planet.name)}
                title={`Remove ${planet.name} from favorites`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};