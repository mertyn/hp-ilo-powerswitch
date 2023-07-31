import "dotenv/config"
import { Log } from "./log"
import http from "http"
import https from "https"
import fs from "fs"
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

var clientOptions: PowerClientOptions = {
    host: env("ILOHOST"),
    username: env("ILOUSER"),
    password: env("ILOPASS")
}


const port = env("PORT", 5000);
const app = express()
const serverOptions = {
    key: fs.readFileSync("build/cert/key.pem"),
    cert: fs.readFileSync("build/cert/cert.pem")
}
const server = https.createServer(serverOptions, app)

const api = new PowerAPI(app, clientOptions)
new NotificationServer(server, api)

// app.use(auth(env("USER"), env("PASS")))
app.use(express.static("public"))

server.listen(port, () => {
    return Log.info(`Webserver is listening at https://localhost:${port}`);
})