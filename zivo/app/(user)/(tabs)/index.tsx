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
import { mockShops } from '@/mock/shops';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
     const filteredShops = selectedCategory
    ? mockShops.filter((shop) => shop.category === selectedCategory)
    : mockShops;


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
      name: 'asasasassa',
      image: 'https://i.pinimg.com/736x/d2/0c/40/d20c4023fbf0262faa2f8cc5a4450b6e.jpg',
    },
    {
      id: 2,
      name: 'hairSalon',
      image: 'https://i.pinimg.com/736x/67/79/4c/67794c0bcd653f29c8c404333b18f54f.jpg',
    },
    {
      id: 3,
      name: 'nailSalon',
      image: 'https://i.pinimg.com/736x/9c/5c/14/9c5c14c8973482abfe8423a9034b3a70.jpg',
    },
    {
      id: 4,
      name: 'barbershop',
      image: 'https://i.pinimg.com/736x/3a/cb/34/3acb34cb5c12ed20049006a8fe60e465.jpg',
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
    style={{ flex: 1, backgroundColor: theme.background , marginTop: 30 }} 
      contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 16, paddingBottom: 100 }}
    >
      <View className="items-center mb-8">
  <Image
    source={require('../../../assets/images/zivo (2).png')}
    style={{
      width: 100,
      height: 60,
      marginTop: 10,
      marginBottom:10,
      alignSelf: 'center', // Görüntüyü yatay olarak ortalar
    }}
  />
</View>

      {/* Avatar Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-9"
        contentContainerStyle={{
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
          alignItems: 'center',
          paddingHorizontal: 4,
        }}
      >
       {users.map((user) => (
  <TouchableOpacity
    key={user.id}
    onPress={() => setSelectedCategory(user.name === selectedCategory ? null : user.name)}
    style={{ marginHorizontal: 10, alignItems: 'center' }}
  >
    <View
      style={{
        borderWidth: user.name === selectedCategory ? 2 : 0,
        borderColor: user.name === selectedCategory ? theme.primary : 'transparent',
        borderRadius: 50, // Avatar'ı yuvarlak sarmalaması için
        padding: 2, // Biraz spacing vermesi için
      }}
    >
      <Avatar source={user.image} size={65} />
    </View>
    <Text
      className="mt-2"
      style={{
        fontSize: 12,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        maxWidth: 70,
        color: user.name === selectedCategory ? theme.primary : theme.text,
      }}
    >
      {t(user.name)}
    </Text>
  </TouchableOpacity>
))}

      </ScrollView>


      {/* Animated Cards */}
<Animated.View
  style={[
    {
      opacity: fadeAnim,
    },
    {
      paddingVertical: 16,
      backgroundColor: theme.background,
      marginLeft: 3,
    },
  ]}
>
  {/* Special Offers */}
  <Text
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

  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
      paddingHorizontal: 10,
    }}
  >
    {(selectedCategory
      ? mockShops.filter((shop) => shop.category === selectedCategory)
      : mockShops
    ).map((shop) => (
      <View
        key={shop.id}
        style={{
          width: 300,
          marginRight: 12,
        }}
      >
        <Card
          shopId={shop.id}
          image={{ uri: shop.image }}
          title={shop.name}
          description={shop.description}
          saveUpTo={shop.saveUpTo}
          rating={shop.rating}
          backgroundColor={theme.cardBackground}
        />
      </View>
    ))}
  </ScrollView>

  {/* Recommend */}
  <Text
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

  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
      paddingHorizontal: 10,
    }}
  >
    {(selectedCategory
      ? mockShops.filter((shop) => shop.category === selectedCategory)
      : mockShops
    ).map((shop) => (
      <View
        key={shop.id}
        style={{
          width: 300, 
          marginHorizontal: 6,
        }}
      >
        <Card
          shopId={shop.id}
          image={{ uri: shop.image }}
          title={shop.name}
          description={shop.description}
          saveUpTo={shop.saveUpTo}
          rating={shop.rating}
          backgroundColor={theme.cardBackground}
          style={{ width: '100%' }}
        />
      </View>
    ))}
  </ScrollView>
</Animated.View>


    </ScrollView>
  );
}
