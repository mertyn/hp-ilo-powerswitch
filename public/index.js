function $(selector) { return document.querySelector(selector) }

var socket = io()
socket.on("data", (data) => {
    console.log(data)
})