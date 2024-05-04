import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "./models/user.model.js";
import { config } from "./config/config.js";

const app = express()

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.render("home")
})
app.get("/register",(req,res)=>{
    res.render("index")
})
app.post('/register',async(req,res)=>{
    const {fullname,username,email,password,age}= req.body

    if(username=="" || fullname=="") return res.send("invalid credantial")
    try {
       const existUser = await User.findOne({
            $or:[
                {email: email},
                {username: username}
            ]
        })
        if(existUser) return res.send("user already exist")

        await bcrypt.genSalt(10,async(err,salt)=>{
           
          await bcrypt.hash(password, salt, async(error, hash)=>{
            // if(error) return res.send("hash: something went wrong")
            const user = await User.create({
                fullname,
                username,
                email,
                age,
                password: hash
            })

           const token = await jwt.sign({id: user._id, email: user.email},config.ACCESS_TOKEN_SECRET, {expiresIn : config.ACCESS_TOKEN_EXPIRY} )
           
           res.cookie("token",token,{httpOnly: true})
        
           res.redirect("profile")
        })
        })

    } catch (error) {
        res.send("User Not Create",error)
    }
})
app.get("/profile",(req,res)=>{
    res.render("profile")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login",async(req,res)=>{
    const {email,password} = req.body
    

    // validation -not empty
 
        if(email=="" || password=="") return res.send("field are required")


   const user = await User.findOne({email})
   if(!user) {
       res.redirect("login")
      return console.log("INVALID CREDANTIAL")
   }
   const isValid = await bcrypt.compare(password,user["password"])
   if(!isValid){
       res.redirect("login")
       return console.log("invalid credantial")

   }


const token = await jwt.sign({id: user._id, email: user.email},config.ACCESS_TOKEN_SECRET, {expiresIn : config.ACCESS_TOKEN_EXPIRY} )
           
res.cookie("token",token)

    res.redirect("profile")

})
app.get("/logout",(req,res)=>{
    res.clearCookie("token",{httpOnly: true})
    res.redirect("/")
})






export {app}

