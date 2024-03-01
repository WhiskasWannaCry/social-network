import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Context } from "../../shared/Context";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
  const [date, setDate] = useState("2022-04-17");

  useEffect(() => {
    document.title = "Editing my profile";
  }, []);
  const currentUserContext = useContext(Context);
  const { currentUser, setCurrentUser, userInit } = currentUserContext;

  const onChangeDate = e => {
    // const newDate = new Date(e.target.value);
    setDate(e.target.value);
    console.log(date); //value picked from date picker
  };

  return (
    <Container>
      <EditMainInfo>
        <InfoContainer>
          <InfoTitle>Name:</InfoTitle>
          <InfoForChange>
            <InputInfo
              height={"32px"}
              type="text"
              placeholder="Some info about you"
              value={(currentUser && currentUser.primary.name) || ""}
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
              value={(currentUser && currentUser.primary.surname) || ""}
            ></InputInfo>
          </InfoForChange>
        </InfoContainer>
        <HR></HR>
        <InfoContainer>
          <InfoTitle>A short information:</InfoTitle>
          <InfoForChange>
            <InputInfo
              height={"64px"}
              type="text"
              placeholder="Some info about you"
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
            ></InputInfo>
          </InfoForChange>
        </InfoContainer>
        <HR></HR>
        <InfoContainer>
          <InfoTitle>Date of Birth:</InfoTitle>
          <InfoForChange>
            <InputInfo
              type="date"
              height={"32px"}
              value={date}
              onChange={(e) => onChangeDate(e)}
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
            ></InputInfo>
          </InfoForChange>
        </InfoContainer>
        <SaveChangesBtn>Save</SaveChangesBtn>
      </EditMainInfo>
    </Container>
  );
};

export default EditProfile;
