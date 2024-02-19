import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { getSignUp } from "../../shared/utils";
import { Context } from "../../shared/Context";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LoginContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 1px solid ${({theme}) => theme.palette.primary.grey[3]};
  border-radius: 8px;
  padding: 8px 16px 8px 16px;
  width: 50%;
  height: 500px;
  gap: 12px;
`;

const LoginTitle = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({theme}) => theme.palette.primary.grey[1]};
  width: 100%;
  height: 10%;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
`;

const InputsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-height: 30%;
`;

const Input = styled("input")`
  background-color: ${({theme}) => theme.palette.primary.grey[5]};
  border: 1px solid ${({theme}) => theme.palette.primary.grey[3]};
  border-radius: 8px;
  padding: 8px;
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
`;

const Btn = styled("div")`
cursor: ${({disabled}) => !disabled && "pointer"};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    (props.isSignUpBtn && props.theme.palette.primary.green[1]) || props.theme.palette.primary.grey[5]};
  ${({ disabled,theme }) =>
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

const SignUp = () => {
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);
  const currentUserContext = useContext(Context)
  const {setCurrentUser} = currentUserContext;
  const navigate = useNavigate();
  const disabled =
    !name ||
    !surname ||
    !email ||
    !password ||
    !repeatPassword ||
    !(password === repeatPassword);
  const handleClickSignUp = () => {
    const userData = {
      name,
      surname,
      email,
      password,
    };
    function checkNamesFields(username) {
      // Only words - ru, en, ua
      const regex = /^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]{2,15}$/;
      return regex.test(username)
    }
    const signUp = async () => {
      if(!checkNamesFields(name)) {
        alert('The name is incorrect!')
        return
      }
      if(!checkNamesFields(surname)) {
        alert('The surname is incorrect!')
        return
      }
      const res = await getSignUp(name, surname, email, password);
      const {data} = res;
      const {success} = data;
      if(!success) {
        const {message} = data;
        alert(message)
        return
      }
      const {user,token} = data;
      const {_id} = user;
      console.log(_id)
      localStorage.setItem("token", JSON.stringify({ value: token }));
      setCurrentUser(user)
      navigate(`/profile/${_id}`)
      }
    return signUp();
  };
  return (
    <Container>
      <LoginContainer>
        <LoginTitle>Sign Up</LoginTitle>
        <InputsContainer>
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
        <Btn
          isSignUpBtn={true}
          disabled={disabled}
          onClick={() => !disabled && handleClickSignUp()}
        >
          Sign Up
        </Btn>
        <HaveNotAccountTitle>Have an account?</HaveNotAccountTitle>
        <Btn onClick={() => navigate("/login")}>Log In</Btn>
      </LoginContainer>
    </Container>
  );
};

export default SignUp;
