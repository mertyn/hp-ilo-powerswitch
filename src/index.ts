import "dotenv/config"
import express from "express"
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

server.listen(port, () => {
    return console.log(`Webserver is listening at http://localhost:${port}`);
})
