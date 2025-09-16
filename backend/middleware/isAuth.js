import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
    try{
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({message: "Unauthorized access"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message: "Invalid token"});
        }

        req.userId=decoded._id;
        next();
    }catch(err){
        console.error("Authentication error:", err);
        return res.status(500).json({message: "Internal server error"});
    }
}