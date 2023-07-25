var userInputEl = document.getElementById("userInput");
var city = "";
var fetchBtnEl =document.getElementById("fetchButton");
var responseEl = document.getElementById("theWeather"); 
var tempEl = document.getElementById("temp"); 
var cloudsEl = document.getElementById("clouds"); 
var windEl = document.getElementById("wind"); 
var precipEl = document.getElementById("precip"); 
var TOPSECRETAPIKEY; // will need to update code before push, saved into secret key with github/ 





function getApi() {  
  city = userInputEl.value;
  var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
  fetch(requestUrl)
  .then(function (response ){
    return response.json();
  })
  .then(function (data){ 
    responseEl.textContent = "theWeather: " + data.weather[0].description;
      tempEl.textContent = "temp: " + data.main.temp + "°F";
      cloudsEl.textContent = "clouds: " + data.clouds.all + "%";
      windEl.textContent = "wind: " + data.wind.speed + " mph";
      precipEl.textContent = "precip: " + (data.rain ? data.rain["1h"] + " mm" : "0 mm");
        { 
    }
       
    console.log(data);  
  });
  
}


fetchBtnEl.addEventListener("click", getApi);

  