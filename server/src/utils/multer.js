import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

// storage rules
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "global_connect";
    if (req.baseUrl.includes("/users")) folder = "global_connect/users";
    if (req.baseUrl.includes("/posts")) folder = "global_connect/posts";
    if (req.baseUrl.includes("/messages")) folder = "global_connect/messages";

    return {
      folder,
      resource_type: "auto", // auto = image/video/pdf
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
      format: undefined, // keep original format
    };
  },
});

export const upload = multer({ storage });

