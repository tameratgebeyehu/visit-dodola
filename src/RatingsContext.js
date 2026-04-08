import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RatingsContext = createContext();
const STORAGE_KEY = '@visit_dodola_ratings';

export const RatingsProvider = ({ children }) => {
  const [ratings, setRatings] = useState({});

  // Load ratings from storage on mount
  useEffect(() => {
    const loadRatings = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setRatings(JSON.parse(saved));
        }
      } catch (e) {
        console.error('Failed to load ratings', e);
      }
    };
    loadRatings();
  }, []);

  // Save ratings to storage whenever they change
  const saveRatings = async (newRatings) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newRatings));
    } catch (e) {
      console.error('Failed to save ratings', e);
    }
  };

  const updateRating = (id, value) => {
    setRatings(prevRatings => {
      const newRatings = {
        ...prevRatings,
        [id]: value,
      };
      saveRatings(newRatings);
      return newRatings;
    });
  };

  const getRating = (id) => ratings[id] || 0;

  const value = useMemo(() => ({
    ratings,
    updateRating,
    getRating,
  }), [ratings]);

  return (
    <RatingsContext.Provider value={value}>
      {children}
    </RatingsContext.Provider>
  );
};

export const useRatings = () => {
  const context = useContext(RatingsContext);
  if (!context) {
    throw new Error('useRatings must be used within a RatingsProvider');
  }
  return context;
};

export default RatingsContext;
