import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMyProfile,
  updateMyProfile,
  uploadProfilePhoto,
  deleteProfilePhoto,
  getProfilePhotoUrl,
} from '@/services/profile.service';
import Toast from 'react-native-toast-message';

// 👤 Profil bilgilerini getirme
export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ['profile', 'me'],
    queryFn: async () => {
      try {
        return await getMyProfile();
      } catch (err: any) {
        const message = err.response?.data?.error || 'Profil bilgileri alınamadı';
        Toast.show({
          type: 'error',
          text1: 'Hata',
          text2: message,
        });
        throw err;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// ✏️ Profil bilgilerini güncelleme
export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
      Toast.show({
        type: 'success',
        text1: 'Profil başarıyla güncellendi',
      });
    },
    onError: (err: any) => {
      const message = err.response?.data?.error || 'Profil güncellenemedi';
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: message,
      });
    },
  });
};

// 📤 Profil fotoğrafı yükleme hook
export const useUploadProfilePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProfilePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
      Toast.show({
        type: 'success',
        text1: 'Profil fotoğrafı yüklendi',
      });
    },
    onError: (err: any) => {
      const message = err.response?.data?.error || 'Fotoğraf yüklenemedi';
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: message,
      });
    },
  });
};

// 🗑️ Profil fotoğrafı silme hook
export const useDeleteProfilePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProfilePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
      Toast.show({
        type: 'success',
        text1: 'Profil fotoğrafı silindi',
      });
    },
    onError: (err: any) => {
      const message = err.response?.data?.error || 'Fotoğraf silinemedi';
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: message,
      });
    },
  });
};

// 📥 Profil fotoğrafını URL ile getirme hook
export const useProfilePhotoUrl = (photoKey?: string | null) => {
  return useQuery({
    queryKey: ['profile', 'photo-url', photoKey],
    queryFn: async () => {
      if (!photoKey) return null;
      return await getProfilePhotoUrl(photoKey);
    },
    enabled: !!photoKey, 
    staleTime: 1000 * 60 * 5, 
  });
};
