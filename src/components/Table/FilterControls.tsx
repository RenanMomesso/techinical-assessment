import React from 'react';
import { FilterConfig } from '../../types';

interface FilterControlsProps {
  filterConfig: FilterConfig;
  onFilterChange: (filterConfig: FilterConfig) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filterConfig,
  onFilterChange
}) => {
  const handleClimateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filterConfig,
      climate: event.target.value
    });
  };

  const handleTerrainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filterConfig,
      terrain: event.target.value
    });
  };

  const clearFilters = () => {
    onFilterChange({ climate: '', terrain: '' });
  };

  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label htmlFor="climate-filter">Filter by Climate:</label>
        <input
          id="climate-filter"
          type="text"
          placeholder="e.g., temperate, arid..."
          value={filterConfig.climate}
          onChange={handleClimateChange}
        />
      </div>
      
      <div className="filter-group">
        <label htmlFor="terrain-filter">Filter by Terrain:</label>
        <input
          id="terrain-filter"
          type="text"
          placeholder="e.g., desert, ocean..."
          value={filterConfig.terrain}
          onChange={handleTerrainChange}
        />
      </div>
      
      <button 
        className="clear-filters-btn"
        onClick={clearFilters}
        disabled={!filterConfig.climate && !filterConfig.terrain}
      >
        Clear Filters
      </button>
    </div>
  );
};