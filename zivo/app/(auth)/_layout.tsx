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
        name="index" 
        options={{
          headerShown:false, 
        }}
      />
    </Stack>
  );
}
