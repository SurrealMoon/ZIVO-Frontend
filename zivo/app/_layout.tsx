import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Slot } from 'expo-router';
import { ThemeProvider } from '@/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { ZivoQueryProvider } from '@/context/QueryClientProvider';
import Toast from 'react-native-toast-message';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setLoading(false);
    }
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
