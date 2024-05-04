import express from "express";
const app = express()
import { config } from "./config/config.js";

//security libray require
import cors from "cors"
import helmet from "helmet"
import hpp from "hpp"
import cookieParser from "cookie-parser"
import mongoSanitize from "express-mongo-sanitize";
import { rateLimit } from 'express-rate-limit'

// CORS INITIAL
app.use(cors(
    {
        origin: config.CORS_ORIGIN,
        credentials: true,
    }
));

// SECURITY IMPLEMENTATION 
app.use(helmet());
app.use(hpp());
app.use(express.json({limit: "18kb"}));
app.use(express.urlencoded({extended: true, limit: "18kb"}));
app.use(cookieParser());

const limiter = rateLimit({windowMs: 15 * 60 * 1000, limit: 100})
app.use(limiter)
app.use(mongoSanitize());


//home route
app.get("/",(req,res)=>{
    res.json({
        message: "welcome  to this web api..."
    })
})

//api require
import router from "./routes/api.js";

app.use("/api/user",router)

export {app}