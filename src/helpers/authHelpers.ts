import { sign, verify } from 'jsonwebtoken';
import { dataToken } from './helpers.interfaces';

class AuthHelper {
    constructor() {
    }

    async generateToken(data: dataToken, secret: string, life: string): Promise<any>{
        return new Promise((resolve, reject)=>{
            const dataToken = {
                username: data.username
            }
    
            sign(
                {data: dataToken},
                secret,
                {
                    expiresIn: life,
                    algorithm: "HS256"
                },
                (err, encoded)=>{
                    if (err) {
                        return reject(err)
                    } else {
                        return resolve(encoded);
                    }
                }
            )
        })
    }

    async verifyToken(token: string, secret: string){
        return new Promise((resolve, reject)=>{
            verify(token, secret, (err, decoded)=>{
                if (err) {
                    return reject(err);
                }
                return resolve(decoded);
            })
        })
    }
}

export const authHelper = new AuthHelper();