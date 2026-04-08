import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image,
  Animated, 
  Dimensions 
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(20);

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();

    // Auto-navigate after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('LanguageSelection');
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.logoWrapper, { opacity: fadeAnim }]}>
          <View style={styles.logoCircle}>
            <Image 
              source={require('../../assets/images/logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], width: '100%', alignItems: 'center' }}>
          <Text style={styles.title}>Visit Dodola</Text>
          <View style={styles.line} />
          <Text style={styles.tagline}>
            Discover the mountains, culture, and beauty of Dodola
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Deep Dark OLED Background
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoWrapper: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logoCircle: {
    width: 200,
    height: 200,
    borderRadius: 100, // Makes the container extremely soft and integrated
    backgroundColor: '#FFFFFF', // To hold the teal logo nicely if it has a transparent background
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 10,
    overflow: 'hidden',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  line: {
    width: 60,
    height: 4,
    backgroundColor: '#00E676', // Neon Green
    marginVertical: 20,
    borderRadius: 2,
    alignSelf: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#AAAAAA',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 26,
  },
});

export default SplashScreen;
