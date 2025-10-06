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
    //Pre hook save 
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
    //password comparison
    userSchema.methods.isPasswordCorrect = async function(password){
        console.log("THIS---->",this)
        return await bcrypt.compare(password,this.password)
    }
export const User = mongoose.model("User",userSchema)    