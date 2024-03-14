import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
import { Context } from "./Context";
import { useContext, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { postNewPost } from "../http/Fetches";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  border-radius: 12px;
  background: ${(props) => props.theme.palette.primary.grey[5]};
  border: 1px solid ${(props) => props.theme.palette.primary.grey[3]};
  padding: 16px;
`;

const AddNewPost = () => {
  const currentUserContext = useContext(Context);
  const { currentUser, setPosts } = currentUserContext;

  const [newPostSending, setNewPostSending] = useState(false);
  const [postData, setPostData] = useState({
    authorID: "",
    date: "",
    text: "",
    image: "",
  });

  const handleSendNewPost = async () => {
    setNewPostSending(true)

    const textRegex = /\S/;

    const isTextValid = textRegex.test(postData.text);

    if(!isTextValid) {
      setNewPostSending(false)
      return alert("Invalit text field")
    }

    if (!postData.text && !postData.image) {
      setNewPostSending(false)
      return alert("Invalid fields")
    }

    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    const newPost = {
      ...postData,
      authorID: currentUser._id,
      date: formattedDate,
    };
    const { data } = await postNewPost(currentUser._id, "profile", newPost);
    if(!data) {
      setNewPostSending(false)
      return alert("Something wrond (add new post)")
    }
    const {success} = data;
    if(!success) {
      const {message} = data;
      console.log("Error add new post:" , message)
      setNewPostSending(false)
      return alert(message)
    }
    const {allUserPosts} = data;
    setPosts(allUserPosts);
    setNewPostSending(false)
    console.log(allUserPosts)
  };

  return (
    <Container>
      <TextField
        id="outlined-multiline-flexible"
        label="What's new?"
        multiline
        maxRows={4}
        value={postData.text}
        onChange={(event) => {
          setPostData((prev) => ({
            ...prev,
            text: event.target.value,
          }));
        }}
        sx={{
          width: "100%",
          borderRadius: "12px",
          padding: "8px",
          // textfield
          ".css-kptawt-MuiInputBase-root-MuiOutlinedInput-root": {
            color: (theme) => theme.palette.primary.grey[1],
            fontSize: "14px",
          },

          // placeholder color
          ".css-tmp4qz-MuiFormLabel-root-MuiInputLabel-root": {
            color: (theme) => theme.palette.primary.grey[3],
            fontSize: "14px",
          },

          // Focused
          ".css-kptawt-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: (theme) => "1px solid " + theme.palette.primary.grey[3],
            },
        }}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <LoadingButton
          loading={newPostSending}
          variant="contained"
          onClick={handleSendNewPost}
          sx={{
            border: (theme) => "1px solid " + theme.palette.primary.grey[3],
            backgroundColor: (theme) => theme.palette.primary.grey[5],
            color: (theme) => theme.palette.primary.grey[1],
            WebkitBoxShadow: "0px 0px 6px 2px rgba(0,0,0,0.5)",
            MozBoxShadow: "0px 0px 6px 2px rgba(0, 0, 0, 0.5)",
            boxShadow: "0px 0px 6px 2px rgba(0,0,0,0.5)",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.grey[4],
              fontSize: "14px",
            },
          }}
        >
          Send
        </LoadingButton>
        {/* <Button
          variant="contained"
          onClick={handleSendNewPost}
          sx={{
            border: (theme) => "1px solid " + theme.palette.primary.grey[3],
            backgroundColor: (theme) => theme.palette.primary.grey[5],
            color: (theme) => theme.palette.primary.grey[1],
            WebkitBoxShadow: "0px 0px 6px 2px rgba(0,0,0,0.5)",
            MozBoxShadow: "0px 0px 6px 2px rgba(0, 0, 0, 0.5)",
            boxShadow: "0px 0px 6px 2px rgba(0,0,0,0.5)",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.grey[4],
              fontSize: "14px",
            },
          }}
        >
          Send
        </Button> */}
      </Box>
    </Container>
  );
};

export default AddNewPost;
