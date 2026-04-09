import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Compass, Heart, Library, BookOpen } from 'lucide-react-native';
import { useLanguage } from '../context/LanguageContext';

// Screens
import HomeScreen from '../screens/HomeScreen';
import DiscoveryScreen from '../screens/DiscoveryScreen';
import TrekkingScreen from '../screens/TrekkingScreen'; // Used as a standalone route now
import DetailScreen from '../screens/DetailScreen';
import InfoScreen from '../screens/InfoScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import EssenceScreen from '../screens/EssenceScreen';

// Onboarding Screens
import SplashScreen from '../screens/onboarding/SplashScreen';
import LanguageSelectionScreen from '../screens/onboarding/LanguageSelectionScreen';
import OnboardingSlidesScreen from '../screens/onboarding/OnboardingSlidesScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00E676',
        tabBarInactiveTintColor: '#AAAAAA',
        tabBarStyle: {
          backgroundColor: '#1E1E1E',
          borderTopWidth: 1,
          borderTopColor: '#333333',
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter_600SemiBold',
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          tabBarLabel: t('welcome'),
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="DiscoveryTab" 
        component={DiscoveryScreen} 
        options={{
          tabBarLabel: t('explore'),
          tabBarIcon: ({ color, size }) => <Compass color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="FavoritesTab" 
        component={FavoritesScreen} 
        options={{
          tabBarLabel: t('favorites'),
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="InfoTab" 
        component={InfoScreen} 
        options={{
          tabBarLabel: t('directory') || 'Directory',
          tabBarIcon: ({ color, size }) => <Library color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="EssenceTab" 
        component={EssenceScreen} 
        options={{
          tabBarLabel: t('essence') || 'Story',
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
         headerShown: false,
         cardStyle: { backgroundColor: '#121212' },
      }}
    >
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
      <Stack.Screen name="Discovery" component={DiscoveryScreen} /> 
      <Stack.Screen name="Trekking" component={TrekkingScreen} /> 
    </Stack.Navigator>
  );
};

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#121212' },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
      <Stack.Screen name="OnboardingSlides" component={OnboardingSlidesScreen} />
    </Stack.Navigator>
  );
};

export default function Navigator() {
  const { isOnboarded, isInitializing } = useLanguage();

  if (isInitializing) return null;

  return isOnboarded ? <MainNavigator /> : <OnboardingNavigator />;
}
