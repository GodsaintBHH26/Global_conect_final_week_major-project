import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatId: { type: String }, // e.g., sorted combination of sender_receiver ids
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String },
  media:{type: String},
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

export default mongoose.model("Message", messageSchema);
