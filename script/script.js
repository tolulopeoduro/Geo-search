const searchInput = document.getElementById("search-box")
const submitbutton=document.getElementById("search-button");
const temperatureDisplay = document.getElementById("temperature")
const weatherDisplay = document.getElementById("weather")
const celsiusButton = document.getElementsByClassName("celsius")[0];
const fahrenheitButton = document.getElementsByClassName("fahrenheit")[0]
const map = document.getElementById("map");
let temperature;
let weather;


async function getWeather(){
    const weatherPromise = fetch("https://api.openweathermap.org/data/2.5/weather?q=Lagos&APPID=6ac97c1171313045147d80a613cc0f50&units=metric" ).then(Response => Response.json())
    const weatherResponse = await weatherPromise;
    console.log(weatherResponse)
    temperature = weatherResponse.main.temp
    weather = weatherResponse.weather[0].description;
    temperatureDisplay.innerHTML = "<span>"+temperature.toFixed(0)+"<sup>&#8451;</sup></span>"
    weatherDisplay.textContent = weather
    celsiusButton.disabled = true;
}

async function getMap(){
    const mapPromise = fetch("https://www.mapquestapi.com/staticmap/v5/map?key=HF9cGYphwRAwc5OxQAGH0FeGkJ3JtN4o&center=New+York,NY&size=@2x").then(Response=>Response.blob())
    const mapResponse = await mapPromise;
    let imgUrl = URL.createObjectURL(mapResponse)
    map.src = imgUrl;
}

const setToFahrenheit =()=>{
    temperature *=1.8;
    temperature +=32;
    temperatureDisplay.innerHTML = "<span>"+temperature.toFixed(0)+"<sup>&#x2109;</sup></span>"
    fahrenheitButton.disabled = true;
    celsiusButton.disabled = false;

}

const setToCelsius=()=>{
    temperature -=32;
    temperature /=1.8;
    temperatureDisplay.innerHTML = "<span>"+temperature.toFixed(0)+"<sup>&#8451;</sup></span>"
    celsiusButton.disabled = true;
    fahrenheitButton.disabled = false;
}




celsiusButton.addEventListener('click' , ()=>{
    setToCelsius()
})
fahrenheitButton.addEventListener('click' , ()=>{
    setToFahrenheit()
})