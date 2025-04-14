import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from './ui/Button';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose }) => {
    const { t } = useTranslation();
    const filters = [ 'specialOffers', 'mobileServices', 'onlineBooking'];
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const toggleFilter = (filter: string) => {
        setSelectedFilters((prev) =>
            prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
        );
    };

    const clearFilters = () => {
        setSelectedFilters([]);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
                <View
                    style={{
                        backgroundColor: 'white',
                        padding: 20,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        position: 'relative',
                    }}
                >
                    {/* Dismiss Icon */}
                    <TouchableOpacity
            onPress={onClose}
            style={{ position: 'absolute', top: 12, right: 16, zIndex: 10 }}
          >
            <Text style={{ fontSize: 14, color: '#999' }}>{t('dismiss')}</Text>
          </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{t('filters')}</Text>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                        {filters.map((filter) => {
                            const isSelected = selectedFilters.includes(filter);
                            return (
                                <TouchableOpacity
                                    key={filter}
                                    onPress={() => toggleFilter(filter)}
                                    style={{
                                        paddingHorizontal: 12,
                                        paddingVertical: 8,
                                        backgroundColor: isSelected ? '#FFB085' : '#FFF1E7',
                                        borderRadius: 20,
                                        borderWidth: 1,
                                        borderColor: isSelected ? '#FF7A00' : '#e5e7eb',
                                    }}
                                >
                                    <Text style={{ color: isSelected ? 'white' : 'black' }}>{t(filter)}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 20,
                            gap: 10,
                        }}
                    >
                        <Button
                            title={t('clear')}
                            onPress={clearFilters}

                            style={{ flex: 1, paddingVertical: 10 }}

                        />
                        <Button
                            title={t('seeResults')}
                            onPress={onClose}
                            style={{ flex: 1, paddingVertical: 10 }}

                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default FilterModal;
