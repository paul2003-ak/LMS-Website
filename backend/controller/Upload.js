//Edit profile

import { uploadonCloudinary } from "../config/cloudinary.js";
import usermodel from '../model/user.model.js'

export const updateprofile = async (req, res) => {
    try {
        const userid = req.userId;
        const { description, name } = req.body;
        let photourl
        if (req.file) {
            photourl = await uploadonCloudinary(req.file.path)
        }

        const user = await usermodel.findByIdAndUpdate(userid, { name, description, photoUrl: photourl }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });

    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ message: "Update profile error" }, error);
    }
}