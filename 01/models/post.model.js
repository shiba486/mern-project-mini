import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    
},{timestamps: true, versionKey: false})

export const Post = mongoose.model("Post",postSchema)