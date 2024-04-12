import { Avatar, Box, Slide, Snackbar, Typography } from "@mui/material";

const NotifyMessage = ({ notifData, notifOpen, setNotifOpen }) => {
  console.log(notifData);
  const handleClose = () => {
    setNotifOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: "12px",
        width: "250px",
        minHeight: "60px",
        // backgroundColor: (theme) => theme.palette.primary.grey[4],
        // border: (theme) => `1px solid ${theme.palette.primary.grey[3]}`,
        borderRadius: "8px",
        padding: "8px",
        boxSizing: "border-box",
      }}
    >
      <Avatar
        title="avatar"
        src={`http://localhost:8000/${notifData.senderData.images.avatar}`}
      ></Avatar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "250px",
          height: "100%",
          wordWrap: "break-word",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography>
          {notifData.senderData.primary.name +
            " " +
            notifData.senderData.primary.surname}
        </Typography>
        <Typography
          sx={{
            width: "200px",
            boxSizing: "border-box",
            fontSize: "12px",
          }}
        >
          {notifData.lastMessageData.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default NotifyMessage;
