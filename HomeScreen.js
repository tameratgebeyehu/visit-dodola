import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { useLanguage } from './LanguageContext';

const COLORS = {
  calmGreen: '#4ed054ff',
  deepBlue: '#1A237E',
  white: '#FFFFFF',
  offWhite: '#F5F5F5',
  gray: '#757575',
};

const HomeScreen = () => {
  const { language, setLanguage, t } = useLanguage();

  const LanguageToggle = () => (
    <View style={styles.toggleContainer}>
      <TouchableOpacity 
        style={[styles.toggleBtn, language === 'en' && styles.toggleBtnActive]}
        onPress={() => setLanguage('en')}
      >
        <Text style={[styles.toggleText, language === 'en' && styles.toggleTextActive]}>EN</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.toggleBtn, language === 'am' && styles.toggleBtnActive]}
        onPress={() => setLanguage('am')}
      >
        <Text style={[styles.toggleText, language === 'am' && styles.toggleTextActive]}>አም</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.toggleBtn, language === 'or' && styles.toggleBtnActive]}
        onPress={() => setLanguage('or')}
      >
        <Text style={[styles.toggleText, language === 'or' && styles.toggleTextActive]}>OR</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>Visit Dodola</Text>
        <LanguageToggle />
      </View>

      {/* Hero Section */}
      <ImageBackground 
        source={require('./assets/images/hero.jpg')} // Ensure this path exists or replace with a placeholder
        style={styles.heroBackground}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.heroWelcome}>{t('welcome')}</Text>
          <View style={styles.heroAccent} />
        </View>
      </ImageBackground>

      {/* Footer/Placeholder for other sections */}
      <View style={styles.content}>
        <Text style={styles.tagline}>{t('explore')} {t('culture')} & {t('trekking')}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.deepBlue,
    fontFamily: 'Inter_700Bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    padding: 2,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  toggleBtnActive: {
    backgroundColor: COLORS.calmGreen,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray,
    fontFamily: 'Inter_600SemiBold',
  },
  toggleTextActive: {
    color: COLORS.white,
  },
  heroBackground: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(26, 35, 126, 0.4)', // Deep Blue tinted overlay
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroWelcome: {
    fontSize: 42,
    fontWeight: '700',
    color: COLORS.white,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  heroAccent: {
    width: 60,
    height: 4,
    backgroundColor: COLORS.calmGreen,
    marginTop: 15,
    borderRadius: 2,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 16,
    color: COLORS.deepBlue,
    fontFamily: 'Inter_400Regular',
    opacity: 0.8,
  },
});

export default HomeScreen;
