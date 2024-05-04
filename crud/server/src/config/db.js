import mongoose from "mongoose";
import { config } from "./config.js";


const connectDB = async ()=>{
   try {
    
    mongoose.connection.on("connected",()=>{
     console.log(`mongodb connected successfully`);
    })
    mongoose.connection.on("error",(err)=>{
     console.log(`error in connecting to db ${err}`);
    })

    await mongoose.connect(config.databaseUrl)


   } catch (error) {
    console.err(`Failed to connect to db ${err}`);
    process.exit(1)
   }
}

export default connectDB