import styled from "@emotion/styled";
import userImg from "../images/posts_img/post_img4.jpg";
import { Avatar, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Context } from "./Context";
import { useNavigate } from "react-router-dom";
import {
  postAddAsFriend,
  postFollow,
  postRemoveFriend,
  postUnfollow,
} from "../http/Fetches";
import { calculateAge } from "./functions";

const Container = styled("div")`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid ${(props) => props.theme.palette.primary.grey[3]};
  padding: 16px 0 16px 0;
`;

const UserInfo = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const DoBtn = styled(Button)`
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
  font-family: Roboto !important;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  text-transform: none;
  -webkit-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  -moz-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  &:hover {
    background-color: ${(props) => props.theme.palette.primary.hover[1]};
  }
`;

const UserCardSearch = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  const currentUserContext = useContext(Context);
  const { currentUser, setCurrentUser } = currentUserContext;
  const navigate = useNavigate();
  const avatarFullPath = user && `http://localhost:8000/${user.images.avatar}`;

  useEffect(() => {
    if (user) {
      const userFollowing = user.socialContacts.followers.find(
        (userFollowingId) => userFollowingId === currentUser._id
      );
      const userFollower = user.socialContacts.following.find(
        (userFollowerId) => userFollowerId === currentUser._id
      );
      const userFriend = user.socialContacts.friends.find(
        (userFriendId) => userFriendId === currentUser._id
      );
      if (userFollowing) {
        setIsFollowing(true);
      }
      if (userFollower) {
        setIsFollower(true);
      }
      if (userFriend) {
        setIsFollowing(false);
        setIsFollower(false);
        setIsFriend(true);
      }
    }
  }, [currentUser]);

  const handleFollow = async () => {
    const data = await postFollow(currentUser._id, user._id);
    const { success } = data;
    if (!success) {
      const { message } = data;
      console.log(message);
      return;
    }
    setIsFollowing(true);
  };

  const handleUnfollow = async () => {
    const { data } = await postUnfollow(currentUser._id, user._id);
    const { success } = data;
    if (!success) {
      const { message } = data;
      console.log(message);
      return;
    }
    setIsFollowing(false);
  };

  const handleAddAsFriend = async () => {
    const { data } = await postAddAsFriend(currentUser._id, user._id);
    const { success } = data;
    if (!success) {
      const { message } = data;
      console.log(message);
      return;
    }
    setIsFollowing(false);
    setIsFollower(false);
    setIsFriend(true);
  };

  const handleRemoveFriend = async () => {
    const { data } = await postRemoveFriend(currentUser._id, user._id);
    const { success } = data;
    if (!success) {
      const { message } = data;
      console.log(message);
      return;
    }
    setIsFollower(true);
    setIsFriend(false);
  };

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
          <UserAge>{calculateAge(user.primary.dateOfBirth)} years</UserAge>
        ) : null}
      </UserInfo>
      {currentUser &&
        user._id != currentUser._id &&
        (!isFollowing && !isFollower && !isFriend ? ( // если никто не подписан то кнопка "Следить"
          <DoBtn onClick={handleFollow}>Follow</DoBtn>
        ) : isFollowing && !isFollower && !isFriend ? ( // если юзер подписан безответно то кнопка "Отписаться"
          <DoBtn onClick={handleUnfollow}>Unfollow</DoBtn>
        ) : !isFollowing && isFollower && !isFriend ? (
          <DoBtn onClick={handleAddAsFriend}>Add as friend</DoBtn>
        ) : isFriend && !isFollowing && !isFollower ? (
          <DoBtn onClick={handleRemoveFriend}>Remove friend</DoBtn>
        ) : null)}
    </Container>
  );
};

export default UserCardSearch;
