import { config as conf } from "dotenv"
conf()
const _config = {
    port : process.env.PORT,
    databaseUrl : process.env.MONGODB_URI_STRING,
    CORS_ORIGIN : process.env.CORS_ORIGIN,
    // ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    // ACCESS_TOKEN_EXPIRY:process.env.ACCESS_TOKEN_EXPIRY,
    // REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
    // REFRESH_TOKEN_EXPIRY:process.env.REFRESH_TOKEN_EXPIRY
}

export const config = Object.freeze(_config)