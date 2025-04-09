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

 
  const bgColor = '#F7E6CA';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={twMerge('rounded-full relative', className)}
      style={[
        {
          backgroundColor: bgColor,
          width: 280,
          height: 40,
          justifyContent: 'center',
          paddingHorizontal: 16,
        },
        style,
      ]}
    >
      {/* Sol tarafta ikon */}
      {icon && iconPosition === 'left' && (
        <View style={{ position: 'absolute', left: 16 }}>
          {icon}
        </View>
      )}

      {/* Ortalanmış yazı */}
      {title && (
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: '500',
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
      )}

      {/* Sağda ikon desteği gerekiyorsa buraya da ekleyebiliriz */}
    </TouchableOpacity>
  );
}

