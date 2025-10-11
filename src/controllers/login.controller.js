import {User} from "../model/user.model.js"

export const generateTokens = async(userID) => {
    try {
        const user = await User.findById(userID).select("-password")
        console.log("USER",user)
        const accessToken=user.generateAccessToken()
        console.log("ACCESS TOKEN",accessToken)
        const refreshToken=user.generateRefreshToken()
        console.log("REFRESH TOKEN",refreshToken)
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
         console.log("Error in generateTokens",error)   
    }
}

export const loginUser = async(req,res)=>{
    try {
        console.log(req.body)
        const {username,password}=req.body;
        if(!username || !password) return res.status(500).json({message:"No sufficient details!"})
        const existingUser = await User.find({username})
        console.log("EXISTING USER",existingUser)
        if(!existingUser || existingUser.length == 0) return res.status(202).json({message:"User with username does not exist!"})
        const passwordCheck = await existingUser[0].isPasswordCorrect(password)
        console.log("PASSWORD CHECK",passwordCheck)
        if(!passwordCheck) return res.status(201).json({message:'Incorrect credentials!'})
        console.log("11111",existingUser[0]._id)    
        const {accessToken,refreshToken} = await generateTokens(existingUser[0]._id)
        console.log("GENERATE TOKENS",accessToken,refreshToken)
        const options = {
            httpOnly: true,
            secure: true,  
        }        
        const loggedInUser = await User.findById(existingUser[0]._id).select("-password -refreshToken")
        console.log(loggedInUser)
        return res.status(201)
                  .cookie("accessToken",accessToken,options)
                  .cookie("refreshToken",refreshToken,options)
                  .json({
                    status:true,
                    data:{
                    username:loggedInUser.username,
                    id:loggedInUser._id,
                    avatar:loggedInUser.avatar,
                    accessToken,
                    refreshToken
                    }
                  })

    } catch (error) {
            return res.status(500).json({message:"Error in login"})
    }
}

// export default loginUser