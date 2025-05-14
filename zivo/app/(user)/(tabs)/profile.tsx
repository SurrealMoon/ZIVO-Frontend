import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';
import FileUpload from '@/components/FileUpload';
import { changeAppLanguage } from '@/utils/languageUtils';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { useLogout } from '@/hooks/useAuth';
import { useGetMyProfile, useProfilePhotoUrl, useDeleteProfilePhoto } from '@/hooks/useProfile';
import { uploadProfilePhoto } from '@/services/profile.service';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { theme } = useTheme();
  const { data: profile, isLoading } = useGetMyProfile();
  const { mutate: deletePhoto } = useDeleteProfilePhoto();
  const { mutate: logout } = useLogout(() => router.push('/login'));

  const [isArabic, setIsArabic] = useState(i18n.language === 'ar');
  const [localProfileImage, setLocalProfileImage] = useState<string | null>(null);

  const photoKey = profile?.user?.photoKey || null;
  const { data: profilePhotoUrl } = useProfilePhotoUrl(photoKey);

  const toggleLanguage = async (value: boolean) => {
    setIsArabic(value);
    const nextLang = value ? 'ar' : 'en';
    await changeAppLanguage(nextLang);
  };

  const handleLogout = () => {
    Alert.alert(t('logoutConfirmation'), t('areYouSureToLogout'), [
      { text: t('cancel'), style: 'cancel' },
      { text: t('logout'), onPress: () => logout() },
    ]);
  };

  const handleFileUpload = async (file: { uri: string; name: string; type: string }) => {
    try {
      await uploadProfilePhoto(file);
      setLocalProfileImage(file.uri); // ✅ Burada file.uri kullanıyoruz
    } catch (error) {
      console.error('Fotoğraf yükleme hatası:', error);
      Alert.alert(t('error'), t('photoUploadFailed'));
    }
  };



  const handleDeletePhoto = () => {
    Alert.alert(t('confirmDeletePhoto'), t('areYouSure'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('delete'),
        style: 'destructive',
        onPress: () => deletePhoto(),
      },
    ]);
  };

  const renderItem = (
    label: string,
    IconComponent: any,
    iconName: string,
    route?: string
  ) => (
    <TouchableOpacity
      key={label}
      style={styles.settingItem}
      onPress={() => router.push(route as any)}
    >
      <View style={styles.settingLeft}>
        <IconComponent name={iconName} size={22} color={theme.iconColorProfile} />
        <Text style={[styles.settingLabel, { color: theme.text, marginLeft: 12 }]}>
          {t(label)}
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={20} color={theme.icon} />
    </TouchableOpacity>
  );


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  const fullName = `${profile?.user?.name || ''} ${profile?.user?.surname || ''}`.trim();
  const initial = fullName ? fullName.charAt(0).toUpperCase() : '';
  const phone = profile?.user?.phone || '';
  const email = profile?.user?.email || '';

  const displayPhoto = localProfileImage || profilePhotoUrl || null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background, marginTop: 30 }}
      contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 16, paddingBottom: 100 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            {displayPhoto ? (
              <Image source={{ uri: displayPhoto }} style={styles.profileImage} />
            ) : initial ? (
              <View style={[styles.initialCircle, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.initialText, { color: theme.text }]}>{initial}</Text>
              </View>
            ) : null}

            <FileUpload onFileSelected={handleFileUpload}>
              <View style={styles.cameraIcon}>
                <Ionicons name="camera-reverse-outline" size={26} color={theme.iconColorProfile} />
              </View>
            </FileUpload>

            {photoKey && (
              <TouchableOpacity style={styles.deleteIcon} onPress={handleDeletePhoto}>
                <Ionicons name='trash-outline' size={20} color={theme.iconColorProfile} />
              </TouchableOpacity>
            )}
          </View>

          <Text style={[styles.name, { color: theme.text }]}>{fullName || t('unknownUser')}</Text>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.infoRow}>
            <MaterialIcons name='phone-iphone' size={16} color={theme.text} />
            <Text style={[styles.phone, { color: theme.text, marginLeft: 6 }]}>{phone}</Text>
          </View>
          <View style={[styles.infoRow, { marginTop: 6 }]}>
            <Ionicons name='mail-open-outline' size={16} color={theme.text} />
            <Text style={[styles.phone, { color: theme.text, marginLeft: 6 }]}>{email}</Text>
          </View>
        </View>

        {renderItem('familyAndFriends', Ionicons, 'people-circle-outline', '/(user)/FamilyAndFriends')}
        {renderItem('accountDetails', Ionicons, 'person-outline', '/(user)/AccountDetails')}
        {renderItem('address', MaterialCommunityIcons, 'map-marker-outline', '/(user)/Address')}
        {renderItem('reviews', Ionicons, 'star-outline', '/(user)/Reviews')}
        {renderItem('payments', MaterialIcons, 'payments', '/(user)/Payments')}
        {renderItem('yourPrivacy', Ionicons, 'shield-checkmark-outline', '/(user)/Privacy')}
        {renderItem('settings', Ionicons, 'settings-outline', '/(user)/Settings')}
        {renderItem('feedbackAndSupport', Ionicons, 'help-circle-outline', '/(user)/Support')}
        {renderItem('aboutZivo', MaterialIcons, 'info-outline', '/(user)/About')}
        {renderItem('customForms', Ionicons, 'folder-open-outline', '/(user)/CustomForms')}

        <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name='logout' size={24} color={theme.logouticon} />
            <Text style={[styles.settingLabel, { color: theme.logouticon, marginLeft: 12 }]}>
              {t('logout')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 12, paddingTop: 20, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  avatarWrapper: { width: 80, height: 80, position: 'relative', justifyContent: 'center', alignItems: 'center' },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  initialCircle: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
  initialText: { fontSize: 24, fontWeight: 'bold' },
  cameraIcon: {
    position: 'absolute', bottom: -1, right: -25, backgroundColor: 'white', borderRadius: 20, padding: 4,
    justifyContent: 'center', alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3, shadowRadius: 2, zIndex: 10,
  },
  deleteIcon: {
    position: 'absolute', top: -5, right: -25, backgroundColor: 'white', borderRadius: 20, padding: 4,
    justifyContent: 'center', alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3, shadowRadius: 2, zIndex: 10,
  },
  profileInfo: { marginLeft: 16, marginBottom: 20, marginStart: 10 },
  name: { fontSize: 18, fontWeight: '600', marginLeft: 19 },
  phone: { fontSize: 14, color: '#888', marginTop: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ccc' },
  settingLeft: { flexDirection: 'row', alignItems: 'center' },
  settingLabel: { fontSize: 16 },
});
