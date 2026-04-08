import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import * as SecureStore from 'expo-secure-store';

const FavoritesContext = createContext();
const STORAGE_KEY = 'visit_dodola_favorites';

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Load favorites from storage on mount
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const saved = await SecureStore.getItemAsync(STORAGE_KEY);
        if (saved) {
          setFavoriteIds(JSON.parse(saved));
        }
      } catch (e) {
        console.error('Failed to load favorites from SecureStore', e);
      }
    };
    loadFavorites();
  }, []);

  // Save favorites to storage whenever they change
  const saveFavorites = async (ids) => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      console.error('Failed to save favorites to SecureStore', e);
    }
  };

  const toggleFavorite = (id) => {
    setFavoriteIds(prevIds => {
      const isFav = prevIds.includes(id);
      const newIds = isFav 
        ? prevIds.filter(favId => favId !== id) 
        : [...prevIds, id];
      
      saveFavorites(newIds);
      return newIds;
    });
  };

  const isFavorite = (id) => favoriteIds.includes(id);

  const value = useMemo(() => ({
    favoriteIds,
    toggleFavorite,
    isFavorite,
  }), [favoriteIds]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export default FavoritesContext;
