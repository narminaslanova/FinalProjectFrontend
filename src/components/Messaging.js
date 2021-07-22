import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import VideoCallIcon from "@material-ui/icons/VideoCall";

import jwt_decode from "jwt-decode";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDwSWaEsWFa2_9b8B_-L25ybQr9iW2Xgh0",
    authDomain: "linkedout-messaging.firebaseapp.com",
    projectId: "linkedout-messaging",
    storageBucket: "linkedout-messaging.appspot.com",
    messagingSenderId: "659151836031",
    appId: "1:659151836031:web:72e09b94521812648b804a",
    measurementId: "G-25FEV5R6ZJ",
  });
} else {
  firebase.app();
}
const firestore = firebase.firestore();

const Messaging = () => {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const user = useSelector((state) => state.authentication);
  const token = user.user.token;
  const decoded = jwt_decode(token);
  const [connectionId, setConnectionId] = useState(null);

  const getConnections = () => {
    axios
      .get(
        `https://localhost:44331/api/Linker/GetConnectionsOfUser/${decoded.id}`
      )
      .then((response) => {
        setUsers(response.data);
        console.log("messaging", response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getConnections();
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
        {connectionId == null ? (
          <DefaultView>
            <p>Chat with your connections</p>
          </DefaultView>
        ) : (
          <ChatRoom Id={connectionId} />
        )}

        <Testing>
          <ChatList>
            <h1>Your Connections</h1>
            {users.map(
              (item) =>
                decoded.id !== item.id && (
                  <UserList key={item.id}>
                    <UserImage>
                      {item.imageUrl ? (
                        <img src={`/images/${item.imageUrl}`} alt="" />
                      ) : (
                        <img src="/images/user.svg" alt="" />
                      )}
                    </UserImage>
                    <UserInfo
                      onClick={() => {
                        setConnectionId(item.id);
                      }}
                    >
                      <h4>{item.firstName + " " + item.lastName}</h4>
                      <span>{item.occupation ? item.occupation : "---"}</span>
                    </UserInfo>
                  </UserList>
                )
            )}
          </ChatList>
        </Testing>
      </Layout>
    </Container>
  );
};

function ChatRoom(props) {
  const user = useSelector((state) => state.authentication);
  const token = user.user.token;
  const decoded = jwt_decode(token);
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const userId = decoded.id;
  const name = user.user.user.firstName;
  let senderId = userId;
  let receiverId = props.Id;

  const sendMessage = async (e) => {
    e.preventDefault();
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userId,
      name,
      senderId,
      receiverId,
    });

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Messages>
        <Chat>
          {messages &&
            messages.map(
              (msg) =>
                (msg.senderId == senderId && msg.receiverId == receiverId && (
                  <ChatMessage key={msg.id} message={msg} />
                )) ||
                (msg.receiverId == senderId && msg.senderId == receiverId && (
                  <ChatMessage key={msg.id} message={msg} />
                ))
            )}

          <span ref={dummy}></span>
        </Chat>
        <InputForm>
          <form className="messagesForm">
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Enter your message"
              style={{
                marginRight: "20px",
              }}
            />

            <button
              type="button"
              onClick={(e) => {
                setFormValue("");
                sendMessage(e);
              }}
            >
              Send
            </button>
            <a target="_blank" href="https://linkedoutvideochat.netlify.app/">
              <VideoCallIcon
                style={{ color: "#0a66c2", fontSize: "30px", padding: "5px" }}
              />
            </a>
          </form>
        </InputForm>
      </Messages>
    </>
  );
}

function ChatMessage(props) {
  const user = useSelector((state) => state.authentication);
  const token = user.user.token;
  const decoded = jwt_decode(token);
  const { text, uid } = props.message;

  const messageClass =
    props.message.userId === decoded.id ? "sent" : "received";

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "row" }}
        className={`message ${messageClass}`}
      >
        <p
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <span style={{ fontSize: "14px" }}>
            {decoded.id == props.message.userId ? "You" : props.message.name}
          </span>
          {" : " + text}
        </p>
      </div>
    </>
  );
}
const Messages = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputForm = styled.div`
  form {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    padding: 5px;
    input {
      height: 100%;
      border-radius: 3px;
      padding: 12px 20px;
      width: 100%;
      box-sizing: border-box;
      //border: 2px solid #ccc;
      border: none;
      transition: 0.5s;
      outline: none;
      //border-radius: 5px;
    }
    button {
      min-width: 60px;
      border-radius: 20px;
      padding-left: 16px;
      padding-right: 16px;
      border: none;
      background: #0a66c2;
      color: white;
      cursor: pointer;
    }
  }
`;
const Chat = styled.div`
  height: 500px;
  overflow: auto;
  padding-left: 5px;
  padding-top: 5px;
  border-bottom: 1px solid green;
  background-color: #fff;
  p {
    max-width: 500px;
    margin-bottom: 12px;
    line-height: 24px;
    padding: 10px 20px;
    border-radius: 25px;
    position: relative;
    color: white;
    text-align: center;
  }

  @media (max-width: 768px) {
    height: 400px;
    form {
      width: 300px;
    }
  }
`;
const Container = styled.div`
  padding-top: 50px;
  width: 100%;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "test leftpart rightpart ";
  grid-template-columns: minmax(0, 4fr) minmax(0, 12fr) minmax(0, 4fr);
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
const Testing = styled.div`
  grid-area: test;
`;

const DefaultView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: gray;
    font-size: 20px;
    letter-spacing: 3px;
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
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const LeftContent = styled.div`
  grid-area: leftpart;
  width: 100%;
  height: 500px;
  overflow: auto;
  //max-height: 500px;
  background-color: #fff;
  border-radius: 5px;
  // position: relative;
  /* border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%); */
`;
const Content = styled.div`
  /* width: 100%;
  max-height: 70%;
  overflow: auto;
  padding-left: 5px; */
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
  img {
    object-fit: cover;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    img {
      object-fit: cover;
    }
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
  cursor: pointer;
  h4 {
    font-weight: 200;

    color: gray;
  }
  span {
    font-size: 14px;
  }
`;

export { firestore };


export default Messaging;
