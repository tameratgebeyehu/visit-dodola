import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const COLORS = {
  activeBg: '#00E676',
  containerBg: '#333333',
  white: '#FFFFFF',
  gray: '#AAAAAA',
  textActive: '#121212',
};

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity 
        style={[styles.toggleBtn, language === 'en' && styles.toggleBtnActive]}
        onPress={() => setLanguage('en')}
        activeOpacity={0.7}
      >
        <Text style={[styles.toggleText, language === 'en' && styles.toggleTextActive]}>EN</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.toggleBtn, language === 'am' && styles.toggleBtnActive]}
        onPress={() => setLanguage('am')}
        activeOpacity={0.7}
      >
        <Text style={[styles.toggleText, language === 'am' && styles.toggleTextActive]}>አም</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.toggleBtn, language === 'or' && styles.toggleBtnActive]}
        onPress={() => setLanguage('or')}
        activeOpacity={0.7}
      >
        <Text style={[styles.toggleText, language === 'or' && styles.toggleTextActive]}>OR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.containerBg,
    borderRadius: 24,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#444444',
  },
  toggleBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  toggleBtnActive: {
    backgroundColor: COLORS.activeBg,
    shadowColor: COLORS.activeBg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9E9E9E',
    fontFamily: 'Inter_700Bold',
  },
  toggleTextActive: {
    color: '#121212',
  },
});

export default LanguageSelector;
