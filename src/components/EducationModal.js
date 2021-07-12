import React from "react";
import styled from "styled-components";
import { useState } from "react";

const EducationModal = ({ setEducationModalOpen, props }) => {
  const [schoolName, setSchoolName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(0);
  const [description, setDescription] = useState("");

  const reset = (e) => {
    setSchoolName("");
    setFaculty("");
    setStartYear(0);
    setEndYear(0);
    setDescription("");
  };

  //   const changeInfo = (e) => {
  //     e.preventDefault();
  //     if (e.target !== e.currentTarget) {
  //       return;
  //     }

  //     const payload = {
  //       schoolName: schoolName,
  //       faculty: faculty,
  //       year: year,
  //     };
  //     props.changeInfo(payload);
  //     reset(e);
  //   };

  return (
    <>
      <Container>
        <Content>
          <Header>
            <h2>Add education</h2>
            <button>
              <img
                onClick={(e) => {
                  setEducationModalOpen(false);
                  reset(e);
                }}
                src="/images/close-icon.svg"
                alt=""
              />
            </button>
          </Header>
          <EditContent>
            <label htmlFor="schoolName">School</label>
            <input
              type="text"
              id="schoolName"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              name="schoolName"
            />
            <label htmlFor="faculty">Faculty</label>
            <input
              type="text"
              id="faculty"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              name="faculty"
            />
            <label htmlFor="startYear">Start Year</label>
            <input
              type="number"
              placeholder="YYYY"
              min="1990"
              max="2021"
              id="startYear"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              name="startYear"
            />

            <label htmlFor="endYear">End Year</label>
            <input
              type="number"
              placeholder="YYYY"
              min="1990"
              max="2021"
              id="endYear"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              name="endYear"
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=""
              autoFocus={true}
            />
          </EditContent>
          <SavedButton>Save</SavedButton>
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
    padding-top: 10px;
  }
  textarea {
    min-height: 100px;
    resize: none;
    font-family: "Montserrat", sans-serif;
    &::placeholder {
      font-size: 16px;
      font-weight: 300;
      font-family: "Montserrat", sans-serif;
    }
    &:focus {
      outline: none;
    }
  }
`;

const SavedButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  border: none;
`;

export default EducationModal;
