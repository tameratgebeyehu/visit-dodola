import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Linking,
  Platform,
  Image
} from 'react-native';
import { 
  Phone, 
  ChevronLeft,
  Info as InfoIcon 
} from 'lucide-react-native';
import { useLanguage } from '../LanguageContext';
import { infoData } from '../infoData';

const InfoScreen = ({ navigation }) => {
  const { language, t } = useLanguage();

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const renderContactRow = (item, isEmergency = false) => {
    return (
      <View key={item.id} style={styles.card}>
        <View style={[styles.iconBox, isEmergency && styles.emergencyIconBg]}>
          <Image source={item.icon} style={styles.cardIcon} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title[language]}</Text>
          <Text style={styles.cardPhone}>{item.phone}</Text>
        </View>
        <TouchableOpacity 
          style={styles.callBtn}
          onPress={() => handleCall(item.phone)}
        >
          <Phone color="#FFF" size={18} />
          <Text style={styles.callBtnText}>{t('call')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft color="#1A237E" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('info')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Emergency Section */}
        <Text style={styles.sectionTitle}>{t('emergencyContacts')}</Text>
        {infoData.emergencyContacts.map(item => renderContactRow(item, true))}

        {/* Administrative Section */}
        <Text style={[styles.sectionTitle, { marginTop: 25 }]}>{t('adminOffices')}</Text>
        {infoData.adminOffices.map(item => renderContactRow(item))}

        {/* About Section */}
        <View style={styles.aboutBox}>
          <View style={styles.aboutHeader}>
            <InfoIcon color="#2E7D32" size={22} />
            <Text style={styles.aboutTitle}>{t('aboutDodola')}</Text>
          </View>
          <Text style={styles.aboutText}>
            {infoData.aboutDodola[language]}
          </Text>
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backBtn: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A237E',
    marginLeft: 10,
    fontFamily: 'Inter_700Bold',
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    fontFamily: 'Inter_700Bold',
    paddingLeft: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#E8EAF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  emergencyIconBg: {
    backgroundColor: '#FFEBEE',
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A237E',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 2,
  },
  cardPhone: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter_400Regular',
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  callBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 5,
    fontFamily: 'Inter_700Bold',
  },
  aboutBox: {
    marginTop: 40,
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D32',
    marginLeft: 10,
    fontFamily: 'Inter_700Bold',
  },
  aboutText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#2E7D32',
    fontFamily: 'Inter_400Regular',
    opacity: 0.9,
  },
});

export default InfoScreen;
