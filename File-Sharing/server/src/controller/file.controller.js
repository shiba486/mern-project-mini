import { File } from "../models/file.model.js";

export const fileUpload = async(req,res)=>{
    const fileObj = {
        path: req.file.path,
        name: req.file.originalname
    }
    try {
        const file = await File.create(fileObj)
        res.status(200).json({path: `http://localhost:5000/file/${file._id}`})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({err: error.message})
    }

}


export const downloadFile = async(req,res)=>{
    const downloadId = req.params.downloadId
    try {
      const file = await File.findById({_id:downloadId})
      file.downloadContent++
      await file.save();

      res.download(file.path, file.name)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({err: error.message})
    }
    
}