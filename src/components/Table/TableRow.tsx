import React from 'react';
import { Planet } from '../../types';
import { FavoriteButton } from '../FavoriteButton';

interface TableRowProps {
  planet: Planet;
  onPlanetClick: (planet: Planet) => void;
  isFavorite: boolean;
  onToggleFavorite: (planet: Planet) => void;
}

export const TableRow: React.FC<TableRowProps> = ({ 
  planet, 
  onPlanetClick, 
  isFavorite, 
  onToggleFavorite 
}) => {
  const formatPopulation = (population: string): string => {
    if (population === 'unknown') return 'Unknown';
    const num = parseInt(population.replace(/,/g, ''), 10);
    if (isNaN(num)) return population;
    return num.toLocaleString();
  };

  return (
    <tr>
      <td className="planet-name">
        <div className="planet-name-container">
          <button 
            className="planet-name-button"
            onClick={() => onPlanetClick(planet)}
            title={`View details for ${planet.name}`}
          >
            {planet.name}
          </button>
          <FavoriteButton
            planet={planet}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
            size="small"
          />
        </div>
      </td>
      <td className="planet-climate">{planet.climate}</td>
      <td className="planet-terrain">{planet.terrain}</td>
      <td className="planet-population">{formatPopulation(planet.population)}</td>
      <td className="planet-residents">{planet.residents.length}</td>
    </tr>
  );
};