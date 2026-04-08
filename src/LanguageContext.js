import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from './translations';

const LanguageContext = createContext();
const STORAGE_KEY = '@visit_dodola_language';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState('en');

  // Load language from storage on mount
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedLanguage && translations[savedLanguage]) {
          setLanguageState(savedLanguage);
        }
      } catch (e) {
        console.error('Failed to load language', e);
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (newLang) => {
    try {
      setLanguageState(newLang);
      await AsyncStorage.setItem(STORAGE_KEY, newLang);
    } catch (e) {
      console.error('Failed to save language', e);
    }
  };

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (key) => translations[language][key] || key,
    translations: translations[language],
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
