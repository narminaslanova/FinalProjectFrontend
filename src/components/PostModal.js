
import { useState, useEffect } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import { articlesActions } from "../actions/articleActions";
import axios from "axios";
//import { connect } from "react-redux";
//import firebase from "firebase";
//import { postArticleAPI } from "../actions";


const PostModal = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.authentication)
  // const [values, setValues]=useState({
  //   editorText:"",
  //   shareImage: "",
  //   videoLink: "",

  // })
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");
 
  const handleChange = (e)=>{
    const image =e.target.files[0];
     if(image === "" || image === undefined){
       alert(`not an image, the file is a ${typeof image}`)
       return;
     }
    setShareImage(image)
  }

 const switchAssetArea=(area)=>{
  setShareImage("");
  setVideoLink("");
  setAssetArea(area);

 }
 const postData = {
   image: shareImage.name,
   video: "videoLink",
   user: "user.user.user",
   description: editorText,
   postAge: "now",
   comments: 0,
   user: user.user.user
 };
const submit = (e) =>{
   e.preventDefault();
   //console.log(shareImage.name, editorText, videoLink );
    // axios
    //   .post(
    //     "https://localhost:44331/api/Post",
    //     postData
    //     // headers: !token ? {} : { Authorization: `Bearer ${token}` },
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  fetch("https://localhost:44331/api/Post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     title: "test"
    }),
  })
    .then((response) => response.json())
    .then((data) => {console.log(data)});



  
}
 
  const reset = (e) =>{
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e)

  }

  
 
  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button>
                <img
                  onClick={(event) => reset(event)}
                  src="/images/close-icon.svg"
                  alt=""
                />
              </button>
            </Header>
            <ShareContent>
              <UserInfo>
                {/* { props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : ( */}
                <img src="/images/user.svg" alt="" />
                {/* )} */}
                {/* <span>{props.user.displayName}</span> */}

                <span>
                  {user.user.user.firstName + " " + user.user.user.lastName}
                </span>
              </UserInfo>
              <Editor>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an image to share</label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        style={{
                          width: "100%",
                          height: "30px",
                          marginBottom: "10px",
                        }}
                        placeholder="Input a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </ShareContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/photo-create.svg" alt="" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="/images/video-create.svg" alt="" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton
                  style={{ padding: "15px 15px", borderRadius: "15px" }}
                >
                  <img src="/images/comment-share.svg" alt="" />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => submit(event)}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;

`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2{
    font-weight: 200;
    font-size: 20px;
     color: black;

  }
  button {
    height: 30px;
    width: 30px;
    background: transparent;
    border: none;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
      border-radius: 50%;
      cursor: pointer;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
`;

const ShareContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  img {
    width: 50px;
    height: 50px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  padding: 0px 10px;
  color: rgba(0, 0, 0, 0.5);
  background: transparent;
  border: none;
  &:hover{
      background-color: rgba(0, 0, 0, 0.08);
      border-radius: 50%;
      cursor: pointer;
  }
`;

const ShareComment = styled.div`
padding-left: 8px;
margin-right: auto;
border-left:1px solid rgb(0 0 0 / 0.09);
img{
  margin-right: 5px;
}
`;

const PostButton = styled.button`
 min-width: 60px;
 border-radius: 20px;
 padding-left: 16px;
 padding-right: 16px;
 border:none;
 background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.08)" : "#0a66c2")} ;
 color:  ${(props) => (props.disabled ? "grey" : "white")};
 cursor: ${(props) => (props.disabled ? " not-allowed" : "pointer")};
`;
const Editor = styled.div`
  padding: 12px 24px;
  textarea{
    width: 100%;
    min-height: 100px;
    border: none;
    resize: none;
    font-family: 'Montserrat', sans-serif;
    &::placeholder{
      font-size: 16px;
      font-weight: 300;
      font-family: 'Montserrat', sans-serif;
    }
    &:focus{
      outline: none;
    }
  }
`;
const UploadImage = styled.div`
  text-align: center;
  label:hover{
    cursor: pointer;
    
  }
  img{
    width: 100%;
  }
  
`;

// const mapStateToProps = (state)=>{
//   return {
//     user: state.userState.user
//   }
// }
// const mapDispatchToProps = (dispatch)=>({
//   postArticle: (payload) => dispatch(postArticleAPI(payload))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
export default PostModal;
