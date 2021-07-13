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

const Main = () => {
  const [showModal, setShowModal] = useState("close");
  const [modalOpen, setModalOpen] = useState(false);
  const [openLikersModal, setOpenLikersModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.authentication);
  const token = user.user.token;
  const decoded = jwt_decode(token);
  const [comment, setComment] = useState("");
  const [like, setLike] = useState();

  //const [image, setImage] = useState(null);

  //get all posts
  const getData = () => {
    axios
      .get(
        `https://localhost:44331/api/Post/GetPostsOfFeed/${user.user.user.email}`
      )
      .then((response) => {
        const myPosts = response.data.reverse();
        setPosts(myPosts);
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
  //open and close comment div
  function displayComment(id) {
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
  const handleComment = (e) => {
    axios
      .post("https://localhost:44331/api/Comment", comment)
      .then((res) => console.log(res))
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Container>
        <ShareBox>
          <div>
            <img src="/images/user.svg" alt="" />

            <button
              onClick={handleClick}
              //disabled={props.loading ? true : false}
            >
              Start a post
            </button>
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
                    <span>{post.userName + " " + post.userSurname}</span>
                    <span>{post.userOccupation}</span>
                    <span>
                      Id: {post.id} | shared: {post.sharedDate}
                    </span>
                  </div>
                </a>
                <button
                  className="ellipsis "
                  id={post.id}
                  onClick={() => {
                    openSettings(post.id);
                  }}
                >
                  <img src="/images/ellipsis.svg" alt="" />
                </button>
                <div className="settings close">
                  <span onClick={() => deleteArticle(post.id)}>Delete</span>
                  <span
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    Update
                  </span>
                </div>
              </SharedActor>
              <Description>{post.content}</Description>
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
                      onClick={() => {
                        setOpenLikersModal(true);
                      }}
                    >
                      {post.likeCount}
                      {/* {like} */}
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
                    //setRequest(true);
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
              <div className="commentContainer" id={post.id}>
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
                <button className="postComment" onClick={() => handleComment()}>
                  Post
                </button>
              </div>
              {/* <div className="allComments">
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
                      <span>Name Surname</span>
                      <span>Occupation</span>
                    </div>

                    <span
                      style={{
                        fontSize: "13px",
                        paddingRight: "10px",
                        paddingTop: "10px",
                      }}
                    >
                      1d
                    </span>
                  </div>

                  <p>Text</p>
                </div>
              </div> */}
              {modalOpen && (
                <UpdateArtcle setOpenModal={setModalOpen} postId={post.id} />
              )}
            </Article>
          ))}
        </Content>
        {openLikersModal && (
          <LikersModal setOpenModalLikers={setOpenLikersModal} />
        )}
        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
    </>
  );
};

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

//const Comment = styled.div``;

export default Main;
