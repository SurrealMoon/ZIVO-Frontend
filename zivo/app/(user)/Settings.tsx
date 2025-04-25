import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Button from '@/components/ui/Button';
import { ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage } from '@/utils/languageUtils';

export default function SettingsScreen() {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const [languageModalVisible, setLanguageModalVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<'auto' | 'en' | 'ar'>(
        i18n.language === 'ar' ? 'ar' : i18n.language === 'en' ? 'en' : 'auto'
    );

    const handleLanguageChange = async (language: 'auto' | 'en' | 'ar') => {
        setSelectedLanguage(language);
        setLanguageModalVisible(false);

        if (language === 'auto') {
            const systemLanguage = navigator.language.startsWith('ar') ? 'ar' : 'en';
            await changeAppLanguage(systemLanguage);
        } else {
            await changeAppLanguage(language);
        }
    };

    return (
        <>
            <ScrollView
                style={{ flex: 1, backgroundColor: theme.background, marginTop: 30 }}
                contentContainerStyle={{ paddingTop: 30, paddingHorizontal: 16, paddingBottom: 100 }}
            >
                {/* Notifications Section */}
                <View style={[styles.sectionBox, { backgroundColor: theme.inputBackground }]}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        {t('notifications')}
                    </Text>
                    <TouchableOpacity style={[styles.row, { borderColor: theme.border }]}>
                        <Text style={[styles.label, { color: theme.text }]}>
                            {t('enableNotifications')}
                        </Text>
                        <ChevronRight size={20} color={theme.text} />
                    </TouchableOpacity>
                </View>

                {/* Settings Section */}
                <View style={[styles.sectionBox, { backgroundColor: theme.inputBackground }]}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        {t('settings')}
                    </Text>
                    <TouchableOpacity
                        style={[styles.row, { borderColor: theme.border }]}
                        onPress={() => setLanguageModalVisible(true)}
                    >
                        <Text style={[styles.label, { color: theme.text }]}>
                            {t('language')}: 
                            {selectedLanguage === 'auto'
                                ? t('autoEnglish')
                                : selectedLanguage === 'en'
                                ? t('english')
                                : t('arabic')}
                        </Text>
                        <ChevronRight size={20} color={theme.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row, { borderColor: theme.border }]}>
                        <Text style={[styles.label, { color: theme.text }]}>
                            {t('country')}: United Arab Emirates (UAE)
                        </Text>
                        <ChevronRight size={20} color={theme.text} />
                    </TouchableOpacity>
                </View>

                {/* Social Accounts Section */}
                <View style={[styles.sectionBox, { backgroundColor: theme.inputBackground }]}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        {t('socialAccounts')}
                    </Text>
                    <TouchableOpacity style={[styles.row, { borderColor: theme.border }]}>
                        <Text style={[styles.label, { color: theme.text }]}>
                            {t('facebook')}: {t('notConnected')}
                        </Text>
                        <ChevronRight size={20} color={theme.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row, { borderColor: theme.border }]}>
                        <Text style={[styles.label, { color: theme.text }]}>
                            {t('google')}: {t('connected')}
                        </Text>
                        <ChevronRight size={20} color={theme.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row, { borderColor: theme.border }]}>
                        <Text style={[styles.label, { color: theme.text }]}>
                            {t('apple')}: {t('notConnected')}
                        </Text>
                        <ChevronRight size={20} color={theme.text} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Language Modal */}
            <Modal
                visible={languageModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setLanguageModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContainer, { backgroundColor: theme.inputBackground }]}>
                        <Text style={[styles.modalTitle, { color: theme.text }]}>
                            {t('chooseLanguage')}
                        </Text>
                        <Pressable
                            style={styles.modalOption}
                            onPress={() => handleLanguageChange('auto')}
                        >
                            <Text style={[styles.modalOptionText, { color: theme.text }]}>
                                {t('autoEnglish')}
                            </Text>
                        </Pressable>
                        <Pressable
                            style={styles.modalOption}
                            onPress={() => handleLanguageChange('en')}
                        >
                            <Text style={[styles.modalOptionText, { color: theme.text }]}>
                                {t('english')}
                            </Text>
                        </Pressable>
                        <Pressable
                            style={styles.modalOption}
                            onPress={() => handleLanguageChange('ar')}
                        >
                            <Text style={[styles.modalOptionText, { color: theme.text }]}>
                                {t('arabic')}
                            </Text>
                        </Pressable>
                        <Button
    className="px-3 py-1"
    style={{
        borderRadius: 8,
        width: 90,
        height: 50,
        backgroundColor: theme.buttonBackground, 
        marginTop: 20, // Üst boşluk için ekleme yapıldı
        alignSelf: 'center', // Yatayda ortalamak için
        justifyContent: 'center', // İçerik ortalama
        alignItems: 'center', // İçerik ortalama
    }}
    onPress={() => setLanguageModalVisible(false)} // Modal kapatma işlevi
>
    {t('close')} 
</Button>

                    </View>
                </View>
            </Modal>
        </>
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
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
    },
    modalOption: {
        paddingVertical: 12,
    },
    modalOptionText: {
        fontSize: 16,
    },
    modalCloseButton: {
        marginTop: 20,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalCloseButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
