import mongoose from "mongoose";
import { config } from "./config.js";

const db_URL = config.MONGODB_URL;

export const CONNECT_DB = async ()=>{
    try {
        const DB_Instance =await mongoose.connect(db_URL)
        console.log(`\n MONGODB CONNECTION SUCCESSFULL DB HOST: ${DB_Instance.connection.host}`)
    } catch (error) {
        console.log(`MONGDB CONNECT ERROR`, error);
        process.exit(1)
    }
}