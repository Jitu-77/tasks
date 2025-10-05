import mongoose, {Schema} from "mongoose";

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

export const User = mongoose.model("User",userSchema)    