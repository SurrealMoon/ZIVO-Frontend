import React from 'react';
import { TextInput as RNTextInput, View, TextInputProps } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { I18nManager } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface Props extends TextInputProps {
  iconLeft?: React.ReactNode;
  className?: string;
}

export default function TextInput({ iconLeft, className, ...rest }: Props) {
  const { theme } = useTheme();

  return (
    <View
      className={twMerge(
        'flex-row items-center rounded-2xl px-4 py-3 border',
        className
      )}
      style={{
        backgroundColor: theme.background,
        borderColor: 'black', // fallback: gray-200
      }}
    >
      {iconLeft && <View className="mr-6">{iconLeft}</View>}

      <RNTextInput
        {...rest}
        placeholderTextColor="#999"
        style={{
          flex: 1,
          color: theme.text,
          textAlign: I18nManager.isRTL ? 'right' : 'left',
        }}
      />
    </View>
  );
}
