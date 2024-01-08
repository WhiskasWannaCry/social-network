import styled from "styled-components";
import MainSide from "./MainSide";
import SecondarySide from "./SecondarySide";

const Container = styled.div`
width: 60%;
`

const UserHeaderContainer = styled.div`
position: relative;
width: 100%;
height: 322px;
background-color: #222;
border-radius: 12px;
border: 1px solid #363738;
`

const UserBody = styled.div`
display: flex;
gap: 24px;
margin-top: 16px;
width: 100%;
`

const Profile = () => {
  return (
    <Container>
      <UserHeaderContainer></UserHeaderContainer>
      <UserBody>
        <MainSide></MainSide>
        <SecondarySide></SecondarySide>
      </UserBody>
    </Container>
  )
}

export default Profile;