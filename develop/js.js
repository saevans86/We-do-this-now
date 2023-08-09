var userInputEl = document.getElementById("userInput");
var city = "";
var fetchBtnEl =document.getElementById("fetchButton");
var responseEl = document.getElementById("theWeather"); 
var tempEl = document.getElementById("temp"); 
var cloudsEl = document.getElementById("clouds"); 
var windEl = document.getElementById("wind"); 
var precipEl = document.getElementById("precip"); 
var dateEl = document.getElementById("currentDayDate");
var APIKey = "aa2557dc424b95a1c273da16128a3bad";
var nextDay = document.getElementById("followingDay");
var nextDay1 = document.getElementById("followingDay");
var nextDay2 = document.getElementById("followingDay");
var nextDay3 = document.getElementById("followingDay");
var savedWeather;
var storedButton = document.getElementById("prevSearches");



function getApi() {  
  city = userInputEl.value;
  var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
  fetch(requestUrl)
  .then(function (response ){
    return response.json();
  }) 
  .then(function (data){    
    var iconCode = data.list[0].weather[0].icon;
    var weatherIconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
    var currentDayIcon = document.getElementById("iconRef");
    responseEl.textContent = "Weather: " + data.list[0].weather[0].description;
    currentDayIcon.textContent = " " + data.list[0].weather[0].icon;
    tempEl.textContent = "Temperature: " + data.list[0].main.temp + "°F     ";
    cloudsEl.textContent = "Clouds: " + data.list[0].clouds.all + "%    ";
    windEl.textContent = "Wind Speeds up to: " + data.list[0].wind.speed + " mph     ";
    
  
    // precipEl.textContent = "Chance of rain: " + data.list[0].pop + "%" ;
    dateEl.textContent = "Weather for Today's date: " + new Date(data.list[0].dt * 1000).toLocaleDateString();
    currentDayIcon.src = weatherIconUrl;
    
    var currentDayWeatherData = {
      responseEl: data.list[0].weather[0].description,
      currentDayIcon: data.list[0].weather[0].icon,
      tempEl: data.list[0].main.temp,
      cloudsEl: data.list[0].clouds.all,
      windEl: data.list[0].wind.speed,   
      dateEl: new Date(data.list[0].dt * 1000).toLocaleDateString(),
    };
  
    localStorage.setItem(userInputEl.value, JSON.stringify(currentDayWeatherData));
  
  
    for (let i=1; i <= 4; i++) {
      var forecastIndex  = i * 8;
      var forecastDate = new Date(data.list[forecastIndex].dt * 1000).toLocaleDateString();
      var iconCode = data.list[0].weather[0].icon;


      var nextDaysIcon = document.createElement("img");
      nextDaysIcon.src ="http://openweathermap.org/img/w/" + data.list[forecastIndex].weather[0].icon + ".png";
      var forecastEl = document.createElement("div");
      var forecastDesc = document.createElement("div");
      var forecastElDate = document.createElement("div");
      var forecastElTem = document.createElement("div");
      var forecastElClouds = document.createElement("div");
      var forecastElWind = document.createElement("div");
      var forecastElRain = document.createElement("div");
      // forecastElDate.classList.add("box1")
      forecastDesc.textContent  += "Weather: " + data.list[forecastIndex].weather[0].description;
      forecastElDate.textContent = "Forecast for  :  " + forecastDate;
      forecastElTem.textContent = "Temperature: " + data.list[forecastIndex].main.temp + "°F";
      forecastElClouds.textContent = "Clouds: " + data.list[forecastIndex].clouds.all + "% ";
      forecastElWind.textContent = "Wind Speeds up to: " + data.list[forecastIndex].wind.speed + "mph";
      // forecastElRain.textContent = "Chance of rain: " + (data.list[forecastIndex].rain ? data.list[forecastIndex].rain["1h"] + " mm" : "0 mm ");


      
      forecastEl.append(nextDaysIcon);
      if (i === 1) {
        nextDay.append(forecastElDate,forecastDesc,forecastElTem,forecastElClouds,forecastElWind,forecastElRain,nextDaysIcon);
      } else if (i === 2) {
        nextDay1.append(forecastElDate,forecastDesc,forecastElTem,forecastElClouds,forecastElWind,forecastElRain,nextDaysIcon);
      } else if (i === 3) {
        nextDay2.append(forecastElDate,forecastDesc,forecastElTem,forecastElClouds,forecastElWind,forecastElRain,nextDaysIcon);
      } else if (i === 4) {
        nextDay3.append(forecastElDate,forecastDesc,forecastElTem,forecastElClouds,forecastElWind,forecastElRain,nextDaysIcon);
      }
      
    }
    
  
    console.log(data);  
  });
  

}
fetchBtnEl.addEventListener("click", getApi);
displayStoredWeather();


var storedCity = document.getElementById("storedDity")
var storedWeather = document.getElementsByClassName("storedWeather")

storedButton.addEventListener("click", displayStoredWeather)
  function displayStoredWeather() {  
  var storedWeatherData = localStorage.getItem("storedWeatherData");
  if (storedWeatherData) {
    var currentDayData = JSON.parse(storedWeatherData);
    document.getElementById("storage").textContent = ", Date: " + currentDayData.date +
    "Weather: " + currentDayData.description + ", Temperature: " + currentDayData.temperature + "°F, Clouds: "
     + currentDayData.clouds + "%, Wind: " + currentDayData.wind + " mph";

   
  } else {
    return
  }
}





  