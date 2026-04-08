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
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { placesData } from '../data/placesData';
import CardItem from '../components/CardItem';
import { ChevronLeft, Heart } from 'lucide-react-native';

const FavoritesScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { favoriteIds } = useFavorites();

  const favPlaces = useMemo(() => {
    return placesData.filter(place => favoriteIds.includes(place.id));
  }, [favoriteIds]);

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
        <Text style={styles.headerTitle}>{t('favorites')}</Text>
      </View>

      <FlatList
        data={favPlaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <CardItem item={item} index={index} navigation={navigation} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Heart color="#444444" size={60} strokeWidth={1} />
            <Text style={styles.emptyText}>{t('noFavorites')}</Text>
            <TouchableOpacity 
              style={styles.exploreBtn}
              onPress={() => navigation.navigate('DiscoveryTab')}
            >
              <Text style={styles.exploreBtnText}>{t('explore')}</Text>
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
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#757575',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 40,
  },
  exploreBtn: {
    marginTop: 30,
    backgroundColor: '#00E676',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  exploreBtnText: {
    color: '#121212',
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
});

export default FavoritesScreen;
