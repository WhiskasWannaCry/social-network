import styled from "styled-components";

const Container = styled.div`
  /* margin-top: 16px; */
  width: 100%;
  height: 52px;
  border-radius: 12px;
  background: ${(props) => props.theme.mainBlockBg};
  border: ${(props) => props.theme.mainBlockBorder};
`;

const AddNewPost = () => {
  return <Container></Container>;
};

export default AddNewPost;
