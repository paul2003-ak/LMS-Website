import React from 'react'
import { MdOutlineCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const Logos = () => {
    return (
        <div className=' w-[100vw] min-h-[90px] flex items-center justify-center flex-wrap gap-4 md:mb-[50px] '>

            <div className=' flex items-center justify-center gap-2 px-5 py-3 text-[#03394b] rounded-3xl bg-gray-200 cursor-pointer'>
                <MdOutlineCastForEducation className=' w-[35px] h-[35px] fill-[#03394b] ' />
                20K+ Online Couurses
            </div>

            <div className=' flex items-center justify-center gap-2 px-5 py-3 text-[#03394b] rounded-3xl bg-gray-200 cursor-pointer'>
                <SiOpenaccess className=' w-[35px] h-[35px] fill-[#03394b] ' />
                Lifetime Access
            </div>

            <div className=' flex items-center justify-center gap-2 px-5 py-3 text-[#03394b] rounded-3xl bg-gray-200 cursor-pointer'>
                <FaSackDollar className=' w-[35px] h-[35px] fill-[#03394b] ' />
                Value for money
            </div>

            <div className=' flex items-center justify-center gap-2 px-5 py-3 text-[#03394b] rounded-3xl bg-gray-200 cursor-pointer'>
                <BiSupport className=' w-[35px] h-[35px] fill-[#03394b] ' />
                Lifetime Support
            </div>

            <div className=' flex items-center justify-center gap-2 px-5 py-3 text-[#03394b] rounded-3xl bg-gray-200 cursor-pointer'>
                <FaUsers className=' w-[35px] h-[35px] fill-[#03394b] ' />
                Community Support
            </div>

        </div>
    )
}

export default Logos