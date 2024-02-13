import styled, { ThemeProvider } from "styled-components";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  json,
  Navigate,
} from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Header from "./components/Header";
import MainNavigation from "./components/MainNavigation";
import { useEffect, useState } from "react";
import Feed from "./pages/Feed/Feed";
import EditProfile from "./pages/EditProfile/EditProfile";
import { useSelector } from "react-redux";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import { Context } from "./shared/Context.js";
import Friends from "./pages/Friends/Friends.js";
import { getIsValidToken } from "./shared/utils.js";

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

const userInit = {
  name: "",
  surname: "",
  age: "",
  avatar: "",
  background: "",
  email: "",
  password: "",
  role: "",
};

function App() {
  const theme = useSelector((state) => state.theme.value);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(userInit);
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    const tokenLS = JSON.parse(localStorage.getItem("token"));
    if (!tokenLS) {
      localStorage.setItem("token", JSON.stringify({ value: "0" }));
      setCurrentUser(userInit);
      navigate("/login");
      return;
    }

    if (tokenLS.value === "0") {
      setCurrentUser(userInit);
      navigate("/login");
      return;
    }

    if (tokenLS.value !== "0") {
      const fetchUserData = async () => {
        try {
          const res = await getIsValidToken(tokenLS);
          if (res && res.data) {
            const { data } = res;
            const { success } = data;
            if (!success) {
              const { message } = data;
              alert(message);
              setCurrentUser(userInit);
              localStorage.setItem("token", JSON.stringify({ value: "0" }));
              navigate("/login");
              return;
            }
            // if success
            const { foundUser } = data;
            console.log(foundUser)
            setCurrentUser(foundUser);
          } else {
            // Обработка ошибки
            console.log("Token error");
            localStorage.setItem("token", JSON.stringify({ value: "0" }));
            return;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setCurrentUser(userInit);
          navigate("/login");
          return;
        }
      };
      fetchUserData();
    }
  }, []);


  return (
    <Context.Provider value={{ currentUser, setCurrentUser,profileUser,setProfileUser }}>
      <ThemeProvider theme={theme}>
        {location.pathname !== "/login" &&
          location.pathname !== "/registration" && (
            <Header theme={theme}></Header>
          )}
        <Container>
          <Body pathname={location.pathname}>
            {location.pathname !== "/login" &&
              location.pathname !== "/registration" && (
                <MainNavigation></MainNavigation>
              )}
            <ContentContainer>
              <Routes>
                <Route
                  path="/profile/:_id"
                  element={<Profile></Profile>}
                ></Route>
                <Route path="/feed" element={<Feed></Feed>}></Route>
                <Route
                  path="/edit"
                  element={<EditProfile></EditProfile>}
                ></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/friends" element={<Friends></Friends>}></Route>
                <Route path="/registration" element={<SignUp></SignUp>}></Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ContentContainer>
          </Body>
        </Container>
      </ThemeProvider>
    </Context.Provider>
  );
}

export default App;
