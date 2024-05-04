import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
},{timestamps: true, versionKey: false})

export const User = mongoose.model("User",userSchema)