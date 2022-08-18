fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=8a42d43f7d7dc180da5b1e51890e67dc"
)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data);
    return fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=8a42d43f7d7dc180da5b1e51890e67dc`
    );
  })
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data);
  });

// Dynamically create one day card
let oneDayCard = document.createElement("div");
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

var fiveDayCard = document.querySelector(".five-day-cards");

//Dynamically create 5 day cards
let card = document.createElement("div");
let cardDate = document.createElement("h4");
let cardTemp = document.createElement("p");
let cardWind = document.createElement("p");
let cardHumidity = document.createElement("p");

//REPLACE WITH API FILLED//
cardDate.textContent = "8.19.22";
//add image
cardTemp.textContent = "99";
cardWind.textContent = "15 mph";
cardHumidity.textContent = "20%";

card.setAttribute("class", "card");

card.append(cardDate);
card.append(cardTemp);
card.append(cardWind);
card.append(cardHumidity);
fiveDayCard.append(card);
