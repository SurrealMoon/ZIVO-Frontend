import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons  } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'expo-router';

export default function TabNavigator() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#f1c338',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
          height: 60,
          paddingBottom: 5,
        },
        tabBarIcon: ({ focused, color }) => {
          const iconSize = focused ? 29 : 28; 
          const scale = focused ? 1.2 : 1; 

          return (
            <View style={[styles.iconContainer, { transform: [{ scale }] }]}>
              <Ionicons
                name={
                  route.name === 'index'
                    ? 'home-outline'
                    : route.name === 'explore'
                    ? 'search-outline'
                    : route.name === 'appointments'
                    ? 'calendar-outline'
                    : 'person-outline'
                }
                size={iconSize} 
                color={color}
              />
            </View>
          );
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t('tabs.explore'),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: t('tabs.appointments'),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile'),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
