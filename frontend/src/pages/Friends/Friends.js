import styled from "@emotion/styled";
import FriendsMainSide from "./FriendsMainSide";
import FriendsFiltersSide from "./FriendsFiltersSide";

const Container = styled("div")`
  display: flex;
  gap: 16px;
  width: 100%;
`;


const Friends = () => {
  return (
    <Container>
      <FriendsMainSide></FriendsMainSide>
      <FriendsFiltersSide></FriendsFiltersSide>
    </Container>
  );
};

export default Friends;