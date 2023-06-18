var $ = (selector: string) => document.querySelector(selector)

var powerSwitch = $("#power--switch") as HTMLButtonElement
var forceRestart = $("#force--restart") as HTMLButtonElement
var forceOff = $("#force--off") as HTMLButtonElement

var powerOn: boolean


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
}


// get current status of machine
fetch(`http://${location.host}/api/state`)
    .then(response => response.json())
    .then(updatePowerSwitch)


// turn on/off machine
powerSwitch.addEventListener("click", () => {

    if (powerOn)
        confirm("Are you sure you want to turn off the machine?") ? sendAction("PushPowerButton", updatePowerSwitch) : null
    else
        sendAction("On", updatePowerSwitch)

})