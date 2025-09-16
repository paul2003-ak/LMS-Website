import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userslice.js'
import CourseSilce from './Course.silce.js';
import LectureSlice from './LectureSlice.js';

export const store=configureStore({
    reducer:{
        user:userSlice,
        course:CourseSilce,
        lecture:LectureSlice
    }
})