import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ContactInfoModal from "./ContactInfoModal";
import PostModal from "./PostModal";
import EducationModal from "./EducationModal";
import ExperienceModal from "./ExperienceModal";
import { useSelector } from "react-redux";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import ReactPlayer from "react-player";

const LeftPart = () => {
  const [showModal, setShowModal] = useState("close");
  const [modalOpen, setModalOpen] = useState(false);
  const [educationModal, setEducationModal] = useState(false);
  const [experienceModal, setExperienceModal] = useState(false);
  const user = useSelector((state) => state.authentication);
  const [headerInfo, setHeaderInfo] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);
  const [comment, setComment] = useState("");

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

  //get info for header
  const getInfo = () => {
    axios
      .get(
        `https://localhost:44331/api/MyProfile/GetUserHeader/${user.user.user.email}`
      )
      .then((response) => {
        setHeaderInfo(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //get my posts

  const getPosts = () => {
    axios
      .get(
        `https://localhost:44331/api/Post/GetPostsOfProfile/${user.user.user.email}`
      )
      .then((response) => {
        const posts = response.data;
        setProfilePosts(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getInfo();
    getPosts();
    console.log(profilePosts);
  }, []);
  // useEffect(() => {

  // }, []);
  return (
    <>
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
                ? headerInfo.firstName + " " + headerInfo.lastName
                : "Username"}
            </h1>
            <p>
              {headerInfo.occupation
                ? headerInfo.occupation
                : "Add occupation here"}
            </p>
            <span>
              {headerInfo.location ? headerInfo.location : "Add location"}
            </span>
            <button>
              <img
                src="/images/edit-info.svg"
                onClick={() => {
                  setModalOpen(true);
                }}
              />
            </button>
          </Properties>
          <a href="/connections">
            {headerInfo.connectionCount
              ? headerInfo.connectionCount + " " + "connections"
              : "You have no connections yet"}
          </a>
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
        <MyPosts>
          <Article>
            <SharedActor>
              <a>
                <img src={"/images/google.svg"} alt="" />

                <div>
                  <span>Name Surname</span>
                  <span>Occupation</span>
                  <span>Id: | shared:</span>
                </div>
              </a>
              <button
                className="ellipsis "
                // id={post.id}
                // onClick={() => {
                //   openSettings(post.id);
                // }}
              >
                <img src="/images/ellipsis.svg" alt="" />
              </button>
              <div className="settings close">
                <DeleteButton>
                  <span
                  // onClick={() => deleteArticle(post.id)}
                  >
                    <DeleteIcon
                      fontSize="small"
                      style={{ paddingRight: "2px" }}
                    />
                    Delete
                  </span>
                </DeleteButton>
                <UpdateButton>
                  <span
                  // onClick={() => {
                  //   setOpen(true);
                  // }}
                  >
                    <UpdateIcon
                      fontSize="small"
                      style={{ paddingRight: "3px" }}
                    />
                    Update
                  </span>
                </UpdateButton>
                {/* {open && (
                  <UpdateArtcle setOpenModal={setOpen} postId={post.id} />
                )} */}
              </div>
            </SharedActor>
          </Article>
        </MyPosts>

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
    </>
  );
};

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
const MyPosts = styled.div`
  margin-top: 10px;
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

const Article = styled.div`
  /* text-align: center;
  overflow: hidden;
  //margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
  padding: 0;
  margin: 0 0 8px;
  //overflow: visible;
  button {
    &:hover {
      cursor: pointer;
    }
  } */
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      border: none;
      background: transparent;
      span {
        &:hover {
          text-decoration: underline !important;
        }
      }
    }
    a {
      &:hover {
        text-decoration: underline !important;
      }
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    border: none;
    border-radius: 5px;
    background: transparent;
    &:hover {
      background: rgb(235 235 235);
    }
    span {
      margin-left: 8px;
    }
  }
`;
const LikeButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background: transparent;
  /* background: ${(props) =>
    props.liked ? "rgba(0, 0, 0, 0.08)" : "#transparent"}; */
  &:hover {
    background: rgb(235 235 235);
  }
  span {
    margin-left: 8px;
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const DeleteButton = styled.div`
  span {
    display: flex;
    align-items: center;
  }
`;
const UpdateButton = styled.div`
  span {
    display: flex;
    align-items: center;
  }
`;
export default LeftPart;
