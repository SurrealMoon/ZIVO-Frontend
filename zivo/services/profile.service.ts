import client from '@/api/client';
import { ProfileSchema } from '@/schemas/user.schema';
import { z } from 'zod';

const UpdateProfilePayloadSchema = ProfileSchema.pick({
  bio: true,
  birthDate: true,
  avatarUrl: true,
}).extend({
  name: z.string().optional(),
  surname: z.string().optional(),
  phone: z.string().optional(),
  serviceType: z.enum(['women', 'men', 'everyone']).optional(),
});

export type UpdateProfilePayload = z.infer<typeof UpdateProfilePayloadSchema>;

// 👤 Profil bilgilerini getir
export const getMyProfile = async () => {
  const response = await client.get('/api/profiles/me');
  return ProfileSchema.parse(response.data);
};

// ✏️ Profil bilgilerini güncelle
export const updateMyProfile = async (data: UpdateProfilePayload) => {
  UpdateProfilePayloadSchema.parse(data);
  const response = await client.put('/api/profiles/me', data);
  return ProfileSchema.parse(response.data);
};
