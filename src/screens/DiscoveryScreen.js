import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  Platform,
  TextInput
} from 'react-native';
import Animated, { 
  FadeInRight, 
  Layout 
} from 'react-native-reanimated';
import { useLanguage } from '../LanguageContext';
import { useFavorites } from '../FavoritesContext';
import { placesData } from '../placesData';
import { ChevronLeft, ArrowRight, Search as SearchIcon, Heart } from 'lucide-react-native';

const DiscoveryScreen = ({ route, navigation }) => {
  const { category } = route.params || { category: 'Nature' };
  const { language, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');

  // Combined Filtering: Category + Search
  const filteredPlaces = useMemo(() => {
    return placesData.filter(place => {
      const matchCategory = place.category === category;
      const lowerQuery = searchQuery.toLowerCase();
      const matchSearch = 
        place.title[language].toLowerCase().includes(lowerQuery) ||
        place.description[language].toLowerCase().includes(lowerQuery);
      
      return matchCategory && matchSearch;
    });
  }, [category, searchQuery, language]);

  const renderPlace = ({ item, index }) => (
    <Animated.View 
      entering={FadeInRight.delay(index * 100).duration(500)}
      layout={Layout.springify()}
    >
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('Detail', { item })}
        activeOpacity={0.9}
      >
        <Image source={item.image} style={styles.image} />
        
        {/* Heart Toggle Overlay */}
        <TouchableOpacity 
          style={styles.heartOverlay}
          onPress={() => toggleFavorite(item.id)}
        >
          <Heart 
            color={isFavorite(item.id) ? '#FF5252' : '#757575'} 
            fill={isFavorite(item.id) ? '#FF5252' : 'transparent'} 
            size={20} 
          />
        </TouchableOpacity>

        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.title[language]}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description[language]}
          </Text>
          
          <View style={styles.cardFooter}>
            <Text style={styles.readMoreText}>{t('readMore')}</Text>
            <View style={styles.iconCircle}>
              <ArrowRight color="#FFF" size={14} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft color="#1A237E" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t(category.toLowerCase())}</Text>
      </View>

      {/* Search Bar Section */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchIcon color="#757575" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('search')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
        renderItem={renderPlace}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No locations found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A237E',
    marginLeft: 10,
    fontFamily: 'Inter_700Bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F4',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Inter_400Regular',
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  heartOverlay: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 20,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 6,
    fontFamily: 'Inter_700Bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: 'Inter_400Regular',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4ed054ff',
    fontFamily: 'Inter_600SemiBold',
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4ed054ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});

export default DiscoveryScreen;
