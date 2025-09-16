import express from "express";
import { createcourse, editcourse, getCoursebyId, getCreatorCourses, getPublishedCourses, removeCourse } from "../controller/course.controller.js";
import {isAuth} from '../middleware/isAuth.js'
import upload from "../middleware/multer.js";
const router= express.Router()

router.post('/create',isAuth, createcourse)
router.get('/getpublish',getPublishedCourses)
router.get('/creator', isAuth , getCreatorCourses)
router.post('/edit/:courseId', isAuth ,upload.single("thumbnail"),editcourse)
router.get('/getcourse/:courseId', isAuth, getCoursebyId)
router.delete('/delete/:courseId', isAuth, removeCourse)

export default router;