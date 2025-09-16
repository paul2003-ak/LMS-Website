import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { serverurl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";
import { useDispatch } from 'react-redux';
import { setuserData } from '../redux/userslice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';

const Signup = () => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();


    const handlesubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const result = await axios.post(serverurl + "/api/auth/signup", { name, email, password, role }, { withCredentials: true })

            dispatch(setuserData(result.data));
            setLoading(false);
            navigate('/');
            toast.success("signup successful")
        } catch (error) {
            setLoading(false);
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const Googlesignup = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            const user = response.user
            const name = user.displayName
            const email = user.email

            const result = await axios.post(serverurl + "/api/auth/google", {
                name, email , role
            }, { withCredentials: true })
            
            dispatch(setuserData(result.data));

            toast.success("Registration Successful")
            navigate("/");

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className=' bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center '>

            <form onSubmit={handlesubmit} className=' w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex '>
                {/* left div */}
                <div className=' md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 '>
                    <div>
                        <h1 className=' font-semibold text-[black] text-2xl '>
                            Let's Get Started
                        </h1>
                        <h2 className=' text-[#999797] text-[18px] '>
                            Create your account
                        </h2>
                    </div>

                    <div className=' flex flex-col gap-1 w-[80%] items-start justify-center px-3 '>
                        <label htmlFor="name" className=' font-semibold ' >Name</label>
                        <input onChange={(e) => setName(e.target.value)} value={name} id="name" type="text" className=' border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] hover:border-black ' placeholder='Your name' />
                    </div>

                    <div className=' flex flex-col gap-1 w-[80%] items-start justify-center px-3 '>
                        <label htmlFor="email" className=' font-semibold ' >Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} id="email" type="email" className=' border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] hover:border-black ' placeholder='Your Email' />
                    </div>

                    <div className=' flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative '>
                        <label htmlFor="password" className=' font-semibold ' >Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} id="password" type={show ? "text" : "password"} className=' border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] hover:border-black ' placeholder='Your password' />

                        {!show ? <IoEyeOutline onClick={() => setShow(prev => !prev)} className=' absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%] ' />
                            : <IoEyeOffOutline onClick={() => setShow(prev => !prev)} className=' absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%] ' />}

                    </div>

                    <div className=' flex md:w-[50%] w-[70%] items-center justify-between '>
                        <span onClick={() => setRole("student")} className={` ${role === "student" ? "border-black" : "border-[#646464]"} px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl  cursor-pointer hover:border-black `}>Student</span>
                        <span onClick={() => setRole("educator")} className={` ${role === "educator" ? "border-black" : "border-[#646464]"} px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl  cursor-pointer hover:border-black `}>Educator</span>
                    </div>

                    <button disabled={loading} className=' w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px] '>
                        {loading ? <ClipLoader size={30} color='white' /> : "SignUp"}
                    </button>

                    <div className=' w-[80%] flex items-center gap-2 '>
                        <div className=' w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>

                        <div className=' w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center '>Or continue</div>

                        <div className=' w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>
                    </div>


                    {/* google */}
                    <div onClick={Googlesignup} className=' cursor-pointer w-[80%] h-[40px] border-1 border-[black] flex items-center justify-center '>
                        <img src={google} className=' w-[25px] ' alt="" />
                        <span className=' text-[18px] text-gray-500 '>oogle</span>
                    </div>

                    <div className='  text-[#6f6f6f]  '>
                        already have an account? <span onClick={() => navigate('/login')} className=' text-black cursor-pointer hover:underline '>Login</span>
                    </div>

                </div>


                {/* right div */}
                <div className=' w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden '>
                    <img src={logo} className=' w-30 shadow-2xl ' alt="" />
                    <span className=' text-2xl text-white '>VIRTUAL COURSES</span>
                </div>
            </form>

        </div>
    )
}

export default Signup