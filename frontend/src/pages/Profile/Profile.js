import styled from "styled-components";
import MainSide from "./ProfileMainSide";
import SecondarySide from "./ProfileSecondarySide";
import backgroundImage from "../../images/posts_img/post_img2.jpg";
import userImg from "../../images/posts_img/post_img4.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Container = styled.div`
  width: 100%;
`;

const UserHeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 322px;
  background-color: #222;
  border-radius: 12px;
  border: 1px solid #363738;
  overflow: hidden;
`;

const ChangeBackground = styled.div`
cursor: pointer;
position: absolute;
display: flex;
justify-content: center;
align-items: center;
padding: 8px 16px 8px 16px;
top: 12px;
right: 12px;
z-index: 2;
background: rgba(0, 0, 0, 0.5);
border-radius: 8px;
color: #FFF;
text-align: center;
font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 500;
&:hover {
  background: rgba(0, 0, 0, 0.7);
}
`

const UserBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${backgroundImage});
  background-size: 100%;
  background-repeat: no-repeat;
  z-index: 1;
`;

const InfoOuterContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  min-height: 160px;
  z-index: 2;
`;

const UserImgContainer = styled.div`
  position: absolute;
  top: 0;
  left: 20px;
  width: 20%;
  max-height: 150px;
  max-width: 150px;
  height: auto;
  border-radius: 50%;
  border: 4px solid #222;
  overflow: hidden;
`;

const UserImg = styled.img`
  width: 100%;
`;

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 95px;
  background-color: #222222;
  padding: 20px;
  padding-left: 25%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  // пока что юзернейм если слишком большой то перенос не работает норм, надо фиксить
  color: #e1e3e6;
  font-family: Roboto;
  font-size: 20.836px;
  font-style: normal;
  font-weight: 600;
  min-width: 100px;
  max-width: 150px;
  height: auto;
`;

const AddInfoBtn = styled.div`
  cursor: pointer;
  color: #71aaeb;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;

const EditProfileBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 6px 16px 6px 16px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #e1e3e6;
  text-align: center;
  font-family: Roboto;
  font-size: 13.781px;
  font-style: normal;
  font-weight: 500;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const UserBody = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  width: 100%;
`;

const Profile = () => {
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'My profile';
  }, []);
  return (
    <Container>
      <UserHeaderContainer>
        <UserBackground></UserBackground>
        <ChangeBackground>Change background</ChangeBackground>
        <InfoOuterContainer>
          <UserImgContainer>
            <UserImg src={userImg} alt="user_img"></UserImg>
          </UserImgContainer>
          <UserInfoContainer>
            <UserInfo>
              <UserName>Karim Zerman</UserName>
              <AddInfoBtn>Provide information about yourself</AddInfoBtn>
            </UserInfo>
            <EditProfileBtn onClick={() => navigate('/edit')}>Edit profile</EditProfileBtn>
          </UserInfoContainer>
        </InfoOuterContainer>
      </UserHeaderContainer>
      <UserBody>
        <MainSide></MainSide>
        <SecondarySide></SecondarySide>
      </UserBody>
    </Container>
  );
};

export default Profile;
