import { io } from "socket.io-client";
import crypto from "crypto";

const arijitID = "68d7448c12b5db15296b3f4b";
const bobID = "68d8ec98393a21d3a96b2dd7";

const generateChatId = (userA, userB) => {
  const combined = [userA, userB].sort().join("_");
  const hashedID = crypto.createHash("md5").update(combined).digest("hex");
  return hashedID;
};

const chatId = generateChatId(arijitID, bobID);

const arijit = io("http://localhost:3000");
arijit.on("connect", () => {
  console.log("Arijit connected: ", arijit.id);

  arijit.emit("joinRoom", chatId);

  setTimeout(() => {
    arijit.emit("sendMessage", {
      senderId: arijitID,
      receiverId: bobID,
      content: "Hey buddy 👋",
    });
  }, 1000);
});

arijit.on("receiveMessage", (msg) => {
  console.log("Arijit recived a message 📥", msg);
});

const bob = io("http://localhost:3000");
bob.on("connect", () => {
  console.log("Bob connected: ", bob.id);

  bob.emit("joinRoom", chatId);

  setTimeout(() => {
    bob.emit("sendMessage", {
      senderId: bobID,
      receiverId: arijitID,
      content: "Hey, how is it going? 😁",
    });
  }, 2000);
});

bob.on("recieveMessage", (msg) => {
  console.log("Bob received a message: ", msg);
});
