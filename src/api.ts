import express from "express";
import { PowerClient, PowerClientOptions } from "./power-client";


export class PowerAPI {

    private client: PowerClient

    constructor(app: express.Application, options: PowerClientOptions) {
        this.client = new PowerClient(options)
        this.addRoutes(app);
    }

    private addRoutes(app: express.Application): void {
        app.get("/api/", this.api)
        app.get("/api/state", (req: express.Request, res: express.Response) => this.state(req, res))
    }

    private api(req: express.Request, res: express.Response): void {
        console.log("api: got request ", req.path)
        res.json({ messag: "hello, this is api" })
    }

    private state(req: express.Request, res: express.Response): void {
        console.log("api: got request ", req.path)
        this.client.getPowerState((powerOn: boolean) => {
            res.json({ powerOn: powerOn })
        })
    }

}