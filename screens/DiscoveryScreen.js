import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  TextInput,
  StatusBar,
  Platform
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { placesData } from '../data/placesData';
import CardItem from '../components/CardItem';
import { ChevronLeft, Search as SearchIcon, X } from 'lucide-react-native';

const DiscoveryScreen = ({ route, navigation }) => {
  const { category: initialCategory } = route.params || {};
  const [activeCategory, setActiveCategory] = useState(initialCategory || null);
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Combined Filtering: Category + Search
  const filteredPlaces = useMemo(() => {
    return placesData.filter(place => {
      const matchCategory = !activeCategory || place.category === activeCategory;
      const lowerQuery = searchQuery.toLowerCase();
      const matchSearch = 
        place.title[language].toLowerCase().includes(lowerQuery) ||
        place.description[language].toLowerCase().includes(lowerQuery);
      
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery, language]);

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
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>
            {activeCategory ? t(activeCategory.toLowerCase()) : t('discovery')}
          </Text>
          {activeCategory && (
            <TouchableOpacity 
              onPress={() => setActiveCategory(null)}
              style={styles.clearCategory}
            >
              <X color="#757575" size={16} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Bar Section */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchIcon color="#9E9E9E" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('search')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#757575"
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <CardItem item={item} index={index} navigation={navigation} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No locations found.</Text>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 16 : 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  backButton: {
    padding: 5,
    marginRight: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
  },
  clearCategory: {
    marginLeft: 10,
    backgroundColor: '#333333',
    padding: 4,
    borderRadius: 12,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
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
    color: '#FFF',
    fontFamily: 'Inter_400Regular',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    color: '#757575',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});

export default DiscoveryScreen;
