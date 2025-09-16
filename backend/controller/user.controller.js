import usermodel from "../model/user.model.js";


export const getUser = async (req, res) => {
    try{
        const userid= req.userId;
        if(!userid){
            return res.status(401).json({message: "Unauthorized access"});
        }
        const user = await usermodel.findById(userid).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "get current user error "},error);
    }
}