import { useContext, useState } from "react";
import { Context } from "../../shared/Context";
import userImg from "../../images/posts_img/avatar.png";
import { PageLoader } from "../../shared/Loaders";

const { Box, Avatar, Typography } = require("@mui/material");

const ChatSideBar = ({ chats, chatsLoading, setSelectedChat }) => {
  const currentUserContext = useContext(Context);
  const { currentUser, socketConnectState } = currentUserContext;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "30%",
        height: "100%",
        backgroundColor: (theme) => theme.palette.primary.grey[5],
        borderRadius: "12px 0 0 12px",
        border: (theme) => `1px solid ${theme.palette.primary.grey[3]}`,
      }}
    >
      {chatsLoading ? (
        <PageLoader></PageLoader>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              height: "42px",
              width: "100%",
              borderBottom: (theme) =>
                `1px solid ${theme.palette.primary.grey[3]}`,
            }}
          ></Box>
          {chats.map((chat) => {
            const { _id, sender, recipient, messages } = chat;
            const sortedMessages = messages.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            const lastMessage = sortedMessages[0];
            const {
              sender: lastMessageSender,
              date: lastMessageDate,
              text: lastMessageText,
            } = lastMessage;
            const avatarFullPath = `http://localhost:8000/${lastMessageSender.images.avatar}`;
            const formattedDate = new Date(lastMessageDate);
            const day = formattedDate.getDate();
            const monthName = formattedDate.toLocaleString("default", {
              month: "short",
            });
            return (
              <Box
                key={`Container + ${_id}`}
                onClick={() => setSelectedChat(chat)}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  width: "100%",
                  padding: "8px",
                  gap: "8px",
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.grey[3],
                  },
                }}
              >
                <Avatar titie={"user-avatar"} src={avatarFullPath}></Avatar>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "70%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.primary.grey[1],
                        fontFamily: "Roboto",
                        fontSize: "13px",
                        fontStyle: "normal",
                        fontWeight: 500,
                      }}
                    >
                      {lastMessageSender.primary.name +
                        " " +
                        lastMessageSender.primary.surname}
                    </Typography>
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.primary.grey[3],
                        fontFamily: "Roboto",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                      }}
                    >
                      {day + " " + monthName}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      width: "100%",
                      color: (theme) => theme.palette.primary.grey[2],
                      fontFamily: "Roboto",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {lastMessageText}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </>
      )}
    </Box>
  );
};

export default ChatSideBar;
