
import mongoose from "mongoose";

const lectureschema = new mongoose.Schema({
    lectureTitle:{
        type:String,
        required:true
    },
    videourl:{
        type:String,
    },
    ispreviewFree:{
        type:Boolean,
        
    }
},{timestamps:true})

const lecturemodel = mongoose.model("Lecture",lectureschema)

export default lecturemodel;