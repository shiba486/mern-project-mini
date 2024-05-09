import { Router } from "express";
import { showFile,downloadFile } from "../controller/show.controller.js";
const DownloadRoute = Router()
DownloadRoute.get("/:uuid",showFile)
DownloadRoute.get("/download/:uuid",downloadFile)

export  {DownloadRoute};