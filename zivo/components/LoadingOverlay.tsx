import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

export default function LoadingOverlay() {
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-white/60 justify-center items-center">
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text className="mt-2 text-gray-700 text-sm">Yükleniyor...</Text>
    </View>
  );
}
