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
  const borderColor = theme.border; // Colors içindeki border rengi kullanılacak

  return (
    <Image
      source={{ uri: source }}
      className={twMerge('border-2', className)}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor,
        },
        style,
      ]}
    />
  );
}
