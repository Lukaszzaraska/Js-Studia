const InputTag = document.querySelector("#NewTag")
const TagList = document.querySelector("#TagList")


document.addEventListener('click', function (e) {
    if (e.target.className == 'RdyTag') {
      const id = e.target.id
      const child = document.querySelector(`#${id}`)
      TagList.removeChild(child)
    }
})