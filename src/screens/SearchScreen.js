
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import WeatherCard from '../components/WeatherCard';
import { getWeatherByCity } from '../services/weatherApi';
import { useWeather } from '../context/WeatherContext';

import {
  convertTemperature,
} from '../utils/temperature';

export default function SearchScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setSelectedCity, temperatureUnit } = useWeather();

  const searchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setWeather(null);

      const data = await getWeatherByCity(city.trim());

      setWeather(data);
      setSelectedCity(data.location.name);
    } catch (err) {
      setError(err.message || 'Unable to find this city.');
    } finally {
      setLoading(false);
    }
  };

  const current = weather?.current;
  const daily = weather?.daily;

  const getCondition = (code) => {
    if (code === 0) return 'Clear Sky';
    if ([1, 2, 3].includes(code)) return 'Cloudy';
    if ([45, 48].includes(code)) return 'Foggy';
    if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
    if ([61, 63, 65, 66, 67].includes(code)) return 'Rainy';
    if ([71, 73, 75, 77].includes(code)) return 'Snowy';
    if ([80, 81, 82].includes(code)) return 'Rain Showers';
    if ([95, 96, 99].includes(code)) return 'Thunderstorm';
    return 'Unknown';
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Search City</Text>

      <Text style={styles.subtitle}>
        Find live weather of any city
      </Text>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name..."
          placeholderTextColor="#8995A5"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={searchWeather}
          returnKeyType="search"
        />

        <Pressable
          style={styles.searchButton}
          onPress={searchWeather}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#2878E5"
          style={styles.loader}
        />
      )}

      {error !== '' && (
        <Text style={styles.error}>{error}</Text>
      )}

      {weather && current && daily && (
        <View style={styles.resultContainer}>
          <Text style={styles.cityName}>
            {weather.location.name}
          </Text>

          <Text style={styles.country}>
            {[weather.location.state, weather.location.country]
              .filter(Boolean)
              .join(', ')}
          </Text>

          <WeatherCard
            temperature={convertTemperature(
              current.temperature_2m,
              temperatureUnit
            )}
            condition={getCondition(current.weather_code)}
            feelsLike={convertTemperature(
              current.apparent_temperature,
              temperatureUnit
            )}
            high={convertTemperature(
              daily.temperature_2m_max[0],
              temperatureUnit
            )}
            low={convertTemperature(
              daily.temperature_2m_min[0],
              temperatureUnit
            )}
            unit={temperatureUnit}
          />

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Weather Highlights</Text>

            <Text style={styles.infoText}>
              💧 Humidity: {current.relative_humidity_2m}%
            </Text>

            <Text style={styles.infoText}>
              💨 Wind Speed: {current.wind_speed_10m} km/h
            </Text>

            <Text style={styles.infoText}>
              🌡️ Pressure: {current.surface_pressure} hPa
            </Text>
          </View>

          <Text style={styles.success}>
            ✓ {weather.location.name} selected for forecast
          </Text>
        </View>
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
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#172B4D',
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    marginTop: 6,
    marginBottom: 22,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: '#172B4D',
  },
  searchButton: {
    backgroundColor: '#2878E5',
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 25,
  },
  error: {
    color: '#D93025',
    fontSize: 14,
    marginVertical: 12,
  },
  resultContainer: {
    marginTop: 10,
  },
  cityName: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#172B4D',
  },
  country: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginTop: 18,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#172B4D',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: '#44546A',
    marginVertical: 7,
  },
  success: {
    color: '#16834A',
    fontWeight: '600',
    marginTop: 18,
    textAlign: 'center',
  },
});