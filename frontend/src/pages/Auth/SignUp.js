import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { postSignUp } from "../../http/Fetches";
import { Context } from "../../shared/Context";
import { Box, Button } from "@mui/material";
import { connectToSocket } from "../../shared/SocketFunctions";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SignUpContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.primary.grey[3]};
  border-radius: 8px;
  padding: 8px 16px 8px 16px;
  width: 50%;
  gap: 24px;
`;

const SignUpTitle = styled("div")`
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

const InputsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const Input = styled("input")`
  background-color: ${({ theme }) => theme.palette.primary.grey[5]};
  border: 1px solid ${({ theme }) => theme.palette.primary.grey[3]};
  border-radius: 8px;
  padding: 8px;
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
`;

const Btn = styled("div")`
  cursor: ${({ disabled }) => !disabled && "pointer"};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    (props.isSignUpBtn && props.theme.palette.primary.green[1]) ||
    props.theme.palette.primary.grey[5]};
  ${({ disabled, theme }) =>
    disabled
      ? `
      background-color: ${theme.palette.primary.grey[5]};}
      cursor:"";
      color: grey;
    `
      : `
    &:hover {
    background-color: ${(props) => props.theme.palette.primary.grey[5]};
  }`}
  padding: 8px;
  border-radius: 8px;
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
`;

const HaveNotAccountTitle = styled("span")`
  width: 100%;
  font-size: 12px;
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
  min-height: 14px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  &:disabled {
    background-color: ${(props) => props.theme.palette.primary.grey[5]};
    color: ${(props) => props.theme.palette.primary.grey[3]};
  }
`;

const ChangeToLogin = styled("span")`
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

const SignUp = () => {
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);
  const [serverError, setServerError] = useState("");

  const currentUserContext = useContext(Context);
  const { currentUser, setCurrentUser, setSocketConnectState } =
    currentUserContext;

  const navigate = useNavigate();

  const disabled =
    !name ||
    !surname ||
    !email ||
    !password ||
    !repeatPassword ||
    !(password === repeatPassword);
  const handleClickSignUp = () => {
    function checkNamesFields(username) {
      // Only words - ru, en, ua
      const regex = /^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]{2,15}$/;
      return regex.test(username);
    }
    function checkEmail(email) {
      // Only words - ru, en, ua
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    }

    const signUp = async () => {
      if (!checkNamesFields(name)) {
        alert("The name is incorrect!");
        return;
      }
      if (!checkNamesFields(surname)) {
        alert("The surname is incorrect!");
        return;
      }
      if (!checkEmail(email)) {
        alert("Email is incorrect!");
        return;
      }
      const res = await postSignUp(name, surname, email, password);
      const { data } = res;
      const { success } = data;
      if (!success) {
        const { message } = data;
        alert(message);
        return;
      }
      const { user, token } = data;
      const { _id } = user;
      console.log(_id);
      localStorage.setItem("token", JSON.stringify({ value: token }));
      setCurrentUser(user);
      const socket = connectToSocket(user._id);
      socket.on("connect", () => {
        console.log(socket.id);
      });
      setSocketConnectState(socket);
      navigate(`/profile/${_id}`);
    };
    return signUp();
  };
  return (
    <Container>
      <SignUpContainer>
        <SignUpTitle>Sign Up</SignUpTitle>
        <InputsContainer>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
            }}
          >
            <Input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            ></Input>
            <Input
              type="text"
              placeholder="Surname"
              onChange={(e) => setSurname(e.target.value)}
            ></Input>
          </Box>

          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Input
            type="password"
            placeholder="Repeat password"
            onChange={(e) => setRepeatPassword(e.target.value)}
          ></Input>
        </InputsContainer>
        <StyledButton
          variant="contained"
          disabled={disabled}
          onClick={handleClickSignUp}
        >
          Sign Up
        </StyledButton>
        <HaveNotAccountTitle>
          Have an account?{" "}
          <ChangeToLogin onClick={() => navigate("/login")}>
            Log In
          </ChangeToLogin>
        </HaveNotAccountTitle>
      </SignUpContainer>
    </Container>
  );
};

export default SignUp;
