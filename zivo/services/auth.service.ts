// services/auth.service.ts
import client from '@/api/client';
import { UserSchema, UserType } from '@/schemas/user.schema';
import {
  LoginPayload,
  LoginPayloadSchema,
  LoginResponse,
  LoginResponseSchema,
  RegisterPayload,
  RegisterPayloadSchema,
  RegisterResponse,
  RegisterResponseSchema,
} from '@/schemas/auth.schema';

// 🔐 Login işlemi
export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  // Zod ile runtime doğrulama (isteğe bağlı)
  LoginPayloadSchema.parse(data);

  const response = await client.post('/api/auth/login', data);
  return LoginResponseSchema.parse(response.data); // runtime'da doğrulandı
};

// 👤 Kullanıcıyı (me) getir
export const getMe = async (): Promise<UserType> => {
  const response = await client.get('/api/auth/me');
  return UserSchema.parse(response.data);
};

// 🚪 Çıkış işlemi
export const logout = async (): Promise<{ message: string }> => {
  const response = await client.post('/api/auth/logout');
  return response.data;
};

// 📝 Kayıt işlemi
export const register = async (data: RegisterPayload): Promise<RegisterResponse> => {
  RegisterPayloadSchema.parse(data);

  const response = await client.post('/api/users/register', data);
  return RegisterResponseSchema.parse(response.data);
};
