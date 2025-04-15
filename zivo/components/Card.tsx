import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ViewStyle, Animated, Easing } from 'react-native';

interface CardProps {
  title: string;
  description: string;
  image: any;
  saveUpTo?: string; // opsiyonel
  rating?: number; // opsiyonel
  extraInfo?: string; // opsiyonel
  style?: ViewStyle;
  backgroundColor?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  saveUpTo,
  rating,
  extraInfo,
  image,
  style,
  backgroundColor = '#fff',
}) => {
  const [scale] = useState(new Animated.Value(1));

  useEffect(() => {
    if (rating && rating >= 4.5) {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.3,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [rating]);

  return (
    <View style={[styles.card, style, { backgroundColor }]}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        {extraInfo ? (
          <Text style={styles.extraInfo}>{extraInfo}</Text>
        ) : null}

        {saveUpTo ? (
          <View style={styles.saveContainer}>
            <Text style={styles.save}>{saveUpTo}</Text>
          </View>
        ) : null}
      </View>

      {rating && rating > 0 ? (
        <Animated.View style={[styles.ratingContainer, { transform: [{ scale }] }]}>
          <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
        </Animated.View>
      ) : null}
    </View>
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
    color: '#666',
    marginBottom: 4,
  },
  extraInfo: {
    fontSize: 13,
    color: '#888',
    marginBottom: 6,
  },
  saveContainer: {
    backgroundColor: '#F6DDF4',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  save: {
    fontSize: 14,
    color: 'black',
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
});

export default Card;
