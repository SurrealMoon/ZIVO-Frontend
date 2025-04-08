import React from 'react';
import { View, Image, ImageSourcePropType, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { twMerge } from 'tailwind-merge';

interface Props {
  image?: ImageSourcePropType;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export default function Card({ image, className, style }: Props) {
  const { theme } = useTheme();

  return (
    <View
      className={twMerge('rounded-xl overflow-hidden', className)}
      style={[
        {
          backgroundColor: theme.background,
          borderWidth: 1,
          borderColor: theme.border || '#e5e7eb',
        },
        style,
      ]}
    >
      {image && (
        <Image
          source={image}
          className="w-full h-56 rounded-2xl" 
          resizeMode="cover"
        />
      )}
    </View>
  );
}
