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
import WhenModal from '@/components/WhenModal';
import SortModal from '@/components/SortModal';
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
  const [showWhereModal, setShowWhereModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('');
  const [showSortModal, setShowSortModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const getLocationText = (location: string | null) => {
    return location || t('where'); 
  };
  

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


  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);


  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background, marginTop: 30 }}
        contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 16, paddingBottom: 100 }}
      >
        {/* Search */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t('search')}
            style={{ textAlign: I18nManager.isRTL ? 'right' : 'left' }}
            iconLeft={<Ionicons name="search" size={22} color={theme.icon} />}
          />
        </View>

        {/* Where / When */}
        <View style={{ flexDirection: 'row', gap: 12, marginVertical: 9, marginBottom: 12 }}>
          <TouchableOpacity
            onPress={() => setShowWhereModal(true)}
            style={styles.optionButton}
          >
            <Ionicons name="location-outline" size={20} color="gray" />
            <Text style={styles.optionText}>{getLocationText(location)}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowModal(true)} style={styles.optionButton}>
            <Ionicons name="calendar-outline" size={20} color="gray" />
            <Text style={styles.optionText}>
              {selectedDate
                ? `${selectedDate} , ${t(selectedTimeRange || 'anytime')}`
                : t('when')}
            </Text>
          </TouchableOpacity>
        </View>

        <WhenModal
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTimeRange={selectedTimeRange}
          setSelectedTimeRange={setSelectedTimeRange}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <Modal visible={showWhereModal} animationType="slide">
          <WhereModal
            onClose={() => setShowWhereModal(false)}
            location={location}
            onSelect={({ location, search }) => {
              setLocation(location);
              setSearchQuery(search);
            }}
          />

        </Modal>

        {/* Category Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 18 }}
          contentContainerStyle={{ gap: 16 }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={{
                  borderBottomWidth: isSelected ? 2 : 0,
                  borderBottomColor: isSelected ? '#f1c338' : 'transparent',
                  paddingBottom: 6,
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

        {/* Filters  and Sort*/}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 }}>
  {/* Filters Button */}
  <TouchableOpacity 
    onPress={() => setShowFilters(true)} 
    style={[styles.filterButton, { flex: 0.3, marginRight: 8, paddingHorizontal: 10, paddingVertical: 8 }]}
  >
    <Ionicons name="filter-outline" size={18} color="gray" />
    <Text style={{ marginLeft: 8 }}>{t('filters')}</Text>
  </TouchableOpacity>

  {/* Sort Button */}
  <TouchableOpacity 
    onPress={() => setShowSortModal(true)} 
    style={[styles.filterButton, { flex: 0.7, paddingHorizontal: 12, paddingVertical: 8 }]}
  >
    <Ionicons name="options-outline" size={18} color="gray" />
    <Text style={{ marginLeft: 8 }}>
      {t('sortBy')} : {t(selectedSort)}
    </Text>
  </TouchableOpacity>
</View>


        <FilterModal visible={showFilters} onClose={() => setShowFilters(false)} />
        <SortModal
          visible={showSortModal}
          onClose={() => setShowSortModal(false)}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />;
        {/* Cards */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            paddingVertical: 16,
            backgroundColor: theme.background,
          }}
        >
          {/* Special Offers */}
          <Text
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

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
            {mockShops.map((shop) => (
              <Animated.View
                key={shop.id}
                style={{ width: 300, marginHorizontal: 8, marginLeft: 3 }}
              >
                <Card
                  shopId={shop.id}
                  image={{ uri: shop.image }}
                  title={shop.name}
                  description={shop.description}
                  saveUpTo={shop.saveUpTo}
                  rating={shop.rating}
                  backgroundColor={theme.cardBackground}
                />
              </Animated.View>
            ))}
          </ScrollView>

          {/* Recommend */}
          <Text
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

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
            {mockShops.map((shop) => (
              <Animated.View
                key={shop.id}
                style={{ width: 300, marginHorizontal: 8, marginLeft: 3 }}
              >
                <Card
                  shopId={shop.id}
                  image={{ uri: shop.image }}
                  title={shop.name}
                  description={shop.description}
                  saveUpTo={shop.saveUpTo}
                  rating={shop.rating}
                  backgroundColor={theme.cardBackground}
                />
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>
      </ScrollView>

      {/* Map Modal */}
      <Modal visible={showMap} animationType="slide" onRequestClose={() => setShowMap(false)}>
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1, width: '100%', height: '100%' }}
            initialRegion={{
              latitude: 25.3693,
              longitude: 51.5405,
              latitudeDelta: 1,
              longitudeDelta: 1,
            }}
          >
            {mockShops.map((shop) => (
              <Marker
                key={shop.id}
                coordinate={shop.coordinates}
              >
                <Callout>
                  <Text>{shop.name}</Text>
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
        <Ionicons name="location-outline" size={24} color="#f1c338" />
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
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 3,
  },
  optionText: {
    color: '#374151',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FAFAFA',
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
    backgroundColor: '#FAFAFA',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
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
  popularServiceButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  popularServiceText: {
    color: '#374151',
    fontSize: 14,
  },
});
