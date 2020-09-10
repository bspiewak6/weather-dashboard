// pseudocode
// global variables
var cities = document.querySelector(".list")
// user enters city into search input  (input id = searchText)
// user clicks search button, add .onclick function to store city (button id = searchBtn)
$(".btn").on('click', function(event) {
    console.log(event);

// get the value of the city or input from user
    var target = event.currentTarget.previousElementSibling.id;
    var userInput = $("#" + target).val().trim();
    // save the city to localStorage 
    localStorage.setItem(target, JSON.stringify(userInput));

    // clear input box
    $("#searchTerm").val(""); 
});

// function to append to previously search locations (ul created in HTML)


// use the full url to call the API
// check the response from the API
// console log responses

// get the full forecast for city searched and append to the page (id = currentCity)
// get the 5 day forecast for city searched and append to the page (id = fiveDayForecast)
