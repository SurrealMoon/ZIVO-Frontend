import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    useColorScheme,
    Pressable,
    Modal
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/i18n';
import { Ionicons, FontAwesome, MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import Button from '@/components/ui/Button';
import { TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { mockShops } from '@/mock/shops';
import NotFound from './+not-found';


const ShopDetailScreen = () => {
    const { shopId } = useLocalSearchParams();
    const { t } = useTranslation();
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState<'services' | 'reviews' | 'portfolio' | 'details'>('services');
    const [showMap, setShowMap] = useState(false);
    const router = useRouter();

    type Amenity = 'Wi-Fi' | 'Parking Space' | 'Wheelchair Accessible' | 'Refreshments' | 'Spa Lounge' | string;
    const getAmenityIcon = (amenity: Amenity) => {
        switch (amenity) {
            case 'Wi-Fi':
                return <FontAwesome name="wifi" size={20} color={theme.iconColorProfile} />;
            case 'Parking Space':
                return <FontAwesome name="car" size={20} color={theme.iconColorProfile} />;
            case 'Wheelchair Accessible':
                return <MaterialIcons name="accessible" size={20} color={theme.iconColorProfile} />;
            case 'Refreshments':
                return <MaterialCommunityIcons name="coffee" size={20} color={theme.iconColorProfile} />;
            case 'Spa Lounge':
                return <MaterialCommunityIcons name="spa" size={20} color={theme.iconColorProfile} />;
            case 'Pet Allowed':
                return <MaterialIcons name="pets" size={20} color={theme.iconColorProfile} />;
            default:
                return (
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: theme.iconColorProfile,
                            borderRadius: 10,
                        }}
                    />
                );
        }
    };


    // shopId string olduğundan emin ol
    const shop = mockShops.find((s) => s.id === String(shopId));

    if (!shop) {
        return <NotFound />;
    }

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: theme.background, marginTop: 30 }}

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

            <View style={[styles.recommendContainer, { backgroundColor: theme.background, borderColor: theme.text, borderWidth: 1, marginTop: 20, marginLeft: 10 }]}>
                <FontAwesome
                    name="thumbs-up"
                    size={18}
                    color={theme.text}
                    style={{ marginRight: 8 }}
                />
                <Text style={[styles.recommendText, { color: theme.text, fontStyle: 'italic' }]}>
                    {t('ZIVO RECOMMENDED')}
                </Text>
            </View>

            <Text style={[styles.shopName, { color: theme.text }]}>{shop.name}</Text>
            <Text style={[styles.shopAddress, { color: theme.subtext }, { marginBottom: 15 }]}>
                {shop.description}
            </Text>
            {/* Tabs */}
            <View style={styles.tabs}>
                {['services', 'reviews', 'portfolio', 'details'].map(tab => {
                    const isActive = activeTab === tab;
                    const label = t(tab.charAt(0).toUpperCase() + tab.slice(1)); // JSON anahtarı


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
                                {i18n.language === 'ar' ? t(tab) : t(tab).toUpperCase()}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            {/* Content */}
            {activeTab === 'services' && (
                <View>
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
                            }}
                        >
                            {/* Servis Adı ve Süre */}
                            <View style={{ marginLeft: 10 }}>
                                <Text style={[styles.serviceName, { color: theme.text }]}>
                                    {t(service.name)}
                                </Text>
                                <Text style={{ fontSize: 12, color: theme.subtext, marginTop: 2, fontStyle: 'italic' }}>
                                    {service.duration} {t('min')}
                                </Text>
                            </View>

                            {/* Fiyat ve Buton */}
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '500',
                                        color: theme.text,
                                        marginRight: 18,
                                        fontStyle: 'italic'
                                    }}
                                >
                                    ${service.price}
                                </Text>
                                <Button
                                    className="px-3 py-1"
                                    style={{
                                        borderRadius: 8,
                                        width: 75,
                                        height: 40,
                                        backgroundColor: theme.primary,
                                        marginRight: 8, // Butonu biraz sola kaydırmak için
                                    }}
                                    onPress={() =>
                                        router.push(`/BookingPage?shopId=${shopId}&serviceId=${service.name}`)
                                    }
                                >
                                    {t('book')}
                                </Button>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {activeTab === 'reviews' && (
                <View style={{ paddingHorizontal: 12 }}>
                    {shop.reviews?.length > 0 ? (
                        shop.reviews.map((review) => (
                            <View
                                key={review.id}
                                style={{
                                    backgroundColor: isDark ? '#222' : '#f9f9f9',
                                    padding: 12,
                                    borderRadius: 12,
                                    marginBottom: 12,
                                }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 'bold', color: theme.text }}>{review.name}</Text>
                                    <Text style={{ fontSize: 12, color: theme.subtext }}>{review.date}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Ionicons
                                            key={i}
                                            name={i <= review.rating ? 'star' : 'star-outline'}
                                            size={16}
                                            color={theme.primary}
                                        />
                                    ))}
                                </View>

                                <Text style={{ color: theme.subtext }}>{review.comment}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={{ color: theme.subtext }}>{t('No reviews yet')}</Text>
                    )}
                </View>
            )}

            {activeTab === 'details' && (
                <View style={{ padding: 12 }}>
                    {/* Address Section */}
                    <Text style={[styles.detailsText, { color: theme.text }]}>{t('Address')}</Text>
                    <Text style={[styles.detailsText, { color: theme.subtext }]}>{shop.address}</Text>
                    <Button
                        className="mt-4"
                        style={{ width: '60%', backgroundColor: theme.primary, marginLeft: 55 }}
                        onPress={() => setShowMap(true)}
                    >
                        {t('ViewOnMap')}
                    </Button>

                    {/* Divider */}
                    <View style={[styles.divider, { backgroundColor: theme.cardBackground }]} />

                    {/* Phone Section */}
                    <Text style={[styles.detailsText, { color: theme.text, marginTop: 12 }]}>{t('Phone')}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Feather name="phone" size={16} color={theme.icon} style={{ marginRight: 8 }} />
                            <Text style={[styles.detailsText, { color: theme.subtext }]}>{shop.phone}</Text>
                        </View>
                        <Button
                            className="ml-4"
                            style={{
                                width: 90,
                                backgroundColor: theme.primary,
                                height: 40,
                                justifyContent: 'center',
                                marginBottom: 10,
                            }}
                            onPress={() => console.log('Calling...')}
                        >
                            {t('Call')}
                        </Button>
                    </View>

                    {/* Divider */}
                    <View style={[styles.divider, { backgroundColor: theme.cardBackground }]} />

                    {/* Working Hours Section */}
                    <Text style={[styles.detailsText, { color: theme.text, marginTop: 12 }]}>{t('WorkingHours')}</Text>
                    {Object.entries(shop.hours).map(([day, hours]) => (
                        <Text key={day} style={[styles.detailsText, { color: theme.subtext }]}>
                            {`${t(day)}:  ${hours === 'Closed' ? t('Closed') : hours}`}
                        </Text>
                    ))}

                    {/* Divider */}
                    <View style={[styles.divider, { backgroundColor: theme.cardBackground }]} />

                    {/* Amenities Section */}
                    <Text style={[styles.detailsText, { color: theme.text, marginTop: 12 }]}>{t('Amenities')}</Text>
                    {shop.amenities.map((amenity) => (
                        <View key={amenity} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            {getAmenityIcon(amenity)}
                            <Text style={[styles.detailsText, { color: theme.subtext, marginLeft: 8 }]}>{t(amenity)}</Text>
                        </View>
                    ))}
                </View>
            )}


            <Modal visible={showMap} animationType="slide">
                <View style={{ flex: 1 }}>
                    <MapView
                        style={StyleSheet.absoluteFillObject}
                        initialRegion={{
                            latitude: shop.coordinates.latitude,
                            longitude: shop.coordinates.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker coordinate={shop.coordinates} title={shop.name} description={shop.address} />
                    </MapView>

                    <Pressable
                        onPress={() => setShowMap(false)}
                        style={[styles.closeButton, { backgroundColor: theme.primary }]}
                    >
                        <Ionicons name="close" size={28} color="#fff" />
                    </Pressable>
                </View>
            </Modal>
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
    recommendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start', // Sadece içerik kadar genişlik
        marginBottom: 8, // Opsiyonel
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

    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        padding: 8,
        borderRadius: 16,
    },
    detailsText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    divider: {
        height: 1,
        width: '100%',
        marginVertical: 16,
    },
});

export default ShopDetailScreen;
