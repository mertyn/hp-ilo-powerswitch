import "dotenv/config"

const { Client } = require("ssh2");

const config = {
    host: process.env.HOST,
    port: process.env.PORT,
    username: process.env.USER,
    password: process.env.PASSWORD,
    algorithms: {
        kex: ["diffie-hellman-group14-sha1", "diffie-hellman-group1-sha1"],
        cipher: ["aes256-cbc", "aes128-cbc", "3des-cbc"]
    }
}


const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    conn.exec('power', (err: any, stream: any) => {
        if (err) throw err;
        stream.on('close', (code: any, signal: any) => {
            console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            conn.end();
        }).on('data', (data: any) => {
            console.log('STDOUT: ' + data);
        }).stderr.on('data', (data: any) => {
            console.log('STDERR: ' + data);
        });
    });
}).connect(config);