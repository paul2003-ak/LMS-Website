import React from 'react'
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { SiBuildkite } from "react-icons/si";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { SiHackster } from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";
import { SiGoogledataproc } from "react-icons/si";
import { IoAnalyticsOutline } from "react-icons/io5";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

const ExploreCourses = () => {
    const navigate=useNavigate();
    return (
        <div className=' w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px] '>
            {/* left/top div */}
            <div className=' w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-center justify-center gap-1 md:px-[40px] px-[20px]'>

                <span className=' text-[35px] font-semibold '>Explore</span>
                <span className='  text-[35px] font-semibold '>Our Courses</span>
                <p className=' text-[17px]'>Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Rem vel iure explicabo laboriosam accusantium expedita laudantium facere magnam.
                </p>
                <button onClick={()=>navigate('/allcourses')} className=' cursor-pointer px-[20px] py-[10px] border-2 bg-[black] border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[40px]'>
                    Explore Courses
                    <SiViaplay className=' w-[30px] h-[30px] fill-white ' />
                </button>
            </div>

            {/* right/buttom div */}
            <div className=' w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]'>
                    <div className=' w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                        <div className=' w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
                        <TbDeviceDesktopAnalytics className=' w-[60px] h-[60px] text-[#6d6c6c] ' /> 
                        </div>
                        Web Dev
                    </div>


                    <div className=' w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                        <div className=' w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center'>
                        <SiBuildkite className=' w-[60px] h-[60px] text-[#6d6c6c] ' /> 
                        </div>
                        UI/UX Designing
                    </div>

                    <div className=' w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                        <div className=' w-[100px] h-[90px] bg-[#fcb9c8] rounded-lg flex items-center justify-center'>
                        <IoPhonePortraitOutline className=' w-[60px] h-[60px] text-[#6d6c6c] ' /> 
                        </div>
                        App Dev
                    </div>

                    <div className=' w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                        <div className=' w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
                        <SiHackster className=' w-[60px] h-[60px] text-[#6d6c6c] ' /> 
                        </div>
                        Ethical Hacking
                    </div>

                    <div className=' w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                        <div className=' w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center'>
                        <RiOpenaiFill className=' w-[60px] h-[60px] text-[#6d6c6c] ' /> 
                        </div>
                        AI/ML
                    </div>

                    <div className=' w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                        <div className=' w-[100px] h-[90px] bg-[#fcb9c8] rounded-lg flex items-center justify-center'>
                        <SiGoogledataproc className=' w-[60px] h-[60px] text-[#6d6c6c] ' /> 
                        </div>
                        Data Science
                    </div>

                    <div className=' w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                        <div className=' w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
                        <IoAnalyticsOutline className=' w-[60px] h-[60px] text-[#6d6c6c] ' /> 
                        </div>
                        Data Analytics
                    </div>


                    <div className=' w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                        <div className=' w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center'>
                        <SiOpenaigym className=' w-[60px] h-[60px] text-[#6d6c6c] ' /> 
                        </div>
                        Ai Tools
                    </div>
                    
            </div>
        </div>
    )
}

export default ExploreCourses