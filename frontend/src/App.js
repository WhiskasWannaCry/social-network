import "./App.css";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Header from "./components/Header";
import MainNavigation from "./components/MainNavigation";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 12px;
`;

function App() {
  return (
    <Container>
      <Header></Header>
      <Body>
        <MainNavigation></MainNavigation>
        <Routes>
          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Routes>
      </Body>
    </Container>
  );
}

export default App;
