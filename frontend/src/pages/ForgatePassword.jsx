import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverurl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const ForgatePassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newpassword, setNewpassword] = useState("")
    const [conpassword, setConpassword] = useState("")
    const [loading, setLoading] = useState(false);

    // for step - 1
    const sendotp=async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const result=await axios.post(serverurl + '/api/sendmail/sendotp' , {email} , {withCredentials: true});
            console.log(result.data);
            setLoading(false);
            setStep(2); // Move to step 2
            toast.success(result.data.message);
        }catch(err){
            toast.error(err.response.data.message);
            setLoading(false);
        }
    }

    // for step - 2
    const verifyotp=async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const result=await axios.post(serverurl + '/api/sendmail/verifyotp',{email, otp} , {withCredentials: true});
            console.log(result.data);
            setLoading(false);
            setStep(3); // Move to step 3
            toast.success(result.data.message);
        }catch(err){
            toast.error(err.response.data.message);
            setLoading(false);
        }
    }

    // for step - 3
    const resetpassword=async (e)=>{
        e.preventDefault();
        setLoading(true);
        if(newpassword !== conpassword){
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }
        try{
            const result=await axios.post(serverurl + '/api/sendmail/resetpassword', {email, password:newpassword} , {withCredentials: true});
            console.log(result.data);
            setLoading(false);
            toast.success(result.data.message);
            navigate('/login'); // Redirect to login after successful password reset
        }catch(err){
            toast.error(err.response.data.message);
            setLoading(false);
        }
    }

    return (
        <div className=' min-h-screen flex items-center justify-center bg-gray-100 px-4 '>
            {/* step - 1 */}
            {step == 1 &&
                <div className=' bg-white shadow-md rounded-xl p-8 max-w-md w-full '>
                    <h2 className=' text-2xl font-bold mb-6 text-center text-gray-800 '>
                        Forget Your Password
                    </h2>

                    <form onSubmit={sendotp} className=' space-y-4 '>
                        <div>
                            <label htmlFor="email" className=' block tetx-sm font-medium text-gray-700 '>
                                Enter your email address
                                <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" id="email" required className=' mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='you@example.com' />
                            </label>
                        </div>

                        <button disabled={loading} className=' w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer'>
                            {loading ? <ClipLoader size={30} color='white' /> : "Send OTP"}
                        </button>

                    </form>

                    <div onClick={() => navigate('/login')} className=' text-sm text-center mt-4 cursor-pointer '>
                        Back to Login
                    </div>
                </div>
            }

            {/* step - 2 */}
            {step == 2 && <div className=' bg-white shadow-md rounded-xl p-8 max-w-md w-full '>
                <h2 className=' text-2xl font-bold mb-6 text-center text-gray-800 '>
                    Enter OTP
                </h2>

                <form onSubmit={verifyotp} className=' space-y-4 '>
                    <div>
                        <label htmlFor="otp" className=' block tetx-sm font-medium text-gray-700 '>
                            Please enter the 4-digit code sent to your email.
                            <input onChange={(e) => { setOtp(e.target.value) }} value={otp} type="text" id="otp" required className=' mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='* * * *' />
                        </label>
                    </div>

                    <button disabled={loading} className=' w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer'>
                        {loading ? <ClipLoader size={30} color='white' /> : "Verify OTP"}
                    </button>

                </form>

                <div onClick={() => navigate('/login')} className=' text-sm text-center mt-4 cursor-pointer '>
                    Back to Login
                </div>
            </div>
            }

            {/* step - 3 */}
            {step == 3 && <div className=' bg-white shadow-md rounded-xl p-8 max-w-md w-full '>
                <h2 className=' text-2xl font-bold mb-6 text-center text-gray-800 '>
                    Reset Your Password
                </h2>
                <p className=' text-sm text-gray-500 text-center mb-6 '>
                    Enter a new password below to regain access to your account.
                </p>

                <form onSubmit={resetpassword} className=' space-y-4 '>
                    <div>
                        <label htmlFor="password" className=' block tetx-sm font-medium text-gray-700 '>
                            New Password
                            <input onChange={(e) => { setNewpassword(e.target.value) }} value={newpassword} type="text" id="password" required className=' mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='*************' />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="conpassword" className=' block tetx-sm font-medium text-gray-700 '>
                            Confirm Password
                            <input onChange={(e) => { setConpassword(e.target.value) }} value={conpassword} type="text" id="conpassword" required className=' mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='*************' />
                        </label>
                    </div>

                    <button disabled={loading} className=' w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer'>
                        {loading ? <ClipLoader size={30} color='white' /> : "Reset Password"}
                    </button>

                </form>

                <div onClick={() => navigate('/login')} className=' text-sm text-center mt-4 cursor-pointer '>
                    Back to Login
                </div>
            </div>}

        </div>
    )
}

export default ForgatePassword