
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeatherCard({
  temperature,
  condition,
  feelsLike,
  high,
  low,
  unit = 'C',
}) {
  return (
    <View style={styles.weatherCard}>
      <Text style={styles.date}>Current Weather</Text>

      <Text style={styles.weatherIcon}>☀️</Text>

      <Text style={styles.temperature}>
        {temperature}°{unit}
      </Text>

      <Text style={styles.condition}>{condition}</Text>

      <Text style={styles.feelsLike}>
        Feels like {feelsLike}°{unit}
      </Text>

      <View style={styles.highLow}>
        <Text style={styles.highLowText}>
          ↑ {high}°{unit}
        </Text>

        <Text style={styles.highLowText}>
          ↓ {low}°{unit}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherCard: {
    backgroundColor: '#2878E5',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  date: {
    color: '#DCEBFF',
    fontSize: 13,
    fontWeight: '600',
  },
  weatherIcon: {
    fontSize: 55,
    marginTop: 12,
  },
  temperature: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  condition: {
    fontSize: 19,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  feelsLike: {
    color: '#DCEBFF',
    marginTop: 8,
  },
  highLow: {
    flexDirection: 'row',
    gap: 35,
    marginTop: 20,
  },
  highLowText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});