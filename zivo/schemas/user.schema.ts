import { z } from 'zod';

// 📌 User base info – Profile içinde user ilişkisi için
export const UserBasicSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  phone: z.string(),
  gender: z.enum(['men', 'women', 'everyone']).nullable().optional(), // 🔥 En kritik kısım
});

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

  // 👇 User ilişkisinden gelen alanlar
  user: UserBasicSchema.optional(),
});

// 📌 User şeması – getMe için kullanılacak
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  phone: z.string(),
  gender: z.enum(['men', 'women', 'everyone']).nullable().optional(),
  roles: z.array(z.string()), // Prisma'da enum, API'de string array olarak gelir: ["customer"]

  // Kullanıcının profile objesi (null olabilir)
  profile: ProfileSchema.nullable().optional(),
});

// 🎯 Tip export'ları
export type UserType = z.infer<typeof UserSchema>;
export type ProfileType = z.infer<typeof ProfileSchema>;
export type UserBasicType = z.infer<typeof UserBasicSchema>;
