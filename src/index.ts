import "dotenv/config"
import express from "express"
import http from "http"
import { Server } from "socket.io"
import { Client } from "ssh2"

const config = {
    host: process.env.HOST,
    port: process.env.PORT,
    username: process.env.USER,
    password: process.env.PASSWORD,
    algorithms: {
        kex: ["diffie-hellman-group14-sha1", "diffie-hellman-group1-sha1"],
        cipher: ["aes256-cbc", "aes128-cbc", "3des-cbc"]
    }
}

const conn = new Client();

// conn.on("ready", () => {
//     console.log('Client :: ready');
// })
// .on("end", () => {
//     console.log('Client :: end');  
// })
// .connect(config);


const port = process.env.WEBPORT || 5000;
const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static("public"))

io.on("connection", (socket) => {
    console.log("a user connected")
    socket.on("disconnect", () => {
        console.log("user disconnected")
    })
})

server.listen(port, () => {
    return console.log(`Webserver is listening at http://localhost:${port}`);
})
