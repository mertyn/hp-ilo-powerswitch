import "dotenv/config"
import express from "express"
import { auth } from "./auth"
import { PowerClientOptions } from "./power-client"
import { PowerAPI } from "./api"


const port = process.env.PORT || 5000;
const app = express()

app.use(auth(process.env.USER || "", process.env.PASS || ""))
app.use(express.static("public"))

var options: PowerClientOptions = {
    host: process.env.ILOHOST || "",
    username: process.env.ILOUSER || "",
    password: process.env.ILOPASS || ""
}

new PowerAPI(app, options)

app.listen(port, () => {
    return console.log(`Webserver is listening at http://localhost:${port}`);
})