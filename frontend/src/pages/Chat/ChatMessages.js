import { useContext, useEffect, useState } from "react";
import { PageLoader } from "../../shared/Loaders";
import { Context } from "../../shared/Context";

const {
  Box,
  Typography,
  FormControl,
  OutlinedInput,
  Input,
  Button,
} = require("@mui/material");

const ChatMessages = ({ chatsLoading, selectedChat, setSelectedChat }) => {
  const currentUserContext = useContext(Context);
  const { currentUser, socketConnectState, chats, setChats } =
    currentUserContext;
  const [inputMessageText, setInputMessageText] = useState("");
  const [isValidText, setIsValidText] = useState(false);

  function validateMessage(message) {
    const regex = /^\S[\s\S]{0,254}$/;
    if (regex.test(message)) {
      setIsValidText(true);
    } else {
      setIsValidText(false);
    }
  }

  const handleSendMessageBtn = () => {
    const newMessage = {
      date: new Date(),
      text: inputMessageText,
    };

    // EFFECT
    // useEffect(() => {

    // },[])

    // SOCKET

    socketConnectState.emit("send-private-message", {
      userId: currentUser._id,
      newMessage,
      recipient:
        selectedChat.recipient._id === currentUser._id
          ? selectedChat.sender._id
          : selectedChat.recipient._id,
    });
    setInputMessageText("");
  };

  socketConnectState.on("send-private-message", (data) => {
    const { success } = data;
    if (!success) {
      const { message } = data;
      return alert(message);
    }
    const { chat, allUserChats } = data;
    setSelectedChat(chat);
    console.log(allUserChats);
    setChats(allUserChats);
  });

  socketConnectState.on("open-chat-with-user", (data) => {
    console.log(data);
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "70%",
        // height: "100%",
        backgroundColor: (theme) => theme.palette.primary.grey[5],
        borderRadius: "0 12px 12px 0",
        borderTop: (theme) => `1px solid ${theme.palette.primary.grey[3]}`,
        borderRight: (theme) => `1px solid ${theme.palette.primary.grey[3]}`,
        borderBottom: (theme) => `1px solid ${theme.palette.primary.grey[3]}`,
      }}
    >
      {chatsLoading ? (
        <PageLoader></PageLoader>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              minHeight: "42px",
              width: "100%",
              borderBottom: (theme) =>
                `1px solid ${theme.palette.primary.grey[3]}`,
            }}
          ></Box>
          {selectedChat ? (
            <>
              {selectedChat.messages.length ? (
                <Box // Box for messages
                  sx={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    flexGrow: 1,
                    gap: "12px",
                    width: "100%",
                    padding: "12px",
                    overflowY: "scroll",
                  }}
                >
                  {selectedChat.messages
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((message) => (
                      <Box // Line Container for 1 message
                        key={`MsgContainer-${message._id}`}
                        sx={{
                          display: "flex",
                          justifyContent:
                            message.sender._id === currentUser._id
                              ? "flex-end"
                              : "flex-start",
                        }}
                      >
                        <Box // Box container for 1 message
                          sx={{
                            border: (theme) =>
                              `1px solid ${theme.palette.primary.grey[3]}`,
                            backgroundColor: (theme) =>
                              theme.palette.primary.grey[4],
                            minHeight: "24px",
                            minWidth: "48px",
                            padding: "8px",
                            borderRadius:
                              message.sender._id === currentUser._id
                                ? "8px 8px 0 8px"
                                : "8px 8px 8px 0",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Roboto",
                              fontSize: "13px",
                              fontStyle: "normal",
                              fontWeight: 500,
                            }}
                          >
                            {message.text}
                          </Typography>
                          <Box // Box for date
                            sx={{
                              display: "flex",
                              width: "100%",
                            }}
                          ></Box>
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent:
                                message.sender._id === currentUser._id
                                  ? "flex-end"
                                  : "flex-start",
                              color: (theme) => theme.palette.primary.grey[3],
                              fontFamily: "Roboto",
                              fontSize: "10px",
                              fontStyle: "normal",
                              fontWeight: 500,
                            }}
                          >
                            {new Date(message.date).getHours() +
                              ":" +
                              new Date(message.date).getMinutes()}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                </Box>
              ) : (
                <Box // Box for empty chat
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.primary.grey[3],
                      fontFamily: "Roboto",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                    }}
                  >
                    Enter Your first message
                  </Typography>
                </Box>
              )}
              <Box //Container for message input and send button
                sx={{
                  display: "flex",
                  gap: "12px",
                  width: "100%",
                  height: "84px",
                  borderTop: (theme) =>
                    `1px solid ${theme.palette.primary.grey[3]}`,
                  backgroundColor: (theme) => theme.palette.primary.grey[4],
                  borderRadius: "0 0 12px 0",
                  padding: "12px",
                }}
              >
                <Input
                  placeholder="Enter your message"
                  value={inputMessageText}
                  onChange={(e) => {
                    validateMessage(e.target.value);
                    setInputMessageText(e.target.value);
                  }}
                  sx={{
                    display: "flex",
                    width: "100%",
                    color: (theme) => theme.palette.primary.grey[1],
                    border: (theme) =>
                      `1px solid ${theme.palette.primary.grey[3]}`,
                    padding: "8px",
                    borderRadius: "8px",
                    fontFamily: "Roboto",
                    fontSize: "13px",
                    fontStyle: "normal",
                    fontWeight: 500,
                  }}
                ></Input>
                <Button
                  variant="contained"
                  disabled={!isValidText}
                  onClick={handleSendMessageBtn}
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.grey[3],
                    color: (theme) => theme.palette.primary.grey[1],
                  }}
                >
                  Send
                </Button>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                // height: "100%",
              }}
            >
              <svg
                width="57"
                height="69"
                viewBox="0 0 57 69"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.8491 10.9307C14.3691 10.9307 7.87909 16.8507 7.87909 23.7307C7.87909 26.2007 8.69909 28.5207 10.1291 30.4707C10.3238 30.7303 10.4291 31.0461 10.4291 31.3707C10.4291 33.0007 9.99909 34.5907 9.46909 36.0407C9.11303 36.9878 8.72277 37.9218 8.29909 38.8407C11.6091 38.5107 13.7991 37.4407 15.0991 35.8807C15.3008 35.6418 15.5722 35.4719 15.8752 35.3948C16.1782 35.3177 16.4977 35.3373 16.7891 35.4507C18.7256 36.1819 20.7791 36.5547 22.8491 36.5507C31.3191 36.5407 37.8191 30.6107 37.8191 23.7307C37.8191 16.8607 31.3191 10.9307 22.8491 10.9307ZM4.87909 23.7307C4.87909 14.8307 13.1191 7.93066 22.8491 7.93066C32.5691 7.93066 40.8191 14.8107 40.8191 23.7307C40.8191 32.6607 32.5691 39.5407 22.8491 39.5407C20.6791 39.5407 18.5991 39.2107 16.6791 38.5907C14.4191 40.7307 11.1291 41.7707 7.07909 41.9307C6.70928 41.9397 6.34315 41.8554 6.01456 41.6855C5.68598 41.5156 5.40554 41.2655 5.1992 40.9585C4.99285 40.6515 4.86726 40.2974 4.83403 39.9289C4.8008 39.5605 4.86101 39.1897 5.00909 38.8507L5.42909 37.9007C5.85909 36.9407 6.28909 36.0007 6.64909 35.0007C7.05909 33.8907 7.33909 32.8207 7.40909 31.8207C5.76833 29.445 4.88621 26.6278 4.87909 23.7407V23.7307Z"
                  fill="#828282"
                />
                <path
                  d="M43.8291 19.7006C43.7165 19.8627 43.6371 20.0454 43.5953 20.2383C43.5534 20.4311 43.5501 20.6303 43.5854 20.8245C43.6207 21.0186 43.694 21.2039 43.801 21.3697C43.908 21.5355 44.0467 21.6785 44.2091 21.7906C47.6491 24.1706 49.7591 27.7706 49.7591 31.7406C49.7591 34.2106 48.9491 36.5206 47.5091 38.4706C47.3144 38.7303 47.2091 39.0461 47.2091 39.3706C47.2091 41.0006 47.6391 42.5906 48.1691 44.0406C48.5191 45.0006 48.9391 45.9606 49.3391 46.8406C46.0291 46.5106 43.8391 45.4406 42.5391 43.8806C42.3374 43.6418 42.066 43.4719 41.763 43.3948C41.46 43.3177 41.1405 43.3372 40.8491 43.4506C38.9126 44.1819 36.8591 44.5547 34.7891 44.5506C31.8091 44.5506 29.0391 43.7906 26.7091 42.5206C26.3617 42.3448 25.9595 42.311 25.5876 42.4263C25.2156 42.5417 24.9031 42.7971 24.7161 43.1387C24.5291 43.4802 24.4823 43.8811 24.5855 44.2565C24.6887 44.632 24.9338 44.9526 25.2691 45.1506C27.6556 46.4315 30.2755 47.219 32.9727 47.4664C35.6699 47.7138 38.3894 47.416 40.9691 46.5906C43.2191 48.7306 46.5091 49.7706 50.5591 49.9306C50.9289 49.9397 51.295 49.8554 51.6236 49.6855C51.9522 49.5155 52.2326 49.2655 52.439 48.9585C52.6453 48.6514 52.7709 48.2973 52.8042 47.9289C52.8374 47.5605 52.7772 47.1896 52.6291 46.8506L52.2091 45.9006C51.7691 44.9406 51.3491 44.0006 50.9891 43.0006C50.5875 41.9816 50.3317 40.9111 50.2291 39.8206C51.8699 37.445 52.752 34.6278 52.7591 31.7406C52.7591 26.6406 50.0391 22.1806 45.9191 19.3206C45.757 19.2081 45.5743 19.1286 45.3814 19.0868C45.1886 19.045 44.9894 19.0416 44.7952 19.0769C44.6011 19.1122 44.4158 19.1855 44.25 19.2925C44.0842 19.3995 43.9412 19.5382 43.8291 19.7006Z"
                  fill="#828282"
                />
              </svg>

              <Typography
                sx={{
                  color: (theme) => theme.palette.primary.grey[3],
                  fontFamily: "Roboto",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 500,
                }}
              >
                {chats.length ? "Select a chat" : "You don't have any chats"}
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ChatMessages;
