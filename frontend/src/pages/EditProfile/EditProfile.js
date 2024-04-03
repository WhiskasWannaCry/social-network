import { useContext, useEffect, useRef, useState } from "react";
import userImg from "../../images/posts_img/post_img4.jpg";
import styled from "@emotion/styled";
import { Context } from "../../shared/Context";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ImageCropper from "../../shared/ImageCropper";
import { postChangeUserAvatar, postChangeUserInfo } from "../../http/Fetches";
import { useNavigate } from "react-router-dom";

const Container = styled("div")`
  display: flex;
  width: 100%;
  /* min-height: 100%; */
`;

const EditMainInfo = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* min-height: 500px; */
  background-color: ${(props) => props.theme.palette.primary.grey[5]};
  border: 1px solid #363738;
  border-radius: 12px;
  overflow: hidden;
  gap: 12px;
  padding: 20px;
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

  const [newDateOfBirth, setNewDateOfBirth] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newWebSite, setNewWebSite] = useState("");
  const [newSex, setNewSex] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Editing my profile";
    setNewAvatar(avatarFullPath);
    setNewName(currentUser?.primary.name);
    setNewSurname(currentUser?.primary.surname);
    setNewDescription(currentUser?.primary.description);
    setNewDateOfBirth(currentUser?.primary.dateOfBirth);
    setNewCity(currentUser?.primary.city);
    setNewWebSite(currentUser?.primary.website);
    setNewSex(currentUser?.primary.sex);
  }, []);

  const handleChangeInfoField = (e, setLocalState) => {
    // const newDate = new Date(e.target.value);
    setLocalState(e.target.value);
  };

  const changeUserInfo = async () => {
    console.log(new Date(newDateOfBirth));
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
        changedFields.dateOfBirth = new Date(newDateOfBirth);
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
      if (newSex !== currentUser?.primary.sex) {
        changedFields.sex = newSex;
      }
      console.log(newSex);
      if (
        newDateOfBirth ||
        newName ||
        newSurname ||
        newDescription ||
        newCity ||
        newWebSite ||
        newSex
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
          imageType={"avatar"}
          ASPECT_RATIO={1}
          MIN_DEMENSION={150}
          circularCrop={true}
          textForButton={"Upload a new avatar"}
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
        <Box
          sx={{
            display: "flex",
          }}
        >
          <InfoContainer>
            <InfoTitle>Sex:</InfoTitle>
            <InfoForChange>
              <FormControl
                sx={{
                  m: 1,
                  display: "flex",
                  flexGrow: 1,
                  width: "100%",
                }}
                size="small"
              >
                <InputLabel
                  id="demo-select-small-label"
                  sx={{ color: (theme) => theme.palette.primary.grey[2] }}
                >
                  Sex
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={newSex}
                  label="Age"
                  onChange={(e) => handleChangeInfoField(e, setNewSex)}
                  sx={{
                    color: (theme) => theme.palette.primary.grey[1],
                    borderRadius: "8px",
                    border: (theme) =>
                      `1px solid ${theme.palette.primary.grey[3]}`,
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: (theme) =>
                          theme.palette.primary.grey[4],
                      },
                    },
                  }}
                >
                  <MenuItem key={"other"} value={"other"}>
                    Other
                  </MenuItem>
                  <MenuItem key={"male"} value={"male"}>
                    Male
                  </MenuItem>
                  <MenuItem key={"female"} value={"female"}>
                    Female
                  </MenuItem>
                </Select>
              </FormControl>
            </InfoForChange>
          </InfoContainer>
        </Box>
        <HR></HR>
        <SaveChangesBtn onClick={changeUserInfo}>Save</SaveChangesBtn>
      </EditMainInfo>
    </Container>
  );
};

export default EditProfile;
