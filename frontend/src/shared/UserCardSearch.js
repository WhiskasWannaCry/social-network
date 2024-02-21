import styled from "@emotion/styled";
import userImg from "../images/posts_img/post_img4.jpg";
import { Avatar } from "@mui/material";
import { useContext } from "react";
import { Context } from "./Context";
import { useNavigate } from "react-router-dom";

const Container = styled("div")`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid ${(props) => props.theme.palette.primary.grey[3]};
  padding: 16px 0 16px 0;
`;

const UserImgContainer = styled("div")`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
`;

const UserImg = styled("img")`
  width: 100%;
`;

const UserInfo = styled("div")`
  display: flex;
  flex-direction: column;
  // if it's current user => remove doBtn and width info block +30%
  ${({ userId, currentUserId }) =>
    userId != currentUserId
      ? `
    width: 50%;`
      : `width: 80%;`}

  height: 100%;
  padding: 0 8px 0 8px;
`;

const UserName = styled("div")`
  cursor: pointer;
  color: rgb(113, 170, 235);
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  &:hover {
    text-decoration: underline;
  }
`;

const UserAge = styled("div")`
  color: rgb(130, 130, 130);
  font-family: Roboto;
  font-size: 12.492px;
  font-style: normal;
  font-weight: 400;
`;

const DoBtn = styled("div")`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.palette.primary.grey[4]};
  border: 1px solid ${(props) => props.theme.palette.primary.grey[3]};
  color: ${(props) => props.theme.palette.primary.grey[1]};
  width: 30%;
  padding: 4px 8px 4px 8px;
  border-radius: 4px;
  font-family: Roboto;
  font-size: 12.492px;
  font-style: normal;
  font-weight: 400;
  &:hover {
    background-color: ${(props) => props.theme.palette.primary.hover[1]};
  }
`;

const UserCardSearch = ({ user }) => {
  const currentUserContext = useContext(Context);
  const { currentUser, setCurrentUser } = currentUserContext; // нужно будет написать логику отображения профилей других юзеров
  const navigate = useNavigate();
  const avatarFullPath = user && `http://localhost:8000/${user.images.avatar}`;
  return (
    <Container>
      <Avatar
        alt="user-avatar"
        src={(user.images.avatar && avatarFullPath) || null}
        sx={{
          width: "64px",
          height: "64px",
          border: (theme) => "1px solid" + theme.palette.primary.grey[5],
        }}
      ></Avatar>
      <UserInfo userId={user._id} currentUserId={currentUser._id}>
        <UserName onClick={() => navigate(`../profile/${user._id}`)}>
          {user.primary.name &&
            user.primary.surname &&
            user.primary.name + " " + user.primary.surname}
        </UserName>
        {user.primary.dateOfBirth ? (
          <UserAge>{user.primary.dateOfBirth}</UserAge>
        ) : null}
      </UserInfo>
      {user._id != currentUser._id && <DoBtn>Add as Friend</DoBtn>}
    </Container>
  );
};

export default UserCardSearch;
