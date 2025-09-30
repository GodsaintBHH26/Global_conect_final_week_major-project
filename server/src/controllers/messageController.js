import Message from "../models/Message.js";
import crypto from "crypto";

// Function that handles the message sending ------------------->
export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    socket.on("joinRoom", (chatId) => {
      socket.join(chatId);
      console.log(`User ${socket.id} joined room ${chatId}`);
    });

    socket.on(
      "sendMessage",
      async ({ senderId, receiverId, content, media }) => {
        try {
          const newMessage = await Message.create({
            senderId,
            receiverId,
            content,
            media,
          });
          io.to(newMessage.chatId).emit("receiveMessage", newMessage);
        } catch (error) {
          console.error("Error saving message", error);
          socket.emit("errorMessage", { error: "Could not send message" });
        }
      }
    );

    socket.on("markAsRead", async ({ chatId, userId }) => {
      try {
        await Message.updateMany(
          { chatId, receiverId: userId, read: false },
          { $set: { read: true } }
        );
        io.to(chatId).emit("messageRead", { chatId, userId });
      } catch (error) {
        console.log("Error marking messages as read", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
};

// Function to send messages -----|POST: api/messages/|------------->
export const postMessages = async (req, res) => {
  const { receiverId, content, media } = req.body;
  try {
    const senderId = req.user.uid;
    if (!senderId) return res.status(400).json({ msg: "Not authorized 🚫" });
    const newMessage = await Message.create({
      senderId,
      receiverId,
      content,
      media,
    });
    res.status(201).json({ newMessage });
  } catch (error) {
    res.status(500).json({ error: "Error sending the message" });
  }
};

// Function to fetch the chat history of two user -------------|GET: api/messages/:sender/:reciever|------------->
export const getChatHistory = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const combined = [senderId, receiverId].sort().join("_");
    const chatId = crypto.createHash("md5").update(combined).digest("hex");

    const messages = await Message.find({ chatId })
      .select("content timestamp")
      .sort({ createdAt: -1 })
      .populate("senderId", "name")
      .populate("receiverId", "name");
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the messages" });
  }
};
