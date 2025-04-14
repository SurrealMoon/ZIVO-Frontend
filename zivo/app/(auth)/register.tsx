import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const router = useRouter();

  const handleSignUp = async () => {
    // Backend API ile kayıt işlemi (örnek olarak sabit bir token döndürüyoruz)
    const mockToken = 'mockAuthToken';
    
    // Token'ı sakla
    await AsyncStorage.setItem('authToken', mockToken);
    
    // isAuthenticated durumunu güncelle
    router.push('/(user)/(tabs)');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sign Up Screen</Text>
      <TextInput placeholder="Email" style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }} />
      <TextInput placeholder="Password" secureTextEntry style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}
