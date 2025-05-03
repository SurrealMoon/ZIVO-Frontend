import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { mockShops } from '@/mock/shops';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Button from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext'; 

export default function BookingPage() {
    const router = useRouter();
   
    const { t } = useTranslation(); // Translation desteği
    const { theme } = useTheme(); // Tema renklerini alıyoruz
    const { shopId, serviceId } = useLocalSearchParams();

    const shop = mockShops.find((s) => s.id === shopId); // Gelen shopId'ye göre doğru dükkânı seçiyoruz
    const service = shop?.services.find((svc) => svc.name === serviceId); // Gelen serviceId'ye göre doğru hizmeti seçiyoruz

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    if (!shop || !service) {
        return (
            <View style={styles.errorContainer}>
                <Text style={[styles.errorText, { color: theme.text }]}>
                    {t('errors.shopOrServiceNotFound')}
                </Text>
                <Button
                    title={t('common.goBack')}
                    onPress={() => router.back()}
                    style={{ backgroundColor: theme.primary }}
                />
            </View>
        );
    }

    return (
         <ScrollView
                    style={{ flex: 1, backgroundColor: theme.background, marginTop: 30 }}
                    contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 16, paddingBottom: 100 }}
                >
                 
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.text }]}>
                    {t('bookYourAppointment')}
                </Text>
            </View>

            {/* Calendar Section */}
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {t('selectDate')}
            </Text>
            <Calendar
                onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: theme.primary },
                }}
                theme={{
                    todayTextColor: theme.primary,
                    arrowColor: theme.primary,
                    backgroundColor: theme.background,
                    calendarBackground: theme.background,
                    textSectionTitleColor: theme.text,
                }}
                style={styles.calendar}
            />

            {/* Time Selection */}
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {t('selectTime')}
            </Text>
            <View style={styles.timeContainer}>
                {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'].map((time) => (
                    <TouchableOpacity
                        key={time}
                        style={[
                            styles.timeButton,
                            selectedTime === time && {
                                borderColor: theme.primary,
                                backgroundColor: theme.secondary,
                            },
                        ]}
                        onPress={() => setSelectedTime(time)}
                    >
                        <Text
                            style={[
                                styles.timeText,
                                selectedTime === time && { color: theme.text },
                            ]}
                        >
                            {time}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Service Details */}
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {t('serviceDetails')}
            </Text>
            <View style={[styles.serviceDetails, { backgroundColor: theme.cardBackground }]}>
    {/* Kart İçeriği */}
    <View style={styles.serviceContent}>
        {/* Soldaki Bilgiler */}
        <View>
            <Text style={[styles.serviceName, { color: theme.text }]}>
                {service.name}
            </Text>
            <Text style={[styles.shopName, { color: theme.subtext }]}>
                {shop.name}
            </Text>
        </View>

        {/* Sağdaki Bilgiler */}
        <View>
            <Text style={[styles.servicePrice, { color: theme.primary }]}>
                ${service.price}
            </Text>
            <Text style={[styles.serviceDuration, { color: theme.text }]}>
                {service.duration} {t('minutes')}
            </Text>
        </View>
    </View>
</View>

            {/* Booking Button */}
            <Button
    title={t('book')}
    onPress={() =>
        alert(
            `${t('booked')} ${service.name} ${t('on')} ${selectedDate} ${t(
                'at'
            )} ${selectedTime}`
        )
    }
    style={[styles.bookButton, { backgroundColor: theme.primary, alignSelf: 'center' }]}
/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    backButton: {
        padding: 10,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
        marginRight: 18,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    calendar: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#e5e7eb',
    },

    timeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    timeButton: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: '#FAFAFA',
        borderRadius: 8,
        width: '30%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 14,
    },
    serviceDetails: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        backgroundColor: '#FAFAFA',
        marginBottom: 20,
    },
    serviceContent: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center', 
        
    },
  
    serviceName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    shopName: {
        fontSize: 14,
        color: '#6b7280',
    },
    servicePrice: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    serviceDuration: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'right',
    },
    bookButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        marginBottom: 10,
    },
});
