import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()

    return (
        <div className=' flex min-h-screen bg-gray-100 '>
            <FaArrowLeftLong onClick={() => navigate('/')} className=' w-[22px] absolute top-[10%] left-[10%] h-[22px] cursor-pointer ' />
            <div className=' w-full px-6 py-10 bg-gray-50 space-y-10 '>
                {/* Main Section */}

                <div className=' max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6'>
                    <img src={userData?.photoUrl || userData?.name?.slice(0, 1).toUpperCase()} className=' w-28 h-28 rounded-full object-cover border-black shadow-md ' alt="educator" />

                    <div className=' text-center md:text-left space-y-1 '>
                        <h1 className=' text-2xl font-bold text-gray-800 '>Welcome , {userData?.name || "Educator"} 👋</h1>
                        <h1 className=' text-xl font-semibold text-gray-800 '>Total Earning: 0 </h1>
                        <p className=' text-gray-600 text-sm '>{userData?.description || "Start Creating Courses for Your Students"}</p>
                        <h1 onClick={() => navigate('/couses')} className=' px-[10px] text-center py-[10px] border-2 bg-black border-black hover:bg-gray-700 text-white rounded-[10px] text-[15px] font-light cursor-pointer flex items-center justify-center gap-2 '>
                            Create Courses
                        </h1>
                    </div>

                </div>

                {/* graph Section */}

            </div>
        </div>
    )
}

export default Dashboard