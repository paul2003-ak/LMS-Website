import express from "express";
import { resetPassword, sendOtp, verifyOtp } from "../controller/sendMail.controller.js";
const router= express.Router();

router.post('/sendotp',sendOtp);
router.post('/verifyotp',verifyOtp);
router.post('/resetpassword',resetPassword);

export default router;