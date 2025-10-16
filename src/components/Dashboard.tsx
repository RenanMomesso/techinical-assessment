import React, { useMemo } from 'react';
import { useQueryState, parseAsString } from 'nuqs';
import { usePlanetsQuery } from '../hooks/usePlanetsQuery';
import { useTable } from '../hooks/useTable';
import { useFavorites } from '../hooks/useFavorites';
import { IPlanetService } from '../types';
import { Planet } from '../types';
import { PlanetsTable } from './Table/PlanetsTable';
import { FilterControls } from './Table/FilterControls';
import { FavoritesPanel } from './FavoritesPanel';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { PlanetDetailModal } from './Modal/PlanetDetailModal';
import { residentService } from '../services/residentService';

interface DashboardProps {
  planetService: IPlanetService;
}

export const Dashboard: React.FC<DashboardProps> = ({ planetService }) => {
  const { planets, loading, error } = usePlanetsQuery(planetService);
  
  // URL-synchronized modal state
  const [selectedPlanetName, setSelectedPlanetName] = useQueryState('planet', parseAsString);
  
  // Find the selected planet based on the URL parameter
  const selectedPlanet = useMemo(() => {
    if (!selectedPlanetName) return null;
    return planets.find(planet => planet.name === selectedPlanetName) || null;
  }, [selectedPlanetName, planets]);
  
  const isModalOpen = selectedPlanet !== null;

  const {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    getFavoritePlanets,
    removeFromFavorites
  } = useFavorites();
  
  const {
    currentPageData,
    currentPage,
    totalPages,
    sortConfig,
    filterConfig,
    setCurrentPage,
    handleSort,
    handleFilter
  } = useTable(planets);

  const handlePlanetClick = (planet: Planet) => {
    setSelectedPlanetName(planet.name);
  };

  const handleModalClose = () => {
    setSelectedPlanetName(null);
  };

  const favoritePlanets = getFavoritePlanets(planets);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🌌 Star Wars Planets & Residents Dashboard</h1>
        <p>Explore the diverse worlds of the Star Wars galaxy</p>
        <div className="stats">
          <span className="stat">
            <strong>{planets.length}</strong> Total Planets
          </span>
          <span className="stat">
            <strong>{planets.reduce((sum: number, planet: Planet) => sum + planet.residents.length, 0)}</strong> Total Residents
          </span>
          <span className="stat">
            <strong>{favorites.length}</strong> Favorites
          </span>
        </div>
      </header>

      <main className="dashboard-content">
        <FavoritesPanel
          favoritePlanets={favoritePlanets}
          onPlanetClick={handlePlanetClick}
          onRemoveFromFavorites={removeFromFavorites}
          onClearFavorites={clearFavorites}
        />
        
        <FilterControls 
          filterConfig={filterConfig}
          onFilterChange={handleFilter}
        />
        
        <PlanetsTable
          planets={currentPageData}
          currentPage={currentPage}
          totalPages={totalPages}
          sortConfig={sortConfig}
          onPageChange={setCurrentPage}
          onSort={handleSort}
          onPlanetClick={handlePlanetClick}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      </main>

      <PlanetDetailModal
        planet={selectedPlanet}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        residentService={residentService}
      />
    </div>
  );
};