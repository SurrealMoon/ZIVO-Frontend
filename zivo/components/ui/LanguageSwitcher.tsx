import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';  // RTL/LTR kontrolü için
import * as Updates from 'expo-updates';  // Expo güncellemeleri için
import { changeAppLanguage } from '@/utils/languageUtils';  // Dil değişim fonksiyonu

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  // Dil değiştirme fonksiyonu
  const toggleLanguage = async () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';

    console.log(`Switching language to: ${newLang}`);  // Log ile kontrol et

    // Dil değiştir
    await changeAppLanguage(newLang);

    // Yönü (RTL/LTR) değiştirme
    if (newLang === 'ar') {
      I18nManager.forceRTL(true);  // Arapça dilinde RTL yönünü aktif et
      console.log('Force RTL enabled');
    } else {
      I18nManager.forceRTL(false);  // Diğer dilde LTR yönünü aktif et
      console.log('Force LTR enabled');
    }

    // Dil değiştikten sonra Expo ile uygulamayı yenile
    try {
      await Updates.reloadAsync();  // Expo'da uygulamayı yeniden yükle
      console.log('App reloaded for language change');
    } catch (error) {
      console.error('Error reloading app:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('language')}</Text>
      <TouchableOpacity onPress={toggleLanguage} style={styles.button}>
        <Text style={styles.buttonText}>
          {i18n.language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
