import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from 'react-i18next';

type Option = 'women' | 'men' | 'everyone';

interface Props {
  selected: Option;
  onChange: (value: Option) => void;
}

export const RadioGroupButtonBar = ({ selected, onChange }: Props) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const options: Option[] = ['women', 'men', 'everyone'];

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isActive = selected === option;

        return (
          <TouchableOpacity
            key={option}
            onPress={() => onChange(option)}
            style={[
              styles.button,
              {
                backgroundColor: isActive ? theme.primary : theme.cardBackground,
                borderColor: theme.border,
              },
            ]}
          >
            <Text
              style={{
                color: isActive ? '#fff' : theme.text,
                fontWeight: '500',
              }}
            >
              {t(option)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
});
