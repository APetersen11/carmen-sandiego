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

var fiveDayCard = document.querySelector(".five-day-cards");

// Dynamically Create Elements
//1. Create the element
let card = document.createElement("div");
let cardH4 = document.createElement("h4");
// 2. give element content
cardH4.textContent = "8.19.22";

// Optional - add any attributes
card.setAttribute("class", "card");

// 3. Append to the page
card.append(cardH4);
fiveDayCard.append(card);
