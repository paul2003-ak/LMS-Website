import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import photo from '../assets/SearchAi - Copy.png'
import { useSelector } from 'react-redux';
import Card from '../component/Card';


const AllCourses = () => {
    const { courseData } = useSelector(state => state.course)

    const [category, setCategory] = useState([])
    const [filterCourses, setFilterCourses] = useState([])
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);


    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(c => c !== e.target.value))
        }
        else {
            setCategory(prev => [...prev, e.target.value])
        }
    } 

    const applyFilter=()=>{
        let CourseCopy = courseData?.courses?.slice()
        if(category.length>0){
            CourseCopy=CourseCopy.filter(c => category.includes(c.category))
        }
        setFilterCourses(CourseCopy)
    }

    useEffect(()=>{
       setFilterCourses(courseData)
    },[courseData])

    useEffect(()=>{
        applyFilter()
    },[category])

    const navigate = useNavigate();
    return (
        <div className=' flex min-h-screen bg-gray-50 '>
            <Nav />
            <button onClick={()=>setIsSidebarVisible(prev=>!prev)} className="fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 rounded md:hidden border-2 border-black ">
                {isSidebarVisible ? 'Hide' : 'show'} Filters 
            </button>

            {/* sideBar */}
            <aside className={`${isSidebarVisible ? "translate-x-0": "-translate-x-full" } md:block md:translate-x-0 w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5 `}>

                <h2 className=' text-xl font-bold items-center justify-center gap-2 text-gray-50 mb-6'>
                    <FaArrowLeftLong onClick={() => navigate('/')} className=' text-white cursor-pointer ' />
                    Filter by Category
                </h2>

                <form onSubmit={(e) => e.preventDefault()} action="" className=' space-y-4 text-sm bg-gray-600 border-white text-[white] border p-[20px] rounded-2xl'>

                    <button className=' px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer'>
                        Search With Ai
                        <img className=' w-[30px] h-[30px] rounded-full ' src={photo} alt="" />
                    </button>

                    <label htmlFor="" className=' flex items-center gap-3 cursor-pointer hover:text-gray-200 transition '>
                        <input value={"App Development"} onChange={toggleCategory} type="checkbox" className=" accent-black  w-4 h-4 rounded-md " /> App Development
                    </label>

                    <label htmlFor="" className=' flex items-center gap-3 cursor-pointer hover:text-gray-200 transition '>
                        <input value={"Web Development"} onChange={toggleCategory} type="checkbox" className=" accent-black  w-4 h-4 rounded-md " /> Web Development
                    </label>

                    <label htmlFor="" className=' flex items-center gap-3 cursor-pointer hover:text-gray-200 transition '>
                        <input value={"AI/ML"} onChange={toggleCategory} type="checkbox" className=" accent-black  w-4 h-4 rounded-md " /> AI/Ml
                    </label>

                    <label htmlFor="" className=' flex items-center gap-3 cursor-pointer hover:text-gray-200 transition '>
                        <input value={"Data Science"} onChange={toggleCategory} type="checkbox" className=" accent-black  w-4 h-4 rounded-md " /> Data Science
                    </label>

                    <label htmlFor="" className=' flex items-center gap-3 cursor-pointer hover:text-gray-200 transition '>
                        <input value={"Data Analytics"} onChange={toggleCategory} type="checkbox" className=" accent-black  w-4 h-4 rounded-md " /> Data Analytics
                    </label>

                    <label htmlFor="" className=' flex items-center gap-3 cursor-pointer hover:text-gray-200 transition '>
                        <input value={"Ethical Hacking"} onChange={toggleCategory} type="checkbox" className=" accent-black  w-4 h-4 rounded-md " /> Ethical Hacking
                    </label>

                    <label htmlFor="" className=' flex items-center gap-3 cursor-pointer hover:text-gray-200 transition '>
                        <input value={"UI/UX Designing"} onChange={toggleCategory} type="checkbox" className=" accent-black  w-4 h-4 rounded-md " /> UI/UX Designing
                    </label>

                    <label htmlFor="" className=' flex items-center gap-3 cursor-pointer hover:text-gray-200 transition '>
                        <input value={"AI Tools"} onChange={toggleCategory} type="checkbox" className=" accent-black  w-4 h-4 rounded-md " /> AI Tools
                    </label>

                    <label htmlFor="" className=' flex items-center gap-3 cursor-pointer hover:text-gray-200 transition '>
                        <input value={"Others"} onChange={toggleCategory} type="checkbox" className=" accent-black  w-4 h-4 rounded-md " /> Others
                    </label>
                </form>
            </aside>


            {/* main area */}

            <main className=' w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px]'>
                    {
                        filterCourses?.map((course,idx)=>(
                            <Card key={idx}  category={course.category} thumbnail={course.thumbnail} title={course.title} price={course.price} id={course._id} />
                        ))
                    }
            </main>
        </div>
    )
}

export default AllCourses