import {
    Modal as RNModal,
    View,
    Text,
    TouchableOpacity,
    Pressable,
  } from 'react-native';
  import { useTheme } from '../context/ThemeContext';
  import { twMerge } from 'tailwind-merge';
  
  interface Props {
    visible: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
  }
  
  export default function Modal({ visible, onClose, title, children }: Props) {
    const { theme } = useTheme();
  
    return (
      <RNModal transparent visible={visible} animationType="fade">
        <Pressable className="flex-1 justify-center items-center bg-black/40" onPress={onClose}>
          <Pressable
            onPress={() => {}}
            className="w-11/12 max-w-md p-5 rounded-2xl"
            style={{ backgroundColor: theme.background }}
          >
            {title && (
              <Text
                className="text-lg font-bold mb-4"
                style={{ color: theme.text }}
              >
                {title}
              </Text>
            )}
            {children}
            <TouchableOpacity
              className="mt-4 py-2 rounded-xl"
              style={{ backgroundColor: theme.tint }}
              onPress={onClose}
            >
              <Text
                className="text-center font-semibold"
                style={{ color: theme.background }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </RNModal>
    );
  }
  