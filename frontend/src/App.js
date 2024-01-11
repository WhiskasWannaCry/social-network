import "./App.css";
import styled from "styled-components";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Header from "./components/Header";
import MainNavigation from "./components/MainNavigation";
import { useEffect } from "react";
import News from "./pages/News/Feed";
import EditProfile from "./pages/EditProfile/EditProfile";

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    location.pathname === "/" && navigate("/profile");
  }, []);
  return (
    <Container>
      <Header></Header>
      <Body>
        <MainNavigation></MainNavigation>
        <ContentContainer>
          <Routes>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/feed" element={<News></News>}></Route>
            <Route path="/edit" element={<EditProfile></EditProfile>}></Route>
          </Routes>
        </ContentContainer>
      </Body>
    </Container>
  );
}

export default App;
