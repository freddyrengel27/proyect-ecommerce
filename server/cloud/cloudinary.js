
import cloudinary from "cloudinary";

const uploadCloud = async (direccion) =>{

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_CLOUD_KEY,
        api_secret: process.env.CLOUDINARY_CLOUD_SECRET
    });

    const upload = await cloudinary.uploader.upload(direccion);
    return upload;
};

export default uploadCloud;