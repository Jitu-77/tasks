import {generateTokens} from "./login.controller.js"
import jwt from "jsonwebtoken" 
import { User } from "../model/user.model.js";
const refreshTokenController = async (req,res)=>{
    try {
        console.log("req.cookie----",req.cookies)
        const token = req.cookies.refreshToken;
        console.log("TOKEN",token);
        if(!token){
            res.status(500).json({message:"Not Authorized!."})
        }
        const decodedToken = await jwt.verify(token,process.env.REFRESH_TOKEN_SECRET_KEY)
        const user = await User.findById(decodedToken.id).select("-password")
        console.log("USER",user)
        const {accessToken,refreshToken} = await generateTokens(user._id)
        console.log("accessToken----->",accessToken)
        console.log("refreshToken======>",refreshToken)
        const options = {
            httpsOnly:true,
            secure:true
        }
        return res.status(200)
                  .cookie("accessToken", accessToken, options)
                  .cookie("refreshToken", refreshToken, options)
                  .json({message:"Token successfully generated"});
 
    } catch (error) {
            res.status(500).json({message:"Not Authorized!."})
    }



}
export default refreshTokenController