import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverurl } from '../App';
import { setuserData } from '../redux/userslice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const EditProfile = () => {
    const navigate = useNavigate()
    const { userData } = useSelector(state => state.user)

    const [name, setName] = useState(userData.name || "")
    const [bio, setBio] = useState(userData.description || "")
    const [photourl, setPhotourl] = useState(null)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", bio);
    formData.append("photoUrl", photourl);

    const handleEditProfile = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const result = await axios.post(serverurl + '/api/upload/upload', formData, { withCredentials: true })
            dispatch(setuserData(result.data)) // Update user data in Redux store
            setLoading(false)
            navigate('/profile')
            toast.success("Profile updated successfully")
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
            console.log(error)
        }
    }

    return (
        <div className=' min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10 '>
            <div className=' bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative '>
                <FaArrowLeftLong onClick={() => navigate('/profile')} className=' absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer ' />

                <h2 className=' text-2xl font-bold text-center text-gray-800 mb-6 '>Edit Profile</h2>
                <form onSubmit={handleEditProfile} action="" className=' space-y-5 '>

                    <div className=' flex flex-col items-center text-center '>

                        {userData.photoUrl ?
                            <img src={userData.photoUrl} className=' w-24 h-24 rounded-full object-cover border-4 border-[black]' alt="" />
                            :
                            <div className='  w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white '>
                                {userData?.name?.slice(0, 1).toUpperCase()}
                            </div>
                        }
                    </div>

                    <div >
                        <label htmlFor="image" className='  text-sm font-medium text-gray-700 '>Select Avatar</label>
                        <input
                            onChange={(e) => setPhotourl(e.target.files[0])}
                            type="file"
                            name="photoUrl"
                            placeholder='PhotoUrl'
                            accept='image/*'
                            className=' cursor-pointer w-full px-4 py-2 border rounded-md text-sm ' id='image' />
                    </div>

                    <div >
                        <label htmlFor="name" className=' text-sm font-medium text-gray-700 '>UserName</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder={userData.name}
                            className=' w-full px-4 py-2 border rounded-md text-sm '
                            id='name' />
                    </div>

                    <div >
                        <label htmlFor="email" className=' text-sm font-medium text-gray-700 '>Email</label>
                        <input
                            readOnly type="email"
                            placeholder={userData.email}
                            className=' w-full px-4 py-2 border rounded-md text-sm '
                            id='email' />
                    </div>

                    <div >
                        <label htmlFor="bio" className=' text-sm font-medium text-gray-700 '>Bio</label>
                        <textarea
                            onChange={(e) => setBio(e.target.value)}
                            value={bio}
                            name="description"
                            placeholder="Tell us about yourself"
                            rows={3}
                            className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-[black] '
                            id='bio' />
                    </div>

                    <button disabled={loading}
                        className=' w-full bg-[black] active:bg-[#454545] text-white py-2 rounded-md font-medium translate cursor-pointer '>
                        {loading ? <ClipLoader size={30} color='white' /> : " Save Changes"}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default EditProfile