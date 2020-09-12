// pseudocode
// global variables (city form, city, current weather, searched city, forecast, five-day-forecast, past search)
var cities = [];
var cityFormEl = document.querySelector("#city-search-form");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl=document.querySelector("#current-weather-container");
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
        get5Day(city);
        cities.unshift({city});
        cityInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
    saveSearch();
    pastSearch(city);
}

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
    //clear old content
    weatherContainerEl.textContent= "";  
    citySearchInputEl.textContent=searchCity;

    console.log(weather);

cityFormEl.addEventListener("submit", formSumbitHandler);

// search button shows weather for city type in 

// show city name
// date
// weather icon 
// temp
// humidity
// wind speed
// uv index -- need second API call

// full forecast for city searched and append to the page (id = currentCity)
// 5 day forecast for city searched and append to the page (id = fiveDayForecast)

}
