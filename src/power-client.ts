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


    public getPowerState(callback: Function): void {
        const options = {
            hostname: this.iloIP,
            path: "/redfish/v1/Systems/1/",
            method: "GET",
            auth: `${this.username}:${this.password}`,
            rejectUnauthorized: false,
            headers: { "Content-Type": "application/json" },
        }

        const req = https.request(options, (res) => {
            // console.log(`statusCode: ${res.statusCode}`)

            res.on("data", (data) => {
                JSON.parse(data.toString()).PowerState === "On" ? callback(true) : callback(false)
                
                // console.log(data.toString())
            })
        }).setTimeout(100000).on("error", (error) => {
            console.error('Error:', error)
        })

        req.end()
    }


    public powerOn(): void {
        this.postResetAction("On")
    }

    public powerOff(): void {
        this.postResetAction("PushPowerButton")
    }

    private postResetAction(resetType: string): void {
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
            Action: 'Reset',
            ResetType: 'On'
        };
    
        const req = https.request(options, (res) => {
            console.log(`statusCode: ${res.statusCode}`)
    
            res.on("data", (data) => {
                console.log(data.toString())
            })
    
        }).setTimeout(100000).on("error", (error) => {
            console.error('Error:', error)
        })
    
        req.write(JSON.stringify(payload))
        req.end()
    }

}