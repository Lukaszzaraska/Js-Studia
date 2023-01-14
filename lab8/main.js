
import { } from "./Animation.js"
import { DrawChart, kelvinToCelsius } from "./Func.js"
const SearchInput = document.querySelector("#search")
const CityName = document.querySelector('#cityName')
const temperature = document.querySelector("#temperature")
const WeatherIcon = document.querySelector("#right")
const LastUpdate = document.querySelector("#LastUpdate")
const locationMain = document.querySelector("#locationMain")
const UpdateLocation = document.querySelector("#UpdateLocation")
const SearchManyCity = document.querySelector("#SearchManyCity")
const FeelsLocation = document.querySelector("#feelsMain")
let BtnsDelete = document.querySelectorAll(".deleteBtn")
const NextWeather = document.querySelector("#NextWeather")
const AddLocation = document.querySelector("#AddLocation")
const NewLocation = document.querySelector("#NewLocation")
const APIkey = "a079da55488e330cc48423d6e3589700";

SearchInput.addEventListener("keyup", Serach)
SearchManyCity.addEventListener("keyup", SerachOther)

let switcher = true;
let Position;
let cities = [];
let citiesOther = [];
let LastUpdateTime;
let actualCity = CityName.value;
let Timer;
let TimerOther;
let Cards = [];
let Indexer = 0;
window.onload = () => {

  let array = JSON.parse(localStorage.getItem("Cards"))
  array.forEach(x => {
    Cards.push(x)
  })

  CreateNewCity(Cards)
  let localization = JSON.parse(localStorage.getItem("Localization"));
  LastUpdateTime = new Date(JSON.parse(localStorage.getItem("UpdateTime")))
  Position = JSON.parse(localStorage.getItem("Position"))
  LastUpdate.innerHTML = `Zaktualizowano o ${LastUpdateTime.getHours()}:${LastUpdateTime.getMinutes()}:${LastUpdateTime.getSeconds()}`
  if (localization == undefined) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  let Chart = JSON.parse(localStorage.getItem("Chart"));
  let MainIcon = JSON.parse(localStorage.getItem("MainIcon"))
  WeatherIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${MainIcon}@2x.png)`;
  DrawChart(Chart)
  NextDayWeather(HoursWeather(Position))
  temperature.innerHTML = `${Math.round((kelvinToCelsius(JSON.parse(localStorage.getItem("Temperature")))))} &#8451;`
  actualCity = localization
  CityName.innerHTML = `<span>${actualCity}</span>`
  locationMain.innerHTML = `<span>${actualCity}</span>`
  FeelsLocation.innerHTML = `Odczucie ${JSON.parse(localStorage.getItem("FeelsTemp"))} &#8451;`
}


const ListLocation = (event) => {
  if (event.target.id == "AddLocation" || event.target.id == "") {
    if (switcher) {
      SearchManyCity.style.display = 'flex';
    } else {
      SearchManyCity.style.display = 'none';
    }
    switcher = !switcher
  }

}
AddLocation.addEventListener("click", ListLocation)

const GetWeather = async () => {

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Position.latitude}&lon=${Position.longitude}&appid=${APIkey}`);
  const data = await response.json();

  localStorage.setItem("Temperature", JSON.stringify(data.main.temp))
  localStorage.setItem("FeelsTemp", JSON.stringify(Math.round(kelvinToCelsius(data.main.feels_like))))
  temperature.innerHTML = `${Math.round((kelvinToCelsius(data.main.temp)))} &#8451;`
  locationMain.innerHTML = `<span>${actualCity}</span>`
  WeatherIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;
  localStorage.setItem("MainIcon", JSON.stringify(data.weather[0].icon))
  DrawChart(HoursWeather(Position))
  NextDayWeather(HoursWeather(Position))

}

