import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  I18nManager,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import Button from '@/components/ui/Button';
import FilterModal from '@/components/FilterModal';
import TextInput from '@/components/ui/TextInput';
import Card from '@/components/Card';
import WhereModal from '@/components/WhereModal';
import { useTheme } from '@/context/ThemeContext';
import MapView, { Marker, Callout } from 'react-native-maps';
import { mockShops } from '@/mock/shops'; 


type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function HomeScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [location, setLocation] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showWhereModal, setShowWhereModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    'all',
    'hairSalon',
    'barbershop',
    'nailSalon',
    'skinCare',
    'massage',
    'browsLashes',
    'petServices',
  ];

  const mockLocations = [
    { id: 1, name: 'Talas Cafe', latitude: 38.7159, longitude: 35.5263 },
    { id: 2, name: 'Talas Market', latitude: 38.7187, longitude: 35.5295 },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setUserLocation(loc.coords);
        const address = await Location.reverseGeocodeAsync(loc.coords);
        if (address.length > 0) {
          setLocation(`${address[0].city}, ${address[0].country}`);
        }
      }
    })();
  }, []);

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowCalendar(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background, marginTop: 30 }}
        contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 16, paddingBottom: 100 }}
      >
        {/* Search */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
          <TextInput
            placeholder={t('search')}
            style={{ textAlign: I18nManager.isRTL ? 'right' : 'left' }}
            iconLeft={<Ionicons name="search" size={22} color={theme.icon} />}
          />
        </View>

        {/* Where / When */}
        <View style={{ flexDirection: 'row', gap: 12, marginVertical: 9, marginBottom:12 }}>
          <TouchableOpacity
            onPress={() => setShowWhereModal(true)}
            style={styles.optionButton}
          >
            <Ionicons name="location-outline" size={20} color="gray" />
            <Text style={styles.optionText}>{t('where')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowCalendar(true)}
            style={styles.optionButton}
          >
            <Ionicons name="calendar-outline" size={20} color="gray" />
            <Text style={styles.optionText}>
              {date ? date.toLocaleDateString() : t('when')}
            </Text>
          </TouchableOpacity>
        </View>

        {showCalendar && (
          <DateTimePicker
            value={date ?? new Date()}
            mode="date"
            is24Hour
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Modal visible={showWhereModal} animationType="slide">
          <WhereModal onClose={() => setShowWhereModal(false)} onSelect={(loc) => setLocation(loc)} />
        </Modal>

        {/* Category Scroll */}
       
<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  style={{ marginTop: 18 }}
  contentContainerStyle={{ gap: 16 }} // gap biraz artırıldı görünüm için
>
  {categories.map((cat) => {
    const isSelected = selectedCategory === cat;
    return (
      <TouchableOpacity
        key={cat}
        onPress={() => setSelectedCategory(cat)}
        style={{
          borderBottomWidth: isSelected ? 2 : 0,
          borderBottomColor: isSelected ? '#F6DDF4' : 'transparent',
          paddingBottom: 6, // çizgiye yer bırakmak için
        }}
      >
        <Text
          style={{
            color: isSelected ? '#111827' : '#374151',
            fontWeight: isSelected ? '600' : '400',
            fontSize: 15,
          }}
        >
          {t(cat)}
        </Text>
      </TouchableOpacity>
    );
  })}
</ScrollView>

        {/* Filters */}
        <TouchableOpacity onPress={() => setShowFilters(true)} style={styles.filterButton}>
          <Ionicons name="filter-outline" size={18} color="gray" />
          <Text style={{ marginLeft: 8 }}>{t('filters')}</Text>
        </TouchableOpacity>

        <FilterModal visible={showFilters} onClose={() => setShowFilters(false)} />

        {/* Cards */}
       {/* Cards */}
<Animated.View style={{ opacity: fadeAnim }}>
  <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('specialOffers')}</Text>

  {mockShops.map((shop) => (
    <Card
      key={shop.id}
      shopId={shop.id}
      image={{ uri: shop.image }}
      title={shop.name}
      description={shop.description}
      saveUpTo={shop.saveUpTo}
      rating={shop.rating}
      backgroundColor={theme.cardBackground}
     
    />
  ))}
  <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('recommend')}</Text>

  {mockShops.map((shop) => (
    <Card
      key={shop.id}
      shopId={shop.id}
      image={{ uri: shop.image }}
      title={shop.name}
      description={shop.description}
      saveUpTo={shop.saveUpTo}
      rating={shop.rating}
      backgroundColor={theme.cardBackground}
     
    />
  ))}
</Animated.View>

      </ScrollView>

      {/* Map Modal */}
      <Modal visible={showMap} animationType="slide" onRequestClose={() => setShowMap(false)}>
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 38.716,
              longitude: 35.527,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {mockLocations.map((location) => (
              <Marker
                key={location.id}
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              >
                <Callout>
                  <Text>{location.name}</Text>
                </Callout>
              </Marker>
            ))}
          </MapView>
          <TouchableOpacity onPress={() => setShowMap(false)} style={styles.backButton}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Floating Map Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => setShowMap(true)}>
        <Ionicons name="location-outline" size={28} color="black" />
        <Text style={styles.buttonText}>{t('map')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFAFA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 3,
  },
  optionText: {
    color: '#374151',
  },
  categoryButton: {
    backgroundColor: '#FFF1E7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFAFA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginTop: 22,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    alignSelf: I18nManager.isRTL ? 'flex-end' : 'flex-start',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#F6DDF4',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
    marginTop: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
});
