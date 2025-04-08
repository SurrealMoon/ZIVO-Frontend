import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { twMerge } from 'tailwind-merge';

interface AvatarProps {
  source: string;
  className?: string;
  style?: StyleProp<ImageStyle>;
  size?: number;
}

export default function Avatar({
  source,
  className,
  style,
  size = 56,
}: AvatarProps) {
  const { theme } = useTheme();

  return (
    <Image
      source={{ uri: source }}
      className={twMerge('border-2', className)} // 'rounded-full' sınıfını kaldırdık
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2, // Resmi tam yuvarlak yapmak için borderRadius
          borderColor: '#f472b6', // sabit renk: rose-400
        },
        style,
      ]}
    />
  );
}
