import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ChevronLeft } from 'lucide-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { services } from '../data/infoData';

const InfoScreen = ({ navigation }) => {
  const { language, t } = useLanguage();
  
  // Default to the first category key
  const categoryKeys = Object.keys(services);
  const [activeTab, setActiveTab] = useState(categoryKeys[0]);

  const renderCard = (item, isSub = false, index = 0) => {
    return (
      <Animated.View 
        key={item.id} 
        entering={FadeInDown.delay(index * 50).duration(400)}
      >
        <TouchableOpacity 
          style={[styles.card, isSub && styles.subCard]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ServiceDetail', { serviceItem: item })}
        >
          <View style={styles.iconBox}>
            <MaterialIcons name={item.icon} size={24} color="#00E676" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title[language]}</Text>
            {item.phone ? (
              <Text style={styles.cardPhone}>{item.phone}</Text>
            ) : (
              <Text style={styles.cardDiscover}>{t('readMore')}...</Text>
            )}
          </View>
          <View style={styles.actionArrow}>
            <MaterialIcons name="arrow-forward-ios" size={14} color="#AAAAAA" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderContent = () => {
    const sectionData = services[activeTab];
    if (!sectionData) return null;

    if (sectionData.type === 'flat') {
      return (
        <View style={styles.listContainer}>
          {sectionData.items.map((item, idx) => renderCard(item, false, idx))}
        </View>
      );
    }

    if (sectionData.type === 'nested') {
      let absoluteIndex = 0;
      return (
        <View style={styles.listContainer}>
          {Object.keys(sectionData.subcategories).map((subKey, catIdx) => (
            <View key={subKey} style={[styles.subCategoryContainer, catIdx === 0 && { marginTop: 0 }]}>
              <View style={styles.subCategoryHeader}>
                 <Text style={styles.subCategoryTitle}>{t(subKey) || subKey}</Text>
                 <View style={styles.subCategoryLine} />
              </View>
              {sectionData.subcategories[subKey].map(item => {
                const card = renderCard(item, true, absoluteIndex);
                absoluteIndex++;
                return card;
              })}
            </View>
          ))}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Heavy Premium Header */}
      <View style={styles.header}>
        {navigation.canGoBack() && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ChevronLeft color="#FFFFFF" size={28} />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Directory</Text>
      </View>

      {/* Horizontal Pill Navigation */}
      <View style={styles.tabWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          {categoryKeys.map((key) => {
            const isActive = activeTab === key;
            const translationKey = key === 'public' ? 'publicServices' : key;
            const title = t(translationKey) || key;

            return (
              <TouchableOpacity 
                key={key}
                style={[styles.pill, isActive && styles.pillActive]}
                onPress={() => setActiveTab(key)}
                activeOpacity={0.7}
              >
                <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                  {title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Dynamic Body Render */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.bodyScroll}>
        {renderContent()}
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
  },
  backBtn: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.5,
  },
  tabWrapper: {
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  tabScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#333333',
  },
  pillActive: {
    backgroundColor: '#00E676',
    borderColor: '#00E676',
  },
  pillText: {
    color: '#AAAAAA',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  pillTextActive: {
    color: '#121212',
  },
  bodyScroll: {
    paddingTop: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  subCategoryContainer: {
    marginTop: 24,
    marginBottom: 8,
  },
  subCategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  subCategoryTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#00E676',
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginRight: 12,
  },
  subCategoryLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333333',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  subCard: {
    backgroundColor: '#1A1A1A',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  cardPhone: {
    fontSize: 13,
    color: '#00E676',
    fontFamily: 'Inter_600SemiBold',
  },
  cardDiscover: {
    fontSize: 13,
    color: '#757575',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },
  actionArrow: {
    paddingLeft: 8,
  },
});

export default InfoScreen;
