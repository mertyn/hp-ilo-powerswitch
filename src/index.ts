import "dotenv/config"
import express from "express"
import http from "http"
import { Server } from "socket.io"
import { Client, ConnectConfig } from "ssh2"



const config: ConnectConfig = {
    host: process.env.HOST,
    port: parseInt(process.env.PORT || "22"),
    username: process.env.USER,
    password: process.env.PASSWORD,
    algorithms: {
        kex: ["diffie-hellman-group14-sha1", "diffie-hellman-group1-sha1"],
        cipher: ["aes256-cbc", "aes128-cbc", "3des-cbc"]
    }
}



const port = process.env.WEBPORT || 5000;
const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static("public"))

io.on("connection", (socket) => {
    console.log("client connected")

    const conn = new Client();
    conn.on("ready", () => {
        console.log('Client :: ready');

        conn.exec("power", (err, stream) => {
            if (err) throw err
            stream.on('close', (code: number, signal: number) => {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal)
                conn.end()
            }).on('data', (data: any) => {
                console.log('STDOUT: ' + data)
                socket.emit("data", data.toString())
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data)
            });
        })
    })
    .on("end", () => {
        console.log('Client :: end');
    })
    .connect(config);

    socket.on("disconnect", () => {
        console.log("client disconnected")
        conn.end()
    })
})

server.listen(port, () => {
    return console.log(`Webserver is listening at http://localhost:${port}`);
})
