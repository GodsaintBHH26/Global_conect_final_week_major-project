import multer from "multer";
import cloudinary from "./cloudinary.js";
import streamifier from "streamifier";

// storage rules
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Function to upload to cloudinary
export const uploadToCloudinary = (file, req) => {
  return new Promise((resolve, reject) => {
    let folder = "global_connect";
    if (req.baseUrl.includes("/user")) folder = "global_connect/user";
    if (req.baseUrl.includes("/messages")) folder = "global_connect/messages";
    if (req.baseUrl.includes("/posts")) folder = "global_connect/posts";

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};
