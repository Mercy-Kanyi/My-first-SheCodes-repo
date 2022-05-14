//In your project, display the current date and time using JavaScript: Tuesday 16:00
//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

//challenge 1
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = `${currentDay} ${hour}:${minutes}`;

function displayWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humdity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Winds: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].main;
}

let formSelect = document.querySelector("#search-engine");
formSelect.addEventListener("submit", cityUpdate);

function apiUpdate(city) {
  //event.preventDefault();
  let apiKey = "e9dbb073ecb679b0932ba8a75a3681c8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function cityUpdate(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;

  apiUpdate(city);
}

function searchLocation(position) {
  let apiKey = "e9dbb073ecb679b0932ba8a75a3681c8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentWeather);

apiUpdate("New York");
