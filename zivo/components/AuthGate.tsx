import React, { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuthMe } from '@/hooks/useAuth';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useAuthMe();
  const segments = useSegments();
  const router = useRouter();

  const isInAuth = segments[0]?.startsWith('(auth)');
  const isLoggedIn = !!user;

  useEffect(() => {
    console.log('AuthGate → isLoading:', isLoading, 'user:', user, 'segments:', segments);

    if (!isLoading) {
      if (!isLoggedIn && !isInAuth) {
        router.replace('/(auth)/login');
      } else if (isLoggedIn && isInAuth) {
        router.replace('/(user)/(tabs)');
      }
    }
  }, [isLoading, isLoggedIn, isInAuth]);

  if (isLoading) return null;
  if (!isLoggedIn && !isInAuth) return null;
  if (isLoggedIn && isInAuth) return null;

  return <>{children}</>;
}
