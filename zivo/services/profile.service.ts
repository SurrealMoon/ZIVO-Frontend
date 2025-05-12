import client from '@/api/client';
import { z } from 'zod';
import { ProfileSchema } from '@/schemas/user.schema';

// 📌 Profil güncelleme payload şeması
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

// 👤 Profil bilgilerini getir
export const getMyProfile = async () => {
  const response = await client.get('/api/profiles/me');
  return ProfileSchema.parse(response.data);
};

// ✏️ Profil bilgilerini güncelle
export const updateMyProfile = async (data: UpdateProfilePayload) => {
  UpdateProfilePayloadSchema.parse(data); // Zod ile doğrulama
  const response = await client.put('/api/profiles/me', {
    gender: data.serviceType, // serviceType'ı gender'a eşitliyoruz
    ...data, // Diğer tüm veriler
  });
  return ProfileSchema.parse(response.data);
};
