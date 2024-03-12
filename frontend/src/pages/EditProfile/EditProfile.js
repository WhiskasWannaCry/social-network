import { useContext, useEffect, useRef, useState } from "react";
import userImg from "../../images/posts_img/post_img4.jpg";
import styled from "@emotion/styled";
import { Context } from "../../shared/Context";
import { Avatar, Box, Button, Typography } from "@mui/material";
import ImageCropper from "../../shared/ImageCropper";
import { postChangeUserAvatar, postChangeUserInfo } from "../../http/Fetches";
import { useNavigate } from "react-router-dom";

const Container = styled("div")`
  display: flex;
  width: 100%;
  min-height: 100%;
`;

const EditMainInfo = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 500px;
  background-color: ${(props) => props.theme.palette.primary.grey[5]};
  border: 1px solid #363738;
  border-radius: 12px;
  overflow: hidden;
  gap: 12px;
  padding: 16px 20px;
`;

const InfoContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  width: 100%;
`;

const InfoTitle = styled("div")`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
  color: #828282;
  text-align: center;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;

const InfoForChange = styled("div")`
  width: 60%;
`;

const InputInfo = styled("input")`
  outline: none;
  width: 100%;
  padding: 8px;
  height: ${({ height }) => height};
  background-color: ${(props) => props.theme.palette.primary.grey[5]};
  border: 1px solid ${(props) => props.theme.palette.primary.grey[3]};
  border-radius: 8px;
  color: ${(props) => props.theme.palette.primary.grey[1]};
`;

const HR = styled("div")`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.08);
`;

const SaveChangesBtn = styled("div")`
  cursor: pointer;
  background-color: ${(props) => props.theme.palette.primary.grey[5]};
  border: 1px solid ${(props) => props.theme.palette.primary.grey[3]};
  padding: 8px 16px 8px 16px;
  max-width: 200px;
  border-radius: 8px;
  &:hover {
    background-color: ${(props) => props.theme.palette.primary.grey[4]};
  }
`;

const EditProfile = () => {
  const currentUserContext = useContext(Context);
  const { currentUser, setCurrentUser, userInit } = currentUserContext;

  let avatarFullPath =
  `http://localhost:8000/${currentUser?.images.avatar}` || userImg;

  const [newDateOfBirth, setNewDateOfBirth] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [newName, setNewName] = useState(null);
  const [newSurname, setNewSurname] = useState(null);
  const [newDescription, setNewDescription] = useState(null);
  const [newCity, setNewCity] = useState(null);
  const [newWebSite, setNewWebSite] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Editing my profile";
    setNewAvatar(avatarFullPath)
    setNewName(currentUser?.primary.name)
    setNewSurname(currentUser?.primary.surname)
    setNewDescription(currentUser?.primary.description)
    setNewDateOfBirth(currentUser?.primary.dateOfBirth)
    setNewCity(currentUser?.primary.city)
    setNewWebSite(currentUser?.primary.website)
  }, []);

  const handleChangeInfoField = (e, setLocalState) => {
    // const newDate = new Date(e.target.value);
    setLocalState(e.target.value);
  };

  const changeUserInfo = async () => {
    if (
      newDateOfBirth ||
      newName ||
      newSurname ||
      newDescription ||
      newCity ||
      newWebSite ||
      newAvatar
    ) {
      const changedFields = {};
      if (newDateOfBirth !== currentUser?.primary.dateOfBirth) {
        changedFields.dateOfBirth = newDateOfBirth;
      }
      if (newName !== currentUser?.primary.name) {
        changedFields.name = newName;
      }
      if (newSurname !== currentUser?.primary.surname) {
        changedFields.surname = newSurname;
      }
      if (newDescription !== currentUser?.primary.description) {
        changedFields.description = newDescription;
      }
      if (newCity !== currentUser?.primary.city) {
        changedFields.city = newCity;
      }
      if (newWebSite !== currentUser?.primary.website) {
        changedFields.website = newWebSite;
      }
      if (
        newDateOfBirth ||
        newName ||
        newSurname ||
        newDescription ||
        newCity ||
        newWebSite
      ) {
        const { data } = await postChangeUserInfo(
          changedFields,
          currentUser._id
        );

        const { success } = data;
        if (!success) {
          const { message } = data;
          alert(message);
          console.log(data);
          return;
        }
        const { user } = data;
        setCurrentUser(user);
        navigate(`../profile/${currentUser._id}`);
      }
    }
  };

  return (
    <Container>
      <EditMainInfo>
        <Avatar
          alt="user-avatar"
          src={newAvatar}
          sx={{
            width: "112px",
            height: "112px",
            border: (theme) => "1px solid" + theme.palette.primary.grey[5],
          }}
        ></Avatar>
        <ImageCropper
          newAvatar={newAvatar}
          setNewAvatar={setNewAvatar}
        ></ImageCropper>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <InfoContainer>
            <InfoTitle>Name:</InfoTitle>
            <InfoForChange>
              <InputInfo
                height={"32px"}
                type="text"
                placeholder="Some info about you"
                value={newName}
                onChange={(e) => handleChangeInfoField(e, setNewName)}
              ></InputInfo>
            </InfoForChange>
          </InfoContainer>
          <InfoContainer>
            <InfoTitle>Surname:</InfoTitle>
            <InfoForChange>
              <InputInfo
                height={"32px"}
                type="text"
                placeholder="Some info about you"
                value={newSurname}
                onChange={(e) => handleChangeInfoField(e, setNewSurname)}
              ></InputInfo>
            </InfoForChange>
          </InfoContainer>
        </Box>
        <HR></HR>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <InfoContainer>
            <InfoTitle>A short information:</InfoTitle>
            <InfoForChange>
              <InputInfo
                height={"64px"}
                type="text"
                placeholder="Some info about you"
                value={newDescription}
                onChange={(e) => handleChangeInfoField(e, setNewDescription)}
              ></InputInfo>
            </InfoForChange>
          </InfoContainer>
          <InfoContainer>
            <InfoTitle>City:</InfoTitle>
            <InfoForChange>
              <InputInfo
                height={"32px"}
                type="text"
                placeholder="Some info about you"
                value={newCity}
                onChange={(e) => handleChangeInfoField(e, setNewCity)}
              ></InputInfo>
            </InfoForChange>
          </InfoContainer>
        </Box>

        <HR></HR>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <InfoContainer>
            <InfoTitle>Date of Birth:</InfoTitle>
            <InfoForChange>
              <InputInfo
                type="date"
                height={"32px"}
                value={newDateOfBirth}
                onChange={(e) => handleChangeInfoField(e, setNewDateOfBirth)}
              ></InputInfo>
            </InfoForChange>
          </InfoContainer>
          <InfoContainer>
            <InfoTitle>Private website:</InfoTitle>
            <InfoForChange>
              <InputInfo
                height={"32px"}
                type="text"
                placeholder="Some info about you"
                value={newWebSite}
                onChange={(e) => handleChangeInfoField(e, setNewWebSite)}
              ></InputInfo>
            </InfoForChange>
          </InfoContainer>
        </Box>

        <SaveChangesBtn onClick={changeUserInfo}>Save</SaveChangesBtn>
      </EditMainInfo>
    </Container>
  );
};

export default EditProfile;
