import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ViewStyle, Animated, Easing } from 'react-native';

interface CardProps {
  title: string;
  description: string;
  saveUpTo: string;
  rating: number;
  image: { uri: string };
  style?: ViewStyle; // Harici stil için
  backgroundColor?: string; // Arka plan rengi
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  saveUpTo,
  rating,
  image,
  style,
  backgroundColor = '#fff', // Varsayılan renk
}) => {
  const [scale] = useState(new Animated.Value(1));

  useEffect(() => {
    if (rating >= 4.5) {
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
    <View
      style={[
        styles.card,
        style,
        { backgroundColor }, 
      ]}
    >
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.saveContainer}>
          <Text style={styles.save}>{saveUpTo}</Text>
        </View>
      </View>
      <Animated.View style={[styles.ratingContainer, { transform: [{ scale }] }]}>
        <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
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
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  saveContainer: {
    backgroundColor: '#F6DDF4',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
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
