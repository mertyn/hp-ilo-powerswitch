import express from "express";
import { PowerClient, PowerClientOptions } from "./power-client";
import bodyParser from "body-parser";


export class PowerAPI {

    private client: PowerClient

    constructor(app: express.Application, options: PowerClientOptions) {
        this.client = new PowerClient(options)
        this.addRoutes(app);
    }

    private addRoutes(app: express.Application): void {
        app.use(bodyParser.json())
        app.get("/api/", this.api)
        app.get("/api/state", (req: express.Request, res: express.Response) => this.state(req, res))
        app.post("/api/action", (req: express.Request, res: express.Response) => this.action(req, res))
    }

    private api(req: express.Request, res: express.Response): void {
        console.log("api: got request ", req.path)
        res.json({ message: "hello, this is api" })
    }

    private state(req: express.Request, res: express.Response): void {
        console.log("api: got request ", req.path)
        this.client.getPowerState((data: any) => {
            console.log("api: got data", data.PowerState)
            res.json({
                powerState: data.PowerState,
                model: data.Model,
                name: data.HostName,
            })
        })
    }

    private action(req: express.Request, res: express.Response): void {
        console.log("api: got action request", req.body.action)
        this.client.postResetAction(req.body.action, (data: any) => {
            console.log("api: responding with powerOn =", data.PowerState === "On")
            res.json({ powerOn: data.PowerState === "On" })
        })
    }

}