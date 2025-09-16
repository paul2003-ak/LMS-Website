import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
const PORT=process.env.PORT
import { connectDB } from "./db/db.js";
import cookieParser from "cookie-parser";
import authrouter from "./routes/auth.route.js";
import userrouter from './routes/user.route.js';
import sendmailroute from './routes/sendMail.route.js'
import uploadroute from './routes/Upload.route.js'
import courserouter from './routes/course.route.js'
import lectureroute from './routes/lecture.route.js'


import cors from "cors";

const app=express();
app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use('/api/auth',authrouter)
app.use('/api/user',userrouter)
app.use('/api/sendmail',sendmailroute)
app.use('/api/upload',uploadroute)
app.use('/api/course',courserouter)
app.use('/api/lectures',lectureroute)


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
