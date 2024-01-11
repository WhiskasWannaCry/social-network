import styled from "styled-components";
import AddNewPost from "../../shared/AddNewPost";
import Post from "../../shared/Post";
import postImg from '../../images/posts_img/post_img.png'
import postImg2 from '../../images/posts_img/post_img2.jpg'
import postImg3 from '../../images/posts_img/post_img3.jpeg'
import postImg4 from '../../images/posts_img/post_img4.jpg'

const Container = styled.div`
  width: 60%;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

const FeedMainSide = () => {
  return (
    <Container>
      <AddNewPost></AddNewPost>
      <PostsContainer>
        <Post postImg={postImg}></Post>
        <Post postImg={postImg2}></Post>
        <Post postImg={postImg3}></Post>
        <Post postImg={postImg4}></Post>
      </PostsContainer>
    </Container>
  );
};

export default FeedMainSide;
