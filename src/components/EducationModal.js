import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const EducationModal = ({ setEducationModalOpen, props }) => {
  const [schoolName, setSchoolName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [startYear, setStartYear] = useState();
  const [endYear, setEndYear] = useState();
  const [description, setDescription] = useState("");
  const user = useSelector((state) => state.authentication);

  const reset = (e) => {
    setSchoolName("");
    setFaculty("");
    setStartYear();
    setEndYear();
    setDescription("");
  };

  const data = {
    schoolName: schoolName,
    faculty: faculty,
    starDate: startYear,
    endTime: endYear,
    description: description,
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://localhost:44331/api/MyProfile/PostUserEducation/${user.user.user.email}`,
        data
      )
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    setEducationModalOpen(false);
    reset(e);
  };
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
              type="date"
              placeholder="YYYY"
              id="startYear"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              name="startYear"
              style={{ padding: "20px" }}
            />

            <label htmlFor="endYear">End Year</label>
            <input
              type="date"
              placeholder="YYYY"
              id="endYear"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              name="endYear"
              style={{ padding: "20px" }}
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
  max-height: 70%;
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
  overflow-y: auto;
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
  textarea {
    min-height: 100px;
    resize: none;
    font-family: "Montserrat", sans-serif;
    border: 2px solid #ccc;
    border-radius: 5px;
    margin: 8px 0px;
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
const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  /* border-top: 2px solid #ccc;*/
  padding-top: 10px;
`;
const SavedButton = styled.button`
  width: 50px;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  background: #0a66c2;
  color: #fff;
  cursor: pointer;
`;


export default EducationModal;
