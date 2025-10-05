console.log("index.js --1")
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import app from "./app.js"
dotenv.config({
    path:'./.env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 6000,()=>{
        console.log("server started at port :",process.env.PORT || 6000)
    })
    console.log("DB Connected.")
})
.catch((err)=>{
    console.log("DB connection failed")
})