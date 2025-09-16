import express from "express";
import { GoogleLogIn, login, logout, signup } from "../controller/auth.controller.js";

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/logout',logout);
router.post('/google',GoogleLogIn);

export default router;