import ChatSideBar from "./ChatSideBar";
import ChatMessages from "./ChatMessages";
import { connectToSocket } from "../../shared/SocketFunctions";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../shared/Context";
const { Box } = require("@mui/material");

const Chat = () => {
  const currentUserContext = useContext(Context);
  const { currentUser, socketConnectState, setChats } = currentUserContext;
  const [chatsLoading, setChatsLoading] = useState(true);

  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    socketConnectState.emit("get-all-user-chats", currentUser._id);
    socketConnectState.on("get-all-user-chats", (chatsData) => {
      setChats(chatsData);
      setChatsLoading(false);
    });
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
        setSelectedChat={setSelectedChat}
      ></ChatSideBar>
      <ChatMessages
        chatsLoading={chatsLoading}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      ></ChatMessages>
    </Box>
  );
};

export default Chat;
