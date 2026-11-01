
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

import { useWeather } from '../context/WeatherContext';

export default function SettingsScreen() {
  const {
    selectedCity,
    setSelectedCity,
    temperatureUnit,
    setTemperatureUnit,
  } = useWeather();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Settings</Text>

        <Text style={styles.subtitle}>
          Customize your weather experience
        </Text>

        <Text style={styles.sectionTitle}>Location</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Selected City</Text>

          <Text style={styles.value}>📍 {selectedCity}</Text>

          <Pressable
            style={styles.resetButton}
            onPress={() => setSelectedCity('Gorakhpur')}
          >
            <Text style={styles.resetText}>
              Reset to Gorakhpur
            </Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Temperature Unit</Text>

        <View style={styles.card}>
          <Text style={styles.label}>
            Choose temperature format
          </Text>

          <View style={styles.options}>
            <Pressable
              style={[
                styles.option,
                temperatureUnit === 'C' && styles.activeOption,
              ]}
              onPress={() => setTemperatureUnit('C')}
            >
              <Text
                style={[
                  styles.optionText,
                  temperatureUnit === 'C' && styles.activeText,
                ]}
              >
                Celsius (°C)
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.option,
                temperatureUnit === 'F' && styles.activeOption,
              ]}
              onPress={() => setTemperatureUnit('F')}
            >
              <Text
                style={[
                  styles.optionText,
                  temperatureUnit === 'F' && styles.activeText,
                ]}
              >
                Fahrenheit (°F)
              </Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.sectionTitle}>About App</Text>

        <View style={styles.card}>
          <Text style={styles.value}>🌤️ Weather App</Text>

          <Text style={styles.label}>Version 1.0.0</Text>

          <Text style={styles.description}>
            Live weather updates and 5-day forecasts powered by Open-Meteo.
          </Text>
        </View>
      </View>
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
    paddingBottom: 40,
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
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#172B4D',
    marginBottom: 12,
    marginTop: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    color: '#718096',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#172B4D',
    marginTop: 8,
  },
  resetButton: {
    backgroundColor: '#EAF4FF',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  resetText: {
    color: '#2878E5',
    fontWeight: 'bold',
  },
  options: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },
  option: {
    flex: 1,
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#F1F4F8',
    alignItems: 'center',
  },
  activeOption: {
    backgroundColor: '#2878E5',
  },
  optionText: {
    color: '#44546A',
    fontWeight: '600',
    fontSize: 13,
  },
  activeText: {
    color: '#FFFFFF',
  },
  description: {
    color: '#718096',
    marginTop: 12,
    lineHeight: 21,
  },
});