import styled from "@emotion/styled";

const Container = styled("div")`
  /* margin-top: 16px; */
  width: 100%;
  height: 52px;
  border-radius: 12px;
  background: ${(props) => props.theme.palette.primary.grey[5]};
  border:${(props) => props.theme.palette.primary.grey[3]};
`;

const AddNewPost = () => {
  return <Container></Container>;
};

export default AddNewPost;
