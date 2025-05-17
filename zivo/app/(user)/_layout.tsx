import React, { useContext } from "react";
import { Stack } from "expo-router";
import ThemeContext from "@/context/ThemeContext";

export default function UserRootLayout() {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background, 
        },
        headerTitleStyle: {
          color: theme.text, // Tema metin rengi
          fontSize: 30, // Başlık font boyutu
        },
        headerTintColor: theme.icon, // Header icon rengi
      }}
    >
      {/* Tablar için ekran */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Not Found sayfası */}
      <Stack.Screen name="+not-found" options={{ title: "Sayfa Bulunamadı" }} />
      <Stack.Screen
        name="shop/[shopId]/index"
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="AccountDetails"
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="Settings"
        options={{headerShown: false}}
      />
      
      <Stack.Screen
        name="BookingPage"
        options={{headerShown: false}}
      />




    </Stack>
  );
}
