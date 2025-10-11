
import  refreshTokenController from "../controllers/refreshToken.controller.js"
import { Router } from "express"
const refreshTokenRouter = Router()
refreshTokenRouter.route("").post(refreshTokenController)
export default refreshTokenRouter