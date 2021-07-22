import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ContactInfoModal = ({ setOpenModal, props }) => {
  //const [firstName, setFirstName] = useState("");
  //const [lastName, setLastName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [location, setLocation] = useState("");
  const user = useSelector((state) => state.authentication);

  const reset = () => {
    setOccupation("");
    setLocation("");
  };

  const data = {
    occupation: occupation,
    location: location,
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://localhost:44331/api/MyProfile/PutUserAsync/${user.user.user.email}`,
        data
      )
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    setOpenModal(false);
    reset(e);
  };

  return (
    <>
      <Container>
        <Content>
          <Header>
            <h2>Edit info</h2>
            <button>
              <img
                // onClick={(event) => reset(event)}

                src="/images/close-icon.svg"
                alt=""
                onClick={(e) => {
                  setOpenModal(false);
                  reset(e);
                }}
              />
            </button>
          </Header>
          <EditContent>
            <label htmlFor="occupation">Occupation</label>
            <input
              type="text"
              id="occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              name="occupation"
            />
            <label htmlFor="location">Country/City</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              name="location"
            />
          </EditContent>
          <BtnDiv>
            <SavedButton onClick={(event) => submit(event)}>
              <span>Save</span>
            </SavedButton>
          </BtnDiv>
        </Content>
      </Container>
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

const EditContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
  label {
    margin-top: 15px;
  }
  input {
    height: 100%;
    width: 100%;
    border-radius: 3px;
    padding: 12px 20px;
    margin: 8px 0px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    transition: 0.5s;
    outline: none;
    border-radius: 5px;
  }
`;
const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
`;
const SavedButton = styled.button`
  width: 50px;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  background: #0a66c2;
  color: #fff;
`;


export default ContactInfoModal;
