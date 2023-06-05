function $(selector) { return document.querySelector(selector) }

const button = $("#switch")
var power = false

var socket = io()
socket.on("state", (data) => {
    button.innerText = data.power ? "On" : "Off"
    power = data.power
})

button.addEventListener("click", () => {
    socket.emit("state", { power: !power })
})