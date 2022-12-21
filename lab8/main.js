import {  } from "./Animation.js"
const SearchInput = document.querySelector("#search")
const CityName = document.querySelector('#cityName')
const UpdateLocation = document.querySelector("#UpdateLocation")
SearchInput.addEventListener("keyup", Serach)
let actualCity = CityName.value
window.onload = () => {
  let localization = localStorage.getItem("Localization")
  if(localization==undefined){
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    CityName.innerHTML = localization
  }
  CityName.innerHTML = localization
}

const successCallback = async (position) => {
  const response = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/locations/${position.coords.latitude}+${position.coords.longitude}/nearbyCities?limit=1&offset=0&radius=100`);
  const data = await response.json();
  localStorage.setItem("Localization", data.data[0].city)
  actualCity = data.data[0].city
  CityName.innerHTML =  actualCity
};

const errorCallback = (error) => {
  console.log(error);
};
UpdateLocation.addEventListener("click",()=>{
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
})


let cities = [];
let Timer;
function Serach() {

  if (this.value != "") {
    Timer = setTimeout(() => getWeatherByLetter(this.value), 300)
  } else {
    cities = []
  }

}

const getWeatherByLetter = async (letter) => {

  let DataList = document.querySelector("#hint")
  let newOptionElement = document.createElement("option");
  DataList.innerHTML = "";


  const response = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10&offset=0&namePrefix=${letter}`);
  const data = await response.json();
  cities = []

  data.data.forEach(element => {
    cities.push(element.name)
    newOptionElement = document.createElement("option");
    newOptionElement.textContent = element.name;
    DataList.appendChild(newOptionElement)
  });
  DataList = document.querySelector("#hint")
  let options = DataList.options;
  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    if (option.value == letter) {
      localStorage.setItem("Localization", JSON.stringify(data.data[0].city))
      actualCity=data.data[0].city
      CityName.innerHTML=actualCity
    }
  }
}
