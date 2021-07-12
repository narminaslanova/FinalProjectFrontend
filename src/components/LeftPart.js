import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ContactInfoModal from "./ContactInfoModal";
import PostModal from "./PostModal";
import EducationModal from "./EducationModal";
import ExperienceModal from "./ExperienceModal";
import { useSelector } from "react-redux";

const LeftPart = () => {
  const [showModal, setShowModal] = useState("close");
  const [modalOpen, setModalOpen] = useState(false);
  const [educationModal, setEducationModal] = useState(false);
  const [experienceModal, setExperienceModal] = useState(false);
  const user = useSelector((state) => state.authentication);

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
          {user && user.user.user.imageUrl ? (
            <img src={user.user.user.imageUrl} />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
        </Photo>
        <Properties>
          <h1>
            {" "}
            {user
              ? user.user.user.firstName + " " + user.user.user.lastName
              : "Username"}
          </h1>
          <p>Looking for a new job opportunities</p>
          <span>Baku,Azerbaijan</span>
          <button>
            <img
              src="/images/edit-info.svg"
              onClick={() => {
                setModalOpen(true);
              }}
            />
          </button>
        </Properties>
        <a href="#">31 connections</a>
      </UserInfo>
      {modalOpen && <ContactInfoModal setOpenModal={setModalOpen} />}

      <Dashboard>
        <h1>Your dashboard</h1>
        <Myboard>
          <a href="/connections">
            <div>
              <img src="/images/network.svg" alt="" />
              <div>
                <span>My network</span>
                <p>Manage your connections</p>
              </div>
            </div>
          </a>
          <a>
            <div>
              <img src="/images/items.svg" alt="" />
              <div>
                <span>My items</span>
                <p>Keep track of your items</p>
              </div>
            </div>
          </a>
        </Myboard>
      </Dashboard>
      <Activity>
        <div>
          <h2>Activity</h2>
          <button onClick={handleClick}>Start a post</button>
        </div>
        <p>Post you created are displayed here</p>
      </Activity>
      <PostModal showModal={showModal} handleClick={handleClick} />
      <Section>
        <Education>
          <div className="heading">
            <h2>Education</h2>
            <img
              src="/images/add.svg"
              alt=""
              onClick={() => {
                setEducationModal(true);
              }}
            />
          </div>
          <div className="education">
            <img className="uni-image" src="/images/google.svg" alt="" />
            <div className="ed-info">
              <h4>University name</h4>
              <p>Faculty</p>
              <span>year</span>
            </div>
            <img src="/images/edit-info.svg" alt="" />
          </div>
        </Education>
        {educationModal && (
          <EducationModal setEducationModalOpen={setEducationModal} />
        )}
        <Experience>
          <div className="heading">
            <h2>Experience</h2>
            <img
              src="/images/add.svg"
              alt=""
              onClick={() => {
                setExperienceModal(true);
              }}
            />
          </div>
          <div className="education">
            <img className="uni-image" src="/images/google.svg" alt="" />
            <div className="ed-info">
              <h4>Work or volunteering place</h4>
              <p>Employer</p>
              <span>year</span>
              <p>Description</p>
            </div>
            <img src="/images/edit-info.svg" alt="" />
          </div>
        </Experience>
        {experienceModal && (
          <ExperienceModal setExperienceModalOpen={setExperienceModal} />
        )}
      </Section>
    </Container>
  );
};;



const Container = styled.div`
  grid-area: leftpart;
  width: 782px;
  margin-left: 15%;
  font-family: "Montserrat", sans-serif;
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
const Activity = styled(CommonCard)`
  margin-top: 10px;
  div {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
  }
  p {
    border-bottom: 1px solid grey;
    padding-left: 10px;
    margin-bottom: 10px;
    margin-bottom: 20px;
  }
  button {
    background: transparent;
    border: none;
  }
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
const UserInfo = styled(CommonCard)`
  a {
    padding-left: 20px;
    margin-bottom: 20px;
    text-decoration: none;
    color: #0a66c2;
    font-size: 15px;
  }
`;

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

const Dashboard = styled.div`
  /* height: 300px; */
  background-color: #dce6f1;
  border-radius: 10px;
  position: relative;
  align-items: center;
  padding-bottom: 20px;
  h1 {
    padding-top: 20px;
    padding-left: 10px;
    font-size: 25px;
    font-weight: 200;
  }
`;
const Myboard = styled.div`
  background-color: white;
  border-radius: 10px;
  margin: 10px 10px;

  a {
    text-decoration: none;
  }
  div {
    display: flex;
    padding-left: 10px;
    padding: 10px 10px;

    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      width: 100%;
      border-bottom: 1px solid black;
      padding: 10px 10px;
      span {
        color: black;
      }
      p {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
  align-items: center;
  flex-direction: column;
`;

const Section = styled(CommonCard)`
  padding: 10px 10px;
`;

const Education = styled.div`
  .heading {
    display: flex;
    justify-content: space-between;
    img {
      cursor: pointer;
    }
  }
  .education {
    padding-top: 20px;
    display: flex;
    flex-direction: row;

    h4 {
      font-family: "Montserrat", sans-serif;
    }
    span {
      font-size: 15px;
      color: rgba(0, 0, 0, 0.6);
    }
    .uni-image {
      padding: 20px 20px;
      width: 40px;
      height: 40px;
    }
    .ed-info {
      width: 100%;
      border-bottom: 1px solid grey;
    }
  }
`;

const Experience = styled(Education)``;



export default LeftPart;
