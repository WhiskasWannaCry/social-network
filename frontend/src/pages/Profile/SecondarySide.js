import styled from "styled-components";
import addFriendsImg from '../../images/icons/add_friends.svg'

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
width: 100%;
color: #E1E3E6;
font-family: Roboto;
font-size: 13.781px;
font-style: normal;
font-weight: 500;
`

const NoneFriendsContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
`

const NoneFriendsTitle = styled.span`
color: #828282;
text-align: center;
font-family: Roboto;
font-size: 13.563px;
font-style: normal;
font-weight: 400;
`

const AddFriendsContainer = styled.div`
display: flex;
align-items: center;
gap: 6px;
margin-top: 20px;
height: 24px;
width: 50%;
`

const AddFriendsImg = styled.img`
width: 24px;
height: 24px;
`

const AddFriendsText = styled.span`
color: #E1E3E6;
text-align: center;
font-family: Roboto;
font-size: 13.891px;
font-style: normal;
font-weight: 500;
`

const SecondarySide = () => {
  return (
    <Container>
      <FriendsContainer>
        <FriendsTitle>Friends</FriendsTitle>
        <NoneFriendsContainer>
          <NoneFriendsTitle>You don't have any friends yet</NoneFriendsTitle>
          <AddFriendsContainer>
            <AddFriendsImg src={addFriendsImg} alt="addFriendsImg"></AddFriendsImg>
            <AddFriendsText>Add friends</AddFriendsText>
          </AddFriendsContainer>
        </NoneFriendsContainer>
      </FriendsContainer>
    </Container>
  )
}

export default SecondarySide;