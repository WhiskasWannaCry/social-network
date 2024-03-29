import logoImg from "../images/icons/logo.png";
import notificationImg from "../images/icons/notification.svg";
import openUserMenuImg from "../images/icons/open_user_menu.svg";
import { useNavigate } from "react-router-dom";
import { Context } from "../shared/Context";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import {
  Autocomplete,
  Avatar,
  Badge,
  Box,
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import styled from "@emotion/styled";
import { connectToSocket } from "../shared/SocketFunctions";
import { getUsersInfo } from "../http/Fetches";

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
  -webkit-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  -moz-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
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
  const [openAutoComplete, setOpenAutoComplete] = useState(false);
  const [dataOptions, setDataOptions] = useState([]);
  const load = openAutoComplete && dataOptions.length === 0;

  const [anchorEl, setAnchorEl] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const navigate = useNavigate();
  const currentUserContext = useContext(Context);
  const {
    currentUser,
    setCurrentUser,
    userInit,
    socketConnectState,
    setSocketConnectState,
    connectedUsers,
    setConnectedUsers,
  } = currentUserContext;

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
    socketConnectState.disconnect();
    setSocketConnectState(null);
    navigate("/login");
  };

  useEffect(() => {
    if (currentUser?._id) {
      const isConnUser =
        connectedUsers.findIndex(
          (connUser) => connUser.userId === currentUser._id
        ) !== -1;
      if (isConnUser) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
      // console.log(isConnProfOwner)
      // console.log(connectedUsers);
    }
  }, [connectedUsers, currentUser]);

  useEffect(() => {
    if (socketConnectState) {
      socketConnectState.on("get-connected-users", (CONNECTED_USERS) => {
        setConnectedUsers(CONNECTED_USERS);
      });
    }
  }, [socketConnectState]);

  const data = [
    {
      label: "JS",
    },
    {
      label: "JS",
    },
    {
      label: "JS",
    },
    {
      label: "JS",
    },
    {
      label: "JS",
    },
  ];

  function delaySleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  useEffect(() => {
    let active = true;

    if (!load) {
      return undefined;
    }

    (async () => {
      const { data } = await getUsersInfo();
      console.log(data);
      // await delaySleep(1e3);
      const { success } = data;
      if (success && active) {
        const { users } = data;
        setDataOptions([...users]);
      }

      // if (active) {
      //   setDataOptions([...data]);
      // }
    })();
    return () => {
      active = false;
    };
  }, [load]);

  useEffect(() => {
    if (!open) {
      setDataOptions([]);
    }
  }, [open]);

  return (
    <OuterContainer>
      <Container>
        <LogoContainer onClick={() => navigate("/feed")}>
          <Logo src={logoImg} alt="logoImg"></Logo>
          <LogoText>Social Network</LogoText>
        </LogoContainer>
        {/* <SearchBarContainer></SearchBarContainer> */}
        <Autocomplete
          filterOptions={(x) => x}
          open={openAutoComplete}
          onOpen={() => {
            setOpenAutoComplete(true);
          }}
          onClose={() => {
            setOpenAutoComplete(false);
          }}
          getOptionLabel={(selectUser) =>
            selectUser.primary.name + " " + selectUser.primary.surname
          }
          isOptionEqualToValue={
            (optionUser) =>
              // option._id === value._id
              optionUser._id
            // console.log(optionUser)
          }
          loading={load}
          options={dataOptions}
          onChange={(event, optionUserData) => {
            if (optionUserData) {
              navigate(`profile/${optionUserData._id}`);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search a user"
              inputProps={{
                ...params.inputProps,
                endadorment: (
                  <div>
                    {load ? (
                      <CircularProgress
                        color="primary"
                        size={30}
                      ></CircularProgress>
                    ) : null}
                    {params.inputProps.endAdorment}
                  </div>
                ),
              }}
            ></TextField>
          )}
          sx={{
            display: "flex",
            height: "100%",
            width: "20%",
            "& input": {
              color: (theme) => theme.palette.primary.grey[2],
            },
            "& label": {
              display: "none",
              color: (theme) => theme.palette.primary.grey[2],
            },
            "& .MuiFormControl-root": {
              display: "flex",
              justifyContent: "center",

              bgcolor: (theme) => theme.palette.primary.grey[3],
              borderRadius: "8px",
            },
            "& .MuiAutocomplete-root": {
              height: "80%",
            },
            "& .MuiInputBase-root": {},
            "& .MuiAutocomplete-inputRoot": {
              display: "flex",
              position: "relative",
            },
            "& .MuiAutocomplete-input": {
              padding: "0",
            },
          }}
        ></Autocomplete>
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
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#44b700",
                      // color: "#44b700",
                      boxShadow: (theme) =>
                        `0 0 0 1px ${theme.palette.primary.grey[1]}`,
                    },
                  }}
                >
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
                </Badge>
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
