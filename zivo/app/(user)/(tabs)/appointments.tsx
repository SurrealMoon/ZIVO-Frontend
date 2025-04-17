import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, Animated, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';
import Avatar from '@/components/ui/Avatar';
import AppointmentsList from '@/components/AppointmentList';

const appointmentsMock = {
  upcoming: [
    {
      id: 1,
      business: 'Casablanca Beauty Salon',
      service: 'Hair Cut + Shampoo',
      time: '01.00-01.30 pm',
      date: '2025-06-28',
      image: require('../../../assets/images/salon1.png'),
    },
    {
      id: 2,
      business: 'Ali’s Hair Salon',
      service: 'Hair Cut + Beard Shave',
      time: '03.00-04.00 pm',
      date: '2025-06-29',
      image: require('../../../assets/images/salon2.png'),
    },
  ],
  past: [
    {
      id: 3,
      business: 'Glow Skin Care Center',
      service: 'Deep Cleansing Facial',
      time: '10.00-10.45 am',
      date: '2025-06-25',
      image: require('../../../assets/images/skincare.png'),
    },
    {
      id: 4,
      business: 'Nail Art Studio',
      service: 'Gel Nail Design',
      time: '12.00-12.30 pm',
      date: '2025-06-24',
      image: require('../../../assets/images/nailart.png'),
    },
  ],
  cancelled: [],
};

export default function AppointmentsScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selectedTab, setSelectedTab] = React.useState<'past' | 'upcoming' | 'cancelled'>('upcoming');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const tabs: { key: 'upcoming' | 'past' | 'cancelled'; label: string }[] = [
    { key: 'past', label: t('past') },
    { key: 'upcoming', label: t('upcoming') },
    { key: 'cancelled', label: t('cancelled') },
  ];
  
 
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background, marginTop: 30 }}
      contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 16, paddingBottom: 100 }}
    >
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
        <Avatar
          source={{
            uri: 'https://i.pinimg.com/736x/cf/ac/90/cfac90d25b474df10cd71ebc632e7ef1.jpg',
          }}
          size={60}
        />
        <View style={{ marginLeft: 16, flex: 1 }}>
          <Text style={{ color: theme.text, fontSize: 18, fontWeight: '600' }}>Aisha Khalid</Text>
        </View>
        <Ionicons name="notifications-outline" size={24} color={theme.icon} />
      </View>

      {/* Tabs */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}>
  {tabs.map((tab) => (
    <TouchableOpacity
      key={tab.key}
      onPress={() => setSelectedTab(tab.key)}
      style={{
        backgroundColor: selectedTab === tab.key ? theme.primary : theme.secondary,
        borderRadius: 25,
        width: 110, // Sabit genişlik
        paddingVertical: 8,
        marginHorizontal: -5, // Kenarları birleştirmek için negatif margin
        justifyContent: 'center', // Dikey ortalamak
        alignItems: 'center', // Yatay ortalamak
        zIndex: selectedTab === tab.key ? 1 : 0, // Hover olan buton öne çıksın
        transform: selectedTab === tab.key
          ? [{ scale: 1.1 }]  // Hover butonunu biraz büyüt
          : [{ scale: 1 }], // Diğer butonlar normal boyutta
       
      }}
    >
      <Text
        style={{
          color: selectedTab === tab.key ? theme.text :  theme.textInverted,
          fontSize: 14,
          fontWeight: '500',
        }}
      >
        {tab.label}
      </Text>
    </TouchableOpacity>
  ))}
</View>

      {/* Appointments */}
      <Animated.View style={{ opacity: fadeAnim }}>
      <AppointmentsList 
  appointments={appointmentsMock[selectedTab]} 
    selectedTab={selectedTab}
/>

      </Animated.View>
    </ScrollView>
  );
}
