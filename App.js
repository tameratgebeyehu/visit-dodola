import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_600SemiBold, 
  Inter_700Bold 
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { LanguageProvider } from './context/LanguageContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { RatingsProvider } from './context/RatingsContext';
import Navigator from './navigation/Navigator';
import { verifyIntegrity } from './data/security';

// Prevent splash screen auto-hide
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [securityVerified, setSecurityVerified] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Run Integrity Check
        const result = await verifyIntegrity();
        if (result.isIntact) {
          setSecurityVerified(true);
        } else {
          Alert.alert(
            "Security Warning",
            "App data integrity check failed. The data may have been tampered with or corrupted.",
            [{ text: "Continue Anyway", onPress: () => setSecurityVerified(true) }]
          );
        }
      } catch (e) {
        console.warn(e);
        setSecurityVerified(true); // Fallback to allow app use
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && securityVerified) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, securityVerified]);

  if (!fontsLoaded || !securityVerified) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RatingsProvider>
        <FavoritesProvider>
          <LanguageProvider>
            <NavigationContainer>
              <View style={styles.container} onLayout={onLayoutRootView}>
                <StatusBar style="dark" />
                <Navigator />
              </View>
            </NavigationContainer>
          </LanguageProvider>
        </FavoritesProvider>
      </RatingsProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
