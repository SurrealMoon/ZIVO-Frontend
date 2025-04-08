import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  I18nManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage } from '@/utils/languageUtils';
import { useTheme } from '@/context/ThemeContext';
import Switch from '@/components/ui/Switch';
import Button from '@/components/ui/Button';
import {
  Camera,
  User,
  CalendarDays,
  Settings,
  LogOut,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const [isArabic, setIsArabic] = useState(i18n.language === 'ar');

  const toggleLanguage = async (value: boolean) => {
    setIsArabic(value);
    const nextLang = value ? 'ar' : 'en';
    await changeAppLanguage(nextLang);
  };

  return (
    <View className="flex-1 bg-orange-50 pt-10 px-4">
      {/* Profile Picture and Camera Icon */}
      <View className="items-center mt-10 relative">
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/cf/ac/90/cfac90d25b474df10cd71ebc632e7ef1.jpg' }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Pressable className="absolute right-2 top-2 bg-white p-1 rounded-full">
          <Camera size={24} color="#000" />
        </Pressable>
        <Text className="mt-4 text-xl font-bold text-black dark:text-white">Aisha Khalid</Text>
      </View>

      {/* Language Toggle */}
      <View className={`flex-row items-center mt-6 ${I18nManager.isRTL ? 'justify-start' : 'justify-end'}`}>
        <Text className="mr-2 text-black dark:text-white">{t('language')}</Text>
        <Switch value={isArabic} onValueChange={toggleLanguage} />
      </View>

      {/* Buttons Section */}
      <View className="mt-10 space-y-4 mb-3">
        <Button
          icon={<User size={24} color="#000" />}
          title={t('editProfile')}
          onPress={() => {}}
          className='mb-3'
        />
        <Button
          icon={<CalendarDays size={24} color="#000" />}
          title={t('myAppointments')}
          onPress={() => {}}
            className='mb-3'
        />
        <Button
          icon={<Settings size={24} color="#000" />}
          title={t('settings')}
          onPress={() => {}}
            className='mb-3'
        />

        <View className="border-b border-gray-300 my-2" />

        <Button
          icon={<LogOut size={24} color="#000" />}
          title={t('logout')}
          onPress={() => {}}
         className='mb-3'
        />
      </View>
    </View>
  );
}
