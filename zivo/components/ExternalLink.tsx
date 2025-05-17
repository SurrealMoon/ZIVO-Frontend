import { Link } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <TouchableOpacity onPress={() => openBrowserAsync(href)}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
