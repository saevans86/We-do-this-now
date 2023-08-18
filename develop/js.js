var userInputEl = document.getElementById('userInput');
var city = '';
var fetchBtnEl = document.getElementById('fetchButton');
var weatherDesc = document.getElementById('weatherDesc');
var tempEl = document.getElementById('temp');
var cloudsEl = document.getElementById('clouds');
var windEl = document.getElementById('wind');
var precipEl = document.getElementById('precip');
var dateEl = document.getElementById('currentDayDate');
var APIKey = 'aa2557dc424b95a1c273da16128a3bad';
var nextDay = document.getElementById('followingDay');
var nextDay1 = document.getElementById('followingDay1');
var nextDay2 = document.getElementById('followingDay2');
var nextDay3 = document.getElementById('followingDay3');
var savedWeather;
var storedButtonEl = document.getElementById('prevSearches');
var storageContainerDiv = document.getElementById('storage');
var noRecentSearchEl = document.getElementById('noRecentSearchEl');
var cityStorageEl = document.getElementById('storedCity');
var weatherStorageEl = document.querySelector('.list-group-item');
var currentDayIcon = document.getElementById('iconRef');
var weHide = document.getElementById("weHide")

function getApi() {
  city = userInputEl.value;
  var requestUrl =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    city +
    '&appid=' +
    APIKey +
    '&units=imperial';
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      nextDay.innerHTML = '';
      nextDay1.innerHTML = '';
      nextDay2.innerHTML = '';
      nextDay3.innerHTML = '';
      weHide.style.display = 'block';
      storageContainerDiv.style.display = 'block';
      dateEl.textContent =
        'Today\s weather: ' +
        new Date(data.list[0].dt * 1000).toLocaleDateString();
      var iconCode = data.list[0].weather[0].icon;
      var weatherIconUrl =
        'https://openweathermap.org/img/w/' + iconCode + '.png';
    
      // city = data.city.name;
      weatherDesc.textContent =
        'Weather: ' + data.list[0].weather[0].description;
      currentDayIcon.textContent = ' ' + data.list[0].weather[0].icon;
      tempEl.textContent = 'Temperature: ' + data.list[0].main.temp + '°F     ';
      cloudsEl.textContent = 'Clouds: ' + data.list[0].clouds.all + '%    ';
      windEl.textContent =
        'Wind Speeds up to: ' + data.list[0].wind.speed + ' mph     ';

        currentDayIcon.src = weatherIconUrl;

      const currentDayWeatherData = {
        description: data.list[0].weather[0].description,
        icon: data.list[0].weather[0].icon,
        temperature: data.list[0].main.temp,
        clouds: data.list[0].clouds.all,
        wind: data.list[0].wind.speed,
        city: data.city.name,
        date: new Date(data.list[0].dt * 1000).toLocaleDateString(),
      };

      localStorage.setItem(
        userInputEl.value,
        JSON.stringify(currentDayWeatherData)
      );

      for (let i = 1; i <= 4; i++) {
        var forecastIndex = i * 8;
        var forecastDate = new Date(
          data.list[forecastIndex].dt * 1000
        ).toLocaleDateString();
        var iconCode = data.list[0].weather[0].icon;

        var nextDaysIcon = document.createElement('img');
        nextDaysIcon.classList.add('weatherIconzz');
        nextDaysIcon.src =
          'http://openweathermap.org/img/w/' +
          data.list[forecastIndex].weather[0].icon +
          '.png';

        var forecastDesc = document.createElement('div');
        var forecastElDate = document.createElement('div');
        var forecastElTem = document.createElement('div');
        var forecastElClouds = document.createElement('div');
        var forecastElWind = document.createElement('div');

        forecastDesc.textContent +=
          'Weather: ' + data.list[forecastIndex].weather[0].description;
        forecastElDate.textContent = 'Forecast for  :  ' + forecastDate;
        forecastElTem.textContent =
          'Temperature: ' + data.list[forecastIndex].main.temp + '°F';
        forecastElClouds.textContent =
          'Clouds: ' + data.list[forecastIndex].clouds.all + '% ';
        forecastElWind.textContent =
          'Wind Speeds up to: ' + data.list[forecastIndex].wind.speed + 'mph';

        if (i === 1) {
          nextDay.append(
            forecastElDate,
            forecastDesc,
            forecastElTem,
            forecastElClouds,
            forecastElWind,
            nextDaysIcon
          );
        } else if (i === 2) {
          nextDay1.append(
            forecastElDate,
            forecastDesc,
            forecastElTem,
            forecastElClouds,
            forecastElWind,
            nextDaysIcon
          );
        } else if (i === 3) {
          nextDay2.append(
            forecastElDate,
            forecastDesc,
            forecastElTem,
            forecastElClouds,
            forecastElWind,
            nextDaysIcon
          );
        } else if (i === 4) {
          nextDay3.append(
            forecastElDate,
            forecastDesc,
            forecastElTem,
            forecastElClouds,
            forecastElWind,
            nextDaysIcon
          );
        }
      }

      console.log(data);
    });
}

fetchBtnEl.addEventListener('click', getApi);

function showStoredData() {
  cityStorageEl.textContent = '';
  weatherStorageEl.textContent = '';

  var noStoredData = true;
  for (var i = 0; i < localStorage.length; i++) {
    var storedCity = localStorage.key(i);
    var storedWeatherData = JSON.parse(localStorage.getItem(storedCity));
    if (storedWeatherData !== null) {
      noStoredData = false;
      var storedCityEl = document.createElement('div');
      storedCityEl.classList.add('cityEl');

      storedCityEl.textContent = 'Weather for: ' + storedCity + '\n';
      cityStorageEl.append(storedCityEl);

      var storedWeatherEl = document.createElement('div');
      storedWeatherEl.classList.add('weatherEl');

      storedWeatherEl.textContent =
        'Date: ' +
        storedWeatherData.date +
        ', Weather: ' +
        storedWeatherData.description +
        ', Temperature: ' +
        storedWeatherData.temperature +
        '°F, Clouds: ' +
        storedWeatherData.clouds +
        '%, Wind: ' +
        storedWeatherData.wind +
        ' mph';
      weatherStorageEl.append(storedWeatherEl);
    }
  }
  if (noStoredData) {
    var noRecentSearch = document.createElement('div');
    var noRecentSearchEl = document.getElementById('noRecentSearchEl');

    noRecentSearch.textContent = 'No Recent Searches';
    noRecentSearchEl.append(noRecentSearch);
  }
}

storedButtonEl.addEventListener('click', function () {
  showStoredData();
});
