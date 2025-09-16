import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    role:{
        type: String,
        enum: ['student', 'educator'],
        required: true,
    },
    photoUrl:{
        type: String,
        default: ""
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],

    resetOtp:{
        type: String,
    },

    otpExpire:{
        type: Date,
    },
    isOtpVerified:{
        type: Boolean,
        default: false
    },

},{timestamps: true});


userSchema.statics.hashpassword=async function(password){
    return await bcrypt.hash(password,10);
}
userSchema.methods.generatetoken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    return token;
}

userSchema.methods.comparepassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

const usermodel = mongoose.model('User', userSchema);
export default usermodel;