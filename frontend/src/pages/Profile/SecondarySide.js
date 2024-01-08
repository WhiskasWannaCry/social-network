import styled from "styled-components";

const Container = styled.div`
width: 40%;
`

const FriendsContainer = styled.div`
display: flex;
flex-direction: column;
height: 215px;
padding: 20px;
border-radius: 12px;
background-color: #292929;
box-shadow: 0px 0px 0px 1px #363738 inset;
`

const FriendsTitle = styled.span`
color: #E1E3E6;
font-family: Roboto;
font-size: 13.781px;
font-style: normal;
font-weight: 500;
`

const SecondarySide = () => {
  return (
    <Container>
      <FriendsContainer>
        <FriendsTitle>Friends</FriendsTitle>
      </FriendsContainer>
    </Container>
  )
}

export default SecondarySide;