import React, { useContext } from "react";
import { Stack } from "expo-router";
import ThemeContext from "@/context/ThemeContext"; 

export default function UserRootLayout() {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background, // Tema arka plan rengi
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

      {/* Kullanıcı sayfalarına ait ekranlar 
       <Stack.Screen
        name="Car-Details-Page"
        options={{ title: "Araç Detayları" }}
      />
      <Stack.Screen
        name="Service-Details-Page"
        options={{ title: "Servis Detayları" }}
      />
      <Stack.Screen
        name="Service-Appointment-Page"
        options={{ title: "Randevu Al" }}
      />*/}
     

    
     
    </Stack>
  );
}
