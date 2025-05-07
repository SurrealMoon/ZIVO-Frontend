import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TextInput from '@/components/ui/TextInput';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';

type WhereModalProps = {
  onClose: () => void;
  onSelect: (data: {
    search: string;
    location: string;
  }) => void;
  location: string | null;
};


export default function WhereModal({ onClose, onSelect, location }: WhereModalProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState( '');
  const [selectedService, setSelectedService] = useState('');

  const filters = [
    { id: 'hairSalon', icon: 'cut-outline' as const, library: Ionicons },
    { id: 'barbershop', icon: 'man-outline' as const, library: Ionicons },
    { id: 'nailSalon', icon: 'hand-left-outline' as const, library: Ionicons },
    { id: 'skinCare', icon: 'leaf-outline' as const, library: Ionicons },
    { id: 'massage', icon: 'body-outline' as const, library: Ionicons },
    { id: 'browsLashes', icon: 'eye-outline' as const, library: Ionicons },
    { id: 'petServices', icon: 'paw-outline' as const, library: Ionicons },
  ];
  
  const handleSearch = () => {
    if (selectedLocation.trim() === '') {
      alert(t('pleaseEnterLocation')); // Kullanıcıyı uyar
      return;
    }
    onSelect({
      search: searchQuery.trim(),
      location: selectedLocation, // Enter Location bilgisi buradan geliyor
    });
    onClose();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close-outline" size={24} color={theme.icon} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{t('where')}</Text>
        <View />
      </View>

      {/* Search Input */}
      <TextInput
        placeholder={t('search')}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        iconLeft={<Ionicons name="search" size={20} color={theme.icon} />}
      />

      {/* Location Input */}
      <TextInput
  placeholder={t('enterLocation')}
  value={selectedLocation}
  onChangeText={(text) => setSelectedLocation(text)}
  style={styles.locationInput}
  iconLeft={<Ionicons name="location-outline" size={20} color={theme.icon} />}
/>
      {/* Popular Services as Small Selectable Buttons */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('popularServices')}</Text>
      <View style={styles.filtersContainer}>
        {filters.map(({ id, icon, library: IconLibrary }) => {
          const isSelected = selectedService === t(id);
          return (
            <TouchableOpacity
              key={id}
              onPress={() => setSearchQuery(t(id))}
              style={[
                styles.filterButton,
                {
                  backgroundColor: isSelected ? 'white' : '#fff',
                  borderColor: isSelected ? theme.buttonBackground : '#e5e7eb',
                },
              ]}
            >
              <IconLibrary
                name={icon}
                size={20}
                color={isSelected ? theme.buttonBackground : '#999'}
                style={{ marginRight: 8 }}
              />
              <Text
                style={{
                  color: isSelected ? theme.buttonBackground : '#000',
                  fontSize: 15,
                }}
              >
                {t(id)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Only One Button: Search */}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchText}>{t('search')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  searchInput: { marginBottom: 12 },
  locationInput: { marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginVertical: 12 },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 8,
  },
  searchButton: {
    marginTop: 24,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#f1c338',
    borderRadius: 10,
  },
  searchText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
