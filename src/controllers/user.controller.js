import {User} from "../model/user.model.js"
import mongoose from "mongoose"

const registeredUser = async(req,res)=>{
    try {
        console.log(req.body)
        const {username,avatar,password} = req.body
        console.log(username,avatar,password,"<----------->")
        if(!username || !avatar || !password){
            return res.status(500).json({message:"Complete registration details is missing."})
        }
        const existingUser = await User.findOne({username})
        console.log("existingUser--->",existingUser)
        if(existingUser){
            return res.status(500).json({message : "Already you are am user!."})
        }
        const user = await User.create({
            username,
            avatar,
            password
        })
        console.log("user--->",user)
        return res.status(201).json({
            message :"User successfully created",
            data:{
                id:user._id,
                username:user.username,
                avatar:user.avatar,
            }
        })
    } catch (error) {
        console.error("Error from here")
        return res.status(500).json({message:"Internal Server Error"})
    }
}
export default registeredUser