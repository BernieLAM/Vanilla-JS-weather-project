const root = document.getElementById("root"); //----- link with html

import { createForecastItem } from "./createForecastItem.js";

//----- loop over the data and return all the forecast //step 5 & 6
const forecast = (list) => {
  const results = list.map((item, index) => {
    if (index % 4 !== 0) {
      return; //----- if it is not a point in the array, skip it // step 6
    }

    return createForecastItem(item); //----- from other js
  });
  root.insertAdjacentHTML("beforeend", results.join(" "));
};

//----- use the weather data to update dom //step 4
const setInterface = (weather) => {
  const { name, country } = weather.city; //----- destructure the data
  const title = `<div class="location"><h2>Location:</h2></div>
                  <div class="location-name"><h2>${name} , ${country}</h2></div>`; //----- build page title
  root.innerHTML = title; //----- put title in dom

  forecast(weather.list); //----- call forecast function
};

//first situation (if success) //step 3
const success = async ({ coords }) => {
  const { latitude, longitude } = coords;

  //start spinner, here is before get data
  const loading = document.getElementById("loading");
  loading.classList.add("loading");

  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=94048389ab1c2aeec5dd9f7a5c2fbdeb`
  ); //----- get data from openweather // await - means please wait until the data arrives before the program carries on, as it needs the data before it carries on
  setInterface(data);
  //----- once get user geolocation ,it call success function and then get data from openweather, finally call setinterface function

  //stop spinner, here is after got the data
  loading.classList.remove("loading");
};

//second situation (if fail) //step 2
const fail = (fail) => {
  return;
};
loading.classList.remove("loading");

//get user geolocation //step 1
navigator.geolocation.getCurrentPosition(success, fail);

//-------------------------------------------------- user input location to call weather --------------------------------------------------//

document.getElementById("location").addEventListener("input", (e) => {
  //go to weather api and get data from input event // step 1
  async function getData() {
    const city = e.target.value; //----- "e" means event, "target" property returns the element where the event occured, "value" can be change to other like tagNmae
    const { data } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=94048389ab1c2aeec5dd9f7a5c2fbdeb`
    ); //----- axios is always with {data}, if there is the same name in same scope, rename it like { data : weather }

    //get lon lat from data // step 2
    if (data[0] && data[0]) {
      const { lat, lon } = data[0]; //----- if() means if lon and lat are truly // before is (data[0].lat && data[0].lon), now is destructured
      const { data: weather } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=94048389ab1c2aeec5dd9f7a5c2fbdeb`
      );
      setInterface(weather); // ----- call setInterface function and send weather // step 3
    }
  }
  getData(); // ----- run function
});
