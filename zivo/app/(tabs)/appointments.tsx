import { View, Text, ScrollView, I18nManager, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

const appointmentsMock = {
  upcoming: [
    {
      id: 1,
      business: 'Casablanca Beauty Salon',
      service: 'Hair Cut + Shampoo',
      time: '01.00-01.30 pm',
      date: '2025-06-28',
      image: require('../../assets/images/salon1.png')
    },
    {
      id: 2,
      business: 'Ali’s Hair Salon',
      service: 'Hair Cut + Beard Shave',
      time: '03.00-04.00 pm',
      date: '2025-06-29',
      image: require('../../assets/images/salon2.png')
    },
  ],
  past: [
    {
      id: 3,
      business: 'Glow Skin Care Center',
      service: 'Deep Cleansing Facial',
      time: '10.00-10.45 am',
      date: '2025-06-25',
      image: require('../../assets/images/skincare.png'),
    },
    {
      id: 4,
      business: 'Nail Art Studio',
      service: 'Gel Nail Design',
      time: '12.00-12.30 pm',
      date: '2025-06-24',
      image: require('../../assets/images/nailart.png'),
    },
  ],
  cancelled: [], // Boş dahi olsa tanımlı olması TypeScript için önemli
};

export default function AppointmentsScreen() {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<'past' | 'upcoming' | 'cancelled'>('upcoming');
  const groupAppointmentsByDate = (appointments: typeof appointmentsMock['upcoming']) => {
    const grouped: Record<string, typeof appointments> = {};
    appointments.forEach((appt) => {
      if (!grouped[appt.date]) {
        grouped[appt.date] = [];
      }
      grouped[appt.date].push(appt);
    });
    return grouped;
  };

  return (
<ScrollView className="flex-1 bg-orange-50 px-4 pt-10">
  {/* Header */}
  <View className="flex-row items-center mb-9 mt-2">
  <Image
    source={{ uri: 'https://i.pinimg.com/736x/cf/ac/90/cfac90d25b474df10cd71ebc632e7ef1.jpg' }}
    className="w-16 h-16 rounded-full"
  />
  <View className="ml-4 flex-1">
  <Text className="text-lg font-semibold text-gray-900">
  Aisha Khalid
</Text>
  </View>
  <Ionicons name="notifications-outline" size={24} color="black" />
</View>

  {/* Tabs */}
  <View className="flex-row justify-center mt-2 mb-6">
    <View className="flex-row relative items-center">
          {/* Past */}
          <TouchableOpacity
            className={`py-2 rounded-full items-center justify-center z-0 ${
              selectedTab === 'past' ? 'bg-[#F6DDF4]' : 'bg-[#65558F]'
            }`}
            onPress={() => setSelectedTab('past')}
            style={{
              marginRight: -6,
              minWidth: 100,
            }}
          >
            <Text className={`text-sm font-semibold text-center ${selectedTab === 'past' ? 'text-black' : 'text-white'}`}>
              {t('past')}
            </Text>
          </TouchableOpacity>

          {/* Upcoming */}
          <TouchableOpacity
            className={`py-2 rounded-full items-center justify-center z-10 ${
              selectedTab === 'upcoming' ? 'bg-[#F6DDF4]' : 'bg-[#65558F]'
            }`}
            onPress={() => setSelectedTab('upcoming')}
            style={{
              marginHorizontal: -6,
              minWidth: 100,
              elevation: 5,
              shadowColor: '#000',
              shadowOpacity: 0.15,
              shadowRadius: 2,
            }}
          >
            <Text className={`text-sm font-semibold text-center ${selectedTab === 'upcoming' ? 'text-black' : 'text-white'}`}>
              {t('upcoming')}
            </Text>
          </TouchableOpacity>

          {/* Cancelled */}
          <TouchableOpacity
            className={`py-2 rounded-full items-center justify-center z-0 ${
              selectedTab === 'cancelled' ? 'bg-[#F6DDF4]' : 'bg-[#65558F]'
            }`}
            onPress={() => setSelectedTab('cancelled')}
            style={{
              marginLeft: -6,
              minWidth: 100,
            }}
          >
            <Text className={`text-sm font-semibold text-center ${selectedTab === 'cancelled' ? 'text-black' : 'text-white'}`}>
              {t('cancelled')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

{/* Appointment List */}
{selectedTab === 'upcoming' && (
  <>
    {Object.entries(
      appointmentsMock.upcoming.reduce((acc, appointment) => {
        const date = appointment.date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(appointment);
        return acc;
      }, {} as Record<string, typeof appointmentsMock.upcoming>)
    ).map(([date, appointments]) => (
      <View key={date} className="mb-6">
        <Text className="text-lg font-semibold mb-2">{date}</Text>

        {appointments.map((item) => (
          <View
            key={item.id}
            className="flex-row items-center bg-white rounded-3xl mb-4"
            style={{
              padding: 16,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 5,
            }}
          >
            <Image
              source={item.image}
              className="w-16 h-16 rounded-xl mr-4"
              style={{ resizeMode: 'cover' }}
            />
            <View className="flex-1">
              <Text
                className="text-base font-semibold text-gray-900"
                numberOfLines={1}
                style={{ flexShrink: 1 }}
              >
                {item.business}
              </Text>
              <Text className="text-sm text-gray-500">
                Service : {item.service}
              </Text>
            </View>
            <View className="bg-[#65558F] px-3 py-1 rounded-full ml-2">
              <Text className="text-white text-sm font-medium">{item.time}</Text>
            </View>
          </View>
        ))}
      </View>
    ))}
  </>
)}

{selectedTab === 'past' && (
  <>
    {Object.entries(
      appointmentsMock.past.reduce((acc, appointment) => {
        const date = appointment.date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(appointment);
        return acc;
      }, {} as Record<string, typeof appointmentsMock.past>)
    ).map(([date, appointments]) => (
      <View key={date} className="mb-6">
        <Text className="text-lg font-semibold mb-2">{date}</Text>

        {appointments.map((item) => (
          <View
            key={item.id}
            className="flex-row items-center bg-white rounded-3xl mb-4"
            style={{
              padding: 16,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 5,
            }}
          >
            <Image
              source={item.image}
              className="w-16 h-16 rounded-xl mr-4"
              style={{ resizeMode: 'cover' }}
            />
            <View className="flex-1">
              <Text
                className="text-base font-semibold text-gray-900"
                numberOfLines={1}
                style={{ flexShrink: 1 }}
              >
                {item.business}
              </Text>
              <Text className="text-sm text-gray-500">
                {t('service')} : {item.service}
              </Text>
            </View>
            <View className="bg-[#65558F] px-3 py-1 rounded-full ml-2">
              <Text className="text-white text-sm font-medium">{item.time}</Text>
            </View>
          </View>
        ))}
      </View>
    ))}
  </>
)}
</ScrollView>
  );
}
