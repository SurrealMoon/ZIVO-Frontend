import React, { ReactNode } from 'react';
import { View, Pressable, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '@/context/ThemeContext';
import { Camera } from 'lucide-react-native';

interface FileUploadProps {
  onFileSelected: (uri: string) => void;
  children?: ReactNode; // Çocuk öğeleri desteklemek için tanımlandı
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected, children }) => {
  const { theme } = useTheme();

  const pickImage = async () => {
    try {
      // Gerekli izinleri kontrol et
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          'Permission Required',
          'Permission to access the photo library is required to upload a profile picture.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Görüntü seçimi
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      // Sonucu işleme
      if (!result.canceled && result.assets && result.assets.length > 0) {
        onFileSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'An error occurred while trying to pick an image. Please try again.');
    }
  };

  return (
    <Pressable
      onPress={pickImage}
      style={[styles.container, { backgroundColor: theme.inputBackground }]}
    >
      {children || (
        <View style={styles.iconContainer}>
          <Camera size={28} color={theme.icon} />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 12,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#F6DDF4',
    position: 'absolute',
    bottom: -2, // Profil resmine yakınlık
    right: -30,  // Sağ alt hizalama
    padding: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Android gölgesi için
  },
});

export default FileUpload;
