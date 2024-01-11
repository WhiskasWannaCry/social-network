import styled from "styled-components";
import authorImg from '../images/posts_img/avatar.png'
import likeImg from '../images/icons/like.svg'
import commentImg from '../images/icons/comment.svg'

const Container = styled.div`
display: flex;
flex-direction: column;
gap: 12px;
min-height: 200px;
width: 100%;
border-radius: 12px;
background: #222;
border: 1px solid #363738;
padding: 16px 20px 16px 20px;
`

const HeaderContainer = styled.div`
display: flex;
align-items: center;
gap: 12px;
width: 100%;
height: 40px;
`

const AuthorImg = styled.img`
width: 40px;
height: 40px;
`

const InfoContainer = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
width: 100%;
height: 100%;
`

const AuthorName = styled.div`
color: #71AAEB;
font-family: Roboto;
font-size: 13px;
font-style: normal;
font-weight: 500;
`

const PostDate = styled.div`
color: #828282;
font-family: Roboto;
font-size: 13px;
font-style: normal;
font-weight: 400;
`

const Description = styled.div`
width: 100%;
color: #E1E3E6;
font-family: Roboto;
font-size: 13px;
font-style: normal;
font-weight: 400;
`

const ImgContainer = styled.div`
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

const Image = styled.img` 
  width: 100%;
  z-index: 2;
`;

const BlurredBackground = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -100px;
  left: -100%;
  width: 200%;
  height: 200%;
  z-index: 1;
  background-image: url(${({postImg}) => postImg});
  background-size: 200%;
  background-repeat: no-repeat;
  filter: blur(30px);
`;

const Footer = styled.div`
display: flex;
width: 100%;
height: 32px;
gap: 8px;
`

const FooterBtnContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
min-width: 48px;
max-width: 84px;
height: 100%;
padding-left: 12px;
padding-right: 12px;
border-radius: 32px;
background: #333;
gap: 4px;
`

const FooterBtnImg = styled.img`
width: 24px;
height: 24px;
`

const FooterBtnCounter = styled.span`
display: flex;
justify-content: center;
align-items: center;
color: #939393;
font-family: Roboto;
font-size: 13px;
font-style: normal;
font-weight: 500;
`

const Post = ({postImg}) => {
  return (
    <Container>
      <HeaderContainer>
        <AuthorImg src={authorImg} alt="author_img"></AuthorImg>
        <InfoContainer>
          <AuthorName>Warrior</AuthorName>
          <PostDate>Today at 9:00</PostDate>
        </InfoContainer>
      </HeaderContainer>
      <Description>Some description</Description>
      <ImgContainer>
      <Image src={postImg} alt="post_img"></Image>
      <BlurredBackground postImg={postImg}></BlurredBackground>
      </ImgContainer>
      <Footer>
        <FooterBtnContainer>
          <FooterBtnImg src={likeImg} alt="footer_btn_img"></FooterBtnImg>
          <FooterBtnCounter>8</FooterBtnCounter>
        </FooterBtnContainer>
        <FooterBtnContainer>
          <FooterBtnImg src={commentImg} alt="footer_btn_img"></FooterBtnImg>
          <FooterBtnCounter>1022</FooterBtnCounter>
        </FooterBtnContainer>
      </Footer>
    </Container>
  )
}

export default Post;