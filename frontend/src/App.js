import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Header from "./components/Header";
import MainNavigation from "./components/MainNavigation";
import { useEffect, useState } from "react";
import Feed from "./pages/Feed/Feed";
import EditProfile from "./pages/EditProfile/EditProfile";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.mainBg};
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 64px;
  gap: 12px;
  margin-bottom: 12px;
`;

const ContentContainer = styled.div`
width: 60%;
`;

const SomeElemForTheme = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.theme.mainBlockBg};
  transition: background-color 0.3s;
`;

function App() {
  const darkTheme = {
    //Background
    mainBg : "#141414",
    mainBlockBg: "#222222",
    btnBg: "rgba(255, 255, 255, 0.1)",
    secondaryBlockBg: "rgb(41, 41, 41);",
    //Text
    mainTextColor: "#E1E3E6",
    btnTextColor: "#E1E3E6",
    //Border
    mainBlockBorder: "1px solid rgb(54, 55, 56)",
    userImgBorder: "4px solid #222",
    secondaryBlockBorder: "rgb(54, 55, 56) 0px 0px 0px 1px inset",
    //Hover
    hoverBtnBg: "rgba(255, 255, 255, 0.2)",
    //Scroll
    scrollBtn: "#292929"
  }
  const lightTheme = {
    //Background
    mainBg : "#dce1e6",
    mainBlockBg: "#ffffff",
    secondaryBlockBg: "rgb(41, 41, 41);",
    btnBg: "rgb(42 88 133 / 13%)",
    //Text
    mainTextColor: "#222222",
    btnTextColor: "#447bba",
    //Border
    mainBlockBorder: "1px solid rgb(204 204 204)",  
    secondaryBlockBorder: "rgb(54, 55, 56) 0px 0px 0px 1px inset",
    userImgBorder: "4px solid rgb(204 204 204)",
    //Hover
    hoverBtnBg:"rgba(0, 0, 0, 0.2)",
    //Scroll
    scrollBtn: "rgb(162 162 162)"
  }
  const [theme,setTheme] = useState(darkTheme)
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    location.pathname === "/" && navigate("/profile");
  }, []);
  return (
    <ThemeProvider theme={theme}>
    <Container>
      <Header theme={theme} setTheme={setTheme} lightTheme={lightTheme} darkTheme={darkTheme}></Header>
      <Body>
        <MainNavigation></MainNavigation>
        <ContentContainer>
          <Routes>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/feed" element={<Feed></Feed>}></Route>
            <Route path="/edit" element={<EditProfile></EditProfile>}></Route>
          </Routes>
        </ContentContainer>
      </Body>
    </Container>
    </ThemeProvider>
  );
}

export default App;
