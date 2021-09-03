import { Request, Response } from 'express';
import { hashSync, compareSync } from 'bcrypt';
import { userQuery } from './user.model';
import { authHelper } from '../../helpers/authHelpers';
import dotenv from 'dotenv';
dotenv.config();
import moment from 'moment';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-dynamo-typescript-express";
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "10m";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-dynamo-typescript-express";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "365d";

class userControllers {
    constructor() {}

    async register(req: Request, res: Response){
        const username = req.body.username;
        const password = req.body.password;
        const role = req.body.role;
        const email = req.body.email;
        let user = await userQuery.getUser(username);
        if (!user) {
            let salt = 10;
            const hashPass = hashSync(password, salt);
            const newUser = {
                id: username,
                username: username,
                password: hashPass, 
                role: role,
                email: email,
                createdAt: moment().format("YYYY-MM-DD")
            }
            userQuery.createUser(newUser).then(()=>{
                res.status(200).send('created user successfully');
            }).catch(()=>{
                res.send(403).send('create user failed');
            })
        } else {
            res.send('username already exists');
        }
    }

    async login(req: Request, res: Response){
        const username = req.body.username;
        const password = req.body.password;
        const user = await userQuery.getUser(username);
        if (!user) {
            res.status(403).send('username not exists');
        } else {
            const hashPass = user.password;
            let isPassValid = compareSync(password, hashPass);
            if (!isPassValid) {
                res.status(403).send('password incorrect');
            } else {
                let data = {
                    username: username
                }
                const accessToken = await authHelper.generateToken(data, accessTokenSecret, accessTokenLife);
                const refreshToken = await authHelper.generateToken(data, refreshTokenSecret, refreshTokenLife);

                res.status(200).send({
                    accessToken,
                    refreshToken
                })
            }
        }
    }

    async getList(req: Request, res: Response){
        const list = await userQuery.getList();
        console.log(list);
        res.status(200).send(list);
    }
}

export const userController = new userControllers();