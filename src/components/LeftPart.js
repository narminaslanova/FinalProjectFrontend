import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ContactInfoModal from "./ContactInfoModal";
import PostModal from "./PostModal";
import EducationModal from "./EducationModal";
import ExperienceModal from "./ExperienceModal";
import { useSelector } from "react-redux";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import LikersModal from "./LikersModal";
import UpdateArtcle from "./UpdateArtcle";
import ReactPlayer from "react-player";
import EditEducation from "./EditEducation";
import EditExperience from "./EditExperience";
import jwt_decode from "jwt-decode";

const LeftPart = () => {
  let history = useHistory();
  const [showModal, setShowModal] = useState("close");
  const [modalOpen, setModalOpen] = useState(false);
  const [educationModal, setEducationModal] = useState(false);
  const [experienceModal, setExperienceModal] = useState(false);
  const [openEditEducation, setOpenEditEducation] = useState(false);
  const [openEditExperience, setOpenEditExperience] = useState(false);
  const user = useSelector((state) => state.authentication);
  const [headerInfo, setHeaderInfo] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [openLikersModal, setOpenLikersModal] = useState(false);
  const token = user.user.token;
  const decoded = jwt_decode(token);
  const [postId, setPostId] = useState();
  const [postedComments, setPostedComments] = useState([]);
  const [educationId, setEducationId] = useState();
  const [experienceId, setExperienceId] = useState();
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);
  const [commentId, setCommentId] = useState();
  const [check, setCheck] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        setCheck(true);
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  function openSettings(id) {
    if (
      document.getElementById(id).nextElementSibling.classList.contains("close")
    ) {
      document.getElementById(id).nextElementSibling.classList.remove("close");
    } else {
      document.getElementById(id).nextElementSibling.classList.add("close");
    }
  }
  function openEdSettings(id) {
    console.log(document.getElementById(id).nextElementSibling);
    if (
      document
        .getElementById(id)
        .nextElementSibling.classList.contains("closeEd")
    ) {
      document
        .getElementById(id)
        .nextElementSibling.classList.remove("closeEd");
    } else {
      document.getElementById(id).nextElementSibling.classList.add("closeEd");
    }
  }
  function openExSettings(id) {
    if (
      document
        .getElementById(id)
        .nextElementSibling.classList.contains("closeEx")
    ) {
      document
        .getElementById(id)
        .nextElementSibling.classList.remove("closeEx");
    } else {
      document.getElementById(id).nextElementSibling.classList.add("closeEx");
    }
  }
  const deleteArticle = (id) => {
    axios.delete(`https://localhost:44331/api/Post/Delete/${id}`);
    const newpost = profilePosts.filter((post) => post.id !== id);
    setProfilePosts(newpost);
  };
  //get info for header
  const getInfo = () => {
    axios
      .get(
        `https://localhost:44331/api/MyProfile/GetUserHeader/${user.user.user.email}`
      )
      .then((response) => {
        setHeaderInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteReply = (id) => {
    axios.delete(`https://localhost:44331/api/Post/DeleteComment/${id}`);
    const newReplies = replies.filter((r) => r.id != id);
    setReplies(newReplies);
  };
  //get replies of comment
  const getReplies = (id) => {
    axios
      .get(`https://localhost:44331/api/Post/GetRepliesOfComment/${id}`)
      .then((response) => {
        setReplies(response.data);
        //console.log(response.data);
      })
      .catch((error) => console.log(error));
  };
  const handleReply = (id) => {
    const replyData = {
      userId: decoded.id,
      content: reply,
      isReply: true,
      parentId: commentId,
    };
    axios
      .post(`https://localhost:44331/api/Post/AddCommentPost/${id}`, replyData)
      .then((res) => {
        axios
          .get(
            `https://localhost:44331/api/Post/GetRepliesOfComment/${commentId}`
          )
          .then((response) => {
            setReplies(response.data);
            //console.log(response.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

    setReply("");
  };
  function displayComment(id) {
    const test = document.querySelectorAll(".commentContainer");

    test.forEach((element) => {
      //console.log(element.getAttribute("id") !== id);
      if (element.getAttribute("id") !== id) {
        element.classList.add("closeCommentContainer");
      }
    });

    if (
      document
        .getElementById(id)
        .parentElement.nextElementSibling.classList.contains(
          "closeCommentContainer"
        )
    ) {
      document
        .getElementById(id)
        .parentElement.nextElementSibling.classList.remove(
          "closeCommentContainer"
        );
    } else {
      document
        .getElementById(id)
        .parentElement.nextElementSibling.classList.add(
          "closeCommentContainer"
        );
    }
  }

  function openReply(id) {
    let element =
      document.getElementById(id).parentElement.parentElement
        .nextElementSibling;
    console.log(element);

    let test = document.querySelectorAll(".postReply");

    console.log(test);

    test.forEach((element) => {
      if (element.getAttribute("id") !== id) {
        element.classList.remove("closePost");
      }
    });

    // if (element.classList.contains("closePost")) {
    //   element.classList.remove("closePost");
    // } else {
    //   element.classList.add("closePost");
    // }
  }

  //like post
  const likePost = (postId) => {
    const data = {
      userId: decoded.id,
    };

    axios
      .put(`https://localhost:44331/api/Post/LikePost/${postId}`, data)
      .then((res) => {
        console.log("liked", res.data);
        const newPosts = profilePosts.map((item) => {
          console.log("item", item);
          if (item.id == res.data.id) {
            return res.data;
          } else {
            return item;
          }
        });
        setProfilePosts(newPosts);
      })
      .catch((error) => console.log(error));
  };

  const getPosts = () => {
    axios
      .get(
        `https://localhost:44331/api/Post/GetPostsOfProfile/${user.user.user.email}`
      )
      .then((response) => {
        const posts = response.data;
        setProfilePosts(posts);
        console.log(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    getInfo();
    if (checked) {
      getInfo();
    }
  }, [checked]);

  useEffect(() => {
    getPosts();
    if (check) {
      getPosts();
    }
  }, [check]);

  const handleComment = (id) => {
    const commentData = {
      userId: decoded.id,
      content: comment,
      isReply: false,
    };
    axios
      .post(
        `https://localhost:44331/api/Post/AddCommentPost/${id}`,
        commentData
      )
      .then((res) => {
        axios
          .get(`https://localhost:44331/api/Post/GetCommentsOfPost/${id}`)
          .then((response) => {
            setPostedComments(response.data);
            //console.log(response.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

    setComment("");
  };

  //get comments
  const getComments = (id) => {
    //console.log(id);
    axios
      .get(`https://localhost:44331/api/Post/GetCommentsOfPost/${id}`)
      .then((response) => {
        setPostedComments(response.data);

        //console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  //delete comment
  const deleteComment = (id) => {
    axios.delete(`https://localhost:44331/api/Post/DeleteComment/${id}`);
    const newComments = postedComments.filter((c) => c.id !== id);
    setPostedComments(newComments);
  };

  const [educations, setEducations] = useState([]);

  //get education
  const getEducation = () => {
    axios
      .get(
        `https://localhost:44331/api/MyProfile/GetAllUserEducations/${user.user.user.email}`
      )
      .then((response) => {
        console.log("educations", response.data);
        setEducations(response.data);
      })
      .catch((error) => console.log(error));
  };

  //delete education
  const deleteEducation = (id) => {
    axios.delete(`https://localhost:44331/api/MyProfile/DeleteEducation/${id}`);
    const newEducation = educations.filter((ed) => ed.id !== id);
    setEducations(newEducation);
  };

  const deleteExperience = (id) => {
    axios.delete(
      `https://localhost:44331/api/MyProfile/DeleteExperience/${id}`
    );
    const newExperience = experiences.filter((ex) => ex.id !== id);
    setExperiences(newExperience);
  };

  //get experience
  const [experiences, setExperiences] = useState([]);
  const getExperience = () => {
    axios
      .get(
        `https://localhost:44331/api/MyProfile/GetUserExperiances/${user.user.user.email}`
      )
      .then((response) => {
        setExperiences(response.data);
        console.log("exp", response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEducation();
    if (educationModal) {
      getEducation();
    }
  }, [educationModal]);

  useEffect(() => {
    getExperience();
    if (experienceModal) {
      getExperience();
    }
  }, [experienceModal]);
  return (
    <>
      <Container>
        <UserInfo>
          <CardBackground />
          <Photo>
            {user.user.user.imageUrl ? (
              <img src={`/images/${user.user.user.imageUrl}`} alt="" />
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
                  setChecked(true);
                  setModalOpen(true);
                }}
              />
            </button>
          </Properties>
          <a
            onClick={() => {
              history.push("/connections");
            }}
            style={{ cursor: "pointer" }}
          >
            {headerInfo.connectionCount
              ? headerInfo.connectionCount + " " + "connections"
              : "You have no connections yet"}
          </a>
        </UserInfo>
        {modalOpen && <ContactInfoModal setOpenModal={setModalOpen} />}

        <Dashboard>
          <h1>Your dashboard</h1>
          <Myboard>
            <a
              onClick={() => {
                history.push("/connections");
              }}
            >
              <div style={{ cursor: "pointer" }}>
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
            <h2>Your posts will be displayed here</h2>
            <img src="/images/add.svg" alt="" onClick={handleClick} />
          </div>
        </Activity>
        <MyPosts>
          {profilePosts.map((p) => (
            <Article key={p.id}>
              <SharedActor>
                <a>
                  {p.userImageUrl ? (
                    <img src={`/images/${p.userImageUrl}`} alt="" />
                  ) : (
                    <img src="/images/user.svg" alt="" />
                  )}

                  <div>
                    <span>{p.firstname + " " + p.lastname}</span>
                    <span>{p.userOccupation}</span>
                    <span>
                      Id: {p.id} | shared: {p.postAge}{" "}
                    </span>
                  </div>
                </a>
                <button
                  className="ellipsis "
                  id={p.id}
                  onClick={() => {
                    openSettings(p.id);
                  }}
                >
                  <img src="/images/ellipsis.svg" alt="" />
                </button>
                <div className="settings close">
                  <DeleteButton>
                    <span onClick={() => deleteArticle(p.id)}>
                      <DeleteIcon
                        fontSize="small"
                        style={{ paddingRight: "2px" }}
                      />
                      Delete
                    </span>
                  </DeleteButton>
                  <UpdateButton>
                    <span
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      <UpdateIcon
                        fontSize="small"
                        style={{ paddingRight: "3px" }}
                      />
                      Update
                    </span>
                  </UpdateButton>
                  {open && (
                    <UpdateArtcle setOpenModal={setOpen} postId={p.id} />
                  )}
                </div>
              </SharedActor>
              <Description>{p.description}</Description>
              <SharedImg>
                {!p.imageUrl && p.videoUrl ? (
                  <ReactPlayer width={"100%"} url={p.videoUrl} />
                ) : (
                  p.imageUrl && (
                    <a>
                      <img src={`/images/${p.imageUrl}`} alt="" />
                    </a>
                  )
                )}
              </SharedImg>
              <SocialCounts>
                <li>
                  <button>
                    <img src="/images/like1.svg" alt="" />
                    <span
                      id={p.id}
                      onClick={() => {
                        setPostId(p.id);
                        setOpenLikersModal(true);
                      }}
                    >
                      {p.likeCount}
                    </span>
                  </button>
                </li>
                <li>
                  <a>
                    {p.commentCount}
                    comments
                  </a>
                </li>
              </SocialCounts>
              <SocialActions>
                <LikeButton
                  id={`l-${p.id}`}
                  onClick={() => {
                    // setPostId(post.id);

                    likePost(p.id);
                    // setCheckLike(true);
                    // setLikeId(p.id);
                  }}
                >
                  <img src="/images/like.svg" alt="" />
                  <span>Like</span>
                </LikeButton>

                <button
                  id={`c-${p.id}`}
                  onClick={() => {
                    displayComment(`c-${p.id}`);
                    getComments(p.id);
                  }}
                >
                  <img src="/images/comment.svg" alt="" />
                  <span>Comment</span>
                </button>
                <button>
                  <img src="/images/share.svg" alt="" />
                  <span>Share</span>
                </button>
                <button>
                  <img src="/images/send.svg" alt="" />
                  <span>Send</span>
                </button>
              </SocialActions>
              <div
                className="commentContainer closeCommentContainer"
                id={`commentContainer-${p.id}`}
              >
                <div className="postComment">
                  <div className="commentImage">
                    {user.user.user.imageUrl ? (
                      <img src={`/images/${user.user.user.imageUrl}`} alt="" />
                    ) : (
                      <img src="/images/user.svg" alt="" />
                    )}
                  </div>
                  <div className="comment">
                    <input
                      type="text"
                      // id="comment"
                      //name="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <button
                    className="postComment"
                    onClick={() => {
                      handleComment(p.id);
                    }}
                  >
                    Post
                  </button>
                </div>
                <AllComments>
                  {postedComments.map((postedComment) => (
                    <div>
                      <div
                        key={postedComment.id}
                        className="allComments"
                        id={`allComments-${p.id}`}
                      >
                        {postedComment.imageUrl ? (
                          <img
                            src={`/images/${postedComment.imageUrl}`}
                            alt=""
                          />
                        ) : (
                          <img src="/images/user.svg" alt="" />
                        )}
                        <div className="commentContent">
                          <div className="comment-userInfo">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                fontSize: "13px",
                                justifyContent: "left",
                                padding: "10px 10px",
                              }}
                            >
                              <span>
                                {postedComment.firstName +
                                  " " +
                                  postedComment.lastName}
                              </span>
                              <span>{postedComment.occupation}</span>
                            </div>

                            <div className="smallContainer">
                              <span
                                style={{
                                  fontSize: "13px",
                                  paddingRight: "10px",
                                  paddingTop: "10px",
                                }}
                              >
                                {postedComment.age}d
                              </span>
                              {postedComment.firstName ==
                                user.user.user.firstName && (
                                <DeleteIcon
                                  fontSize="small"
                                  style={{
                                    paddingRight: "2px",
                                    paddingTop: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    deleteComment(postedComment.id)
                                  }
                                />
                              )}
                            </div>
                          </div>
                          <p>{postedComment.content}</p>
                          <div
                            style={{
                              display: "flex",
                              flexDirections: "row",
                              justifyContent: "flex-start",
                              fontSize: "12px",
                              paddingLeft: "10px",
                              paddingBottom: "5px",
                            }}
                          >
                            <span
                              className="reply-btn"
                              id={`r-${postedComment.id}`}
                              onClick={() => {
                                openReply(`r-${postedComment.id}`);
                                setCommentId(postedComment.id);
                              }}
                            >
                              reply
                            </span>
                            <span
                              className="reply-btn"
                              id={`r-${postedComment.id}`}
                              onClick={() => {
                                getReplies(postedComment.id);
                              }}
                              style={{ paddingLeft: "5px" }}
                            >
                              see replies
                            </span>
                          </div>
                        </div>
                      </div>
                      <Replies>
                        {replies &&
                          replies.map((item) => (
                            <div
                              key={item.id}
                              className="allreplies"
                              style={{
                                position: "relative",
                                display: "flex",
                                paddingBottom: "10px",
                                paddingLeft: "100px",
                              }}
                              id={`replies-${p.id}`}
                            >
                              {item.imageUrl ? (
                                <img src={`/images/${item.imageUrl}`} alt="" />
                              ) : (
                                <img src="/images/user.svg" alt="" />
                              )}
                              <div className="replyContent">
                                <div className="comment-userInfo">
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      fontSize: "13px",
                                      justifyContent: "left",
                                      padding: "10px 10px",
                                    }}
                                  >
                                    <span>
                                      {item.firstName + " " + item.lastName}
                                    </span>
                                    <span>{item.occupation}</span>
                                  </div>

                                  <div className="smallContainer">
                                    <span
                                      style={{
                                        fontSize: "13px",
                                        paddingRight: "10px",
                                        paddingTop: "10px",
                                      }}
                                    >
                                      1d
                                    </span>
                                    {item.firstName ==
                                      user.user.user.firstName && (
                                      <DeleteIcon
                                        fontSize="small"
                                        style={{
                                          paddingRight: "2px",
                                          paddingTop: "5px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => deleteReply(item.id)}
                                      />
                                    )}
                                  </div>
                                </div>
                                <p>{item.content}</p>
                              </div>
                            </div>
                          ))}
                      </Replies>
                      <div
                        key={`input-${postedComment.id}`}
                        id={`reply-${postedComment.id}`}
                        className="postReply closePost"
                      >
                        <div className="commentImage">
                          <img src="/images/user.svg" alt="" />
                        </div>
                        <div className="comment">
                          <input
                            type="text"
                            // id="comment"
                            //name="comment"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                          />
                        </div>
                        <button
                          className="postComment"
                          onClick={() => {
                            handleReply(p.id);
                          }}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </AllComments>
              </div>
            </Article>
          ))}
          {openLikersModal && (
            <LikersModal
              setOpenModalLikers={setOpenLikersModal}
              postId={postId}
            />
          )}
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
            {educations.length == 0 ? (
              <div
                className="text"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  onClick={() => {
                    setEducationModal(true);
                  }}
                >
                  Add Education here
                </p>
              </div>
            ) : (
              educations.map((education) => (
                <div className="education">
                  <img className="uni-image" src="/images/google.svg" alt="" />
                  <div className="ed-info">
                    <h4>{education.schoolName}</h4>
                    <p>{education.faculty}</p>
                    <span>{education.startDate + "-" + education.endDate}</span>
                    <p style={{ padding: "10px 0px" }}>
                      {education.description}
                    </p>
                  </div>
                  <div>
                    <button
                      className="ellipsisEd"
                      id={education.id}
                      onClick={() => {
                        //openSettings(education.id);
                      }}
                    >
                      <img src="/images/ellipsis.svg" alt="" />
                    </button>
                    <div
                      // className="settingsEd"
                      className="settings close"
                    >
                      <DeleteButton>
                        <span onClick={() => deleteEducation(education.id)}>
                          <DeleteIcon
                            fontSize="small"
                            style={{ paddingRight: "2px" }}
                          />
                          Delete
                        </span>
                      </DeleteButton>
                      <UpdateButton>
                        <span
                          onClick={() => {
                            setEducationId(education.id);
                            setOpenEditEducation(true);
                          }}
                        >
                          <UpdateIcon
                            fontSize="small"
                            style={{ paddingRight: "3px" }}
                          />
                          Update
                        </span>
                      </UpdateButton>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Education>
          {educationModal && (
            <EducationModal setEducationModalOpen={setEducationModal} />
          )}
          {openEditEducation && (
            <EditEducation
              setEditEducationOpen={setOpenEditEducation}
              educationId={educationId}
            />
          )}
        </Section>
        <Section>
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
            {experiences.length == 0 ? (
              <div
                className="text"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  onClick={() => {
                    setExperienceModal(true);
                  }}
                >
                  Add Experience here
                </p>
              </div>
            ) : (
              experiences.map((experience) => (
                <div className="education">
                  <img className="uni-image" src="/images/google.svg" alt="" />
                  <div className="ed-info">
                    <h4>{experience.workName}</h4>
                    <p>{experience.employer}</p>
                    <span style={{ fontSize: "10px", color: "black" }}>
                      {experience.jobType}
                    </span>
                    <span>
                      {experience.startYear + "-" + experience.endYear}
                    </span>
                    <p style={{ padding: "10px 0px" }}>
                      {experience.description}
                    </p>
                  </div>
                  <div>
                    <button
                      className="ellipsisEx "
                      id={experience.id}
                      onClick={() => {
                        openExSettings(experience.id);
                      }}
                    >
                      <img src="/images/ellipsis.svg" alt="" />
                    </button>
                    <div className="settingsEx">
                      <DeleteButton>
                        <span onClick={() => deleteExperience(experience.id)}>
                          <DeleteIcon
                            fontSize="small"
                            style={{ paddingRight: "2px" }}
                          />
                          Delete
                        </span>
                      </DeleteButton>
                      <UpdateButton>
                        <span
                          onClick={() => {
                            setExperienceId(experience.id);
                            setOpenEditExperience(true);
                          }}
                        >
                          <UpdateIcon
                            fontSize="small"
                            style={{ paddingRight: "3px" }}
                          />
                          Update
                        </span>
                      </UpdateButton>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Experience>
          {experienceModal && (
            <ExperienceModal setExperienceModalOpen={setExperienceModal} />
          )}
          {openEditExperience && (
            <EditExperience
              experienceId={experienceId}
              setEditExperienceOpen={setOpenEditExperience}
            />
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
const Activity = styled.div`
  overflow: hidden;
  margin-bottom: 8px;
  margin-top: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  display: flex;
  justify-content: space-between;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    img {
      padding-right: 10px;
      cursor: pointer;
    }
  }
  h2 {
    font-family: "Montserrat", sans-serif;
    font-weight: 300;
    padding: 10px;
  }
`;
const Replies = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: left;
    margin-left: 10px;
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
    object-fit: cover;
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
  padding-bottom: 20px;

  .heading {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid #ccc;
    h2 {
      padding-bottom: 5px;
    }
    img {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
  }
  .education {
    padding-top: 20px;
    display: flex;
    flex-direction: row;

    span {
      font-size: 14px;
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
      display: flex;
      flex-direction: column;
      h4 {
        font-family: "Montserrat", sans-serif;
        font-size: 20px;
      }
    }
  }
`;

const Experience = styled(Education)``;

const AllComments = styled.div``;
const Article = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
  button {
    &:hover {
      cursor: pointer;
    }
  }
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
      object-fit: cover;
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
