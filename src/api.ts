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
        app.get("/api/state", this.state)
    }

    private api(_: any, res: express.Response): void {
        res.json({ messag: "hello, this is api" })
    }

    private state(_: any, res: express.Response): void {
        this.client.getPowerState((state: boolean) => {
            res.json({ state: state })
        })
    }

}