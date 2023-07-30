import "dotenv/config"
import express from "express"
import { auth } from "./auth"
import { PowerClientOptions } from "./power-client"
import { PowerAPI } from "./api"


function env(key: string, defaultValue: any = ""): string {
    return process.env[key] || defaultValue
}


// log environment options
console.log(`
environment configuration:
PORT=${env("PORT")},
USER=${env("USER")},
PASS=${env("PASS")},
ILOHOST=${env("ILOHOST")},
ILOUSER=${env("ILOUSER")},
ILOPASS=${env("ILOPASS")},
SERVERTOKEN=${env("SERVERTOKEN")}
`)


const port = env("PORT", 5000);
const app = express()

// app.use(auth(env("USER"), env("PASS")))
app.use(express.static("public"))

var options: PowerClientOptions = {
    host: env("ILOHOST"),
    username: env("ILOUSER"),
    password: env("ILOPASS")
}

new PowerAPI(app, options)

app.listen(port, () => {
    return console.log(`Webserver is listening at http://localhost:${port}`);
})