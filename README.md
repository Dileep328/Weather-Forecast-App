# Weather Forecast App 🌤️

A cross-platform weather application built using React Native and Expo. Get real-time weather updates, search for cities, and view a 5-day weather forecast.

## Features

* Real-time weather information
* Search weather by city name
* 5-day weather forecast
* Celsius and Fahrenheit temperature conversion
* Pull-to-refresh functionality
* Persistent city and temperature preferences using AsyncStorage
* Bottom tab navigation
* Global state management using React Context API

## Tech Stack

* React Native
* Expo
* JavaScript
* React Navigation
* Context API
* AsyncStorage
* Open-Meteo REST API

## Project Structure

```text
WheatherApp/
├── assets/
├── src/
│   ├── components/
│   ├── context/
│   ├── screens/
│   ├── services/
│   ├── styles/
│   └── utils/
├── App.js
├── app.json
└── package.json
```

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/Dileep328/Weather-Forecast-App.git
```

2. Navigate to the project folder:

```bash
cd Weather-Forecast-App
```

3. Install dependencies:

```bash
npm install
```

4. Start the Expo development server:

```bash
npx expo start
```

5. Open the application using Expo Go or an Android emulator.

## API

Weather data is provided by [Open-Meteo](https://open-meteo.com/).

## Author

**Dileep Maurya**

