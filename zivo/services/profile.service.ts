import client from '@/api/client';
import { z } from 'zod';
import { ProfileSchema } from '@/schemas/user.schema';

// Profil güncelleme payload şeması
const UpdateProfilePayloadSchema = ProfileSchema.pick({
  bio: true,
  birthDate: true,
  avatarUrl: true,
}).extend({
  name: z.string().optional(),
  surname: z.string().optional(),
  phone: z.string().optional(),
  serviceType: z.enum(['women', 'men', 'everyone']).optional(), // Frontend'deki serviceType
});

export type UpdateProfilePayload = z.infer<typeof UpdateProfilePayloadSchema>;

// Profil bilgilerini getir
export const getMyProfile = async () => {
  const response = await client.get('/api/profile/me');

  try {
    return ProfileSchema.parse(response.data);
  } catch (err) {
    console.error('❌ Profile schema parse error:', err);
    throw err;
  }
};


//  Profil bilgilerini güncelle
export const updateMyProfile = async (data: UpdateProfilePayload) => {
  UpdateProfilePayloadSchema.parse(data); // Zod ile doğrulama
  const response = await client.put('/api/profile/me', {
    gender: data.serviceType, // serviceType'ı gender'a eşitliyoruz
    ...data, // Diğer tüm veriler
  });

  return ProfileSchema.parse(response.data.profile);  // ✅ Sadece profile kısmını parse et
};
