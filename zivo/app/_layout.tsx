import '@/i18n/i18n';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Slot } from 'expo-router';
import { ThemeProvider } from '@/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { ZivoQueryProvider } from '@/context/QueryClientProvider';
import Toast from 'react-native-toast-message';
import { I18nManager } from 'react-native';

import * as Updates from 'expo-updates';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const prepareApp = async () => {
      // RTL'i tamamen kapat (hem izin hem yön)
      if (I18nManager.isRTL) {
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);

    
        await Updates.reloadAsync();
        return;
      }

      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setLoading(false);
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  if (loading) {
    return null;
  }

  return (
    <ZivoQueryProvider>
      <ThemeProvider>
        <Slot />
        <Toast />
        <StatusBar style="auto" />
      </ThemeProvider>
    </ZivoQueryProvider>
  );
}
