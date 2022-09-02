// Local Storage


// TO SAVE
localStorage.setItem('key', 'value')

// TO RETRIEVE
let info = localStorage.getItem('key')

// ONLY ACCEPTS STRINGS

let data = ['hello', 'hi', 'hey']

localStorage.setItem('data', JSON.stringify(data));

JSON.parse(localStorage.getItem('data'))