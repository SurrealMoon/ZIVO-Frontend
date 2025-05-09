import React from 'react';
import { Text, TouchableOpacity, View, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  disabled?: boolean; // ✅ Eklendi
}

export default function Button({
  title,
  onPress,
  className,
  icon,
  iconPosition = 'left',
  style,
  children,
  disabled = false, // ✅ Default olarak false
}: ButtonProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const buttonText = title || (children ? String(children) : '');

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled} // ✅ disable işlemi aktif
      className={twMerge('rounded-full relative', className)}
      style={[
        {
          backgroundColor: theme.buttonBackground,
          width: 280,
          height: 40,
          justifyContent: 'center',
          paddingHorizontal: 16,
          borderRadius: 10,
          opacity: disabled ? 0.6 : 1, // ✅ Görsel feedback
        },
        style,
      ]}
    >
      {/* Left icon */}
      {icon && iconPosition === 'left' && (
        <View style={{ position: 'absolute', left: 16 }}>{icon}</View>
      )}

      {/* Centered text */}
      {buttonText && (
        <Text
          style={{
            color: theme.buttonText,
            fontSize: 16,
            fontWeight: '500',
            textAlign: 'center',
          }}
        >
          {t(buttonText)}
        </Text>
      )}

      {/* Right icon */}
      {icon && iconPosition === 'right' && (
        <View style={{ position: 'absolute', right: 16 }}>{icon}</View>
      )}
    </TouchableOpacity>
  );
}
