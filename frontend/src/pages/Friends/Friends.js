import styled from "@emotion/styled";
import FriendsMainSide from "./FriendsMainSide";
import FriendsFiltersSide from "./FriendsFiltersSide";
import { useContext } from "react";
import { Context } from "../../shared/Context";
import { getUsersInfo } from "../../http/Fetches";

const Container = styled("div")`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const Friends = () => {
  const currentUserContext = useContext(Context);
  const { currentUser, setCurrentUser, userInit } = currentUserContext;
  return (
    <Container>
      {currentUser.socialContacts.friends && currentUser.socialContacts.friends.length ? null : ( // нужно будет написать когда у юзера есть друзья
        <>
          <FriendsMainSide></FriendsMainSide>
          <FriendsFiltersSide></FriendsFiltersSide>
        </>
      )}
    </Container>
  );
};

export default Friends;
