import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

const Notifications = () => {
  const user = useSelector((state) => state.authentication);
  const token = user.user.token;
  const decoded = jwt_decode(token);
  const [notifications, setNotifications] = useState([]);
  function getNotifications() {
    axios
      .get(
        `https://localhost:44331/api/Linker/GetConnectionRequestsOfUser/${decoded.id}`
      )
      .then((response) => {
        setNotifications(response.data);
        console.log("ntf", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const acceptRequest = (id, email) => {
    console.log(id, email);
    const data = {
      senderId: id,
      applierEmail: email,
    };
    axios
      .post("https://localhost:44331/api/Linker/AddConnection", data)
      .then((response) => {
        console.log("accepted", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const declineRequest = (id, email) => {
    const data = {
      declierId: id,
      declinedEmail: email,
    };
    axios
      .post("https://localhost:44331/api/Linker/DeclineRequest", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [accepted, setAccepted] = useState(false);
  useEffect(() => {
    getNotifications();
    if (accepted) {
      getNotifications();
    }
  }, []);

  const [appliers, setAppliers] = useState([]);
  const getUsers = async () => {
    axios
      .get(`https://localhost:44331/api/Linker/GetUsersForUser/${decoded.id}`)
      .then((response) => {
        console.log("connections-appliers", response.data);
        setAppliers(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUsers();
  }, []);
  const sendConnectionRequest = (email, id) => {
    const data = {
      applierEmail: email,
      senderId: id,
    };
    axios
      .post("https://localhost:44331/api/Linker/AddConnectionRequest", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getButton = (id) => {
    console.log(document.getElementById(id).innerHTML);
    if (document.getElementById(id).classList.contains("clicked-btn")) {
      document.getElementById(id).classList.remove("clicked-btn");
      document.getElementById(id).innerHTML = "Connect";
    } else {
      document.getElementById(id).classList.add("clicked-btn");
      document.getElementById(id).innerHTML = "Pending";
    }
  };

  return (
    <Container>
      <Layout>
        <LeftPart>
          {appliers &&
            appliers.map(
              (applier) =>
                decoded.id !== applier.id && (
                  <div className="user-container" key={applier.id}>
                    <div className="user-image">
                      {applier.imageUrl ? (
                        <img src={`/images/${applier.imageUrl}`} alt="" />
                      ) : (
                        <img src="/images/user.svg" alt="" />
                      )}
                    </div>
                    <div className="user-info">
                      <div>
                        <h4>{applier.firstName + " " + applier.lastName}</h4>
                        <span>
                          {applier.occupation ? applier.occupation : "---"}
                        </span>
                      </div>
                      <div className="user-actions">
                        <div>
                          <button
                            id={`ct-${applier.id}`}
                            className="connect-btn"
                            onClick={() => {
                              sendConnectionRequest(applier.email, decoded.id);
                              getButton(`ct-${applier.id}`);
                            }}
                          >
                            Connect
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
        </LeftPart>
        <Main>
          {/* <NotificationsList> */}
          {notifications.length == 0 ? (
            <Textt>
              <p>No notifications yet :(</p>
            </Textt>
          ) : (
            notifications.map((notification) => (
              <Content key={notification.id}>
                <UserList>
                  <UserImage>
                    {notification.imageUrl ? (
                      <img src={`/images/${notification.imageUrl}`} alt="" />
                    ) : (
                      <img src="/images/user.svg" alt="" />
                    )}
                  </UserImage>
                  <UserInfo>
                    <h4>
                      {notification.firstName + " " + notification.lastName}
                    </h4>
                  </UserInfo>
                  <Text>
                    <p>wants to connect.</p>
                  </Text>
                </UserList>
                <Buttons>
                  <AcceptButton
                    onClick={() => {
                      setAccepted(true);
                      acceptRequest(notification.id, user.user.user.email);
                    }}
                  >
                    <span>Accept</span>
                  </AcceptButton>
                  <DeclineButton
                    onClick={() =>
                      declineRequest(decoded.id, notification.email)
                    }
                  >
                    <span>Decline</span>
                  </DeclineButton>
                </Buttons>
              </Content>
            ))
          )}
          {/* </NotificationsList> */}
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
              <p>LinkedOut Corporation ?? 2021</p>
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
  grid-template-columns: minmax(0, 4fr) minmax(0, 9fr) minmax(0, 4fr);
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
  height: 350px;
  overflow: auto;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
  margin-bottom: 10px;
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

const Textt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px !important;
  p {
    padding: 10px 10px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 200px !important;
    font-size: 25px;
    font-weight: 200;
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

const NotificationsList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  display: flex;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  h4 {
    font-weight: 200;
    //color: gray;
  }
  span {
    font-size: 14px;
  }
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  padding-left: 5px;
`;
const Buttons = styled.div`
  padding-top: 20px;
  padding-right: 20px;
`;
const AcceptButton = styled.button`
  /* border: 1px solid green;
  border-radius: 10px;
  padding: 5px 5px;
  cursor: pointer;
  background: rgba(0, 128, 0, 0.418);
  span {
    color: white;
  } */
  border: 2px solid rgba(13, 66, 146, 0.842);
  background-color: transparent;
  padding: 5px 5px;
  margin-right: 10px;
  border-radius: 20px;
  color: rgba(13, 66, 146, 0.842);
  cursor: pointer;
`;
const DeclineButton = styled.button`
  /* border: 1px solid red;
  margin-left: 5px;
  border-radius: 10px;
  cursor: pointer;
  padding: 5px 5px;
  background: rgba(255, 0, 0, 0.507);
  span {
    color: white;
  } */
  border: 2px solid rgba(13, 66, 146, 0.842);
  background-color: rgba(13, 66, 146, 0.281);
  padding: 5px 5px;
  margin-right: 10px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
`;

export default Notifications;
