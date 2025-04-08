import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  selected: string;
  onSelect: (val: string) => void;
}

export default function RadioGroup({ options, selected, onSelect }: Props) {
  const { theme } = useTheme();

  return (
    <View className="space-y-2">
      {options.map((opt) => (
        <TouchableOpacity
          key={opt.value}
          onPress={() => onSelect(opt.value)}
          className="flex-row items-center gap-2"
        >
          <View
            className="w-5 h-5 rounded-full border justify-center items-center"
            style={{ borderColor: theme.tint }}
          >
            {selected === opt.value && (
              <View
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.tint }}
              />
            )}
          </View>
          <Text style={{ color: theme.text }}>{opt.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
