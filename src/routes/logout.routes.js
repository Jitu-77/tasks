import { Router } from "express";
import authValidation from '../middlewares/authMiddleware.js'
import logout from "../controllers/logout.controller.js"

const logoutRouter = Router()
logoutRouter.route("").post(authValidation,logout)

export default logoutRouter