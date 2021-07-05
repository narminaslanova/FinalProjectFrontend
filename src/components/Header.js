import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../actions/userActions";
import {Redirect} from "react-router";

const Header = (props) => {
  let history = useHistory();
  const user = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

   
  const logOut = () => {
    dispatch(userActions.logout());
    history.push("/");
  };


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
              <a>
                <img src="/images/nav-network.svg" alt="" />
                <span>My Network</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="/images/nav-jobs.svg" alt="" />
                <span>Jobs</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="/images/nav-messaging.svg" alt="" />
                <span>Messaging</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="/images/nav-notifications.svg" alt="" />
                <span>Notifications</span>
              </a>
            </NavList>
            <User>
              <a>
                {/* {user && props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : ( */}
                <img className="userImage" src="/images/user.svg" alt="" />
                {/* )} */}
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
                  {/* {props.user && props.user.photoURL ? (
                    <img src={props.user.photoURL} alt="" />
                  ) : ( */}
                  <img src="/images/user.svg" alt="" />
                  {/* )} */}
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
                <Link to="/myprofile">
                  <Profile>View profile</Profile>
                </Link>

                <SignOut onClick={()=>logOut()}>
                  <a style={{ color: "black" }}>
                    Sign Out
                  </a>
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
    .main{
      display: block;
    }
  }
`;

const SignOut = styled.a`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  font-size: 30px;
  font-weight: 400;
`;
// const  = styled.div`
//   position: absolute;
//   top: 55px;
//   right: 18%;
//   background: white;
//   border-radius: 0 0 5px 5px;
//   width: 300px;
//   height: 200px;
//   font-size: 16px;
//   transition-duration: 167ms;
//   text-align: center;
//   display: block;
//   img {
//     width: 50px;
//     height: 50px;
//     display: flex;
//     justify-content: left;
//     padding: 5px 10px;
//     border-radius: 50%;
//   }
// `;

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

// const mapStateToProps = (state) => {
//   return {
//     user: state.userState.user,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   SignOut: () => dispatch(signOutAPI()),
// });

//export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;
