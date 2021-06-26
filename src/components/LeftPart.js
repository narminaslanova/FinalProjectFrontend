import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ContactInfoModal from "./ContactInfoModal";

const LeftPart = (props) => {
  const [showModal, setShowModal] = useState("close");

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <Container>
      <UserInfo>
        <CardBackground />
        <Photo>
          {props.user && props.user.photoURL ? (
            <img src={props.user.photoURL} />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
        </Photo>
        <Properties>
          <h1> {props.user ? props.user.displayName : "Username"}</h1>
          <p>Looking for a new job opportunities</p>
          <span>Baku,Azerbaijan</span>
          <button>
            <img onClick={handleClick} src="/images/edit-info.svg" alt="" />
          </button>
        </Properties>
      </UserInfo>
      <ContactInfoModal showModal={showModal} handleClick={handleClick} />
    </Container>
  );
};

const EditButton = styled.button``;

const Container = styled.div`
  grid-area: leftpart;
  width: 782px;
  margin-left: 15%;
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0px;
  }
`;

const CommonCard = styled.div`
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
`;


const CardBackground = styled.div`
  background: url("/images/card-bg.svg");
  background-position: center;
  background-size: 792px;
  height: 200px;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const Photo = styled.div`
  width: 160px;
  height: 160px;
  border: 5px solid white;
  border-radius: 50%;
  margin-top: -70px;
  margin-left: 10px;
  img {
    width: 160px;
    height: 160px;
    object-fit: contain;
    border-radius: 50%;
  }
`;
const UserInfo = styled(CommonCard)``;

const Properties = styled.div`
  padding-left: 20px;
  font-family: "Montserrat", sans-serif;
  h1 {
    font-size: 20px;
  }
  span {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.6);
  }
  p {
    font-size: 13px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.6);
  }
  button {
    display: block;
    background-color: white;
    border: none;
    cursor: pointer;
    padding: 3px 8px;
    &:hover {
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
`;

const mapStatetoProps = (state) => {
  return {
    user: state.userState.user,
  };
};
export default connect(mapStatetoProps)(LeftPart);
