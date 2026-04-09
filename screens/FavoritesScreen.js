import React, { useMemo } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StatusBar,
  Platform
} from 'react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { placesData } from '../data/placesData';
import { services } from '../data/infoData';
import CardItem from '../components/CardItem';
import { ChevronLeft, Heart, Phone, ArrowUpRight } from 'lucide-react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FavoritesScreen = ({ navigation }) => {
  const { language, t } = useLanguage();
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  // 1. Flatten all data globally
  const combinedData = useMemo(() => {
    const places = placesData.map(p => ({ ...p, _dataType: 'place' }));
    
    const svcs = [];
    Object.keys(services).forEach(key => {
      const cat = services[key];
      if (cat.type === 'flat') {
        cat.items.forEach(item => svcs.push({ ...item, _dataType: 'service' }));
      } else if (cat.type === 'nested') {
        Object.keys(cat.subcategories).forEach(sub => {
          cat.subcategories[sub].forEach(item => svcs.push({ ...item, _dataType: 'service' }));
        });
      }
    });

    return [...places, ...svcs];
  }, []);

  // 2. Filter entirely by global favorites
  const favItems = useMemo(() => {
    return combinedData.filter(item => favoriteIds.includes(item.id));
  }, [favoriteIds, combinedData]);

  // 3. Render Premium Card for Services
  const renderPremiumServiceCard = (item, index) => {
    const isFav = isFavorite(item.id);

    return (
      <Animated.View 
        key={`svc-${item.id}`} 
        entering={FadeInDown.delay((index % 10) * 40).springify()}
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        {navigation.canGoBack() && (
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ChevronLeft color="#FFFFFF" size={28} />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{t('favorites') || 'Favorites'}</Text>
      </View>

      <FlatList
        data={favItems}
        keyExtractor={(item) => `${item._dataType}-${item.id}`}
        renderItem={({ item, index }) => {
          if (item._dataType === 'service') {
            return renderPremiumServiceCard(item, index);
          }
          return <CardItem item={item} index={index} navigation={navigation} />;
        }}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Heart color="#444444" size={60} strokeWidth={1} />
            <Text style={styles.emptyText}>{t('noFavorites') || 'You haven\'t added any favorites yet.'}</Text>
            <TouchableOpacity 
              style={styles.exploreBtn}
              onPress={() => navigation.navigate('DiscoveryTab')}
            >
              <Text style={styles.exploreBtnText}>{t('explore') || 'Explore Dodola'}</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 16 : 45,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#161616',
    borderBottomWidth: 1,
    borderBottomColor: '#252525',
  },
  backButton: {
    padding: 5,
    marginRight: 5,
  },
  headerTitle: {
    fontSize: 22,
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    flexGrow: 1,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#757575',
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 40,
  },
  exploreBtn: {
    marginTop: 30,
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    borderWidth: 1,
    borderColor: '#00E676',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
  },
  exploreBtnText: {
    color: '#00E676',
    fontFamily: 'Inter_700Bold',
  },
  
  // Replicated PremiumCard UI styles
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

export default FavoritesScreen;
