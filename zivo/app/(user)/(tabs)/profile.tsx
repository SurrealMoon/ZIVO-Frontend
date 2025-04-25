import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';
import Switch from '@/components/ui/Switch';
import FileUpload from '@/components/FileUpload';
import { changeAppLanguage } from '@/utils/languageUtils';
import { useRouter } from 'expo-router';
import {
  ChevronRight,
  Users,
  CreditCard,
  MapPin,
  Star,
  DollarSign,
  Shield,
  Settings,
  HelpCircle,
  Info,
  FileText,
  LogOut,
  User,
  Camera,
  Phone,
  Mail
} from 'lucide-react-native';


export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { theme } = useTheme();
  const [isArabic, setIsArabic] = useState(i18n.language === 'ar');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const fullName = 'Nida Değirmenci';
  const initial = fullName ? fullName.charAt(0).toUpperCase() : '';

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
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('logout'),
          onPress: () => Alert.alert(t('youAreLoggedOut')),
        },
      ],
      { cancelable: false }
    );
  };

  const handleFileUpload = (uri: string) => {
    setProfileImage(uri);
  };

  const renderItem = (
    label: string,
    IconComponent: any,
    route?: string
  ) => (
    <TouchableOpacity
      key={label}
      style={styles.settingItem}
      onPress={() => router.push(route)}
    >
      <View style={styles.settingLeft}>
        <IconComponent size={22} color={theme.iconColorProfile} />
        <Text style={[styles.settingLabel, { color: theme.text, marginLeft: 12 }]}>
          {t(label)}
        </Text>
      </View>
      <ChevronRight size={20} color={theme.icon} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background , marginTop: 30 }}
    contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 16, paddingBottom: 100 }}>
      <View style={styles.container}>
        {/* Header with Profile Image and Name */}
        <View style={styles.header}>
  <View style={styles.avatarWrapper}>
    {/* Fotoğraf varsa */}
    {profileImage && (
      <Image source={{ uri: profileImage }} style={styles.profileImage} />
    )}

    {/* Foto yoksa ama isim varsa */}
    {!profileImage && initial && (
      <View style={[styles.initialCircle, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.initialText, { color: theme.text }]}>{initial}</Text>
      </View>
    )}

    {/* Kamera ikonu her zaman */}
    <FileUpload onFileSelected={handleFileUpload}>
      <View style={styles.cameraIcon}>
        <Camera size={26} color={theme.iconColorProfile} />
      </View>
    </FileUpload>
  </View>

  <Text style={[styles.name, { color: theme.text }]}>{fullName}</Text>
</View>


        <View style={styles.profileInfo}>
          <View style={styles.infoRow}>
            <Phone size={16} color={theme.text} />
            <Text style={[styles.phone, { color: theme.text, marginLeft: 6 }]}>+06 25406344</Text>
          </View>
          <View style={[styles.infoRow, { marginTop: 6 }]}>
            <Mail size={16} color={theme.text} />
            <Text style={[styles.phone, { color: theme.text, marginLeft: 6 }]}>nida@example.com</Text>
          </View>
        </View>

        {/* Profile Sections */}
        {renderItem('familyAndFriends', Users, '/(user)/FamilyAndFriends')}
        {renderItem('accountDetails', User, '/(user)/AccountDetails')}
        {renderItem('address', MapPin, '/(user)/Address')}
        {renderItem('reviews', Star, '/(user)/Reviews')}
        {renderItem('payments', DollarSign, '/(user)/Payments')}
        {renderItem('yourPrivacy', Shield, '/(user)/Privacy')}
        {renderItem('settings', Settings, '/(user)/Settings')}
        {renderItem('feedbackAndSupport', HelpCircle, '/(user)/Support')}
        {renderItem('aboutZivo', Info, '/(user)/About')}
        {renderItem('customForms', FileText, '/(user)/CustomForms')}

        {/* Language Toggle  <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>{t('language')}</Text>
          </View>
          <Switch value={isArabic} onValueChange={toggleLanguage} />
        </View>
 */}
       
        {/* Logout */}
        <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
          <View style={styles.settingLeft}>
            <LogOut size={24} color={theme.logouticon} />
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
  container: {
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarWrapper: {
    width: 70,
    height: 70,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  initialCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: -1,
    right: -25,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 10,
  },
  
  profileInfo: {
    marginLeft: 16,
    marginBottom: 20,
    marginStart: 10
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 19,
  },
  phone: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
  },
});
