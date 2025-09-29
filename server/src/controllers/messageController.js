import Message from "../models/Message.js";

/**
 * POST /api/messages/
 * body: { receiverId, content }
 */
export const sendMessage = async (req, res) => {
    try {
      const { receiverId, content } = req.body;
      const mediaUrl = req.file ? req.file.path : undefined;
  
      const ids = [req.user._id.toString(), receiverId].sort();
      const chatId = `${ids[0]}_${ids[1]}`;
  
      const msg = await Message.create({
        chatId,
        senderId: req.user._id,
        receiverId,
        content,
        media: mediaUrl
      });
  
      res.status(201).json(msg);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

/**
 * GET /api/messages/:sender/:receiver
 */
export const getChatHistory = async (req, res) => {
  try {
    const { sender, receiver } = req.params;
    const ids = [sender, receiver].sort();
    const chatId = `${ids[0]}_${ids[1]}`;
    const messages = await Message.find({ chatId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
