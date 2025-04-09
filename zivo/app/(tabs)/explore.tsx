import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  I18nManager,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import Card from '@/components/Card';
import WhereModal from '@/components/WhereModal';
import { useTheme } from '@/context/ThemeContext';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [location, setLocation] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);

  const [showCalendar, setShowCalendar] = useState(false);
  const [showWhereModal, setShowWhereModal] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        const address = await Location.reverseGeocodeAsync(loc.coords);
        if (address.length > 0) {
          setLocation(`${address[0].city}, ${address[0].country}`);
        }
      }
    })();
  }, []);

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowCalendar(false);
    if (selectedDate) setDate(selectedDate);
  };

  const services = [
    {
      id: 1,
      name: 'Facial',
      image: 'https://i.pinimg.com/736x/3c/e1/b8/3ce1b8629e77d4105835203049abf3fc.jpg',
    },
    {
      id: 2,
      name: 'Massage',
      image: 'https://i.pinimg.com/736x/17/89/a7/1789a7d36266eda5d942886722d48ef7.jpg',
    },
  ];

  return (
    <ScrollView
      className="flex-1 bg-orange-50 dark:bg-black"
      contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 16, paddingBottom: 100 }}
    >
    

      {/* Search Bar */}
      <View
        className={`flex-row items-center space-x-4 space-y-3 mt-5 ${
          I18nManager.isRTL ? 'flex-row-reverse' : ''
        }`}
      >
        <TextInput
          placeholder={t('search')}
          style={{ textAlign: I18nManager.isRTL ? 'right' : 'left' }}
          iconLeft={<Ionicons name="search" size={20} color="gray" />}
          className="flex-1 h-16 bg-white dark:bg-gray-800"
        />
      </View>

      <View style={{ flexDirection: 'row', gap: 12, marginVertical: 12 }}>
  {/* WHERE */}
  <TouchableOpacity
    onPress={() => setShowWhereModal(true)}
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: '#FFF1E7', 
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      gap: 8,
    }}
  >
    <Ionicons name="location-outline" size={20} color="gray" />
    <Text style={{ color: '#374151' }}>
      { t('where')}
    </Text>
  </TouchableOpacity>

  {/* WHEN */}
  <TouchableOpacity
    onPress={() => setShowCalendar(true)}
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: '#FFF1E7',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      gap: 8,
    }}
>
  <Ionicons name="calendar-outline" size={20} color="gray" />
  <Text style={{ color: '#374151' }}>
  {date ? date.toLocaleDateString() : t('when')}
  </Text>
</TouchableOpacity>

</View>

      {showCalendar && (
        <DateTimePicker
        value={date ?? new Date()}
          mode="date"
          is24Hour
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Modal visible={showWhereModal} animationType="slide">
        <WhereModal onClose={() => setShowWhereModal(false)} onSelect={(loc) => setLocation(loc)} />
      </Modal>

   

      {/* Services */}
      <Animated.View style={{ opacity: fadeAnim }}>
  {/* Special Offers */}
  <Text
    className="text-xl font-bold"
    style={{
      color: theme.text,
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 12,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      alignSelf: I18nManager.isRTL ? 'flex-end' : 'flex-start',
    }}
  >
    {t('specialOffers')}
  </Text>

  <Card
    image={{ uri: 'https://i.pinimg.com/736x/3c/e1/b8/3ce1b8629e77d4105835203049abf3fc.jpg' }}
    className="w-full mb-6"
    title="Awesome Store"
    description="123 Example Street, City, Country"
    saveUpTo="Save up to 10%"
    rating={4.5}
    style={{
      borderWidth: 1,
      borderColor: '#e5e7eb',
      borderRadius: 12,
    }}
  />

  {/* Recommend */}
  <Text
    className="text-xl font-bold"
    style={{
      color: theme.text,
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 12,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      alignSelf: I18nManager.isRTL ? 'flex-end' : 'flex-start',
    }}
  >
    {t('recommend')}
  </Text>

  <Card
    image={{ uri: 'https://i.pinimg.com/736x/17/89/a7/1789a7d36266eda5d942886722d48ef7.jpg' }}
    className="w-full mb-6"
    title="Another Store"
    description="456 Market Road, Another City"
    saveUpTo="Save up to 20%"
    rating={4.8}
    style={{
      borderWidth: 1,
      borderColor: '#e5e7eb',
      borderRadius: 12,
    }}
  />
</Animated.View>

    </ScrollView>
  );
}
