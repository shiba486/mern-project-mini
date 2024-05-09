import { upload } from "../utils/multer.js";
import { File } from "../model/file.model.js";
import { config } from "./../config/config.js";
import { sendEmail } from "../utils/sendMail.js";

import template from './../utils/emailTamplate.js';
import { v4 as uuidv4 } from "uuid";


export const files = (req, res) => {
  //store file
  upload(req, res, async (err) => {
    //request validate
    if (!req.file) {
      res.status(200).json({ msg: "All fields are required" });
    }
    if (err) {
      return res.status(500).send({ error: err });
    }

    //store in dataabase
    const file = new File({
      filename: req.file.filename,
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    return res.json({ file: `${config.APP_BASE_URL}/files/${response.uuid}` });
  });
};



export const sendMail =async (req,res)=>{
  const {uuid,emailTo, emailFrom} = req.body
  if(!uuid || !emailTo || !emailFrom){
    return res.status(200).json({ msg: "All fields are required" });
  }

  const file = await File.findOne({uuid: uuid})
  if(file.sender){
    return res.status(200).json({ msg: "Email Already Exist!" });
  }


  file.sender = emailFrom;
  file.receiver= emailTo;

  const response = await file.save()


  //send mail
  sendEmail({
    from: emailFrom,
    to: emailTo,
    subject: "file sharing",
    text : `${emailFrom} share a file with you`,
    html: template({
      emailFrom: emailFrom,
      downloadLink: `${config.APP_BASE_URL}/files/${file.uuid}`,
      size: parseInt(file.size/1000) + "kb",
      expires: "24 hours"
    })
  })

  res.status(200).json({msg: "success"})

  
}