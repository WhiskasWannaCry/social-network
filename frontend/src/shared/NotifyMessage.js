import { Avatar, Box, Slide, Snackbar, Typography } from "@mui/material";

const NotifyMessage = ({ notifData, notifOpen, setNotifOpen }) => {
  const handleClose = () => {
    setNotifOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={notifOpen}
      onClose={handleClose}
      autoHideDuration={3200}
      TransitionComponent={Slide}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "12px",
          width: "250px",
          height: "100px",
          backgroundColor: (theme) => theme.palette.primary.grey[4],
          border: (theme) => `1px solid ${theme.palette.primary.grey[3]}`,
          borderRadius: "8px",
          padding: "8px",
        }}
      >
        <Avatar
          title="avatar"
          src={`http://localhost:8000/${notifData.senderData.images.avatar}`}
        ></Avatar>
        <Box
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Typography>
            {notifData.senderData.primary.name +
              " " +
              notifData.senderData.primary.surname}
          </Typography>
          <Typography>{notifData.lastMessageData.text}</Typography>
        </Box>
      </Box>
    </Snackbar>
  );
};

export default NotifyMessage;
