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
import AuthGate from '@/components/AuthGate'; // 👈 yeni component

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const prepareApp = async () => {
      if (I18nManager.isRTL) {
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
        await Updates.reloadAsync();
        return;
      }

      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ZivoQueryProvider>
      <ThemeProvider>
        <AuthGate>
          <Slot />
        </AuthGate>
        <Toast />
        <StatusBar style="auto" />
      </ThemeProvider>
    </ZivoQueryProvider>
  );
}
