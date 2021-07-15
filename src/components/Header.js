import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../actions/userActions";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Header = (props) => {
  let history = useHistory();
  const user = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const token = user.user.token;
  const decoded = jwt_decode(token);
  const logOut = () => {
    dispatch(userActions.logout());
    history.push("/");
  };

  const redirecting = (id) => {
    history.push("/myprofile");
    if (
      document
        .getElementById(id)
        .nextElementSibling.classList.contains("displayed")
    ) {
      document
        .getElementById(id)
        .nextElementSibling.classList.remove("displayed");
    }
  };

  const [notifications, setNotifications] = useState([]);
  function getNotifications() {
    axios
      .get(
        `https://localhost:44331/api/Linker/GetConnectionRequestsOfUser/${decoded.id}`
      )
      .then((response) => {
        console.log(response.data);
        setNotifications(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getNotifications();
  }, []);

  function displayDiv(id) {
    if (
      document
        .getElementById(id)
        .nextElementSibling.classList.contains("displayed")
    ) {
      document
        .getElementById(id)
        .nextElementSibling.classList.remove("displayed");
    } else {
      document.getElementById(id).nextElementSibling.classList.add("displayed");
    }
  }

  return (
    <Container>
      <Content>
        <Logo>
          <a href="/home">
            <img src="/images/linkedinIcon.png" alt="" />
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <SearchIcon>
            <img src="/images/search-icon.svg" alt="" />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="active">
              <a href="/home">
                <img src="/images/nav-home.svg" alt="" />
                <span>Home</span>
              </a>
            </NavList>
            <NavList>
              <a href="/connections">
                <img src="/images/nav-network.svg" alt="" />
                <span>My Network</span>
              </a>
            </NavList>
            <NavList>
              <a href="/messaging">
                <img src="/images/nav-messaging.svg" alt="" />
                <span>Messaging</span>
              </a>
            </NavList>
            <NavList>
              <a href="/notifications">
                <img src="/images/nav-notifications.svg" alt="" />
                <span>
                  Notifications
                  {notifications.length !== 0 && (
                    <sup>{notifications.length}</sup>
                  )}
                </span>
              </a>
            </NavList>
            <User>
              <a id="test" onClick={() => displayDiv("test")}>
                <img className="userImage" src="/images/user.svg" alt="" />
                <span>
                  Me
                  <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>

              <div className="main">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <img src="/images/user.svg" alt="" />
                  <h4
                    style={{
                      margin: "30px 0",
                    }}
                  >
                    {user && user.user.user.firstName ? (
                      user.user.user.firstName + " " + user.user.user.lastName
                    ) : (
                      <span>Name Surname</span>
                    )}
                  </h4>
                </div>
                <Profile onClick={() => redirecting("test")}>
                  View profile
                </Profile>
                <SignOut onClick={() => logOut()}>
                  <a style={{ color: "black" }}>Sign Out</a>
                </SignOut>
              </div>
            </User>

            <Work>
              <a>
                <img src="/images/nav-work.svg" alt="" />
                <span>
                  Work
                  <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
  img {
    width: 34px;
    height: 34px;
  }
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
  @media (max-width: 768px) {
    width: 50px;
    & > div {
      width: 50px;
      input {
        width: 50px;
      }
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  .active {
    span:after {
      content: " ";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      position: relative;
      sup {
        background-color: red;
        color: white;
        padding-left: 8px;
        padding-right: 2px;
        padding-top: 4px;
        padding-bottom: 6px;
        position: absolute;
        border-radius: 50%;
        width: 12px;
        height: 10px;
        top: -20px;
        right: 5px;
      }
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
    /* .main {
      display: block;
    } */
  }
`;

const SignOut = styled.a`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  font-size: 30px;
  font-weight: 400;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Profile = styled.button`
  width: 90%;
  height: 40px;
  display: flex;
  margin: 10px 10px;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid #2977c9;
  border-radius: 15px;
  span {
    font-size: 15px;
    color: black;
    font-weight: 400;
  }
  &:hover {
    background-color: #2977c9;
    color: white;
    cursor: pointer;
  }
`;

const User = styled(NavList)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

export default Header;
