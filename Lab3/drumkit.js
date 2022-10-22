const START_RECORDING_KEY = ' '
let RECORDING_TIME_START = 0
let RECORDING_START = false
document.addEventListener('keypress', onKeyPress)

const recorder_circle = document.querySelector('#circle')
const list_track = document.querySelector('#list_track')
const info = document.querySelector('#info')
const playAll = document.querySelector('#PlayAll')
let list_tracks = document.querySelectorAll('.play')

let tracker_index = 1;
let Track = []
let Music = []

const Sound = {
    boom: 'boom',
    clap: 'clap',
    kick: 'kick',
    tom: 'tom'
};

playAll.addEventListener('click',()=>{
    for (let index = 0; index < tracker_index-1; index++) {
        replay_track(index)
        
    }
})

document.addEventListener('click', function (e) {
    if (e.target.tagName === "BUTTON") {
        replay_track(e.target.parentNode.id - 1)
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
           
            if(tracker_index>4){
                info.innerHTML = "Osiągnieto max ilości tracków"
                return
            }
            Music.push(Track)
            CreateHtml()

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

function CreateHtml(){
    recorder_circle.style.cssText += 'background-color:green';
    var track_div = document.createElement("div")
    var button_start = document.createElement("button")
    var content = document.createElement("div")
    content.setAttribute("class", "content")
    button_start.setAttribute("class", "play")
    track_div.setAttribute("class", "track")
    track_div.setAttribute("id", `${tracker_index}`)
    track_div.appendChild(content)
    track_div.appendChild(button_start)
    content.innerHTML = `Nagranie numer ${tracker_index}`
    list_track.appendChild(track_div)
    tracker_index++
}