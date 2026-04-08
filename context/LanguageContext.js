import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { translations } from '../data/translations';

const LanguageContext = createContext();
const LANG_STORAGE_KEY = 'visit_dodola_language';
const ONBOARDED_STORAGE_KEY = 'visit_dodola_onboarded';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState('en');
  const [isOnboarded, setIsOnboardedState] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Load state from SecureStore on mount
  useEffect(() => {
    const loadState = async () => {
      try {
        const [savedLanguage, savedOnboarded] = await Promise.all([
          SecureStore.getItemAsync(LANG_STORAGE_KEY),
          SecureStore.getItemAsync(ONBOARDED_STORAGE_KEY)
        ]);

        if (savedLanguage && translations[savedLanguage]) {
          setLanguageState(savedLanguage);
        }

        if (savedOnboarded === 'true') {
          setIsOnboardedState(true);
        }
      } catch (e) {
        console.error('Failed to load state from SecureStore', e);
      } finally {
        setIsInitializing(false);
      }
    };
    loadState();
  }, []);

  const setLanguage = async (newLang) => {
    try {
      setLanguageState(newLang);
      await SecureStore.setItemAsync(LANG_STORAGE_KEY, newLang);
    } catch (e) {
      console.error('Failed to save language to SecureStore', e);
    }
  };

  const completeOnboarding = async () => {
    try {
      setIsOnboardedState(true);
      await SecureStore.setItemAsync(ONBOARDED_STORAGE_KEY, 'true');
    } catch (e) {
      console.error('Failed to save onboarding state to SecureStore', e);
    }
  };

  const value = useMemo(() => ({
    language,
    setLanguage,
    isOnboarded,
    completeOnboarding,
    isInitializing,
    t: (key) => translations[language][key] || key,
    translations: translations[language],
  }), [language, isOnboarded, isInitializing]);

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
