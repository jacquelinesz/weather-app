let apiKey = "3e9c05f050794f0de7606b04408962e1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

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
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = Math.round(response.data.main.temp);
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
}
axios.get(apiUrl).then(displayTemperature);
