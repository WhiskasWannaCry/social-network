import styled from "@emotion/styled";
import FeedSecondarySide from "./FeedSecondarySide";
import FeedMainSide from "./FeedMainSide";
import { useEffect } from "react";

const Container = styled("div")`
display: flex;
gap: 16px;
width: 100%;
`

const Feed = () => {
  useEffect(() => {
    document.title = 'Feed';
  }, []);
  return (
    <Container>
      <FeedMainSide></FeedMainSide>
      <FeedSecondarySide></FeedSecondarySide>
    </Container>
  )
}

export default Feed;