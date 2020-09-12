// pseudocode
// global variables (city form, city, current weather, searched city, forecast, five-day-forecast, past search)
var cities = [];
var cityFormEl = document.querySelector("#city-search-form");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#current-weather-container");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");


// create function 
// then fetch weather api
// use the full url to call the API and add inputValue
// check the response from the API
// console log response 

var formSumbitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if(city){
        getCityWeather(city);
        
        cities.unshift({city});
        cityInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
}
// add in fiveDay(city) above;
// creat saveSearch() for localStorage
// pastSearch(city) for cities to show when they've been searched 

var getCityWeather = function(city){
    var apiKey = "4487576f5b4f3e349130b486a36f052e"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        })
    })
};

var displayWeather = function(weather, searchCity){
    // clear all old content
    weatherContainerEl.textContent= "";  
    citySearchInputEl.textContent=searchCity;

    console.log(weather);

    // create an element for the date to go 
    var currentDate = document.createElement("span")
    currentDate.textContent=" (" + moment(weather.dt.value).format("L") + ") ";
    citySearchInputEl.appendChild(currentDate);
    
    // create an image element
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearchInputEl.appendChild(weatherIcon);

    // create a span element to hold temperature data
    var temperatureEl = document.createElement("span");
    temperatureEl.innerHTML = "Temperature: " + weather.main.temp + " &#176F";
    temperatureEl.classList = "list-group-item";
    // append temperature to weather container
    weatherContainerEl.appendChild(temperatureEl);

    // ADD FEELS LIKE TEMPERATURE

    // create a span element to hold humidity data
    var humidityEl = document.createElement("span");
    humidityEl.innerHTML = " Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item";
    // append humidity to weather container
    weatherContainerEl.appendChild(humidityEl);

    // create a span element to hold wind speed data
    var windSpeedEl = document.createElement("span");
    windSpeedEl.innerHTML = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item";
    // append wind speed to weather container
    weatherContainerEl.appendChild(windSpeedEl);

    // uv index -- need second API call
    return fetch(
        "http://api.openweathermap.org/data/2.5/uvi?appid=4487576f5b4f3e349130b486a36f052e&lat=" + weather.coord.lat + "&lon=" + weather.coord.lon)
    
    .then(function(uvFetch) {
        return uvFetch.json();
    })
    .then(function(uvResponse) {
        console.log(uvResponse);
    })
}


cityFormEl.addEventListener("submit", formSumbitHandler);




// full forecast for city searched and append to the page (id = currentCity)
// 5 day forecast for city searched and append to the page (id = fiveDayForecast)

// only thing we need in localStorage - save city name
