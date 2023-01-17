
import { WFromPosition, CFromPosition, CityToPosition, CityToLetter, HoursWeather, GetWeatherRaw } from "./Api.js"
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


SearchInput.addEventListener("keyup", Serach)
SearchManyCity.addEventListener("keyup", SerachOther)

class Card {
  constructor(TimeUpdate, Localization, Position, Icon, Temperature, Feels_like, ChartData, Main, Id, List) {
    this.TimeUpdate = TimeUpdate
    this.Localization = Localization
    this.Position = Position
    this.Icon = Icon
    this.Temperature = Temperature
    this.Feels_like = Feels_like
    this.ChartData = ChartData
    this.Main = Main
    this.Id = Id
    this.List = List
  }
}

let switcher = true;
let Position;
let cities = [];
let citiesOther = [];
let LastUpdateTime;
let actualCity = "";
let Timer;
let TimerOther;
let CardsArray = [];
let MainExist = false


window.addEventListener('beforeunload', function () {

  let ArrayNoList = []
  CardsArray.forEach(card => {
    if (card.List == true) {
      ArrayNoList.push(card)
    }
  })

  localStorage.setItem("CardsArray", JSON.stringify(ArrayNoList))

});

window.onload = () => {

  CardsArray = JSON.parse(localStorage.getItem("CardsArray"))
  console.log(CardsArray)

  if (CardsArray.length != 0) {

    CardsArray.forEach(card => {
      if (card.Main == true) {
        MainExist = true
        let date = new Date(card.TimeUpdate)
        LastUpdate.innerHTML = `Zaktualizowano o ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        WeatherIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${card.Icon}@2x.png)`;
        temperature.innerHTML = `${card.Temperature} &#8451;`
        CityName.innerHTML = `<span>${card.Localization}</span>`
        locationMain.innerHTML = `<span>${card.Localization}</span>`
        FeelsLocation.innerHTML = `Odczucie ${card.Feels_like} &#8451;`
        DrawChart(HoursWeather(card.Position))
        NextDayWeather(HoursWeather(card.Position))
        //tutaj robimy główny widok tego miasta
      } else {
        ReBuildOtherCityList()
        //tutaj dodajemy liste innych miast
      }
    })
    if (!MainExist) {
      // CardsArray.forEach(card => {
      //   card.Main = false
      // })
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
  } else {
    CardsArray = [];
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    //Tutaj czytamy dane z przeglądarki
  }

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

const GetWeather = async (card) => {

  const data = await WFromPosition(card.Position)
  card.Temperature = kelvinToCelsius(data.main.temp)
  card.Feels_like = kelvinToCelsius(data.main.feels_like)

  card.Icon = data.weather[0].icon
  temperature.innerHTML = `${card.Temperature} &#8451;`
  locationMain.innerHTML = `<span>${card.Localization}</span>`
  CityName.innerHTML = `<span>${card.Localization}</span>`
  LastUpdate.innerHTML = `Zaktualizowano o ${card.TimeUpdate.getHours()}:${card.TimeUpdate.getMinutes()}:${card.TimeUpdate.getSeconds()}`
  WeatherIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${card.Icon}@2x.png)`;
  FeelsLocation.innerHTML = `Odczucie ${card.Feels_like} &#8451;`
  if (!CardsArray.includes(card.Localization)) {
    CardsArray.push(card)
  }
  // DrawChart(HoursWeather(card.Position))
  await NextDayWeather(HoursWeather(card.Position))
}

const successCallback = async (position) => {

  let LastUpdateTime = new Date();
  let positionCard = { latitude: (position.coords.latitude), longitude: (position.coords.longitude) };
  const data = await CFromPosition(positionCard)
  let card = new Card(LastUpdateTime, data.data[0].city, positionCard, undefined, undefined, undefined, undefined, true, CardsArray.length, false)

  await GetWeather(card)
  await DrawChart(HoursWeather(card.Position))
};


const getWeatherByLetter = async (letter) => {
  clearTimeout(Timer)
  let DataList = document.querySelector("#hint")
  let newOptionElement = document.createElement("option");
  DataList.innerHTML = "";

  const data = await CityToLetter(letter)
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
      clearTimeout(Timer)

      SearchInput.value = ""
      let city = await CityToPosition(option.value)

      const { latitude, longitude } = city.data[0]
      CardsArray.forEach((card) => {
        card.Main = false
      })

      LastUpdateTime = new Date();

      LastUpdate.innerHTML = `Zaktualizowano o ${LastUpdateTime.getHours()}:${LastUpdateTime.getMinutes()}:${LastUpdateTime.getSeconds()}`
      CityName.innerHTML = city.data[0].city //ActualCard.Localization
      let card = new Card(LastUpdateTime, data.data[0].city, { latitude, longitude }, undefined, undefined, undefined, undefined, true, CardsArray.length, false)
      // if (!CardsArray.includes(card.Localization)) {
      //   CardsArray.push(card)
      // }
      //await CreateNewCity()
      /////////////////////////////////////////////////////////////

      await GetWeather(card)
      await DrawChart(HoursWeather(card.Position))

    }
  }
}
const getLocationByLetter = async (letter) => {
  clearTimeout(TimerOther)
  let DataList = document.querySelector("#hintOther")
  let newOptionElement = document.createElement("option");
  DataList.innerHTML = "";

  const data = await CityToLetter(letter)
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
      let card = new Card(LastUpdateTime, data.data[0].city, positionCard, undefined, undefined, undefined, undefined, false, CardsArray.length, true)

      if (!CardsArray.includes(card.Localization)) {
        CardsArray.push(card)
      }
      await CreateNewCity()

    }
  }
}

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
UpdateLocation.addEventListener("click", async () => {
  CardsArray = [];
  //  ActualCard ="" //testowe
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  await ReBuildOtherCityList()
})


