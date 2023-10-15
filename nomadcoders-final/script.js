//background color change
// const colors = ["#304F6D", "#899481", "#453232"];

// const body = document.querySelector("body");
// const changeColor = document.querySelector("#changeColor");

// function onClickHandler(){
//   const bgColor = colors[Math.floor(Math.random() * colors.length)];
//   body.style.background = bgColor;

const images = ["1.jpg", "2.jpg", "3.jpg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`

document.body.appendChild(bgImage);

// clock section
const time = document.querySelector("#time");
const currentDate = document.querySelector("#currentDate");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
const day1 = today.getDay();

let day2 = "";

switch(day1) {
  case 0: 
    day2 = "SUN";
    break;
  case 1: 
    day2 = "MON";
    break;
  case 2: 
    day2 = "TUE";
    break;
  case 3: 
    day2 = "WED";
    break;
  case 4: 
    day2 = "THU";
    break;
  case 5: 
    day2 = "FRI";
    break;
  case 6: 
    day2 = "SAT";
    break;
}

currentDate.innerText = `${year}.${month}.${date} ${day2}`


function getTime(){
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  let period = "AM";
  if (hours == 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
    period = "PM";
  }

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");
  
  time.innerText = `${hours}:${minutes}:${seconds} ${period}`;
}

getTime()
setInterval(getTime, 1000);


// greeting section
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

function paintGreetings(username) {
  greeting.innerText = `Hello ${username}! Have a Good Day🥰`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null) {
  //show the form
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  //show the greetings
  paintGreetings(savedUsername);
}



//weather section
const API_KEY = "ecd7810df18d74cc958bc197b7d90012";

function onGeoOk(position){
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const weather = document.querySelector(".weatherInfo span:first-child");
    const city = document.querySelector(".weatherInfo span:last-child");
    weather.innerText = `${data.weather[0].main} / ${data.main.temp}°C /`;
    city.innerText = `${data.name}`;
  });
}
function onGeoError() {
  alert("Cant't find you. No weather for you")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)



//quote section
const quoteURL = "https://dummyjson.com/quotes";

fetch(quoteURL)
.then(response => response.json())
.then(data => {
  const quotes = document.querySelector("#quotes");
  const random = Math.floor(Math.random()*30);
  quotes.querySelector(".quote").innerText = data.quotes[random].quote;
  quotes.querySelector(".author").innerText = `- ${data.quotes[random].author}`
});


//todo list
const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
   const li = document.createElement("li");
   li.id = newTodo.id;
   const span = document.createElement("span");
   span.innerText = newTodo.text;
   const button = document.createElement("button");
   button.innerText = "❌";
   button.addEventListener("click", deleteToDo);
   li.appendChild(span);
   li.appendChild(button);
   toDoList.appendChild(li);
   if ( li.length > 5) {
    return 0;
   }
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now()
  }
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
} 

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos) {
  const parsedToDos = JSON.parse(savedToDos); 
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
