import styled from "@emotion/styled";
import MainSide from "./ProfileMainSide";
import SecondarySide from "./ProfileSecondarySide";
import backgroundImage from "../../images/posts_img/post_img2.jpg";
import userImg from "../../images/posts_img/post_img4.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../shared/Context";
import { Avatar } from "@mui/material";
import { getUserInfo } from "../../http/Fetches";

const Container = styled("div")`
  width: 100%;
`;

const UserHeaderContainer = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 322px;
  background-color: ${(props) => props.theme.palette.primary.grey[5]};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.palette.primary.grey[3]};
  overflow: hidden;
  transition: background-color 0.3s;
  transition: color 0.3s;
`;

const ChangeBackground = styled("div")`
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
  color: #fff;
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const UserBackground = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImg});
  background-size: 100%;
  background-repeat: no-repeat;
  z-index: 1;
`;

const InfoOuterContainer = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  min-height: 144px;
  z-index: 2;
`;

const UserInfoContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 95px;
  background-color: ${(props) => props.theme.palette.primary.grey[5]};
  padding: 20px;
  padding-left: 25%;
  transition: background-color 0.3s;
  transition: color 0.3s;
`;

const UserInfo = styled("div")`
  display: flex;
  flex-direction: column;
`;

const UserName = styled("div")`
  // пока что юзернейм если слишком большой то перенос не работает норм, надо фиксить
  color: ${(props) => props.theme.palette.primary.grey[1]};
  font-family: Roboto;
  font-size: 20.836px;
  font-style: normal;
  font-weight: 600;
  min-width: 100px;
  max-width: 150px;
  height: auto;
  transition: background-color 0.3s;
  transition: color 0.3s;
`;

const AddInfoBtn = styled("div")`
  cursor: pointer;
  color: #71aaeb;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;

const EditProfileBtn = styled("div")`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 6px 16px 6px 16px;
  border-radius: 8px;
  background: ${(props) => props.theme.palette.primary.grey[4]};
  color: ${(props) => props.theme.palette.primary.grey[1]};
  border: 1px solid ${(props) => props.theme.palette.primary.grey[3]};
  text-align: center;
  font-family: Roboto;
  font-size: 13.781px;
  font-style: normal;
  font-weight: 500;
  transition: background-color 0.3s;
  transition: color 0.3s;
  &:hover {
    background: ${(props) => props.theme.palette.primary.grey[3]};
  }
`;

const UserBody = styled("div")`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  width: 100%;
`;

const Profile = () => {
  const currentUserContext = useContext(Context);
  const navigate = useNavigate();
  const { _id: profileId } = useParams();
  const { currentUser, usersFromSearch } = currentUserContext; // нужно будет написать логику отображения профилей других юзеров

  useEffect(() => {
    const fetchUserInfo = async (profileId) => {
      const data = await getUserInfo(profileId)
      console.log(data)
    }
    fetchUserInfo(profileId)
  },[])

  useEffect(() => {
    document.title = "My profile";
  }, []);
  let avatarFullPath =
    `http://localhost:8000/${currentUser.images.avatar}` || userImg;
  let backgroundFullPath =
    `http://localhost:8000/${currentUser.images.background}` || backgroundImage;

  return (
    <Container>
      <UserHeaderContainer>
        <UserBackground bgImg={backgroundFullPath}></UserBackground>
        {profileId == currentUser._id && (
          <ChangeBackground>Change background</ChangeBackground>
        )}
        <InfoOuterContainer>
          <Avatar
            alt="user-avatar"
            src={(currentUser.images.avatar && avatarFullPath) || null}
            sx={{
              position: "absolute",
              top: 0,
              left: "42px",
              width: "112px",
              height: "112px",
              border: (theme) => "1px solid" + theme.palette.primary.grey[5],
            }}
          ></Avatar>
          <UserInfoContainer>
            <UserInfo>
              <UserName>
                {currentUser.primary.name + " " + currentUser.primary.surname}
              </UserName>
              {profileId == currentUser._id && (
                <AddInfoBtn>Provide information about yourself</AddInfoBtn>
              )}
            </UserInfo>
            {profileId === currentUser._id && (
              <EditProfileBtn
                onClick={() =>
                  currentUser._id && navigate(`/edit/${currentUser._id}`)
                }
              >
                Edit profile
              </EditProfileBtn>
            )}
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
