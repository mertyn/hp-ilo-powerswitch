import https from "https"


export class PowerClient {

    private readonly _iloIP: string;
    private readonly _username: string;
    private readonly _password: string;

    constructor(iloIP: string, username: string, password: string) {
        this._iloIP = iloIP;
        this._username = username;
        this._password = password;
    }

    public getPowerState(callback: Function): void {
        const options = {
            hostname: this._iloIP,
            path: "/redfish/v1/Systems/1/",
            method: "GET",
            auth: `${this._username}:${this._password}`,
            rejectUnauthorized: false,
            headers: { "Content-Type": "application/json" },
        }

        const req = https.request(options, (res) => {
            console.log(`statusCode: ${res.statusCode}`)
            res.on("data", (data) => {
                console.log(data.toString())
                JSON.parse(data.toString()).PowerState === "On" ? callback(true) : callback(false)
            })
        }).setTimeout(100000).on("error", (error) => {
            console.error('Error:', error)
        })

        req.end()
    }

    public powerOn(): void {
        const options = {
            hostname: this._iloIP,
            path: "/redfish/v1/Systems/1/Actions/ComputerSystem.Reset/",
            method: "POST",
            auth: `${this._username}:${this._password}`,
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

    public powerOff(): void {
        const options = {
            hostname: this._iloIP,
            path: "/redfish/v1/Systems/1/Actions/ComputerSystem.Reset/",
            method: "POST",
            auth: `${this._username}:${this._password}`,
            rejectUnauthorized: false,
            headers: {
                "Content-Type": "application/json",
            },
        }

        const payload = {
            Action: 'Reset',
            ResetType: 'ForceOff'
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