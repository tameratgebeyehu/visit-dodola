import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  StatusBar,
  Dimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedScrollHandler, 
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Mountain, MapPin, Clock, Wheat } from 'lucide-react-native';
import { useLanguage } from '../context/LanguageContext';
import { essenceData } from '../data/essenceData';

const { height, width } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.45;

const EssenceScreen = () => {
  const { language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('story');
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedHeroStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-100, 0, HEADER_HEIGHT], [1.2, 1, 1], Extrapolate.CLAMP);
    return { transform: [{ scale }] };
  });

  const renderIcon = (iconName) => {
    switch(iconName) {
      case 'Mountain': return <Mountain color="#00E676" size={20} />;
      case 'MapPin': return <MapPin color="#00E676" size={20} />;
      case 'Clock': return <Clock color="#00E676" size={20} />;
      case 'Wheat': return <Wheat color="#00E676" size={20} />;
      default: return null;
    }
  };

  const tabTitles = {
    en: { story: 'Story', facts: 'Facts', phrases: 'Phrases' },
    am: { story: 'ታሪክ', facts: 'እውነታዎች', phrases: 'ሐረጎች' },
    or: { story: 'Seenaa', facts: 'Dhugaa', phrases: 'Sagalee' },
  }[language] || { story: 'Story', facts: 'Facts', phrases: 'Phrases' };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Absolute Background Header */}
      <View style={styles.headerLayer}>
        <Animated.Image 
          source={require('../assets/images/bale_mountains.jpg')}
          style={[styles.heroImage, animatedHeroStyle]}
        />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(10, 10, 10, 0.45)' }]} />
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.heroSpacing}>
           <View style={styles.langBar}>
             {['en', 'am', 'or'].map((l) => (
                <TouchableOpacity key={l} style={[styles.langBtn, language === l && styles.langBtnActive]} onPress={() => setLanguage(l)}>
                  <Text style={[styles.langText, language === l && styles.langTextActive]}>{l.toUpperCase()}</Text>
                </TouchableOpacity>
             ))}
           </View>
        </View>

        {/* CONTENT CARD */}
        <View style={styles.contentCard}>

           {/* Pillar Tabs */}
           <View style={styles.tabsMenu}>
             {['story', 'facts', 'phrases'].map((t) => (
                <TouchableOpacity key={t} style={[styles.menuItem, activeTab === t && styles.menuItemActive]} onPress={() => setActiveTab(t)}>
                   <Text style={[styles.menuText, activeTab === t && styles.menuTextActive]}>{tabTitles[t]}</Text>
                </TouchableOpacity>
             ))}
           </View>

           {activeTab === 'story' && (
              <View>
                 <Text style={styles.storyTitle}>{essenceData.title[language]}</Text>
                 <Text style={styles.storyIntro}>{essenceData.intro[language]}</Text>
                 {essenceData.sections.filter(s => s.subtitle.en !== 'Market Days & Local Life').map((s, i) => (
                    <View key={`s-${i}`} style={styles.essayBox}>
                       <Text style={styles.essaySub}>{s.subtitle[language]}</Text>
                       <Text style={styles.essayPara}>{s.content[language]}</Text>
                    </View>
                 ))}
              </View>
           )}

           {/* 2. FACTS */}
           {activeTab === 'facts' && (
              <View>
                 <View style={styles.statsRow}>
                    {essenceData.quickFacts.map((f, i) => (
                       <View key={`f-${i}`} style={styles.statTile}>
                          <View style={styles.tileIcon}>{renderIcon(f.icon)}</View>
                          <Text style={styles.tileTitle}>{f.title[language]}</Text>
                          <Text style={styles.tileLabel}>{f.value}</Text>
                       </View>
                    ))}
                 </View>
                 {essenceData.sections.filter(s => s.subtitle.en === 'Market Days & Local Life').map((s, i) => (
                    <View key={`c-${i}`} style={styles.cultureFeature}>
                       <Text style={styles.essaySub}>{s.subtitle[language]}</Text>
                       <Text style={styles.essayPara}>{s.content[language]}</Text>
                    </View>
                 ))}
              </View>
           )}

           {/* 3. PHRASES — CLEAN TRILINGUAL TABLE */}
           {activeTab === 'phrases' && (
              <View>
                 <Text style={styles.phraseHead}>
                   {language === 'en' ? 'Mini Phrasebook' : (language === 'am' ? 'አስፈላጊ ሐረጎች' : 'Kitaaba Jechootaa')}
                 </Text>
                 <Text style={styles.phraseHint}>
                   {language === 'en' ? 'All three languages shown side by side.' : (language === 'am' ? 'ሶስቱም ቋንቋዎች ጎን ለጎን ይታያሉ።' : 'Afaanota sadanuu wal-bira qabu.')}
                 </Text>

                 {/* Render each category */}
                 {Object.keys(essenceData.phrases).map((catKey) => {
                    const category = essenceData.phrases[catKey];
                    return (
                      <View key={catKey} style={styles.categoryBlock}>
                         {/* Category Title */}
                         <Text style={styles.categoryTitle}>{category.title[language]}</Text>

                         {/* Table Header */}
                         <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>English</Text>
                            <Text style={styles.tableHeaderText}>አማርኛ</Text>
                            <Text style={styles.tableHeaderText}>Oromoo</Text>
                         </View>

                         {/* Table Rows */}
                         {category.items.map((p, idx) => (
                            <View key={`${catKey}-${idx}`} style={[styles.tableRow, idx % 2 === 0 && styles.tableRowAlt]}>
                               <Text style={styles.tableCellEn}>{p.en}</Text>
                               <Text style={styles.tableCell}>{p.am}</Text>
                               <Text style={styles.tableCell}>{p.or}</Text>
                            </View>
                         ))}
                      </View>
                    );
                 })}
              </View>
           )}

           <View style={{ height: 150 }} />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  headerLayer: { position: 'absolute', top: 0, width: '100%', height: HEADER_HEIGHT, zIndex: 0 },
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  scrollContent: { minHeight: height },
  heroSpacing: { height: HEADER_HEIGHT - 60, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 20 },
  
  langBar: { flexDirection: 'row', backgroundColor: '#161616', borderRadius: 20, padding: 4, borderWidth: 1, borderColor: '#222' },
  langBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16 },
  langBtnActive: { backgroundColor: '#00E676' },
  langText: { color: '#888', fontSize: 12, fontWeight: '700' },
  langTextActive: { color: '#0A0A0A' },

  contentCard: { 
    backgroundColor: '#0A0A0A', 
    borderTopLeftRadius: 35, 
    borderTopRightRadius: 35, 
    paddingHorizontal: 25, 
    paddingTop: 35, 
    marginTop: -20,
    zIndex: 10,  // CRITICAL: Higher than header to grab touches
    minHeight: height - HEADER_HEIGHT + 20
  },
  
  tabsMenu: { flexDirection: 'row', backgroundColor: '#141414', borderRadius: 20, padding: 5, marginBottom: 30, borderWidth: 1, borderColor: '#222' },
  menuItem: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 15 },
  menuItemActive: { backgroundColor: '#00E676' },
  menuText: { color: '#666', fontWeight: '700', fontSize: 14 },
  menuTextActive: { color: '#0A0A0A' },

  storyTitle: { fontSize: 26, color: '#00E676', fontWeight: '900', marginBottom: 16, lineHeight: 34 },
  storyIntro: { fontSize: 16, color: '#EEE', lineHeight: 28, marginBottom: 30 },
  essayBox: { marginBottom: 35 },
  essaySub: { fontSize: 20, color: '#00E676', fontWeight: '800', marginBottom: 12 },
  essayPara: { fontSize: 15, color: '#AAA', lineHeight: 26 },

  statsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  statTile: { width: '48%', backgroundColor: '#111', padding: 16, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: '#222' },
  tileIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(0,230,118,0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  tileTitle: { fontSize: 11, color: '#4B88E8', fontWeight: '900', letterSpacing: 1, marginBottom: 4 },
  tileLabel: { fontSize: 15, color: '#FFF', fontWeight: '700' },
  cultureFeature: { backgroundColor: '#111', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#222' },

  phraseHead: { fontSize: 22, color: '#FFF', fontWeight: '900', marginBottom: 4 },
  phraseHint: { fontSize: 14, color: '#555', marginBottom: 20 },

  // Category Sections
  categoryBlock: {
    marginBottom: 28,
  },
  categoryTitle: {
    fontSize: 17,
    color: '#00E676',
    fontWeight: '800',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Trilingual Table
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#00E676',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  tableHeaderText: {
    flex: 1,
    color: '#121212',
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#161616',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  tableRowAlt: {
    backgroundColor: '#1A1A1A',
  },
  tableCellEn: {
    flex: 1,
    color: '#00E676',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  tableCell: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
});

export default EssenceScreen;
