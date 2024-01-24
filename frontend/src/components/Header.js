import styled from "styled-components";
import logoImg from "../images/icons/logo.png";
import notificationImg from "../images/icons/notification.svg";
import openUserMenuImg from "../images/icons/open_user_menu.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeToDark, changeToLight } from "../shared/themeSlice";

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 48px;
  background-color: ${(props) => props.theme.mainBlockBg};
  border-bottom: 1px solid #292929;
  z-index: 10;
`;

const LogoContainer = styled.div`
  cursor: pointer;
  display: flex;
  gap: 12px;
  align-items: center;
  height: 24px;
`;

const Logo = styled.img`
  height: 100%;
`;

const LogoText = styled.span`
  color: ${(props) => props.theme.mainTextColor};
`;

const SearchBarContainer = styled.div`
  width: 230px;
  height: 32px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.mainBg};
`;

const NotificationContainer = styled.div`
  width: 24px;
  height: 24px;
`;

const NotificationImg = styled.img`
  width: 100%;
`;

const UserMenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 52px;
  height: 32px;
`;

const UserImg = styled.div`
  // Will be styled.img, needs to add src
  width: 32px;
  height: 32px;
  background-color: white;
  border-radius: 50%;
`;

const OpenUserMenu = styled.img`
  width: 12px;
  height: 8px;
`;

const ChangeThemeContainer = styled.div`
  cursor: pointer;
  position: relative;
  width: 64px;
  height: 32px;
  border-radius: 12px;
  padding: 4px;
  background-color: ${(props) =>
    props.theme.mainBg === "#dce1e6" ? "rgba(42, 88, 133, 0.13)" : "#E1E3E6"};
  border: ${(props) => props.theme.mainBlockBorder};
  transition: background-color 0.3s;
`;

const ChangeBtn = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => (props.theme.mainBg === "#dce1e6" ? 0 : "50%")};
  width: 50%;
  height: 100%;
  border-radius: 50%;
  background-color: ${(props) =>
    props.theme.mainBg === "#dce1e6" ? "#FFFFFF" : "#222222"};
  transition: left 0.3s;
`;

const Header = () => {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  const invertTheme = () => {
    theme.title === "dark"
      ? dispatch(changeToLight())
      : dispatch(changeToDark());
  };
  const navigate = useNavigate();
  return (
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
      {/* <ChangeThemeContainer onClick={invertTheme}>
        <ChangeBtn theme={theme}></ChangeBtn>
      </ChangeThemeContainer> */}
      <UserMenuContainer>
        <UserImg></UserImg>
        <OpenUserMenu src={openUserMenuImg} alt="openUserMenu"></OpenUserMenu>
      </UserMenuContainer>
    </Container>
  );
};

export default Header;
