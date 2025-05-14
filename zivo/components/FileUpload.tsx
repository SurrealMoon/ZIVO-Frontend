import React, { ReactNode } from 'react';
import { View, Pressable, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useTheme } from '@/context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';

interface FileUploadProps {
  onFileSelected: (file: { uri: string; name: string; type: string }) => void;
  children?: ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected, children }) => {
  const { theme } = useTheme();

  const pickImage = async () => {
  try {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        'Permission Required',
        'Permission to access the photo library is required to upload a profile picture.',
        [{ text: 'OK' }]
      );
      return;
    }

const result = await ImagePicker.launchImageLibraryAsync({
mediaTypes: ImagePicker.MediaTypeOptions.Images,  // ✅ Evet bu kalacak (deprecated warning'e rağmen)
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.8,
});

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      console.log('Selected asset:', asset);

let correctUri = asset.uri;

if (Platform.OS === 'android') {
  try {
    const contentUri = await FileSystem.getContentUriAsync(asset.uri);
    console.log('✅ Content URI (Android):', contentUri);
    correctUri = contentUri;
  } catch (e) {
    console.warn('⚠️ getContentUriAsync failed, fallback to file://', e);
    correctUri = asset.uri;
  }
} else if (Platform.OS === 'ios') {
  correctUri = asset.uri.replace('file://', '');
  console.log('✅ Corrected iOS URI:', correctUri);
}

      const file = {
        uri: correctUri,
        name: asset.fileName || 'profile-photo.jpg',
        type: asset.mimeType || 'image/jpeg',
      };

      onFileSelected(file);
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
         <Ionicons name="camera-reverse-outline" size={28} color={theme.icon} />
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
    bottom: -2,
    right: -30,
    padding: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});

export default FileUpload;
