import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import BackspaceIcon from "@material-ui/icons/Backspace";

const Connections = () => {
  const [appliers, setAppliers] = useState([]);
  const [connections, setConnections] = useState([]);
  //const [request, setRequest] = useState(false);

  const user = useSelector((state) => state.authentication);
  const token = user.user.token;
  const decoded = jwt_decode(token);

  //open and close remove button
  function openDiv(id) {
    if (
      document
        .getElementById(id)
        .nextElementSibling.classList.contains("open-button")
    ) {
      document
        .getElementById(id)
        .nextElementSibling.classList.remove("open-button");
    } else {
      document
        .getElementById(id)
        .nextElementSibling.classList.add("open-button");
    }
  }

  //get all users without connected ones
  const getUsers = async () => {
    // axios
    //   .get(`https://localhost:44331/api/Linker/GetUsersForUser/${decoded.id}`)
    //   .then((response) => {
    //     console.log("connections-appliers", response.data);
    //     setAppliers(response.data);
    //   })
    //   .catch((error) => console.log(error));

    axios
      .get("https://localhost:44331/api/Authenticate/GetAllUsers")
      .then((response) => {
        // console.log("connections-appliers", response.data);
        setAppliers(response.data);
      })
      .catch((error) => console.log(error));
  };

  // useEffect(() => {
  //   setRequest(JSON.parse(window.localStorage.getItem("request")));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("request", request);
  // }, [request]);

  //sendrequest to connect
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

  //change connect to pending
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

  //get all connections
  const getConnections = () => {
    axios
      .get(
        `https://localhost:44331/api/Linker/GetConnectionsOfUser/${decoded.id}`
      )
      .then((response) => {
        console.log(response.data);
        setConnections(response.data);
      })
      .catch((error) => console.log(error));
  };

  //delete connection
  const deleteConnection = (id, email) => {
    console.log(id, email);
    const data = {
      deleterId: id,
      deletedEmail: email,
    };
    axios.delete("https://localhost:44331/api/Linker/DeleteConnection", data);

    // const newconnections = connections.filter(
    //   (connection) => connection.email !== data.email
    // );
    // setConnections(newconnections);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <Container>
      <Layout>
        <RightContent>
          <Users>
            {appliers.map(
              (applier) =>
                decoded.id !== applier.id && (
                  <div className="user-container" key={applier.id}>
                    <div className="user-image">
                      <img src="/images/user.svg" alt="" />
                    </div>
                    <div className="user-info">
                      <div>
                        <h4>{applier.firstName + " " + applier.lastName}</h4>
                        <span>Occupation</span>
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
          </Users>
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
          <ConnectionList>
            <div className="connection-header">
              <h1 className="count">{connections.length} Connections</h1>
            </div>
            {connections.length == 0 ? (
              <Text>
                <p>No connections here yet :(</p>
              </Text>
            ) : (
              connections.map((connection) => (
                <div className="user-container" key={connection.id}>
                  <div className="user-image">
                    <img src="/images/user.svg" alt="" />
                  </div>
                  <div className="user-info">
                    <div>
                      <h4>
                        {connection.firstName + " " + connection.lastName}
                      </h4>
                      <span>{connection.occupation}</span>
                    </div>
                    <div className="user-actions">
                      <div>
                        <button className="message-btn">Message</button>
                        <button
                          className="test"
                          id={connection.id}
                          onClick={() => openDiv(connection.id)}
                        >
                          <img src="/images/ellipsis.svg" alt="" />
                        </button>
                        <button
                          className="remove-button"
                          id={`r-${connection.id}`}
                          onClick={() =>
                            deleteConnection(decoded.id, connection.email)
                          }
                        >
                          <BackspaceIcon fontSize="small" />
                          <span>Remove connection</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </ConnectionList>
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
  grid-template-areas: "leftpart rightpart ";
  grid-template-columns: minmax(0, 12fr) minmax(0, 4fr);
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

const LeftContent = styled.div`
  grid-area: leftpart;
  width: 100%;
  //overflow: hidden;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
`;

const Users = styled.div`
  grid-area: users;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
  margin-bottom: 10px;
`;

const RightContent = styled.div`
  grid-area: rightpart;
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
const ConnectionList = styled.div``;
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
const Text = styled.div`
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
export default Connections;
