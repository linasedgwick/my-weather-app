// Time and date

function updateTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let time = document.querySelector("#day-time");
  if (minutes < 10) {
    time.innerHTML = `${day} ${hours}:0${minutes}`;
  } else {
    time.innerHTML = `${day} ${hours}:${minutes}`;
  }
}
updateTime();

// Search engine for city or country

function updateCity(event) {
  event.preventDefault();
  let displayCity = document.querySelector("h1");
  let searchInput = document.querySelector("#search-input");
  let cityName = `${searchInput.value}`;
  displayCity.innerHTML = `${cityName}`;
  let apiKey = "d505e69a528ffd38f9513a4e4c686175";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
let searchCity = document.querySelector("#search-engine");
searchCity.addEventListener("submit", updateCity);

// Displaying weather data based on response from search engine

function showTemperature(response) {
  let showHumidity = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  let showWindSpeed = document.querySelector("#windspeed");
  let windspeed = Math.round(response.data.wind.speed);
  let showDescription = document.querySelector("#current-description");
  let description = response.data.weather[0].description;
  let displayTemp = document.querySelector("#temperature");
  let temp = Math.round(response.data.main.temp);
  showHumidity.innerHTML = ` ${humidity}%`;
  showWindSpeed.innerHTML = ` ${windspeed} m/s`;
  displayTemp.innerHTML = temp;
  showDescription.innerHTML = description;
}

// Current location button, based on position from Geolocation API

function getLocation(position) {
  let apiKey = "d505e69a528ffd38f9513a4e4c686175";
  let unit = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showLocation);
}
let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(getLocation)
);

// Displaying weather data and city based on response from Weather API by lat and lon

function showLocation(response) {
  let showHumidity = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  let showWindSpeed = document.querySelector("#windspeed");
  let windspeed = Math.round(response.data.wind.speed);
  let displayCity = document.querySelector("h1");
  let cityName = response.data.name;
  let showDescription = document.querySelector("#current-description");
  let description = response.data.weather[0].description;
  let displayTemp = document.querySelector("#temperature");
  let temp = Math.round(response.data.main.temp);
  showHumidity.innerHTML = ` ${humidity}%`;
  showWindSpeed.innerHTML = ` ${windspeed} m/s`;
  displayCity.innerHTML = cityName;
  displayTemp.innerHTML = temp;
  showDescription.innerHTML = description;
}

// Temperature conversion to Fahrenheit - Link

function convertTF() {
  let tempF = document.querySelector("#temperature");
  tempF.innerHTML = `66`;
}
let temperatureF = document.querySelector("#temp-f");
temperatureF.addEventListener("click", convertTF);

// Temperature conversion to Celsius - Link

function convertTC() {
  let tempC = document.querySelector("#temperature");
  tempC.innerHTML = `19`;
}
let temperatureC = document.querySelector("#temp-c");
temperatureC.addEventListener("click", convertTC);
