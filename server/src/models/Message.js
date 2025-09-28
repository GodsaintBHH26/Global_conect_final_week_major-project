import mongoose from "mongoose";
import crypto from "crypto";

const messageSchema = new mongoose.Schema(
  {
    chatId: { type: String }, // e.g., sorted combination of sender_receiver ids
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String },
    media: { type: String },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

messageSchema.pre("save", function (next) {
  const combined = [this.senderId.toString(), this.receiverId.toString()]
    .sort()
    .join("_");
  const hashedID = crypto.createHash("md5").update(combined).digest("hex");
  this.chatId = hashedID;
  next();
});

export default mongoose.model("Message", messageSchema);
