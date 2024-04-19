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
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
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

const AutoCompleteTheme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "30px",
          padding: "0 12px 0 8px !important",
        },
        input: {
          height: "30px !important",
          padding: "0 !important",
          color: "#E1E3E6",
          fontSize: "12px",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          height: "30px",
          "& label": { display: "none" },
        },
      },
    },
    // Имя компонента MuiAutocomplete
    MuiAutocomplete: {
      styleOverrides: {
        // Слот root
        root: {
          // Настройка стилей
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "8px",
          width: "200px",
          padding: 0,
        },
        listbox: {
          backgroundColor: "#222222",
        },
        option: {
          fontSize: "12px",
          "&: hover": {
            backgroundColor: "rgb(232 232 232 / 77%)",
          },
        },
        loading: {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  },
});

const Header = () => {
  const [openAutoComplete, setOpenAutoComplete] = useState(false);
  const [dataOptions, setDataOptions] = useState([]);
  const [unreadMsgCounter, setUnreadMsgCounter] = useState(0);

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
    chats,
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
    }
  }, [connectedUsers, currentUser]);

  useEffect(() => {
    if (socketConnectState) {
      socketConnectState.on("get-connected-users", (CONNECTED_USERS) => {
        setConnectedUsers(CONNECTED_USERS);
      });
    }
  }, [socketConnectState]);

  // Notification counter
  useEffect(() => {
    if (chats && chats.length) {
      let counter = 0;
      chats.forEach((chat) => {
        return (counter += chat.messages.filter(
          (message) =>
            message.read === false && message.sender._id !== currentUser._id
        ).length);
      });
      setUnreadMsgCounter(counter);
      // console.log(chats)
    }
  }, [chats]);

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
      const { success } = data;
      if (success && active) {
        const { users } = data;
        setDataOptions([...users]);
      }
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
        <ThemeProvider theme={AutoCompleteTheme}>
          <Autocomplete
            open={openAutoComplete}
            onOpen={() => {
              setOpenAutoComplete(true);
            }}
            onClose={() => {
              setOpenAutoComplete(false);
            }}
            getOptionLabel={(selectUser) =>
              //
              selectUser.primary.name + " " + selectUser.primary.surname  
            }
            isOptionEqualToValue={
              (optionUser, value) => optionUser._id === value._id
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
                    <Box>
                      {load ? (
                        <CircularProgress
                          color="primary"
                          size={30}
                        ></CircularProgress>
                      ) : null}
                      {params.inputProps.endAdorment}
                    </Box>
                  ),
                }}
              ></TextField>
            )}
          ></Autocomplete>
        </ThemeProvider>

        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={unreadMsgCounter}
          sx={{
            "& .MuiBadge-badge": {
              width: "14px",
              height: "14px",
              backgroundColor: "#44b700",
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
            src={notificationImg}
            sx={{
              width: "32px",
              height: "32px",
              border: (theme) => "1px solid" + theme.palette.primary.grey[5],
            }}
          ></Avatar>
        </Badge>

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
