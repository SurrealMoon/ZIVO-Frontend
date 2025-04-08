import { View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface Props {
  thickness?: number;
  marginVertical?: number;
}

export default function Divider({ thickness = 1, marginVertical = 12 }: Props) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        height: thickness,
        backgroundColor: `${theme.tint}22`, // hafif opaklık
        marginVertical,
      }}
    />
  );
}
