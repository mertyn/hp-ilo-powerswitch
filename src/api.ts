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
        app.post("/api/notification", (req: express.Request, res: express.Response) => this.notification(req, res));
    }

    private api(req: express.Request, res: express.Response): void {
        console.log("api: got request ", req.path)
        res.json({ message: "hello, this is api" })
    }

    private state(req: express.Request, res: express.Response): void {
        // console.log("api: got request ", req.path)

        function callback(data: any) {
            // console.log("api: got data", data.PowerState)
            res.json({
                powerState: data.PowerState,
                model: data.Model,
                name: data.HostName,
            })
        }

        function error(data: any) {
            // console.log("api: got error", data)
            res.json({ error: data })
        }

        this.client.getPowerState(callback, error)
    }

    private action(req: express.Request, res: express.Response): void {
        console.log("api: got action request", req.body.action)

        this.client.postResetAction(req.body.action, (data: any) => {
            console.log("api: responding with powerOn =", data.PowerState === "On")
            res.json({ powerOn: data.PowerState === "On" })
        },
        (error: any) => {   
            // console.log("api: got error", error)
            res.json({ error: error })
        })
    }

    private notification(req: express.Request, res: express.Response): void {
        var tokenValid: boolean = process.env.SERVERTOKEN == req.body.token;
        
        console.log("api: got notification request", req.body.token, "token valid ", tokenValid)
        
        res.status(tokenValid ? 200 : 401)
        res.json({ tokenValid: tokenValid })
    }

}