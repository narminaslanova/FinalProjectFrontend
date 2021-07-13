import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Messaging = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.authentication);
  const token = user.user.token;
  const decoded = jwt_decode(token);
  const getUsers = async () => {
    axios
      .get("https://localhost:44331/api/Authenticate/GetAllUsers")
      .then((response) => {
        console.log("axios", response.data);
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Container>
      <Layout>
        <RightContent>
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
        </RightContent>
        <LeftContent>
          <ChatList>
            <h1>Messaging</h1>
            {users.map(
              (item) =>
                decoded.id !== item.id && (
                  <UserList key={item.id}>
                    <UserImage>
                      <img src="/images/user.svg" alt="" />
                    </UserImage>
                    <UserInfo>
                      <h4>{item.firstName + " " + item.lastName}</h4>
                      <span>last sent message here</span>
                    </UserInfo>
                  </UserList>
                )
            )}
          </ChatList>
          <Content>
            <ChatBox>
              <h1>Name Surname</h1>
              <UserDetails>
                <Image>
                  <img src="/images/user.svg" alt="" />
                </Image>
                <h4>Name Surname</h4>
                <span>Occupation</span>
              </UserDetails>
              <DisplayMessages>Messages</DisplayMessages>
            </ChatBox>
            <SendMessage>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message..."
              />
              <button>Send</button>
            </SendMessage>
          </Content>
        </LeftContent>
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
  grid-template-areas: "test leftpart rightpart ";
  grid-template-columns: minmax(0, 1fr) minmax(0, 12fr) minmax(0, 4fr);
  column-gap: 25px;
  row-gap: 15px;
  grid-template-rows: auto;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
    padding: 0 5px;
  }
`;

const RightContent = styled.div`
  grid-area: rightpart;
`;
const BannerCard = styled.div`
  padding-top: 0px;
  padding-bottom: 0px;
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
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
      object-fit: contain;
    }
  }
`;

const LeftContent = styled.div`
  grid-area: leftpart;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
  display: flex;
`;

const ChatList = styled.div`
  width: 300px;
  height: 100%;
  border-right: 1px solid rgba(219, 210, 210, 0.445);
  h1 {
    padding: 10px 10px;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    border-bottom: 1px solid rgba(219, 210, 210, 0.445);
  }
`;

const UserList = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 20px;
`;
const UserImage = styled.div`
  padding-left: 15px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
const UserInfo = styled.div`
  padding-left: 10px;
  font-family: "Montserrat", sans-serif;
  h4 {
    font-weight: 200;

    color: gray;
  }
  span {
    font-size: 14px;
  }
`;

const Content = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ChatBox = styled.div`
  width: 100%;
  overflow: hidden;
  h1 {
    padding: 10px 10px;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    border-bottom: 1px solid rgba(219, 210, 210, 0.445);
  }
`;
const UserDetails = styled.div`
  padding-top: 20px;
  & h4,
  span {
    padding-left: 10px;
  }
`;
const Image = styled.div`
  padding-left: 10px;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;

const DisplayMessages = styled.div`
  border-top: 1px solid rgba(219, 210, 210, 0.445);
  height: 400px;
  padding-left: 5px;
`;

const SendMessage = styled.div`
  border-top: 1px solid green;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  padding-left: 5px;
  background: rgb(0 0 0 / 3%);
  textarea {
    width: 100%;
    min-height: 100px;
    border: none;
    resize: none;
    font-family: "Montserrat", sans-serif;
    border-bottom: 1px solid black;
    &::placeholder {
      font-size: 14px;
      font-weight: 300;
      font-family: "Montserrat", sans-serif;
    }
    &:focus {
      outline: none;
    }
  }
  button {
    margin: 10px 10px;
    min-width: 60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    border: none;
    background: rgb(0 0 0 / 8%);
    cursor: pointer;
  }
`;
export default Messaging;
