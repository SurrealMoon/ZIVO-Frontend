import React from 'react';
import { TextInput as RNTextInput, View, TextInputProps, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { I18nManager } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { Ionicons } from '@expo/vector-icons';

interface Props extends TextInputProps {
  iconLeft?: React.ReactNode;
  className?: string;
}

export default function TextInput({ iconLeft, className, ...rest }: Props) {
  const { theme } = useTheme();

  return (
    <View
      className={twMerge(
        'flex-row items-center',
        I18nManager.isRTL ? 'flex-row-reverse' : '',
        className
      )}
      style={{
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 8,
        backgroundColor: theme.inputBackground,
        paddingHorizontal: 12,
        height: 48,
        width: '100%',
        marginVertical: 12,
        alignItems: 'center', // Yatay olarak ortalamayı sağlar
        flexDirection: 'row', // İkon ve yazıyı yan yana getirir
      }}
    >
      {/* Icon */}
      {iconLeft && (
        <View
          style={{
            marginRight: I18nManager.isRTL ? 0 : 8,
            marginLeft: I18nManager.isRTL ? 8 : 0,
          }}
        >
          {iconLeft}
        </View>
      )}

      {/* TextInput */}
      <RNTextInput
        {...rest}
        placeholderTextColor={theme.placeholder}
        style={{
          flex: 1,
          color: theme.text,
          textAlign: I18nManager.isRTL ? 'right' : 'left',
          fontSize: 16,
          includeFontPadding: false, // Dikey hizalama
        }}
      />
    </View>
  );
}
