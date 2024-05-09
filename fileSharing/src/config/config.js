import { config as conf } from "dotenv";

conf()

const _config={
    PORT: process.env.PORT,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    APP_BASE_URL: process.env.APP_BASE_URL,
    MONGODB_URL: process.env.MONGODB_URL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
}

export const config = Object.freeze(_config)
