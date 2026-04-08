import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions 
} from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { Languages } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const LanguageSelectionScreen = ({ navigation }) => {
  const { setLanguage, t } = useLanguage();

  const handleSelect = async (lang) => {
    await setLanguage(lang);
    navigation.navigate('OnboardingSlides');
  };

  const languageOptions = [
    { code: 'en', label: 'English', sub: 'Dodola Discovery' },
    { code: 'am', label: 'አማርኛ', sub: 'ዶዶላን ይገንኙ' },
    { code: 'or', label: 'Afaan Oromoo', sub: 'Dodolaa Baruuf' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.header}>
          <View style={styles.iconContainer}>
            <Languages color="#00E676" size={40} />
          </View>
          <Text style={styles.title}>Language Selection</Text>
          <Text style={styles.subtitle}>Choose your preferred language to explore Dodola</Text>
        </Animated.View>

        <View style={styles.options}>
          {languageOptions.map((opt, index) => (
            <Animated.View 
              key={opt.code} 
              entering={FadeInDown.delay(400 + index * 100).duration(600)}
            >
              <TouchableOpacity 
                style={styles.button}
                onPress={() => handleSelect(opt.code)}
                activeOpacity={0.8}
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonLabel}>{opt.label}</Text>
                  <Text style={styles.buttonSub}>{opt.sub}</Text>
                </View>
                <View style={styles.circle} />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#AAAAAA',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  options: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: 85,
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    paddingHorizontal: 25,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#333333',
  },
  buttonContent: {
    flex: 1,
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  buttonSub: {
    fontSize: 14,
    color: '#00E676',
    fontFamily: 'Inter_600SemiBold',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00E676',
    backgroundColor: '#121212',
  },
});

export default LanguageSelectionScreen;
