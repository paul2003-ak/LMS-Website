import React, { useEffect } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import emptylogo from '../../assets/empty.jpg'
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverurl } from '../../App';
import { setCreaterCourseData } from '../../redux/Course.silce';

const Courses = () => {
    const navigate = useNavigate()
    const { createrCourseData } = useSelector(state => state.course);
    const dispatch = useDispatch()
    const {userData}=useSelector(state=>state.user)


    
    useEffect(() => {
        const getcreatorcourse = async () => {
            try {
                const result = await axios.get(serverurl + "/api/course/creator", { withCredentials: true })
                console.log(result.data)
                dispatch(setCreaterCourseData(result.data.courses));
            } catch (error) {
                console.log(error)
            }
        }

        getcreatorcourse();
    }, [userData])


    return (
        <div className=' flex min-h-screen bg-gray-100 '>

            <div className=' w-[100%] min-h-screen p-4 sm:p-6 bg-gray-100 '>


                <div className=' flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 '>
                    <div className=' flex items-center justify-center gap-3 '>
                        <FaArrowLeftLong onClick={() => navigate('/dashboard')} className=' w-[22px] h-[22px] cursor-pointer  ' />
                        <h1 className=' text-2xl font-semibold '>All Created Courses</h1>
                    </div>
                    <button onClick={() => navigate('/createcouse')} className=' bg-[black] text-white px-4 py-2 rounded hover:bg-gray-500 '>Create Couse</button>
                </div>


                {/* for large screen table */}
                <div className=' hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto '>
                    <table className=' min-w-full text-sm'>
                        <thead className=' border-b bg-gray-50 '>
                            <tr>
                                <th className=' text-left py-3 px-4 '>Courses</th>
                                <th className=' text-left py-3 px-4 '>Price</th>
                                <th className=' text-left py-3 px-4 '>Status</th>
                                <th className=' text-left py-3 px-4 '>Action</th>
                            </tr>
                        </thead>

                        <tbody >

                            {createrCourseData?.map((item, idx) => (


                                <tr key={idx} className=' border-b hover:bg-gray-50 transition duration-200 '>
                                    <td className=' py-3 px-4 flex items-center gap-4 '>

                                        {item?.thumbnail ? <img src={item?.thumbnail} className=' w-25 h-14 object-cover rounded-md object-fit' alt="" />
                                            : <img src={emptylogo} className=' w-25 h-14 object-cover rounded-md object-fit' alt="" />
                                        }

                                        <span> {item?.title} </span>
                                    </td>

                                    {item?.price ? <td className=' px-4 py-3 '>₹{item?.price}</td> : <td className=' px-4 py-3 '>₹ NA</td>}

                                    <td className=' px-4 py-3 '>
                                        <span className={` px-3 py-1 rounded-full text-xm ${item?.ispublished ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} `}>
                                            {item?.ispublished ? "Published" : "Draft"}
                                        </span>
                                    </td>

                                    <td className=' px-4 py-3 '> <FaEdit onClick={() => navigate(`/editcourse/${item?._id}`)} className=' text-gray-600 hover:text-blue-600 cursor-pointer' /> </td>
                                </tr>

                            ))}




                        </tbody>

                    </table>

                    <p className=' text-center text-sm text-gray-400 mt-6 '> A list of your recent courses. </p>
                </div>


                {/* small screen table */}
                <div className=' md:hidden space-y-4  '>

                    {createrCourseData?.map((item, idx) => (
                        <div key={idx} className=' bg-white rounded-lg shadow p-4 flex flex-col gap-3 '>

                            <div className=' flex gap-4 items-center  '>

                                {item?.thumbnail ? <img src={item?.thumbnail} className=' w-16 h-16 rounded-md object-cover ' alt="" />
                                    :
                                    <img src={emptylogo} className=' w-16 h-16 rounded-md object-cover ' alt="" />
                                }


                                <div className=' flex-1  '>
                                    <h2 className=' font-medium text-sm '>{item?.title}</h2>

                                    {item?.price ? <p className=' text-gray-600 text-xm mt-1 '>{item?.price}</p>
                                        :
                                        <p className=' text-gray-600 text-xm mt-1 '>₹ NA</p>
                                    }

                                </div>

                                <FaEdit onClick={() => navigate(`/editcourse/${item?._id}`)} className=' text-gray-600 hover:text-blue-600 cursor-pointer' />

                            </div>

                            <span className={` w-fit px-3  py-1 text-xs rounded-full ${item?.ispublished ? "bg-green-100 text-green-600" : " bg-red-100 text-red-600"}`}>
                                {item?.ispublished ? "Published" : "Draft"}
                            </span>


                        </div>
                    ))}

                    <p className=' text-center text-sm text-gray-400 mt-4 '>
                        A list of your recent courses.
                    </p>

                </div>





            </div>
        </div>
    )
}

export default Courses