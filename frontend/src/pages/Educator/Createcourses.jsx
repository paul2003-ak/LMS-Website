import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { serverurl } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const Createcourses = () => {
  const navigate=useNavigate()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)

  const handlecreatecourse=async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const result=await axios.post(serverurl + "/api/course/create" , {title,category} , {withCredentials:true})
      console.log(result.data)
      setLoading(false)
      toast.success("Course Created Successfully")
      navigate('/couses')
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  return (
    <div className=' min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10 '>
        <div className=' max-w-xl w-[600px] mx-auto p-6 bg-white shadow-md rounded-md mt-10 relative '>
        <FaArrowLeftLong onClick={()=>navigate('/couses')} className=' top-[8%] absolute left-[5%] w-[22px] h-[22px] cursor-pointer ' />
        <h2 className=' text-2xl font-semibold mb-6 text-center '>Create Course</h2>

        <form action="" className=' space-y-5 '>

          <div>
            <label htmlFor="title" className=' block text-sm font-semibold text-gray-700 mb-1 '>
              Course Title
            </label>
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" id="title" placeholder='Enter Course title' className=' w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black] ' />
          </div>

            <div>
            <label htmlFor="cat" className=' block text-sm font-semibold text-gray-700 mb-1 '>
              Course Category
            </label>

            <select onChange={(e) => setCategory(e.target.value)} id="cat" className=' w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black]  '>
             <option value="">Select Category</option>
             <option value="App Development">App Development</option>
             <option value="AI/ML">AI/ML</option>
             <option value="Data Science">Data Science</option>
             <option value="Data Analytics">Data Analytics</option>
             <option value="Ethical Hacking">Ethical Hacking</option>
             <option value="UI/UX Design">UI/UX Design</option>
             <option value="Web Development">Web Development</option>
             <option value="AI Tools">AI Tools</option>
             <option value="Others">Others</option>
            </select>
            </div>

            <button onClick={handlecreatecourse} disabled={loading} className=' w-full bg-[black] text-white py-2 px-2 rounded-md  active:bg-[#3a3a3a] transition '>
              {loading ? <ClipLoader size={30} color="white"/> : "Create" }
            </button>

        </form>

        </div>
    </div>
  )
}

export default Createcourses