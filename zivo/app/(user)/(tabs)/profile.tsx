import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  I18nManager,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage } from '@/utils/languageUtils';
import { useTheme } from '@/context/ThemeContext';
import Switch from '@/components/ui/Switch';
import Button from '@/components/ui/Button';
import { Camera, User, CalendarDays, Settings, LogOut } from 'lucide-react-native';
import FileUpload from '@/components/FileUpload';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const [isArabic, setIsArabic] = useState(i18n.language === 'ar');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const toggleLanguage = async (value: boolean) => {
    setIsArabic(value);
    const nextLang = value ? 'ar' : 'en';
    await changeAppLanguage(nextLang);
  };

  const handleLogout = () => {
    Alert.alert(
      t('logoutConfirmation'),
      t('areYouSureToLogout'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('logout'),
          onPress: () => {
            // Burada logout işlemini gerçekleştirebilirsiniz
            Alert.alert(t('youAreLoggedOut'));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleFileUpload = (uri: string) => {
    setProfileImage(uri);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background, marginTop: 30 }}
      contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 16, paddingBottom: 100 }}
    >
      {/* Profile Picture and Camera Icon */}
      <View style={styles.profileContainer}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.emptyProfileContainer}>
            <Camera size={32} color={theme.icon} />
          </View>
        )}
        <FileUpload onFileSelected={handleFileUpload}>
         
        </FileUpload>
        <Text style={[styles.profileName, { color: theme.text }]}>Aisha Khalid</Text>
      </View>

      {/* Language Toggle */}
      <View
        style={[
          styles.languageToggle,
          I18nManager.isRTL ? { justifyContent: 'flex-start' } : { justifyContent: 'flex-end' },
        ]}
      >
        <Text style={[styles.languageText, { color: theme.text }]}>{t('language')}</Text>
        <Switch value={isArabic} onValueChange={toggleLanguage} />
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsSection}>
        <Button
          icon={<User size={24} color={theme.icon} />}
          title={t('editProfile')}
          onPress={() => {}}
          style={{ marginBottom: 12 }}
        />
        <Button
          icon={<CalendarDays size={24} color={theme.icon} />}
          title={t('myAppointments')}
          onPress={() => {}}
          style={{ marginBottom: 12 }}
        />
        <Button
          icon={<Settings size={24} color={theme.icon} />}
          title={t('settings')}
          onPress={() => {}}
          style={{ marginBottom: 12 }}
        />
      </View>

      {/* Logout Button */}
      <View style={styles.logoutButtonContainer}>
        <Button
          icon={<LogOut size={24} color={theme.icon} />}
          title={t('logout')}
          onPress={handleLogout}
          style={{ marginBottom: 12 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginTop: 10,
    position: 'relative',
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  emptyProfileContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: -5, // Profil resmine yakınlık
    right: -5,  // Sağ alt hizalama
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Android gölgesi için
  },
  profileName: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: 'bold',
  },
  languageToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  languageText: {
    marginRight: 8,
    fontSize: 16,
  },
  buttonsSection: {
    marginTop: 30,
    marginBottom: 20,
  },
  logoutButtonContainer: {
    marginTop: 20,
  },
});
