import multer from "multer";
import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";


dotenv.config();

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: "uploads",
        format: async(req,file)=> "png",
        public_id: (req, file) => file.originalname.split(".")[0] + ""
    }
})

// assigning storage to multer to store the file
const cloudinaryFileUploader = multer({ storage: storage });

export default cloudinaryFileUploader;