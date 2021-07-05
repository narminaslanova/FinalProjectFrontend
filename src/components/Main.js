import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import ReactPlayer from "react-player";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";



const Main = (props) => {
  const [showModal, setShowModal] = useState("close");

  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.articleState);
  const getData = async () => {
    axios
      .get("https://localhost:44331/api/Post")
      .then((response) => {
        const myPosts = response.data;
        // setPosts({ posts: response.data });
        setPosts(myPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  }

 const deleteArticle = (id) => {
      axios.delete(`https://localhost:44331/api/Post/Delete/${id}`);
      const newpost = posts.filter((post) => post.id !== id);
      setPosts(newpost)
    };

  

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
   }, [handleClick]);
  return (
    <>
      {/* {props.articles.length === 0 ? (
        <p>There are no articles</p>
      ) : ( */}
      <Container>
        <ShareBox>
          <div>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} />
            ) : (
              <img src="/images/user.svg" alt="" />
            )}
            <button
              onClick={handleClick}
              disabled={props.loading ? true : false}
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
                  className="ellipsis"
                  onClick={() => {
                    console.log(post.id);
                  }}
                >
                  <img src="/images/ellipsis.svg" alt="" />
                </button>
                <div className="settings">
                  <span onClick={() => deleteArticle(post.id)}>Delete</span>
                  <span>Update</span>
                </div>
              </SharedActor>
              <Description>
                {post.content}
              </Description>
              <SharedImg>
                {!post.imageUrl && post.videoUrl ? (
                  <ReactPlayer width={'100%'} url={post.videoUrl} />
                ) : (
                  post.imageUrl && <a>
                    <img src={`/images/${post.imageUrl}`} alt="" />
                  </a>
                )}
              </SharedImg>
              <SocialCounts>
                <li>
                  <button>
                    <img src="/images/like1.svg" alt="" />
                    <img src="/images/clap.svg" alt="" />
                    <img src="/images/heart.svg" alt="" />
                    <span>{post.likeCount}</span>
                  </button>
                </li>
                <li>
                  <a>{post.commentCount} comments</a>
                </li>
              </SocialCounts>
              <SocialActions>
                <button>
                  <img src="/images/like.svg" alt="" />
                  <span>Like</span>
                </button>
                <button>
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
            </Article>
          ))}
        </Content>
        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
      {/* )}  */}
    </>
  );
}

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
      &:hover  {
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
        &:hover  {
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

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

// const mapStateToProps = (state) => {
//   return {
//     loading: state.articleState.loading,
//     user: state.userState.user,
//     articles: state.articleState.articles,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   getArticles: () => dispatch(getArticlesAPI()),
// });

//export default connect(mapStateToProps, mapDispatchToProps)(Main);
export default Main;
