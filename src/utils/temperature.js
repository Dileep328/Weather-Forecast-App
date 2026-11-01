
export const convertTemperature = (celsius, unit = 'C') => {
  if (celsius === undefined || celsius === null) {
    return '--';
  }

  if (unit === 'F') {
    return Math.round((celsius * 9) / 5 + 32);
  }

  return Math.round(celsius);
};

export const getTemperatureSymbol = (unit = 'C') => {
  return unit === 'F' ? '°F' : '°C';
};