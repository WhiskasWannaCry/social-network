import styled from "styled-components";
import communityImg from '../../images/communities_img/community_img1.png'

const Container = styled.div`
width: 40%;
`

const FeaturedCommunitiesContainer = styled.div`
position: sticky;
top: 64px;
display: flex;
flex-direction: column;
width: 100%;
height: 458px;
border-radius: 12px;
background: #222;
border: 1px solid #363738;
padding-left: 20px;
padding-right: 20px;
padding-top: 16px;
padding-bottom: 16px;
`

const FeaturedCommunitiesTitle = styled.span`
color: #E1E3E6;
font-family: Segoe UI;
font-size: 14px;
font-style: normal;
font-weight: 400;
`

const FeaturedCommunitiesList = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
height: 100%;
width: 100%;
margin-top: 16px;
margin-bottom: 16px;
`

const CommunityContainer = styled.div`
cursor: pointer;
display: flex;
gap: 12px;
height: 48px;
width: 100%;
border-radius: 8px;
&:hover {
  background-color: #292929;
}
`

const CommunityImg = styled.img`
height: 48px;
width: 48px;
`

const CommunityTitleAndSubs = styled.div`
display: flex;
flex-direction: column;
`

const CommunityTitle = styled.span`
color: #E1E3E6;
font-family: Segoe UI;
font-size: 13px;
font-style: normal;
font-weight: 400;
`

const CommunitySubs = styled.span`
color: #828282;
font-family: Segoe UI;
font-size: 13px;
font-style: normal;
font-weight: 400;
`

const ShowAllCommunitiesBtn = styled.div`
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 27.99px;
background: rgba(255, 255, 255, 0.10);
border-radius: 8px;
color: #E1E3E6;
text-align: center;
font-family: Segoe UI;
font-size: 14px;
font-style: normal;
font-weight: 400;
&:hover {
  background: rgba(255, 255, 255, 0.20);
}
`

const FeedSecondarySide = () => {
  return (
    <Container>
      <FeaturedCommunitiesContainer>
        <FeaturedCommunitiesTitle>Featured Communities</FeaturedCommunitiesTitle>
        <FeaturedCommunitiesList>
          <CommunityContainer>
            <CommunityImg src={communityImg} alt="comm_img"></CommunityImg>
            <CommunityTitleAndSubs>
              <CommunityTitle>АниЛибрия</CommunityTitle>
              <CommunitySubs>338 916 subscribers</CommunitySubs>
            </CommunityTitleAndSubs>
          </CommunityContainer>
          <CommunityContainer>
            <CommunityImg src={communityImg} alt="comm_img"></CommunityImg>
            <CommunityTitleAndSubs>
              <CommunityTitle>АниЛибрия</CommunityTitle>
              <CommunitySubs>338 916 subscribers</CommunitySubs>
            </CommunityTitleAndSubs>
          </CommunityContainer>
          <CommunityContainer>
            <CommunityImg src={communityImg} alt="comm_img"></CommunityImg>
            <CommunityTitleAndSubs>
              <CommunityTitle>АниЛибрия</CommunityTitle>
              <CommunitySubs>338 916 subscribers</CommunitySubs>
            </CommunityTitleAndSubs>
          </CommunityContainer>
          <CommunityContainer>
            <CommunityImg src={communityImg} alt="comm_img"></CommunityImg>
            <CommunityTitleAndSubs>
              <CommunityTitle>АниЛибрия</CommunityTitle>
              <CommunitySubs>338 916 subscribers</CommunitySubs>
            </CommunityTitleAndSubs>
          </CommunityContainer>
          <CommunityContainer>
            <CommunityImg src={communityImg} alt="comm_img"></CommunityImg>
            <CommunityTitleAndSubs>
              <CommunityTitle>АниЛибрия</CommunityTitle>
              <CommunitySubs>338 916 subscribers</CommunitySubs>
            </CommunityTitleAndSubs>
          </CommunityContainer>
          <CommunityContainer>
            <CommunityImg src={communityImg} alt="comm_img"></CommunityImg>
            <CommunityTitleAndSubs>
              <CommunityTitle>АниЛибрия</CommunityTitle>
              <CommunitySubs>338 916 subscribers</CommunitySubs>
            </CommunityTitleAndSubs>
          </CommunityContainer>
        </FeaturedCommunitiesList>
        <ShowAllCommunitiesBtn>Show all communities</ShowAllCommunitiesBtn>
      </FeaturedCommunitiesContainer>
    </Container>
  )
}

export default FeedSecondarySide;