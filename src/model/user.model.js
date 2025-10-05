import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        min:[6,"Must be of minimum 6 letters"],
        max:[6,"Must be of maximum 12 letters"],
        index:true
        },
    avatar:{
        type:String,
        required:false        
        },
    password:{
        type:String,
        required:true,
        }
    },{timestamps:true})
    userSchema.pre("save",async function (next) {
        let modifiedPassword = this.isModified("password");
        let newCheck  = this.isNew
        console.log("modifiedPassword",modifiedPassword)
        console.log("newCheck",newCheck)
        if(!modifiedPassword) return next()
        console.log("password",this.password)
        this.password = await bcrypt.hash(this.password,10)
        next()            
    })
export const User = mongoose.model("User",userSchema)    