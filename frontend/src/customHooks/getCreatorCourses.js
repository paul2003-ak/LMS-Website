import axios from 'axios'
import React, { useEffect } from 'react'
import { serverurl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setCreaterCourseData } from '../redux/Course.silce'

const useGetCreatorCourses = () => {
    const { userData } = useSelector(state => state.user)

    const dispatch = useDispatch()

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

}

export default useGetCreatorCourses