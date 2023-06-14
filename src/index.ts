import "dotenv/config"
import express from "express"
import https from "https"
import http from "http"
import { Server } from "socket.io"


const port = process.env.WEBPORT || 5000;
const app = express()
const server = http.createServer(app)
const io = new Server(server)


app.use(express.static("public"))

io.on("connection", (socket) => {
    console.log("client connected")

    socket.on("disconnect", () => {
        console.log("client disconnected")
    })
})

// server.listen(port, () => {
//     return console.log(`Webserver is listening at http://localhost:${port}`);
// })


const iloIP = process.env.HOST;
const username = process.env.USER;
const password = process.env.PASS;

const options = {
    hostname: iloIP,
    path: "/redfish/v1/Systems/1/",
    method: "GET",
    auth: `${username}:${password}`,
    rejectUnauthorized: false
}

const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on("data", (data) => {
        console.log(data.toString())
    })

}).setTimeout(100000).on("error", (error) => {
    console.error('Error:', error)
})

req.end()