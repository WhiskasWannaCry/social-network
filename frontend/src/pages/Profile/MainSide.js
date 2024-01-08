import styled from "styled-components";
import beginImg from '../../images/icons/begin.svg'
import beginCloseImg from '../../images/icons/begin_close.svg'

const Container = styled.div`
display: flex;
flex-direction: column;
width: 60%;
gap: 16px;
`

const BeginContainer = styled.div`
width: 100%;
height: 198px;
border-radius: 12px;
background-color: #292929;
box-shadow: 0px 0px 0px 1px #363738 inset;
`

const BeginTopContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 60px;
padding-left: 20px;
padding-right: 20px;
`

const BeginTitleContainer = styled.div`
display: flex;
align-items: center;
gap: 12px;
`

const BeginImg = styled.img`
width: 28px;
height: 28px;
`

const BeginTitle = styled.span`
color: #E1E3E6;
font-family: Roboto;
font-size: 16.734px;
font-style: normal;
font-weight: 600;
`

const BeginCloseBtn = styled.div`

`

const BeginCloseImg = styled.img`
width: 24px;
height: 24px;
`

const WhatNewContainer = styled.div`
width: 100%;
height: 52px;
border-radius: 12px;
background-color: #292929;
box-shadow: 0px 0px 0px 1px #363738 inset;
`

const MainSide = () => {
  return (
    <Container>
      <BeginContainer>
        <BeginTopContainer>
          <BeginTitleContainer>
            <BeginImg src={beginImg} alt="beginImg"></BeginImg>
            <BeginTitle>Where to begin?</BeginTitle>
          </BeginTitleContainer>
          <BeginCloseBtn>
              <BeginCloseImg src={beginCloseImg} alt="beginClose"></BeginCloseImg>
            </BeginCloseBtn>
        </BeginTopContainer>
      </BeginContainer>
      <WhatNewContainer></WhatNewContainer>
    </Container>
  )
}

export default MainSide;