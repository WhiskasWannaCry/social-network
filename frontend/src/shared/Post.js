import styled from "@emotion/styled";
import authorImg from "../images/posts_img/avatar.png";
import likeImg from "../images/icons/like.png";
import likeFilledImg from "../images/icons/like-filled.png";
import commentImg from "../images/icons/comment.svg";
import { Avatar } from "@mui/material";
import { postLike } from "../http/Fetches";
import { Context } from "./Context";
import { useContext, useEffect, useState } from "react";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: auto;
  width: 100%;
  border-radius: 12px;
  background: ${(props) => props.theme.palette.primary.grey[5]};
  border: 1px solid ${(props) => props.theme.palette.primary.grey[3]};
  padding: 16px 20px 16px 20px;
`;

const HeaderContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 40px;
`;

const InfoContainer = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const AuthorName = styled("div")`
  color: #71aaeb;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

const PostDate = styled("div")`
  color: #828282;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;

const Description = styled("div")`
  width: 100%;
  color: ${(props) => props.theme.palette.primary.grey[1]};
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;

const ImgContainer = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100px;
  max-height: 560px;
  border-radius: 8px;
  overflow: hidden;
`;

const Image = styled("img")`
  width: 100%;
  height: auto;
  z-index: 2;
`;

const BlurredBackground = styled("div")`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -100px;
  left: -100%;
  width: 200%;
  height: 200%;
  z-index: 1;
  background-image: url(${({ postImg }) => postImg});
  background-size: 200%;
  background-repeat: no-repeat;
  filter: blur(30px);
`;

const Footer = styled("div")`
  display: flex;
  width: 100%;
  height: 32px;
  gap: 8px;
`;

const FooterBtnContainer = styled("div")`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 48px;
  max-width: 84px;
  height: 100%;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 32px;
  background: ${(props) => props.theme.palette.primary.grey[3]};
  gap: 4px;
  &:hover {
    background: ${(props) => props.theme.palette.primary.grey[2]};
  }
`;

const FooterBtnImg = styled("img")`
  width: 16px;
  height: 16px;
`;

const FooterBtnCounter = styled("span")`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #939393;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  color: ${(props) => props.theme.palette.primary.grey[1]};
`;

const Post = ({ post }) => {
  const { author, date, image, text, likes } = post;

  const currentUserContext = useContext(Context);
  const { currentUser } = currentUserContext;

  const [postLikes, setLikes] = useState({
    isLiked: false,
    count: 0,
  });

  const avatarFullPath = `http://localhost:8000/${author.images.avatar}`;
  const postImgFullPath = `http://localhost:8000/${image}`;

  useEffect(() => {
    const isLiked =
      post.likes.findIndex((likerId) => likerId === currentUser._id) !== -1;
    setLikes((prev) => ({
      ...prev,
      isLiked,
      count: likes.length,
    }));
  }, []);

  const handleLikeBtn = async () => {
    if (postLikes.isLiked) {
      setLikes((prev) => ({
        ...prev,
        isLiked: false,
        count: prev.count - 1,
      }));
    }
    if (!postLikes.isLiked) {
      setLikes((prev) => ({
        ...prev,
        isLiked: true,
        count: prev.count + 1,
      }));
    }

    const { data } = await postLike(currentUser._id, post._id);
    const { success } = data;
    if (!success) {
      setLikes((prev) => ({
        ...prev,
        isLiked: true,
        count: post.likes.length,
      }));
      const { message } = data;
      console.log(message);
      return alert(message);
    }
    const { likes } = data;
    const isLiked =
      likes.findIndex((likerId) => likerId === currentUser._id) !== -1;
    setLikes((prev) => ({
      ...prev,
      isLiked,
      count: likes.length,
    }));
  };

  return (
    <Container>
      <HeaderContainer>
        <Avatar
          src={avatarFullPath}
          alt="author_img"
          sx={{
            width: "40px",
            height: "40px",
          }}
        ></Avatar>
        <InfoContainer>
          <AuthorName>{author.primary.name}</AuthorName>
          <PostDate>{date}</PostDate>
        </InfoContainer>
      </HeaderContainer>
      {text ? <Description>{text}</Description> : null}
      {image ? (
        <ImgContainer>
          <Image src={postImgFullPath} alt="post_img"></Image>
          <BlurredBackground postImg={postImgFullPath}></BlurredBackground>
        </ImgContainer>
      ) : null}
      <Footer>
        <FooterBtnContainer onClick={handleLikeBtn}>
          <FooterBtnImg
            src={postLikes.isLiked ? likeFilledImg : likeImg}
            alt="footer_btn_img"
          ></FooterBtnImg>
          <FooterBtnCounter>{postLikes.count}</FooterBtnCounter>
        </FooterBtnContainer>
        <FooterBtnContainer>
          <FooterBtnImg src={commentImg} alt="footer_btn_img"></FooterBtnImg>
          <FooterBtnCounter>{post.comments.length}</FooterBtnCounter>
        </FooterBtnContainer>
      </Footer>
    </Container>
  );
};

export default Post;
