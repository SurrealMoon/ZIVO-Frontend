import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  I18nManager,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import Card from '@/components/Card';
import Avatar from '@/components/ui/Avatar';
import { useTheme } from '@/context/ThemeContext';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const users = [
    {
      id: 1,
      name: 'tattooshop',
      image: 'https://i.pinimg.com/736x/d2/0c/40/d20c4023fbf0262faa2f8cc5a4450b6e.jpg',
    },
    {
      id: 2,
      name: 'hairSalon',
      image: 'https://i.pinimg.com/736x/80/bd/34/80bd3441fa0203f9150d997608fdd845.jpg',
    },
    {
      id: 3,
      name: 'nailSalon',
      image: 'https://i.pinimg.com/736x/ac/ef/8b/acef8b2e74c71f8710f68b615e664407.jpg',
    },
    {
      id: 4,
      name: 'barbershop',
      image: 'https://i.pinimg.com/736x/ca/db/f1/cadbf14b04e5d7bf5e1eebb8a1ecfef6.jpg',
    },
    {
      id: 5,
      name: 'skinCare',
      image: 'https://i.pinimg.com/736x/e2/bd/41/e2bd41e8ebb4b07923704d6451924bd8.jpg',
    },
    {
      id: 6,
      name: 'massage',
      image: 'https://i.pinimg.com/736x/53/35/b4/5335b4b7ed80f8622f6a44e9ee1c43d4.jpg',
    },
    {
      id: 7,
      name: 'browsLashes',
      image: 'https://i.pinimg.com/736x/35/6f/18/356f1836a6c6a53f95c30835d6139341.jpg',
    },
    {
      id: 8,
      name: 'petServices',
      image: 'https://i.pinimg.com/736x/f4/46/1b/f4461bb159cb03792764281e5b5992d6.jpg',
    },
  ];

  return (
    <ScrollView
      className="flex-1 bg-orange-50 dark:bg-black"
      contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 16, paddingBottom: 100 }}
    >
      <View className="items-center mb-8">
        <Image
          source={require('../../assets/images/zivo (2).png')}
          style={{ width: 100, height: 60 , marginTop: 20}}
        />
      </View>

      {/* Search Bar */}
      <View
        className={`flex-row items-center mt-1 space-x-4 space-y-3 ${
          I18nManager.isRTL ? 'flex-row-reverse' : ''
        }`}
      >
        <TextInput
          placeholder={t('search')}
          style={{ textAlign: I18nManager.isRTL ? 'right' : 'left', }}
          iconLeft={<Ionicons name="search" size={20} color="gray" />}
          className="flex-1 h-16 bg-white dark:bg-black"
         
        />
      </View>

      {/* Avatar Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-8"
        contentContainerStyle={{
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        }}
      >
        {users.map((user) => (
          <View key={user.id} className="items-center mr-4">
            <Avatar source={user.image} size={60} />
            <Text
              className="text-xs mt-1 text-center"
              style={{ textAlign: I18nManager.isRTL ? 'right' : 'left' }}
            >
              {t(user.name)}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Animated Cards */}
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
