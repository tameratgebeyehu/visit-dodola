import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Pressable,
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
    <View>
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('Detail', { item })}
        activeOpacity={0.8}
      >
        <View>
          <Image source={item.image} style={styles.image} />
          
          {/* Heart Toggle Overlay - Using Pressable to avoid nested TouchableOpacity conflicts */}
          <Pressable 
            style={styles.heartOverlay}
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite(item.id);
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Heart 
              color={isFavorite(item.id) ? '#00E676' : '#FFFFFF'} 
              fill={isFavorite(item.id) ? '#00E676' : 'transparent'} 
              size={20} 
              strokeWidth={2.5}
            />
          </Pressable>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.title[language]}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description[language]}
          </Text>
          
          <View style={styles.cardFooter}>
            <Text style={styles.readMoreText}>{t('readMore')}</Text>
            <View style={styles.iconCircle}>
              <ArrowRight color="#121212" size={14} strokeWidth={3} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
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
  },
  cardContent: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: 0.2,
  },
  description: {
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

export default CardItem;
