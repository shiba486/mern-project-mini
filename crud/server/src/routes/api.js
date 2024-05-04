import express from "express"
import { createUser,deleteUser,getAllUser, getOneUser, updateUser } from "../controller/user.controller.js"

const router = express.Router()


router.post("/create", createUser)
router.get("/allUser", getAllUser)
router.get("/singleUser/:userId", getOneUser)
router.put("/updateUser/:userId", updateUser)
router.delete("/deleteUser/:userId",deleteUser)

export default router