// pseudocode
// global variables (city form, city, current weather, searched city, forecast, five-day-forecast, past search)

var cityFormEl = document.querySelector("#city-search-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#current-weather-container");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
var cities = [];

var formSumbitButton = function(event) {
    event.preventDefault();
    // get value from city search bar
    var city = cityInputEl.value.trim();
    if (city) {
        getCityWeather(city);
        getFiveDay(city);
        // clear out input value 
        cityInputEl.value = "";
    } 

    saveSearch();
    pastSearch(city);
};

// create function to get weather input from the search form
// then fetch weather api
// use the full url to call the API and add city input from user
// check the response from the API

var getCityWeather = function (city) {
    var apiKey = "4487576f5b4f3e349130b486a36f052e"
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey

    fetch(apiURL)
        .then(function(response) {
            response.json().then(function (data) {
                displayWeather(data, city);
            })
        })
};

var displayWeather = function(weather, searchCity) {
    // clear all old content
    weatherContainerEl.textContent = "";
    citySearchInputEl.textContent = searchCity;

    // tried to create an if/else statement below here that would check to see if the city searched would be a real city
    // if not, it shows an alert and hides the forecast containers
    // the alert works but it doesn't hide the container
    if (weather.cod === 200) {
        $(citySearchInputEl).show;
    } else if (weather.cod != 200) {
        alert("Please enter correct city name");
        $(forecastContainerEl).hide;
    }   

    // create an element for the date
    var currentDate = document.createElement("span")
    currentDate.textContent = " (" + moment(weather.dt.value).format("l") + ") ";
    // append date to weather container next to city name
    citySearchInputEl.appendChild(currentDate);

    // create an image element for weather conditions
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    // append icon to weather container next to date
    citySearchInputEl.appendChild(weatherIcon);

    // create a span element to hold temperature
    var temperatureEl = document.createElement("span");
    temperatureEl.innerHTML = "Temperature: " + (Math.round(weather.main.temp * 10) / 10) + " &#176F";
    temperatureEl.classList = "list-group-item";
    // append temperature to weather container
    weatherContainerEl.appendChild(temperatureEl);

    // create a span element to add feels like temperature
    var feelsliketempEl = document.createElement("span");
    feelsliketempEl.innerHTML = "Feels Like: " + (Math.round(weather.main.feels_like * 10) / 10) + " &#176F";
    feelsliketempEl.classList = "list-group-item";
    // append feels like temp to weather container
    weatherContainerEl.appendChild(feelsliketempEl);

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

    // uv index = variables for latitude and longitude
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;

    // call getUvIndex function for the uv index to show up in the weather container
    getUvIndex(lat, lon);
};

// create function to fetch uv index
var getUvIndex = function(lat, lon) {
    var apiKey = "4487576f5b4f3e349130b486a36f052e"
    var apiURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
        .then(function(response) {
            response.json()
        .then(function(data) {
            displayUvIndex(data);
            })
        })
};

// function for displaying uv index
var displayUvIndex = function(uv) {
    var uvIndexEl = document.createElement("div");
    uvIndexEl.innerHTML = "UV Index: ";
    uvIndexEl.classList = "list-group-item";

    uvIndexValue = document.createElement("span");
    uvIndexValue.innerHTML = uv.value;

    if (uv.value <= 2) {
        uvIndexValue.classList = "low";
    } else if (uv.value > 2 && uv.value <= 5) {
        uvIndexValue.classList = "moderate";
    } else if (uv.value > 5 && uv.value < 8) {
        uvIndexValue.classList = "high";
    } else if (uv.value > 8) {
        uvIndexValue.classList = "severe";
    }
    // console.log(uv.value);

    uvIndexEl.appendChild(uvIndexValue);

    // append uv index to weather container just like temp, humidity, etc.
    weatherContainerEl.appendChild(uvIndexEl);
};

// function to fetch 5-day forecast
var getFiveDay = function (city) {
    var apiKey = "4487576f5b4f3e349130b486a36f052e"
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey

    fetch(apiURL)
        .then(function(response) {
            response.json().then(function (data) {
                displayFiveDay(data);
                // console.log(data);
            })
        })
};

// function to display 5-day forecast
var displayFiveDay = function(weather) {
    forecastContainerEl.textContent = "";
    forecastTitle.textContent = "5-Day Forecast:";

    var forecast = weather.list;
    for (i = 5; i < forecast.length; i = i + 8) {
        var weatherForecast = forecast[i];
        // console.log(weatherForecast);

        // create a card for each day
        var forecastEl = document.createElement("div");
        forecastEl.classList = "card bg-info text-light m-4";

        // date
        var forecastDate = document.createElement("h5");
        forecastDate.classList = "card-header bg-light text-dark text-center";
        forecastDate.textContent = moment.unix(weatherForecast.dt).format("l");
        // append date
        forecastEl.appendChild(forecastDate);

        // weather condition icon
        var weatherIcon = document.createElement("img");
        weatherIcon.classList = "card-body mx-auto";
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weatherForecast.weather[0].icon}.png`);
        // append icon
        forecastEl.appendChild(weatherIcon);

        // temp
        var forecastTemp = document.createElement("span");
        forecastTemp.classList = "card-body text-center";
        forecastTemp.innerHTML = "Temp: " + (Math.round(weatherForecast.main.temp * 10) / 10) + " &#176F";
        // append temp
        forecastEl.appendChild(forecastTemp);

        // humidity
        var forecastHum = document.createElement("span");
        forecastHum.classList = "card-body text-center";
        forecastHum.innerHTML = "Humidity: " + weatherForecast.main.humidity + " %";
        // append humidity
        forecastEl.appendChild(forecastHum);

        // console.log(forecastEl);
        // append all of forecast date, icon, temp and humidity to the forecast five day container
        forecastContainerEl.appendChild(forecastEl);
    }
};

// add pastSeach function to add city names to searched list under search form
// create buttons for each previously searched city
var pastSearch = function(pastSearch) {

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-info border p-2";
    pastSearchEl.setAttribute("data-city", pastSearch);
    pastSearchEl.setAttribute("type", "submit");

    pastSearchButtonEl.prepend(pastSearchEl);
};

// pastSearch button function
var pastSearchButton = function(event) {
    var city = event.target.getAttribute("data-city")
    if (city) {
        getCityWeather(city);
        getFiveDay(city);
    }
};

// save searched cities in localstorage
var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};


// create event listender for city search button
cityFormEl.addEventListener("submit", formSumbitButton);
// create event listener for pastSearch buttons
pastSearchButtonEl.addEventListener("click", pastSearchButton);



