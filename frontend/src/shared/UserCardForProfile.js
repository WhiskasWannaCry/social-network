import styled from "@emotion/styled";
import { Avatar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserInfo } from "../http/Fetches";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 48px;
  height: 48px;
  background: ${(props) => props.theme.palette.primary.grey[5]};
  border: ${(props) => props.theme.palette.primary.grey[3]};
`;

const UserCardForProfile = ({ userId }) => {
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await getUserInfo(userId);
      if (!data) {
        console.log("Something wrong on getUser(UserCardForProfile)");
      }
      const { success } = data;
      if (!success) {
        const { message } = data;
        console.log(message);
      }
      const { user } = data;
      setFriend(user);
    };
    getUser();
  }, [userId]);
  const avatarFullPath =
    friend && `${env.URL_SERVICES}:${env.PORT_SERVICE_ROOT}/${friend.images.avatar}`;

  return (
    <Container>
      <Avatar
        alt={friend && friend.primary.name + " " + friend.primary.surname}
        src={avatarFullPath}
        onClick={() => navigate(`../profile/${userId}`)}
        sx={{
          cursor: "pointer",
        }}
      ></Avatar>
      <Typography
        variant="body2"
        sx={{
          fontSize: "8px",
        }}
      >
        {friend && friend.primary.name}
      </Typography>
    </Container>
  );
};

export default UserCardForProfile;
