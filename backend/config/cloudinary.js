import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs';

export const uploadonCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        if (!filePath) {
            return null;
        }

        const uploadresult = await cloudinary.uploader.upload(filePath, { resource_type: 'auto' })
        fs.unlinkSync(filePath); // Delete the file after uploading...
        return uploadresult.secure_url;

    } catch (error) {
        fs.unlinkSync(filepath); // Delete the file in case of error
        console.log(`Error uploading to Cloudinary: ${error.message}`);
    }
}