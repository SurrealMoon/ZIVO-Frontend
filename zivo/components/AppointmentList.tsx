import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

interface Appointment {
  id: number;
  business: string;
  service: string;
  time: string;
  date: string;
  image: any;
  daysleft?: string;
}

interface AppointmentsListProps {
  appointments: Appointment[];
  selectedTab: 'upcoming' | 'past' | 'cancelled';
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ appointments, selectedTab }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  if (!appointments || appointments.length === 0) {
    let emptyMessage = t('noAppointments');

    if (selectedTab === 'cancelled') {
      emptyMessage = t('noCancelledAppointments');
    } else if (selectedTab === 'past') {
      emptyMessage = t('noPastAppointments');
    } else if (selectedTab === 'upcoming') {
      emptyMessage = t('noUpcomingAppointments');
    }

    return (
      <Text style={{ color: theme.text, textAlign: 'center', marginTop: 32 }}>
        {emptyMessage}
      </Text>
    );
  }

  const groupedByDate = appointments.reduce((acc, appointment) => {
    if (!acc[appointment.date]) acc[appointment.date] = [];
    acc[appointment.date].push(appointment);
    return acc;
  }, {} as Record<string, Appointment[]>);

  return (
    <>
      {Object.entries(groupedByDate).map(([date, items]) => (
        <View key={date} style={{ marginBottom: 16 }}>
          <Text style={{ color: theme.text, fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
            {date}
          </Text>

          {selectedTab === 'upcoming' ? (
            <Text style={{ color: theme.text, fontSize: 14, fontWeight: '600', marginBottom: 8, fontStyle: 'italic' }}>
              {items[0].daysleft} {t('daysLeft')}
            </Text>
          ) : selectedTab === 'past' ? (
            <Text style={{ color: theme.text, fontSize: 14, fontWeight: '600', marginBottom: 8, fontStyle: 'italic' }}>
              {t('past')}
            </Text>
          ) : (
            <Text style={{ color: theme.text, fontSize: 14, fontWeight: '600', marginBottom: 8 }}>
              {t('cancelledAppointment')}
            </Text>
          )}

          {items.map((item) => (
            <AppointmentCard key={item.id} item={item} selectedTab={selectedTab} />
          ))}
        </View>
      ))}
    </>
  );
};

const AppointmentCard = ({ item, selectedTab }: { item: Appointment; selectedTab: string }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const animation = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    Animated.timing(animation, {
      toValue: flipped ? 0 : 180,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setFlipped(!flipped));
  };

  const frontInterpolate = animation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <TouchableOpacity activeOpacity={1} onPress={flipCard} style={{ height: 100, marginBottom: 12 }}>
      {/* Ön Yüz */}
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: theme.cardBackground,
            transform: [{ rotateY: frontInterpolate }],
            zIndex: flipped ? 0 : 1,
          },
        ]}
      >
        <Image source={item.image} style={styles.image} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: theme.text }]}>{item.business}</Text>
          <Text style={[styles.text, { color: theme.text }]}>
            {t('service')}: {t(item.service)}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View style={styles.clickTextContainer}>
          <Text style={styles.clickText}>{t('viewdetails')}</Text>
        </View>
      </Animated.View>

      {/* Arka Yüz */}
      <Animated.View
        style={[
          styles.card,
          styles.cardBack,
          {
            transform: [{ rotateY: backInterpolate }],
            zIndex: flipped ? 1 : 0,
          },
        ]}
      >
        <View style={styles.actions}>
          {selectedTab === 'past' ? (
            <>
              <Action icon="chatbubble-ellipses-outline" label={t('writeReview')} />
              <Action icon="heart-outline" label={t('addFavorite')} />
            </>
          ) : (
            <>
              <Action icon="location-outline" label={t('map')} />
              <Action icon="call-outline" label={t('call')} />
              <Action icon="close-circle-outline" label={t('cancel')} />
            </>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const Action = ({ icon, label }: { icon: any; label: string }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={styles.actionItem}>
      <Ionicons name={icon} size={24} color={theme.buttonBackground} />
      <Text style={[styles.actionText, { color: theme.text }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
  },
  timeContainer: {
    backgroundColor: '#f1c338',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
    marginBottom: 10,
  },
  timeText: {
    fontSize: 12,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  actionItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 12,
    marginTop: 4,
  },
  clickTextContainer: {
    position: 'absolute',
    bottom: 5,
    left: '90%',
    transform: [{ translateX: -60 }],
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    zIndex: 1,
  },
  clickText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default AppointmentsList;
