import mongoose from 'mongoose';
import {DB_NAME} from '../constant.js'

const connectDB = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("DB connection done")
    } catch (error) {
        console.error("Mongo DB connection failed")
        process.exit(1)
    }
}
export default connectDB