const successCallback = async (position) => {
  Position = { latitude: (position.coords.latitude), longitude: (position.coords.longitude) };
  const response = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/locations/${position.coords.latitude}+${position.coords.longitude}/nearbyCities?limit=1&offset=0&radius=100`);
  const data = await response.json();
  LastUpdateTime = new Date();
  LastUpdate.innerHTML = `Zaktualizowano o ${LastUpdateTime.getHours()}:${LastUpdateTime.getMinutes()}:${LastUpdateTime.getSeconds()}`

  localStorage.setItem("UpdateTime", JSON.stringify(LastUpdateTime))
  let chartHTML = document.querySelector("#chartOptionsID")

  localStorage.setItem("Chart", chartHTML)
  localStorage.setItem("Localization", JSON.stringify(data.data[0].city))
  localStorage.setItem("Position", JSON.stringify({ latitude: (position.coords.latitude), longitude: (position.coords.longitude) }))
  actualCity = data.data[0].city
  CityName.innerHTML = actualCity
  locationMain.innerHTML = actualCity
  GetWeather()
};

async function CityToPosition(name) {

  const response = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&offset=0&namePrefix=${name}`);
  const data = await response.json();
  return data
}
const HoursWeather = async (position) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.latitude}&lon=${position.longitude}&appid=${APIkey}`);
  const data = await response.json();
  return data
};
const getWeatherByLetter = async (letter) => {
  clearTimeout(Timer)
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
      SearchManyCity.text.value = ""
      let city = await CityToPosition(option.value)
      const { latitude, longitude } = city.data[0]
      LastUpdateTime = new Date();
      LastUpdate.innerHTML = `Zaktualizowano o ${LastUpdateTime.getHours()}:${LastUpdateTime.getMinutes()}:${LastUpdateTime.getSeconds()}`
      localStorage.setItem("UpdateTime", JSON.stringify(LastUpdateTime))
      localStorage.setItem("Localization", JSON.stringify(data.data[0].city))
      Position = { latitude, longitude }
      localStorage.setItem("Position", JSON.stringify(Position))
      actualCity = data.data[0].city
      CityName.innerHTML = actualCity
      GetWeather()
    }
  }
}
const getLocationByLetter = async (letter) => {
  clearTimeout(TimerOther)
  let DataList = document.querySelector("#hintOther")
  let newOptionElement = document.createElement("option");
  DataList.innerHTML = "";


  const response = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10&offset=0&namePrefix=${letter}`);
  const data = await response.json();
  citiesOther = []

  data.data.forEach(element => {
    citiesOther.push(element.name)
    newOptionElement = document.createElement("option");
    newOptionElement.textContent = element.name;
    DataList.appendChild(newOptionElement)
  });
  DataList = document.querySelector("#hintOther")
  let options = DataList.options;
  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    if (option.value == letter) {
      SearchManyCity.value = ""
      let city = await CityToPosition(option.value)
      let LastUpdateTime = new Date();
      const { latitude, longitude } = city.data[0]
      let positionCard = { latitude, longitude }
      let Card = {
        TimeUpdate: LastUpdateTime,
        Localization: data.data[0].city,
        Position: positionCard
      }

      if (!Cards.includes(Card.Localization)) {
        Cards.push(Card)
      }

      await CreateNewCity()

    }
  }
  localStorage.setItem("Cards", JSON.stringify(Cards))
}
const GetWeatherRaw = async (Pos) => {

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Pos.latitude}&lon=${Pos.longitude}&appid=${APIkey}`);
  const data = await response.json();
  let weatherOther = [Math.round((kelvinToCelsius(data.main.temp))), data.weather[0].icon]
  return weatherOther

}
const NextDayWeather = async (data) => {

  NextWeather.innerHTML = ""
  let ArrayDay = []
  let ArrayNight = []
  let Data = (await data).list
  Data.forEach((x) => {
    let tempDate = new Date(x.dt_txt)
    if (tempDate.getHours() == 12) {
      ArrayDay.push(x)
    }
    if (tempDate.getHours() == 0) {
      ArrayNight.push(x)
    }
  })

  for (let index = 0; index < ArrayDay.length; index++) {

    let row = document.createElement("div")
    row.setAttribute("class", "row")

    let day = document.createElement("div")
    day.setAttribute("class", "day")
    day.innerHTML = (new Date(ArrayDay[index].dt_txt)).toLocaleString('pl-pl', { weekday: 'long' })

    let dayIcon = document.createElement("div")
    dayIcon.setAttribute("class", "dayIcon")
    dayIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${ArrayDay[index].weather[0].icon}@2x.png)`;

    let nightIcon = document.createElement("div")
    nightIcon.setAttribute("class", "nightIcon")
    nightIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${ArrayNight[index].weather[0].icon}@2x.png)`;

    let dayTemp = document.createElement("div")
    dayTemp.setAttribute("class", "dayTemp")
    dayTemp.innerHTML = `${Math.round(kelvinToCelsius(ArrayDay[index].main.temp))} &#176;`

    let nightTemp = document.createElement("div")
    nightTemp.setAttribute("class", "nightTemp")
    nightTemp.innerHTML = `${Math.round(kelvinToCelsius(ArrayNight[index].main.temp))} &#176;`

    let rightRow = document.createElement("div")
    rightRow.setAttribute("class", "rightRow")

    let leftRow = document.createElement("div")
    leftRow.setAttribute("class", "leftRow")


    leftRow.appendChild(day)
    rightRow.appendChild(dayIcon)
    rightRow.appendChild(nightIcon)
    rightRow.appendChild(dayTemp)
    rightRow.appendChild(nightTemp)
    row.appendChild(leftRow)
    row.appendChild(rightRow)
    NextWeather.appendChild(row)
  }
}


