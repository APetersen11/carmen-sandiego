// prefill location input with value from local storage
// fetch weather using stored value

// on button click
//   1. get value of button
//     1a. save search results to local storage
//   2. use city name to get our lat/long
//   3. use lat/long to get weather
//   4. clear existing weather results
//   5. render weather results

let currentCity = null;
let searchField = document.querySelector("#search-input");
getWeather();

function getWeather() {
  let searchValue = searchField.value;
  //save search to local storage
  let history = localStorage.getItem("Cities") || [];
  localStorage.setItem("Cities", history);
  console.log(history);

  fetch(
    // use city name to get lat/long
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      searchValue
    )}&appid=8a42d43f7d7dc180da5b1e51890e67dc`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      currentCity = data.name;
      console.log(currentCity);
      return fetch(
        // use lat/long to get weather
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=8a42d43f7d7dc180da5b1e51890e67dc`
      );
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      document.querySelector("#one-day").innerHTML = "";
      document.querySelector(".five-day-cards").innerHTML = "";
      for (let i = 0; i < data.daily.length; i++) {
        createCards(data.daily[i], i);
      }
    });
}

function kToF(kelvin) {
  return Math.round((kelvin - 273.15) * 1.8 + 32);
}

function createCards(dayData, index) {
  if (index === 0) {
    // create elements
    let card = document.createElement("div");
    let cardCity = document.createElement("h2");
    let cardDate = document.createElement("p");
    let cardImg = document.createElement("img");
    let cardTemp = document.createElement("p");
    let cardWind = document.createElement("p");
    let cardHumidity = document.createElement("p");
    let cardUv = document.createElement("p");
    let cardUvValue = document.createElement("span");

    //assign content
    cardCity.textContent = currentCity;
    let currentDate = new Date(dayData.dt * 1000).toLocaleString();

    cardDate.textContent = currentDate.split(",")[0];

    cardImg.src = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;

    cardTemp.textContent = "Temp: " + kToF(dayData.temp.day) + "°F";

    cardWind.textContent = "Wind: " + dayData.wind_speed + " MPH";

    cardHumidity.textContent = "Humidity: " + dayData.humidity + "%";

    cardUv.textContent = "UV Index: ";

    cardUvValue.textContent = dayData.uvi;
    cardUvValue.style.padding = "6px";
    if (dayData.uvi < 3) {
      cardUvValue.style.backgroundColor = "green";
    } else if (dayData.uvi < 6) {
      cardUvValue.style.backgroundColor = "yellow";
    } else {
      cardUvValue.style.backgroundColor = "red";
    }

    //append elements
    card.append(cardCity);
    card.append(cardDate);
    card.append(cardImg);
    card.append(cardTemp);
    card.append(cardWind);
    card.append(cardHumidity);
    cardUv.append(cardUvValue);
    card.append(cardUv);

    document.querySelector("#one-day").append(card);
  } else if (index < 6) {
    // create elements
    let card = document.createElement("div");
    card.classList = "card";
    let cardDate = document.createElement("p");
    let cardImg = document.createElement("img");
    let cardTemp = document.createElement("p");
    let cardWind = document.createElement("p");
    let cardHumidity = document.createElement("p");

    //assign content
    let currentDate = new Date(dayData.dt * 1000).toLocaleString();

    cardDate.textContent = currentDate.split(",")[0];

    cardImg.src = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;

    cardTemp.textContent = "Temp: " + kToF(dayData.temp.day) + "°F";

    cardWind.textContent = "Wind: " + dayData.wind_speed + " MPH";

    cardHumidity.textContent = "Humidity: " + dayData.humidity + "%";

    //append elements
    card.append(cardDate);
    card.append(cardImg);
    card.append(cardTemp);
    card.append(cardWind);
    card.append(cardHumidity);

    document.querySelector(".five-day-cards").append(card);
  }
  console.log(dayData);
}
