import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  FlatList, 
  Dimensions 
} from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import Animated, { 
  FadeInRight, 
  FadeInLeft,
  Layout 
} from 'react-native-reanimated';
import { ArrowRight, CheckCircle } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const OnboardingSlidesScreen = ({ navigation }) => {
  const { t, completeOnboarding } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const slides = [
    {
      id: '1',
      title: 'onboarding1Title',
      desc: 'onboarding1Desc',
      image: require('../../assets/images/bale_mountains.jpg'),
      color: '#E8F5E9',
    },
    {
      id: '2',
      title: 'onboarding2Title',
      desc: 'onboarding2Desc',
      image: require('../../assets/images/horse_market.jpg'),
      color: '#E3F2FD',
    },
    {
      id: '3',
      title: 'onboarding3Title',
      desc: 'onboarding3Desc',
      image: require('../../assets/images/hero.jpg'), // Using hero as emergency info backdrop for now
      color: '#FFEBEE',
    },
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    await completeOnboarding();
    // Navigation will be handled by App.js state change, 
    // but we can also navigate explicitly if needed.
  };

  const renderSlide = ({ item, index }) => (
    <View style={[styles.slide, { width }]}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.imageOverlay} />
      </View>
      
      <View style={styles.textSection}>
        <Animated.View 
          key={`title-${currentIndex}-${index}`}
          entering={FadeInRight.duration(600)}
          style={styles.textWrapper}
        >
          <Text style={styles.slideTitle}>{t(item.title)}</Text>
          <Text style={styles.slideDesc}>{t(item.desc)}</Text>
        </Animated.View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {slides.map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.dot, 
                currentIndex === i ? styles.activeDot : styles.inactiveDot
              ]} 
            />
          ))}
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={[styles.nextButton, currentIndex === slides.length - 1 && styles.getStartedBtn]} 
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? t('getStarted') : t('next')}
          </Text>
          {currentIndex === slides.length - 1 ? (
            <CheckCircle color="#121212" size={20} style={styles.btnIcon} />
          ) : (
            <ArrowRight color="#121212" size={20} style={styles.btnIcon} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: width,
    height: height * 0.55,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  textSection: {
    flex: 1,
    padding: 40,
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    alignItems: 'center',
  },
  textWrapper: {
    alignItems: 'center',
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  slideDesc: {
    fontSize: 15,
    color: '#AAAAAA',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 26,
  },
  footer: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    backgroundColor: '#1E1E1E',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#00E676',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#333333',
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#00E676',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  getStartedBtn: {
    backgroundColor: '#00E676',
  },
  buttonText: {
    color: '#121212',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
  },
  btnIcon: {
    marginLeft: 10,
  },
});

export default OnboardingSlidesScreen;
