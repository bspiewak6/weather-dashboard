// pseudocode
// global variables (cities empty, city form, city, current weather, searched city, forecast, five-day-forecast, past search)

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
    var city = cityInputEl.value.trim();
    if(city){
        getCityWeather(city);
        getFiveDay(city);
        // clear out input value 
        cityInputEl.value = "";
    } else {
        alert("Please enter a correct city");
    }
}
// create function to get weather input from the search form
// then fetch weather api
// use the full url to call the API and add inputValue
// check the response from the API
// console log response 


// create saveSearch function for localStorage
// pastSearch(city) for cities to show when they've been searched 

var getCityWeather = function(city){
    var apiKey = "4487576f5b4f3e349130b486a36f052e"
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey

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

    // console.log(weather);

    // create an element for the date to go in next to the city that was searched by the user
    var currentDate = document.createElement("span")
    currentDate.textContent=" (" + moment(weather.dt.value).format("l") + ") ";
    // append date to weather container next to city name
    citySearchInputEl.appendChild(currentDate);
    
    // create an image element
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    // append icon to weather container next to date
    citySearchInputEl.appendChild(weatherIcon);

    // create a span element to hold temperature data
    var temperatureEl = document.createElement("span");
    temperatureEl.innerHTML = "Temperature: " + (Math.round(weather.main.temp * 10) / 10) + " &#176F";
    temperatureEl.classList = "list-group-item";
    // append temperature to weather container
    weatherContainerEl.appendChild(temperatureEl);

    // add feels like temperature
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
    // add in getUvIndex function
    getUvIndex(lat, lon);
};

// function for fetching uv index
var getUvIndex = function(lat,lon) {
        var apiKey = "4487576f5b4f3e349130b486a36f052e"
        var apiURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
        fetch(apiURL)
        .then(function(response){
            response.json().then(function(data){
                displayUvIndex(data);
            
            });
        }); 
}

// function for displaying uv index
var displayUvIndex = function(uv) {
    var uvIndexEl = document.createElement("div");
    uvIndexEl.innerHTML = "UV Index: ";
    uvIndexEl.classList = "list-group-item";

    uvIndexValue = document.createElement("span");
    uvIndexValue.innerHTML = uv.value;

    if(uv.value <= 2) {
        uvIndexValue.classList = "low";
    } else if(uv.value > 2 && uv.value <= 5) {
        uvIndexValue.classList = "moderate";
    } else if(uv.value > 5 && uv.value < 8) { 
        uvIndexValue.classList = "high";
    } else if(uv.value > 8) { 
        uvIndexValue.classList = "very-high";
    }
    // console.log(uv.value);

    uvIndexEl.appendChild(uvIndexValue);

    // append uv index to weather container just like temp, humidity, etc.
    weatherContainerEl.appendChild(uvIndexEl);
};

// function to fetch 5-day forecast
var getFiveDay = function(city){
    var apiKey = "4487576f5b4f3e349130b486a36f052e"
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
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
        for(i = 5; i < forecast.length; i = i + 8) {
            var weatherForecast = forecast[i];
            // console.log(weatherForecast);

        // create a card for each day
        var forecastEl = document.createElement("div");
        forecastEl.classList = "card bg-info text-light m-4";

        
        // date
        var forecastDate = document.createElement("h5");
        forecastDate.classList = "card-header text-left";
        forecastDate.textContent = moment.unix(weatherForecast.dt).format("l"); 
        // append date
        forecastEl.appendChild(forecastDate); 
        
        // weather condition icon
        var weatherIcon = document.createElement("img");
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weatherForecast.weather[0].icon}.png`);
        // append icon
        forecastEl.appendChild(weatherIcon);
        
        // temp
        var forecastTemp = document.createElement("span");
        forecastTemp.classList = "card-body text-left";
        forecastTemp.innerHTML = "Temp: " + (Math.round(weatherForecast.main.temp * 10) / 10) + " &#176F";
        // append temp
        forecastEl.appendChild(forecastTemp);

        // humidity
        var forecastHum = document.createElement("span");
        forecastHum.classList = "card-body text-left";
        forecastHum.innerHTML = "Humidity: " + weatherForecast.main.humidity + " %";
        // append humidity
        forecastEl.appendChild(forecastHum);

        // console.log(forecastEl);
        // append all of forecast date, icon, temp and humidity to the forecast five day container
        forecastContainerEl.appendChild(forecastEl);
        
    }
};






// save city name in localStorage and add pastSeach function to add city names to searched list
// var pastSeach = function(pastSeach) {
//     console.log(pastSearch);
   
// }

cityFormEl.addEventListener("submit", formSumbitButton);
// need to create event listener for pastSearch buttons


