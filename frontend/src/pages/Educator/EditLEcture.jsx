import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { serverurl } from '../../App';
import { setLectureData } from '../../redux/LectureSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';


const EditLEcture = () => {
    const navigate = useNavigate();
    const { courseId, lectureId } = useParams();

    const { lectureData } = useSelector(state => state.lecture);
    const selectedlecture = lectureData.find((item) => item._id === lectureId);

    const [lectureTitle, setLectureTitle] = useState(selectedlecture.lectureTitle);
    const [videourl, setVideourl] = useState("")
    const [isPreviewFree, setIsPreviewFree] = useState(false);
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)

    const dispatch = useDispatch();

    const formdata=new FormData();
    formdata.append("lectureTitle",lectureTitle);
    formdata.append("videourl",videourl);
    formdata.append("ispreviewFree",isPreviewFree);

    const handleeditlecture=async()=>{
        setLoading(true);
        try {
            const result= await axios.post(serverurl + `/api/lectures/editlecture/${lectureId}`,formdata,{withCredentials:true});
            console.log(result.data);
            dispatch(setLectureData([...lectureData,result.data]));
            toast.success("Lecture Updated Successfully");
            navigate('/couses')
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoading(false)
        }
    }



    const handleremove=async()=>{
        setLoading1(true);
        try {
            const result=await axios.delete(serverurl + `/api/lectures/removelecture/${lectureId}`,{withCredentials:true});
            console.log(result.data);
            navigate(`/createlecture/${courseId}`);
            toast.success("Lecture Removed Successfully");
            setLoading1(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoading1(false);
        }
    }

    return (
        <div className=' min-h-screen bg-gray-100 flex items-center justify-center p-4 '>
            <div className=' w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6 '>
                {/* header */}
                <div className=' flex items-center gap-2 mb-2'>
                    <FaArrowLeftLong className=' text-gray-600 cursor-pointer ' size={20} onClick={() => navigate(`/createlecture/${courseId}`)} />
                    <h2 className=' text-xl font-semibold text-gray-800 '>Update Course Lecture</h2>
                </div>


                <button onClick={handleremove} disabled={loading1} className=' mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm '>
                    {loading1 ? <ClipLoader size={20} color='white' /> : " Remove Lecture"}
                </button>

                <div className=' space-y-4 '>
                    <div >
                        <label className=' block text-sm font-medium text-gray-700 mb-1' htmlFor="">Lecture Title *</label>
                        <input onChange={(e) => setLectureTitle(e.target.value)} value={lectureTitle} required className=' w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[black] focus:outline-none' type="text" />
                    </div>

                    <div>
                        <label className=' block text-sm font-medium text-gray-700 mb-1' htmlFor="">Video *</label>
                        <input onChange={(e) => setVideourl(e.target.files[0])} type="file" required accept='video/*' className=' w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-[white] hover:file:bg-gray-500 ' />
                    </div>


                    <div className=' flex items-center gap-3 '>
                        <input  onChange={()=>setIsPreviewFree(prev=>!prev)} id='isFree' type="checkbox" className=' accent-[black] h-4 w-4 id="isFree ' />
                        <label htmlFor="isFree" className=' text-sm text-gray-700 '>Is this Video Free ?</label>
                    </div>

                    {loading ? <p>"Uploading Video...Please Wait"</p> : ""}

                </div>

                <div className=' pt-4 '>
                    <button onClick={handleeditlecture} disabled={loading} className=' w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition'>
                            {loading ? <ClipLoader size={30} color='white' /> : " Update Lecture" }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditLEcture