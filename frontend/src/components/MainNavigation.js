import styled from "styled-components";
import profileImg from '../images/icons/Navigation_icons/Profile.svg'
import messagesImg from '../images/icons/Navigation_icons/Messages.svg'
import friendsImg from '../images/icons/Navigation_icons/Friends.svg'
import photosImg from '../images/icons/Navigation_icons/Photos.svg'
import newsImg from '../images/icons/Navigation_icons/News.svg'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../shared/Context";

const Container = styled.div`
display: flex;
flex-direction: column;
width: 15%;
@media (max-width: 768px) {
  width: 10%;
}
`

const NavBar = styled.nav`
display: flex;
flex-direction: column;
gap: 12px;
width: 100%;
`

const NavBtnContainer = styled.div`
cursor: pointer;
display: flex;
align-items: center;
gap: 10px;
width: 100%;
height: 28px;
padding: 8px;
border-radius: 8px;
&:hover {
  background: ${(props) => props.theme.hoverBtnBg};
}
`

const NavImg = styled.img`
width: 20px;
`

const NavText = styled.span`
color: ${(props) => props.theme.mainTextColor};
font-family: Roboto;
font-size: 13px;
font-style: normal;
font-weight: 400;
@media (max-width: 768px) {
  display: none;
}
`

const NavNotificationCounter = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${(props) => props.theme.grayBlockBg};
font-family: Roboto;
font-size: 13px;
font-style: normal;
font-weight: 400;
padding: 4px;

`

const HR = styled.div`
width: 80%;
height: 1px;
background-color: #363738;
`

const MainNavigation = () => {
  const navigate = useNavigate()
  const currentUserContext = useContext(Context)
  const {currentUser,setCurrentUser} = currentUserContext;
  return (
    <Container>
      <NavBar>
        <NavBtnContainer onClick={() => navigate(`profile/${currentUser._id}`)}>
          <NavImg src={profileImg} alt="navImg"></NavImg>
          <NavText>Profile</NavText>
        </NavBtnContainer>
        <NavBtnContainer onClick={() => navigate('/feed')}>
          <NavImg src={newsImg} alt="navImg"></NavImg>
          <NavText>Feed</NavText>
        </NavBtnContainer>
        <NavBtnContainer>
          <NavImg src={messagesImg} alt="navImg"></NavImg>
          <NavText>Messages</NavText>
          <NavNotificationCounter>5</NavNotificationCounter>
        </NavBtnContainer>
        <NavBtnContainer onClick={() => navigate('/friends')}>
          <NavImg src={friendsImg} alt="navImg"></NavImg>
          <NavText>Friends</NavText>
        </NavBtnContainer>
        <NavBtnContainer>
          <NavImg src={photosImg} alt="navImg"></NavImg>
          <NavText>Photos</NavText>
        </NavBtnContainer>
        <HR></HR>
      </NavBar>
    </Container>
  )
}

export default MainNavigation;