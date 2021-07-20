import React from "react";
import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

const Rightside = (props) => {
  const bannerCard = useRef();
  const [fixedPosition, setFixedPosition] = useState(false);
  useEffect(() => {
    // const initialTop = bannerCard.current.getBoundingClientRect().top;
    const handleScroll = () => {
      setFixedPosition(window.scrollY > 237);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Container>
      <FollowCard>
        <Title>
          <h2>Add to your feed</h2>
          <img src="/images/feed-icon.svg" alt="" />
        </Title>

        <FeedList>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#Linkedin</span>
              <button>Follow</button>
            </div>
          </li>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#Video</span>
              <button>Follow</button>
            </div>
          </li>
        </FeedList>

        <Recommendation>
          View all recommendations
          <img src="/images/right-icon.svg" alt="" />
        </Recommendation>
      </FollowCard>
      <ScrolledContainer fixed={fixedPosition} ref={bannerCard}>
        <BannerCard>
          <img src="/images/dreamjob.png" alt="" />
        </BannerCard>
        <Footer>
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a>Accessibility</a>
            </li>
            <li>
              <a>Help Center</a>
            </li>
            <li>
              <a>Privacy &amp; Terms</a>
            </li>
            <li>
              <a>Business Services</a>
            </li>
            <li>
              <a>Ad Choices</a>
            </li>
            <li>
              <a>Advertising</a>
            </li>
          </ul>
          <div>
            <img src="/images/linkedin.png" alt="" />
            <p>LinkedOut Corporation © 2021</p>
          </div>
        </Footer>
      </ScrolledContainer>
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightside;
`;

const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding: 12px;
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
`;

const FeedList = styled.ul`
  margin-top: 16px;
  li {
    display: flex;
    align-items: center;
    margin: 12px 0;
    position: relative;
    font-size: 14px;
    & > div {
      display: flex;
      flex-direction: column;
    }
    button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      border: 2px solid gray;
      padding: 16px;
      cursor: pointer;
      align-items: center;
      border-radius: 15px;
      box-sizing: border-box;
      font-weight: 600;
      display: inline-flex;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
    }
  }
`;

const Avatar = styled.div`
  background-image: url("https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  margin-right: 8px;
`;

const Recommendation = styled.a`
  color: #0a66c2;
  display: flex;
  align-items: center;
  font-size: 14px;
`;
const Footer = styled.div`
  width: 100%;
  font-size: 13px;
  background-color: transparent;
  border-radius: 5px;
  position: relative;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  color: rgb(0 0 0 / 60%);
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: 10px 20px 10px 20px;
  }
  li {
    text-decoration: none;
    list-style-type: none;
    a {
      padding-right: 5px;
      &:hover {
        text-decoration: underline;
        color: blue;
        cursor: pointer;
      }
    }
  }
  div {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 100px;
      // height: inherit;
      object-fit: contain;
    }
  }
`;
const ScrolledContainer = styled.div`
   width: 406px;
  ${(props) =>
    props.fixed &&
    css`
      position: fixed;
      top: 59px;
      img {
        width: 381.88px;
        object-fit: contain;
      }
    `}
  @media only screen and (max-width: 768px) {
    position: relative !important;
    top: 0;
    width: inherit;
  }
`;
const BannerCard = styled(FollowCard)`
  padding-top: 0px;
  padding-bottom: 0px;
  img {
    width: 100%;
    object-fit: contain;
  }
  @media (max-width: 768px) {
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    padding-top: 0px;
    padding-bottom: 0px;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  
`;

export default Rightside;
