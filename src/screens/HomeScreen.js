import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';
import Animated, { 
  FadeInDown, 
} from 'react-native-reanimated';
import { 
  Leaf, 
  Music, 
  Mountain, 
  Info, 
  Heart 
} from 'lucide-react-native';
import { useLanguage } from '../LanguageContext';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 60) / 2;

const COLORS = {
  calmGreen: '#4ed054ff',
  deepBlue: '#1A237E',
  white: '#FFFFFF',
  offWhite: '#F5F5F5',
  gray: '#757575',
};

const HomeScreen = ({ navigation }) => {
  const { language, setLanguage, t } = useLanguage();

  const categories = [
    { key: 'nature', icon: Leaf, label: 'Nature', color: '#E8F5E9' },
    { key: 'culture', icon: Music, label: 'Culture', color: '#E3F2FD' },
    { key: 'trekking', icon: Mountain, label: 'Trekking', color: '#FFF3E0' },
    { key: 'info', icon: Info, label: 'Info', color: '#F3E5F5' },
    { key: 'favorites', icon: Heart, label: 'Favorites', color: '#FFEBEE' },
  ];

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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <Text style={styles.appTitle}>Visit Dodola</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Favorites')}
              style={styles.headerHeart}
            >
              <Heart color="#FF5252" fill="#FF5252" size={24} />
            </TouchableOpacity>
          </View>
          <LanguageToggle />
        </View>

        {/* Hero Section */}
        <Animated.View entering={FadeInDown.duration(800)}>
          <ImageBackground 
            source={require('../../assets/images/hero.jpg')} 
            style={styles.heroBackground}
            imageStyle={styles.heroImage}
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.heroWelcome}>{t('welcome')}</Text>
              <View style={styles.heroAccent} />
            </View>
          </ImageBackground>
        </Animated.View>

        {/* Category Grid */}
        <View style={styles.gridContainer}>
          {categories.map((item, index) => {
            const Icon = item.icon;
            return (
              <Animated.View 
                key={item.key}
                entering={FadeInDown.delay(200 + index * 100).duration(600)}
              >
                <TouchableOpacity 
                  style={[styles.card, { backgroundColor: COLORS.white }]}
                  onPress={() => {
                    if (item.key === 'info') {
                      navigation.navigate('Info');
                    } else if (item.key === 'favorites') {
                      navigation.navigate('Favorites');
                    } else {
                      navigation.navigate('Discovery', { category: item.label });
                    }
                  }}
                >
                  <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                    <Icon color={item.key === 'favorites' ? '#FF5252' : COLORS.deepBlue} size={32} />
                  </View>
                  <Text style={styles.cardLabel}>{t(item.key)}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Text style={styles.tagline}>{t('explore')} Dodola</Text>
        </View>
      </ScrollView>
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
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.deepBlue,
    fontFamily: 'Inter_700Bold',
  },
  headerHeart: {
    marginLeft: 10,
    padding: 5,
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
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(26, 35, 126, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroWelcome: {
    fontSize: 38,
    fontWeight: '700',
    color: COLORS.white,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  heroAccent: {
    width: 50,
    height: 4,
    backgroundColor: COLORS.calmGreen,
    marginTop: 10,
    borderRadius: 2,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.deepBlue,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 14,
    color: COLORS.gray,
    fontFamily: 'Inter_400Regular',
  },
});

export default HomeScreen;
