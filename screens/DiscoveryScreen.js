import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  StatusBar,
  Platform,
  Keyboard
} from 'react-native';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  Layout, 
  SlideInRight, 
  SlideOutRight 
} from 'react-native-reanimated';
import { Search, MapPin, X, ArrowRight, Home, Building2, Coffee, BookOpen } from 'lucide-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { placesData } from '../data/placesData';
import { services } from '../data/infoData';

const { width, height } = Dimensions.get('window');

const DiscoveryScreen = ({ navigation }) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  // 1. Flatten Data (same universal engine as Directory)
  const combinedData = useMemo(() => {
    const places = placesData.map(p => ({ ...p, _dataType: 'place' }));
    
    const svcs = [];
    Object.keys(services).forEach(key => {
      const cat = services[key];
      if (cat.type === 'flat') {
        cat.items.forEach(item => svcs.push({ ...item, _dataType: 'service' }));
      } else if (cat.type === 'nested') {
        Object.keys(cat.subcategories).forEach(sub => {
          cat.subcategories[sub].forEach(item => svcs.push({ ...item, _dataType: 'service' }));
        });
      }
    });

    return [...places, ...svcs];
  }, []);

  // 2. Filter Logic
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return combinedData.filter(item => item._dataType === 'place');
    }
    const query = searchQuery.toLowerCase();
    
    return combinedData.filter(item => {
      const titleMatches = item.title && (
        item.title.en?.toLowerCase().includes(query) ||
        item.title.am?.includes(query) ||
        item.title.or?.toLowerCase().includes(query)
      );
      return titleMatches;
    });
  }, [searchQuery, combinedData]);

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearchQuery('');
      Keyboard.dismiss();
    }
  };

  const getServiceIcon = (iconName) => {
    if (iconName === 'hotel') return <Home size={18} color="#00E676" />;
    if (iconName === 'account-balance') return <Building2 size={18} color="#00E676" />;
    if (iconName === 'restaurant' || iconName === 'coffee') return <Coffee size={18} color="#00E676" />;
    if (iconName === 'school') return <BookOpen size={18} color="#00E676" />;
    return <MaterialIcons name={iconName || "info"} size={18} color="#00E676" />;
  };

  const renderItem = ({ item, index }) => {
    if (item._dataType === 'service') {
      return (
        <Animated.View 
          entering={FadeInDown.delay((index % 10) * 50).springify()}
          layout={Layout.springify()}
        >
          <TouchableOpacity 
             style={styles.premiumServiceCard}
             activeOpacity={0.8}
             onPress={() => navigation.navigate('ServiceDetail', { serviceItem: item })}
          >
             <View style={styles.serviceIconContainer}>
               {getServiceIcon(item.icon)}
             </View>
             <View style={styles.serviceTextContainer}>
                <Text style={styles.serviceTitle}>{item.title[language]}</Text>
                {item.phone && <Text style={styles.serviceSub}>{item.phone}</Text>}
             </View>
             <ArrowRight size={20} color="#00E676" />
          </TouchableOpacity>
        </Animated.View>
      );
    }

    return (
      <Animated.View 
        entering={FadeInDown.delay((index % 10) * 50).springify()}
        layout={Layout.springify()}
      >
        <TouchableOpacity 
          style={styles.placeCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Detail', { item })}
        >
          <Image source={item.image} style={styles.placeImage} />
          <View style={styles.placeOverlay}>
             <View style={styles.placeBadge}>
               <Text style={styles.placeBadgeText}>{t(item.category.toLowerCase()) || item.category}</Text>
             </View>
             <Text style={styles.placeTitle}>{item.title[language]}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Dynamic Header */}
      <View style={styles.header}>
        <Animated.Text style={[styles.headerTitle, { opacity: isSearchActive ? 0 : 1 }]}>
          {t('explore') || 'Explore Dodola'}
        </Animated.Text>
        
        {isSearchActive && (
          <Animated.View entering={SlideInRight} exiting={SlideOutRight} style={styles.searchBarWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder={t('search') || 'Search everything...'}
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </Animated.View>
        )}

        <TouchableOpacity onPress={handleSearchToggle} style={styles.searchIconBtn}>
          {isSearchActive ? <X color="#FFF" size={24} /> : <Search color="#FFF" size={24} />}
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredData}
          keyExtractor={item => `${item._dataType}-${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 16 : 45,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#0A0A0A',
    zIndex: 10,
  },
  headerTitle: { fontSize: 26, color: '#FFFFFF', fontFamily: 'Inter_800ExtraBold' },
  searchIconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center' },
  searchBarWrapper: { position: 'absolute', left: 20, right: 75, bottom: 16, height: 44, backgroundColor: '#1A1A1A', borderRadius: 22, paddingHorizontal: 16, justifyContent: 'center' },
  searchInput: { color: '#FFF', fontSize: 16, fontFamily: 'Inter_400Regular' },
  
  listContainer: { paddingHorizontal: 20, paddingBottom: 100, paddingTop: 10 },
  
  placeCard: { width: '100%', height: 200, borderRadius: 20, marginBottom: 20, overflow: 'hidden' },
  placeImage: { width: '100%', height: '100%' },
  placeOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: 'rgba(10,10,10,0.5)' },
  placeBadge: { backgroundColor: '#00E676', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 8 },
  placeBadgeText: { color: '#121212', fontSize: 10, fontFamily: 'Inter_800ExtraBold', textTransform: 'uppercase' },
  placeTitle: { fontSize: 22, color: '#FFFFFF', fontFamily: 'Inter_700Bold', textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4 },

  premiumServiceCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#141414', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#222' },
  serviceIconContainer: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(0, 230, 118, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  serviceTextContainer: { flex: 1 },
  serviceTitle: { fontSize: 16, color: '#FFFFFF', fontFamily: 'Inter_600SemiBold', marginBottom: 4 },
  serviceSub: { fontSize: 13, color: '#888', fontFamily: 'Inter_400Regular' }
});

export default DiscoveryScreen;
