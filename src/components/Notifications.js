import React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  function getNotifications() {
    axios
      .get("")
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Container>
      <Layout>
        <LeftPart>leftPart</LeftPart>
        <Main>
          <NotificationsList></NotificationsList>
        </Main>
        <RightPart>
          <BannerCard>
            <img src="/images/dreamjob.png" alt="" />
          </BannerCard>
          <Footer>
            <ul>
              <li>
                <a>About</a>
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
        </RightPart>
      </Layout>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 50px;
  width: 100%;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftpart main rightpart ";
  grid-template-columns: minmax(0, 2fr) minmax(0, 12fr) minmax(0, 4fr);
  column-gap: 25px;
  row-gap: 15px;
  grid-template-rows: auto;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

const RightPart = styled.div`
  grid-area: rightpart;
`;

const LeftPart = styled.div`
  grid-area: leftpart;
  width: 100%;
  height: 200px;
  //overflow: hidden;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
`;

const Main = styled.div`
  grid-area: main;
  width: 100%;
  height: 540px;
  //overflow: hidden;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
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

const BannerCard = styled(FollowCard)`
  padding-top: 0px;
  padding-bottom: 0px;
  img {
    width: 100%;
    object-fit: contain;
  }
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

const NotificationsList = styled.div``;

export default Notifications;
