import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { twMerge } from 'tailwind-merge';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  image?: ImageSourcePropType;
  className?: string;
  style?: StyleProp<ViewStyle>;
  title?: string;
  description?: string;
  saveUpTo?: string; // Example: "Save up to 20%"
  rating?: number; // Rating from 1 to 5
}

export default function Card({
  image,
  className,
  style,
  title,
  description,
  saveUpTo,
  rating,
}: Props) {
  const { theme } = useTheme();

  return (
    <View
    className={twMerge('rounded-xl', className)}
    style={[
      {
        backgroundColor: theme.background,
        borderWidth: 1,
        borderColor: theme.border || '#e5e7eb',
      },
      style,
    ]}
  >
    {/* Image ve Rating */}
    <View style={{ position: 'relative', overflow: 'hidden', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
      {image && (
        <Image
          source={image}
          style={{ width: '100%', height: 200 }}
          resizeMode="cover"
        />
      )}
      {rating && (
        <View style={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: 12,
          paddingHorizontal: 8,
          paddingVertical: 4
        }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>{rating.toFixed(1)}</Text>
        </View>
      )}
    </View>
  
    {/* İçerik */}
    <View style={{ padding: 12 }}>
      {title && <Text style={{ color: theme.text, fontSize: 16, fontWeight: 'bold' }}>{title}</Text>}
      {description && <Text style={{ color: theme.text, fontSize: 14, marginTop: 4 }}>{description}</Text>}
  
      {saveUpTo && (
        <TouchableOpacity
          style={{
            marginTop: 8,
            paddingVertical: 6,
            paddingHorizontal: 12,
            backgroundColor: '#F6DDF4',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            width: 150,
          }}
        >
          <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>
            {saveUpTo}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
  
  );
}
