const APIkey = "a079da55488e330cc48423d6e3589700";

export const WFromPosition = async (Position) => {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Position.latitude}&lon=${Position.longitude}&appid=${APIkey}`);
    const data = await response.json();
    return data
}

export const CFromPosition = async (Position) => {

    const response = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/locations/${Position.latitude}+${Position.longitude}/nearbyCities?limit=1&offset=0&radius=100`);
    const data = await response.json();
    return data
}
export const CityToPosition = async (name) => {

    const response = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&offset=0&namePrefix=${name}`);
    const data = await response.json();
    return data
}
export const CityToLetter = async (letter) => {
    const response = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10&offset=0&namePrefix=${letter}`);
    const data = await response.json();
    return data
}
export const HoursWeather = async (positionHW) => {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${positionHW.latitude}&lon=${positionHW.longitude}&appid=${APIkey}`)
        .then(data => data.json());
    return response
};

export const GetWeatherRaw = async (Pos) => {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Pos.latitude}&lon=${Pos.longitude}&appid=${APIkey}`);
    const data = await response.json();
    let weatherOther = [(kelvinToCelsius(data.main.temp)), data.weather[0].icon, (kelvinToCelsius(data.main.feels_like))]
    return weatherOther

}
function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}