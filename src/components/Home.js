import React, { useState } from "react";
import styled from "styled-components";
import Leftside from "./Leftside";
import Main from "./Main";
import Rightside from "./Rightside";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const Home = (props) => {
  const user = useSelector((state) => state.authentication);
  
  return (
    <>
    {/* {user.user == null && <Redirect to="/"/>} */}
      <Container>
          <Layout>
            <Leftside />
            <Main />
            <Rightside />
          </Layout>
      </Container>
   </>
  );
};

const Container = styled.div`
  padding-top: 50px;
  width: 100%;
`;
const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  grid-template-rows: auto;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;


export default Home;
