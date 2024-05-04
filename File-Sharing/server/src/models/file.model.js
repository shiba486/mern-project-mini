import mongoose, {Schema} from "mongoose";

const fileSchema = new Schema({
    path: {
        type: String,
        required: true, 
    },
    name: {
        type: String,
        required: true,
    },
 
    downloadContent: {
        type: Number,
        required: true,
        default: 0    
    },

},{timestamps:true,versionKey: false})


export const File = mongoose.model("File",fileSchema)