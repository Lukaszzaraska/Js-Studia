// Podczasz odwtarzania w pętli mozliwośc włączenia jeszcze raz odtwarzania . Może wyłączyc przycisk disable jak nie to if xd

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
const letterFirst = document.querySelector('#letterFirst')
const letterLast = document.querySelector('#letterLast')
const tiles = document.querySelectorAll('.key')

let metronomBool = true
let Loop = false
let Metronom_switch = 0
let activeTrack = 0
let activeTrackID = null
let checkbox_list = document.querySelectorAll('.checkbox')
let checked_track = []
let tracker_index = 1
let longestTimeTrack = 0
let Track = []
let Music = []
var Metronom;
var intervaRef
const Sound = {
    boom: 'boom',
    clap: 'clap',
    kick: 'kick',
    tom: 'tom',
    Metronom: 'tink'
};

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    KeyChoise(e.keyCode.toString())
  

}
function TrackTime(Music) {
    let tempTime = 0
    Music.forEach((track) => {
        tempTime = track[track.length - 1][0] - track[0][0]
        if (tempTime > longestTimeTrack) {
            longestTimeTrack = tempTime
        }

    })
    console.log(longestTimeTrack)
}

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
    Metronom = setInterval(() => (PlayMetronom(Sound.Metronom), AnimationMetronom()), 1000)
}
function AnimationMetronom() {
    if (metronomBool) {
        letterFirst.setAttribute("class", "white")
        letterLast.removeAttribute("class", "white")
        metronomBool = !metronomBool
    } else {
        letterLast.setAttribute("class", "white")
        letterFirst.removeAttribute("class", "white")
        metronomBool = !metronomBool
    }
}
function StopMetronom() {
    clearInterval(Metronom)
}

function PlayMetronom(type) {
    const audioTag = document.querySelector('#' + type)
    audioTag.currentTime = 0
    audioTag.play()
}
PlayChecked.addEventListener('click', () => {

    checked_track.forEach((x) => {
        replay_track(x - 1)
    })
})

playAll.addEventListener('click', () => {

    if (Loop) {
        //  const loop = document.querySelector('#loop')
        // console.log(loop.checked)
        SatrtInterv()
    } else {
        StartAllMusic()
    }

})
function SatrtInterv() {
    intervaRef = setInterval(() => StartAllMusic(), longestTimeTrack + 300)
}
function StopInterv() {
    clearInterval(intervaRef)
}
function StartAllMusic() {
    for (let index = 0; index < Music.length; index++) {
        replay_track(index)
    }
}

document.addEventListener('click', function (e) {
    const TrackChecked = document.querySelectorAll('.content')
    if (TrackChecked.length != 0 && e.path[0].className == "content") {

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
    }

    if (e.target.tagName === "BUTTON") {

        if ((e.target.id).substring(0, 3) === "del") {

            let index_del = Music.indexOf(e.target.parentNode.id)
            let index_del_checked_track = checked_track.indexOf(e.target.parentNode.id)
            const obj = document.getElementById(`${e.target.parentNode.id}`)
            Music.splice(index_del, 1)
            checked_track.splice(index_del_checked_track, 1)
            tracker_index--
            info.innerHTML = ""
            obj.remove()
        } else if ((e.target.id).substring(0, 3) === "add") {
            replay_track(e.target.parentNode.id - 1)
        }

    }

    if (e.target.tagName === "INPUT") {
        if (e.target.id === "loop") {
            Loop = !Loop
            StopInterv()
        } else {
            if (checked_track.includes(e.target.parentNode.id)) {
                let index_del = checked_track.indexOf(e.target.parentNode.id)
                checked_track.splice(index_del, 1)
                console.log(checked_track)
            } else if (!checked_track.includes(e.target.parentNode.id)) {
                checked_track.push(e.target.parentNode.id)
            }
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
                recorder_circle.style.cssText += 'background-color:green';
                info.innerHTML = "Max track count reached"
                return
            }
            if (Track.length == 0) {
                return
            }
            if (activeTrackID != null) {

                Music[activeTrackID - 1] = Track
                TrackTime(Music)
                const obj = document.getElementById(`${activeTrackID}`)
                recorder_circle.style.cssText += 'background-color:green';
                obj.style.cssText += 'background-color:rgba(199, 102, 33, 0.644)'
                activeTrack = 0
                activeTrackID = null
            } else {
                Music.push(Track)
                TrackTime(Music)
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
document.addEventListener('keydown', record)

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
        // case "q":
        //     animationClick(key)
        //     playSound(Sound.boom, key)
        //     document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'q' }));
        //     break;
        case "38":
            animationClick("q"+key)
            playSound(Sound.boom, key)
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'q' }));
            break;
        // case "w":
        //     animationClick(key)
        //     playSound(Sound.clap, key)
        //     document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'w' }));
        //     break;
        case "39":
            animationClick("q"+key)
            playSound(Sound.clap, key)
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'q' }));
            break;
        // case "e":
        //     animationClick(key)
        //     playSound(Sound.kick, key)
        //     document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'e' }));
        //     break;
        case "40":
            animationClick("q"+key)
            playSound(Sound.kick, key)
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'q' }));
            break;
        // case "r":
        //     animationClick(key)
        //     playSound(Sound.tom, key)
        //     document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'r' }));
        //     break;
        case "37":
            animationClick("q"+key)
            playSound(Sound.tom, key)
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'q' }));
            break;

        default:
            break;
    }
}
function animationClick(key) {
    const tile = document.querySelector(`#${key}`)
    tile.style.background = '#35a7ff'
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
document.addEventListener('keydown', () => {
    setTimeout(() => {
        tiles.forEach((tile) => {
            tile.style.background = 'rgb(241, 206, 230)'
        })
    }, 40)
})
function CreateHtml() {
    recorder_circle.style.cssText += 'background-color:green';
    var track_div = document.createElement("div")
    var button_start = document.createElement("button")
    var content = document.createElement("div")
    var checkbox = document.createElement("input")
    var dellButton = document.createElement("button")
    dellButton.setAttribute("class", "dellbutton")
    dellButton.setAttribute("id", `del-${tracker_index}`)
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("class", "checkbox")
    content.setAttribute("class", "content")
    button_start.setAttribute("class", "play")
    button_start.setAttribute("id", `add-${tracker_index}`)
    button_start.innerHTML = "Play"
    dellButton.innerHTML = "Delete"
    track_div.setAttribute("class", "track")
    track_div.setAttribute("id", `${tracker_index}`)

    track_div.appendChild(checkbox)
    track_div.appendChild(content)
    track_div.appendChild(button_start)
    track_div.appendChild(dellButton)
    content.innerHTML = `Track number ${tracker_index}`
    list_track.appendChild(track_div)
    tracker_index++
}