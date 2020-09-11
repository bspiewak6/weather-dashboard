// pseudocode
// global variables
var button = document.querySelector("#searchBtn");
var inputValue = document. querySelector("#searchText");
var responseContainerEl = document.querySelector("#form-control");

// need to add event listener for search button
// use the full url to call the API and add inputValue
// check the response from the API
// console log response data
button.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + 
    '&appid=4487576f5b4f3e349130b486a36f052e')
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data);
        })
        // catch any errors
        .catch(function(){
        });
    })


// clear input box after the user hits the search button


// get the full forecast for city searched and append to the page (id = currentCity)
// get the 5 day forecast for city searched and append to the page (id = fiveDayForecast)


// make a list of previously searched locations and append to the page (ul created in HTML)


// var nameValue = data['name'];
//             var timeValue = data['timezone'];
//             var tempValue = data['main']['temp'];
//             var humValue = data['main']['humidity'];
//             var windValue = data['wind']['speed'];
//             // uv index?

            // currentCity.innerHTML = nameValue;
            // currentCity.innerHTML = timeValue;
            // currentCity.innerHTML = tempValue;
            // currentCity.innerHTML = humValue;
            // currentCity.innerHTML = windValue;