let result = document.getElementById("result");
let result1 = document.getElementById("result1");
let result2 = document.getElementById("result2");
let panel = document.querySelector(".panel");
const app = document.querySelector('.weather-app');

let searchBtn = document.getElementById("search-btn");
let cityInp = document.getElementById("locInp");

const timel = document.getElementById('time');
const datel = document.getElementById('date');
const toggle_unit = document.getElementsByClassName('toggle-unit');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
  const minutes = time.getMinutes();
  const ampm = hour >=12 ? 'PM' : 'AM'

  timel.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

  datel.innerHTML = days[day] + ', ' + date+ ' ' + months[month] + ' (IST)'

}, 1000);

// Function to get user's geolocation and fetch weather data
function getLocationAndWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      getWeatherByCoordinates(latitude, longitude);
    }, function () {
      // If geolocation is not available or denied, use default coordinates for Bhopal
      getWeatherByCoordinates(23.2599, 77.4126); // Bhopal coordinates
    });
  } else {
    // If geolocation is not supported, use default coordinates for Bhopal
    getWeatherByCoordinates(23.2599, 77.4126); // Bhopal coordinates
  }
}

// Trigger the getLocationAndWeather function when the page loads
window.addEventListener("load", getLocationAndWeather);

// Function to fetch weather details from API and display them
function getWeather(cityValue) {
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=imperial`;

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      updateWeatherUI(data);
    })
    .catch(() => {
      result.innerHTML = "";
      result1.innerHTML = "";
      panel.style.height = "60%";
      panel.style.right = "30%";
      result2.innerHTML = `<h3 class="msg">City not found</h3>`;
    });
}

// Trigger the getWeather function when the search button is clicked
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const cityValue = cityInp.value;
  if (cityValue.length > 0) {
    getWeather(cityValue);
  }
  cityInp.value = "";
});

// Function to get weather data by coordinates
function getWeatherByCoordinates(latitude, longitude) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=imperial`)
    .then((resp) => resp.json())
    .then((data) => {
      updateWeatherUI(data);
      setupToggleTemperatureButton();
    })
    .catch(() => {
      result.innerHTML = "";
      result1.innerHTML = "";
      panel.style.height = "60%";
      panel.style.right = "30%";
      result2.innerHTML = `<h3 class="msg">City not found</h3>`;
    });
}


function setupToggleTemperatureButton() {
  // Function to toggle temperature units between Celsius and Fahrenheit
  function toggleTemperatureUnit() {
    const temperatureElement = document.querySelector(".temp");
    const currentUnit = temperatureElement.innerHTML.includes("°C") ? "C" : "F";

    const currentTemperature = parseFloat(temperatureElement.innerHTML);
    let newTemperature;

    if (currentUnit === "C") {
      // Convert Celsius to Fahrenheit: °F = (°C * 9/5) + 32
      newTemperature = (currentTemperature * 9/5) + 32;
      temperatureElement.innerHTML = `${newTemperature.toFixed(2)}°F`;
      toggle_unit[0].textContent = "unit: °C";
    } else {
      // Convert Fahrenheit to Celsius: °C = (°F - 32) * 5/9
      newTemperature = (currentTemperature - 32) * 5/9;
      temperatureElement.innerHTML = `${newTemperature.toFixed(2)}°C`;
      toggle_unit[0].textContent = "unit: °F";
    }
  }

  // Add a click event listener to the toggle unit button
  toggle_unit[0].addEventListener("click", toggleTemperatureUnit);
}


// Function to update the weather UI
function updateWeatherUI(data) {


  
    const imageChange = data.weather[0].main;
  
    if (imageChange === "Snow") {
      app.style.backgroundImage = `url(./images/50e16e663f03e546202fb23607f747b3.gif)`;
    } else if (imageChange === "Clouds") {
      app.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),url(./images/ad8e41d1fc00ff3c27b1c08d0f225ddf.gif)`;
      panel.style.backgroundColor = `rgba(110, 110, 110, 0.1)`;
    } else if (imageChange === "Rain") {
      app.style.backgroundImage = `url(./images/ea9fed7510140921b9c36330bda27547.gif)`;
      panel.style.backgroundColor = `rgba(110, 110, 110, 0.1)`;
    } else if (imageChange === "Haze") {
      app.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(./images/093f07c3fe70482d1d79a104d13b9e56.gif)`;
      panel.style.backgroundColor = `rgba(110, 110, 110, 0.1)`;
    } else if (imageChange === "Clear") {
      app.style.backgroundImage = `url(./images/df0a3e2ec30abb1c92d145ef165b714f.gif)`;
      panel.style.backgroundColor = `rgba(110, 110, 110, 0.1)`;
    } else if (imageChange === "Mist") {
      app.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)),url(./images/1d1b336e40de7fd0689afc6561f4e92f.gif)`;
      panel.style.backgroundColor = `rgba(110, 110, 110, 0.1)`;
    } else if (imageChange === "Smoke") {
      app.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(./images/093f07c3fe70482d1d79a104d13b9e56.gif)`;
      panel.style.backgroundColor = `rgba(110, 110, 110, 0.1)`;
    } else if (imageChange === "Thunderstorm") {
      app.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(./images/739432d532bf90abdadbeea579abc21b.gif)`;
      panel.style.backgroundColor = `rgba(110, 110, 110, 0.1)`;
    } else {
      app.style.backgroundImage = `url(./images/df0a3e2ec30abb1c92d145ef165b714f.gif)`;
      panel.style.backgroundColor = `rgba(110, 110, 110, 0.1)`; 
    }
  

    result.innerHTML = `
      <h1 class="temp">${data.main.temp}&#176;</h1> 
      <div class="city-time">
          <h1 class="name">${data.name}</h1>
      </div>
      <div  class="weather">
          <img class="icon" width="70" height="70" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"" alt="icon">
          <span class="condition">${data.weather[0].description}</span>
      </div>
    `;
  
    result1.innerHTML = `
      <li>
        <span>COUNTRY</span>
        <span class="country">${data.sys.country}</span>
      </li>
      <li>
        <span>Clouds</span>
        <span class="clouds">${data.clouds.all}%</span>
      </li>
      <li>
        <span>Humidity</span>
        <span class="humid">${data.main.humidity}</span>
      </li>
      <li>
        <span>Winds</span>
        <span class="wind">${data.wind.speed}km/h</span>
      </li>
      <li>
        <span>Pressure</span>
        <span class="pressure">${data.main.pressure}</span>
      </li>
    `;
    window.addEventListener("load", function () {
      getLocationAndWeather();
      setupToggleTemperatureButton(); // Call the function to set up the event listener
    });


  }
  