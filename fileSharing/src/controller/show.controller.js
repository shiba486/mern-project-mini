import { config } from "../config/config.js";
import { File } from "../model/file.model.js"
import path from "path"
const __dirname = path.resolve(path.dirname('fileSharing'));

export const showFile = async(req,res)=>{
    const uuid = req.params.uuid;
    try {
        const file = await File.findOne({uuid: uuid})
        if(!file){
            return res.status(200).json({errr: "Link has been expired"})
        }

        res.status(200).json({
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            download: `${config.APP_BASE_URL}/files/download/${file.uuid}`
        })
    } catch (err) {
        return res.status(200).json({error: "Something Went Wrong" })
    }
}

export const downloadFile = async(req,res)=>{
    const uuid = req.params.uuid;
    try {
        const file = await File.findOne({uuid: uuid})
        if(!file){
            return res.status(200).json({errr: "Link has been expired"})
        }

        const filePath = `${__dirname}/${file.path}`
        // console.log(filePath)
        res.download(filePath)
        
    } catch (err) {
        console.log(err);
        return res.status(200).json({error: "Something Went Wrong" })
    }
}