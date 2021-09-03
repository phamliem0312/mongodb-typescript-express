import { userModel } from "./user.database";
import { userRegister } from './user.interface';
class UserQuery {
    constructor() {}

    async getUser(username: string):Promise<any>{
        return new Promise((resolve, reject)=>{
            try {
                userModel.find({
                    username: username
                }, (err, result)=>{
                    if (err) {
                        return reject(err);
                    } else {
                        if (result[0] == undefined) {
                            return resolve(false);
                        } else {
                            return resolve(result[0]);
                        }
                    }
                })
            } catch (error) {
                return reject(error);
            }
        })
    }

    async createUser(user: userRegister){
        return new Promise((resolve, reject)=>{
            try {
                let newUser = new userModel(user); 
                newUser.save((err)=>{
                    if (err) {
                        reject(false);
                    } else {
                        resolve(true);
                    }
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    async getList(){
        return new Promise(resolve=>{
            userModel.find({
                role: "agent"
            }, (err, list)=>{
                resolve(list);
            })
        })
    }
}

export const userQuery = new UserQuery();