export enum LogLevel {
    DEBUG,
    INFO
}

export class Log {

    private static logLevel: LogLevel = Log.getLogLevel(process.env.LOGLEVEL)

    private static getLogLevel(logLevel: string | undefined): LogLevel {
        switch (logLevel) {
            case "DEBUG":
                console.log("loglevel: DEBUG")
                return LogLevel.DEBUG
            case "INFO":
                console.log("loglevel: INFO")
                return LogLevel.INFO
            default:
                console.log("loglevel: INFO")
                return LogLevel.INFO
        }
    }

    public static setLogLevel(logLevel: LogLevel): void {
        this.logLevel = logLevel
    }

    public static info(...args: any[]): void {
        console.log(...args)
    }

    public static error(...args: any[]): void {
        console.error(...args)
    }

    public static debug(...args: any[]): void {
        if (this.logLevel === LogLevel.DEBUG) {
            console.debug(...args)
        }
    }

}