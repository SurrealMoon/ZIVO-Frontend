import i18n from '@/i18n/i18n'; 
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';

export const changeAppLanguage = async (language: string) => {
  await i18n.changeLanguage(language);
 
};