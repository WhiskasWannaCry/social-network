import styled from "@emotion/styled";
import FriendsMainSide from "./FriendsMainSide";
import FriendsFiltersSide from "./FriendsFiltersSide";
import { useContext, useState } from "react";
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
  const [peopleSearchParams, setPeopleSearchParams] = useState({
    searchInputValue: "",
    selectedFromAge: 0,
    selectedToAge: 0,
    selectedSex: "other",
  });

  return (
    <Container>
      {currentUser.socialContacts.friends &&
      currentUser.socialContacts.friends.length ? (
        <>
          <FriendsMainSide
            peopleSearchParams={peopleSearchParams}
          ></FriendsMainSide>
          <FriendsFiltersSide
            peopleSearchParams={peopleSearchParams}
            setPeopleSearchParams={setPeopleSearchParams}
          ></FriendsFiltersSide>
        </> // нужно будет написать когда у юзера есть друзья
      ) : (
        <>
          <FriendsMainSide peopleSearchParams={peopleSearchParams}></FriendsMainSide>
          <FriendsFiltersSide peopleSearchParams={peopleSearchParams} setPeopleSearchParams={setPeopleSearchParams}></FriendsFiltersSide>
        </>
      )}
    </Container>
  );
};

export default Friends;
