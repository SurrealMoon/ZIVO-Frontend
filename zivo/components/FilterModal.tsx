import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; 
import { useTheme } from '@/context/ThemeContext';
import Button from './ui/Button';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const filters = [
        { id: 'specialOffers', icon: 'tag', library: FontAwesome5 },
        { id: 'mobileServices', icon: 'mobile-alt', library: FontAwesome5 },
        { id: 'onlineBooking', icon: 'calendar-alt', library: FontAwesome5 },
    ];
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
                        maxHeight: '90%',
                    }}
                >
                    {/* Dismiss Icon */}
                    <TouchableOpacity
                        onPress={onClose}
                        style={{ position: 'absolute', top: 12, right: 16, zIndex: 10 }}
                    >
                        <Text style={{ fontSize: 14, color: '#999' }}>{t('dismiss')}</Text>
                    </TouchableOpacity>

                    {/* Header */}
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
                        {t('filters')}
                    </Text>

                    {/* Filter by Label */}
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#999',
                            marginBottom: 15,
                           
                        }}
                    >
                        {t('filterBy')}
                    </Text>

                    {/* Filter Options */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                        {filters.map(({ id, icon, library: IconLibrary }) => {
                            const isSelected = selectedFilters.includes(id);
                            return (
                                <TouchableOpacity
                                    key={id}
                                    onPress={() => toggleFilter(id)}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 14,
                                        paddingVertical: 10,
                                        backgroundColor: isSelected ? 'white' : '#FFFFFF',
                                        borderRadius: 24,
                                        borderWidth: 1,
                                        borderColor: isSelected ? theme.buttonBackground : '#e5e7eb',
                                    }}
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

                    {/* Action Buttons */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 30,
                            gap: 18,
                        }}
                    >
                        <Button
                            title={t('clear')}
                            onPress={clearFilters}
                            style={{
                                flex: 1,
                                paddingVertical: 9,
                                backgroundColor: 'white',
                                borderColor: '#999',
                                borderWidth: 1,
                            }}
                            
                        />
                        <Button
                            title={t('seeResults')}
                            onPress={onClose}
                            style={{
                                flex: 1,
                                paddingVertical: 9,
                                backgroundColor: theme.buttonBackground,
                            }}
                           
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default FilterModal;
