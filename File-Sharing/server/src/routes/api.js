import express from "express"
import { fileUpload,downloadFile } from "../controller/file.controller.js"
import { upload2, upload } from "../middlewares/multer.js"
const router = express.Router()

router.post("/upload",upload2.single("file"), fileUpload)
router.get("/file/:downloadId", downloadFile)


export default router