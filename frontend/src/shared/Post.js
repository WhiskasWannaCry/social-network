import styled from "@emotion/styled";
import likeImg from "../images/icons/like.png";
import likeFilledImg from "../images/icons/like-filled.png";
import commentImg from "../images/icons/comment.svg";
import { Avatar, Box, InputBase, Typography } from "@mui/material";
import { postComment, postLike } from "../http/Fetches";
import { Context } from "./Context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import EmojiPicker from "emoji-picker-react";
import emojiPickerImg from "../images/icons/emoji-picker.png";

const Container = styled("div")`
  position: relative;
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
  cursor: pointer;
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
  const navigate = useNavigate();

  const { author, date, image, text, likes } = post;

  const currentUserContext = useContext(Context);
  const { currentUser } = currentUserContext;

  const [postLikes, setLikes] = useState({
    isLiked: false,
    count: 0,
  });
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState("");

  const [loadingSendComment, setLoadingSendComment] = useState(false);

  const [isOpenPicker, setIsOpenPicker] = useState(false);

  const [showAllComments, setShowAllComments] = useState(false);

  const avatarFullPath = `http://localhost:8000/${author.images.avatar}`;
  const postImgFullPath = `http://localhost:8000/${image}`;

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
    const { likes, comments } = data;
    const isLiked =
      likes.findIndex((likerId) => likerId === currentUser._id) !== -1;
    setLikes((prev) => ({
      ...prev,
      isLiked,
      count: likes.length,
    }));
  };

  const handleAddNewComment = async () => {
    setInputComment("");
    if (!inputComment) {
      setLoadingSendComment(false);
      setIsOpenPicker(false);
      return alert("Enter correct comment");
    }
    setLoadingSendComment(true);
    const newComment = {
      author: currentUser._id,
      text: inputComment,
      date: new Date(),
    };
    const { data } = await postComment(currentUser._id, post._id, newComment);
    if (data) {
      const { success } = data;
      if (!success) {
        const { message } = data;
        setLoadingSendComment(false);
        setIsOpenPicker(false);
        return alert(message);
      }
      const { comments } = data;
      console.log(comments);
      setComments(comments);
    }
    setLoadingSendComment(false);
    setIsOpenPicker(false);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Effects

  useEffect(() => {
    const isLiked =
      post.likes.findIndex((likerId) => likerId === currentUser._id) !== -1;
    setLikes((prev) => ({
      ...prev,
      isLiked,
      count: likes.length,
    }));
    setComments(post.comments);
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <Avatar
          src={avatarFullPath}
          alt="author_img"
          onClick={() => navigate(`/profile/${author._id}`)}
          sx={{
            cursor: "pointer",
            width: "40px",
            height: "40px",
          }}
        ></Avatar>

        <InfoContainer>
          <AuthorName onClick={() => navigate(`/profile/${author._id}`)}>
            {author.primary.name} {author.primary.surname}
          </AuthorName>
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
          <FooterBtnCounter>{comments.length}</FooterBtnCounter>
        </FooterBtnContainer>
      </Footer>
      <Box // HR
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: (theme) => theme.palette.primary.grey[3],
        }}
      ></Box>
      <Box //Container for all comments
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {comments.length
          ? comments.map((comment, idx) =>
              showAllComments ? (
                <Box // Container for one comment
                  key={comment._id}
                  sx={{
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <Avatar
                    onClick={() => navigate(`./profile/${comment.author._id}`)}
                    src={`http://localhost:8000/${comment?.author?.images?.avatar}`}
                    alt="avatar"
                    sx={{
                      cursor: "pointer",
                      width: "32px",
                      height: "32px",
                    }}
                  ></Avatar>
                  <Box // Contailer for name, text and date
                    key={comment._id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <Typography
                      onClick={() =>
                        navigate(`./profile/${comment.author._id}`)
                      }
                      sx={{
                        cursor: "pointer",
                        color: "#71aaeb",
                        fontFamily: "Roboto",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                      }}
                    >
                      {comment.author.primary.name +
                        " " +
                        comment.author.primary.surname}
                    </Typography>
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.primary.grey[1],
                        fontFamily: "Roboto",
                        fontSize: "12px",
                        fontStyle: "normal",
                      }}
                    >
                      {comment.text}
                    </Typography>
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.primary.grey[3],
                        fontFamily: "Roboto",
                        fontSize: "12px",
                        fontStyle: "normal",
                      }}
                    >
                      {formatDate(new Date(comment.date))}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                idx < 2 && (
                  <Box // Container for one comment
                    key={comment._id}
                    sx={{
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    <Avatar
                      onClick={() =>
                        navigate(`./profile/${comment.author._id}`)
                      }
                      src={`http://localhost:8000/${comment?.author?.images?.avatar}`}
                      alt="avatar"
                      sx={{
                        cursor: "pointer",
                        width: "32px",
                        height: "32px",
                      }}
                    ></Avatar>
                    <Box // Contailer for name, text and date
                      key={comment._id}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <Typography
                        onClick={() =>
                          navigate(`./profile/${comment.author._id}`)
                        }
                        sx={{
                          cursor: "pointer",
                          color: "#71aaeb",
                          fontFamily: "Roboto",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: 500,
                        }}
                      >
                        {comment.author.primary.name +
                          " " +
                          comment.author.primary.surname}
                      </Typography>
                      <Typography
                        sx={{
                          color: (theme) => theme.palette.primary.grey[1],
                          fontFamily: "Roboto",
                          fontSize: "12px",
                          fontStyle: "normal",
                        }}
                      >
                        {comment.text}
                      </Typography>
                      <Typography
                        sx={{
                          color: (theme) => theme.palette.primary.grey[3],
                          fontFamily: "Roboto",
                          fontSize: "12px",
                          fontStyle: "normal",
                        }}
                      >
                        {formatDate(new Date(comment.date))}
                      </Typography>
                    </Box>
                  </Box>
                )
              )
            )
          : null}

        {comments.length > 2 && (
          <Typography
            onClick={() => setShowAllComments(!showAllComments)}
            sx={{
              cursor: "pointer",
              color: "#71aaeb",
              fontFamily: "Roboto",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 500,
              textDecoration: "underline",
            }}
          >
            {showAllComments ? "Hide showed comments" : "Show all comments"}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          gap: "8px",
        }}
      >
        <EmojiPicker
          open={isOpenPicker}
          theme="dark"
          lazyLoadEmojis={true}
          style={{
            position: "absolute",
            top: "40px",
            left: "20px",
            zIndex: 4,
          }}
          onEmojiClick={(props) => {
            setInputComment((prev) => prev + props.emoji);
          }}
        ></EmojiPicker>
        <Avatar
          alt="emoji-picker"
          src={emojiPickerImg}
          onClick={() => setIsOpenPicker(!isOpenPicker)}
          sx={{
            cursor: "pointer",
            width: "20px",
            height: "20px",
          }}
        ></Avatar>
        <InputBase
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
          sx={{
            ml: 1,
            flex: 1,
            color: (theme) => theme.palette.primary.grey[1],
            border: (theme) => `1px solid ${theme.palette.primary.grey[3]}`,
            borderRadius: "4px",
            width: "80%",
            padding: "4px",
            fontSize: "12px",
          }}
          placeholder="Enter Your comment"
          inputProps={{ "aria-label": "Enter Your comment" }}
        />
        <LoadingButton
          variant="outlined"
          loading={loadingSendComment}
          sx={{
            textTransform: "none",
            border: (theme) => `1px solid ${theme.palette.primary.grey[3]}`,
          }}
          onClick={handleAddNewComment}
        >
          Add
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default Post;
