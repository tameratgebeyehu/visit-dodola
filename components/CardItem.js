import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import Animated, { FadeInRight, Layout } from 'react-native-reanimated';
import { Heart, ArrowRight } from 'lucide-react-native';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';

const CardItem = ({ item, index, navigation }) => {
  const { language, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <Animated.View 
      entering={FadeInRight.delay(index * 100).duration(500)}
      layout={Layout.springify()}
    >
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('Detail', { item })}
        activeOpacity={0.7}
        delayPressIn={100}
      >
        <Image source={item.image} style={styles.image} />
        
        {/* Heart Toggle Overlay */}
        <TouchableOpacity 
          style={styles.heartOverlay}
          onPress={() => toggleFavorite(item.id)}
        >
          <Heart 
            color={isFavorite(item.id) ? '#00E676' : '#FFFFFF'} 
            fill={isFavorite(item.id) ? '#00E676' : 'transparent'} 
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
              <ArrowRight color="#121212" size={14} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    marginBottom: 16,
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderRadius: 20,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
    fontFamily: 'Inter_700Bold',
  },
  description: {
    fontSize: 14,
    color: '#AAAAAA',
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
    color: '#00E676',
    fontFamily: 'Inter_600SemiBold',
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00E676',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CardItem;
