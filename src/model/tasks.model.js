import mongoose ,{Schema} from "mongoose";

const taskSchema = new Schema (
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        subTitle:{
            type:String,
            // required:true,
            trim:true
        },
        description:{
            type:String,
            required:true,
            trim:true
        },
        completed:{
            type:Boolean,
            required:true,
            default: false
        },
        lifeCycleStatus:{
            type:String,
            enum:["TODO", "IN_PROGRESS", "REVIEW", "DONE"],
            default:"TODO"
        },
        supportingDocuments:{
            type:String,
            trim : true,
        },
        userID:{
            type:Schema.Types.ObjectId,
            ref:"User",
            index: true
        },
        supportingFiles:{
            type:[String]
        }
    },
    {timestamps:true}
)
export const Task = mongoose.model("Task",taskSchema)