import styled from '@emotion/styled'
import addFriendsImg from '../../images/icons/add_friends.svg'

const Container = styled("div")`
display: flex;
flex-direction: column;
gap: 16px;
width: 40%;
`

const FriendsContainer = styled("div")`
position: sticky;
top: 72;
display: flex;
flex-direction: column;
height: 215px;
padding: 20px;
border-radius: 12px;
background-color: ${({theme}) => theme.palette.primary.grey[5]};
border: 1px solid ${({theme}) => theme.palette.primary.grey[3]};
`

const ContainerTitle = styled("span")`
width: 100%;
color: ${({theme}) => theme.palette.primary.grey[1]};
font-family: Roboto;
font-size: 13.781px;
font-style: normal;
font-weight: 500;
`

const NoneFriendsContainer = styled("div")`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
`

const NoneFriendsTitle = styled("span")`
color: #828282;
text-align: center;
font-family: Roboto;
font-size: 13.563px;
font-style: normal;
font-weight: 400;
`

const AddFriendsContainer = styled("div")`
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
gap: 6px;
padding: 8px 16px 8px 16px;
margin-top: 20px;
width: 100%;
border-radius: 8px;
&:hover {
  background-color: ${({theme}) => theme.palette.primary.grey[4]};
}
`

const AddFriendsImg = styled("img")`
width: 24px;
height: 24px;
`

const AddFriendsText = styled("span")`
color: #E1E3E6;
text-align: center;
font-family: Roboto;
font-size: 13.891px;
font-style: normal;
font-weight: 500;
`

const FriendsRequestsContainer = styled("div")`
position: sticky;
top: 287;
display: flex;
flex-direction: column;
height: 215px;
padding: 20px;
border-radius: 12px;
background-color: ${({theme}) => theme.palette.primary.grey[5]};
border: 1px solid ${({theme}) => theme.palette.primary.grey[3]};
`

const SecondarySide = () => {
  return (
    <Container>
      <FriendsContainer>
        <ContainerTitle>Friends</ContainerTitle>
        <NoneFriendsContainer>
          <NoneFriendsTitle>You don't have any friends yet</NoneFriendsTitle>
          <AddFriendsContainer>
            <AddFriendsImg src={addFriendsImg} alt="addFriendsImg"></AddFriendsImg>
            <AddFriendsText>Add friends</AddFriendsText>
          </AddFriendsContainer>
        </NoneFriendsContainer>
      </FriendsContainer>
      <FriendsRequestsContainer>
        <ContainerTitle>Friends requests</ContainerTitle>
      </FriendsRequestsContainer>
    </Container>
  )
}

export default SecondarySide;