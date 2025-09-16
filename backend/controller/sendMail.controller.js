import { sendMail } from "../config/sendMail.js";
import usermodel from "../model/user.model.js";


export const sendOtp = async (req, res) => {
    try{
        const {email}= req.body;

        const user=await usermodel.findOne({email});

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

        user.resetOtp=otp;
        user.otpExpire = new Date(Date.now() + 5 * 60 * 1000); // Set OTP expiry to 5 minutes from now
        user.isOtpVerified=false;

        await user.save();

        await sendMail(email, otp);

        return res.status(200).json({message: "OTP sent to your email"});

    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Error generating OTP"}, error);
    }
}

export const verifyOtp = async (req, res) => {
    try{
        const {email, otp} = req.body;

        const user=await usermodel.findOne({email});

        if(!user || user.resetOtp !== otp || user.otpExpire < Date.now() ){
            return res.status(404).json({message: "Invalid OTP"});
        }

        user.isOtpVerified=true;
        user.resetOtp=undefined;
        user.otpExpire = undefined;

        await user.save();

        return res.status(200).json({message: "OTP verified successfully"});

    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Error verifying OTP"}, error);
    }
}


export const resetPassword = async (req, res) => {
    try{
        const {email,password} = req.body;

        const user=await usermodel.findOne({email});

        if(!user || !user.isOtpVerified){
            return res.status(404).json({message: "OTP verification is required"});
        }
        
        const hashpassword=await usermodel.hashpassword(password);
        user.password = hashpassword;
        user.isOtpVerified = false; // Reset OTP verification status

        await user.save();
        return res.status(200).json({message: "Password reset successfully"});
    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Error resetting password"}, error);
    }
}