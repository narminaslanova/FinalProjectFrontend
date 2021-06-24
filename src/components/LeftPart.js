import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const LeftPart = () => {
  return <Container>
    <UserInfo>
      
    </UserInfo>
  </Container>;
};

const Container = styled.div`
  grid-area: leftpart;
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
export default LeftPart;
