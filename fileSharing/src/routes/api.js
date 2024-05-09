import { Router } from "express";
import { files ,sendMail } from "../controller/files.controller.js";
const router = Router()
router.post("/files",files)
router.post("/files/sendmail",sendMail)

export default router;