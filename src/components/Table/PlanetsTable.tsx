import React from 'react';
import { Planet, SortConfig, TableColumn } from '../../types';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { Pagination } from './Pagination';

interface PlanetsTableProps {
  planets: Planet[];
  currentPage: number;
  totalPages: number;
  sortConfig: SortConfig | null;
  onPageChange: (page: number) => void;
  onSort: (key: keyof Planet | 'residentCount') => void;
  onPlanetClick: (planet: Planet) => void;
  isFavorite: (planetName: string) => boolean;
  onToggleFavorite: (planet: Planet) => void;
}

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'climate', label: 'Climate', sortable: false },
  { key: 'terrain', label: 'Terrain', sortable: false },
  { key: 'population', label: 'Population', sortable: true },
  { key: 'residentCount', label: 'Known Residents', sortable: true }
];

export const PlanetsTable: React.FC<PlanetsTableProps> = ({
  planets,
  currentPage,
  totalPages,
  sortConfig,
  onPageChange,
  onSort,
  onPlanetClick,
  isFavorite,
  onToggleFavorite
}) => {
  if (planets.length === 0) {
    return (
      <div className="no-results">
        <p>No planets found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="planets-table-container">
      <div className="table-wrapper">
        <table className="planets-table">
          <TableHeader 
            columns={columns}
            sortConfig={sortConfig}
            onSort={onSort}
          />
          <tbody>
            {planets.map((planet) => (
              <TableRow 
                key={planet.url}
                planet={planet}
                onPlanetClick={onPlanetClick}
                isFavorite={isFavorite(planet.name)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};