import { Router } from "express";
import registeredUser from '../controllers/user.controller.js'
import { uploadFile } from "../middlewares/multerMiddleware.js"; 

const userRouter = Router();
userRouter.route("/register").post(uploadFile.single("avatar"),registeredUser)
export default userRouter

