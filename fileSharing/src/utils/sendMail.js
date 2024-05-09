import nodemailer from 'nodemailer';
import { config } from '../config/config.js';
async function sendEmail({from,to,subject,text,html}) {
    let transporter = nodemailer.createTransport({
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        secure: false,
        tls: {rejectUnauthorized: false},
        auth: {
            user: config.MAIL_USER,
            pass: config.MAIL_PASS
        },

    })
    let options = {
        from:  ` File Share<${from}>`,
        to: to, 
        subject: subject,
        text: text, 
        html: html, 
      }

    let info = await transporter.sendMail(options)
    console.log(info);
    return info
}




export {sendEmail}