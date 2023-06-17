import "dotenv/config"
import express from "express"
import { PowerClientOptions } from "./power-client"
import { PowerAPI } from "./api"


const port = process.env.WEBPORT || 5000;
const app = express()

app.use(express.static("public"))

var options: PowerClientOptions = {
    host: process.env.HOST || "",
    username: process.env.USER || "",
    password: process.env.PASS || ""
}

new PowerAPI(app, options)

app.listen(port, () => {
    return console.log(`Webserver is listening at http://localhost:${port}`);
})