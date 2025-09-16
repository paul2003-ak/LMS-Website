import validator from "validator";
import usermodel from "../model/user.model.js";


export const signup = async (req, res) => {
    try{
        const {name,email,password,role}=req.body;

        let existuser=await usermodel.findOne({email});
        if(existuser){
            return res.status(400).json({message: "User already exists"});
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({message: "Invalid email format"});
        }

        if(password.length < 8){
            return res.status(400).json({message: "Password must be at least 8 characters long"});
        }

        const hashpassword=await usermodel.hashpassword(password);

        const user=await usermodel.create({
            name,
            email,
            password: hashpassword,
            role
        });

        const token=await user.generatetoken();
        res.cookie("token",token,{
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        return res.status(201).json({user,token});

    }catch(error){
        console.error("Signup error:", error);
        return res.status(500).json({message: "Internal server error"},error);
    }
}



export const login= async (req, res) => {
    try{
        const {email,password}=req.body;

        let user=await usermodel.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const isPasswordValid=await user.comparepassword(password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Incorrect password"});
        }

        const token=await user.generatetoken();
        res.cookie("token",token,{
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        return res.status(200).json({user,token});

    }catch(error){
        console.error("Login error:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}


export const logout = async (req, res) => {
    try{
        await res.clearCookie("token")
        return res.status(200).json({message: "Logged out successfully"});
    }catch(error){
        console.error("Logout error:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}


//GOOGLE LOGIN 
export const GoogleLogIn=async(req,res)=>{
    try{
        const{name,email,role}=req.body;
        let user=await usermodel.findOne({email})
        if(!user){
            user=await usermodel.create({name,email,role});
        }
        
        const token=await user.generatetoken();

        res.cookie("token",token,{
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        return res.status(200).json({user,token});
    }catch(error){
        return res.status(500).json({ message: `GoogleLogIn error ${error}` })
    }
}