import { useState, useEffect } from 'react';
import { Planet } from '../types';

const FAVORITES_STORAGE_KEY = 'starwars-favorite-planets';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

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