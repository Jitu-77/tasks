import {User} from "../model/user.model.js"
import mongoose from "mongoose"
import awsUpload from "../utils/aws.js" 
const registeredUser = async(req,res)=>{
    try {
        console.log(req.body)
        console.log(req.file,"req.file")
        const {username,email,password} = req.body
        console.log(username,email,password,"<----------->")
        if(!username || !email || !password){
            return res.status(500).json({message:"Complete registration details is missing."})
        }
        const existingUser = await User.findOne({username})
        console.log("existingUser--->",existingUser)
        if(existingUser){
            return res.status(500).json({message : "Already you are am user!."})
        }
        const response = await awsUpload(req.file.filename,`${req.file.destination}/${req.file.filename}`)
        console.log(response,"RESPONSE")
        const avatar = req.file.filename;
        const user = await User.create({
            username,
            email,
            avatar,
            password
        })
        console.log("user--->",user)
        return res.status(201).json({
            message :"User successfully created",
            data:{
                id:user._id,
                email:user.email,
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