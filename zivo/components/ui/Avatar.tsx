import React from 'react';
import { Image, ImageStyle, StyleProp, ImageSourcePropType } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { twMerge } from 'tailwind-merge';

interface AvatarProps {
  source: string | ImageSourcePropType;
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
  const borderColor = theme.border;

  // Düz string gelirse uri objesine dönüştür
  const formattedSource =
    typeof source === 'string' ? { uri: source } : source;

  return (
    <Image
      source={formattedSource}
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
