const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { Chat } = require("./models");
const socketIO = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const CONNECTED_USERS = [];
let CHATS = [];

const senderId = "65ddbe18e8009fb8cf0e1fe6";
const recipientId = "65ddce40e8009fb8cf0e1fff";

const message1 = {
  text: "Привет, как дела?",
  id: "1",
  date: new Date(),
  sender: senderId,
  recipient: recipientId,
};

const message2 = {
  text: "Привет! Всё хорошо, спасибо! А у тебя?",
  id: "2",
  date: new Date(),
  sender: recipientId,
  recipient: senderId,
};

const getAllChats = async (userId) => {
  try {
    CHATS = [];
    const chats = await Chat.find({
      $or: [{ sender: userId }, { recipient: userId }],
    })
      .limit(100)
      .populate({
        path: "sender",
        select: "-secret",
      })
      .populate({
        path: "recipient",
        select: "-secret",
      })
      .populate({
        path: "messages.sender",
        select: "-secret",
      })
      .populate({
        path: "messages.recipient",
        select: "-secret",
      })
      .exec();
    CHATS.push(...chats);
  } catch (e) {
    console.error(e);
  }
};

socketIO.on("connect", (socket) => {
  // Когда юзер подключился
  console.log(`${socket.id} connected`);

  socket.on("get-all-chats", async (userId) => {
    await getAllChats(userId);
    socket.emit("get-all-chats", CHATS);
  });

  // Когда юзер отключился
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});

const startSocketServer = () => {
  try {
    server.listen(9000, () => {
      console.log("Socket server listening on port 9000");
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = startSocketServer;
