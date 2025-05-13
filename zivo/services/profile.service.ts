import client, { clientMultipart } from '@/api/client';
import { z } from 'zod';
import { ProfileSchema } from '@/schemas/user.schema';
import * as SecureStore from 'expo-secure-store';




// Profil güncelleme payload şeması
const UpdateProfilePayloadSchema = ProfileSchema.pick({
  bio: true,
  birthDate: true,
  photoKey: true,
}).extend({
  name: z.string().optional(),
  surname: z.string().optional(),
  phone: z.string().optional(),
  serviceType: z.enum(['women', 'men', 'everyone']).optional(), // Frontend'deki serviceType
});

export type UpdateProfilePayload = z.infer<typeof UpdateProfilePayloadSchema>;

// ✅ Profil bilgilerini getir
export const getMyProfile = async () => {
  const response = await client.get('/api/profile/me');

  try {
    return ProfileSchema.parse(response.data);
  } catch (err) {
    console.error('❌ Profile schema parse error:', err);
    throw err;
  }
};

// ✅ Profil bilgilerini güncelle
export const updateMyProfile = async (data: UpdateProfilePayload) => {
  UpdateProfilePayloadSchema.parse(data); // Zod ile doğrulama
  const response = await client.put('/api/profile/me', {
    gender: data.serviceType, // serviceType'ı gender'a eşitliyoruz
    ...data, // Diğer tüm veriler
  });

  return ProfileSchema.parse(response.data.profile);  // ✅ Sadece profile kısmını parse et
};

// ✅ Profil fotoğrafı yükleme
export const uploadProfilePhoto = async (file: { uri: string; name: string; type: string }): Promise<string> => {
  const formData = new FormData();

  formData.append('file', {
    uri: file.uri,
    name: file.name,
    type: file.type,
  } as any);

  const token = await SecureStore.getItemAsync('accessToken');

  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/profile/me/photo`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // Content-Type YOK → fetch kendisi boundary ekleyecek!
    },
    body: formData,
  });

  if (!response.ok) {
    console.error('Upload failed:', response.status, await response.text());
    throw new Error('Photo upload failed');
  }

  const responseData = await response.json();
  return responseData.photoKey;
};



// ✅ Profil fotoğrafı silme
export const deleteProfilePhoto = async (): Promise<void> => {
  await client.delete('/api/profile/me/photo');
};

// ✅ Profil fotoğrafı görüntüleme URL'si alma (presigned url)
export const getProfilePhotoUrl = async (photoKey: string): Promise<string> => {
  const response = await client.get('/api/media/photo-url', {
    params: { key: photoKey },
  });

  return response.data.url;
};
