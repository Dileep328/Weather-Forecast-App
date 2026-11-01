
import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from 'react-native';

import { getWeatherByCity } from '../services/weatherApi';
import { useWeather } from '../context/WeatherContext';
import {
  convertTemperature,
  getTemperatureSymbol,
} from '../utils/temperature';

export default function HomeScreen() {
  const { selectedCity, temperatureUnit } = useWeather();

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError('');

      const data = await getWeatherByCity(selectedCity);
      setWeather(data);
    } catch (err) {
      setError('Unable to load weather. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedCity]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const getCondition = (code) => {
    if (code === 0) return 'Clear Sky';
    if ([1, 2, 3].includes(code)) return 'Partly Cloudy';
    if ([45, 48].includes(code)) return 'Foggy';
    if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
    if ([61, 63, 65, 66, 67].includes(code)) return 'Rainy';
    if ([71, 73, 75, 77].includes(code)) return 'Snowy';
    if ([80, 81, 82].includes(code)) return 'Rain Showers';
    if ([95, 96, 99].includes(code)) return 'Thunderstorm';
    return 'Unknown';
  };

  const getWeatherIcon = (code) => {
    if (code === 0) return '☀️';
    if ([1, 2, 3].includes(code)) return '⛅';
    if ([45, 48].includes(code)) return '🌫️';
    if ([51, 53, 55, 56, 57].includes(code)) return '🌦️';
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return '🌧️';
    if ([71, 73, 75, 77].includes(code)) return '❄️';
    if ([95, 96, 99].includes(code)) return '⛈️';
    return '🌤️';
  };

  const current = weather?.current;
  const daily = weather?.daily;

  const symbol = getTemperatureSymbol(temperatureUnit);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => fetchWeather(true)}
          tintColor="#2878E5"
        />
      }
    >
      <StatusBar barStyle="dark-content" backgroundColor="#EAF4FF" />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good to see you!</Text>
          <Text style={styles.heading}>Weather Today</Text>
        </View>

        <Text style={styles.headerIcon}>🌤️</Text>
      </View>

      <View style={styles.locationCard}>
        <Text style={styles.locationIcon}>📍</Text>

        <View>
          <Text style={styles.locationLabel}>Selected Location</Text>
          <Text style={styles.locationName}>{selectedCity}</Text>

          {weather?.location?.country && (
            <Text style={styles.country}>
              {weather.location.country}
            </Text>
          )}
        </View>
      </View>

      {loading && !weather && (
        <ActivityIndicator
          size="large"
          color="#2878E5"
          style={styles.loader}
        />
      )}

      {error !== '' && (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{error}</Text>

          <Pressable
            style={styles.retryButton}
            onPress={() => fetchWeather()}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
        </View>
      )}

      {current && daily && (
        <>
          <View style={styles.weatherCard}>
            <Text style={styles.todayLabel}>CURRENT WEATHER</Text>

            <Text style={styles.weatherIcon}>
              {getWeatherIcon(current.weather_code)}
            </Text>

            <Text style={styles.temperature}>
              {convertTemperature(current.temperature_2m, temperatureUnit)}
              {symbol}
            </Text>

            <Text style={styles.condition}>
              {getCondition(current.weather_code)}
            </Text>

            <Text style={styles.feelsLike}>
              Feels like {convertTemperature(
                current.apparent_temperature,
                temperatureUnit
              )}{symbol}
            </Text>

            <View style={styles.highLow}>
              <Text style={styles.highLowText}>
                ↑ {convertTemperature(
                  daily.temperature_2m_max[0],
                  temperatureUnit
                )}{symbol}
              </Text>

              <Text style={styles.highLowText}>
                ↓ {convertTemperature(
                  daily.temperature_2m_min[0],
                  temperatureUnit
                )}{symbol}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Today's Highlights</Text>

          <View style={styles.highlightsGrid}>
            <View style={styles.highlightCard}>
              <Text style={styles.highlightIcon}>💧</Text>
              <Text style={styles.highlightLabel}>Humidity</Text>
              <Text style={styles.highlightValue}>
                {current.relative_humidity_2m}%
              </Text>
            </View>

            <View style={styles.highlightCard}>
              <Text style={styles.highlightIcon}>💨</Text>
              <Text style={styles.highlightLabel}>Wind Speed</Text>
              <Text style={styles.highlightValue}>
                {current.wind_speed_10m} km/h
              </Text>
            </View>

            <View style={styles.highlightCard}>
              <Text style={styles.highlightIcon}>🌡️</Text>
              <Text style={styles.highlightLabel}>Pressure</Text>
              <Text style={styles.highlightValue}>
                {Math.round(current.surface_pressure)} hPa
              </Text>
            </View>

            <View style={styles.highlightCard}>
              <Text style={styles.highlightIcon}>☀️</Text>
              <Text style={styles.highlightLabel}>Sunrise</Text>
              <Text style={styles.highlightValue}>
                {daily.sunrise[0].split('T')[1]}
              </Text>
            </View>

            <View style={styles.highlightCard}>
              <Text style={styles.highlightIcon}>🌇</Text>
              <Text style={styles.highlightLabel}>Sunset</Text>
              <Text style={styles.highlightValue}>
                {daily.sunset[0].split('T')[1]}
              </Text>
            </View>
          </View>

          <Text style={styles.footer}>
            Weather data provided by Open-Meteo
          </Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF4FF',
  },
  content: {
    padding: 20,
    paddingTop: 55,
    paddingBottom: 35,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  greeting: {
    fontSize: 14,
    color: '#718096',
  },
  heading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#172B4D',
    marginTop: 4,
  },
  headerIcon: {
    fontSize: 38,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
  },
  locationIcon: {
    fontSize: 28,
    marginRight: 13,
  },
  locationLabel: {
    color: '#8995A5',
    fontSize: 12,
  },
  locationName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#172B4D',
    marginTop: 3,
  },
  country: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
  },
  loader: {
    marginTop: 40,
  },
  weatherCard: {
    backgroundColor: '#2878E5',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    marginBottom: 25,
  },
  todayLabel: {
    color: '#DCEBFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  weatherIcon: {
    fontSize: 58,
    marginTop: 14,
  },
  temperature: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  condition: {
    fontSize: 19,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  feelsLike: {
    fontSize: 14,
    color: '#DCEBFF',
    marginTop: 7,
  },
  highLow: {
    flexDirection: 'row',
    gap: 35,
    marginTop: 22,
  },
  highLowText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#172B4D',
    marginBottom: 15,
  },
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  highlightCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 17,
    marginBottom: 13,
  },
  highlightIcon: {
    fontSize: 25,
  },
  highlightLabel: {
    fontSize: 13,
    color: '#718096',
    marginTop: 12,
  },
  highlightValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#172B4D',
    marginTop: 5,
  },
  errorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginTop: 15,
  },
  errorText: {
    color: '#D93025',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#2878E5',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  footer: {
    color: '#8995A5',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
});