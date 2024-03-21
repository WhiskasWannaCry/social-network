import React, { useState, useRef, useContext, useEffect } from "react";
import beginImg from "../../images/icons/begin.svg";
import beginCloseImg from "../../images/icons/begin_close.svg";
import nonePostsImg from "../../images/icons/none_posts.svg";
import friendsIcon from "../../images/icons/Navigation_icons/Friends.svg";
import websiteIcon from "../../images/icons/website.png";
import infoIcon from "../../images/icons/info.png";
import AddNewPost from "../../shared/AddNewPost";
import styled from "@emotion/styled";
import { Context } from "../../shared/Context";
import { getPosts } from "../../http/Fetches";
import Post from "../../shared/Post.js";
import { PageLoader } from "../../shared/Loaders.js";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const BeginContainer = styled("div")`
  width: 100%;
  height: 198px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.primary.grey[4]};
  overflow: hidden;
  margin-bottom: 16px;
  transition: background-color 0.3s;
  transition: color 0.3s;
  transition: border 0.3s;
  -webkit-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  -moz-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
`;

const BeginTopContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
`;

const BeginTitleContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BeginImg = styled("img")`
  width: 28px;
  height: 28px;
`;

const BeginTitle = styled("span")`
  color: ${({ theme }) => theme.palette.primary.grey[1]};
  font-family: Roboto;
  font-size: 16.734px;
  font-style: normal;
  font-weight: 600;
  transition: background-color 0.3s;
  transition: color 0.3s;
`;

const BeginCloseBtn = styled("div")`
  cursor: pointer;
`;

const BeginCloseImg = styled("img")`
  width: 24px;
  height: 24px;
`;

const BeginBlocksContainer = styled("div")`
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  gap: 12px;
  overflow-x: scroll;
  padding-bottom: 8px;
  transition: background-color 0.3s;
  transition: color 0.3s;
  &::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.palette.primary.grey[3]};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.primary.grey[3]};
  }
`;

const BeginBlock = styled("div")`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-width: 224px;
  height: 118px;
  background: ${({ theme }) => theme.palette.primary.grey[5]};
  padding: 16px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.palette.primary.grey[4]};
  -webkit-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  -moz-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.grey[3]};
  }
`;

const BeginBlockIcon = styled("img")`
  width: 24px;
  height: 24px;
`;

const BeginBlockTitle = styled("span")`
  color: ${({ theme }) => theme.palette.primary.grey[1]};
  font-family: Roboto;
  font-size: 12.898px;
  font-style: normal;
  font-weight: 500;
`;

const BeginBlockDesctiption = styled("span")`
  color: #828282;
  font-family: Roboto;
  font-size: 12.492px;
  font-style: normal;
  font-weight: 400;
`;

const PostsNav = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 16px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 18px;
  padding-bottom: 18px;
  height: 64px;
  width: 100%;
  border-radius: 12px 12px 0 0;
  border: 1px solid ${({ theme }) => theme.palette.primary.grey[3]};
  background: ${({ theme }) => theme.palette.primary.grey[5]};
  -webkit-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  -moz-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
`;

const PostsNavBtn = styled("div")`
  height: 28px;
  border-radius: 8px;
  /* border: 1px solid #363738; */
  /* background-color: #333; //if active - none */
  color: #828282; //if active - #E1E3E6
  padding: 4px;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

const PostsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  min-height: 159px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.grey[3]};
  border-left: 1px solid ${({ theme }) => theme.palette.primary.grey[3]};
  border-right: 1px solid ${({ theme }) => theme.palette.primary.grey[3]};
  border-radius: 0 0 12px 12px;
  background: ${({ theme }) => theme.palette.primary.grey[5]};
  -webkit-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  -moz-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
`;

const NonePostsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const NonePostsImg = styled("img")``;

