import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Mountain, Droplets, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown, FadeInRight, Layout, SlideInDown, SlideOutDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const TrekkingScreen = () => {
  const { t } = useLanguage();
  const [selectedPeak, setSelectedPeak] = useState(null);

  // Quick Stats Data
  const stats = [
    { id: '1', title: t('highestPeak'), value: t('mtIlale'), icon: <Mountain color="#00E676" size={20} /> },
    { id: '2', title: t('terrain'), value: 'Highland', icon: <MapPin color="#00E676" size={20} /> },
    { id: '3', title: t('difficulty'), value: 'Moderate - Hard', icon: <ShieldCheck color="#00E676" size={20} /> },
  ];

  // Map Pins Coordinates (percentages)
  const mapPins = [
    { id: 'p1', top: '25%', left: '45%', title: t('mtIlale'), elevation: '3,800m', desc: 'The highest summit in the local Dodola mountain corridor. Provides sweeping panoramic views of the entire basin.' },
    { id: 'p2', top: '40%', left: '25%', title: t('mtKorduro'), elevation: '3,550m', desc: 'A deeply forested mountain peak known for endemic bird species and lush vegetation.' },
    { id: 'p3', top: '15%', left: '75%', title: t('mtSomkeru'), elevation: '3,700m', desc: 'A highly challenging rocky terrain often requiring a full day trek.' }
  ];

  // River Data
  const rivers = [
    { id: 'r1', name: t('rKeresa') },
    { id: 'r2', name: t('rUkuma') },
    { id: 'r3', name: t('rNegeso') },
    { id: 'r4', name: t('rGudeYerso') }
  ];

  const renderStatCard = ({ item, index }) => (
    <Animated.View entering={FadeInRight.delay(index * 100)} style={styles.statCard}>
      <View style={styles.statIconBadge}>{item.icon}</View>
      <View>
        <Text style={styles.statTitle}>{item.title}</Text>
        <Text style={styles.statValue}>{item.value}</Text>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Hero */}
        <Animated.View entering={FadeInDown.duration(600)}>
          <ImageBackground 
            source={require('../assets/images/bale_mountains.png')} 
            style={styles.heroBanner}
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitle}>Bale Mountains</Text>
              <Text style={styles.heroSubtitle}>The Ultimate Dodola Trek</Text>
            </View>
          </ImageBackground>
        </Animated.View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
           <Text style={styles.sectionHeader}>{t('quickStats')}</Text>
           <View style={styles.statsGrid}>
             {stats.map((item, index) => (
                <View key={item.id} style={styles.statCard}>
                  <View style={styles.statIconBadge}>{item.icon}</View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.statTitle}>{item.title}</Text>
                    <Text style={styles.statValue} numberOfLines={1}>{item.value}</Text>
                  </View>
                </View>
             ))}
           </View>
        </View>

        {/* Interactive Offline Map */}
        <View style={styles.mapSection}>
           <Text style={styles.sectionHeader}>{t('trekkingMap')}</Text>
           <View style={styles.mapWrapper}>
             <ImageBackground 
               source={require('../assets/images/bale_mountains.png')} // Currently using the banner as a map base
               style={styles.interactiveMap}
               imageStyle={{ opacity: 0.5, borderRadius: 16 }}
             >
               {/* Map Grid Lines for Tech Overlay Feel */}
               <View style={styles.gridOverlay} />

               {/* Map Pins */}
               {mapPins.map((pin) => (
                 <TouchableOpacity 
                   key={pin.id}
                   style={[styles.pinArea, { top: pin.top, left: pin.left }]}
                   onPress={() => setSelectedPeak(pin)}
                 >
                    <View style={styles.pinDot} />
                    <View style={styles.pinGlow} />
                 </TouchableOpacity>
               ))}
             </ImageBackground>
           </View>
           <Text style={styles.mapHelper}>Tap a glowing pin to view peak metrics</Text>
        </View>

        {/* Water Sources list */}
        <View style={styles.riverSection}>
           <View style={styles.riverHeaderRow}>
             <Droplets color="#00E676" size={24} />
             <Text style={[styles.sectionHeader, { marginBottom: 0, marginLeft: 10 }]}>{t('waterSources')}</Text>
           </View>
           <Text style={styles.riverContext}>{t('riverFlowDesc')}</Text>

           <FlatList 
             horizontal
             showsHorizontalScrollIndicator={false}
             data={rivers}
             keyExtractor={item => item.id}
             contentContainerStyle={{ paddingHorizontal: 20 }}
             renderItem={({item}) => (
               <View style={styles.riverCard}>
                  <Text style={styles.riverName}>{item.name}</Text>
               </View>
             )}
           />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.fabWrapper}>
         <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
            <PhoneCall color="#121212" size={22} />
            <Text style={styles.fabText}>{t('bookGuide')}</Text>
         </TouchableOpacity>
      </View>

      {/* Custom Modal for Interactive Pins */}
      <Modal
        visible={!!selectedPeak}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalBg}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setSelectedPeak(null)} />
          <Animated.View entering={SlideInDown} exiting={SlideOutDown} style={styles.modalContent}>
             <Text style={styles.modalTitle}>{selectedPeak?.title}</Text>
             <Text style={styles.modalElevation}>Elevation: {selectedPeak?.elevation}</Text>
             <Text style={styles.modalDesc}>{selectedPeak?.desc}</Text>

             <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setSelectedPeak(null)}>
               <Text style={styles.modalCloseTxt}>Close Module</Text>
             </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  heroBanner: {
    width: width,
    height: 250,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(18, 18, 18, 0.4)',
    justifyContent: 'flex-end',
    padding: 24,
  },
  heroTitle: {
    fontSize: 34,
    color: '#FFF',
    fontFamily: 'Inter_800ExtraBold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#00E676',
    fontFamily: 'Inter_600SemiBold',
    marginTop: 4,
  },
  statsContainer: {
    padding: 24,
    paddingTop: 30,
  },
  sectionHeader: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'column',
    gap: 12,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  statIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statTitle: {
    color: '#AAAAAA',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    marginBottom: 2,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  mapSection: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  mapWrapper: {
    width: '100%',
    height: 220,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  interactiveMap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.2)',
    borderRadius: 16,
  },
  pinArea: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00E676',
    zIndex: 2,
  },
  pinGlow: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 230, 118, 0.4)',
    zIndex: 1,
  },
  mapHelper: {
    color: '#777777',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginTop: 10,
  },
  riverSection: {
    marginBottom: 40,
  },
  riverHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  riverContext: {
    color: '#AAAAAA',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    paddingHorizontal: 24,
    marginBottom: 16,
    lineHeight: 20,
  },
  riverCard: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#00E676',
  },
  riverName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  fabWrapper: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  fab: {
    backgroundColor: '#00E676',
    flexDirection: 'row',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  fabText: {
    color: '#121212',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginLeft: 10,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    paddingBottom: 50,
  },
  modalTitle: {
    fontSize: 26,
    color: '#FFFFFF',
    fontFamily: 'Inter_800ExtraBold',
    marginBottom: 6,
  },
  modalElevation: {
    fontSize: 16,
    color: '#00E676',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
  },
  modalDesc: {
    fontSize: 16,
    color: '#AAAAAA',
    fontFamily: 'Inter_400Regular',
    lineHeight: 24,
    marginBottom: 30,
  },
  modalCloseBtn: {
    backgroundColor: '#333333',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalCloseTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  }
});

export default TrekkingScreen;
