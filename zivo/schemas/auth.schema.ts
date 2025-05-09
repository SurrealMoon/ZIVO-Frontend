import { z } from 'zod';

// 🔐 Login Şeması
export const LoginPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  userId: z.string(),
  message: z.string().optional(),
});

export type LoginPayload = z.infer<typeof LoginPayloadSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// 🧾 Register Şeması
export const RegisterPayloadSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10),
  isLawApproved: z.literal(true), // Kullanıcı sözleşmesi onayı zorunlu
});

export const RegisterResponseSchema = z.object({
  userId: z.string(),
  message: z.string().optional(),
});

export type RegisterPayload = z.infer<typeof RegisterPayloadSchema>;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
