import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from '@/app/(tabs)/_layout';
import './i18n'; // i18n ayarlarını içe aktar
import { useTranslation } from 'react-i18next';
import { I18nManager, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';

export default function App() {
  const [ready, setReady] = useState(false);
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadLang = async () => {
      const storedLang = await AsyncStorage.getItem('language');
      const lang = storedLang || 'en';
      await i18n.changeLanguage(lang);
      I18nManager.forceRTL(lang === 'ar');
      setLoading(false);
    };

    loadLang();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