const NonePostsTitle = styled("div")`
  color: #828282;
  text-align: center;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;

const MainSide = ({ loading, profileOwner }) => {
  const scrollContainerRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const currentUserContext = useContext(Context);
  const { currentUser, posts, setPosts } = currentUserContext;

  const [loadingPosts, setLoadtingPosts] = useState(true);

  const handleWheel = (e) => {
    // Установите желаемую скорость прокрутки
    const scrollSpeed = 0.4;
    const delta = e.deltaY || e.detail || -e.wheelDelta;

    // Вычислите новое положение прокрутки
    const newScrollLeft =
      scrollContainerRef.current.scrollLeft + delta * scrollSpeed;

    // Установите новое положение прокрутки
    scrollContainerRef.current.scrollLeft = newScrollLeft;

    // Обновите состояние
    setScrollLeft(newScrollLeft);
  };

  const handleGetPosts = async () => {
    setLoadtingPosts(true)
    const { data } = await getPosts(profileOwner._id);
    const { success } = data;
    if (!success) {
      const { message } = data;
      setLoadtingPosts(false)
      console.log(message);
      return alert(message);
    }
    const { allPosts } = data;
    setPosts(allPosts);
    setLoadtingPosts(false)
  };

  useEffect(() => {
    if(profileOwner) {
      handleGetPosts();
    }
  }, [profileOwner]);

  return (
    <Container>
      {profileOwner && profileOwner?._id === currentUser._id && (
        <>
          {(!profileOwner.socialContacts.friends.length ||
            !profileOwner.primary.website ||
            !profileOwner.primary.description ||
            !profileOwner.primary.dateOfBirth) && (
            <BeginContainer>
              <BeginTopContainer>
                <BeginTitleContainer>
                  <BeginImg src={beginImg} alt="beginImg"></BeginImg>
                  <BeginTitle>Where to begin?</BeginTitle>
                </BeginTitleContainer>
                <BeginCloseBtn>
                  <BeginCloseImg
                    src={beginCloseImg}
                    alt="beginClose"
                  ></BeginCloseImg>
                </BeginCloseBtn>
              </BeginTopContainer>
              <BeginBlocksContainer
                ref={scrollContainerRef}
                onWheel={handleWheel}
              >
                {profileOwner.images.avatar === "user-avatar.png" && (
                  <BeginBlock>
                    <BeginBlockIcon
                      // src={musicIcon}
                      alt="blockIcon"
                    ></BeginBlockIcon>
                    <BeginBlockTitle>Add your avatar</BeginBlockTitle>
                    <BeginBlockDesctiption>
                      Friends will be able to recognize you from your photo
                    </BeginBlockDesctiption>
                  </BeginBlock>
                )}
                {profileOwner.socialContacts.friends.length === 0 && (
                  <BeginBlock>
                    <BeginBlockIcon
                      src={friendsIcon}
                      alt="blockIcon"
                    ></BeginBlockIcon>
                    <BeginBlockTitle>Subscribe to friends</BeginBlockTitle>
                    <BeginBlockDesctiption>
                      follow the newspeople you are interested in
                    </BeginBlockDesctiption>
                  </BeginBlock>
                )}
                {!profileOwner.primary.dateOfBirth && (
                  <BeginBlock>
                    <BeginBlockIcon
                      // src={musicIcon}
                      alt="blockIcon"
                    ></BeginBlockIcon>
                    <BeginBlockTitle>Add the Date of Birth</BeginBlockTitle>
                    <BeginBlockDesctiption>
                      Your friends will be able to congratulate you
                    </BeginBlockDesctiption>
                  </BeginBlock>
                )}
                {!profileOwner.primary.description && (
                  <BeginBlock>
                    <BeginBlockIcon
                      src={infoIcon}
                      alt="blockIcon"
                    ></BeginBlockIcon>
                    <BeginBlockTitle>
                      Add some short info about you
                    </BeginBlockTitle>
                    <BeginBlockDesctiption>
                      Users will be able to learn something new about you
                    </BeginBlockDesctiption>
                  </BeginBlock>
                )}
                {!profileOwner.primary.website && (
                  <BeginBlock>
                    <BeginBlockIcon
                      src={websiteIcon}
                      alt="blockIcon"
                    ></BeginBlockIcon>
                    <BeginBlockTitle>Write your Website</BeginBlockTitle>
                    <BeginBlockDesctiption>
                      Users will be able to see more about you
                    </BeginBlockDesctiption>
                  </BeginBlock>
                )}
              </BeginBlocksContainer>
            </BeginContainer>
          )}
          <AddNewPost></AddNewPost>
        </>
      )}
      <PostsNav>
        <PostsNavBtn>All posts</PostsNavBtn>
        <PostsNavBtn>My posts</PostsNavBtn>
      </PostsNav>
      <PostsContainer>
        {loadingPosts ? (
          <PageLoader></PageLoader>
        ) : (
          <>
            {posts && posts.length ? (
              posts
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((post) => <Post key={"PostComponent-" + post._id} post={post}></Post>)
            ) : (
              <NonePostsContainer>
                <NonePostsImg src={nonePostsImg} alt="nonePosts"></NonePostsImg>
                <NonePostsTitle>
                  There are no posts on the wall yet
                </NonePostsTitle>
              </NonePostsContainer>
            )}
          </>
        )}
      </PostsContainer>
    </Container>
  );
};

export default MainSide;
