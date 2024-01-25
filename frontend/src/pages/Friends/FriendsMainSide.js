import styled from "styled-components";
import searchIcon from "../../images/icons/search.svg";
import UserCardSearch from "../../shared/UserCardSearch";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 60%;
  min-height: 400px;
  background-color: ${({ theme }) => theme.mainBlockBg};
  border-radius: 8px;
  border: ${({ theme }) => theme.mainBlockBorder};
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const Title = styled.div`
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

const PeopleCounter = styled.div`
  color: rgb(130, 130, 130);
  font-family: Roboto;
  font-size: 12.492px;
  font-style: normal;
  font-weight: 400;
`;

const SearchBarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 32px;
  border: ${({ theme }) => theme.mainBlockBorder};
  border-radius: 8px;
  overflow: hidden;
`;

const SearchBar = styled.input`
  border: none;
  width: 90%;
  height: 100%;
  background-color: ${({ theme }) => theme.mainBlockBg};
  padding: 4px;
  font-family: Roboto;
  font-size: 12.492px;
  font-style: normal;
  font-weight: 400;
  &:focus {
    outline: none;
  }
`;

const SearchBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  height: 100%;
  width: 10%;
  background-color: ${({ theme }) => theme.grayBlockBg};
  padding: 4px;
`;

const SearchImage = styled.img`
  height: 100%;
`;

const UsersForSearch = styled.div`
width: 100%;
height: 100%;
`

const FriendsMainSide = () => {
  return (
    <Container>
      <Header>
        <Title>People</Title>
        <PeopleCounter>155 555</PeopleCounter>
      </Header>
      <SearchBarContainer>
        <SearchBar placeholder="Enter your request"></SearchBar>
        <SearchBtn>
          <SearchImage src={searchIcon} alt="search"></SearchImage>
        </SearchBtn>
      </SearchBarContainer>
      <UsersForSearch>
        <UserCardSearch></UserCardSearch>
        <UserCardSearch></UserCardSearch>
        <UserCardSearch></UserCardSearch>
        <UserCardSearch></UserCardSearch>
        <UserCardSearch></UserCardSearch>
        <UserCardSearch></UserCardSearch>
        <UserCardSearch></UserCardSearch>
        <UserCardSearch></UserCardSearch>
        <UserCardSearch></UserCardSearch>
        <UserCardSearch></UserCardSearch>
        <UserCardSearch></UserCardSearch>
        <UserCardSearch></UserCardSearch>
        <UserCardSearch></UserCardSearch>
        <UserCardSearch></UserCardSearch>
      </UsersForSearch>
    </Container>
  );
};

export default FriendsMainSide;
