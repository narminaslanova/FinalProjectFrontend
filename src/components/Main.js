import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import LikersModal from "./LikersModal";
import UpdateArtcle from "./UpdateArtcle";
import ReactPlayer from "react-player";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";

const Main = () => {
  const [showModal, setShowModal] = useState("close");
  const [open, setOpen] = useState(false);
  const [openLikersModal, setOpenLikersModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.authentication);
  const token = user.user.token;
  const decoded = jwt_decode(token);
  const [comment, setComment] = useState("");
  const [postId, setPostId] = useState();
  const [postedComments, setPostedComments] = useState([]);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);
  const [updateId, setUpdateId] = useState();
  const [commentId, setCommentId] = useState();
  //const [isCalledOnce, setIsCalledOnce] = useState(false);
  //const [postedData, setPostedData] = useState(false);

  //get all posts
  const getData = () => {
    axios
      .get("https://localhost:44331/api/Post")
      .then((response) => {
        const myPosts = response.data.reverse();
        setPosts(myPosts);

        //console.log(myPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //open and close delete/update div
  function openSettings(id) {
    if (
      document.getElementById(id).nextElementSibling.classList.contains("close")
    ) {
      document.getElementById(id).nextElementSibling.classList.remove("close");
    } else {
      document.getElementById(id).nextElementSibling.classList.add("close");
    }
  }

  //post comment
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
      .then((res) => console.log(res))
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

  //get replies of comment
  const getReplies = (id) => {
    console.log(id);
    axios
      .get(`http://localhost:44331/api/Post/GetRepliesOfComment/${id}`)
      .then((response) => {
        setReplies(response.data);
        console.log("replies", response.data);
      })
      .catch((error) => console.log(error));
  };

  //delete post
  const deleteArticle = (id) => {
    axios.delete(`https://localhost:44331/api/Post/Delete/${id}`);
    const newpost = posts.filter((post) => post.id !== id);
    setPosts(newpost);
  };

  //like post
  const likePost = (postId) => {
    const data = {
      userId: decoded.id,
    };
    axios
      .put(`https://localhost:44331/api/Post/LikePost/${postId}`, data)
      .then((data) => console.log("like", data))
      .catch((error) => console.log(error));
  };

  //open and close postModal
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

  const handleReply = (id) => {
    const replyData = {
      userId: decoded.id,
      content: reply,
      isReply: true,
      parentId: commentId,
    };
    axios
      .post(`https://localhost:44331/api/Post/AddCommentPost/${id}`, replyData)
      .then((res) => console.log("handlereply", res))
      .catch((error) => console.log(error));

    setReply("");
  };

  useEffect(() => {
    getData();
  }, [showModal]);

  //open and close comment div
  function displayComment(id) {
    const test = document.querySelectorAll(".commentContainer");
    //console.log(test);
    //const test = document.querySelectorAll(".closeCommentContainer");

    test.forEach((element) => {
      //console.log(element.getAttribute("id") !== id);
      if (element.getAttribute("id") !== id) {
        element.classList.add("closeCommentContainer");
      }
    });

    //console.log(test);
    //console.log(document.getElementById(id).parentElement.nextElementSibling);

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

  return (
    <>
      <Container>
        <ShareBox>
          <div>
            <img src="/images/user.svg" alt="" />
            <button onClick={handleClick}>Start a post</button>
          </div>
          <div>
            <button onClick={handleClick}>
              <img src="/images/photo1.svg" alt="" />
              <span>Photo</span>
            </button>
            <button onClick={handleClick}>
              <img src="/images/video.svg" alt="" />
              <span>Video</span>
            </button>
          </div>
        </ShareBox>
        <Content>
          {posts.map((post) => (
            <Article key={post.id}>
              <SharedActor>
                <a>
                  <img src={"/images/google.svg"} alt="" />
                  <div>
                    <span>{post.firstname + " " + post.lastname}</span>
                    <span>
                      {post.userOccupation ? post.userOccupation : "---"}
                    </span>
                    <span>
                      Id: {post.id} | shared: {post.postAge}
                    </span>
                  </div>
                </a>
                <button
                  className="ellipsis "
                  id={`e-${post.id}`}
                  onClick={() => {
                    openSettings(`e-${post.id}`);
                  }}
                >
                  <img src="/images/ellipsis.svg" alt="" />
                </button>
                <div className="settings close">
                  <DeleteButton>
                    <span onClick={() => deleteArticle(post.id)}>
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
                        setUpdateId(post.id);
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
                    <UpdateArtcle setOpenModal={setOpen} updateId={updateId} />
                  )}
                </div>
              </SharedActor>
              <Description>{post.description}</Description>
              <SharedImg>
                {!post.imageUrl && post.videoUrl ? (
                  <ReactPlayer width={"100%"} url={post.videoUrl} />
                ) : (
                  post.imageUrl && (
                    <a>
                      <img src={`/images/${post.imageUrl}`} alt="" />
                    </a>
                  )
                )}
              </SharedImg>
              <SocialCounts>
                <li>
                  <button>
                    <img src="/images/like1.svg" alt="" />
                    <span
                      id={`like-${post.id}`}
                      onClick={() => {
                        setPostId(post.id);
                        setOpenLikersModal(true);
                      }}
                    >
                      {post.likeCount}
                    </span>
                  </button>
                </li>
                <li>
                  <a>{post.commentCount} comments</a>
                </li>
              </SocialCounts>
              <SocialActions>
                <LikeButton
                  id={`l-${post.id}`}
                  onClick={() => {
                    //setPostId(post.id);
                    likePost(post.id);
                  }}
                >
                  <img src="/images/like.svg" alt="" />
                  <span>Like</span>
                </LikeButton>
                <button
                  id={`c-${post.id}`}
                  onClick={() => {
                    displayComment(`c-${post.id}`);
                    getComments(post.id);
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
                id={`commentContainer-${post.id}`}
              >
                <div className="postComment">
                  <div className="commentImage">
                    <img src="/images/user.svg" alt="" />
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
                      handleComment(post.id);
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
                        id={`allComments-${post.id}`}
                      >
                        <img src="/images/user.svg" alt="" />
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
                                  postedComment.lastName +
                                  "id:" +
                                  postedComment.id}
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
                              <DeleteIcon
                                fontSize="small"
                                style={{
                                  paddingRight: "2px",
                                  paddingTop: "5px",
                                  cursor: "pointer",
                                }}
                                onClick={() => deleteComment(postedComment.id)}
                              />
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
                        {replies.map((item) => (
                          <div
                            key={item.id}
                            className="allreplies"
                            style={{
                              position: "relative",
                              display: "flex",
                              paddingBottom: "10px",
                              paddingLeft: "100px",
                            }}
                            id={`replies-${post.id}`}
                          >
                            <img src="/images/user.svg" alt="" />
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
                                  {/* <img src="/images/ellipsis.svg" alt="" /> */}
                                  <DeleteIcon
                                    fontSize="small"
                                    style={{
                                      paddingRight: "2px",
                                      paddingTop: "5px",
                                      cursor: "pointer",
                                    }}
                                    // onClick={() => deleteComment(postedComment.id)}
                                  />
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
                            handleReply(post.id);
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
        </Content>
        {openLikersModal && (
          <LikersModal
            setOpenModalLikers={setOpenLikersModal}
            postId={postId}
          />
        )}
        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
    </>
  );
};

const AllComments = styled.div``;
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
const Container = styled.div`
  grid-area: main;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      &:hover {
        background: rgb(235 235 235);
        border-radius: 8px;
        cursor: pointer;
      }
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
        &:hover {
          background: rgb(235 235 235);
          cursor: pointer;
        }
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 5px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
      }
    }
  }
`;
const Article = styled(CommonCard)`
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
//const Comment = styled.div``;

export default Main;
