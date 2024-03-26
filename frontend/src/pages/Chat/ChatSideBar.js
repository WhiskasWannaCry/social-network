import { useContext, useEffect, useState } from "react";
import { Context } from "../../shared/Context";
import userImg from "../../images/posts_img/avatar.png";
import { PageLoader } from "../../shared/Loaders";

const { Box, Avatar, Typography } = require("@mui/material");

const ChatSideBar = ({ chatsLoading, setSelectedChat }) => {
  const currentUserContext = useContext(Context);
  const { currentUser, socketConnectState, chats } = currentUserContext;

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
            let lastMessage;
            let formattedDate;
            let day;
            let monthName;
            let avatarFullPath =
              sender._id === currentUser._id
                ? `http://localhost:8000/${recipient.images.avatar}`
                : `http://localhost:8000/${sender.images.avatar}`;
            if (messages.length) {
              lastMessage = messages.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
              )[0];

              formattedDate = new Date(messages[messages.length - 1].date);
              day = formattedDate.getDate();
              monthName = formattedDate.toLocaleString("default", {
                month: "short",
              });
            }
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
                      {sender._id === currentUser._id
                        ? recipient.primary.name +
                          " " +
                          recipient.primary.surname
                        : sender.primary.name + " " + sender.primary.surname}
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
                      {messages.length ? day + " " + monthName : null}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      width: "100%",
                      color: messages.length
                        ? (theme) => theme.palette.primary.grey[2]
                        : (theme) => theme.palette.primary.grey[3],
                      fontFamily: "Roboto",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {messages.length ? lastMessage.text : "No messages"}
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
