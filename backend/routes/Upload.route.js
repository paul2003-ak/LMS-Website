import express from "express";
import {isAuth} from '../middleware/isAuth.js'
import upload from '../middleware/multer.js'
import { updateprofile } from "../controller/Upload.js";
const router= express.Router();

router.post('/upload',isAuth ,upload.single("photoUrl") ,updateprofile)

export default router;