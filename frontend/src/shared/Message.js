import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import { PORT_SERVICE_ROOT, URL_SERVICES } from "./config";
import blueDone from "../images/icons/blue-done.png";
import grayDone from "../images/icons/gray-done.png";
import { useContext, useState } from "react";
import { Context } from "./Context";

const Message = ({ message }) => {
  const currentUserContext = useContext(Context);
  const { currentUser } = currentUserContext;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box // Box container for 1 message
      aria-controls={open ? "basic-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      onContextMenu={(e) => {
        e.preventDefault();
        handleClick(e);
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        border: (theme) => `1px solid ${theme.palette.primary.grey[3]}`,
        backgroundColor: (theme) => theme.palette.primary.grey[4],
        minHeight: "24px",
        minWidth: "64px",
        padding: "8px",
        borderRadius:
          message.sender._id === currentUser._id
            ? "8px 8px 0 8px"
            : "8px 8px 8px 0",
        wordWrap: "break-word",
        maxWidth: "80%",
        boxSizing: "border-box",
      }}
    >
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          "& ul": {
            backgroundColor: (theme) => theme.palette.primary.grey[4],
            border: (theme) => `1px solid ${theme.palette.primary.grey[3]}`,
          },
        }}
      >
        <MenuItem onClick={handleClose}>Reply</MenuItem>
        {message.sender._id === currentUser._id && (
          <MenuItem onClick={handleClose}>Remove</MenuItem>
        )}
      </Menu>
      <Box // Container for image and text
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {message.image ? (
          <Box
            sx={{
              display: "flex",
              // justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Avatar
              src={`${URL_SERVICES}:${PORT_SERVICE_ROOT}/${message.image}`}
              alt="message-image"
              sx={{
                borderRadius: "12px",
                width: "100%",
                height: "auto",
                maxHeight: "300px",
              }}
            ></Avatar>
          </Box>
        ) : null}
        <Typography
          sx={{
            display: "flex",
            justifyContent:
              message.sender._id === currentUser._id
                ? "flex-end"
                : "flex-start",
            // maxWidth: "100%",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 500,
          }}
        >
          {message.text}
        </Typography>
      </Box>

      <Box // Box for date and read status
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "2px",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
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
        <Box></Box>
        <Avatar
          alt="readStatus"
          src={message.read ? blueDone : grayDone}
          variant="square"
          sx={{
            width: "10px",
            height: "10px",
          }}
        ></Avatar>
      </Box>
    </Box>
  );
};

export default Message;
