import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '@/components/ui/Button';
import { RadioGroupButtonBar } from '@/components/ui/RadioButtonBar';

export default function AccountDetailsScreen() {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const [name, setName] = useState('Nida');
    const [surname, setSurname] = useState('Değirmenci');
    const [email, setEmail] = useState('nida@example.com');
    const [phone, setPhone] = useState('06 25406344');
    const [birthDate, setBirthDate] = useState<Date | undefined>(new Date('1990-01-01'));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [serviceType, setServiceType] = useState<'women' | 'men' | 'everyone'>('everyone');

    const onChangeDate = (_: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setBirthDate(selectedDate);
        }
    };
 
    const formatDate = (date: Date) =>
        date.toLocaleDateString(i18n.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    const handleSave = () => {
        console.log('Saved:', {
            name,
            surname,
            email,
            phone,
            birthDate,
            serviceType,
        });
    };

    const renderInput = (
        label: string,
        value: string,
        setValue: (text: string) => void,
        key: string,
        options?: object
    ) => (
        <>
            <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={setValue}
                onFocus={() => setFocusedField(key)}
                onBlur={() => setFocusedField(null)}
                style={[
                    styles.input,
                    {
                        color: theme.text,
                        borderColor:
                            focusedField === key ? theme.primary : theme.border,
                    },
                ]}
                placeholder={label}
                placeholderTextColor={theme.placeholder}
                {...options}
            />
        </>
    );

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: theme.background , marginTop: 30 }}
            contentContainerStyle={{ paddingTop: 30, paddingHorizontal: 16, paddingBottom: 100 }}
        >
            {/* Personal Details */}
            <View style={[styles.sectionBox, { backgroundColor: theme.inputBackground }]}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                    {t('personalDetails')}
                </Text>
    
                {renderInput(t('name'), name, setName, 'name')}
                {renderInput(t('surname'), surname, setSurname, 'surname')}
    
                <Text style={[styles.label, { color: theme.text }]}>{t('birthDate')}</Text>
                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={[
                        styles.input,
                        styles.dateInput,
                        { borderColor: theme.border, backgroundColor: theme.inputBackground },
                    ]}
                >
                    <Text style={{ color: theme.text }}>
                        {birthDate ? formatDate(birthDate) : t('selectDate')}
                    </Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={birthDate || new Date()}
                        mode="date"
                        display="spinner"
                        maximumDate={new Date()}
                        onChange={onChangeDate}
                    />
                )}
    
                {renderInput(t('email'), email, setEmail, 'email', {
                    keyboardType: 'email-address',
                    autoCapitalize: 'none',
                })}
    
                {renderInput(t('phone'), phone, setPhone, 'phone', {
                    keyboardType: 'phone-pad',
                })}
            </View>
    
            {/* Services Type */}
            <View style={[styles.sectionBox, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                    {t('servicesType')}
                </Text>
                <RadioGroupButtonBar selected={serviceType} onChange={setServiceType} />
            </View>
    
            {/* Save Button */}
            <Button
                className="px-3 py-1"
                style={{
                    backgroundColor: theme.buttonBackground,
                    borderRadius: 12,
                    marginTop: 24,
                    marginHorizontal: 38,
                    paddingVertical: 10,
                }}
                onPress={handleSave}
            >
                {t('save')}
            </Button>
    
            {/* Account Deletion */}
            <TouchableOpacity style={styles.deleteRow}>
                <Text style={[styles.deleteText, { color: 'red' }]}>
                    {t('accountDeletionProcess')}
                </Text>
                <ChevronRight size={20} color="red" />
            </TouchableOpacity>
        </ScrollView>
    );
    
}

const styles = StyleSheet.create({
    sectionBox: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
    },
    label: {
        fontSize: 15,
        marginBottom: 6,
        marginTop: 12,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginBottom: 12,
        fontSize: 15,
    },
    dateInput: {
        height: 46,
    },
    deleteRow: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 4,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    deleteText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
