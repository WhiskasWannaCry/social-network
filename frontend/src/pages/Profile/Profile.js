import styled from "@emotion/styled";
import MainSide from "./ProfileMainSide";
import SecondarySide from "./ProfileSecondarySide";
import backgroundImage from "../../images/posts_img/post_img2.jpg";
import userImg from "../../images/posts_img/post_img4.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../shared/Context";
import { Avatar, Link, Typography } from "@mui/material";
import { getUserInfo } from "../../http/Fetches";
import { calculateAge } from "../../shared/functions";
import { PageLoader } from "../../shared/Loaders";

const Container = styled("div")`
  width: 100%;
`;

const UserHeaderContainer = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 322px;
  background-color: ${(props) => props.theme.palette.primary.grey[5]};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.palette.primary.grey[3]};
  overflow: hidden;
  transition: background-color 0.3s;
  transition: color 0.3s;
  -webkit-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  -moz-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
`;

const ChangeBackground = styled("div")`
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px 8px 16px;
  top: 12px;
  right: 12px;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  color: #fff;
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const UserBackground = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImg});
  background-size: 100%;
  background-repeat: no-repeat;
  z-index: 1;
`;

const InfoOuterContainer = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  min-height: 160px;
  z-index: 2;
`;

const UserInfoContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 95px;
  background-color: ${(props) => props.theme.palette.primary.grey[5]};
  padding: 20px;
  padding-left: 25%;
  transition: background-color 0.3s;
  transition: color 0.3s;
`;

const UserInfo = styled("div")`
  display: flex;
  flex-direction: column;
`;

const UserName = styled("div")`
  // пока что юзернейм если слишком большой то перенос не работает норм, надо фиксить
  color: ${(props) => props.theme.palette.primary.grey[1]};
  font-family: Roboto;
  font-size: 20.836px;
  font-style: normal;
  font-weight: 600;
  min-width: 100px;
  max-width: 150px;
  height: auto;
  transition: background-color 0.3s;
  transition: color 0.3s;
`;

const AddInfoBtn = styled("div")`
  cursor: pointer;
  color: #71aaeb;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;

const EditProfileBtn = styled("div")`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 6px 16px 6px 16px;
  border-radius: 8px;
  background: ${(props) => props.theme.palette.primary.grey[4]};
  color: ${(props) => props.theme.palette.primary.grey[1]};
  border: 1px solid ${(props) => props.theme.palette.primary.grey[3]};
  text-align: center;
  font-family: Roboto;
  font-size: 13.781px;
  font-style: normal;
  font-weight: 500;
  transition: background-color 0.3s;
  transition: color 0.3s;
  -webkit-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  -moz-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  &:hover {
    background: ${(props) => props.theme.palette.primary.grey[3]};
  }
`;

const UserBody = styled("div")`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  width: 100%;
`;

const Profile = () => {
  const navigate = useNavigate();
  const { _id: profileId } = useParams();

  const currentUserContext = useContext(Context);
  const { currentUser } = currentUserContext;

  const [profileOwner, setProfileOwner] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async (profileId) => {
      const { data } = await getUserInfo(profileId);

      const { success } = data;
      if (!success && data) {
        const { message } = data;
        console.log(data);
        if (message === "Invalid profile id") {
          navigate(`/profile/${currentUser._id}`);
        }
        alert(message);
        return;
      }
      const { user } = data;

      setProfileOwner(user);
      setLoading(false);
    };
    fetchUserInfo(profileId);
  }, [profileId]);

  useEffect(() => {
    if (profileOwner) {
      if (profileOwner._id === currentUser._id) {
        document.title = "My profile";
      } else {
        document.title =
          profileOwner.primary.name + " " + profileOwner.primary.surname;
      }
    }
  }, [profileOwner]);
  let avatarFullPath =
    `http://localhost:8000/${profileOwner?.images.avatar}` || userImg;
  let backgroundFullPath =
    `http://localhost:8000/${profileOwner?.images.background}` ||
    backgroundImage;

  return (
    <Container>
      <UserHeaderContainer>
        {loading ? (
          <PageLoader></PageLoader>
        ) : (
          <>
            <UserBackground bgImg={backgroundFullPath}></UserBackground>
            {profileOwner?._id == currentUser._id && (
              <ChangeBackground>Change background</ChangeBackground>
            )}
            <InfoOuterContainer>
              <Avatar
                alt="user-avatar"
                src={avatarFullPath || null}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: "42px",
                  width: "112px",
                  height: "112px",
                  border: (theme) =>
                    "1px solid" + theme.palette.primary.grey[5],
                }}
              ></Avatar>
              <UserInfoContainer>
                <UserInfo>
                  <UserName>
                    {profileOwner &&
                      profileOwner?.primary.name +
                        " " +
                        profileOwner?.primary.surname}
                  </UserName>
                  {profileOwner?._id == currentUser._id &&
                    !profileOwner.primary.dateOfbirth &&
                    !profileOwner.primary.website &&
                    !profileOwner.primary.description && (
                      <AddInfoBtn
                        onClick={() =>
                          profileOwner._id &&
                          navigate(`/edit/${currentUser._id}`)
                        }
                      >
                        Provide information about yourself
                      </AddInfoBtn>
                    )}
                  {profileOwner.primary.dateOfBirth && (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: (theme) => theme.palette.primary.grey[3],
                      }}
                    >
                      {calculateAge(profileOwner.primary.dateOfBirth)} years
                    </Typography>
                  )}
                  {profileOwner.primary.website && (
                    <Link
                      href={profileOwner.primary.website}
                      sx={{
                        cursor: "pointer",
                        fontSize: "12px",
                        color: (theme) => theme.palette.primary.grey[2],
                      }}
                    >
                      {profileOwner.primary.website}
                    </Link>
                  )}
                  {profileOwner.primary.description && (
                    <Typography
                      href={profileOwner.primary.website}
                      sx={{
                        fontSize: "14px",
                        color: (theme) => theme.palette.primary.grey[2],
                      }}
                    >
                      {profileOwner.primary.description}
                    </Typography>
                  )}
                </UserInfo>
                {profileOwner?._id === currentUser._id && (
                  <EditProfileBtn
                    onClick={() =>
                      profileOwner._id && navigate(`/edit/${currentUser._id}`)
                    }
                  >
                    Edit profile
                  </EditProfileBtn>
                )}
              </UserInfoContainer>
            </InfoOuterContainer>
          </>
        )}
      </UserHeaderContainer>
      <UserBody>
        <MainSide loading={loading} profileOwner={profileOwner}></MainSide>
        <SecondarySide
          loading={loading}
          profileOwner={profileOwner}
        ></SecondarySide>
      </UserBody>
    </Container>
  );
};

export default Profile;
