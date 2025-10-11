import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
import userRouter from './routes/user.routes.js'
import healthCheckRouter from './routes/healthCheck.routes.js'
import loginRouter from './routes/login.routes.js'
import logoutRouter from './routes/logout.routes.js'
import refreshTokenRouter from './routes/refreshToken.routes.js'
const app =express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))
app.use(express.static('public'))
app.use(cookieParser())

app.use("/api/v1/healthCheck",healthCheckRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/login",loginRouter)
app.use("/api/v1/logout",logoutRouter)
app.use("/api/v1/refreshToken",refreshTokenRouter)

export default app