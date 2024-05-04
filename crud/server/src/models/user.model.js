import mongoose, {Schema} from "mongoose";
import { config } from "../config/config.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new Schema({
    first_name: {
        type: String,
        required: true, 
    },
    last_name: {
        type: String,
        required: true,
    },
 
    email: {
        type: String,
        required: true,
        unique: true  
    },
    password: {
        type: String,
        required: true,
       
    },

},{timestamps:true,versionKey: false})

//HASHING PASSWORD 
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
//PASSWORD CHEKING
userSchema.methods.isPasswordCorrect =async function(password){
    return await bcrypt.compare(password, this.password)
}
//ACCESS TOKEN GENERATE
userSchema.methods.generateAccessToken = async function (){
     const res= await jwt.sign(
        {
            _id: this.id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        config.ACCESS_TOKEN_SECRET,
        {
            expiresIn: config.ACCESS_TOKEN_EXPIRY
        }
    )
    return res
}
//REFRESH TOKEN GENERATE


export const User = mongoose.model("User",userSchema)