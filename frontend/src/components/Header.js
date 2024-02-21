import logoImg from "../images/icons/logo.png";
import notificationImg from "../images/icons/notification.svg";
import openUserMenuImg from "../images/icons/open_user_menu.svg";
import { useNavigate } from "react-router-dom";
import { Context } from "../shared/Context";
import { useContext } from "react";
import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import styled from "@emotion/styled";

const OuterContainer = styled("div")`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  background-color: ${({ theme }) => theme.palette.primary.grey[5]};
  border-bottom: 1px solid #292929;
  z-index: 10;
  width: 100%;
`;

const Container = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: 1248px;
  height: 100%;
`;

const LogoContainer = styled("div")`
  cursor: pointer;
  display: flex;
  gap: 12px;
  align-items: center;
  height: 24px;
`;

const Logo = styled("img")`
  height: 100%;
`;

const LogoText = styled("span")`
  color: ${({ theme }) => theme.palette.primary.grey[1]};
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchBarContainer = styled("div")`
  width: 230px;
  height: 32px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.primary.grey[3]};
`;

const NotificationContainer = styled("div")`
  width: 24px;
  height: 24px;
`;

const NotificationImg = styled("img")`
  width: 100%;
`;

const UserMenuContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 52px;
  height: 32px;
`;

const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.grey[3]};
  }
`;

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const currentUserContext = React.useContext(Context);
  const { currentUser, setCurrentUser, userInit } = currentUserContext;

  const avatarFullPath = `http://localhost:8000/${currentUser.images.avatar}`;

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setCurrentUser(userInit);
    localStorage.setItem("token", JSON.stringify({ value: "0" }));
    navigate("/login");
  };

  return (
    <OuterContainer>
      <Container>
        <LogoContainer onClick={() => navigate("/feed")}>
          <Logo src={logoImg} alt="logoImg"></Logo>
          <LogoText>Social Network</LogoText>
        </LogoContainer>
        <SearchBarContainer></SearchBarContainer>
        <NotificationContainer>
          <NotificationImg
            src={notificationImg}
            alt="notificationImg"
          ></NotificationImg>
        </NotificationContainer>
        <UserMenuContainer>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleClick} sx={{ p: 0 }}>
                <Avatar
                  id="fade-button"
                  aria-controls={open ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  alt="user-avatar"
                  src={(currentUser.images.avatar && avatarFullPath) || null}
                  sx={{
                    width: "32px",
                    height: "32px",
                    border: (theme) =>
                      "1px solid" + theme.palette.primary.grey[5],
                  }}
                ></Avatar>
              </IconButton>
            </Tooltip>
          </Box>

          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
              sx: {
                backgroundColor: (theme) => theme.palette.primary.grey[4],
                padding: 0,
              },
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <StyledMenuItem
              onClick={() => {
                handleClose();
                navigate(`profile/${currentUser._id}`);
              }}
            >
              Profile
            </StyledMenuItem>
            <StyledMenuItem onClick={handleClose}>Settings</StyledMenuItem>
            <StyledMenuItem
              onClick={() => {
                handleClose();
                handleLogout();
              }}
            >
              Logout
            </StyledMenuItem>
          </Menu>
        </UserMenuContainer>
      </Container>
    </OuterContainer>
  );
};

export default Header;
