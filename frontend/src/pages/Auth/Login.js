import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { postLogin } from "../../http/Fetches";
import { Context } from "../../shared/Context";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const LoginContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.primary.grey[3]};
  border-radius: 8px;
  padding: 8px 16px 8px 16px;
  width: 40%;
  gap: 24px;
  -webkit-box-shadow: 0px 0px 6px 2px rgba(0,0,0,0.5);
-moz-box-shadow: 0px 0px 6px 2px rgba(0,0,0,0.5);
box-shadow: 0px 0px 6px 2px rgba(0,0,0,0.5);
`;

const LoginTitle = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.primary.grey[1]};
  width: 100%;
  height: 32px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
`;

const ServerErrorMessage = styled("span")`
  color: red;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
`;

const InputsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const Input = styled("input")`
  background-color: ${({ theme }) => theme.palette.primary.grey[5]};
  border: ${({ theme }) => theme.palette.primary.grey[3]};
  border-radius: 8px;
  padding: 8px;
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
`;

const Btn = styled("div")`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    (props.isSignUpBtn && props.theme.palette.primary.green[1]) ||
    props.theme.palette.primary.grey[3]};
  padding: 8px;
  border-radius: 8px;
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  &:hover {
    background-color: ${(props) => props.theme.palette.primary.grey[3]};
  }
  background-color: ${(props) =>
    (props.isSignUpBtn && props.theme.palette.primary.green[1]) ||
    props.theme.palette.primary.grey[4]};
  ${({ disabled }) =>
    disabled
      ? `
      background-color: #464646c2;
      cursor:default;
      color: grey;
    `
      : `
    &:hover {
    background-color: ${({ theme }) => theme.palette.primary.grey[3]};
  }`}
`;

const HaveNotAccountTitle = styled("span")`
  width: 100%;
  font-size: 12px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
`;

const ChangeToSignUp = styled("span")`
  cursor: pointer;
  color: ${({ theme }) => theme.palette.primary.blue[3]};
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const currentUserContext = useContext(Context);
  const { setCurrentUser } = currentUserContext;
  const [serverError, setServerError] = useState("");

  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const disabled = !email || !emailRegExp.test(email) || !password;

  const login = async (userData) => {
    const { data } = await postLogin(userData);
    const { success } = data;
    if (!success) {
      const { message } = data;
      setServerError(message);
      console.log(data);
      return;
    }
    const { token, user } = data;
    localStorage.setItem("token", JSON.stringify({ value: token }));
    setCurrentUser(user);
    navigate(`/profile/${user._id}`);
  };

  const handleClickLogin = () => {
    const userData = { email, password };
    login(userData);
  };

  return (
    <Container>
      <LoginContainer>
        <LoginTitle>Log In</LoginTitle>
        {serverError && <ServerErrorMessage>{serverError}</ServerErrorMessage>}

        <InputsContainer>
          <Input
            type="phone"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </InputsContainer>
        <Btn
          disabled={disabled}
          onClick={() => !disabled && handleClickLogin()}
        >
          Log In
        </Btn>
        <HaveNotAccountTitle>
          Haven't account?{" "}
          <ChangeToSignUp onClick={() => navigate("/registration")}>
            Sign Up
          </ChangeToSignUp>
        </HaveNotAccountTitle>
        {/* <Btn isSignUpBtn={true} onClick={() => navigate("/registration")}>
          Sign Up
        </Btn> */}
      </LoginContainer>
    </Container>
  );
};

export default Login;
