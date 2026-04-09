import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Pressable,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions,
  FlatList,
  ScrollView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Heart } from 'lucide-react-native';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import LanguageSelector from '../components/LanguageSelector';
import { placesData } from '../data/placesData';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { t, language } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    { key: 'all', icon: 'explore', label: 'All' },
    { key: 'nature', icon: 'park', label: 'Nature' },
    { key: 'culture', icon: 'groups', label: 'Culture' },
    { key: 'trekking', icon: 'terrain', label: 'Trekking' },
  ];

  const featuredPlaces = placesData.slice(0, 3);
  
  const filteredPlaces = activeCategory && activeCategory !== 'all' 
    ? placesData.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase())
    : placesData.slice(3, 10);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Decorative glow - non-interactive */}
      <View style={styles.topGlow} pointerEvents="none" />

      {/* Premium Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{t('welcome')},</Text>
          <Text style={styles.appTitle}>Visit Dodola</Text>
        </View>
        <View style={styles.headerActions}>
          <LanguageSelector />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        
        {/* Featured Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('discovery')}</Text>
        </View>
        
        {/* Featured Horizontal Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselList}
          decelerationRate="fast"
          snapToInterval={width * 0.82 + 20}
        >
          {featuredPlaces.map((item, index) => (
            <TouchableOpacity 
              key={item.id}
              style={styles.featuredCard}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Detail', { item })}
            >
              <ImageBackground source={item.image} style={styles.featuredImage} imageStyle={{ borderRadius: 25 }}>
                <View style={styles.featuredOverlay}>
                  <View style={styles.featuredTag}>
                    <Text style={styles.featuredTagText}>{t(item.category.toLowerCase())}</Text>
                  </View>
                  <View style={styles.featuredBottomLayer}>
                    <Text style={styles.featuredTitle}>{item.title[language]}</Text>
                    <View style={styles.featuredLocation}>
                      <MaterialIcons name="location-on" color="#00E676" size={16} />
                      <Text style={styles.featuredLocationText}>Dodola, Oromia</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Categories Section */}
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
                  color={isActive ? '#121212' : '#888'} 
                  size={18} 
                />
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                  {cat.key === 'all' ? cat.label : t(cat.key)}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* Popular List Section */}
        <View style={styles.popularHeader}>
           <Text style={styles.sectionTitle}>Popular Destinations</Text>
        </View>
        
        <View style={styles.popularList}>
          {filteredPlaces.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Detail', { item })}
            >
              <View>
                <ImageBackground source={item.image} style={styles.cardImage}>
                  {/* Heart Button */}
                  <Pressable
                    style={[
                      styles.heartOverlay,
                      isFavorite(item.id) && styles.heartOverlayActive
                    ]}
                    onPress={() => toggleFavorite(item.id)}
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  >
                    <Heart 
                      color={isFavorite(item.id) ? '#00E676' : '#FFFFFF'} 
                      fill={isFavorite(item.id) ? '#00E676' : 'transparent'} 
                      size={20} 
                      strokeWidth={2.5}
                    />
                  </Pressable>
                </ImageBackground>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title[language]}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>
                  {item.description[language]}
                </Text>
                
                <View style={styles.cardFooter}>
                  <Text style={styles.readMoreText}>{t('readMore')}</Text>
                  <View style={styles.iconCircle}>
                    <MaterialIcons name="arrow-forward" color="#121212" size={14} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  topGlow: {
    position: 'absolute',
    top: -100,
    left: -50,
    width: 300,
    height: 300,
    backgroundColor: 'rgba(0, 230, 118, 0.05)',
    borderRadius: 200,
  },
  header: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 16 : 45,
    paddingHorizontal: 20,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#00E676',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  appTitle: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {
    paddingTop: 15,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#FFFFFF',
    fontFamily: 'Inter_800ExtraBold',
  },
  carouselList: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
  },
  featuredCard: {
    width: width * 0.82,
    height: 400,
    marginRight: 20,
    borderRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  featuredOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10,10,10,0.4)',
    borderRadius: 25,
    padding: 24,
    justifyContent: 'space-between',
  },
  featuredTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 230, 118, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 10,
  },
  featuredTagText: {
    color: '#121212',
    fontSize: 11,
    fontFamily: 'Inter_800ExtraBold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  featuredBottomLayer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginHorizontal: -24,
    marginBottom: -24,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  featuredTitle: {
    fontSize: 30,
    color: '#FFFFFF',
    fontFamily: 'Inter_800ExtraBold',
    lineHeight: 38,
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
    color: '#E0E0E0',
    fontSize: 14,
    marginLeft: 6,
    fontFamily: 'Inter_600SemiBold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  categoryRow: {
    paddingHorizontal: 20,
    marginBottom: 35,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161616',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 12,
  },
  categoryPillActive: {
    backgroundColor: '#00E676',
    borderColor: '#00E676',
  },
  categoryText: {
    color: '#888',
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    marginLeft: 8,
    letterSpacing: 0.3,
  },
  categoryTextActive: {
    color: '#121212',
  },
  popularHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  popularList: {
    paddingHorizontal: 20,
  },

  // INLINE CARD STYLES (no more separate CardItem component dependency for touch issues)
  card: {
    backgroundColor: '#141414',
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#262626',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  heartOverlay: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(10, 10, 10, 0.7)',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 99,
  },
  heartOverlayActive: {
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    borderColor: 'rgba(0, 230, 118, 0.3)',
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: 0.2,
  },
  cardDesc: {
    fontSize: 14,
    color: '#AAAAAA',
    lineHeight: 22,
    marginBottom: 16,
    fontFamily: 'Inter_400Regular',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  readMoreText: {
    fontSize: 14,
    color: '#00E676',
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00E676',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
