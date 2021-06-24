import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Rightside from "./Rightside";

const RightPart = () => {
  return (
    <Container>
      <Rightside />
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightpart;
`;

export default RightPart;
