import React, { useMemo } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  Platform
} from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useLanguage } from '../LanguageContext';
import { useFavorites } from '../FavoritesContext';
import { placesData } from '../placesData';
import { ChevronLeft, ArrowRight, Heart } from 'lucide-react-native';

const FavoritesScreen = ({ navigation }) => {
  const { language, t } = useLanguage();
  const { favoriteIds, toggleFavorite } = useFavorites();

  const favPlaces = useMemo(() => {
    return placesData.filter(place => favoriteIds.includes(place.id));
  }, [favoriteIds]);

  const renderPlace = ({ item, index }) => (
    <Animated.View entering={FadeInRight.delay(index * 100).duration(500)}>
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('Detail', { item })}
        activeOpacity={0.9}
      >
        <Image source={item.image} style={styles.image} />
        
        {/* Heart Toggle in List */}
        <TouchableOpacity 
          style={styles.heartOverlay}
          onPress={() => toggleFavorite(item.id)}
        >
          <Heart color="#FF5252" fill="#FF5252" size={20} />
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft color="#1A237E" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('favorites')}</Text>
      </View>

      <FlatList
        data={favPlaces}
        keyExtractor={(item) => item.id}
        renderItem={renderPlace}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Heart color="#DDD" size={60} strokeWidth={1} />
            <Text style={styles.emptyText}>{t('noFavorites')}</Text>
            <TouchableOpacity 
              style={styles.exploreBtn}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.exploreBtnText}>{t('explore')}</Text>
            </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
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
  listContainer: {
    padding: 20,
    flexGrow: 1,
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 40,
  },
  exploreBtn: {
    marginTop: 30,
    backgroundColor: '#1A237E',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  exploreBtnText: {
    color: '#FFF',
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
});

export default FavoritesScreen;
