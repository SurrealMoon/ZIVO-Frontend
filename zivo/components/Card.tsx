import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing,
  useColorScheme,
  Pressable,
  ViewStyle
 
} from 'react-native';
import { useRouter } from 'expo-router'; 
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { mockShops } from '@/mock/shops';

interface CardProps {
  title: string;
  description: string;
  image: any;
  saveUpTo?: string;
  rating?: number;
  extraInfo?: string;
  style?: ViewStyle;
  backgroundColor?: string;
  loading?: boolean;
  onPress?: () => void;
  shopId?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  saveUpTo,
  rating,
  extraInfo,
  image,
  style,
  backgroundColor,
  loading = false,
  onPress,
  shopId,
}) => {
  const { t } = useTranslation();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const [scale] = useState(new Animated.Value(1));
  const [isFavorite, setIsFavorite] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (rating && rating >= 4.5) {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [rating]);

  const handlePress = () => {
    if (!shopId) return;

    const matchedShop = mockShops.find((shop) => shop.id === shopId);

    if (matchedShop) {
      router.push({
        pathname: '/(user)/shop/[shopId]',
        params: { shopId: matchedShop.id },
      });
    } else {
      console.warn('Shop not found for id:', shopId);
    }
  };

  // Show skeleton loader if loading is true
  if (loading) {
    return (
      <View style={[styles.card, style, { backgroundColor: isDark ? '#333' : '#eee' }]}>
        <View style={{ width: '100%', height: 150, backgroundColor: isDark ? '#444' : '#ccc' }} />
        <View style={{ padding: 16 }}>
          <View style={[styles.skeletonLine, { width: '60%' }]} />
          <View style={[styles.skeletonLine, { width: '80%' }]} />
          <View style={[styles.skeletonLine, { width: '40%' }]} />
        </View>
      </View>
    );
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.card, style, { backgroundColor: backgroundColor || (isDark ? '#1c1c1c' : '#fff') }]}>
        <Image source={image} style={[styles.image, { borderRadius: 8 }]} />
        <Pressable
          onPress={() => setIsFavorite(!isFavorite)}
          style={styles.favoriteIcon}
          hitSlop={10}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? 'red' : isDark ? '#fff' : '#333'}
          />
        </Pressable>

        <View style={styles.content}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>{t(title)}</Text>
          <Text style={[styles.description, { color: isDark ? '#aaa' : '#666' }]}>{t(description)}</Text>

          {extraInfo ? (
            <Text style={[styles.extraInfo, { color: isDark ? '#ccc' : '#888' }]}>{t(extraInfo)}</Text>
          ) : null}
{saveUpTo ? (
  <View style={styles.saveWrapper}>
    <View style={styles.saveContainer}>
      <Text style={styles.save}>{t(saveUpTo)}</Text>
    </View>
    <View style={styles.iconCircle}>
      <Ionicons name="thumbs-up" size={14} color="black" />
    </View>
  </View>
) : null}



        </View>

        {rating && rating > 0 ? (
  <Animated.View style={[styles.ratingContainer, { transform: [{ scale }] }]}>
    <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
    {shopId && (
      <Text style={styles.reviewCount}>
        {mockShops.find((s) => s.id === shopId)?.reviews.length ?? 0} {t('reviews')}
      </Text>
    )}
  </Animated.View>
) : null}

      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: 'gray',
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
  },
  extraInfo: {
    fontSize: 13,
    marginBottom: 6,
  },
  saveWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  
  saveContainer: {
    backgroundColor: '#f1c338',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  
  save: {
    fontSize: 14,
    color: 'black',
  },
  iconCircle: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  reviewCount: {
    fontSize: 12,
    color: 'white',
    marginTop: 2,
    textAlign: 'center',
  },
    
  ratingContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  rating: {
    fontSize: 14,
    color: 'white',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 2,
  },
  skeletonLine: {
    height: 14,
    backgroundColor: '#999',
    marginBottom: 10,
    borderRadius: 4,
  },
});

export default Card;
