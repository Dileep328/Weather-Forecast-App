
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const WeatherContext = createContext();

const CITY_KEY = '@weather_selected_city';
const UNIT_KEY = '@weather_temperature_unit';

export function WeatherProvider({ children }) {
  const [selectedCity, setSelectedCityState] = useState('Gorakhpur');
  const [temperatureUnit, setTemperatureUnitState] = useState('C');
  const [isReady, setIsReady] = useState(false);

  // Load saved preferences when app starts
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const values = await AsyncStorage.multiGet([
          CITY_KEY,
          UNIT_KEY,
        ]);

        const savedCity = values[0][1];
        const savedUnit = values[1][1];

        if (savedCity) {
          setSelectedCityState(savedCity);
        }

        if (savedUnit === 'C' || savedUnit === 'F') {
          setTemperatureUnitState(savedUnit);
        }
      } catch (error) {
        console.log('Settings Load Error:', error);
      } finally {
        setIsReady(true);
      }
    };

    loadSettings();
  }, []);

  // Update and save selected city
  const setSelectedCity = async (city) => {
    setSelectedCityState(city);

    try {
      await AsyncStorage.setItem(CITY_KEY, city);
    } catch (error) {
      console.log('City Save Error:', error);
    }
  };

  // Update and save temperature unit
  const setTemperatureUnit = async (unit) => {
    setTemperatureUnitState(unit);

    try {
      await AsyncStorage.setItem(UNIT_KEY, unit);
    } catch (error) {
      console.log('Unit Save Error:', error);
    }
  };

  // Wait until saved settings are loaded
  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2878E5" />
        <Text style={styles.loadingText}>Loading your settings...</Text>
      </View>
    );
  }

  return (
    <WeatherContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        temperatureUnit,
        setTemperatureUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#EAF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#172B4D',
    fontSize: 14,
  },
});