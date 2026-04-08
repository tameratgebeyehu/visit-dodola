import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions
} from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { ChevronLeft } from 'lucide-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');

const ServiceDetailScreen = ({ route, navigation }) => {
  const { serviceItem } = route.params;
  const { language, t } = useLanguage();

  const title = serviceItem?.title?.[language] || 'Unknown';

  const handleCall = () => {
    if (serviceItem?.phone) {
      Linking.openURL(`tel:${serviceItem.phone}`);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft color="#FFFFFF" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{t('details')}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Massive Icon Banner */}
        <Animated.View entering={FadeInDown.duration(600)} style={styles.iconBanner}>
          <View style={styles.glowCircle}>
            <MaterialIcons name={serviceItem.icon || 'location-on'} size={80} color="#00E676" />
          </View>
        </Animated.View>

        {/* Title Area */}
        <Animated.View entering={FadeInUp.delay(100).duration(600)} style={styles.titleWrapper}>
          <Text style={styles.mainTitle}>{title}</Text>
          <View style={styles.badge}>
             <MaterialIcons name="verified" size={14} color="#00E676" />
             <Text style={styles.badgeText}>Directory Verified</Text>
          </View>
        </Animated.View>

        {/* Action Row */}
        {serviceItem?.phone && (
          <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.actionRow}>
            <TouchableOpacity style={styles.callButton} onPress={handleCall} activeOpacity={0.8}>
              <MaterialIcons name="call" size={24} color="#121212" />
              <Text style={styles.callButtonText}>{t('call')} {serviceItem.phone}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Conditionally Render Real Information Details OR 'Coming Soon' Placeholder */}
        {serviceItem?.description ? (
          <Animated.View entering={FadeInUp.delay(300).duration(600)} style={styles.contentBox}>
             <Text style={styles.textContent}>
               {serviceItem.description[language] || serviceItem.description['en']}
             </Text>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInUp.delay(300).duration(600)} style={styles.comingSoonBox}>
            <View style={styles.comingSoonHeader}>
               <MaterialIcons name="auto-awesome" size={20} color="#00E676" />
               <Text style={styles.comingSoonTitle}>Detailed Information</Text>
            </View>
            <Text style={styles.comingSoonText}>
              We are currently gathering high-quality photos, operating hours, and comprehensive details for {title}. 
              {"\n\n"}
              This section is coming soon in the next major update!
            </Text>
          </Animated.View>
        )}
        
        <View style={{ height: 60 }} />
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    zIndex: 10,
  },
  backBtn: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  iconBanner: {
    width: width,
    height: 250,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  glowCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.3)',
  },
  titleWrapper: {
    padding: 24,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,230,118,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#00E676',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    marginLeft: 6,
    textTransform: 'uppercase',
  },
  actionRow: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: '#00E676',
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButtonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
    marginLeft: 10,
  },
  comingSoonBox: {
    marginHorizontal: 24,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  comingSoonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  comingSoonTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    marginLeft: 8,
  },
  comingSoonText: {
    fontSize: 15,
    color: '#AAAAAA',
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
  },
  contentBox: {
    marginHorizontal: 24,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  textContent: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
    lineHeight: 24,
  },
});

export default ServiceDetailScreen;
