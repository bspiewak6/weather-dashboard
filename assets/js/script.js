// pseudocode
// global variables
var cities = [];
var cityFormEl = document.querySelector("#city");
var pastSearchButtonEl = document.querySelector("#past-search-buttons")



// create function to fetch weather api
// use the full url to call the API and add inputValue
// check the response from the API
// console log response 


var getCityWeather = function(city){
    var apiKey = "4487576f5b4f3e349130b486a36f052e"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};


cityFormEl.addEventListener("submit", formSumbitHandler);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);

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

  
