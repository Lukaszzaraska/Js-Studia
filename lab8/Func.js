const chartTime = document.querySelector("#chartTime")
const ChartIcon = document.querySelector("#chartIcon")
const chartTempe = document.querySelector("#chartTempe")

export const DrawChart = async (data) => {

    let ArrayList = (await data).list
   // console.log(ArrayList)
    let ArrayTemp = []
    let ArrayIcon = []
    let ArrayTime = []
    for (let index = 0; index < 5; index++) {
        ArrayTime.push((new Date(ArrayList[index].dt_txt).toLocaleTimeString().slice(0, -3)))
        ArrayTemp.push(kelvinToCelsius(ArrayList[index].main.temp))
        ArrayIcon.push(ArrayList[index].weather[0].icon)
    }


    Chart.defaults.scale.gridLines.display = false;
    chartTempe.innerHTML = ""
    chartTime.innerHTML = ""
    ChartIcon.innerHTML = ""
    for (let index = 0; index < ArrayTime.length; index++) {
        let time = document.createElement("div")
        let chartIcon = document.createElement("div")
        let temperature = document.createElement("div")
        time.setAttribute("class", "TimeTile")
        chartIcon.setAttribute("class", "IconTile")
        temperature.setAttribute("class", "TemperatureTile")
        chartIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${ArrayIcon[index]}@2x.png)`;
        time.innerHTML = ArrayTime[index]
        temperature.innerHTML = `${ArrayTemp[index]} &#8451;`
        ChartIcon.appendChild(chartIcon)
        chartTime.appendChild(time)
        chartTempe.appendChild(temperature)
    }


    new Chart('myChart', {
        type: "line",
        data: {
            labels: ArrayTime,
            datasets: [{
                label: ArrayTemp,
                data: ArrayTemp,
                borderColor: "white",
                fill: false,
                backgroundColor: 'white',
                borderWidth: 2
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: {
                        display: false,
                        beginAtZero: false
                    },
                    display: false
                }]
            },
            layout: {
                padding: {
                    top: 6,
                    bottom: 20
                }
            },
        }
    });


};

export function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}