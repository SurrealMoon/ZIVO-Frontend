import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { login, logout, register, getMe } from '@/services/auth.service';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';

// 👤 Kullanıcıyı getirme (getMe)
export const useAuthMe = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const user = await getMe();
      return user;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};


// 🔐 Giriş işlemi
export const useLogin = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async (res) => {
      const { accessToken, refreshToken } = res;

      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);

      Toast.show({
        type: 'success',
        text1: 'Giriş başarılı',
      });

      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      onSuccess?.();
    },
    onError: (err: any) => {
      const message = err.response?.data?.error || 'Giriş başarısız';
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: message,
      });
    },
  });
};

// 📝 Kayıt işlemi
export const useRegister = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Kayıt başarılı',
        text2: 'Giriş yapabilirsiniz',
      });
      onSuccess?.();
    },
    onError: (err: any) => {
      const message = err.response?.data?.error || 'Kayıt başarısız';

      // 🧠 Loglama
      console.log('📛 Register Hatası:', err);
      console.log('📛 Hata Yanıtı:', err.response);

      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: message,
      });
    },
  });
};

// 🚪 Çıkış işlemi
export const useLogout = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      // 🚫 Önce token'ları sil
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');

      // ✅ Daha sonra cache temizle
      // Bu sırayla yapılınca getMe yeniden tetiklenmeden token'lar temizlenmiş olur
      queryClient.removeQueries({ queryKey: ['auth', 'me'] });

      Toast.show({
        type: 'success',
        text1: 'Çıkış yapıldı',
      });

      // ✅ Yönlendirme veya başka işlem için callback çalıştır
      onSuccess?.();
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Çıkış işlemi başarısız',
      });
    },
  });
};


