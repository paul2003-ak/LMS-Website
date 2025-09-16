import React, { useState } from 'react'
import { IoPersonCircleSharp } from "react-icons/io5";
import logo from '../assets/logo.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverurl } from '../App';
import { toast } from 'react-toastify';
import { setuserData } from '../redux/userslice';
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";

const Nav = () => {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [hambarger, setHambarger] = useState(false);

    const dispatch = useDispatch();

    const handlelogout = async () => {
        try {
            const result = await axios.get(serverurl + '/api/auth/logout', { withCredentials: true });
            dispatch(setuserData(null)) // Clear user data in redux
            console.log(result.data);
            toast.success("Logout successful")
        } catch (error) {
            console.log(error)
            toast.error("Logout failed, please try again")
        }
    }

    return (
        <div>
            <div className=' w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10 '>
                <div className=' lg:w-[20%] w-[40%] lg:pl-[50px]  '>
                    <img src={logo} className=' w-[60px] rounded-[5px] border-2 border-white cursor-pointer' alt="" />
                </div>

                <div className=' w-[30%] lg:flex items-center justify-center gap-4 hidden '>


                    {userData?.photoUrl ? <img onClick={() => setShow(prev => !prev)} src={userData?.photoUrl} className=' w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 object-cover bg-black border-white cursor-pointer ' alt="" />
                        :
                        <div onClick={() => setShow(prev => !prev)} className=' w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer '>
                            {userData?.name?.slice(0, 1).toUpperCase()}
                        </div>
                    }

                    {userData?.role === "educator" && <div onClick={()=> navigate('/dashboard')} className=' px-[20px] py-[10px] border-2 border-white text-[white] bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer '>
                        Dashboard
                    </div>}

                    {!userData ? <span onClick={() => navigate('/login')} className=' px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5] '>
                        Login
                    </span>
                        :
                        <span onClick={handlelogout} className=' px-[20px] py-[10px] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer '>
                            LogOut
                        </span>
                    }


                    {show && <div className=' absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-[white] px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer hover:bg-black'>
                        <span onClick={() => navigate('/profile')} className=' bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600'>
                            My Profile
                        </span>

                        <span className=' bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600'>
                            My Courses
                        </span>
                    </div>}

                </div>

                <RxHamburgerMenu onClick={() => setHambarger(prev => !prev)} className='w-[30px] h-[30px] lg:hidden text-white cursor-pointer  ' />

                <div className={` ${hambarger ? "translate-x-[0] transition duration-600 " : "translate-x-[-100%] transition duration-600 "} fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden`}>

                    <GiSplitCross onClick={() => setHambarger(prev => !prev)} className=' w-[30px] h-[30px] fill-white absolute top-5 right-[4%] ' />

                    {!userData && <IoPersonCircleSharp className=' w-[50px] h-[50px] fill-black cursor-pointer ' />}

                    {userData?.photoUrl ? <img src={userData?.photoUrl} className=' w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 object-cover bg-black border-white cursor-pointer ' alt="" />
                        : <div className=' w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer '>
                            {userData?.name?.slice(0, 1).toUpperCase()}
                        </div>}

                    <div onClick={() => navigate('/profile')} className='w-[150px] h-[40px] flex items-center justify-center  border-2 border-white text-[white] bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer '>
                        My Profile
                    </div>
                    <div className='w-[150px] h-[40px] flex items-center justify-center  border-2 border-white text-[white] bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer '>
                        My Courses
                    </div>

                    {userData?.role === "educator" && <div onClick={() => navigate('/dashboard')} className=' w-[150px] h-[40px] flex items-center justify-center border-2 border-white text-[white] bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer '>
                        Dashboard
                    </div>}

                    {!userData ? <span onClick={() => navigate('/login')} className=' w-[150px] h-[40px] flex items-center justify-center  border-2 border-white text-[white] bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer  '>
                        Login
                    </span>
                        :
                        <span onClick={handlelogout} className='w-[150px] h-[40px] flex items-center justify-center  border-2 border-white text-[white] bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer  '>
                            LogOut
                        </span>
                    }


                </div>

            </div>
        </div>
    )
}

export default Nav