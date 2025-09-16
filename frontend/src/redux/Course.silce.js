import { createSlice } from "@reduxjs/toolkit";

const courseSlice= createSlice({
    name: "course",
    initialState: {
        createrCourseData:[],
        courseData:null,
        selectedCourse:null
    },

    reducers:{
        setCreaterCourseData:(state, action) => {
            state.createrCourseData = action.payload;
        },
        setCourseData:(state, action) => {
            state.courseData = action.payload;
        },
        setSelectedCourse:(state, action) => {
            state.selectedCourse = action.payload;
        }
    }
})

export const { setCreaterCourseData } = courseSlice.actions;
export const { setCourseData } = courseSlice.actions;
export const { setSelectedCourse } = courseSlice.actions;
export default courseSlice.reducer;