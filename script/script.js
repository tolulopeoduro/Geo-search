const searchInput = document.getElementById("search-box")
const submitbutton=document.getElementById("search-button");
const temperatureDisplay = document.getElementById("temperature")
const celsiusButton = document.getElementsByClassName("celsius")[0];
const fahrenheitButton = document.getElementsByClassName("fahrenheit")[0]
const map = document.getElementById("map");
let temperature;

function makeRequest(verb, url, data) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(verb, url);
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          if (request.status === 200 || request.status === 201) {
            resolve(JSON.parse(request.response));
          } else {
            reject(JSON.parse(request.response));
          }
        }
      };
      if (verb === 'POST') {
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(data));
      } else {
        request.send();
      }
    });
  }

async function getTemperature(){
    const temperaturePromise = makeRequest("GET" ,"https://api.openweathermap.org/data/2.5/weather?q=Lagos&APPID=6ac97c1171313045147d80a613cc0f50&units=metric" ).then(Response => Response)
    const temperatureResponse = await temperaturePromise;
    console.log(temperatureResponse)
    temperature = temperatureResponse.main.temp
    temperatureDisplay.innerHTML = "<span>"+temperature+"<sup>&#8451;</sup></span>"
}

const setToFahrenheit =()=>{
    temperature *=1.8;
    temperature +=32;
    temperatureDisplay.innerHTML = "<span>"+temperature+"<sup>&#x2109;</sup></span>"
}
