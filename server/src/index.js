import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import messageRoutes from "./routes/messageRoute.js";
import jobRoutes from './routes/jobRoute.js'
import { socketHandler } from "./controllers/messageController.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);
app.use('/api/jobs', jobRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

socketHandler(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`The server is running on : http://localhost:${PORT}`);
});