const CreateNewCity = async () => {
  NewLocation.innerHTML = ""

  CardsArray.forEach(async card => {
    if (card.List == true) {
      let data = await GetWeatherRaw(card.Position);
      let Icon = data[1];
      let temperatureOther = data[0];
      card.Icon = Icon
      card.Temperature = temperatureOther
      card.Feels_like = data[2]
      let NewCard = document.createElement("div")

      NewCard.setAttribute("data-id", card.Id)

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
    }
  })
}

const ReBuildOtherCityList = async () => {
  NewLocation.innerHTML = ""
  CardsArray.forEach(async card => {
    if (card.List == true) {
      let NewCard = document.createElement("div")
      NewCard.setAttribute("data-id", card.Id)
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
      IconOther.style.backgroundImage = `url(http://openweathermap.org/img/wn/${card.Icon}@2x.png)`;
      TempOther.innerHTML = `${card.Temperature} &#8451;`
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
    }

  })
}
document.addEventListener("click", async (event) => {

  try {
    if (event.target.className == "deleteBtn material-symbols-outlined") {
      const obj = document.querySelector(`[data-id='${event.target.parentNode.parentNode.getAttribute('data-id')}']`);
      let index = event.target.parentNode.parentNode.getAttribute('data-id')
      let Data = CardsArray.find(card=>card.Id==index)
      NewLocation.removeChild(obj)
      CardsArray.splice(CardsArray.indexOf(Data), 1)
    }
    else if (event.target.className == "NewCard" || event.target.parentNode.parentNode.className == "NewCard") {
      let index = event.target.parentNode.parentNode.getAttribute('data-id') == undefined ? event.target.getAttribute('data-id') : event.target.parentNode.parentNode.getAttribute('data-id')
      
      let Data = CardsArray.find(card=>card.Id==index)
     // let Data = CardsArray[index]
      console.log(Data)
     // if (Data.Main == false) {

        CardsArray.forEach((card) => {
          card.Main = false
        })
        CardsArray[index].Main = true
        let localization = Data.Localization;
        LastUpdateTime = new Date(CardsArray[index].TimeUpdate)
        Position = Data.Position
        LastUpdate.innerHTML = `Zaktualizowano o ${LastUpdateTime.getHours()}:${LastUpdateTime.getMinutes()}:${LastUpdateTime.getSeconds()}`
        WeatherIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${Data.Icon}@2x.png)`;
        DrawChart(HoursWeather(Data.Position))
        NextDayWeather(HoursWeather(Position))
        temperature.innerHTML = `${Data.Temperature} &#8451;`
        actualCity = localization
        CityName.innerHTML = `<span>${actualCity}</span>`
        locationMain.innerHTML = `<span>${actualCity}</span>`
        FeelsLocation.innerHTML = `Odczucie ${Data.Feels_like} &#8451;`
        await ReBuildOtherCityList()
   //   }

    }
  } catch (error) {
    console.log(error)
  }

})



// document.addEventListener("click",()=>{
//   Cards=[]
//   localStorage.setItem("Cards", JSON.stringify(Cards))
// })
