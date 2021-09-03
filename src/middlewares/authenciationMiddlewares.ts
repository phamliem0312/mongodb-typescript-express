import { authHelper } from '../helpers/authHelpers';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-dynamo-typescript-express"; 

export const isAuth = (req: Request, res: Response, next: NextFunction)=>{
    const token = req.body.token;
    if (!token) {
        res.status(403).send('no token privided');
    } else {
        authHelper.verifyToken(token, ACCESS_TOKEN_SECRET).then((decoded)=>{
            if (decoded) {
                next();
            } else {
                res.status(403).send('unauthorized');
            }
        }).catch(err=>{
            res.status(403).send('unauthenciation');
        })
    }
}