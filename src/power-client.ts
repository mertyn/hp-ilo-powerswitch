import { Log } from "./log";
import https from "https"


export type PowerClientOptions = {
    host: string,
    username: string,
    password: string
}

export class PowerClient {

    private readonly iloIP: string;
    private readonly username: string;
    private readonly password: string;

    constructor(options: PowerClientOptions) {
        this.iloIP = options.host;
        this.username = options.username;
        this.password = options.password;
    }


    public getPowerState(callback: Function, errorCallback?: Function): void {
        Log.debug("client: requesting powerstate")

        const options = {
            hostname: this.iloIP,
            path: "/redfish/v1/Systems/1/",
            method: "GET",
            auth: `${this.username}:${this.password}`,
            rejectUnauthorized: false,
            headers: { "Content-Type": "application/json" },
        }

        const req = https.request(options, (res) => {
            Log.debug("client: get statusCode =", res.statusCode)

            res.on("data", (data) => {
                var obj = JSON.parse(data.toString())
                
                Log.debug("client: got data")
                Log.debug(data.toString())
                Log.debug(JSON.stringify(obj, null, 2))
                Log.debug("client: powerOn =", obj.PowerState === "On")

                callback ? callback(obj) : null
            })
        }).setTimeout(100000).on("error", (error) => {
            Log.error("client error: ", error)
            errorCallback ? errorCallback(error) : null
        })

        req.end()
    }


    public powerOn(): void {
        this.postResetAction("On")
    }

    public powerOff(): void {
        this.postResetAction("PushPowerButton")
    }

    public postResetAction(resetType: string, callback?: Function, errorCallback?: Function): void {
        Log.debug("client: posting action")

        const options = {
            hostname: this.iloIP,
            path: "/redfish/v1/Systems/1/Actions/ComputerSystem.Reset/",
            method: "POST",
            auth: `${this.username}:${this.password}`,
            rejectUnauthorized: false,
            headers: {
                "Content-Type": "application/json",
            },
        }
    
        const payload = {
            Action: "Reset",
            ResetType: resetType
        };
    
        const req = https.request(options, (res) => {
            Log.info("client: post statusCode =", res.statusCode)
    
            res.on("data", (data) => {
                var obj = JSON.parse(data.toString())

                Log.info("client: got data")
                Log.info(data.toString())
                Log.debug(JSON.stringify(obj, null, 2))
                Log.info("client: powerOn =", obj.PowerState === "On")
                
                callback ? callback(obj) : null
            })
    
        }).setTimeout(100000).on("error", (error) => {
            Log.error("client error:", error)
            errorCallback ? errorCallback(error) : null
        })
    
        req.write(JSON.stringify(payload))
        req.end()
    }

}