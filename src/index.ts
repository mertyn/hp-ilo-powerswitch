import "dotenv/config"
import { Log } from "./log"
import http from "http"
import express from "express"
import { Server } from "socket.io"
import { auth } from "./auth"
import { PowerClientOptions } from "./power-client"
import { PowerAPI } from "./api"
import { NotificationServer } from "./notification"


function env(key: string, defaultValue: any = ""): string {
    return process.env[key] || defaultValue
}


// get and log environment options
Log.info(`
environment configuration:
PORT=${env("PORT")},
USER=${env("USER")},
PASS=${env("PASS")},
ILOHOST=${env("ILOHOST")},
ILOUSER=${env("ILOUSER")},
ILOPASS=${env("ILOPASS")},
SERVERTOKEN=${env("SERVERTOKEN")}
`)

var options: PowerClientOptions = {
    host: env("ILOHOST"),
    username: env("ILOUSER"),
    password: env("ILOPASS")
}


const port = env("PORT", 5000);
const app = express()
const server = http.createServer(app)

const api = new PowerAPI(app, options)
new NotificationServer(server, api)

// app.use(auth(env("USER"), env("PASS")))
app.use(express.static("public"))

server.listen(port, () => {
    return Log.info(`Webserver is listening at http://localhost:${port}`);
})