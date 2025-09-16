import coursemodel from "../model/course.model.js";
import { uploadonCloudinary } from "../config/cloudinary.js";


export const createcourse = async (req, res) => {
    try {
        const { title, category } = req.body;
        const creator = req.userId;

        if (!title || !category) {
            return res.status(400).json({ message: "Title and category are required" })
        }
        const course = await coursemodel.create({ title, category, creator: creator });
        return res.status(201).json({ course });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error creating course" }, error);
        
    }
}


export const getPublishedCourses=async(req,res)=>{
    try{
        const courses= await coursemodel.find({ispublished:true}).populate("lectures");
        if(!courses){
            return res.status(404).json({message: "Courses not found"});
        }
        return res.status(200).json({courses});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ message: "failed to get ispublic courses" }, error);
    }
}

export const getCreatorCourses=async(req,res)=>{
    try{
        const userid=req.userId;
        const courses= await coursemodel.find({creator:userid});
        if(!courses){
            return res.status(404).json({message: "Courses not found"});
        }
        return res.status(200).json({courses});
        }
    catch(error){
        console.log(error)
        return res.status(500).json({ message: "failed to get creator courses" }, error);
    
    }
}

export const editcourse=async(req,res)=>{
    try {
        const{courseId}=req.params;
        const {title, subtitle , description , category , level , ispublished , price }=req.body
        let thumbnail;
        if(req.file){
            thumbnail=await uploadonCloudinary(req.file.path);
        }
        let course=await coursemodel.findById(courseId)
        if(!course){
            return res.status(404).json({message: "Course not found"});
        }
        const updateData={title, subtitle , description , category , level , ispublished , price, thumbnail}
        
        course=await coursemodel.findByIdAndUpdate(courseId,updateData,{new:true});
        return res.status(200).json({course});

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "failed to edit course" }, error);
    }
}


export const getCoursebyId=async(req,res)=>{
    try {
        const{courseId}=req.params;
        const course=await coursemodel.findById(courseId);
        if(!course){
            return res.status(404).json({message: "Course not found"});

        }
        return res.status(200).json({course});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "failed to get course" }, error);
    
    }
}


export const removeCourse=async(req,res)=>{
    try{
        const{courseId}=req.params;
        let course=await coursemodel.findById(courseId);
        if(!course ){
            return res.status(404).json({message: "Course not found"});
        
        }
        course=await coursemodel.findByIdAndDelete(courseId , {new:true});
        return res.status(200).json({message: "Course deleted successfully"});
    }
    catch(error){   
        console.log(error)
        return res.status(500).json({ message: "failed to delete course" }, error)
    }
}