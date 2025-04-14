import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, // Giriş ve Kayıt sayfalarında başlık görünür
        headerStyle: {
          backgroundColor: "white", // İstediğiniz bir arka plan rengi
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
          color: "#333", // Başlık yazı rengi
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Giriş Yap",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Kayıt Ol",
        }}
      />
    </Stack>
  );
}
