import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

const About = () => {
  let history = useHistory();
  return (
    <Container>
      <Content>
        <Header>
          <Logo>
            <a
              onClick={() => {
                history.push("/home");
              }}
            >
              <img src="/images/linkedin.png" alt="" />
            </a>
          </Logo>
        </Header>
        <Main>
          <LogoMain>
            <img src="/images/linkedinIcon.png" alt="" />
          </LogoMain>
          <AboutLinkedout>
            <p>About LinkedOut</p>
            <p>
              Welcome to LinkedIn, the world's largest professional network with
              756 million members in more than 200 countries and territories
              worldwide.
            </p>
          </AboutLinkedout>
          <Vision>
            <p>Vision</p>
            <p>
              Create economic opportunity for every member of the global
              workforce.
            </p>
          </Vision>
          <Mission>
            <p>Mission</p>
            <p>
              The mission of LinkedIn is simple: connect the world’s
              professionals to make them more productive and successful.
            </p>
          </Mission>
          <WhoAreWe>
            <p>Who are we?</p>
            <p>
              LinkedIn began in co-founder Reid Hoffman's living room in 2002
              and was officially launched on May 5, 2003.
            </p>
            <p>
              Today, LinkedIn leads a diversified business with revenues from
              membership subscriptions, advertising sales and recruitment
              solutions under the leadership of Ryan Roslansky. In December
              2016, Microsoft completed its acquisition of LinkedIn, bringing
              together the world’s leading professional cloud and the world’s
              leading professional network.
            </p>
          </WhoAreWe>
        </Main>
        <Footer>
          <p>For more information about company</p>
          <div>
            <ul>
              <li>
                <a>Company page</a>
              </li>
              <li>
                <a>Products and Services</a>
              </li>
              <li>
                <a>Pressroom</a>
              </li>
            </ul>
          </div>
          <SecondFooter>
            <div>
              <img src="/images/linkedin.png" alt="" />
            </div>
          </SecondFooter>
        </Footer>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  //position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 350px;
  z-index: 9999;
`;

const Content = styled.div`
  background: url("/images/aboutus-hero-banner.jpg") no-repeat center;
  // background-size: cover;
`;

const Header = styled.div`
  background-color: white;
  border-bottom: 2px solid rgba(16, 84, 231, 0.829);
  left: 0;
  padding-left: 20%;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;
const Logo = styled.div`
  width: 100px;
  padding-bottom: 30px;
  padding-top: 20px;
  img {
    width: 100%;
    object-fit: contain;
  }
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  text-align: center;
`;
const LogoMain = styled.div`
  padding-top: 25%;
  img {
    width: 65px;
    height: 65px;
  }
`;
const AboutLinkedout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;

  p:nth-child(1) {
    font-family: "Montserrat", sans-serif;
    line-height: 72px;
    font-weight: 200;
    color: rgba(0, 0, 0, 0.85);
    font-size: 50px;
  }
  p:nth-child(2) {
    width: 700px;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 200;
  }
`;
const Vision = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 50px 0px;
  p:nth-child(1) {
    font-family: "Montserrat", sans-serif;
    font-weight: 200;
    color: rgba(0, 0, 0, 0.85);
    font-size: 30px;
  }
  p:nth-child(2) {
    width: 700px;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 200;
  }
`;
const Mission = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 50px 0px;
  p:nth-child(1) {
    font-family: "Montserrat", sans-serif;
    font-weight: 200;
    color: rgba(0, 0, 0, 0.85);
    font-size: 30px;
  }
  p:nth-child(2) {
    width: 700px;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 200;
  }
`;
const WhoAreWe = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 50px 0px;
  p:nth-child(1) {
    font-family: "Montserrat", sans-serif;
    font-weight: 200;
    color: rgba(0, 0, 0, 0.85);
    font-size: 30px;
  }
  p:nth-child(2) {
    width: 700px;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 200;
  }
  p:nth-child(3) {
    width: 900px;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 200;
  }
`;

const Footer = styled.div`
  width: 100%;
  //height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  p {
    font-size: 25px;
    padding-top: 30px;
    font-weight: 200;
    //padding-bottom: 30px;
  }
  div:nth-child(2) {
    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      list-style-type: none;
    }
  }
  //height: 300px;
`;

const SecondFooter = styled.div`
  div {
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
`;

export default About;
