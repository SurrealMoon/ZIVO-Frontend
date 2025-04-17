import React from 'react';
import { Text, TouchableOpacity, View, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next'; // Import useTranslation

interface ButtonProps {
  title?: string;
  onPress: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode; // Allow children as a prop
}

export default function Button({
  title,
  onPress,
  className,
  icon,
  iconPosition = 'left',
  style,
  children, // Accept children prop
}: ButtonProps) {
  const { theme } = useTheme();
  const { t } = useTranslation(); // Initialize the translation hook

  // Use the title from props or children if provided
  const buttonText = title || (children ? String(children) : '');

  return (
    <TouchableOpacity
      onPress={onPress}
      className={twMerge('rounded-full relative', className)}
      style={[
        {
          backgroundColor: theme.buttonBackground,
          width: 280,
          height: 40,
          justifyContent: 'center',
          paddingHorizontal: 16,
          borderRadius: 10,
        },
        style,
      ]}
    >
      {/* Left icon */}
      {icon && iconPosition === 'left' && (
        <View style={{ position: 'absolute', left: 16 }}>
          {icon}
        </View>
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
          {t(buttonText)} {/* Use translation function to handle internationalization */}
        </Text>
      )}

      {/* Right icon */}
      {icon && iconPosition === 'right' && (
        <View style={{ position: 'absolute', right: 16 }}>
          {icon}
        </View>
      )}
    </TouchableOpacity>
  );
}
