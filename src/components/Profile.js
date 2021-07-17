import React from "react";
import styled from "styled-components";
import LeftPart from "./LeftPart";
import RightPart from "./RightPart";


const Profile = (props) => {
  return (
    <Container>
      {/* {!props.user && <Redirect to="/myprofile" />} */}
      <Layout>
        <LeftPart />
        <RightPart />
      </Layout>
    </Container>
  );
};
const Container = styled.div`
  padding-top: 50px;
  width: 100%;
`;
const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftpart rightpart test";
  grid-template-columns: minmax(0, 12fr) minmax(0, 5fr) minmax(0, 1fr);
  column-gap: 25px;
  row-gap: 15px;
  grid-template-rows: auto;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;


export default Profile;
