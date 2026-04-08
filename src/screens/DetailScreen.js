import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
  Share,
  Linking
} from 'react-native';
import Animated, { 
  FadeInUp, 
  FadeInDown 
} from 'react-native-reanimated';
import { useLanguage } from '../LanguageContext';
import { useFavorites } from '../FavoritesContext';
import { useRatings } from '../RatingsContext';
import { ChevronLeft, Info, Heart, Share2, MapPin, Star } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const DetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { language, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { getRating, updateRating } = useRatings();

  const currentRating = getRating(item.id);

  const handleShare = async () => {
    try {
      const message = `${item.title[language]}\n\n${item.description[language].substring(0, 100)}...\n\n${t('shareTagline')}`;
      await Share.share({
        message,
        title: item.title[language], // Android only
      });
    } catch (error) {
      console.error('Sharing failed', error);
    }
  };

  const handleViewMap = () => {
    const { latitude, longitude } = item.coordinates;
    const label = item.title[language];
    
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${label})`,
    });

    Linking.openURL(url);
  };

  const StarRating = () => (
    <View style={styles.ratingCard}>
      <Text style={styles.ratingTitle}>{t('rateThisPlace')}</Text>
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity 
            key={star}
            onPress={() => updateRating(item.id, star)}
            style={styles.starWrapper}
          >
            <Star 
              size={32} 
              color={star <= currentRating ? '#FFD700' : '#DDD'} 
              fill={star <= currentRating ? '#FFD700' : 'transparent'} 
            />
          </TouchableOpacity>
        ))}
      </View>
      {currentRating > 0 && (
        <Text style={styles.ratingSubtext}>
          {t('yourRating')}: {currentRating}/5
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Full-ish Screen Image Section */}
        <View style={styles.imageHeader}>
          <Image source={item.image} style={styles.headerImage} />
          
          {/* Back Button Overlay */}
          <SafeAreaView style={styles.backButtonWrapper}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <ChevronLeft color="#FFF" size={30} />
            </TouchableOpacity>
          </SafeAreaView>

          {/* Share Button Overlay */}
          <SafeAreaView style={styles.shareButtonWrapper}>
            <TouchableOpacity 
              onPress={handleShare}
              style={styles.backButton}
            >
              <Share2 color="#FFF" size={24} />
            </TouchableOpacity>
          </SafeAreaView>

          {/* Heart Toggle Overlay */}
          <SafeAreaView style={styles.heartButtonWrapper}>
            <TouchableOpacity 
              onPress={() => toggleFavorite(item.id)}
              style={styles.backButton}
            >
              <Heart 
                color={isFavorite(item.id) ? '#FF5252' : '#FFF'} 
                fill={isFavorite(item.id) ? '#FF5252' : 'transparent'} 
                size={24} 
              />
            </TouchableOpacity>
          </SafeAreaView>

          {/* Title Overlay */}
          <Animated.View 
            entering={FadeInDown.delay(200).duration(600)}
            style={styles.imageOverlay}
          >
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{t(item.category.toLowerCase())}</Text>
            </View>
            <Text style={styles.mainTitle}>{item.title[language]}</Text>
          </Animated.View>
        </View>

        {/* Content Body */}
        <Animated.View 
          entering={FadeInUp.delay(400).duration(600)}
          style={styles.contentBody}
        >
          <Text style={styles.sectionHeading}>{t('details')}</Text>
          <Text style={styles.descriptionText}>
            {item.description[language]}
          </Text>
          <Text style={styles.descriptionText}>
            This destination in Dodola is a perfect example of the region's natural and cultural richness, offering visitors a unique perspective on life in the Bale Highlands.
          </Text>

          {/* View on Map Button */}
          <TouchableOpacity 
            style={styles.mapButton}
            onPress={handleViewMap}
          >
            <MapPin color="#FFF" size={20} />
            <Text style={styles.mapButtonText}>{t('viewOnMap')}</Text>
          </TouchableOpacity>

          {/* Travel Tip Box */}
          <Animated.View 
            entering={FadeInDown.delay(600).duration(600)}
            style={styles.tipBox}
          >
            <View style={styles.tipHeader}>
              <Info color="#1A237E" size={20} />
              <Text style={styles.tipTitle}>{t('travelTip')}</Text>
            </View>
            <Text style={styles.tipContent}>
              {item.travelTip[language]}
            </Text>
          </Animated.View>
          
          <StarRating />

          <View style={{ height: 40 }} />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageHeader: {
    width: width,
    height: height * 0.55,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButtonWrapper: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  heartButtonWrapper: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  shareButtonWrapper: {
    position: 'absolute',
    top: 10,
    right: 75,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 25,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  badge: {
    backgroundColor: '#4ed054ff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'Inter_700Bold',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
    fontFamily: 'Inter_700Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  contentBody: {
    padding: 25,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 15,
    fontFamily: 'Inter_700Bold',
  },
  descriptionText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 26,
    marginBottom: 20,
    fontFamily: 'Inter_400Regular',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A237E',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  mapButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
    fontFamily: 'Inter_700Bold',
  },
  tipBox: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#1A237E',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A237E',
    marginLeft: 8,
    fontFamily: 'Inter_700Bold',
  },
  tipContent: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
  },
  ratingCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 20,
    padding: 20,
    marginTop: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFECB3',
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 15,
    fontFamily: 'Inter_700Bold',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starWrapper: {
    padding: 5,
  },
  ratingSubtext: {
    marginTop: 10,
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Inter_600SemiBold',
  },
});

export default DetailScreen;
