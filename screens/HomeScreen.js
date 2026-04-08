import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions,
  FlatList
} from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';
import { placesData } from '../data/placesData';
import CardItem from '../components/CardItem';

const { width } = Dimensions.get('window');

const COLORS = {
  background: '#121212',
  surface: '#1E1E1E',
  neon: '#00E676',
  white: '#FFFFFF',
  gray: '#AAAAAA',
  darkGray: '#333333',
};

const HomeScreen = ({ navigation }) => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    { key: 'all', icon: 'explore', label: 'All' },
    { key: 'nature', icon: 'park', label: 'Nature' },
    { key: 'culture', icon: 'groups', label: 'Culture' },
    { key: 'trekking', icon: 'terrain', label: 'Trekking' },
  ];

  // Drive the cinematic horizontal carousel with the first 3 locations
  const featuredPlaces = placesData.slice(0, 3);
  
  // Conditionally process the vertical feed depending on the selected pill
  const filteredPlaces = activeCategory && activeCategory !== 'all' 
    ? placesData.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase())
    : placesData.slice(3, 10);

  const renderFeaturedCard = ({ item, index }) => (
    <Animated.View entering={FadeInRight.delay(index * 150).duration(600)}>
      <TouchableOpacity 
        style={styles.featuredCard}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Detail', { item })}
      >
        <ImageBackground source={item.image} style={styles.featuredImage} imageStyle={{ borderRadius: 20 }}>
          <View style={styles.featuredOverlay}>
            <View style={styles.featuredTag}>
              <Text style={styles.featuredTagText}>{t(item.category.toLowerCase())}</Text>
            </View>
            <View>
              <Text style={styles.featuredTitle}>{item.title[language]}</Text>
              <View style={styles.featuredLocation}>
                <MaterialIcons name="location-on" color={COLORS.neon} size={16} />
                <Text style={styles.featuredLocationText}>Dodola, Oromia</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Premium Dark Dashboard Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{t('welcome')},</Text>
          <Text style={styles.appTitle}>Visit Dodola</Text>
        </View>
        <View style={styles.headerActions}>
          <LanguageSelector />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Featured Infinite Carousel */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('discovery')}</Text>
        </View>
        
        <View style={styles.carouselContainer}>
          <FlatList
            data={featuredPlaces}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderFeaturedCard}
            contentContainerStyle={styles.carouselList}
            snapToInterval={width * 0.8 + 16}
            decelerationRate="fast"
          />
        </View>

        {/* Horizontal Category Row */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryRow}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key || (!activeCategory && cat.key === 'all');
            return (
              <TouchableOpacity 
                key={cat.key}
                style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                onPress={() => setActiveCategory(cat.key)}
                activeOpacity={0.7}
              >
                <MaterialIcons 
                  name={cat.icon} 
                  color={isActive ? COLORS.background : COLORS.gray} 
                  size={18} 
                />
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                  {cat.key === 'all' ? cat.label : t(cat.key)}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* Smart Vertical Feed */}
        <View style={styles.popularHeader}>
           <Text style={styles.sectionTitle}>Popular</Text>
        </View>
        
        <View style={styles.popularList}>
          {filteredPlaces.map((item, index) => (
            <CardItem key={item.id} item={item} index={index} navigation={navigation} />
          ))}
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 16 : 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: COLORS.neon,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.darkGray,
  },
  scrollContent: {
    paddingTop: 10,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.white,
    fontFamily: 'Inter_700Bold',
  },
  carouselContainer: {
    marginBottom: 24,
  },
  carouselList: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  featuredCard: {
    width: width * 0.8,
    height: 380,
    marginRight: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  featuredOverlay: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: '100%',
    justifyContent: 'space-between',
  },
  featuredTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,230,118,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,230,118,0.5)',
    marginTop: 10,
  },
  featuredTagText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'Inter_700Bold',
  },
  featuredTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: 'Inter_700Bold',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    marginBottom: 8,
  },
  featuredLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredLocationText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    fontFamily: 'Inter_600SemiBold',
  },
  categoryRow: {
    paddingHorizontal: 16,
    marginBottom: 30,
    gap: 12, // React Native flex gap
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.darkGray,
  },
  categoryPillActive: {
    backgroundColor: COLORS.neon,
    borderColor: COLORS.neon,
  },
  categoryText: {
    color: COLORS.gray,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
  categoryTextActive: {
    color: COLORS.background,
  },
  popularHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  popularList: {
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
