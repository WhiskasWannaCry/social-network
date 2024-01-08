import React, { useState, useRef } from "react";
import styled from "styled-components";
import beginImg from "../../images/icons/begin.svg";
import beginCloseImg from "../../images/icons/begin_close.svg";
import nonePostsImg from "../../images/icons/none_posts.svg";
import friendsIcon from "../../images/icons/Navigation_icons/Friends.svg";
import educationIcon from "../../images/icons/education.png";
import musicIcon from "../../images/icons/music.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const BeginContainer = styled.div`
  width: 100%;
  height: 198px;
  border-radius: 12px;
  background-color: #222222;
  box-shadow: 0px 0px 0px 1px #363738 inset;
  overflow: hidden;
`;

const BeginTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
`;

const BeginTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BeginImg = styled.img`
  width: 28px;
  height: 28px;
`;

const BeginTitle = styled.span`
  color: #e1e3e6;
  font-family: Roboto;
  font-size: 16.734px;
  font-style: normal;
  font-weight: 600;
`;

const BeginCloseBtn = styled.div``;

const BeginCloseImg = styled.img`
  width: 24px;
  height: 24px;
`;

const BeginBlocksContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  gap: 12px;
  overflow-x: scroll;
  padding-bottom: 8px;
  &::-webkit-scrollbar {
    background-color: rgb(34, 34, 34);
  }
  &::-webkit-scrollbar-thumb {
    background: #292929;
  }
`;

const BeginBlock = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 224px;
  height: 118px;
  background: #292929;
  padding: 16px;
  border-radius: 10px;
`;

const BeginBlockIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const BeginBlockTitle = styled.span`
  color: #e1e3e6;
  font-family: Roboto;
  font-size: 12.898px;
  font-style: normal;
  font-weight: 500;
`;

const BeginBlockDesctiption = styled.span`
  color: #828282;
  font-family: Roboto;
  font-size: 12.492px;
  font-style: normal;
  font-weight: 400;
`;

const WhatNewContainer = styled.div`
  margin-top: 16px;
  width: 100%;
  height: 52px;
  border-radius: 12px;
  background-color: #222;
  box-shadow: 0px 0px 0px 1px #363738 inset;
`;

const PostsNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 16px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 18px;
  padding-bottom: 18px;
  height: 64px;
  width: 100%;
  border-radius: 12px 12px 0 0;
  border: 1px solid #363738;
  background-color: #222222;
`;

const PostsNavBtn = styled.div`
  height: 28px;
  border-radius: 8px;
  /* border: 1px solid #363738; */
  /* background-color: #333; //if active - none */
  color: #828282; //if active - #E1E3E6
  padding: 4px;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

const PostsContainer = styled.div`
  min-height: 159px;
  width: 100%;
  border-bottom: 1px solid #363738;
  border-left: 1px solid #363738;
  border-right: 1px solid #363738;
  border-radius: 0 0 12px 12px;
  background-color: #222222;
`;

const NonePostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const NonePostsImg = styled.img``;

const NonePostsTitle = styled.div`
  color: #828282;
  text-align: center;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;

const MainSide = () => {
  const scrollContainerRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleWheel = (e) => {
    // Установите желаемую скорость прокрутки
    const scrollSpeed = 0.4;
    const delta = e.deltaY || e.detail || -e.wheelDelta;

    // Вычислите новое положение прокрутки
    const newScrollLeft =
      scrollContainerRef.current.scrollLeft + delta * scrollSpeed;

    // Установите новое положение прокрутки
    scrollContainerRef.current.scrollLeft = newScrollLeft;

    // Обновите состояние
    setScrollLeft(newScrollLeft);
  };
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
        <BeginBlocksContainer ref={scrollContainerRef} onWheel={handleWheel}>
          <BeginBlock>
            <BeginBlockIcon src={friendsIcon} alt="blockIcon"></BeginBlockIcon>
            <BeginBlockTitle>Subscribe to friends</BeginBlockTitle>
            <BeginBlockDesctiption>
              follow the newspeople you are interested in
            </BeginBlockDesctiption>
          </BeginBlock>
          <BeginBlock>
            <BeginBlockIcon
              src={educationIcon}
              alt="blockIcon"
            ></BeginBlockIcon>
            <BeginBlockTitle>Write your education</BeginBlockTitle>
            <BeginBlockDesctiption>
              This way you will be found faster by those with what did you study
            </BeginBlockDesctiption>
          </BeginBlock>
          <BeginBlock>
            <BeginBlockIcon src={musicIcon} alt="blockIcon"></BeginBlockIcon>
            <BeginBlockTitle>Add music</BeginBlockTitle>
            <BeginBlockDesctiption>
              Listen to tracks and albums favorite artists
            </BeginBlockDesctiption>
          </BeginBlock>
        </BeginBlocksContainer>
      </BeginContainer>
      <WhatNewContainer></WhatNewContainer>
      <PostsNav>
        <PostsNavBtn>All posts</PostsNavBtn>
        <PostsNavBtn>My posts</PostsNavBtn>
      </PostsNav>
      <PostsContainer>
        <NonePostsContainer>
          <NonePostsImg src={nonePostsImg} alt="nonePosts"></NonePostsImg>
          <NonePostsTitle>There are no posts on the wall yet</NonePostsTitle>
        </NonePostsContainer>
      </PostsContainer>
    </Container>
  );
};

export default MainSide;
