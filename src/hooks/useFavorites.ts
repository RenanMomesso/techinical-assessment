import { useState, useEffect } from 'react';
import { Planet } from '../types';

const FAVORITES_STORAGE_KEY = 'starwars-favorite-planets';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
      setIsInitialized(true);
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites, isInitialized]);

  const toggleFavorite = (planet: Planet) => {
    setFavorites(prev => 
      prev.includes(planet.name) 
        ? prev.filter(name => name !== planet.name)
        : [...prev, planet.name]
    );
  };

  const isFavorite = (planetName: string) => favorites.includes(planetName);

  const getFavoritePlanets = (planets: Planet[]) => 
    planets.filter(planet => favorites.includes(planet.name));

  const removeFromFavorites = (planetName: string) => {
    setFavorites(prev => prev.filter(name => name !== planetName));
  };

  const clearFavorites = () => setFavorites([]);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoritePlanets,
    removeFromFavorites,
    clearFavorites,
  };
};