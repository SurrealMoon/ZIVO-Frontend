import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

interface WhenModalProps {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    selectedTimeRange: string;
    setSelectedTimeRange: (range: string) => void;
    showModal: boolean;
    setShowModal: (visible: boolean) => void;
}

export default function WhenModal({
    selectedDate,
    setSelectedDate,
    selectedTimeRange,
    setSelectedTimeRange,
    showModal,
    setShowModal,
}: WhenModalProps) {
    const { t } = useTranslation();

    return (
        <Modal visible={showModal} animationType="slide" onRequestClose={() => setShowModal(false)}>
            <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setShowModal(false)} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#374151" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{t('preferredTime')}</Text>
                </View>
                <Calendar
                    onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
                    markedDates={{
                        [selectedDate]: { selected: true, selectedColor: '#f1c338' },
                    }}
                    theme={{
                        todayTextColor: '#f1c338',
                        arrowColor: '#f1c338',
                    }}
                />

                <View style={styles.timeContainer}>
                    {['anytime', 'morning', 'afternoon', 'evening'].map((range) => (
                        <TouchableOpacity
                            key={range}
                            style={[
                                styles.timeButton,
                                selectedTimeRange === range && styles.timeButtonSelected,
                            ]}
                            onPress={() => setSelectedTimeRange(range)}
                        >
                            <Text
                                style={[
                                    styles.timeText,
                                    selectedTimeRange === range && styles.timeTextSelected,
                                ]}
                            >
                                {t(range)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.buttonContainer}>

                    <Button
                        title={t('schedule')}
                        onPress={() => setShowModal(false)}
                        style={[styles.smallButton, { backgroundColor: '#f1c338' }]}

                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backButton: {
        padding: 10,
    },
    title: {
        flex: 1, 
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 2,
        marginRight: 18,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    timeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    timeButton: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: '#FAFAFA',
        borderRadius: 8,
        width: '45%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeButtonSelected: {
        borderColor: '#f1c338',
        backgroundColor: '#fef3c7',
    },
    timeText: {
        color: '#374151',
        fontSize: 14,
    },
    timeTextSelected: {
        color: '#111827',
        fontWeight: '600',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 90,
    },
    smallButton: {
        width: 300,
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 15,

    },
    smallButtonText: {
        fontSize: 14,
    },
});
