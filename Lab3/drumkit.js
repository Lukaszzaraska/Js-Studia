const START_RECORDING_KEY = ' '
let RECORDING_TIME_START = 0
let RECORDING_START = false
document.addEventListener('keypress', onKeyPress)

const recorder_circle = document.querySelector('#circle')
const list_track = document.querySelector('#list_track')
const info = document.querySelector('#info')
const playAll = document.querySelector('#PlayAll')
const PlayChecked = document.querySelector('#PlayChecked')
const MetronomHtml = document.querySelector('#metronom')

let Metronom_switch = 0
let activeTrack = 0
let activeTrackID = null
let checkbox_list = document.querySelectorAll('.checkbox')
let checked_track = []
let tracker_index = 1;
let Track = []
let Music = []
var Metronom;
const Sound = {
    boom: 'boom',
    clap: 'clap',
    kick: 'kick',
    tom: 'tom',
    Metronom: 'tink'
};




MetronomHtml.addEventListener('click', () => {

    if (Metronom_switch) {
        Metronom_switch = 0
        StopMetronom()
    } else {
        StartMetronom()
        Metronom_switch = 1
    }
})
function StartMetronom() {
    Metronom = setInterval(() => PlayMetronom(Sound.Metronom), 1000)
}
function StopMetronom() {
    clearInterval(Metronom)
}

function PlayMetronom(type) {
    const audioTag = document.querySelector('#' + type)
    audioTag.currentTime = 0
    audioTag.
    audioTag.play()
}
PlayChecked.addEventListener('click', () => {
    checked_track.forEach((x) => {
        replay_track(x - 1)
    })
})

playAll.addEventListener('click', () => {
    for (let index = 0; index < tracker_index - 1; index++) {
        replay_track(index)
    }
})

document.addEventListener('click', function (e) {
    const TrackChecked = document.querySelectorAll('.content')
    if (TrackChecked.length != 0 && e.path[0].className == "content") {

        //   console.log(e.target.parentNode.id)

        const obj = document.getElementById(`${e.target.parentNode.id}`)

        if (activeTrack === 0) {
            obj.style.cssText += 'background-color:blue'
            activeTrack = 1
            activeTrackID = e.target.parentNode.id
        } else {
            activeTrack = 0
            activeTrackID = null
            obj.style.cssText += 'background-color:rgba(199, 102, 33, 0.644)'
        }
        // console.log(activeTrackID)
    }




    if (e.target.tagName === "BUTTON") {
        replay_track(e.target.parentNode.id - 1)
    }

    if (e.target.tagName === "INPUT") {

        if (checked_track.includes(e.target.parentNode.id)) {
            let index_del = checked_track.indexOf(e.target.parentNode.id)
            checked_track.splice(index_del, 1)

        } else {
            checked_track.push(e.target.parentNode.id)
        }
    }
})

function replay_track(id_track) {

    let timer_start = Music[id_track][0][0]
    let time = 0
    let array = Music[id_track]

    for (let index = 0; index < array.length; index++) {
        time = array[index][0] - timer_start

        setTimeout(() => KeyChoise(array[index][1]), time)
    }

}

const record = (event) => {
    if (event.key === START_RECORDING_KEY) {

        if (RECORDING_START === true) {
            RECORDING_START = false

            if (tracker_index > 4) {
                info.innerHTML = "Osiągnieto max ilości tracków"
                return
            }
            if(Track.length ==0){
                return
            }
            if (activeTrackID != null) {

                Music[activeTrackID - 1] = Track
                const obj = document.getElementById(`${activeTrackID}`)
                recorder_circle.style.cssText += 'background-color:green';
                obj.style.cssText += 'background-color:rgba(199, 102, 33, 0.644)'
                activeTrack = 0
                activeTrackID = null
            } else {
                console.log(activeTrackID)
                Music.push(Track)
                CreateHtml()
            }



        } else {
            Track = []
            RECORDING_TIME_START = Date.now()
            RECORDING_START = true
            recorder_circle.style.cssText += 'background-color:red';
        }

    }
}
document.addEventListener('keypress', record)
function onKeyPress(event) {

    if (event.key === START_RECORDING_KEY) {
        return
    } else {
        const key = event.key
        KeyChoise(key)
    }


}

function KeyChoise(key) {
    switch (key) {
        case "q":
            playSound(Sound.boom, key)
            break;
        case "w":
            playSound(Sound.clap, key)
            break;
        case "e":
            playSound(Sound.kick, key)
            break;
        case "r":
            playSound(Sound.tom, key)
            break;

        default:
            break;
    }
}

function playSound(sound, key) {
    const audioTag = document.querySelector('#' + sound)
    audioTag.currentTime = 0
    audioTag.play()
    if (RECORDING_START === true) {
        let Signature_time = Date.now()
        Track.push([Signature_time, key])
    }
}

function CreateHtml() {
    recorder_circle.style.cssText += 'background-color:green';
    var track_div = document.createElement("div")
    var button_start = document.createElement("button")
    var content = document.createElement("div")
    var checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("class", "checkbox")
    content.setAttribute("class", "content")
    button_start.setAttribute("class", "play")
    button_start.innerHTML = "Play"
    track_div.setAttribute("class", "track")
    track_div.setAttribute("id", `${tracker_index}`)
    track_div.appendChild(checkbox)
    track_div.appendChild(content)
    track_div.appendChild(button_start)
    content.innerHTML = `Nagranie numer ${tracker_index}`
    list_track.appendChild(track_div)
    tracker_index++
}