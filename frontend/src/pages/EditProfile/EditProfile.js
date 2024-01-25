import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
`;

const EditMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 500px;
  background-color: ${(props) => props.theme.mainBlockBg};
  border: 1px solid #363738;
  border-radius: 12px;
  overflow: hidden;
  gap: 12px;
  padding: 16px 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  width: 100%;
`;

const InfoTitle = styled.div`
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

const InfoForChange = styled.div`
  width: 70%;
`;

const InputInfo = styled.input`
  outline: none;
  width: 100%;
  padding: 8px;
  height: ${({ height }) => height};
  background-color: ${(props) => props.theme.mainBlockBg};
  border: ${(props) => props.theme.mainBlockBorder};
  border-radius: 12px;
  color: ${(props) => props.theme.mainTextColor};
`;

const HR = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.08);
`;

const SaveChangesBtn = styled.div`
  cursor: pointer;
  background-color: ${(props) => props.theme.btnBg};
  border: ${(props) => props.theme.mainBlockBorder};
  padding: 8px 16px 8px 16px;
  max-width: 200px;
  border-radius: 8px;
  &:hover {
  background-color: ${(props) => props.theme.hoverBtnBg};
}
`

const EditProfile = () => {
  useEffect(() => {
    document.title = "Editing my profile";
  }, []);
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
          <InfoTitle>Phone number:</InfoTitle>
          <InfoForChange>
            <InputInfo
              height={"32px"}
              type="tel"
              placeholder="Some info about you"
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
