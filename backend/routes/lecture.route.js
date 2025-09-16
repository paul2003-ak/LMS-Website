import express from 'express';
import { createlecture, getCourselecture, editlecture, removeLecture } from '../controller/lecture.controller.js';
const router = express.Router();
import {isAuth} from '../middleware/isAuth.js'
import upload from '../middleware/multer.js';



router.post("/createlecture/:courseId", isAuth, createlecture);
router.get("/courselectures/:courseId", isAuth, getCourselecture);
router.post("/editlecture/:lectureid", isAuth,upload.single("videourl"), editlecture);
router.delete("/removelecture/:lectureid", isAuth, removeLecture);

export default router;