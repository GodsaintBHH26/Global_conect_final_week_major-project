import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import messageRoutes from "./routes/messageRoute.js";
import jobRoutes from "./routes/jobRoute.js";
import postRoutes from "./routes/postRoute.js";
import { socketHandler } from "./controllers/messageController.js";
// NECESSARY IMPORTS FOR FILE UPLOAD
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [`http://localhost:5173`,`https://global-conect-final-week-major-proj.vercel.app/`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connectDB();

// --- START OF FILE UPLOAD/STATIC CONFIGURATION ---

// ES Module compatibility for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Target folder: public/uploads
    cb(null, path.join(__dirname, "public/uploads"));
  },
  filename: (req, file, cb) => {
    // Unique file name
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use("/public", express.static(path.join(__dirname, "public")));

// POST route for file uploads (FIXES 404 ON /upload)
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ error: "No file selected or invalid file type." });
  } // Construct the accessible URL path
  const filePath = `/public/uploads/${req.file.filename}`;
  res.status(200).json({ filePath });
});

// --- END OF FILE UPLOAD/STATIC CONFIGURATION ---

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/posts", postRoutes); // Target for http://localhost:3000/api/posts

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

socketHandler(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`The server is running on : http://localhost:${PORT}`);
});
