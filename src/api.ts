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
        app.get("/api/state", (_: any, res: express.Response) => this.state(res))
    }

    private api(_: any, res: express.Response): void {
        res.json({ messag: "hello, this is api" })
    }

    private state(res: express.Response): void {
        this.client.getPowerState((powerOn: boolean) => {
            res.json({ powerOn: powerOn })
        })
    }

}