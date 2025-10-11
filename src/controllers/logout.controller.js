import { Router } from "express";
import { User } from "../model/user.model.js"

const logout = async (req,res)=>{
    console.log(req.user,"REQ USER")
    const user = await User.findByIdAndUpdate(req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },{
            new:true
        }
    )
    console.log(user,"NEW USER")
    const options={
        httpOnly: true,
        secure: true,
    }
    res
    .status(201)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json({
        message:"User logged out"
    })
}

export default logout