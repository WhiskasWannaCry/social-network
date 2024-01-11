import styled from "styled-components";
import FeedSecondarySide from "./FeedSecondarySide";
import FeedMainSide from "./FeedMainSide";

const Container = styled.div`
display: flex;
gap: 16px;
width: 100%;
`

const Feed = () => {
  return (
    <Container>
      <FeedMainSide></FeedMainSide>
      <FeedSecondarySide></FeedSecondarySide>
    </Container>
  )
}

export default Feed;