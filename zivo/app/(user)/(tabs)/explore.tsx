import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  I18nManager,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import FilterModal from '@/components/FilterModal';
import TextInput from '@/components/ui/TextInput';
import Card from '@/components/Card';
import WhereModal from '@/components/WhereModal';
import { useTheme } from '@/context/ThemeContext';
import MapView, { Marker , Callout } from 'react-native-maps';
import { StyleSheet } from 'react-native';


type Coordinates = {
  latitude: number;
  longitude: number;
};


export default function HomeScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [location, setLocation] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [showFilters, setShowFilters] = useState(false);
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
  const [showCalendar, setShowCalendar] = useState(false);
  const [showWhereModal, setShowWhereModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

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

  const handleMapButtonPress = () => {
    console.log('Map button clicked!');
    // Harita fonksiyonunuzu burada çağırabilirsiniz.
  };

  const mockLocations = [
    { id: 1, name: 'Talas Cafe', latitude: 38.7159, longitude: 35.5263 },
    { id: 2, name: 'Talas Market', latitude: 38.7187, longitude: 35.5295 },
  ];

  return (
<View style={{ flex: 1 }}>
<ScrollView
    style={{ flex: 1, backgroundColor: theme.background , marginTop: 30 }} 
      contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 16, paddingBottom: 100 }}
    >
    

      {/* Search Bar */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
  <TextInput
    placeholder={t('search')}
    style={{
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    }}
    iconLeft={<Ionicons name="search" size={22} color={theme.icon} />}
  />
</View>

      {/* Map Modal */}
      <Modal visible={showMap} animationType="slide" onRequestClose={() => setShowMap(false)}>
          <View style={{ flex: 1 }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 38.7160,
                longitude: 35.5270,
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
                    <View>
                      <Text>{location.name}</Text>
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView>
            <TouchableOpacity
              onPress={() => setShowMap(false)}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </Modal>
      <View style={{ flexDirection: 'row', gap: 12, marginVertical: 12 }}>

  {/* WHERE */}
  <TouchableOpacity
    onPress={() => setShowWhereModal(true)}
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: '#FFF1E7', 
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      gap: 8,
    }}
  >
    <Ionicons name="location-outline" size={20} color="gray" />
    <Text style={{ color: '#374151' }}>
      { t('where')}
    </Text>
  </TouchableOpacity>

  {/* WHEN */}
  <TouchableOpacity
    onPress={() => setShowCalendar(true)}
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: '#FFF1E7',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      gap: 8,
    }}
>
  <Ionicons name="calendar-outline" size={20} color="gray" />
  <Text style={{ color: '#374151' }}>
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

      <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  style={{ marginTop: 16 }}
  contentContainerStyle={{ gap: 12 }}
>
  {categories.map((cat) => (
    <TouchableOpacity
      key={cat}
      style={{
        backgroundColor: '#FFF1E7',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e5e7eb',
      }}
    >
      <Text style={{ color: '#374151', fontWeight: '600' }}>{t(cat)}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>

 {/* Filters Button */}
 <TouchableOpacity
        onPress={() => setShowFilters(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          backgroundColor: '#FFF1E7',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#e5e7eb',
          marginTop: 16,
          marginRight: 12,
        }}
      >
        <Ionicons name="filter-outline" size={18} color="gray" />
        <Text style={{ marginLeft: 8 }}> {t('filters')}</Text>
      </TouchableOpacity>

      {/* Modal */}
      <FilterModal visible={showFilters} onClose={() => setShowFilters(false)} />
      {/* Services */}
      <Animated.View style={{ opacity: fadeAnim }}>
  {/* Special Offers */}
  <Text
    className="text-xl font-bold"
    style={{
      color: theme.text,
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 12,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      alignSelf: I18nManager.isRTL ? 'flex-end' : 'flex-start',
    }}
  >
    {t('specialOffers')}
  </Text>

  <Card
    image={{ uri: 'https://i.pinimg.com/736x/3c/e1/b8/3ce1b8629e77d4105835203049abf3fc.jpg' }}
    
    title="Awesome Store"
    description="123 Example Street, City, Country"
    saveUpTo="Save up to 10%"
    rating={4.9}    
    backgroundColor={theme.cardBackground}
  />

  {/* Recommend */}
  <Text
    className="text-xl font-bold"
    style={{
      color: theme.text,
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 12,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      alignSelf: I18nManager.isRTL ? 'flex-end' : 'flex-start',
    }}
  >
    {t('recommend')}
  </Text>

  <Card
    image={{ uri: 'https://i.pinimg.com/736x/17/89/a7/1789a7d36266eda5d942886722d48ef7.jpg' }}
  
    title="Another Store"
    description="456 Market Road, Another City"
    saveUpTo="Save up to 20%"
    rating={4.5}
    
    backgroundColor={theme.cardBackground}
  />
</Animated.View>

    </ScrollView>
      {/* Floating MapView */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => setShowMap(true)}>
        <Ionicons name="location-outline" size={28} color="black"  />
        <Text style={styles.buttonText}>{t('map')}</Text>
      </TouchableOpacity>
</View>
  
  );
}
const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
    marginTop: 1,
    fontWeight: 'black',
  },
  buttonContent: {
    alignItems: 'center',
  },
});