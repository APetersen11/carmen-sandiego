var currentCity = null;

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=8a42d43f7d7dc180da5b1e51890e67dc"
)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    currentCity = data.name;
    console.log(currentCity);
    return fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=8a42d43f7d7dc180da5b1e51890e67dc`
    );
  })
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    for (let i = 0; i < data.daily.length; i++) {
      createCards(data.daily[i], i);
    }
  });

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

// Dynamically create one day card
//do I need to do this? Can I just use the 5 day cards? wait for Lawren

// Dynamically Create Elements
//1. Create the element
//let card = document.createElement("div");
//let cardH4 = document.createElement("h4");
// 2. give element content
//cardH4.textContent = "8.19.22";

// Optional - add any attributes
//card.setAttribute("class", "card");

// 3. Append to the page
//card.append(cardH4);
//fiveDayCard.append(card);
