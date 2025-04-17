import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    useColorScheme,
    Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import Button from '@/components/ui/Button';
import { TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { mockShops } from '@/mock/shops';


const ShopDetailScreen = () => {
    const { shopId } = useLocalSearchParams();
    const { t } = useTranslation();
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
    const { theme } = useTheme();
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeTab, setActiveTab] = useState<'services' | 'reviews' | 'portfolio' | 'details'>('services');
    const router = useRouter();

    // shopId string olduğundan emin ol
    const shop = mockShops.find((s) => s.id === String(shopId));

    if (!shop) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.text }}>{t('Shop not found')}</Text>
            </View>
        );
    }

    return (
          <ScrollView
            style={{ flex: 1, backgroundColor: theme.background , marginTop: 30 }} 
             
            >
            {/* Back Button */}
            <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={28} color={theme.icon} />
            </Pressable>

            <Image
                source={{ uri: shop.image }}
                style={styles.image}
                resizeMode="cover"
            />

            <View style={styles.headerSection}>
                <Text style={[styles.recommendText, { color: theme.primary }]}>
                    {t('ZIVO RECOMMENDED')}
                </Text>
                <Pressable onPress={() => setIsFavorite(!isFavorite)}>
                    <Ionicons
                        name={isFavorite ? 'star' : 'star-outline'}
                        size={22}
                        color={isFavorite ? 'gold' : theme.text}
                    />
                </Pressable>
            </View>

            <Text style={[styles.shopName, { color: theme.text }]}>{shop.name}</Text>
            <Text style={[styles.shopAddress, { color: theme.subtext },{ marginBottom: 15 }]}>
    {shop.description}
</Text>
            {/* Tabs */}
            <View style={styles.tabs}>
  {['services', 'reviews', 'portfolio', 'details'].map(tab => {
    const isActive = activeTab === tab;
    return (
      <Pressable key={tab} onPress={() => setActiveTab(tab as any)} style={{ paddingBottom: 6 }}>
        <Text
          style={{
            fontSize: 10,
            color: isActive ? '#111827' : '#374151',
            fontWeight: isActive ? '600' : '400',
            borderBottomWidth: isActive ? 2 : 0,
            borderBottomColor: isActive ? theme.primary : 'transparent',
            paddingBottom: 4,
          }}
        >
          {t(tab.toUpperCase())}
        </Text>
      </Pressable>
    );
  })}
</View>

            {/* Content */}
            {activeTab === 'services' && (
    <View >
        {shop.services.map((service, index) => (
            <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => console.log('Booking', service.name)}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 4,
                    borderBottomWidth: index !== shop.services.length - 1 ? 0.5 : 0,
                    borderBottomColor: isDark ? '#444' : '#ccc',
                    backgroundColor: isDark ? '#1c1c1e' : '#f9f9f9',
                }}
            >
                <Text style={[styles.serviceName, { color: theme.text }]}>
                    {t(service.name)}
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                        style={{
                            marginRight: 8,
                            fontSize: 14,
                            fontWeight: '500',
                            color: theme.subtext,
                        }}
                    >
                        ${service.price} · {service.duration} {t('min')}
                    </Text>
                    <Button
                        className="px-3 py-1"
                        style={{ borderRadius: 8 , width:90, height:40 }}
                        onPress={() => console.log('Booking', service.name)}
                    >
                        {t('BOOK')}
                    </Button>
                </View>
            </TouchableOpacity>
        ))}
    </View>
)}
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        padding: 6,
    },
    image: {
        width: '100%',
        height: 220,
       
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        alignItems: 'center',
    },
    recommendText: {
        fontSize: 14,
    },
    shopName: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
        paddingBottom: 4,
        marginHorizontal: 12,
      },
      
    tabText: {
        fontSize: 14,
    },
    shopAddress: {
        fontSize: 14,
        paddingHorizontal: 12,
        marginBottom: 10,
        color: '#666',
    },
    
    serviceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    
    
    
    serviceName: {
        fontSize: 16,
        fontWeight: '600',
    },
    servicePrice: {
        fontSize: 14,
        color: '#888',
    },
});

export default ShopDetailScreen;
