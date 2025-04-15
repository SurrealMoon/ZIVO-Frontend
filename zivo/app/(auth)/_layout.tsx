import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "white",
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
          color: "#333",
        },
      }}
    >
      <Stack.Screen
        name="index" // Sadece tek bir ekran tanımlı
        options={{
          title: "Giriş Yap", // İlk durumda login için başlık
        }}
      />
    </Stack>
  );
}
