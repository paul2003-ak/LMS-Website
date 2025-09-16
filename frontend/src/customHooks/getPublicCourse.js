import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCourseData } from "../redux/Course.silce";
import { serverurl } from "../App";

const useGetPublicCourse = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getPublicCourse = async () => {
      try {
        const result = await axios.get(serverurl + "/api/course/getpublish", {
          withCredentials: true,
        });
        console.log(result.data);
        dispatch(setCourseData(result.data));
      } catch (error) {
        console.error(error);
      }
    };

    getPublicCourse();
  }, []); 
};

export default useGetPublicCourse;