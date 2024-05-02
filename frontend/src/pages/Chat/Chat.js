import ChatSideBar from "./ChatSideBar";
import ChatMessages from "./ChatMessages";
import { connectToSocket } from "../../shared/SocketFunctions";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../shared/Context";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const { Box, styled, useTheme } = require("@mui/material");

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

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

  const [msgSendStatusText, setMsgSendStatusText] = useState(null);

  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

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
    socketConnectState.on("remove-private-message", (data) => {
      if (!data) {
        return alert("Something wrong at remove-private-message Effect");
      }

      const { success } = data;
      if (!success) {
        const { message } = data;
        console.log(message);
        return alert(message);
      }

      const { chat } = data;
      setMessages(chat.messages);
      setReplyMessage(null);
    });
    return () => {
      setMessages([]);
      setSelectedChat(null);
      setReplyMessage(null);
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
      <Drawer
        open={openDrawer}
        onClose={handleDrawerClose}
        sx={{
          "& .css-4t3x6l-MuiPaper-root-MuiDrawer-paper": {
            backgroundColor: (theme) => theme.palette.primary.grey[5],
          },
        }}
      >
        <Typography
          sx={{
            width: "100%",
            padding: "12px",
            color: "#71aaeb",
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: 500,
          }}
        >
          Chats
        </Typography>
        <Box
          sx={{ width: 250, backgroundColor: "red" }}
          role="presentation"
          onClick={handleDrawerClose}
        >
          <Box // Container for set "display: none" for MOBILE SideBar
            sx={{
              display: {
                xl: "none",
                lg: "none",
                md: "flex",
                sm: "flex",
                xs: "flex",
              },
            }}
          >
            <ChatSideBar // FOR MOBILE
              chatsLoading={chatsLoading}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              setMessages={setMessages}
              handleDrawerClose={handleDrawerClose}
            ></ChatSideBar>
          </Box>
        </Box>
      </Drawer>
      <Box // Container for set "display: none" for PC SideBar
        sx={{
          display: {
            xl: "flex",
            lg: "flex",
            md: "none",
            sm: "none",
            xs: "none",
          },
        }}
      >
        <ChatSideBar // FOR PC
          chatsLoading={chatsLoading}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          setMessages={setMessages}
        ></ChatSideBar>
      </Box>
      <ChatMessages
        replyMessage={replyMessage}
        setReplyMessage={setReplyMessage}
        chatsLoading={chatsLoading}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        messages={messages}
        setMessages={setMessages}
        msgSendStatusText={msgSendStatusText}
        setMsgSendStatusText={setMsgSendStatusText}
        openDrawer={openDrawer}
        handleDrawerOpen={handleDrawerOpen}
      ></ChatMessages>
    </Box>
  );
};

export default Chat;
