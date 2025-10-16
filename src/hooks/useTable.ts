import { useMemo } from 'react';
import { useQueryState, parseAsInteger, parseAsString } from 'nuqs';
import { Planet, SortConfig, FilterConfig, UseTableResult } from '../types';

const ITEMS_PER_PAGE = 10;

export const useTable = (planets: Planet[]): UseTableResult => {
  // URL-synchronized state using nuqs
  const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [sortKey, setSortKey] = useQueryState('sortBy', parseAsString);
  const [sortDirection, setSortDirection] = useQueryState('sortDirection', parseAsString);
  const [climateFilter, setClimateFilter] = useQueryState('climate', parseAsString.withDefault(''));
  const [terrainFilter, setTerrainFilter] = useQueryState('terrain', parseAsString.withDefault(''));

  // Construct sortConfig from URL parameters
  const sortConfig: SortConfig | null = useMemo(() => {
    if (sortKey && sortDirection) {
      return {
        key: sortKey as keyof Planet | 'residentCount',
        direction: sortDirection as 'asc' | 'desc'
      };
    }
    return null;
  }, [sortKey, sortDirection]);

  // Construct filterConfig from URL parameters
  const filterConfig: FilterConfig = useMemo(() => ({
    climate: climateFilter,
    terrain: terrainFilter
  }), [climateFilter, terrainFilter]);

  const filteredAndSortedPlanets = useMemo(() => {
    let processedPlanets = [...planets];

    // Apply filters
    if (filterConfig.climate) {
      processedPlanets = processedPlanets.filter(planet =>
        planet.climate.toLowerCase().includes(filterConfig.climate.toLowerCase())
      );
    }

    if (filterConfig.terrain) {
      processedPlanets = processedPlanets.filter(planet =>
        planet.terrain.toLowerCase().includes(filterConfig.terrain.toLowerCase())
      );
    }

    // Apply sorting
    if (sortConfig) {
      processedPlanets.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (sortConfig.key === 'residentCount') {
          aValue = a.residents.length;
          bValue = b.residents.length;
        } else if (sortConfig.key === 'population') {
          // Handle population as numbers, treating "unknown" as 0
          aValue = a.population === 'unknown' ? 0 : parseInt(a.population.replace(/,/g, ''), 10) || 0;
          bValue = b.population === 'unknown' ? 0 : parseInt(b.population.replace(/,/g, ''), 10) || 0;
        } else if (sortConfig.key === 'diameter') {
          // Handle diameter as numbers, treating "unknown" as 0
          aValue = a.diameter === 'unknown' ? 0 : parseInt(a.diameter.replace(/,/g, ''), 10) || 0;
          bValue = b.diameter === 'unknown' ? 0 : parseInt(b.diameter.replace(/,/g, ''), 10) || 0;
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return processedPlanets;
  }, [planets, sortConfig, filterConfig]);

  const totalPages = Math.ceil(filteredAndSortedPlanets.length / ITEMS_PER_PAGE);

  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedPlanets.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedPlanets, currentPage]);

  const handleSort = (key: keyof Planet | 'residentCount') => {
    const newDirection = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDirection(newDirection);
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handleFilter = (newFilterConfig: FilterConfig) => {
    setClimateFilter(newFilterConfig.climate);
    setTerrainFilter(newFilterConfig.terrain);
    setCurrentPage(1); // Reset to first page when filtering
  };

  return {
    currentPageData,
    currentPage,
    totalPages,
    sortConfig,
    filterConfig,
    setCurrentPage,
    handleSort,
    handleFilter
  };
};