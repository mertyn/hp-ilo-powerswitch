const updateInterval = 1000


import { io } from "socket.io-client"


var $ = (selector: string) => document.querySelector(selector)
var $$ = (selector: string) => document.querySelectorAll(selector)

var hostName = $("#host--name") as HTMLSpanElement
var hostModel = $("#host--model") as HTMLSpanElement
var powerState = $("#power--state") as HTMLSpanElement
var error = $("#error") as HTMLSpanElement


function updateStatus() {
    fetch(`${location.protocol}//${location.host}/api/state`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("error getting state", data.error)
                error.innerText = `Error:\n${JSON.stringify(data.error)}`
            }
            else
                error.innerText = ""

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
    new Notification("Server is ready!", { body: `${hostName.innerText} has finished boot`, icon: "data:image/png;base64,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" });
})