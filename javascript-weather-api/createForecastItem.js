export const createForecastItem = (item) => {
  return `<div class="forecastItem">
    <p>${new Date(item.dt * 1000).toLocaleString()}</p>
    <p>${Math.round(item.main.temp - 273.15)}&#8451</p>
    <p>${item.weather[0].main}</p>  
    <img src="https://openweathermap.org/img/wn/${
      item.weather[0].icon
    }.png" alt="${item.weather[0].main}">
  </div>`;
};

//----- use map like loop but return something
// *1000 coz millisecond // toLocaleString coz returns a string with a language-sensitive representation
// &#8451 is unicode
// img link from openweather and replace the img name as string (Template strings)
