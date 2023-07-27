var userInputEl = document.getElementById("userInput");
var fetchBtnEl =document.getElementById("fetchButton");
var responseEl = document.getElementById("theWeather"); 
var tempEl = document.getElementById("temp"); 
var cloudEl = document.getElementById("clouds"); 
var windEl = document.getElementById("wind"); 
var precipEl = document.getElementById("precip"); 
var dateEl = document.getElementById("currentDay");

var nextDay = document.getElementById("followingDay");
var nextDay1 = document.getElementById("followingDay1");
var nextDay2 = document.getElementById("followingDay2");
var nextDay3 = document.getElementById("followingDay3");



function getApi() {  
  city = userInputEl.value;
  var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
  fetch(requestUrl)
  .then(function (response ){
    return response.json();
  }) 
  .then(function (data){    
    var iconCode = data.list[0].weather[0].icon;
    var weatherIconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    var currentDayIcon = document.getElementById("iconRef");
    responseEl.textContent = "Weather: " + data.list[0].weather[0].description;
    currentDayIcon.textContent = " " + data.list[0].weather[0].icon;
    tempEl.textContent = "Temperature: " + data.list[0].main.temp + "°F";
    cloudEl.textContent = "Clouds: " + data.list[0].clouds.all + "%";
    windEl.textContent = "Wind: " + data.list[0].wind.speed + " mph"; 
    precipEl.textContent = "Chance of rain: " + (data.list[0].rain ? data.list[0].rain.description["1h"] + " mm" : "0 mm");
    dateEl.textContent = "Today's date: " + new Date(data.list[0].dt * 1000).toLocaleDateString();
    currentDayIcon.src = weatherIconUrl;
  
    for (let i=1; i <= 4; i++) {
      var forecastIndex  = i * 8;
      let forecastDate = new Date(data.list[forecastIndex].dt * 1000).toLocaleDateString();
      var iconCode = data.list[0].weather[0].icon;
      var nextDaysIcon = document.createElement("img");
      nextDaysIcon.src ="http://openweathermap.org/img/w/" + data.list[forecastIndex].weather[0].icon + ".png";
      var forecastEl =document.createElement("div");
      forecastEl.textContent = "Forecast for:  " + forecastDate + ": ";
      forecastEl.textContent  += "Weather:  " + data.list[forecastIndex].weather[0].description;
      forecastEl.textContent += "Temperature:  " + data.list[forecastIndex].main.temp + "°F";
      forecastEl.textContent += "Clouds:  " +data.list[forecastIndex].clouds.all + "%";
      forecastEl.textContent += " Wind:  " + data.list[forecastIndex].wind.speed + " mph";
      forecastEl.textContent += "Chance of rain: " + (data.list[forecastIndex].rain ? data.list[forecastIndex].rain["1h"] + " mm" : "0 mm");
      

      forecastEl.appendChild(nextDaysIcon);
      if (i === 1) {
        nextDay.appendChild(forecastEl);
      } else if (i === 2) {
        nextDay1.appendChild(forecastEl);
      } else if (i === 3) {
        nextDay2.appendChild(forecastEl);
      } else if (i === 4) {
        nextDay3.appendChild(forecastEl);
      }
    }
  
  

  
    console.log(data);  
  });


fetchBtnEl.addEventListener("click", getApi);
}