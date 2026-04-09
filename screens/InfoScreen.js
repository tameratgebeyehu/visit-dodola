import React, { useState, useEffect, useMemo } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions,
  ImageBackground,
  Image
} from 'react-native';
import Animated, { 
  FadeInDown, 
  FadeIn, 
  FadeOut, 
  Layout,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { ChevronLeft, Phone, ArrowUpRight, Heart, SlidersHorizontal, MapPin } from 'lucide-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { services } from '../data/infoData';

const { width, height } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = height * 0.35;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 100 : 85; 

const InfoScreen = ({ navigation }) => {
  const { language, t } = useLanguage();
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
  
  const categoryKeys = Object.keys(services || {});
  const [activeTab, setActiveTab] = useState('public');
  const [activeSubFilter, setActiveSubFilter] = useState('ALL');
  const [showFilters, setShowFilters] = useState(false);

  const currentCategoryData = (services || {})[activeTab];

  // Dynamic Image
  const heroImageSrc = currentCategoryData?.coverImage || require('../assets/images/dir_hospitality.png');

  useEffect(() => {
    setActiveSubFilter('ALL');
    setShowFilters(false);
  }, [activeTab]);

  // SCROLL ANIMATION LOGIC 
  const scrollY = useSharedValue(0);
  
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-100, 0],
      [1.3, 1],
      { extrapolateLeft: 'extend', extrapolateRight: 'clamp' }
    );
    const translateY = interpolate(
      scrollY.value,
      [-100, 0],
      [-50, 0],
      { extrapolateLeft: 'extend', extrapolateRight: 'clamp' }
    );
    return {
      transform: [{ scale }, { translateY }],
    };
  });

  const stickyNavbarStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT - 30, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      [0, 1],
      Extrapolate.CLAMP
    );
    const zIndex = scrollY.value > (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT - 20) ? 50 : -10;
    return { opacity, zIndex };
  });


  const renderPremiumCard = (item, isSub = false, index = 0) => {
    const isFav = isFavorite(item.id);

    return (
      <Animated.View 
        key={item.id} 
        entering={FadeInDown.delay((index % 10) * 60).springify().damping(14)}
        layout={Layout.springify()}
      >
        <TouchableOpacity 
          style={styles.premiumCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('ServiceDetail', { serviceItem: item })}
        >
          <View style={[styles.cardBlurBase, { backgroundColor: 'rgba(26, 26, 26, 0.95)' }]}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <MaterialIcons name={item.icon || "location-city"} size={22} color="#00E676" />
              </View>
              
              <View style={styles.cardTextWrapper}>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title[language]}</Text>
                {item.phone ? (
                  <View style={styles.contactRow}>
                    <Phone size={12} color="#00E676" />
                    <Text style={styles.cardPhone}>{item.phone}</Text>
                  </View>
                ) : (
                  <Text style={styles.cardSubtitle}>{t('readMore') || 'Explore Details'}</Text>
                )}
              </View>

              <TouchableOpacity 
                style={[styles.iconButton, { marginRight: 8, backgroundColor: isFav ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255, 255, 255, 0.05)' }]}
                onPress={() => toggleFavorite(item.id)}
                activeOpacity={0.7}
              >
                <Heart size={18} color={isFav ? "#00E676" : "#666"} strokeWidth={isFav ? 3.5 : 2} />
              </TouchableOpacity>

              <View style={styles.iconButton}>
                <ArrowUpRight size={18} color="#FFFFFF" strokeWidth={2.5} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderDynamicContent = () => {
    // Render Standard Directory Logic
    if (!currentCategoryData) return null;

    if (currentCategoryData.type === 'flat') {
      return (
        <View style={styles.listContainer}>
          {(currentCategoryData?.items || []).map((item, idx) => renderPremiumCard(item, false, idx))}
        </View>
      );
    }

    if (currentCategoryData.type === 'nested') {
      let absoluteIndex = 0;
      return (
        <View style={styles.listContainer}>
          {Object.keys(currentCategoryData?.subcategories || {}).map((subKey, catIdx) => {
            if (activeSubFilter !== 'ALL' && activeSubFilter !== subKey) {
              return null;
            }

            return (
              <View key={subKey} style={[styles.subCategoryBlock, (catIdx === 0 || activeSubFilter !== 'ALL') && { marginTop: 0 }]}>
                {activeSubFilter === 'ALL' && (
                  <View style={styles.subCatHeaderRow}>
                    <View style={styles.glassBadge}>
                      <Text style={styles.subCategoryTitle}>{t(subKey) || subKey}</Text>
                    </View>
                    <View style={styles.subCategoryDivider} />
                  </View>
                )}
                
                {(currentCategoryData?.subcategories?.[subKey] || []).map(item => {
                  const card = renderPremiumCard(item, true, absoluteIndex);
                  absoluteIndex++;
                  return card;
                })}
              </View>
            );
          })}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* TINY STICKY NAVBAR */}
      <Animated.View style={[styles.stickyNavbar, stickyNavbarStyle]}>
        <ImageBackground 
          source={heroImageSrc} 
          style={StyleSheet.absoluteFillObject}
          blurRadius={10}
        />
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(10, 10, 10, 0.7)' }]} />
        <View style={styles.stickyNavContent}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.transparentBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronLeft color="#FFFFFF" size={26} />
          </TouchableOpacity>
          <Text style={styles.stickyNavTitle} numberOfLines={1}>
            {t(activeTab === 'public' ? 'publicServices' : activeTab) || activeTab.toUpperCase()}
          </Text>
          <View style={{ width: 26 }} />
        </View>
      </Animated.View>

      <View style={styles.absoluteBackButton}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.glassBtn}
        >
          <ChevronLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
      </View>

      <Animated.ScrollView 
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 120 }}
        stickyHeaderIndices={[1]} 
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.massiveHeader}>
          <Animated.Image 
            key={`hero-img-${activeTab}`}
            source={heroImageSrc} 
            style={[styles.headerImage, animatedImageStyle]}
            resizeMode="cover"
          />
          <View style={styles.gradientOverlay}>
            <View style={styles.heroContent}>
                <Text style={styles.heroTitle} numberOfLines={1}>
                  {t(activeTab === 'public' ? 'publicServices' : activeTab) || activeTab.toUpperCase()}
                </Text>
                <Text style={styles.heroSubtitle}>
                  {currentCategoryData?.description?.[language] || "Explore the premium directory"}
                </Text>
            </View>
          </View>
        </View>

        <View style={styles.stickyControlsContainer}>
          <View style={styles.controlsRow}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabScrollInner}
              keyboardShouldPersistTaps="handled"
            >
              {categoryKeys.map((key) => {
                const isActive = activeTab === key;
                const title = t(key === 'public' ? 'publicServices' : key) || key;
                
                return (
                  <TouchableOpacity 
                    key={key}
                    style={[
                      styles.premiumPill, 
                      isActive && styles.premiumPillActive
                    ]}
                    onPress={() => setActiveTab(key)}
                    activeOpacity={0.8}
                  >
                    <Text style={[
                      styles.premiumPillText, 
                      isActive && styles.premiumPillTextActive
                    ]}>
                      {title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            
            {currentCategoryData?.type === 'nested' && (
              <TouchableOpacity 
                style={[styles.filterToggleBtn, showFilters && styles.filterToggleBtnActive]}
                onPress={() => setShowFilters(!showFilters)}
                activeOpacity={0.7}
              >
                <SlidersHorizontal size={20} color={showFilters ? "#0A0A0A" : "#FFFFFF"} />
              </TouchableOpacity>
            )}
          </View>

          {showFilters && currentCategoryData?.type === 'nested' && (
            <Animated.View entering={FadeInDown.duration(200)} exiting={FadeOut.duration(200)} style={styles.subFilterWrapper}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.subFilterScroll}
              >
                {['ALL', ...Object.keys(currentCategoryData?.subcategories || {})].map((sub) => {
                  const isActive = activeSubFilter === sub;
                  return (
                    <TouchableOpacity 
                      key={sub}
                      style={[styles.subFilterChip, isActive && styles.subFilterChipActive]}
                      onPress={() => setActiveSubFilter(sub)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.subFilterText, isActive && styles.subFilterTextActive]}>
                        {sub === 'ALL' ? 'All' : (t(sub) || sub)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </Animated.View>
          )}
        </View>

        <View style={styles.contentWrapper}>
          <Animated.View 
            key={`content-${activeTab}-${activeSubFilter}`} 
            entering={FadeInDown.duration(400)}
            exiting={FadeOut.duration(200)}
          >
            {renderDynamicContent()}
          </Animated.View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  massiveHeader: {
    height: HEADER_MAX_HEIGHT,
    width: '100%',
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 10, 0.55)',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  absoluteBackButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
    left: 20,
    zIndex: 20,
  },
  glassBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  transparentBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    paddingHorizontal: 24,
  },
  heroTitle: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: 'Inter_800ExtraBold',
    textTransform: 'capitalize',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 15,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#00E676',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.5,
  },
  stickyNavbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MIN_HEIGHT,
    zIndex: 50,
  },
  stickyNavContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 45,
  },
  stickyNavTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  stickyControlsContainer: {
    backgroundColor: '#0A0A0A', 
    paddingTop: 15, 
    paddingBottom: 15,
    marginTop: -25, 
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 10,
    elevation: 10,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  tabScrollInner: {
    paddingHorizontal: 20,
    gap: 12,
    alignItems: 'center',
  },
  premiumPill: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(30,30,30, 0.95)',
    borderWidth: 1,
    borderColor: '#333',
  },
  favoritesPillInactive: {
    borderColor: '#00E676',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(0, 230, 118, 0.05)',
  },
  premiumPillActive: {
    backgroundColor: '#00E676',
    borderColor: '#00E676',
  },
  premiumPillText: {
    color: '#888888',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'capitalize',
  },
  favoritesPillTextInactive: {
    color: '#00E676',
  },
  premiumPillTextActive: {
    color: '#0A0A0A',
    fontFamily: 'Inter_700Bold',
  },
  filterToggleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    marginLeft: 10,
  },
  filterToggleBtnActive: {
    backgroundColor: '#00E676',
    borderColor: '#00E676',
  },
  subFilterWrapper: {
    marginTop: 15,
  },
  subFilterScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  subFilterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#161616',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  subFilterChipActive: {
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    borderColor: '#00E676',
  },
  subFilterText: {
    fontSize: 13,
    color: '#AAAAAA',
    fontFamily: 'Inter_500Medium',
  },
  subFilterTextActive: {
    color: '#00E676',
    fontFamily: 'Inter_600SemiBold',
  },
  contentWrapper: {
    paddingTop: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  emptyContainer: {
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#666666',
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    marginTop: 15,
    textAlign: 'center',
  },
  subCategoryBlock: {
    marginTop: 20,
  },
  subCatHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  glassBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.3)',
    marginRight: 12,
  },
  subCategoryTitle: {
    fontSize: 12,
    color: '#00E676',
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  subCategoryDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#2A2A2A',
  },
  premiumCard: {
    marginBottom: 20, 
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#161616',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  cardBlurBase: {
    padding: 18, 
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 52,
    height: 52, 
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardTextWrapper: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 5,
    letterSpacing: 0.2,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  cardPhone: {
    fontSize: 13,
    color: '#AAAAAA',
    fontFamily: 'Inter_400Regular',
    marginLeft: 6,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666666',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default InfoScreen;
