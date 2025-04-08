import React from 'react';
import { Text, TouchableOpacity, View, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  title,
  onPress,
  className,
  icon,
  iconPosition = 'left',
  style,
}: ButtonProps) {
  const { theme } = useTheme();

  const textColor = theme.text ;
  const bgColor = '#f472b6'; // fallback: rose-400

  return (
    <TouchableOpacity
      onPress={onPress}
      className={twMerge('flex-row items-center justify-center px-4 py-3 h-5 rounded-full', className)}

      style={[{ backgroundColor: bgColor }, style]}
    >
      {icon && iconPosition === 'left' && <View className="mr-2">{icon}</View>}
      {title && (
        <Text className="font-semibold text-base" style={{ color: textColor }}>
          {title}
        </Text>
      )}
      {icon && iconPosition === 'right' && <View className="ml-2">{icon}</View>}
    </TouchableOpacity>
  );
}
