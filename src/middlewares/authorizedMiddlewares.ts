import { Request, Response, NextFunction } from 'express';
import { userQuery } from '../modules/user/user.model';
export const isAdmin = async (req: Request, res: Response, next: NextFunction)=>{
    const username = req.body.username;
    const user = await userQuery.getUser(username);

    if (user.role == "admin") {
        next()
    } else {
        res.status(404).send("unauthorized");
    }
}