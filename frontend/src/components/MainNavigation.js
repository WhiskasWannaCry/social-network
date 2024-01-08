import styled from "styled-components";
import profileImg from '../images/icons/Navigation_icons/Profile.svg'
import messagesImg from '../images/icons/Navigation_icons/Messages.svg'
import friendsImg from '../images/icons/Navigation_icons/Friends.svg'
import photosImg from '../images/icons/Navigation_icons/Photos.svg'
import newsImg from '../images/icons/Navigation_icons/News.svg'

const Container = styled.div`
display: flex;
flex-direction: column;
width: 15%;
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
width: 100%;
height: 28px;
padding: 8px;
border-radius: 8px;
&:hover {
  background-color: #292929;
}
`

const NavImg = styled.img`
width: 20px;
`

const NavText = styled.span`
color: #E1E3E6;
font-family: Roboto;
font-size: 13px;
font-style: normal;
font-weight: 400;
margin-left: 10px;
`

const HR = styled.div`
width: 80%;
height: 1px;
background-color: #363738;
`

const MainNavigation = () => {
  return (
    <Container>
      <NavBar>
        <NavBtnContainer>
          <NavImg src={profileImg} alt="navImg"></NavImg>
          <NavText>Profile</NavText>
        </NavBtnContainer>
        <NavBtnContainer>
          <NavImg src={newsImg} alt="navImg"></NavImg>
          <NavText>News</NavText>
        </NavBtnContainer>
        <NavBtnContainer>
          <NavImg src={messagesImg} alt="navImg"></NavImg>
          <NavText>Messages</NavText>
        </NavBtnContainer>
        <NavBtnContainer>
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