import { Log } from "./log";
import http from "http";
import { PowerAPI } from "./api";
import { Server } from "socket.io";


export class NotificationServer {

    private io: Server

    constructor(server: http.Server, api: PowerAPI) {
        this.io = new Server(server)

        this.io.on("connection", (socket) => {
            Log.info("notify: client connected")
            socket.on("disconnect", () => Log.info("notify: client disconnected"))
        })

        api.onReady(() => {
            Log.info("notify: server is ready")
            this.io.emit("ready")
        })
    }

}