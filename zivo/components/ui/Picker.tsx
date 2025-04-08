import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  selectedValue: string;
  onValueChange: (val: string) => void;
  items: { label: string; value: string }[];
}

export default function CustomPicker({ selectedValue, onValueChange, items }: Props) {
  const { theme } = useTheme();

  return (
    <View className="border rounded-xl overflow-hidden">
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={{ color: theme.text, backgroundColor: theme.background }}
        dropdownIconColor={theme.tint}
      >
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
}
