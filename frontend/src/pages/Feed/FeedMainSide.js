import styled from "@emotion/styled";
import AddNewPost from "../../shared/AddNewPost";
import Post from "../../shared/Post";
import { getPosts } from "../../http/Fetches";
import { Context } from "../../shared/Context";
import { useContext, useEffect, useState } from "react";
import { PageLoader } from "../../shared/Loaders";
import nonePostsImg from "../../images/icons/none_posts.svg";
import { Box } from "@mui/material";

const PostsContainer = styled(Box)`
  display: flex;
  justify-content: "center";
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
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

const FeedMainSide = () => {
  const currentUserContext = useContext(Context);
  const { currentUser, posts, setPosts } = currentUserContext;
  const [loadingPosts, setLoadtingPosts] = useState(true);

  const handleGetPosts = async () => {
    const { data } = await getPosts();
    const { success } = data;
    if (!success) {
      const { message } = data;
      setLoadtingPosts(false);
      console.log(message);
      return alert(message);
    }
    const { allPosts } = data;
    setPosts(allPosts);
    setLoadtingPosts(false);
  };

  useEffect(() => {
    handleGetPosts();
  }, []);
  return (
    <Box
      sx={{
        width: {
          xl: "70%",
          lg: "70%",
          md: "90%",
          sm: "90%",
          xs: "90%",
        },
      }}
    >
      <AddNewPost></AddNewPost>

      {loadingPosts ? (
        <PageLoader></PageLoader>
      ) : (
        <PostsContainer>
          {posts && posts.length ? (
            posts
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((post) => (
                <Post key={"PostComponent-" + post._id} post={post}></Post>
              ))
          ) : (
            <NonePostsContainer>
              <NonePostsImg src={nonePostsImg} alt="nonePosts"></NonePostsImg>
              <NonePostsTitle>
                There are no posts on the wall yet
              </NonePostsTitle>
            </NonePostsContainer>
          )}{" "}
        </PostsContainer>
      )}
    </Box>
  );
};

export default FeedMainSide;
