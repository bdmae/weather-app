// TODO: Write your JS code in here
const key = "86a9a741e206ee184f09d53436f1e1b6";
// const api = `http://api.openweathermap.org/data/2.5/weather?id=524901&lang=fr&appid=${key}`;

// grab html elements
// city = document.querySelector(".city");
// icon = document.querySelector(".icon");
// description = document.querySelector(".description");
// temp = document.querySelector(".temp");
// humidity = document.querySelector(".humidity");
// weather = document.querySelector(".weather");
searchBar = document.querySelector(".search-bar");
searchButton = document.querySelector(".search button");

//full url -> http://api.openweathermap.org/data/2.5/weather?id=524901&lang=fr&appid=86a9a741e206ee184f09d53436f1e1b6


// function displayWeather(data) { 
//   contentArea.innerHTML = `
// <div class="card" style="width: 18rem;">
//   <div class="card-body justify-content-center;">
//       <h2 class="card-title">Weather in ${data.name}</h2>
//       <h3 class="card-subtitle mb-2">Highs of ${data.main.temp_max}. Lows of ${data.main.temp_min}.</h3>
//       <h4>Mostly ${data.weather[0].main} and humidity is ${data.main.humidity}.</h4>
//   </div>
// </div>
//   `;
// } // listen to event first (before fetching api)

const displayWeather = (data) => {
  // define variables from api data
  // const { name } = data;
  // const { icon, description } = data.weather[0];
  // const { temp, humidity } = data.main;
  // const { speed } = data.wind;
  const name = data.name;
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;
  const temp = data.main.temp;
  const humidity = data.main.humidity;
  // display
  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".description").innerText = description;
  document.querySelector(".temp").innerText = `${Math.round(temp) - 273}°C`;
  document.querySelector(".humidity").innerText =
    "Humidity: " + humidity + "%";
  document.querySelector(".weather").classList.remove("loading");
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + name + "')";
  const today = new Date();
  const localOffset = data.timezone + today.getTimezoneOffset() * 60;
  const localDate = new Date(today.setUTCSeconds(localOffset));
  const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = localDate.toLocaleDateString("en-US", options);
  document.getElementById('date').innerText = formattedDate;
};



const fetchWeather = (givenCity) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${givenCity}&appid=${key}`)
  .then(response => response.json())
  .then(displayWeather); 
};



// if they click the button, then call the search weather function

searchButton.addEventListener("click", (e) => {
   e.preventDefault();
   fetchWeather(searchBar.value);
});

// if they press the enter key instead of clicking the button 
// then call the search weather function

searchBar.addEventListener("keyup", (e) => {
   e.preventDefault();
   if (e.key === "Enter") {
     fetchWeather(searchBar.value);
   };
});

// to do -> add local time


