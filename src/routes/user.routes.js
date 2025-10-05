import { Router } from "express";
import registeredUser from '../controllers/user.controller.js'


const userRouter = Router();
userRouter.route("/register").post(registeredUser)
export default userRouter

