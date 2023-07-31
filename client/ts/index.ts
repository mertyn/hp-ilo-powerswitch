const updateInterval = 1000


import { io } from "socket.io-client"


var $ = (selector: string) => document.querySelector(selector)
var $$ = (selector: string) => document.querySelectorAll(selector)

var hostName = $("#host--name") as HTMLSpanElement
var hostModel = $("#host--model") as HTMLSpanElement
var powerState = $("#power--state") as HTMLSpanElement


function notification(text: string) {
    var noti = $("#notification") as HTMLDivElement
    noti.innerText = text
}

function error(text: string) {
    var err = $("#error") as HTMLDivElement
    err.innerText = text
}


function updateStatus() {
    fetch(`${location.protocol}//${location.host}/api/state`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("error getting state", data.error)
                error(`Error:\n${JSON.stringify(data.error)}`)
            }
            else
                error("")

            hostName.innerText = data.name || "Unknown"
            hostModel.innerText = data.model || "Unknown"

            powerState.innerText = `Server is ${data.powerState}`
            if (data.powerState === "On")
                powerState.classList.add("power--on");
            else
                powerState.classList.remove("power--on");
            
            setTimeout(updateStatus, updateInterval)
        })
        .catch(error => {
            console.error("error getting state", error)
            powerState.innerText = "Error"
            setTimeout(updateStatus, updateInterval)
        })
}

updateStatus()

function sendAction(action: string, errorCallback?: Function, callback?: Function) {
    console.log("sending action", action)

    fetch(`${location.protocol}//${location.host}/api/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: action })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("error sending action", data.error)
                errorCallback ? errorCallback(data.error) : null
            }
            else
                callback ? callback(data) : null
        })
}


$$(".power--action").forEach((button: any) => {
    button = button as HTMLButtonElement

    button.addEventListener("click", () => {
        if (confirm(`Are you sure you want to send ${button.innerText}?`)){
            console.log("sending action", button.dataset.action)
            sendAction(button.dataset.action, (error: string) => window.alert(`Error sending action: \n ${JSON.stringify(error)}`))
        }
    })
})


Notification.requestPermission().then(function (result) {
    console.log("notification permission", result)
})

const socket = io()
socket.on("ready", () => {
    var date = new Date()
    notification(`Server is ready! - ${date.getHours()}:${date.getMinutes()}`)

    new Notification("Server is ready!", { body: `${hostName.innerText} has finished boot`, icon: "https://commons.wikimedia.org/wiki/File:Check-Logo.png" });
})