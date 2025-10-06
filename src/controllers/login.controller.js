import {User} from "../model/user.model.js"

const loginUser = async(req,res)=>{
    try {
        console.log(req.body)
        const {username,password}=req.body;
        if(!username || !password) return res.status(500).json({message:"No sufficient details!"})
        const existingUser = await User.find({username})
        console.log("EXISTING USER",existingUser)
        if(!existingUser || existingUser.length == 0) return res.status(202).json({message:"User with username does not exist!"})
        const passwordCheck = await existingUser[0].isPasswordCorrect(password)
        console.log("PASSWORD CHECK",passwordCheck)
        if(passwordCheck) return res.status(201).json({message:'Successfully logged in.'})
        return res.status(202).json({message:"Incorrect credentials!"})
    } catch (error) {
            return res.status(500).json({message:"Error in login"})
    }

}
export default loginUser