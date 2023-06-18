const updateTimeoutOn = 2000
const updateTimeoutOff = 10000


var $ = (selector: string) => document.querySelector(selector)

var powerSwitch = $("#power--switch") as HTMLButtonElement
var forceRestart = $("#force--restart") as HTMLButtonElement
var forceOff = $("#force--off") as HTMLButtonElement

var powerOn: boolean
var powerButtonEnabled = false


function getStatus(callback: Function) {
    fetch(`http://${location.host}/api/state`)
        .then(response => response.json())
        .then(data => callback(data) )
}

function sendAction(action: string, callback?: Function) {
    console.log("sending action", action)

    fetch(`http://${location.host}/api/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: action })
    })
        .then(response => response.json())
        .then(data => callback ? callback(data) : null)
}

function updatePowerSwitch(data: any) {
    console.log("received data", data)
    powerOn = data.powerOn
    powerSwitch.innerText = powerOn ? "Turn Off" : "Turn On"
    powerButtonEnabled = true
}



// get initial status
getStatus((data: any) => {
    powerButtonEnabled = true
    updatePowerSwitch(data)
})

function updateStatusDelayed(delay: number = 1000) {
    setTimeout(() => getStatus(updatePowerSwitch), delay)
}

// turn on/off machine
powerSwitch.addEventListener("click", () => {
    if (!powerButtonEnabled) return
    powerButtonEnabled = false
    console.log("button press permitted")

    getStatus((data: any) => {
        updatePowerSwitch(data)

        if (data.powerOn) {
            if (confirm("Are you sure you want to turn off the machine?")) {
                sendAction("PushPowerButton")
                updateStatusDelayed(updateTimeoutOff)
            }
        }
        else {
            sendAction("On")
            powerSwitch.innerText = "Turning On..."
            updateStatusDelayed(updateTimeoutOn)
        }

    })

})