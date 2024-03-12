import styled from "@emotion/styled";
import addFriendsImg from "../../images/icons/add_friends.svg";
import { useContext, useEffect } from "react";
import { Context } from "../../shared/Context";
import UserCardForProfile from "../../shared/UserCardForProfile";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 40%;
`;

const FriendsContainer = styled("div")`
  position: sticky;
  top: 72;
  display: flex;
  flex-direction: column;
  height: 215px;
  padding: 20px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.primary.grey[5]};
  border: 1px solid ${({ theme }) => theme.palette.primary.grey[3]};
  -webkit-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  -moz-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
`;

const ContainerTitle = styled("span")`
  width: 100%;
  color: ${({ theme }) => theme.palette.primary.grey[1]};
  font-family: Roboto;
  font-size: 13.781px;
  font-style: normal;
  font-weight: 500;
`;

const NoneFriendsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const NoneFriendsTitle = styled("span")`
  color: #828282;
  text-align: center;
  font-family: Roboto;
  font-size: 13.563px;
  font-style: normal;
  font-weight: 400;
`;

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
    background-color: ${({ theme }) => theme.palette.primary.grey[4]};
  }
`;

const AddFriendsImg = styled("img")`
  width: 24px;
  height: 24px;
`;

const AddFriendsText = styled("span")`
  color: #e1e3e6;
  text-align: center;
  font-family: Roboto;
  font-size: 13.891px;
  font-style: normal;
  font-weight: 500;
`;

const FriendsRequestsContainer = styled("div")`
  position: sticky;
  top: 287;
  display: flex;
  flex-direction: column;
  height: 215px;
  padding: 20px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.primary.grey[5]};
  border: 1px solid ${({ theme }) => theme.palette.primary.grey[3]};
  -webkit-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  -moz-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
`;

const SecondarySide = ({ profileOwner }) => {
  const navigate = useNavigate();
  const currentUserContext = useContext(Context);
  const { currentUser, usersFromSearch } = currentUserContext;
  useEffect(() => {
    profileOwner && console.log(profileOwner.socialContacts);
  }, []);
  return (
    <Container>
      <FriendsContainer>
        <ContainerTitle>Friends</ContainerTitle>
        {profileOwner && profileOwner.socialContacts.friends.length ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              marginTop: "8px",
            }}
          >
            {profileOwner.socialContacts.friends.map(
              (friendId, idx) =>
                idx < 9 && (
                  <UserCardForProfile key={friendId + "UserCardForProfile"} userId={friendId}></UserCardForProfile>
                )
            )}
          </Box>
        ) : (
          <NoneFriendsContainer>
            <NoneFriendsTitle>You don't have any friends yet</NoneFriendsTitle>
            <AddFriendsContainer onClick={() => navigate("/friends")}>
              <AddFriendsImg
                src={addFriendsImg}
                alt="addFriendsImg"
              ></AddFriendsImg>
              <AddFriendsText>Add friends</AddFriendsText>
            </AddFriendsContainer>
          </NoneFriendsContainer>
        )}
      </FriendsContainer>
      {profileOwner && profileOwner.socialContacts.followers.length > 0 && (
        <FriendsRequestsContainer>
          <ContainerTitle>Friends requests</ContainerTitle>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              marginTop: "8px",
            }}
          >
            {profileOwner.socialContacts.followers.map((followerId) => (
              <UserCardForProfile key={followerId + "UserCardForProfile"} userId={followerId}></UserCardForProfile>
            ))}
          </Box>
        </FriendsRequestsContainer>
      )}
    </Container>
  );
};

export default SecondarySide;
