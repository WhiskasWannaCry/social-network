import ChatSideBar from "./ChatSideBar";
import ChatMessages from "./ChatMessages";
import { connectToSocket } from "../../shared/SocketFunctions";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../shared/Context";
const { Box } = require("@mui/material");

const Chat = () => {
  const currentUserContext = useContext(Context);
  const {
    currentUser,
    socketConnectState,
    setChats,
    selectedChat,
    setSelectedChat,
  } = currentUserContext;
  const [chatsLoading, setChatsLoading] = useState(true);

  const [messages, setMessages] = useState(null);

  const [replyMessage, setReplyMessage] = useState(null);

  // Effects

  useEffect(() => {
    socketConnectState.emit("get-all-user-chats", currentUser._id);
    socketConnectState.on("get-all-user-chats", (chatsData) => {
      setChats(chatsData);
      setChatsLoading(false);
    });
    return () => {
      setChats([]);
      setSelectedChat(null);
    };
  }, []);

  useEffect(() => {
    document.title = "Chats";
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "90vh",
      }}
    >
      <ChatSideBar
        chatsLoading={chatsLoading}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        setMessages={setMessages}
      ></ChatSideBar>
      <ChatMessages
        replyMessage={replyMessage}
        setReplyMessage={setReplyMessage}
        chatsLoading={chatsLoading}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        messages={messages}
        setMessages={setMessages}
      ></ChatMessages>
    </Box>
  );
};

export default Chat;
