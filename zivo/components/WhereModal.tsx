import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

interface WhereModalProps {
  onClose: () => void;
  onSelect: (location: string) => void;
}

export default function WhereModal({ onClose, onSelect }: WhereModalProps) {
  const [customLocation, setCustomLocation] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter a location..."
        value={customLocation}
        onChangeText={setCustomLocation}
        style={styles.input}
      />
      <TouchableOpacity onPress={() => { onSelect(customLocation); onClose(); }} style={styles.button}>
        <Text>Use This Location</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose} style={styles.button}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 20 },
  button: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
});
