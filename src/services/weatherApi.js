
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

const LATITUDE = 26.7606;
const LONGITUDE = 83.3732;

// Default Gorakhpur weather
export const getWeather = async () => {
  return fetchWeather(LATITUDE, LONGITUDE);
};

// Search weather by city name
export const getWeatherByCity = async (city) => {
  try {
    const geoUrl =
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const geoResponse = await fetch(geoUrl);

    if (!geoResponse.ok) {
      throw new Error('Unable to search city.');
    }

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error('City not found.');
    }

    const location = geoData.results[0];

    const weatherData = await fetchWeather(
      location.latitude,
      location.longitude
    );

    return {
      ...weatherData,
      location: {
        name: location.name,
        country: location.country,
        state: location.admin1,
      },
    };
  } catch (error) {
    console.log('City Search Error:', error.message);
    throw error;
  }
};

// Fetch current and 5-day weather
const fetchWeather = async (latitude, longitude) => {
  const url =
    `${BASE_URL}?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset` +
    `&forecast_days=5` +
    `&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Unable to fetch weather data.');
  }

  return await response.json();
};