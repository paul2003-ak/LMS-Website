import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import useGetCurrentuser from './customHooks/getCurrentuser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgatePassword from './pages/ForgatePassword'
import EditProfile from './pages/EditProfile'
import Dashboard from './pages/Educator/Dashboard'
import Courses from './pages/Educator/Courses'
import Createcourses from './pages/Educator/Createcourses'
import useGetCreatorCourses from './customHooks/getCreatorCourses'
import Editcourse from './pages/Educator/Editcourse'
import useGetPublicCourse from './customHooks/getPublicCourse'
import AllCourses from './pages/AllCourses'
import CreateLecture from './pages/Educator/CreateLecture'
import EditLEcture from './pages/Educator/EditLEcture'
import ViewCourse from './pages/ViewCourse'

export const serverurl = "http://localhost:8000"

const App = () => {
  useGetCurrentuser()
  useGetCreatorCourses()
  useGetPublicCourse()

  const { userData } = useSelector(state => state.user)
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={!userData ? <Signup /> : <Navigate to={"/"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={userData ? <Profile /> : <Navigate to={"/signup"} />} />
        <Route path="/forgotpassword" element={<ForgatePassword />} />
        <Route path="/editprofile" element={userData ? <EditProfile /> : <Navigate to={"/signup"} />} />
        <Route path="/allcourses" element={userData ? <AllCourses /> : <Navigate to={"/signup"} />} />

        <Route path="/dashboard" element={userData?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"} />} />
        <Route path="/couses" element={userData?.role === "educator" ? <Courses /> : <Navigate to={"/signup"} />} />
        <Route path="/createcouse" element={userData?.role === "educator" ? <Createcourses /> : <Navigate to={"/signup"} />} />
        <Route path="/editcourse/:courseId" element={userData?.role === "educator" ? <Editcourse /> : <Navigate to={"/signup"} />} />


        <Route path="/createlecture/:courseId" element={userData?.role === "educator" ? <CreateLecture /> : <Navigate to={"/signup"} />} />


        <Route path="/editlecture/:courseId/:lectureId" element={userData?.role === "educator" ? <EditLEcture /> : <Navigate to={"/signup"} />} />

        <Route path="/viewcourse/:courseId" element={userData?.role === "educator" ? <ViewCourse /> : <Navigate to={"/signup"} />} />

      </Routes>
    </>
  )
}

export default App