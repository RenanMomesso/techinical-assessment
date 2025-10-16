
import { useState, useEffect } from 'react';
import { FilterConfig } from '../types';

interface URLState {
  page: number;
  climate: string;
  terrain: string;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  selectedPlanet: string;
}

export const useURLState = () => {
  const [urlState, setUrlState] = useState<URLState>({
    page: 1,
    climate: '',
    terrain: '',
    sortBy: 'name',
    sortDirection: 'asc',
    selectedPlanet: ''
  });

  // Parse URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    setUrlState({
      page: parseInt(params.get('page') || '1', 10),
      climate: params.get('climate') || '',
      terrain: params.get('terrain') || '',
      sortBy: params.get('sortBy') || 'name',
      sortDirection: (params.get('sortDirection') as 'asc' | 'desc') || 'asc',
      selectedPlanet: params.get('selectedPlanet') || ''
    });
  }, []);

  // Single function to update URL and state
  const updateURL = (newState: Partial<URLState>) => {
    const params = new URLSearchParams(window.location.search);
    
    const updatedState = { ...urlState, ...newState };
    
    // Update URL parameters
    Object.entries(updatedState).forEach(([key, value]) => {
      if (value && value !== '' && !(key === 'page' && value === 1)) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    // Update URL without page reload
    const newURL = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.pushState({}, '', newURL);
    
    setUrlState(updatedState);
  };

  return {
    ...urlState,
    updateURL
  };
};