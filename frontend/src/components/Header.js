import styled from "styled-components";
import logoImg from '../images/icons/logo.png'
import notificationImg from '../images/icons/notification.svg'
import openUserMenuImg from '../images/icons/open_user_menu.svg'
import { useNavigate } from "react-router-dom";

const Container = styled.div`
position: fixed;
display: flex;
align-items: center;
justify-content: space-around;
width: 100%;
height: 48px;
background-color: #222222;
border-bottom: 1px solid #292929;
z-index: 10;
`

const LogoContainer = styled.div`
cursor: pointer;
display: flex;
gap: 12px;
align-items: center;
height: 24px;
`

const Logo = styled.img`
height: 100%;
`

const LogoText = styled.span`

`

const SearchBarContainer = styled.div`
width: 230px;
height: 32px;
border-radius: 8px;
background-color: #424242;
`

const NotificationContainer = styled.div`
width: 24px;
height: 24px;
`

const NotificationImg = styled.img`
width: 100%;
`

const UserMenuContainer = styled.div`
display: flex;
align-items: center;
gap: 8px;
width: 52px;
height: 32px;
`

const UserImg = styled.div` // Will be styled.img, needs to add src
width: 32px;
height: 32px;
background-color: white;
border-radius: 50%;
`

const OpenUserMenu = styled.img`
width: 12px;
height: 8px;
`

const Header = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <LogoContainer onClick={() => navigate('/feed')}>
        <Logo src={logoImg} alt="logoImg"></Logo>
        <LogoText>Social Network</LogoText>
      </LogoContainer>
      <SearchBarContainer></SearchBarContainer>
      <NotificationContainer>
        <NotificationImg src={notificationImg} alt="notificationImg"></NotificationImg>
      </NotificationContainer>
      <UserMenuContainer>
        <UserImg></UserImg>
        <OpenUserMenu src={openUserMenuImg} alt="openUserMenu"></OpenUserMenu>
      </UserMenuContainer>
    </Container>
  )
}

export default Header;