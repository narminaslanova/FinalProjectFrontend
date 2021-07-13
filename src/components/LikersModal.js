import React from "react";
import styled from "styled-components";
import { useState } from "react";

const LikersModal = ({ setOpenModalLikers }) => {
  const [likers, setLikers] = useState([]);
  return (
    <Container>
      <Content>
        <Header>
          <h2>Reactions</h2>
          <button>
            <img
              onClick={() => setOpenModalLikers(false)}
              src="/images/close-icon.svg"
              alt=""
            />
          </button>
        </Header>
        <LikersContent>
          {likers.length == 0 ? (
            <Text>
              <p>No likes here yet :(</p>
            </Text>
          ) : (
            <UserList>
              <UserImage>
                <img src="/images/user.svg" alt="" />
              </UserImage>
              <UserInfo>
                <h4>Name Surname</h4>
                <span>Occupation</span>
              </UserInfo>
            </UserList>
          )}
          {/* {likers.map((liker) => {
            <UserList key={liker.id}>
              <UserImage>
                <img src="/images/user.svg" alt="" />
              </UserImage>
              <UserInfo>
                <h4>{liker.firstName + " " + liker.lastName}</h4>
                <span>{liker.occupation}</span>
              </UserInfo>
            </UserList>;
          })} */}
        </LikersContent>
      </Content>
    </Container>
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
  h2 {
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

const LikersContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 20px;
`;
const UserImage = styled.div`
  padding-left: 15px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
const UserInfo = styled.div`
  padding-left: 10px;
  font-family: "Montserrat", sans-serif;
  h4 {
    font-weight: 200;

    color: gray;
  }
  span {
    font-size: 14px;
  }
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    padding: 10px 10px;
    color: rgba(0, 0, 0, 0.6);
  }
`;
export default LikersModal;
