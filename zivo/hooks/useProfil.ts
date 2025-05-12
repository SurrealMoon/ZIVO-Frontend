import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyProfile, updateMyProfile } from '@/services/profile.service';
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
        throw err; // React Query'nin hata durumunu bilmesini sağlar
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
    onSuccess: (data) => {
      // Profil bilgilerini başarıyla güncelledikten sonra
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
