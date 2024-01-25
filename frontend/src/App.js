import styled, { ThemeProvider } from "styled-components";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Header from "./components/Header";
import MainNavigation from "./components/MainNavigation";
import { useEffect, useState } from "react";
import Feed from "./pages/Feed/Feed";
import EditProfile from "./pages/EditProfile/EditProfile";
import { useSelector } from "react-redux";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import { Context } from './shared/Context.js';
import Friends from "./pages/Friends/Friends.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.mainBg};
  min-height: 100%;
  width: 100%;
  max-width: 1248px;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ pathname }) =>
    pathname != "/auth/login" && pathname != "/auth/registration" && "64px"};
  gap: 4px;
  margin-bottom: 12px;
  min-height: 100%;
`;

const ContentContainer = styled.div`
  width: 70%;
  height: 100%;
`;

function App() {
  const theme = useSelector((state) => state.theme.value);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useState(true)

  useEffect(() => {
    !isLogined && navigate("/auth/login");
  }, []);
  return (
    <Context.Provider value={{isLogined, setIsLogined}}>
    <ThemeProvider theme={theme}>
      {location.pathname !== "/auth/login" &&
        location.pathname !== "/auth/registration" && (
          <Header theme={theme}></Header>
        )}
      <Container>
        <Body pathname={location.pathname}>
          {location.pathname !== "/auth/login" &&
            location.pathname !== "/auth/registration" && (
              <MainNavigation></MainNavigation>
            )}
          <ContentContainer>
            <Routes>
              <Route path="/profile" element={<Profile></Profile>}></Route>
              <Route path="/feed" element={<Feed></Feed>}></Route>
              <Route path="/edit" element={<EditProfile></EditProfile>}></Route>
              <Route path="/auth/login" element={<Login></Login>}></Route>
              <Route path="/friends" element={<Friends></Friends>}></Route>
              <Route
                path="/auth/registration"
                element={<SignUp></SignUp>}
              ></Route>
            </Routes>
          </ContentContainer>
        </Body>
      </Container>
    </ThemeProvider>
    </Context.Provider>
  );
}

export default App;
