import { Switch as RNSwitch } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  value: boolean;
  onValueChange: (val: boolean) => void;
}

export default function Switch({ value, onValueChange }: Props) {
  const { theme } = useTheme();

  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      thumbColor={value ? theme.tint : '#ccc'}
      trackColor={{ true: `${theme.tint}55`, false: '#ccc' }}
    />
  );
}
