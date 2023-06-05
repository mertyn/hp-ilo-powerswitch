import "dotenv/config"
import express, { Application } from "express"

const { Client } = require("ssh2")

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


const app = express()
const port = process.env.WEBPORT || 5000;

app.use(express.static("public"))
app.listen(port, () => {
    return console.log(`Webserver is listening at http://localhost:${port}`);
})
