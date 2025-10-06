import multer from "multer";
import path from "path";

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "global_connect/"); 
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });// save in  folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname) // e.g., 1696789091234.png
    );
  },
});

// // File filter (only images)
// const fileFilter = (req, file, cb) => {
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//     return cb(new Error("Only JPG, JPEG, PNG allowed"), false);
//   }
//   cb(null, true);
// };




// Allow all file types
const fileFilter = (req, file, cb) => {
  cb(null, true); // accept all files
};

const upload = multer({ storage, fileFilter });

export default upload;
