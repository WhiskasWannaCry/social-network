import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: ${(props) => props.theme.mainBlockBorder};
  border-radius: 8px;
  padding: 8px 16px 8px 16px;
  width: 50%;
  height: 400px;
  gap: 12px;
`;

const LoginTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.mainTextColor};
  width: 100%;
  height: 20%;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 30%;
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.mainBg};
  border: ${(props) => props.theme.mainBlockBorder};
  border-radius: 8px;
  padding: 8px;
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
`;

const Btn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    (props.isSignUpBtn && props.theme.greenBtnBg) || props.theme.btnBg};
  padding: 8px;
  border-radius: 8px;
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  &:hover {
    background-color: ${(props) => props.theme.hoverBtnBg};
  }
`;

const HaveNotAccountTitle = styled.span`
  width: 100%;
  font-size: 12px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
`;

const Login = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <LoginContainer>
        <LoginTitle>Log In</LoginTitle>
        <InputsContainer>
          <Input type="phone" placeholder="Email"></Input>
          <Input type="password" placeholder="Password"></Input>
        </InputsContainer>
        <Btn>Log In</Btn>
        <HaveNotAccountTitle>Haven't account?</HaveNotAccountTitle>
        <Btn isSignUpBtn={true} onClick={() => navigate("/registration")}>Sign Up</Btn>
      </LoginContainer>
    </Container>
  );
};

export default Login;
