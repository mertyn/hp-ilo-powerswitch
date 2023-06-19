import express from 'express';

export function auth(username: string, password: string) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const authorizationHeader = req.headers.authorization;

        if (authorizationHeader) {
            const encodedCredentials = authorizationHeader.split(' ')[1];
            const credentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
            const [user, pass] = credentials.split(':');


            if (user === username && pass === password)
                next();
            else {
                res.setHeader('WWW-Authenticate', 'Basic');
                res.status(401).send('Unauthorized');
            }
            
        } else {
            res.setHeader('WWW-Authenticate', 'Basic');
            res.status(401).send('Unauthorized');
        }
    }
}