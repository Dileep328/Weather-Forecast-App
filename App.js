
import React from 'react';
import { Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import ForecastScreen from './src/screens/ForecastScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import { WeatherProvider } from './src/context/WeatherContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <WeatherProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#2878E5',
            tabBarInactiveTintColor: '#8995A5',
            tabBarStyle: {
              height: 65,
              paddingBottom: 8,
              paddingTop: 7,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: () => <Text>🏠</Text>,
            }}
          />

          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              tabBarIcon: () => <Text>🔍</Text>,
            }}
          />

          <Tab.Screen
            name="Forecast"
            component={ForecastScreen}
            options={{
              tabBarIcon: () => <Text>📅</Text>,
            }}
          />

          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: () => <Text>⚙️</Text>,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </WeatherProvider>
  );
}