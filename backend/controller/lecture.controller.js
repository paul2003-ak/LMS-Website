import { uploadonCloudinary } from "../config/cloudinary.js";
import coursemodel from "../model/course.model.js";
import lecturemodel from "../model/Lecture.model.js";


export const createlecture =async(req,res)=>{
    try {
        const {lectureTitle}=req.body;
        const {courseId}=req.params;

        if(!lectureTitle || !courseId){
            return res.status(400).json({message:"Lecture title is required"});
        }
        const lecture=await lecturemodel.create({lectureTitle});

        const course=await coursemodel.findById(courseId);

        if(!course){
            return res.status(400).json({message:"course not found "});
        }
        course.lectures.push(lecture._id);

        await course.save();
        await course.populate("lectures");


        return res.status(201).json({lecture,course});
    }
    catch(error){
        return res.status(500).json({ message: "failed to create lecture", error: error.message });
    }

}


export const getCourselecture=async(req,res)=>{
    try {
        const {courseId}=req.params;

        const course=await coursemodel.findById(courseId)
        if(!course){
            return res.status(404).json({message:"course not found"});
        }

        await course.populate("lectures");
       

        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({message:"failed to fetch lectures", error: error.message});    }
}

export const editlecture=async(req,res)=>{
    try {
        const {lectureid}=req.params;
        const {ispreviewFree , lectureTitle}=req.body;
        const lecture= await lecturemodel.findById(lectureid);
        if(!lecture){
            return res.status(404).json({message:"Lecture not found"});
        }
        let videourl
        if(req.file){
            videourl=await uploadonCloudinary(req.file.path);
            lecture.videourl=videourl;
        }
        if(lectureTitle){
            lecture.lectureTitle=lectureTitle;
        }
        lecture.ispreviewFree=ispreviewFree;

        await lecture.save();
        return res.status(200).json(lecture);
    } catch (error) {
        return res.status(500).json({message:"failed to edit lecture"},error);
    }
}

export const removeLecture=async(req,res)=>{
    try{
        const {lectureid}=req.params
        const lecture=await lecturemodel.findByIdAndDelete(lectureid);
        if(!lecture){
            return res.status(404).json({message:"Lecture not found"});
        }
        await coursemodel.updateOne(
            {lectures:lectureid},
            {$pull:{lectures:lectureid}}
        );
        return res.status(200).json({message:"Lecture deleted successfully"});
    }
    catch(error){
        return res.status(500).json({message:"failed to delete lecture"},error);
    }
}