
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
  ActivityIndicator,
  Pressable,
} from 'react-native';

import { getWeatherByCity } from '../services/weatherApi';
import { useWeather } from '../context/WeatherContext';
import { convertTemperature } from '../utils/temperature';

export default function ForecastScreen() {
  const { selectedCity, temperatureUnit } = useWeather();

  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchForecast = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getWeatherByCity(selectedCity);

      setForecast(data);
    } catch (err) {
      setError('Unable to load forecast. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCity]);

  useEffect(() => {
    fetchForecast();
  }, [fetchForecast]);

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

  const getDay = (date) => {
    return new Date(date + 'T12:00:00').toLocaleDateString(
      'en-IN',
      {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.heading}>5-Day Forecast</Text>

      <Text style={styles.subtitle}>
        Daily forecast ({temperatureUnit === 'F' ? '°F' : '°C'})
      </Text>

      <Text style={styles.cityName}>{selectedCity}</Text>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#2878E5"
          style={styles.loader}
        />
      )}

      {!loading && error !== '' && (
        <View style={styles.messageCard}>
          <Text style={styles.error}>{error}</Text>

          <Pressable
            style={styles.retryButton}
            onPress={fetchForecast}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
        </View>
      )}

      {!loading && !error && forecast && (
        <View style={styles.forecastList}>
          {forecast.daily.time.map((date, index) => {
            const code = forecast.daily.weather_code[index];

            const high = convertTemperature(
              forecast.daily.temperature_2m_max[index],
              temperatureUnit
            );

            const low = convertTemperature(
              forecast.daily.temperature_2m_min[index],
              temperatureUnit
            );

            return (
              <View key={date} style={styles.forecastCard}>
                <View style={styles.dateContainer}>
                  <Text style={styles.date}>{getDay(date)}</Text>

                  <Text style={styles.condition}>
                    {getCondition(code)}
                  </Text>
                </View>

                <Text style={styles.weatherIcon}>
                  {getWeatherIcon(code)}
                </Text>

                <View style={styles.temperatures}>
                  <Text style={styles.high}>{high}°</Text>
                  <Text style={styles.low}>{low}°</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      <Text style={styles.footer}>
        Weather data provided by Open-Meteo
      </Text>
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
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#172B4D',
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    marginTop: 8,
  },
  cityName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2878E5',
    marginTop: 5,
    marginBottom: 22,
  },
  loader: {
    marginTop: 40,
  },
  forecastList: {
    gap: 14,
  },
  forecastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  dateContainer: {
    flex: 1,
  },
  date: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#172B4D',
  },
  condition: {
    fontSize: 12,
    color: '#718096',
    marginTop: 5,
  },
  weatherIcon: {
    fontSize: 29,
    marginHorizontal: 12,
  },
  temperatures: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  high: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#172B4D',
  },
  low: {
    fontSize: 16,
    color: '#8995A5',
  },
  messageCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 14,
    marginTop: 20,
  },
  error: {
    color: '#D93025',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#2878E5',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#8995A5',
    marginTop: 25,
  },
});