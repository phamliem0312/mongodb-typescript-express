import express from "express";
import { userController } from "./user.controller";
import { isAuth } from '../../middlewares/authenciationMiddlewares'; 
import { isAdmin } from "../../middlewares/authorizedMiddlewares";
export const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/list', isAuth, isAdmin,userController.getList);