import http from "http";
import { PowerAPI } from "./api";
import { Server } from "socket.io";


export class NotificationServer {

    private io: Server

    constructor(server: http.Server, api: PowerAPI) {
        this.io = new Server(server)

        this.io.on("connection", (socket) => {
            console.log("client connected")
            socket.on("disconnect", () => console.log("client disconnected") )
        })
    }

}