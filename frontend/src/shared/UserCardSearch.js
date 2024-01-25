import styled from "styled-components";
import userImg from "../images/posts_img/post_img4.jpg";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100px;
  border-bottom: ${({ theme }) => theme.mainBlockBorder};
  padding: 16px 0 16px 0;
`;

const UserImgContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
`;

const UserImg = styled.img`
  width: 100%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding: 0 8px 0 8px;
`;

const UserName = styled.div`
  cursor: pointer;
  color: rgb(113, 170, 235);
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  &:hover {
    text-decoration: underline;
  }
`;

const UserAge = styled.div`
  color: rgb(130, 130, 130);
  font-family: Roboto;
  font-size: 12.492px;
  font-style: normal;
  font-weight: 400;
`;

const DoBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.lightBtnBg};
  color: ${({ theme }) => theme.btnDarkTextColor};
  width: 30%;
  padding: 4px 8px 4px 8px;
  border-radius: 4px;
  font-family: Roboto;
  font-size: 12.492px;
  font-style: normal;
  font-weight: 400;
  &:hover {
    background-color: ${({ theme }) => theme.hoverLightBtnBg};
  }
`;

// Возраст рендерить только если он указан у юзера!
const UserCardSearch = () => {
  return (
    <Container>
      <UserImgContainer>
        <UserImg src={userImg} alt="user_img"></UserImg>
      </UserImgContainer>
      <UserInfo>
        <UserName>User Name</UserName>
        <UserAge>24 years</UserAge>
      </UserInfo>
      <DoBtn>Add as Friend</DoBtn>
    </Container>
  );
};

export default UserCardSearch;
