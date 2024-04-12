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

const getAllUserChats = async (userId) => {
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
    return chats;
  } catch (e) {
    console.error(e);
  }
};

const getPrivateChat = async (userId, recipient) => {
  const foundChat = await Chat.findOne({
    $or: [
      { sender: userId, recipient },
      { sender: recipient, recipient: userId },
    ],
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
  return foundChat;
};

socketIO.on("connect", (socket) => {
  // Когда юзер подключился
  console.log(`${socket.id} connected`);

  const { userId } = socket.handshake.query;

  const findUserInConnList = () => {
    return CONNECTED_USERS.find((connUser) => connUser.userId === userId);
  };

  const userInList = findUserInConnList();

  // Если юзера еще нет в списке подключенных, то пушим нового
  if (!userInList) {
    const connectedUser = {
      userId,
      socketId: socket.id,
    };
    CONNECTED_USERS.push(connectedUser);
  }
  // Если юзер уже есть в списке подключенных, то меняем сокет айди и пушим
  if (userInList) {
    const userInListIdx = CONNECTED_USERS.findIndex(
      (connUser) => connUser.userId === userId
    );
    const newUser = {
      userId,
      socketId: socket.id,
    };
    CONNECTED_USERS.splice(userInListIdx, 1, newUser);
  }
  // console.log(userId);
  // console.log(CONNECTED_USERS);

  socketIO.emit("get-connected-users", CONNECTED_USERS);

  // Когда юзер вошел в чат и получает чаты по своему айди
  socket.on("get-all-user-chats", async (userId) => {
    const chats = await getAllUserChats(userId);
    socket.emit("get-all-user-chats", chats);
  });

  socket.on("get-connected-users", () => {
    socket.emit("get-connected-users", CONNECTED_USERS);
    // console.log(CONNECTED_USERS);
  });

  // Когда юзер прислал приватное сообщение
  socket.on(
    "send-private-message",
    async ({ userId, newMessage, recipient }) => {
      // Формирую сообщение в вид по схеме
      newMessage.id = newMessage.date;
      newMessage.sender = userId;
      newMessage.recipient = recipient;
      newMessage.date = new Date(newMessage.date);
      newMessage.read = false;

      // Ищу получателя в списке подключенных
      const connRecipient = CONNECTED_USERS.find(
        (connUser) => connUser.userId === recipient
      );
      try {
        const foundChat = await getPrivateChat(userId, recipient);
        if (foundChat) {
          foundChat.messages.push(newMessage);
          await foundChat.save();
          const chat = await getPrivateChat(userId, recipient);
          const senderChats = await getAllUserChats(userId);
          const recipientChats = await getAllUserChats(recipient);
          // Если получатель не подключен то слать сообщение только отправителю
          if (!connRecipient) {
            socketIO.to(socket.id).emit("send-private-message", {
              success: true,
              chat,
              allUserChats: senderChats,
            });
          }
          // Если получатель подключен то слать сообщение и отправителю и получателю
          if (connRecipient) {
            let senderData;
            if (chat.sender._id.toString() === userId) {
              senderData = chat.sender;
            }
            if (chat.recipient._id.toString() === userId) {
              senderData = chat.recipient;
            }
            socketIO.to(socket.id).emit("send-private-message", {
              success: true,
              chat,
              allUserChats: senderChats,
            });
            socketIO.to(connRecipient.socketId).emit("send-private-message", {
              success: true,
              chat,
              allUserChats: recipientChats,
            });

            socketIO
              .to(connRecipient.socketId)
              .emit("last-message-for-notification", {
                success: true,
                senderData,
                lastMessageData: newMessage,
              });
          }
        }
        if (!foundChat) {
          await Chat.create({
            sender: userId,
            recipient,
            messages: [newMessage],
          });
          const chat = await getPrivateChat(userId, recipient);
          socketIO
            .to(socket.id)
            .emit("send-private-message", { success: true, chat });
        }
      } catch (e) {
        console.error("Error on send-private-message: ", e);
        socketIO.to(socket.id).emit("send-private-message", {
          success: false,
          message: "Caught error on send-private-message",
        });
      }
    }
  );

  // Когда юзер нажал кнопку "Написать сообщение" в профиле
  socket.on("open-chat-with-user", async ({ userId, recipient }) => {
    try {
      const chat = await getPrivateChat(userId, recipient);
      if (!chat) {
        await Chat.create({
          sender: userId,
          recipient,
          messages: [],
        });
      }
      const foundChat = await getPrivateChat(userId, recipient);
      const senderChats = await getAllUserChats(userId);
      const recipientChats = await getAllUserChats(recipient);
      // Ищу получателя в списке подключенных
      const connRecipient = CONNECTED_USERS.find(
        (connUser) => connUser.userId === recipient
      );
      // Если получатель не подключен то слать сообщение только отправителю
      if (!connRecipient) {
        socketIO.to(socket.id).emit("open-chat-with-user", {
          success: true,
          chat: foundChat,
          allUserChats: senderChats,
        });
      }
      // Если получатель подключен то слать сообщение и отправителю и получателю
      if (connRecipient) {
        socketIO.to(socket.id).emit("open-chat-with-user", {
          success: true,
          chat: foundChat,
          allUserChats: senderChats,
        });
        socketIO.to(connRecipient.socketId).emit("open-chat-with-user", {
          success: true,
          chat: foundChat,
          allUserChats: recipientChats,
        });
      }
    } catch (e) {
      console.error(e);
      socketIO.to(socket.id).emit("open-chat-with-user", {
        success: false,
        message: "Caught error on open-chat-with-user",
      });
    }
  });

  // Когда юзер прочитал сообщения
  socket.on("send-read-status", async ({ unreadMessages, chatId, userId }) => {
    try {
      const foundChat = await Chat.findOne({ _id: chatId })
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

      let recipient;
      if (foundChat.sender._id.toString() === userId) {
        recipient = foundChat.recipient._id;
      }
      if (foundChat.recipient._id.toString() === userId) {
        recipient = foundChat.sender._id;
      }
      console.log(recipient);
      foundChat.messages.map((message) => {
        if (
          message.read === false &&
          message.sender._id.toString() !== userId
        ) {
          message.read = true;
        }
      });

      await foundChat.save();

      const senderChats = await getAllUserChats(userId);
      const recipientChats = await getAllUserChats(recipient);

      // Ищу получателя в списке подключенных
      const connRecipient = CONNECTED_USERS.find(
        (connUser) => connUser.userId === recipient._id.toString()
      );
      console.log(connRecipient);

      socketIO.to(socket.id).emit("send-read-status", {
        success: true,
        chat: foundChat,
        chats: senderChats,
      });

      if (connRecipient) {
        socketIO.to(connRecipient.socketId).emit("send-read-status", {
          success: true,
          chat: foundChat,
          chats: recipientChats,
        });
      }
    } catch (e) {
      console.error(e);
      socket.emit("send-read-status", { success: false, message: e });
    }
  });

  // Уведомление Когда юзер выполнил какое-либо действие связанное с socialContacts
  socket.on(
    "social-contacts-change",
    ({ senderData, message, recipientId }) => {
      // Ищу получателя в списке подключенных
      const connRecipient = CONNECTED_USERS.find(
        (connUser) => connUser.userId === recipientId
      );
      if (connRecipient) {
        socketIO.to(connRecipient.socketId).emit("social-contacts-change", {
          senderData,
          messageData: {
            text: message,
          },
        });
      }
    }
  );

  // Когда юзер отключился
  socket.on("disconnect", () => {
    try {
      const disconnectedUserIdx = CONNECTED_USERS.findIndex(
        (connUser) => connUser.socketId === socket.id
      );
      if (disconnectedUserIdx !== -1) {
        CONNECTED_USERS.splice(disconnectedUserIdx, 1);
      }
      console.log(`${socket.id} disconnected`);
      socketIO.emit("get-connected-users", CONNECTED_USERS);
      console.log(CONNECTED_USERS);
    } catch (e) {
      console.error(e);
    }
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
