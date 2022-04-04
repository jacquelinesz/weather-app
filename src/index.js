function currentDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperature = document.querySelector("#temp-number");
  celsiusTemp = response.data.main.temp;
  temperature.innerHTML = Math.round(celsiusTemp);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let description = document.querySelector("#condition");
  description.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humid");
  humidity.innerHTML = response.data.main.humidity;
  let date = document.querySelector("#date");
  date.innerHTML = currentDate(response.data.dt * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apiKey = "3e9c05f050794f0de7606b04408962e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  search(cityInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp-number");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}
function displayCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp-number");
  temperature.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", displayCelsius);

search("London");
