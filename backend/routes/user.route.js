import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { getUser } from "../controller/user.controller.js";
const router = express.Router();

router.get("/getuser",isAuth,getUser)

export default router;