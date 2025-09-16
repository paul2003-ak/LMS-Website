import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { serverurl } from '../../App';
import { ClipLoader } from 'react-spinners';
import { setLectureData } from '../../redux/LectureSlice';
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";



const CreateLecture = () => {
    const navigate =useNavigate();
    const {courseId}=useParams();

    const [lectureTitle, setLectureTitle] = useState("")
    const [loading, setLoading] = useState(false)

    const dispatch=useDispatch();
    const {lectureData}=useSelector(state=>state.lecture);


    const handleCreateLecture=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const result= await axios.post(serverurl + `/api/lectures/createlecture/${courseId}`,{lectureTitle},{withCredentials:true});
            console.log(result.data);
            dispatch(setLectureData([...lectureData,result.data.lecture]));
            setLoading(false);
            toast.success("Lecture Created Successfully");
            setLectureTitle("");
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const getCourseLecture=async()=>{
            try {
                const result=await axios.get(serverurl + `/api/lectures/courselectures/${courseId}`,{withCredentials:true});
                dispatch(setLectureData(result.data.lectures));
                console.log(result.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCourseLecture();
    },[])

  return (
    <div className=' min-h-screen flex items-center justify-center p-4'>
        <div className=' bg-white shadow-xl rounded-xl w-full max-w-2xl p-6 '>
                {/* header */}
                <div className=' mb-6 '>
                    <h1 className=' text-2xl font-semibold text-gray-800 mb-1 '>
                        Let's Add a Lecture
                    </h1>
                    <p className=' text-sm text-gray-500 '>
                        Enter the title and add your video Lecture to enhance your Course Countent.
                    </p>
                </div>


                {/* input area */}
                <input onChange={(e)=>{setLectureTitle(e.target.value)}} value={lectureTitle} type="text" className=' w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus-ring-2 focus:ring-black mb-4 ' placeholder='e.g. Introduction to Mern Stack' />


                {/* button */}
                <div className=' flex gap-4 mb-6 '>
                    <button onClick={()=>navigate(`/editcourse/${courseId}`)} className='flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-semibold'> <FaArrowLeftLong /> Back To Course</button>
                    <button onClick={handleCreateLecture} disabled={loading} className=' px-5 py-2 rounded-md bg-[black] text-white hover:bg-gray-600 transition-all text-sm font-semibold shadow '>{loading ? <ClipLoader size={30} color={"white"} /> : "+ Create Lecture"}</button>
                </div>

                {/* lecture list */}

                <div className=' space-y-2 '>
                        {lectureData?.map((lecture,index)=>(
                            <div key={index} className=' bg-gray-100 flex justify-between items-center text-sm p-3 font-medium text-gray-700 '>

                                <span>
                                    Lecture - {index+1} : {lecture.lectureTitle}
                                </span>
                                <FaEdit onClick={()=>navigate(`/editlecture/${courseId}/${lecture._id}`)} className=' cursor-pointer text-gray-500 hover:text-gray-700 '/>
                            </div>
                        ))}
                </div>
        </div>
    </div>  
  )
}

export default CreateLecture