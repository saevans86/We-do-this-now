var userInputEl = document.getElementById("userInput");
var city = "";
var fetchBtnEl =document.getElementById("fetchButton");
var responseEl = document.getElementById("theWeather"); 
var tempEl = document.getElementById("temp"); 
var cloudsEl = document.getElementById("clouds"); 
var windEl = document.getElementById("wind"); 
var precipEl = document.getElementById("precip"); 
var dateEl = document.getElementById("currentDay");
var APIKey = "768100cba919239c11d5c616900c6ca5";
var nextDay = document.getElementById("followingDay");
var theWeatherT =document.getElementById("theWeatherT");
var tempT =document.getElementById("tempT");
var cloudsT = document.getElementById("cloudsT");
var windT = document.getElementById("windT");
var precipT = document.getElementById("precipT")




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
    currentDayIcon.innerHTML = " " + data.list[0].weather[0].icon;
    tempEl.textContent = "Temperature: " + data.list[0].main.temp + "°F";
    cloudsEl.textContent = "Clouds: " + data.list[0].clouds.all + "%";
    windEl.textContent = "Wind: " + data.list[0].wind.speed + " mph";
    dateEl.textContent = "Today's date: " + new Date(data.list[0].dt * 1000).toLocaleDateString();
    currentDayIcon.src = weatherIconUrl;
  
    for (let i=1; i <= 4; i++) {
      var forecastIndex  = i * 8;
      let forecastDate = new Date(data.list[forecastIndex].dt * 1000).toLocaleDateString();
      var forecastEl =document.createElement("div");
      forecastEl.textContent = "Forecast for:  " + forecastDate + ": ";
      forecastEl.textContent  += "Weather: " + data.list[forecastIndex].weather[0].description;
      forecastEl.textContent += "Temperature: " + data.list[forecastIndex].main.temp + "°F";
      forecastEl.textContent += "Clouds: " +data.list[forecastIndex].clouds.all + "%";
      forecastEl.textContent += " Wind: " + data.list[forecastIndex].wind.speed + " mph";
      nextDay.append(forecastEl);
    }
    
    console.log(data);  
  });
  
  
}


fetchBtnEl.addEventListener("click", getApi);

  