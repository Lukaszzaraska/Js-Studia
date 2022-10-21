

const START_RECORDING_KEY = ' '
let RECORDING_TIME_START = 0
let RECORDING_START = false
document.addEventListener('keypress', onKeyPress)

const recorder_circle = document.querySelector('#circle')
const list_track = document.querySelector('#list_track')
let list_tracks = document.querySelectorAll('.play')

let tracker_index = 1;
let Track = []
const Music = []

const Sound = {
    boom: 'boom',
    clap: 'clap',
    kick: 'kick',
    tom: 'tom'
};



document.addEventListener('click', function (e) {
    if (e.target.tagName === "BUTTON") {
        console.log(e.target.parentNode.id)
        replay_track(e.target.parentNode.id)
    }
})

function replay_track(id_track) {
    // console.log(Music)
    // Music.forEach(x=>{
    //     console.log(x)
    // })
}
const record=(event)=> {
    if (event.key === START_RECORDING_KEY) {

        if (RECORDING_START === true) {
            RECORDING_START = false
            recorder_circle.style.cssText += 'background-color:green';
            console.log(Music)
            Music.unshift(Track)
            console.log(Music)
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

        } else {
            Track.splice(0, Track.length)
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
        let Signature_time = 0
        const key = event.key

        switch (key) {
            case "q":
                playSound(Sound.boom)
                break;
            case "w":
                playSound(Sound.clap)
                break;
            case "e":
                playSound(Sound.kick)
                break;
            case "r":
                playSound(Sound.tom)
                break;

            default:
                break;
        }
        if (RECORDING_START === true) {
            Signature_time = Date.now()
            Track.push(Signature_time)
            Track.push(key)

        }
    }


}

function playSound(sound) {
    const audioTag = document.querySelector('#' + sound)
    audioTag.currentTime = 0
    audioTag.play()

}
