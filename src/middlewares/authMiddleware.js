import jwt from "jsonwebtoken"
import { User } from "../model/user.model.js"
const authValidation = async (req,res,next)=>{
    try {
            console.log(req.body,"InMiddleware REQ.BODY")
            const token =   req.cookies
                                // || req.header("Authorization")?.replace("Bearer",)
            console.log("token",token)                            
            if(!token) {
                res.status(500).json({message:'Not authenticated'})
            }
            const decodedToken = jwt.verify(token?.accessToken,process.env.ACCESS_TOKEN_SECRET_KEY)                           
            console.log("decodedToken",decodedToken)
            if(decodedToken){
                const user = await User.findById(decodedToken.id).select("-password")
                console.log("USER---",user)
                req.user = user
                next()
            }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Not authenticated'})
    }

   
}
export default authValidation