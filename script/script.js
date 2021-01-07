const searchInput = document.getElementById("search-box");
const submitbutton = document.getElementById("search-button");
const temperatureDisplay = document.getElementById("temperature");
const weatherDisplay = document.getElementById("weather");
const celsiusButton = document.getElementsByClassName("celsius")[0];
const fahrenheitButton = document.getElementsByClassName("fahrenheit")[0];
const map = document.getElementById("map");
let temperature;
let weather;
const loadingText = document.getElementById("loading");
const form = document.getElementById("form");
loadingText.style.display = "none";

async function getWeather(cityName) {
  const weatherPromise = fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&APPID=6ac97c1171313045147d80a613cc0f50&units=metric"
  ).then((Response) => {
    if (Response.status === 200) {
      return Response.json();
    } else {
      map.style.display = "none";
      loadingText.textContent = "City not found";
      loadingText.style.display = "inline";
    }
  });
  const weatherResponse = await weatherPromise;
  console.log(weatherResponse);
  temperature = weatherResponse.main.temp;
  weather = weatherResponse.weather[0].description;
  temperatureDisplay.innerHTML =
    "<span>" + temperature.toFixed(0) + "<sup>&#8451;</sup></span>";
  weatherDisplay.textContent = weather;
  celsiusButton.disabled = true;
}

/*async function getMap(cityName) {
  map.style.display = "none";
  loadingText.textContent = "Map is Loading";
  loadingText.style.display = "inherit";
  const mapPromise = fetch(
    "https://www.mapquestapi.com/staticmap/v5/map?key=HF9cGYphwRAwc5OxQAGH0FeGkJ3JtN4o&center=" +
      cityName +
      "&size=" +
      mapDetails.width +
      "," +
      mapDetails.height +
      "&scalebar=true"
  ).then((Response) => Response.blob());
  const mapResponse = await mapPromise;
  let imgUrl = URL.createObjectURL(mapResponse);
  loadingText.style.display = "none";
  map.src = imgUrl;
  map.style.display = "block";
  if (loadingText.innerText === "City not found") {
    map.style.display = "none";
  }
}*/


function getMap(cityName){
  map.style.display = "none";
  loadingText.textContent = "Map is Loading";
  loadingText.style.display = "block";
  let request = new XMLHttpRequest();
  request.open("GET" , "https://www.mapquestapi.com/staticmap/v5/map?locations=Lagos&size="+mapDetails.width+","+mapDetails.height+"@2x&key=HF9cGYphwRAwc5OxQAGH0FeGkJ3JtN4o&banner")
  request.onreadystatechange=()=>{
    if(request.readyState=== 4) {
      if (request.status === 200 || request.status === 201) {
        map.src = "https://www.mapquestapi.com/staticmap/v5/map?locations="+cityName+"&size=600,400@2x&key=HF9cGYphwRAwc5OxQAGH0FeGkJ3JtN4o&banner"
      } else {
        console.log("error")
      }
    }
  }
  request.send()
  map.style.display = "block" ; loadingText.style.display = "none"
  if (loadingText.innerText === "City not found") {
    map.style.display = "none";
  }
}

const setToFahrenheit = () => {
  temperature *= 1.8;
  temperature += 32;
  temperatureDisplay.innerHTML =
    "<span>" + temperature.toFixed(0) + "<sup>&#x2109;</sup></span>";
  fahrenheitButton.disabled = true;
  celsiusButton.disabled = false;
};

const setToCelsius = () => {
  temperature -= 32;
  temperature /= 1.8;
  temperatureDisplay.innerHTML =
    "<span>" + temperature.toFixed(0) + "<sup>&#8451;</sup></span>";
  celsiusButton.disabled = true;
  fahrenheitButton.disabled = false;
};

const mapDetails = map.getBoundingClientRect();
console.log(mapDetails);

const getResults = () => {
  getWeather(searchInput.value);

  getMap(searchInput.value);
};

form.onsubmit = (e) => {
  e.preventDefault();
  searchInput.value ? getResults() : null;
};

celsiusButton.addEventListener("click", () => {
  setToCelsius();
});
fahrenheitButton.addEventListener("click", () => {
  setToFahrenheit();
});
