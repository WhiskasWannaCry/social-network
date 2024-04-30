import { Avatar, Box, Button, Typography } from "@mui/material";
import { PORT_SERVICE_ROOT, URL_SERVICES } from "./config";

const NotifyMessage = ({ notifData }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: "12px",
        width: "250px",
        minHeight: "60px",
        // backgroundColor: (theme) => theme.palette.primary.grey[3],
        // border: (theme) => `1px solid ${theme.palette.primary.grey[3]}`,
        borderRadius: "8px",
        padding: "8px",
        boxSizing: "border-box",
      }}
    >
      <Avatar
        title="avatar"
        src={`${URL_SERVICES}:${PORT_SERVICE_ROOT}/${notifData?.senderData?.images.avatar}`}
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
        <Typography
          sx={{
            color: "#71aaeb",
            fontSize: "14px",
          }}
        >
          {notifData?.senderData?.primary.name +
            " " +
            notifData?.senderData?.primary.surname}
        </Typography>
        <Typography
          sx={{
            width: "200px",
            boxSizing: "border-box",
            fontSize: "12px",
            fontWeight: notifData?.type === "default" ? 0 : 700,
          }}
        >
          {notifData.messageData.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default NotifyMessage;