const errorCallback = (error) => {
  console.log(error);
};
UpdateLocation.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
})



function Serach() {

  if (this.value != "") {
    Timer = setTimeout(() => getWeatherByLetter(this.value), 300)
  } else {
    cities = []
    clearTimeout(Timer)
  }
}
function SerachOther() {

  if (this.value != "") {
    TimerOther = setTimeout(() => getLocationByLetter(this.value), 300)
  } else {
    citiesOther = []
    clearTimeout(TimerOther)
  }
}

const CreateNewCity = async () => {
  NewLocation.innerHTML = ""
  Indexer = 0

  Cards.forEach(async card => {
    let data = await GetWeatherRaw(card.Position);
    let Icon = data[1];
    let temperatureOther = data[0];

    let NewCard = document.createElement("div")

    NewCard.setAttribute("data-id", Indexer)
    Indexer += 1;

    let IconOther = document.createElement("div")
    let TempOther = document.createElement("div")
    let deleteBtn = document.createElement("div")
    let left = document.createElement("div")
    let right = document.createElement("div")
    left.setAttribute("class", "leftRow")
    right.setAttribute("class", "rightRow")
    NewCard.setAttribute("class", "NewCard")
    deleteBtn.setAttribute("class", "deleteBtn material-symbols-outlined")
    deleteBtn.innerHTML = "delete"

    IconOther.setAttribute("class", "IconOther")
    TempOther.setAttribute("class", "Tempother")
    IconOther.style.backgroundImage = `url(http://openweathermap.org/img/wn/${Icon}@2x.png)`;
    TempOther.innerHTML = `${temperatureOther} &#8451;`
    let NewCardCity = document.createElement("div")
    NewCardCity.innerHTML = card.Localization
    left.appendChild(NewCardCity)
    right.appendChild(IconOther)
    right.appendChild(TempOther)
    right.appendChild(deleteBtn)
    NewCard.appendChild(left)
    NewCard.appendChild(right)
    NewLocation.appendChild(NewCard)

    BtnsDelete = document.querySelectorAll(".deleteBtn")

  })
}

document.addEventListener("click", (event) => {

  if (event.target.className == "deleteBtn material-symbols-outlined") {
    const obj = document.querySelector(`[data-id='${event.target.parentNode.parentNode.getAttribute('data-id')}']`);
    let index = event.target.parentNode.parentNode.getAttribute('data-id')
    NewLocation.removeChild(obj)
    Cards.splice(index, 1)
    localStorage.setItem("Cards", JSON.stringify(Cards))
  }
})



// document.addEventListener("click",()=>{
//   Cards=[]
//   localStorage.setItem("Cards", JSON.stringify(Cards))
// })
