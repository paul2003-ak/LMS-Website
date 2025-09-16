import axios from 'axios'
import React, { useEffect } from 'react'
import { serverurl } from '../App'
import { useDispatch } from 'react-redux'
import { setuserData } from '../redux/userslice'

const useGetCurrentuser = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const result = await axios.get(serverurl + '/api/user/getuser', { withCredentials: true });

        dispatch(setuserData(result.data));
        console.log(result.data);
      } catch (err) {
        console.log(err)
        dispatch(setuserData(null));
      }
    }
    fetchuser();
  }, [])
}

export default useGetCurrentuser