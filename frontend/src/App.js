import styled, { ThemeProvider } from "styled-components";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Header from "./components/Header";
import MainNavigation from "./components/MainNavigation";
import { useEffect, useState } from "react";
import Feed from "./pages/Feed/Feed";
import EditProfile from "./pages/EditProfile/EditProfile";
import { useSelector } from "react-redux";

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

function App() {
  
  const theme = useSelector(state => state.theme.value)
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    location.pathname === "/" && navigate("/profile");
  }, []);
  return (
    <ThemeProvider theme={theme}>
    <Container>
      <Header theme={theme}></Header>
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
