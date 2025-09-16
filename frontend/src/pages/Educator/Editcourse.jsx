import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import image from '../../assets/empty.jpg'
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { serverurl } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '../../redux/Course.silce';

const Editcourse = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [des, setDes] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState("")
  const [price, setPrice] = useState("")
  const [thumbnail, setThumbnail] = useState(image) // fallback image
  const [backendThumbnail, setBackendThumbnail] = useState(null)

  const [loading, setLoading] = useState(false)
  const [removeLoading, setRemoveLoading] = useState(false)

  const dispatch = useDispatch()
  const { courseData } = useSelector(state => state.course)


  const handlethumbnail = (e) => {
    const file = e.target.files[0]
    setBackendThumbnail(file)
    setThumbnail(URL.createObjectURL(file))
  }

  const [ispublished, setIspublished] = useState(false)
  const [selectedcourse, setSelectedcourse] = useState(null)

  const thumb = useRef()
  const { courseId } = useParams()


  const getCourseById = async () => {
    try {
      const result = await axios.get(serverurl + `/api/course/getcourse/${courseId}`, { withCredentials: true })
      console.log(result.data)
      setSelectedcourse(result.data.course)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getCourseById()
  }, [])

  useEffect(() => {
    if (selectedcourse) {
      setTitle(selectedcourse.title || "")
      setSubtitle(selectedcourse.subtitle || "")
      setDes(selectedcourse.description || "")
      setCategory(selectedcourse.category || "")
      setLevel(selectedcourse.level || "")
      setPrice(selectedcourse.price || "")
      setThumbnail(selectedcourse.thumbnail || image)
      setIspublished(selectedcourse?.ispublished)
    }
  }, [selectedcourse])


  const handleEditCourse = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formdata = new FormData()
    formdata.append('title', title)
    formdata.append('subtitle', subtitle)
    formdata.append('description', des)
    formdata.append('category', category)
    formdata.append('level', level)
    formdata.append('price', price)
    formdata.append('thumbnail', backendThumbnail)
    formdata.append('ispublished', ispublished)

    try {
      const result = await axios.post(serverurl + `/api/course/edit/${courseId}`, formdata, { withCredentials: true })
      console.log(result.data)

      let updateData = result.data.course;

      if (updateData?.ispublished) {
        console.log("Before update:", courseData);

        // Update inside the courses array
        const updateCourses = courseData?.courses?.map((c) =>
          c._id === courseId ? updateData : c
        ) || [];

        // If course wasn’t already in list, push it
        if (!courseData?.courses?.some((c) => c._id === courseId)) {
          updateCourses.push(updateData);
        }

        // Dispatch with the same structure { courses: [...] }
        dispatch(setCourseData({ courses: updateCourses }));

        console.log("After update:", updateCourses);
      } else {
        const filterCourses = courseData?.courses?.filter(
          (c) => c._id !== courseId
        ) || [];

        dispatch(setCourseData({ courses: filterCourses }));
      }

      setLoading(false)
      toast.success(result.data.message)
      navigate('/couses')
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast.error(err.response.data.message)
    }
  }


  // remove course
  const removeCourse = async () => {
    setRemoveLoading(true)
    try {
      const result = await axios.delete(serverurl + `/api/course/delete/${courseId}`, { withCredentials: true })
      console.log(result.data)

      //filter the course who are removed 
      const filterCourse = await courseData?.courses?.filter(c => c._id !== courseId)
      dispatch(setCourseData(filterCourse))

      setRemoveLoading(false)
      toast.success("Course Removed Successfully")
      navigate('/couses')
    } catch (error) {
      console.log(error)
      setRemoveLoading(false)
      toast.error(error.response.data.message)
    }
  }


  return (
    <div className=' max-w-5xl mx-auto p-6 my-10 bg-white rounded-lg shadow-md '>

      {/* top Bar */}
      <div className=' flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative '>
        <FaArrowLeftLong onClick={() => navigate('/couses')} className=' top-[-20%] md:top-[20%] absolute left-[0] d:left-[2%] w-[22px] h-[22px] cursor-pointer ' />

        <h2 className=' text-2xl font-semibold md:pl-[60px]'>
          Add Detail Information regarding the course
        </h2>

        <div onClick={()=>navigate(`/createlecture/${selectedcourse?._id}`)} className=' space-x-2 space-y-2 '>
          <button className=' bg-black cursor-pointer text-white px-4 py-2 rounded-md '>
            Go to Lecture Page
          </button>
        </div>

      </div>


      {/* form details page */}
      <div className=' bg-gray-50 p-6 rounded-md '>
        <h2 className=' text-lg font-medium mb-4 '> Basic Course Information</h2>

        <div className=' space-x-2 space-y-2 '>
          {!ispublished ? <button onClick={() => setIspublished(prev => !prev)} className=' cursor-pointer bg-green-100 text-green-600 px-4 py-2 rounded-md border-1 '>Click to Publish</button>
            : <button onClick={() => setIspublished(prev => !prev)} className=' cursor-pointer bg-red-100 text-red-600 px-4 py-2 rounded-md border-1 '>Click to Unpublish</button>
          }

          <button onClick={removeCourse} disabled={removeLoading} className=' cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md '>{removeLoading ? <ClipLoader size={30} color={"white"} /> : "Remove Course"}</button>
        </div>

        <form onSubmit={handleEditCourse} className=' space-y-6 ' action="">
          <div className='  '>
            <label htmlFor="title" className=' block text-sm font-medium text-gray-700 mb-1 '>Title</label>
            <input onChange={(e) => { setTitle(e.target.value) }} value={title} type="text" id='title' placeholder='Course Title' className=' w-full border px-4 py-2 rounded-md ' />
          </div>


          <div >
            <label htmlFor="subtitle" className=' block text-sm font-medium text-gray-700 mb-1 '>Subtitle</label>
            <input onChange={(e) => { setSubtitle(e.target.value) }} value={subtitle} type="text" id='subtitle' placeholder='Course Subtitle' className=' w-full border px-4 py-2 rounded-md ' />
          </div>

          <div >
            <label htmlFor="des" className=' block text-sm font-medium text-gray-700 mb-1 '>Description</label>
            <textarea onChange={(e) => { setDes(e.target.value) }} value={des} type="text" id='des' placeholder='Description' className=' w-full border px-4 py-2 rounded-md h-24 resize-none'></textarea>
          </div>

          <div className='  flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 '>

            {/* for category */}
            <div className=' flex-1 '>
              <label htmlFor="" className=' block text-sm font-semibold text-gray-700 mb-1'> Course Category</label>

              <select onChange={(e) => { setCategory(e.target.value) }} value={category} className=' w-full border px-4 py-2 rounded-md bg-white ' >
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

            {/* for lavel */}
            <div className=' flex-1 '>
              <label htmlFor="" className=' block text-sm font-semibold text-gray-700 mb-1'> Course Lavel</label>

              <select onChange={(e) => { setLevel(e.target.value) }} value={level} className=' w-full border px-4 py-2 rounded-md bg-white ' >
                <option value="">Select Level</option>
                <option value="Beginer">Beginer</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* for price */}
            <div className=' flex-1 '>
              <label htmlFor="price" className=' block text-sm font-semibold text-gray-700 mb-1'> Course Price (INR)</label>
              <input onChange={(e) => { setPrice(e.target.value) }} value={price} type="number" id='price' className=' w-full border px-4 py-2 rounded-md ' placeholder='₹' />
            </div>

          </div>


          {/* thumbnail part */}
          <div>
            <label htmlFor="" className=' block texr-sm font-semibold text-gray-700 mb -1 '>Course Thumbnail</label>
            <input onChange={handlethumbnail} type="file" hidden ref={thumb} accept='image/*' />
          </div>
          <div className=' relative w-[300px]'>
            <img src={thumbnail ? thumbnail : image} alt="" onClick={() => thumb.current.click()} className=' w-[100%] h-[100%] border-1 border-black rounded-[5px] ' />
            <FaEdit onClick={() => thumb.current.click()} className=' w-[20px] h-[20px] absolute top-2 right-2' />
          </div>


          <div className=' flex items-center justify-center gap-[15px]'>
            <button onClick={() => navigate('/couses')} className=' bg-[#e9e8e8] hover:bg-red-200 text-black border-1 border-black cursor-pointer px-7 py-2 rounded-md'>Cancle</button>
            <button disabled={loading} className=' bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer '> {loading ? <ClipLoader size={30} color={"white"} /> : "Save"} </button>
          </div>

        </form>
      </div>


    </div>
  )
}

export default Editcourse