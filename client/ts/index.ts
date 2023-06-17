fetch(`http://${location.host}/api/state`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })

fetch(`http://${location.host}/api/action`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ action: "On" })
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })