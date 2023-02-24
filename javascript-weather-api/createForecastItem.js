export const createForecastItem = (item) => {
  return `
<div class="small-container">
    <div class="forecastItem">
     <div class="time"><p>${new Date(item.dt * 1000).toLocaleString()}</p></div>
     <div class="temp"><p>${Math.round(item.main.temp - 273.15)}&#8451</p></div>
     <div class="status"><p>${item.weather[0].main}</p></div>
     <div class="icon"><img src="https://openweathermap.org/img/wn/${
       item.weather[0].icon
     }.png" alt="${item.weather[0].main}"></div>
    </div>
    </div>
  `;
};

//----- use map like loop but return something
// *1000 coz millisecond // toLocaleString coz returns a string with a language-sensitive representation
// &#8451 is unicode
// img link from openweather and replace the img name as string (Template strings)
