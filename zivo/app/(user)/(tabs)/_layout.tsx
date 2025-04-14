import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'expo-router';

export default function TabNavigator() {
  const { t } = useTranslation(); // Çeviri hook'u

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#6D3B07',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#F7E6CA',
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
          height: 60,
          paddingBottom: 5,
        },
      })}
    >
      {/* Tab ekranlarını name ile çağırıyoruz */}
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'), // Çeviri anahtarı
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t('tabs.explore'), // Çeviri anahtarı
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: t('tabs.appointments'), // Çeviri anahtarı
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile'), // Çeviri anahtarı
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
