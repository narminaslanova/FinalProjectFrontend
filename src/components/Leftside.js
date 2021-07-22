import React from "react";
import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { firestore } from "./Messaging";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Leftside = () => {
  let history = useHistory();
  const communityCard = useRef();
  const [fixedPosition, setFixedPosition] = useState(false);
  const user = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState();
  const token = user.user.token;
  const decoded = jwt_decode(token);

  // const imageHandler = (e) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setProfileImg(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  //   console.log(e.target.files[0]);
  // };

  const [test, setTest] = useState(false);

  const handleChange = (e) => {
    const image = e.target.files[0].name;
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setProfileImg(image);
    setTest(true);
  };
   
   if (test) {
     const data = {
       imageUrl: profileImg,
     };

     axios
       .put(
         `https://localhost:44331/api/MyProfile/PutUserAsync/${user.user.user.email}`,
         data
       )
       .then(() => {
           
         user.user.user.imageUrl = profileImg;
         localStorage.setItem("user", JSON.stringify(user.user));
       })
       .catch((error) => console.log(error));
   }

  useEffect(() => {
    //const initialTop = communityCard.current.getBoundingClientRect().top;
    const handleScroll = () => {
      setFixedPosition(window.scrollY > 275);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <Photo>
            {user.user.user.imageUrl ? (
              <img src={`/images/${user.user.user.imageUrl}`} alt="" />
            ) : (
              <img src="/images/user.svg" alt="" />
            )}
          </Photo>
          <a
            onClick={() => {
              history.push("/myprofile");
            }}
          >
            {user
              ? user.user.user.firstName + " " + user.user.user.lastName
              : "Username"}
          </a>
          <input
            type="file"
            name="image-upload"
            id="image-upload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <label htmlFor="image-upload">Add Photo</label>
        </UserInfo>
        <Link
          to="/connections"
          style={{
            fontSize: "12px",
            lineHeight: "1.333",
            color: "black",
            textDecoration: "none",
          }}
        >
          <Widget>
            <a>
              <div>
                <span>Connections</span>

                <span>Grow your network</span>
              </div>
              <img src="/images/widget-icon.svg" alt="" />
            </a>
          </Widget>
        </Link>
        <Item>
          <span>
            <img src="/images/item-icon.svg" alt="" />
            My Items
          </span>
        </Item>
      </ArtCard>

      {/* <CommunityCard fixed={fixedPosition} ref={communityCard}>
        <a>
          <span>Groups</span>
        </a>
        <a>
          <span>
            Events
            <img src="/images/plus-icon.svg" alt="" />
          </span>
        </a>
        <a>
          <span>Follow Hashtags</span>
        </a>
        <a>
          <span>Discover more</span>
        </a>
      </CommunityCard> */}
    </Container>
  );
};;

const Container = styled.div`
  grid-area: leftside;
`;

const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  cursor: pointer;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
  a {
    text-decoration: none;
    &:visited {
      color: black;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  label {
    cursor: pointer;
    display: block;
    font-size: 14px;
    color: blue;
  }
`;

const CardBackground = styled.div`
  background: url("/images/card-bg.svg");
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;

const Photo = styled.div`
  width: 72px;
  height: 72px;
  border: 2px solid white;
  border-radius: 50%;
  margin: -38px auto 12px;
  img {
    width: 72px;
    height: 72px;
    //object-fit: contain;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Widget = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;
  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      span {
        font-size: 12px;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }
  img {
    color: rgba(0, 0, 0, 1);
    cursor: pointer;
  }
`;

const Item = styled.a`
  border-color: rgba(0, 0, 0, 0.8);
  text-align: left;
  padding: 12px;
  font-size: 12px;
  display: block;
  span {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 1);
    img {
      color: rgba(0, 0, 0, 0.6);
      cursor: pointer;
    }
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const CommunityCard = styled(ArtCard)`
  padding: 8px 0 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  a {
    color: black;
    padding: 4px 12px 4px 12px;
    font-size: 12px;
    &:hover {
      color: #0a66c2;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &:nth-child(2) {
      img:hover {
        cursor: pointer;
      }
    }
    &:last-child {
      color: rgba(0, 0, 0, 0.6);
      text-decoration: none;
      border-top: 1px solid #d6cec2;
      padding: 12px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
  ${(props) =>
    props.fixed &&
    css`
      position: fixed;
      top: 59px;
      width: 289.91px;
      height: 113.8px;
    `}
  @media only screen and (max-width: 768px) {
    position: relative !important;
    top: 0;
    width: 100%;
    // height: 113.8px;
  }
`;

export default Leftside;
