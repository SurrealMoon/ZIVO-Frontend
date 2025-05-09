import { z } from 'zod';

// 📌 Profile şeması – null olabilir, bazı alanlar opsiyonel
export const ProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  bio: z.string().nullable().optional(),
  birthDate: z.string().nullable().optional(), // ISO string
  avatarUrl: z.string().nullable().optional(),
  isProfileComplete: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// 📌 User şeması – getMe için kullanılacak
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  roles: z.array(z.string()), // Prisma'da enum, API'de string array olarak gelir: ["customer"]
  profile: ProfileSchema.nullable().optional(),
  gender: z.enum(['men', 'women', 'everyone']).optional(),
});

// 🎯 Tip export'ları
export type UserType = z.infer<typeof UserSchema>;
export type ProfileType = z.infer<typeof ProfileSchema>;
