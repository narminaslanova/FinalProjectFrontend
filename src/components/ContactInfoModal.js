import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { changeContactInfo } from "../actions";

const ContactInfoModal = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const reset = (e) => {
    setFirstName("");
    setLastName("");
    setCountry("");
    setCity("");
    props.handleClick(e);
  };

  const changeInfo = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      firstName: firstName,
      lastName: lastName,
      country: country,
      city: city,
    };
    props.changeInfo(payload);
    reset(e);
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Edit info</h2>
              <button>
                <img
                  onClick={(event) => reset(event)}
                  src="/images/close-icon.svg"
                  alt=""
                />
              </button>
            </Header>
            <EditContent>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                name="firstName"
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                name="lastName"
              />
              <label htmlFor="country">Country</label>
              <input type="text" id="country" name="country" />
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" />
            </EditContent>
            <SavedButton>Save</SavedButton>
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
    padding-top: 10px;
  }
`;

const SavedButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  border: none;
`;

export default ContactInfoModal;
