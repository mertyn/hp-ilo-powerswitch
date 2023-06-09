import { io } from "socket.io-client"

var socket = io()

socket.on('connect', () => {
    console.log('connected')
})

console.log("Hello World!")