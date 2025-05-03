import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';

type SortModalProps = {
  visible: boolean;
  onClose: () => void;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
};

const SortModal: React.FC<SortModalProps> = ({ visible, onClose, selectedSort, setSelectedSort }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const options = [
    { value: 'recommended', label: t('recommendedFirst') },
    { value: 'distance', label: t('distanceNearestFirst') },
    { value: 'reviews', label: t('reviewsTopRatedFirst') },
  ];

  const [tempSelection, setTempSelection] = useState(selectedSort);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t('sortBy')}</Text>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => setTempSelection(option.value)}
              style={[
                styles.optionButton,
                tempSelection === option.value && styles.optionSelected,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  tempSelection === option.value && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
              {tempSelection === option.value && (
                <Ionicons name="checkmark" size={20} color="#f1c338" />
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.doneButton, { backgroundColor: theme.buttonBackground }]}
            onPress={() => {
              setSelectedSort(tempSelection);
              onClose();
            }}
          >
            <Text style={[styles.doneButtonText, { color: theme.buttonText || '#FFFFFF' }]}>
              {t('done')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: 'transparent',
  },
  optionSelected: {
    borderBottomColor: '#e1b032',
  },
  optionText: {
    fontSize: 16,
  },
  optionTextSelected: {
    color: '#f1c338',
  },
  doneButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SortModal;
