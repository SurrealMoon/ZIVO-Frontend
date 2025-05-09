import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyProfile, updateMyProfile } from '@/services/profile.service';
import { z } from 'zod';

// 🧩 Gönderilecek profil güncelleme verileri (frontend'den backend'e)
export const UpdateProfilePayloadSchema = z.object({
  bio: z.string().optional(),
  birthDate: z.string().optional(), // ISO format
  avatarUrl: z.string().optional(),
  gender: z.enum(['men', 'women', 'everyone']).optional(), 
});

export type UpdateProfilePayload = z.infer<typeof UpdateProfilePayloadSchema>;

// 👤 Profil bilgilerini getiren hook
export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ['profile', 'me'],
    queryFn: getMyProfile,
  });
};

// ✏️ Profili güncelleyen hook
export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfilePayload) => {
      UpdateProfilePayloadSchema.parse(data); // zod validation
      return updateMyProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
    },
  });
};
